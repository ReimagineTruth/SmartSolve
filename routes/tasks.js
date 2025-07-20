const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Task = require('../models/Task');
const User = require('../models/User');
const { auth, requireFeature } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get user tasks with filters
// @access  Private
router.get('/', auth, [
  query('status').optional().isIn(['pending', 'in-progress', 'completed', 'cancelled']),
  query('category').optional().isIn(['personal', 'work', 'health', 'finance', 'family', 'shopping', 'other']),
  query('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  query('search').optional().isString(),
  query('dueDate').optional().isISO8601(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('page').optional().isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      status,
      category,
      priority,
      search,
      dueDate,
      limit = 20,
      page = 1
    } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (category) filters.category = category;
    if (priority) filters.priority = priority;
    if (search) filters.search = search;
    if (dueDate) filters.dueDate = dueDate;

    const skip = (page - 1) * limit;

    const tasks = await Task.getUserTasks(req.user._id, filters)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('collaborators.userId', 'displayName piUsername');

    const total = await Task.countDocuments({ userId: req.user._id });

    res.json({
      success: true,
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to get tasks' });
  }
});

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post('/', auth, [
  body('title').notEmpty().withMessage('Task title is required'),
  body('description').optional().isString(),
  body('category').optional().isIn(['personal', 'work', 'health', 'finance', 'family', 'shopping', 'other']),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('dueDate').optional().isISO8601(),
  body('estimatedTime').optional().isInt({ min: 0 }),
  body('tags').optional().isArray(),
  body('recurring.isRecurring').optional().isBoolean(),
  body('recurring.pattern').optional().isIn(['daily', 'weekly', 'monthly', 'yearly']),
  body('recurring.interval').optional().isInt({ min: 1 }),
  body('recurring.endDate').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      category,
      priority,
      dueDate,
      estimatedTime,
      tags,
      recurring,
      reminders
    } = req.body;

    // Check task limits for free plan
    if (req.user.subscription.plan === 'free') {
      const pendingTasks = await Task.countDocuments({
        userId: req.user._id,
        status: { $in: ['pending', 'in-progress'] }
      });

      if (pendingTasks >= 10) {
        return res.status(403).json({
          error: 'Task limit reached for free plan. Upgrade to add more tasks.',
          limit: 10,
          current: pendingTasks
        });
      }
    }

    const task = new Task({
      userId: req.user._id,
      title,
      description,
      category,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      estimatedTime,
      tags: tags || [],
      recurring: recurring || { isRecurring: false },
      reminders: reminders || []
    });

    await task.save();

    // Update user stats
    await req.user.updateStats('task', 0); // Count as created, not completed

    res.status(201).json({
      success: true,
      task
    });

  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('collaborators.userId', 'displayName piUsername');

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      success: true,
      task
    });

  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Failed to get task' });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', auth, [
  body('title').optional().notEmpty().withMessage('Task title cannot be empty'),
  body('description').optional().isString(),
  body('category').optional().isIn(['personal', 'work', 'health', 'finance', 'family', 'shopping', 'other']),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('status').optional().isIn(['pending', 'in-progress', 'completed', 'cancelled']),
  body('dueDate').optional().isISO8601(),
  body('estimatedTime').optional().isInt({ min: 0 }),
  body('actualTime').optional().isInt({ min: 0 }),
  body('tags').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const {
      title,
      description,
      category,
      priority,
      status,
      dueDate,
      estimatedTime,
      actualTime,
      tags
    } = req.body;

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (category !== undefined) task.category = category;
    if (priority !== undefined) task.priority = priority;
    if (status !== undefined) task.status = status;
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;
    if (estimatedTime !== undefined) task.estimatedTime = estimatedTime;
    if (actualTime !== undefined) task.actualTime = actualTime;
    if (tags !== undefined) task.tags = tags;

    // Handle completion
    if (status === 'completed' && task.status !== 'completed') {
      task.completedAt = new Date();
      await req.user.updateStats('task', 1);
    }

    await task.save();

    res.json({
      success: true,
      task
    });

  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });

  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// @route   POST /api/tasks/:id/complete
// @desc    Mark task as completed
// @access  Private
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.status === 'completed') {
      return res.status(400).json({ error: 'Task is already completed' });
    }

    await task.complete();
    await req.user.updateStats('task', 1);

    res.json({
      success: true,
      task
    });

  } catch (error) {
    console.error('Complete task error:', error);
    res.status(500).json({ error: 'Failed to complete task' });
  }
});

// @route   POST /api/tasks/:id/reminder
// @desc    Add reminder to task
// @access  Private
router.post('/:id/reminder', auth, [
  body('time').isISO8601().withMessage('Valid reminder time is required'),
  body('type').optional().isIn(['email', 'push', 'sms'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { time, type = 'push' } = req.body;

    await task.addReminder(time, type);

    res.json({
      success: true,
      task
    });

  } catch (error) {
    console.error('Add reminder error:', error);
    res.status(500).json({ error: 'Failed to add reminder' });
  }
});

// @route   POST /api/tasks/:id/note
// @desc    Add note to task
// @access  Private
router.post('/:id/note', auth, [
  body('content').notEmpty().withMessage('Note content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { content } = req.body;

    await task.addNote(content);

    res.json({
      success: true,
      task
    });

  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ error: 'Failed to add note' });
  }
});

// @route   GET /api/tasks/stats/overview
// @desc    Get task statistics
// @access  Private
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
          },
          overdue: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $ne: ['$status', 'completed'] },
                    { $lt: ['$dueDate', new Date()] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    const categoryStats = await Task.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          }
        }
      }
    ]);

    const priorityStats = await Task.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        total: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
        overdue: 0
      },
      categoryStats,
      priorityStats
    });

  } catch (error) {
    console.error('Get task stats error:', error);
    res.status(500).json({ error: 'Failed to get task statistics' });
  }
});

module.exports = router; 