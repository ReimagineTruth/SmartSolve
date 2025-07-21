import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Target, Users, Globe, Heart, Award, ArrowLeft, Zap, Shield, Lightbulb } from 'lucide-react'
import Footer from '../components/Footer'

const About: React.FC = () => {
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
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-text mb-6">About SmartSolve</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering families and businesses with Pi-powered productivity tools that make life easier, 
            more organized, and more fulfilling.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-text mb-4">Our Mission</h2>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              At SmartSolve, we believe that productivity shouldn't be complicated. Our mission is to create intuitive, 
              powerful tools that help families and businesses organize their lives, manage their finances, plan their meals, 
              and track their wellness - all while leveraging the innovative Pi Network for secure, decentralized payments.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-text mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                SmartSolve was born from a simple observation: modern life is complex, but our tools for managing it 
                shouldn't be. Founded by the team at Mrwain Organization, we set out to create a comprehensive 
                productivity platform that truly serves the needs of families and businesses.
              </p>
              <p>
                We recognized the potential of the Pi Network to revolutionize how people pay for digital services, 
                and we wanted to be at the forefront of this innovation. By integrating Pi payments into our platform, 
                we're making productivity tools accessible to everyone, everywhere.
              </p>
              <p>
                Today, SmartSolve serves thousands of users worldwide, helping them organize their tasks, 
                manage their budgets, plan their meals, and track their wellness - all with the security and 
                efficiency of Pi Network payments.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Why Pi Network?</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Zap className="h-5 w-5 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Secure & Decentralized</h4>
                  <p className="text-sm opacity-90">Payments processed through blockchain technology</p>
                </div>
              </div>
              <div className="flex items-start">
                <Globe className="h-5 w-5 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Global Access</h4>
                  <p className="text-sm opacity-90">Available to users worldwide without traditional banking barriers</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Privacy Focused</h4>
                  <p className="text-sm opacity-90">Your financial data stays private and secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">Our Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">User-First Design</h3>
              <p className="text-gray-600">
                Every feature we build is designed with our users' needs in mind. We believe technology should 
                make life easier, not more complicated.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">Security & Privacy</h3>
              <p className="text-gray-600">
                We take your data security seriously. Your information is protected with industry-standard 
                encryption and privacy measures.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">Innovation</h3>
              <p className="text-gray-600">
                We're constantly exploring new technologies and approaches to make our platform better, 
                more efficient, and more useful.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in the power of community. We listen to our users, collaborate with partners, 
                and build relationships that last.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from the quality of our code to the 
                support we provide to our users.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">Global Impact</h3>
              <p className="text-gray-600">
                We're building tools that can help people around the world organize their lives and 
                achieve their goals, regardless of where they are.
              </p>
            </div>
          </div>
        </div>

        {/* Mrwain Organization Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text mb-4">Mrwain Organization</h2>
            <p className="text-gray-600">The team behind SmartSolve</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-text mb-4">Who We Are</h3>
                <p className="text-gray-700 mb-4">
                  Mrwain Organization is a forward-thinking technology company dedicated to creating innovative 
                  solutions that leverage blockchain technology and decentralized systems. We believe in the 
                  power of technology to make the world a better place.
                </p>
                <p className="text-gray-700">
                  Our team consists of experienced developers, designers, and product managers who are passionate 
                  about building tools that truly serve people's needs. We're committed to excellence, innovation, 
                  and user satisfaction.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-text mb-4">Our Expertise</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Full-stack web development
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Blockchain integration
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    User experience design
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Product management
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Cloud infrastructure
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Security and compliance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-gray-600">Tasks Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of users who are already organizing their lives with SmartSolve
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Plans
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About 