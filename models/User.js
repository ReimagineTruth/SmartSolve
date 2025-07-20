const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  piUsername: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  piUserId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  plan: {
    type: String,
    enum: ['free', 'standard', 'premium', 'pro'],
    default: 'free'
  },
  piBalance: {
    type: Number,
    default: 0
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      reminders: { type: Boolean, default: true }
    },
    timezone: {
      type: String,
      default: 'UTC'
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  stats: {
    tasksCompleted: { type: Number, default: 0 },
    totalSavings: { type: Number, default: 0 },
    mealsPlanned: { type: Number, default: 0 },
    wellnessDays: { type: Number, default: 0 }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'standard', 'premium', 'pro'],
      default: 'free'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    },
    autoRenew: {
      type: Boolean,
      default: false
    },
    piAmount: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ piUsername: 1 });
userSchema.index({ email: 1 });
userSchema.index({ plan: 1 });

// Virtual for subscription status
userSchema.virtual('isSubscriptionActive').get(function() {
  if (this.subscription.plan === 'free') return true;
  return this.subscription.endDate && this.subscription.endDate > new Date();
});

// Method to update user stats
userSchema.methods.updateStats = function(type, value = 1) {
  switch(type) {
    case 'task':
      this.stats.tasksCompleted += value;
      break;
    case 'savings':
      this.stats.totalSavings += value;
      break;
    case 'meal':
      this.stats.mealsPlanned += value;
      break;
    case 'wellness':
      this.stats.wellnessDays += value;
      break;
  }
  return this.save();
};

// Method to check if user can access premium features
userSchema.methods.canAccessFeature = function(feature) {
  const featureAccess = {
    'unlimited-tasks': ['standard', 'premium', 'pro'],
    'advanced-budget': ['standard', 'premium', 'pro'],
    'full-meal-planner': ['standard', 'premium', 'pro'],
    'ai-mood-assistant': ['standard', 'premium', 'pro'],
    'local-services': ['standard', 'premium', 'pro'],
    'family-sharing': ['premium', 'pro'],
    'kids-mode': ['premium', 'pro'],
    'business-tools': ['pro'],
    'team-collaboration': ['pro']
  };

  const userPlan = this.subscription.plan;
  return featureAccess[feature]?.includes(userPlan) || false;
};

// Pre-save middleware to update lastLogin
userSchema.pre('save', function(next) {
  if (this.isModified('lastLogin')) {
    this.lastLogin = new Date();
  }
  next();
});

module.exports = mongoose.model('User', userSchema); 