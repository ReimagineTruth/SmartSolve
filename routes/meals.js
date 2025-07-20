const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { auth, requireFeature } = require('../middleware/auth');

const router = express.Router();

// Mock meal data (in production, this would come from a database)
const mockMeals = [
  {
    id: 1,
    name: 'Grilled Chicken Salad',
    category: 'healthy',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: 'easy',
    ingredients: [
      '2 chicken breasts',
      'Mixed greens',
      'Cherry tomatoes',
      'Cucumber',
      'Olive oil',
      'Balsamic vinegar'
    ],
    instructions: [
      'Season chicken with salt and pepper',
      'Grill chicken for 8-10 minutes per side',
      'Chop vegetables',
      'Mix salad ingredients',
      'Slice grilled chicken and add to salad'
    ],
    nutrition: {
      calories: 350,
      protein: 35,
      carbs: 15,
      fat: 18
    },
    tags: ['high-protein', 'low-carb', 'quick']
  },
  {
    id: 2,
    name: 'Vegetarian Pasta',
    category: 'vegetarian',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'easy',
    ingredients: [
      '400g pasta',
      '2 zucchini',
      'Cherry tomatoes',
      'Garlic',
      'Olive oil',
      'Parmesan cheese'
    ],
    instructions: [
      'Cook pasta according to package',
      'Sauté zucchini and tomatoes',
      'Add garlic and seasonings',
      'Combine with pasta',
      'Top with parmesan'
    ],
    nutrition: {
      calories: 420,
      protein: 12,
      carbs: 65,
      fat: 14
    },
    tags: ['vegetarian', 'pasta', 'quick']
  }
];

// @route   GET /api/meals
// @desc    Get meal suggestions
// @access  Private
router.get('/', auth, [
  query('category').optional().isString(),
  query('difficulty').optional().isIn(['easy', 'medium', 'hard']),
  query('maxPrepTime').optional().isInt({ min: 0 }),
  query('tags').optional().isString(),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      category,
      difficulty,
      maxPrepTime,
      tags,
      limit = 10
    } = req.query;

    let meals = [...mockMeals];

    // Apply filters
    if (category) {
      meals = meals.filter(meal => meal.category === category);
    }

    if (difficulty) {
      meals = meals.filter(meal => meal.difficulty === difficulty);
    }

    if (maxPrepTime) {
      meals = meals.filter(meal => meal.prepTime <= parseInt(maxPrepTime));
    }

    if (tags) {
      const tagArray = tags.split(',');
      meals = meals.filter(meal => 
        tagArray.some(tag => meal.tags.includes(tag))
      );
    }

    // Limit results
    meals = meals.slice(0, parseInt(limit));

    res.json({
      success: true,
      meals,
      total: meals.length
    });

  } catch (error) {
    console.error('Get meals error:', error);
    res.status(500).json({ error: 'Failed to get meals' });
  }
});

// @route   GET /api/meals/suggestions
// @desc    Get personalized meal suggestions
// @access  Private
router.get('/suggestions', auth, async (req, res) => {
  try {
    // Check if user has access to full meal planner
    if (!req.user.canAccessFeature('full-meal-planner')) {
      // Return limited suggestions for free plan
      const limitedMeals = mockMeals.slice(0, 2);
      return res.json({
        success: true,
        meals: limitedMeals,
        message: 'Upgrade to Standard plan for unlimited meal suggestions'
      });
    }

    // For paid plans, return more suggestions
    const suggestions = mockMeals.slice(0, 5);
    
    res.json({
      success: true,
      meals: suggestions
    });

  } catch (error) {
    console.error('Get meal suggestions error:', error);
    res.status(500).json({ error: 'Failed to get meal suggestions' });
  }
});

// @route   GET /api/meals/:id
// @desc    Get single meal details
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const meal = mockMeals.find(m => m.id === parseInt(req.params.id));

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    res.json({
      success: true,
      meal
    });

  } catch (error) {
    console.error('Get meal error:', error);
    res.status(500).json({ error: 'Failed to get meal' });
  }
});

// @route   POST /api/meals/plan
// @desc    Create meal plan
// @access  Private
router.post('/plan', auth, requireFeature('full-meal-planner'), [
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('meals').isArray({ min: 1 }).withMessage('At least one meal is required'),
  body('meals.*.date').isISO8601().withMessage('Valid meal date is required'),
  body('meals.*.mealId').isInt({ min: 1 }).withMessage('Valid meal ID is required'),
  body('meals.*.type').isIn(['breakfast', 'lunch', 'dinner', 'snack']).withMessage('Valid meal type is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { startDate, endDate, meals } = req.body;

    // Validate meal plan
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    // Update user stats
    await req.user.updateStats('meal', meals.length);

    res.status(201).json({
      success: true,
      mealPlan: {
        startDate: start,
        endDate: end,
        meals: meals.map(meal => ({
          ...meal,
          date: new Date(meal.date),
          mealDetails: mockMeals.find(m => m.id === meal.mealId)
        }))
      }
    });

  } catch (error) {
    console.error('Create meal plan error:', error);
    res.status(500).json({ error: 'Failed to create meal plan' });
  }
});

// @route   GET /api/meals/grocery-list
// @desc    Generate grocery list from meal plan
// @access  Private
router.get('/grocery-list', auth, requireFeature('full-meal-planner'), [
  query('startDate').isISO8601().withMessage('Valid start date is required'),
  query('endDate').isISO8601().withMessage('Valid end date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { startDate, endDate } = req.query;

    // Mock grocery list generation
    const groceryList = {
      produce: [
        { item: 'Mixed greens', quantity: '2 bags' },
        { item: 'Cherry tomatoes', quantity: '1 pint' },
        { item: 'Cucumber', quantity: '2 medium' },
        { item: 'Zucchini', quantity: '4 medium' }
      ],
      protein: [
        { item: 'Chicken breasts', quantity: '4 pieces' }
      ],
      dairy: [
        { item: 'Parmesan cheese', quantity: '1 block' }
      ],
      pantry: [
        { item: 'Pasta', quantity: '400g' },
        { item: 'Olive oil', quantity: '1 bottle' },
        { item: 'Balsamic vinegar', quantity: '1 bottle' },
        { item: 'Garlic', quantity: '1 head' }
      ]
    };

    res.json({
      success: true,
      groceryList,
      estimatedCost: 45.50,
      currency: 'Pi'
    });

  } catch (error) {
    console.error('Generate grocery list error:', error);
    res.status(500).json({ error: 'Failed to generate grocery list' });
  }
});

module.exports = router; 