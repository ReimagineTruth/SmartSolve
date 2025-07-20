const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['monthly', 'weekly', 'yearly', 'custom'],
    default: 'monthly'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalBudget: {
    type: Number,
    required: true,
    min: 0
  },
  spent: {
    type: Number,
    default: 0,
    min: 0
  },
  categories: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    budget: {
      type: Number,
      required: true,
      min: 0
    },
    spent: {
      type: Number,
      default: 0,
      min: 0
    },
    color: {
      type: String,
      default: '#A3CFFA'
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  currency: {
    type: String,
    default: 'Pi'
  },
  savingsGoal: {
    type: Number,
    default: 0
  },
  notifications: {
    overspending: {
      type: Boolean,
      default: true
    },
    lowBalance: {
      type: Boolean,
      default: true
    },
    goalReached: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
budgetSchema.index({ userId: 1, isActive: 1 });
budgetSchema.index({ userId: 1, startDate: 1, endDate: 1 });

// Virtual for remaining budget
budgetSchema.virtual('remaining').get(function() {
  return Math.max(0, this.totalBudget - this.spent);
});

// Virtual for spending percentage
budgetSchema.virtual('spendingPercentage').get(function() {
  if (this.totalBudget === 0) return 0;
  return (this.spent / this.totalBudget) * 100;
});

// Virtual for savings
budgetSchema.virtual('savings').get(function() {
  return Math.max(0, this.totalBudget - this.spent);
});

// Method to add expense
budgetSchema.methods.addExpense = function(amount, categoryName) {
  this.spent += amount;
  
  // Update category spending
  const category = this.categories.find(cat => cat.name === categoryName);
  if (category) {
    category.spent += amount;
  }
  
  return this.save();
};

// Method to update category budget
budgetSchema.methods.updateCategoryBudget = function(categoryName, newBudget) {
  const category = this.categories.find(cat => cat.name === categoryName);
  if (category) {
    const difference = newBudget - category.budget;
    category.budget = newBudget;
    this.totalBudget += difference;
    return this.save();
  }
  return Promise.reject(new Error('Category not found'));
};

// Method to get spending by category
budgetSchema.methods.getCategorySpending = function() {
  return this.categories.map(category => ({
    name: category.name,
    budget: category.budget,
    spent: category.spent,
    remaining: Math.max(0, category.budget - category.spent),
    percentage: category.budget > 0 ? (category.spent / category.budget) * 100 : 0,
    color: category.color
  }));
};

// Method to check if budget is overspent
budgetSchema.methods.isOverspent = function() {
  return this.spent > this.totalBudget;
};

// Method to get budget status
budgetSchema.methods.getStatus = function() {
  const percentage = this.spendingPercentage;
  if (percentage >= 100) return 'overspent';
  if (percentage >= 90) return 'warning';
  if (percentage >= 75) return 'caution';
  return 'good';
};

// Static method to get user's active budget
budgetSchema.statics.getActiveBudget = function(userId) {
  const now = new Date();
  return this.findOne({
    userId,
    isActive: true,
    startDate: { $lte: now },
    endDate: { $gte: now }
  });
};

// Static method to get budget history
budgetSchema.statics.getBudgetHistory = function(userId, limit = 10) {
  return this.find({ userId })
    .sort({ startDate: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Budget', budgetSchema); 