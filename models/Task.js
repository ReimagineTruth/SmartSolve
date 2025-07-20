const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['personal', 'work', 'health', 'finance', 'family', 'shopping', 'other'],
    default: 'personal'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  estimatedTime: {
    type: Number, // in minutes
    default: 0
  },
  actualTime: {
    type: Number, // in minutes
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  recurring: {
    isRecurring: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      default: 'daily'
    },
    interval: {
      type: Number,
      default: 1
    },
    endDate: {
      type: Date
    }
  },
  reminders: [{
    time: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      enum: ['email', 'push', 'sms'],
      default: 'push'
    },
    sent: {
      type: Boolean,
      default: false
    }
  }],
  attachments: [{
    filename: String,
    url: String,
    size: Number,
    type: String
  }],
  notes: [{
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  collaborators: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['viewer', 'editor', 'admin'],
      default: 'viewer'
    }
  }],
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better query performance
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, dueDate: 1 });
taskSchema.index({ userId: 1, category: 1 });
taskSchema.index({ userId: 1, priority: 1 });

// Virtual for overdue status
taskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.status === 'completed') return false;
  return new Date() > this.dueDate;
});

// Virtual for time remaining
taskSchema.virtual('timeRemaining').get(function() {
  if (!this.dueDate) return null;
  const now = new Date();
  const due = new Date(this.dueDate);
  return Math.max(0, due - now);
});

// Method to mark task as completed
taskSchema.methods.complete = function() {
  this.status = 'completed';
  this.completedAt = new Date();
  return this.save();
};

// Method to add reminder
taskSchema.methods.addReminder = function(time, type = 'push') {
  this.reminders.push({
    time: new Date(time),
    type: type,
    sent: false
  });
  return this.save();
};

// Method to add note
taskSchema.methods.addNote = function(content) {
  this.notes.push({
    content: content,
    createdAt: new Date()
  });
  return this.save();
};

// Static method to get tasks by user and filters
taskSchema.statics.getUserTasks = function(userId, filters = {}) {
  const query = { userId };
  
  if (filters.status) query.status = filters.status;
  if (filters.category) query.category = filters.category;
  if (filters.priority) query.priority = filters.priority;
  if (filters.dueDate) {
    const date = new Date(filters.dueDate);
    query.dueDate = {
      $gte: date,
      $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
    };
  }
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }

  return this.find(query).sort({ dueDate: 1, priority: -1 });
};

// Pre-save middleware to handle recurring tasks
taskSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed' && this.recurring.isRecurring) {
    // Create next recurring task
    const nextTask = new this.constructor({
      ...this.toObject(),
      _id: undefined,
      status: 'pending',
      completedAt: undefined,
      dueDate: this.calculateNextDueDate()
    });
    nextTask.save();
  }
  next();
});

// Method to calculate next due date for recurring tasks
taskSchema.methods.calculateNextDueDate = function() {
  if (!this.recurring.isRecurring || !this.dueDate) return null;
  
  const currentDue = new Date(this.dueDate);
  const interval = this.recurring.interval;
  
  switch (this.recurring.pattern) {
    case 'daily':
      return new Date(currentDue.getTime() + interval * 24 * 60 * 60 * 1000);
    case 'weekly':
      return new Date(currentDue.getTime() + interval * 7 * 24 * 60 * 60 * 1000);
    case 'monthly':
      return new Date(currentDue.getFullYear(), currentDue.getMonth() + interval, currentDue.getDate());
    case 'yearly':
      return new Date(currentDue.getFullYear() + interval, currentDue.getMonth(), currentDue.getDate());
    default:
      return currentDue;
  }
};

module.exports = mongoose.model('Task', taskSchema); 