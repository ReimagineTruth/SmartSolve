const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { auth, requireFeature } = require('../middleware/auth');

const router = express.Router();

// Mock wellness data
const mockQuotes = [
  "Every day is a new beginning. Take a deep breath and start again.",
  "You are stronger than you think. You have survived 100% of your bad days.",
  "Progress is progress, no matter how small.",
  "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
  "It's okay to not be okay. It's okay to ask for help."
];

const mockActivities = [
  {
    id: 1,
    name: 'Deep Breathing',
    category: 'meditation',
    duration: 5,
    description: 'Simple breathing exercise to reduce stress',
    instructions: [
      'Find a comfortable position',
      'Close your eyes',
      'Breathe in for 4 counts',
      'Hold for 4 counts',
      'Breathe out for 4 counts',
      'Repeat for 5 minutes'
    ]
  },
  {
    id: 2,
    name: 'Gratitude Journal',
    category: 'journaling',
    duration: 10,
    description: 'Write down 3 things you\'re grateful for today',
    instructions: [
      'Get a pen and paper',
      'Think about your day',
      'Write down 3 things you\'re grateful for',
      'Reflect on why they matter to you'
    ]
  },
  {
    id: 3,
    name: 'Quick Walk',
    category: 'exercise',
    duration: 15,
    description: 'Take a short walk to clear your mind',
    instructions: [
      'Put on comfortable shoes',
      'Step outside',
      'Walk at a comfortable pace',
      'Notice your surroundings',
      'Focus on your breathing'
    ]
  }
];

// @route   GET /api/wellness/quote
// @desc    Get daily wellness quote
// @access  Private
router.get('/quote', auth, async (req, res) => {
  try {
    // Get quote based on current date for consistency
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % mockQuotes.length;
    
    const quote = mockQuotes[quoteIndex];

    res.json({
      success: true,
      quote,
      date: today.toISOString().split('T')[0]
    });

  } catch (error) {
    console.error('Get quote error:', error);
    res.status(500).json({ error: 'Failed to get quote' });
  }
});

// @route   POST /api/wellness/mood
// @desc    Track mood
// @access  Private
router.post('/mood', auth, [
  body('mood').isIn(['excellent', 'good', 'neutral', 'bad', 'terrible']).withMessage('Valid mood is required'),
  body('energy').isIn(['high', 'medium', 'low']).optional(),
  body('notes').optional().isString(),
  body('activities').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mood, energy, notes, activities } = req.body;

    // Update user stats
    await req.user.updateStats('wellness', 1);

    res.json({
      success: true,
      moodEntry: {
        mood,
        energy,
        notes,
        activities,
        timestamp: new Date()
      }
    });

  } catch (error) {
    console.error('Track mood error:', error);
    res.status(500).json({ error: 'Failed to track mood' });
  }
});

// @route   GET /api/wellness/activities
// @desc    Get wellness activities
// @access  Private
router.get('/activities', auth, [
  query('category').optional().isIn(['meditation', 'exercise', 'journaling', 'social', 'creative']),
  query('maxDuration').optional().isInt({ min: 1, max: 120 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category, maxDuration } = req.query;

    let activities = [...mockActivities];

    // Apply filters
    if (category) {
      activities = activities.filter(activity => activity.category === category);
    }

    if (maxDuration) {
      activities = activities.filter(activity => activity.duration <= parseInt(maxDuration));
    }

    res.json({
      success: true,
      activities
    });

  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ error: 'Failed to get activities' });
  }
});

// @route   GET /api/wellness/ai-assistant
// @desc    Get AI mood assistant (premium feature)
// @access  Private
router.get('/ai-assistant', auth, requireFeature('ai-mood-assistant'), async (req, res) => {
  try {
    // Mock AI assistant response
    const aiResponse = {
      analysis: "Based on your recent mood patterns, you seem to be experiencing some stress. This is normal and manageable.",
      suggestions: [
        "Try a 5-minute breathing exercise",
        "Take a short walk outside",
        "Write down your thoughts in a journal"
      ],
      resources: [
        {
          title: "Stress Management Techniques",
          url: "/wellness/stress-management",
          type: "article"
        },
        {
          title: "Mindfulness Meditation",
          url: "/wellness/meditation",
          type: "video"
        }
      ]
    };

    res.json({
      success: true,
      aiResponse
    });

  } catch (error) {
    console.error('AI assistant error:', error);
    res.status(500).json({ error: 'Failed to get AI assistant' });
  }
});

// @route   GET /api/wellness/stats
// @desc    Get wellness statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    // Mock wellness stats
    const stats = {
      currentStreak: 7,
      totalDays: req.user.stats.wellnessDays,
      averageMood: 'good',
      mostActiveDay: 'Wednesday',
      favoriteActivity: 'Deep Breathing',
      monthlyProgress: {
        excellent: 5,
        good: 15,
        neutral: 8,
        bad: 2,
        terrible: 0
      }
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Get wellness stats error:', error);
    res.status(500).json({ error: 'Failed to get wellness statistics' });
  }
});

// @route   POST /api/wellness/journal
// @desc    Add journal entry
// @access  Private
router.post('/journal', auth, [
  body('content').notEmpty().withMessage('Journal content is required'),
  body('mood').optional().isIn(['excellent', 'good', 'neutral', 'bad', 'terrible']),
  body('tags').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, mood, tags } = req.body;

    const journalEntry = {
      content,
      mood,
      tags: tags || [],
      timestamp: new Date()
    };

    res.json({
      success: true,
      journalEntry
    });

  } catch (error) {
    console.error('Add journal entry error:', error);
    res.status(500).json({ error: 'Failed to add journal entry' });
  }
});

// @route   GET /api/wellness/resources
// @desc    Get wellness resources
// @access  Private
router.get('/resources', auth, async (req, res) => {
  try {
    const resources = {
      articles: [
        {
          title: "10 Ways to Reduce Stress",
          description: "Simple techniques to manage daily stress",
          url: "/wellness/articles/stress-reduction",
          readTime: 5
        },
        {
          title: "Building Healthy Habits",
          description: "How to create lasting positive changes",
          url: "/wellness/articles/healthy-habits",
          readTime: 8
        }
      ],
      videos: [
        {
          title: "5-Minute Meditation",
          description: "Quick meditation for beginners",
          url: "/wellness/videos/meditation",
          duration: 5
        },
        {
          title: "Morning Routine",
          description: "Start your day with positivity",
          url: "/wellness/videos/morning-routine",
          duration: 10
        }
      ],
      tools: [
        {
          title: "Mood Tracker",
          description: "Track your daily mood patterns",
          url: "/wellness/tools/mood-tracker"
        },
        {
          title: "Breathing Exercise",
          description: "Guided breathing for relaxation",
          url: "/wellness/tools/breathing"
        }
      ]
    };

    res.json({
      success: true,
      resources
    });

  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ error: 'Failed to get wellness resources' });
  }
});

module.exports = router; 