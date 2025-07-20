const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Pi Network authentication simulation (in real app, this would use Pi SDK)
const simulatePiAuth = async (piUsername, piUserId) => {
  // In production, this would validate with Pi Network API
  return {
    username: piUsername,
    userId: piUserId,
    email: `${piUsername}@pi.network`,
    displayName: piUsername
  };
};

// @route   POST /api/auth/pi-signin
// @desc    Sign in with Pi Network
// @access  Public
router.post('/pi-signin', [
  body('piUsername').notEmpty().withMessage('Pi username is required'),
  body('piUserId').notEmpty().withMessage('Pi user ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { piUsername, piUserId } = req.body;

    // Simulate Pi Network authentication
    const piUser = await simulatePiAuth(piUsername, piUserId);

    // Check if user exists
    let user = await User.findOne({ piUserId: piUser.userId });

    if (!user) {
      // Create new user
      user = new User({
        piUsername: piUser.username,
        piUserId: piUser.userId,
        email: piUser.email,
        displayName: piUser.displayName,
        subscription: {
          plan: 'free',
          startDate: new Date(),
          autoRenew: false,
          piAmount: 0
        }
      });

      await user.save();
      console.log(`New user created: ${piUser.username}`);
    } else {
      // Update last login
      user.lastLogin = new Date();
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'smartsolve-jwt-secret',
      { expiresIn: '7d' }
    );

    // Store token in session
    req.session.token = token;

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        piUsername: user.piUsername,
        displayName: user.displayName,
        email: user.email,
        plan: user.subscription.plan,
        piBalance: user.piBalance,
        preferences: user.preferences,
        stats: user.stats
      }
    });

  } catch (error) {
    console.error('Pi signin error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// @route   POST /api/auth/pi-signup
// @desc    Sign up with Pi Network
// @access  Public
router.post('/pi-signup', [
  body('piUsername').notEmpty().withMessage('Pi username is required'),
  body('piUserId').notEmpty().withMessage('Pi user ID is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('displayName').notEmpty().withMessage('Display name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { piUsername, piUserId, email, displayName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ piUserId }, { email }, { piUsername }]
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({
      piUsername,
      piUserId,
      email,
      displayName,
      subscription: {
        plan: 'free',
        startDate: new Date(),
        autoRenew: false,
        piAmount: 0
      }
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'smartsolve-jwt-secret',
      { expiresIn: '7d' }
    );

    // Store token in session
    req.session.token = token;

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        piUsername: user.piUsername,
        displayName: user.displayName,
        email: user.email,
        plan: user.subscription.plan,
        piBalance: user.piBalance,
        preferences: user.preferences,
        stats: user.stats
      }
    });

  } catch (error) {
    console.error('Pi signup error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', auth, async (req, res) => {
  try {
    // Clear session
    req.session.destroy();
    
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        piUsername: req.user.piUsername,
        displayName: req.user.displayName,
        email: req.user.email,
        plan: req.user.subscription.plan,
        piBalance: req.user.piBalance,
        preferences: req.user.preferences,
        stats: req.user.stats,
        isSubscriptionActive: req.user.isSubscriptionActive
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('displayName').optional().notEmpty().withMessage('Display name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('preferences.theme').optional().isIn(['light', 'dark', 'auto']),
  body('preferences.timezone').optional().notEmpty(),
  body('preferences.language').optional().isIn(['en', 'es', 'fr', 'de'])
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

// @route   POST /api/auth/refresh
// @desc    Refresh JWT token
// @access  Private
router.post('/refresh', auth, async (req, res) => {
  try {
    // Generate new token
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET || 'smartsolve-jwt-secret',
      { expiresIn: '7d' }
    );

    // Update session
    req.session.token = token;

    res.json({
      success: true,
      token
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

module.exports = router; 