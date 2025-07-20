const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { auth, requireFeature } = require('../middleware/auth');

const router = express.Router();

// Mock services data
const mockServices = [
  {
    id: 1,
    title: 'House Cleaning',
    description: 'Professional house cleaning service',
    category: 'home',
    provider: {
      id: 'user1',
      name: 'Sarah Johnson',
      rating: 4.8,
      reviews: 15
    },
    price: 25,
    currency: 'Pi',
    location: 'New York, NY',
    availability: 'Weekends',
    tags: ['cleaning', 'home', 'professional']
  },
  {
    id: 2,
    title: 'Tutoring - Math',
    description: 'Experienced math tutor for all levels',
    category: 'education',
    provider: {
      id: 'user2',
      name: 'Mike Chen',
      rating: 4.9,
      reviews: 23
    },
    price: 15,
    currency: 'Pi',
    location: 'Online',
    availability: 'Evenings',
    tags: ['education', 'math', 'tutoring']
  },
  {
    id: 3,
    title: 'Grocery Shopping',
    description: 'I\'ll do your grocery shopping for you',
    category: 'errands',
    provider: {
      id: 'user3',
      name: 'Lisa Rodriguez',
      rating: 4.7,
      reviews: 8
    },
    price: 10,
    currency: 'Pi',
    location: 'Los Angeles, CA',
    availability: 'Weekdays',
    tags: ['errands', 'shopping', 'convenience']
  }
];

// @route   GET /api/services
// @desc    Get local services
// @access  Private
router.get('/', auth, requireFeature('local-services'), [
  query('category').optional().isString(),
  query('location').optional().isString(),
  query('maxPrice').optional().isFloat({ min: 0 }),
  query('search').optional().isString(),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('page').optional().isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      category,
      location,
      maxPrice,
      search,
      limit = 10,
      page = 1
    } = req.query;

    let services = [...mockServices];

    // Apply filters
    if (category) {
      services = services.filter(service => service.category === category);
    }

    if (location) {
      services = services.filter(service => 
        service.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (maxPrice) {
      services = services.filter(service => service.price <= parseFloat(maxPrice));
    }

    if (search) {
      services = services.filter(service =>
        service.title.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Pagination
    const skip = (page - 1) * limit;
    const paginatedServices = services.slice(skip, skip + parseInt(limit));

    res.json({
      success: true,
      services: paginatedServices,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: services.length,
        pages: Math.ceil(services.length / limit)
      }
    });

  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Failed to get services' });
  }
});

// @route   POST /api/services
// @desc    Create new service listing
// @access  Private
router.post('/', auth, requireFeature('local-services'), [
  body('title').notEmpty().withMessage('Service title is required'),
  body('description').notEmpty().withMessage('Service description is required'),
  body('category').isIn(['home', 'education', 'errands', 'health', 'technology', 'other']).withMessage('Valid category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('availability').notEmpty().withMessage('Availability is required'),
  body('tags').optional().isArray()
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
      price,
      location,
      availability,
      tags
    } = req.body;

    const newService = {
      id: Date.now(),
      title,
      description,
      category,
      provider: {
        id: req.user._id.toString(),
        name: req.user.displayName,
        rating: 0,
        reviews: 0
      },
      price,
      currency: 'Pi',
      location,
      availability,
      tags: tags || [],
      createdAt: new Date()
    };

    res.status(201).json({
      success: true,
      service: newService
    });

  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// @route   GET /api/services/:id
// @desc    Get single service
// @access  Private
router.get('/:id', auth, requireFeature('local-services'), async (req, res) => {
  try {
    const service = mockServices.find(s => s.id === parseInt(req.params.id));

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({
      success: true,
      service
    });

  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ error: 'Failed to get service' });
  }
});

// @route   PUT /api/services/:id
// @desc    Update service
// @access  Private
router.put('/:id', auth, requireFeature('local-services'), [
  body('title').optional().notEmpty().withMessage('Service title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Service description cannot be empty'),
  body('price').optional().isFloat({ min: 0 }),
  body('availability').optional().notEmpty().withMessage('Availability cannot be empty'),
  body('tags').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = mockServices.find(s => s.id === parseInt(req.params.id));

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Check if user owns this service
    if (service.provider.id !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this service' });
    }

    const {
      title,
      description,
      price,
      availability,
      tags
    } = req.body;

    // Update service
    if (title) service.title = title;
    if (description) service.description = description;
    if (price) service.price = price;
    if (availability) service.availability = availability;
    if (tags) service.tags = tags;

    res.json({
      success: true,
      service
    });

  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete service
// @access  Private
router.delete('/:id', auth, requireFeature('local-services'), async (req, res) => {
  try {
    const service = mockServices.find(s => s.id === parseInt(req.params.id));

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Check if user owns this service
    if (service.provider.id !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this service' });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });

  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// @route   POST /api/services/:id/book
// @desc    Book a service
// @access  Private
router.post('/:id/book', auth, requireFeature('local-services'), [
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('notes').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = mockServices.find(s => s.id === parseInt(req.params.id));

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const { date, time, notes } = req.body;

    const booking = {
      id: Date.now(),
      serviceId: service.id,
      serviceTitle: service.title,
      providerId: service.provider.id,
      providerName: service.provider.name,
      customerId: req.user._id.toString(),
      customerName: req.user.displayName,
      date: new Date(date),
      time,
      notes,
      status: 'pending',
      price: service.price,
      currency: service.currency,
      createdAt: new Date()
    };

    res.status(201).json({
      success: true,
      booking
    });

  } catch (error) {
    console.error('Book service error:', error);
    res.status(500).json({ error: 'Failed to book service' });
  }
});

// @route   GET /api/services/categories
// @desc    Get service categories
// @access  Private
router.get('/categories', auth, requireFeature('local-services'), async (req, res) => {
  try {
    const categories = [
      { id: 'home', name: 'Home Services', icon: 'home' },
      { id: 'education', name: 'Education', icon: 'graduation-cap' },
      { id: 'errands', name: 'Errands', icon: 'shopping-cart' },
      { id: 'health', name: 'Health & Wellness', icon: 'heart' },
      { id: 'technology', name: 'Technology', icon: 'laptop' },
      { id: 'other', name: 'Other', icon: 'ellipsis-h' }
    ];

    res.json({
      success: true,
      categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

// @route   GET /api/services/my-listings
// @desc    Get user's service listings
// @access  Private
router.get('/my-listings', auth, requireFeature('local-services'), async (req, res) => {
  try {
    const userServices = mockServices.filter(
      service => service.provider.id === req.user._id.toString()
    );

    res.json({
      success: true,
      services: userServices
    });

  } catch (error) {
    console.error('Get my listings error:', error);
    res.status(500).json({ error: 'Failed to get your listings' });
  }
});

module.exports = router; 