import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowLeft, Calendar, User, Clock, Tag, Search, Filter } from 'lucide-react'

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blogPosts = [
    {
      id: 1,
      title: '10 Productivity Hacks That Will Transform Your Daily Routine',
      excerpt: 'Discover proven strategies to boost your productivity and make the most of every day. From time management techniques to digital tools that streamline your workflow.',
      author: 'Sarah Johnson',
      date: 'January 15, 2024',
      readTime: '5 min read',
      category: 'productivity',
      tags: ['Productivity', 'Time Management', 'Workflow'],
      image: '📈',
      featured: true
    },
    {
      id: 2,
      title: 'How Pi Network is Revolutionizing Digital Payments',
      excerpt: 'Explore how blockchain technology and Pi Network are making digital payments more accessible, secure, and user-friendly for everyone.',
      author: 'Michael Chen',
      date: 'January 12, 2024',
      readTime: '7 min read',
      category: 'blockchain',
      tags: ['Pi Network', 'Blockchain', 'Payments'],
      image: '🔗',
      featured: false
    },
    {
      id: 3,
      title: 'The Ultimate Guide to Family Task Management',
      excerpt: 'Learn how to organize household tasks, coordinate family schedules, and create a harmonious home environment with smart planning tools.',
      author: 'Emily Rodriguez',
      date: 'January 10, 2024',
      readTime: '6 min read',
      category: 'family',
      tags: ['Family', 'Organization', 'Planning'],
      image: '👨‍👩‍👧‍👦',
      featured: false
    },
    {
      id: 4,
      title: 'Budgeting with Pi: A Complete Guide to Digital Finance',
      excerpt: 'Master the art of digital budgeting using Pi Network. Learn how to track expenses, set financial goals, and build wealth in the digital age.',
      author: 'David Kim',
      date: 'January 8, 2024',
      readTime: '8 min read',
      category: 'finance',
      tags: ['Budgeting', 'Pi Network', 'Finance'],
      image: '💰',
      featured: false
    },
    {
      id: 5,
      title: 'Meal Planning Made Simple: A SmartSolve Approach',
      excerpt: 'Transform your meal planning with our comprehensive guide. Save time, money, and stress while enjoying delicious, healthy meals every day.',
      author: 'Lisa Thompson',
      date: 'January 5, 2024',
      readTime: '4 min read',
      category: 'lifestyle',
      tags: ['Meal Planning', 'Health', 'Organization'],
      image: '🍽️',
      featured: false
    },
    {
      id: 6,
      title: 'The Future of Productivity: AI-Powered Task Management',
      excerpt: 'Discover how artificial intelligence is reshaping the way we manage tasks, prioritize work, and achieve our goals more efficiently.',
      author: 'Alex Martinez',
      date: 'January 3, 2024',
      readTime: '9 min read',
      category: 'technology',
      tags: ['AI', 'Productivity', 'Technology'],
      image: '🤖',
      featured: false
    },
    {
      id: 7,
      title: 'Wellness Tracking: The Key to a Balanced Life',
      excerpt: 'Learn how to monitor your mental and physical wellness, set meaningful goals, and create sustainable habits for a healthier lifestyle.',
      author: 'Sarah Johnson',
      date: 'December 30, 2023',
      readTime: '6 min read',
      category: 'wellness',
      tags: ['Wellness', 'Health', 'Balance'],
      image: '🧘‍♀️',
      featured: false
    },
    {
      id: 8,
      title: 'Building a Remote Team with SmartSolve',
      excerpt: 'Discover how SmartSolve helps remote teams stay connected, organized, and productive regardless of their physical location.',
      author: 'Michael Chen',
      date: 'December 28, 2023',
      readTime: '5 min read',
      category: 'business',
      tags: ['Remote Work', 'Team Collaboration', 'Business'],
      image: '🏢',
      featured: false
    }
  ]

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'family', name: 'Family' },
    { id: 'finance', name: 'Finance' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'technology', name: 'Technology' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'business', name: 'Business' }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg mr-3 flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-text">SmartSolve</h1>
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-text mb-6">SmartSolve Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tips, and stories about productivity, blockchain technology, and making life easier with SmartSolve.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-text mb-6">Featured Article</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{featuredPost.image}</span>
                  <div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {featuredPost.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-text mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
                >
                  Read Full Article →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{post.image}</span>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-text mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors text-sm"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-6 opacity-90">
            Get the latest productivity tips, blockchain insights, and SmartSolve updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-text mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => (
              <Link
                key={category.id}
                to={`/blog/category/${category.id}`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-text">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {blogPosts.filter(post => post.category === category.id).length} articles
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog 