const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Budget = require('../models/Budget');
const { auth, requireFeature } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/budget
// @desc    Get user budgets
// @access  Private
router.get('/', auth, [
  query('type').optional().isIn(['monthly', 'weekly', 'yearly', 'custom']),
  query('isActive').optional().isBoolean(),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('page').optional().isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      type,
      isActive,
      limit = 10,
      page = 1
    } = req.query;

    const query = { userId: req.user._id };
    if (type) query.type = type;
    if (isActive !== undefined) query.isActive = isActive;

    const skip = (page - 1) * limit;

    const budgets = await Budget.find(query)
      .sort({ startDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Budget.countDocuments(query);

    res.json({
      success: true,
      budgets,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get budgets error:', error);
    res.status(500).json({ error: 'Failed to get budgets' });
  }
});

// @route   POST /api/budget
// @desc    Create new budget
// @access  Private
router.post('/', auth, [
  body('name').notEmpty().withMessage('Budget name is required'),
  body('type').isIn(['monthly', 'weekly', 'yearly', 'custom']).withMessage('Valid budget type is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('totalBudget').isFloat({ min: 0 }).withMessage('Total budget must be a positive number'),
  body('categories').isArray({ min: 1 }).withMessage('At least one category is required'),
  body('categories.*.name').notEmpty().withMessage('Category name is required'),
  body('categories.*.budget').isFloat({ min: 0 }).withMessage('Category budget must be a positive number'),
  body('savingsGoal').optional().isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      type,
      startDate,
      endDate,
      totalBudget,
      categories,
      savingsGoal,
      notifications
    } = req.body;

    // Check if dates are valid
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    // Check if budget categories sum equals total budget
    const categorySum = categories.reduce((sum, cat) => sum + cat.budget, 0);
    if (Math.abs(categorySum - totalBudget) > 0.01) {
      return res.status(400).json({ 
        error: 'Category budgets must sum to total budget',
        categorySum,
        totalBudget
      });
    }

    // Check for overlapping active budgets
    const overlappingBudget = await Budget.findOne({
      userId: req.user._id,
      isActive: true,
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start }
        }
      ]
    });

    if (overlappingBudget) {
      return res.status(400).json({ 
        error: 'Budget period overlaps with existing active budget',
        existingBudget: overlappingBudget.name
      });
    }

    const budget = new Budget({
      userId: req.user._id,
      name,
      type,
      startDate: start,
      endDate: end,
      totalBudget,
      categories: categories.map(cat => ({
        name: cat.name,
        budget: cat.budget,
        color: cat.color || '#A3CFFA'
      })),
      savingsGoal,
      notifications
    });

    await budget.save();

    res.status(201).json({
      success: true,
      budget
    });

  } catch (error) {
    console.error('Create budget error:', error);
    res.status(500).json({ error: 'Failed to create budget' });
  }
});

// @route   GET /api/budget/:id
// @desc    Get single budget
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.json({
      success: true,
      budget
    });

  } catch (error) {
    console.error('Get budget error:', error);
    res.status(500).json({ error: 'Failed to get budget' });
  }
});

// @route   PUT /api/budget/:id
// @desc    Update budget
// @access  Private
router.put('/:id', auth, [
  body('name').optional().notEmpty().withMessage('Budget name cannot be empty'),
  body('totalBudget').optional().isFloat({ min: 0 }),
  body('savingsGoal').optional().isFloat({ min: 0 }),
  body('isActive').optional().isBoolean(),
  body('notifications').optional().isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const budget = await Budget.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    const {
      name,
      totalBudget,
      savingsGoal,
      isActive,
      notifications
    } = req.body;

    // Update fields
    if (name !== undefined) budget.name = name;
    if (totalBudget !== undefined) budget.totalBudget = totalBudget;
    if (savingsGoal !== undefined) budget.savingsGoal = savingsGoal;
    if (isActive !== undefined) budget.isActive = isActive;
    if (notifications) {
      budget.notifications = { ...budget.notifications, ...notifications };
    }

    await budget.save();

    res.json({
      success: true,
      budget
    });

  } catch (error) {
    console.error('Update budget error:', error);
    res.status(500).json({ error: 'Failed to update budget' });
  }
});

// @route   DELETE /api/budget/:id
// @desc    Delete budget
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.json({
      success: true,
      message: 'Budget deleted successfully'
    });

  } catch (error) {
    console.error('Delete budget error:', error);
    res.status(500).json({ error: 'Failed to delete budget' });
  }
});

// @route   POST /api/budget/:id/expense
// @desc    Add expense to budget
// @access  Private
router.post('/:id/expense', auth, [
  body('amount').isFloat({ min: 0.01 }).withMessage('Valid expense amount is required'),
  body('categoryName').notEmpty().withMessage('Category name is required'),
  body('description').optional().isString(),
  body('date').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const budget = await Budget.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    const { amount, categoryName, description, date } = req.body;

    // Check if category exists
    const category = budget.categories.find(cat => cat.name === categoryName);
    if (!category) {
      return res.status(400).json({ 
        error: 'Category not found in budget',
        availableCategories: budget.categories.map(cat => cat.name)
      });
    }

    // Add expense
    await budget.addExpense(amount, categoryName);

    // Update user stats
    await req.user.updateStats('savings', -amount);

    res.json({
      success: true,
      budget,
      expense: {
        amount,
        categoryName,
        description,
        date: date || new Date()
      }
    });

  } catch (error) {
    console.error('Add expense error:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// @route   GET /api/budget/active
// @desc    Get user's active budget
// @access  Private
router.get('/active', auth, async (req, res) => {
  try {
    const budget = await Budget.getActiveBudget(req.user._id);

    if (!budget) {
      return res.status(404).json({ error: 'No active budget found' });
    }

    res.json({
      success: true,
      budget
    });

  } catch (error) {
    console.error('Get active budget error:', error);
    res.status(500).json({ error: 'Failed to get active budget' });
  }
});

// @route   GET /api/budget/stats/overview
// @desc    Get budget statistics
// @access  Private
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const stats = await Budget.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalBudgets: { $sum: 1 },
          totalSpent: { $sum: '$spent' },
          totalBudgeted: { $sum: '$totalBudget' },
          averageSpending: { $avg: '$spent' },
          averageBudget: { $avg: '$totalBudget' }
        }
      }
    ]);

    const monthlyStats = await Budget.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: {
            year: { $year: '$startDate' },
            month: { $month: '$startDate' }
          },
          totalSpent: { $sum: '$spent' },
          totalBudgeted: { $sum: '$totalBudget' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    const categoryStats = await Budget.aggregate([
      { $match: { userId: req.user._id } },
      { $unwind: '$categories' },
      {
        $group: {
          _id: '$categories.name',
          totalBudgeted: { $sum: '$categories.budget' },
          totalSpent: { $sum: '$categories.spent' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        totalBudgets: 0,
        totalSpent: 0,
        totalBudgeted: 0,
        averageSpending: 0,
        averageBudget: 0
      },
      monthlyStats,
      categoryStats
    });

  } catch (error) {
    console.error('Get budget stats error:', error);
    res.status(500).json({ error: 'Failed to get budget statistics' });
  }
});

// @route   GET /api/budget/history
// @desc    Get budget history
// @access  Private
router.get('/history', auth, [
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { limit = 10 } = req.query;

    const budgets = await Budget.getBudgetHistory(req.user._id, parseInt(limit));

    res.json({
      success: true,
      budgets
    });

  } catch (error) {
    console.error('Get budget history error:', error);
    res.status(500).json({ error: 'Failed to get budget history' });
  }
});

module.exports = router; 