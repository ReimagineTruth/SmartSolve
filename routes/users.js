const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        piUsername: req.user.piUsername,
        displayName: req.user.displayName,
        email: req.user.email,
        avatar: req.user.avatar,
        plan: req.user.subscription.plan,
        piBalance: req.user.piBalance,
        preferences: req.user.preferences,
        stats: req.user.stats,
        isSubscriptionActive: req.user.isSubscriptionActive,
        lastLogin: req.user.lastLogin
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('preferences.theme').optional().isIn(['light', 'dark', 'auto']),
  body('preferences.timezone').optional().notEmpty(),
  body('preferences.language').optional().isIn(['en', 'es', 'fr', 'de']),
  body('preferences.notifications.email').optional().isBoolean(),
  body('preferences.notifications.push').optional().isBoolean(),
  body('preferences.notifications.reminders').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { displayName, email, preferences } = req.body;

    // Check if email is already taken
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }

    // Update user
    if (displayName) req.user.displayName = displayName;
    if (email) req.user.email = email;
    if (preferences) {
      req.user.preferences = { ...req.user.preferences, ...preferences };
    }

    await req.user.save();

    res.json({
      success: true,
      user: {
        id: req.user._id,
        piUsername: req.user.piUsername,
        displayName: req.user.displayName,
        email: req.user.email,
        avatar: req.user.avatar,
        plan: req.user.subscription.plan,
        piBalance: req.user.piBalance,
        preferences: req.user.preferences,
        stats: req.user.stats
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// @route   POST /api/users/subscription
// @desc    Upgrade subscription
// @access  Private
router.post('/subscription', auth, [
  body('plan').isIn(['standard', 'premium', 'pro']).withMessage('Valid plan is required'),
  body('autoRenew').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { plan, autoRenew = false } = req.body;

    const planDetails = {
      standard: { price: 3, features: ['unlimited-tasks', 'advanced-budget', 'full-meal-planner', 'ai-mood-assistant', 'local-services'] },
      premium: { price: 6, features: ['family-sharing', 'kids-mode'] },
      pro: { price: 9, features: ['business-tools', 'team-collaboration'] }
    };

    const selectedPlan = planDetails[plan];
    if (!selectedPlan) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    // Check if user has enough Pi balance
    if (req.user.piBalance < selectedPlan.price) {
      return res.status(400).json({ 
        error: 'Insufficient Pi balance',
        required: selectedPlan.price,
        current: req.user.piBalance
      });
    }

    // Update subscription
    req.user.subscription.plan = plan;
    req.user.subscription.startDate = new Date();
    req.user.subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    req.user.subscription.autoRenew = autoRenew;
    req.user.subscription.piAmount = selectedPlan.price;

    // Deduct Pi from balance
    req.user.piBalance -= selectedPlan.price;

    await req.user.save();

    res.json({
      success: true,
      subscription: {
        plan: req.user.subscription.plan,
        startDate: req.user.subscription.startDate,
        endDate: req.user.subscription.endDate,
        autoRenew: req.user.subscription.autoRenew,
        piAmount: req.user.subscription.piAmount
      },
      newBalance: req.user.piBalance
    });

  } catch (error) {
    console.error('Upgrade subscription error:', error);
    res.status(500).json({ error: 'Failed to upgrade subscription' });
  }
});

// @route   POST /api/users/subscription/cancel
// @desc    Cancel subscription
// @access  Private
router.post('/subscription/cancel', auth, async (req, res) => {
  try {
    if (req.user.subscription.plan === 'free') {
      return res.status(400).json({ error: 'No active subscription to cancel' });
    }

    // Cancel auto-renewal
    req.user.subscription.autoRenew = false;

    await req.user.save();

    res.json({
      success: true,
      message: 'Subscription auto-renewal cancelled',
      subscription: {
        plan: req.user.subscription.plan,
        endDate: req.user.subscription.endDate,
        autoRenew: req.user.subscription.autoRenew
      }
    });

  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = {
      tasksCompleted: req.user.stats.tasksCompleted,
      totalSavings: req.user.stats.totalSavings,
      mealsPlanned: req.user.stats.mealsPlanned,
      wellnessDays: req.user.stats.wellnessDays,
      currentStreak: 7, // Mock data
      averageProductivity: 85, // Mock data
      monthlyProgress: {
        tasks: 45,
        savings: 150,
        meals: 12,
        wellness: 20
      }
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Failed to get user statistics' });
  }
});

// @route   POST /api/users/pi-balance
// @desc    Add Pi to balance (mock for testing)
// @access  Private
router.post('/pi-balance', auth, [
  body('amount').isFloat({ min: 0.01 }).withMessage('Valid amount is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount } = req.body;

    req.user.piBalance += parseFloat(amount);
    await req.user.save();

    res.json({
      success: true,
      newBalance: req.user.piBalance,
      added: parseFloat(amount)
    });

  } catch (error) {
    console.error('Add Pi balance error:', error);
    res.status(500).json({ error: 'Failed to add Pi balance' });
  }
});

// @route   GET /api/users/features
// @desc    Get available features for user's plan
// @access  Private
router.get('/features', auth, async (req, res) => {
  try {
    const allFeatures = {
      'unlimited-tasks': { name: 'Unlimited Tasks', description: 'Create unlimited tasks and reminders' },
      'advanced-budget': { name: 'Advanced Budget Tools', description: 'Detailed budget tracking and analytics' },
      'full-meal-planner': { name: 'Full Meal Planner', description: 'Unlimited meal suggestions and planning' },
      'ai-mood-assistant': { name: 'AI Mood Assistant', description: 'Personalized wellness recommendations' },
      'local-services': { name: 'Local Services', description: 'Browse and post local services' },
      'family-sharing': { name: 'Family Sharing', description: 'Share tasks and calendars with family' },
      'kids-mode': { name: 'Kids Mode', description: 'Child-friendly interface and features' },
      'business-tools': { name: 'Business Tools', description: 'Marketing and Pi income tracking' },
      'team-collaboration': { name: 'Team Collaboration', description: 'Work with teams and groups' }
    };

    const availableFeatures = {};
    const unavailableFeatures = {};

    Object.keys(allFeatures).forEach(feature => {
      if (req.user.canAccessFeature(feature)) {
        availableFeatures[feature] = allFeatures[feature];
      } else {
        unavailableFeatures[feature] = allFeatures[feature];
      }
    });

    res.json({
      success: true,
      currentPlan: req.user.subscription.plan,
      availableFeatures,
      unavailableFeatures
    });

  } catch (error) {
    console.error('Get features error:', error);
    res.status(500).json({ error: 'Failed to get features' });
  }
});

// @route   DELETE /api/users/account
// @desc    Delete user account
// @access  Private
router.delete('/account', auth, [
  body('confirmation').equals('DELETE').withMessage('Please type DELETE to confirm account deletion')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // In production, you would also delete associated data
    // await Task.deleteMany({ userId: req.user._id });
    // await Budget.deleteMany({ userId: req.user._id });
    // etc.

    await User.findByIdAndDelete(req.user._id);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

module.exports = router; 