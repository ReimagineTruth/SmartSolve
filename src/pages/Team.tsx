import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowLeft, Linkedin, Twitter, Github, Mail, Users, Award, Zap, Shield } from 'lucide-react'
import Footer from '../components/Footer'

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '👩‍💼',
      bio: 'Visionary leader with 15+ years in tech. Passionate about making productivity accessible to everyone through innovative blockchain solutions.',
      expertise: ['Product Strategy', 'Blockchain Integration', 'Team Leadership'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'sarah@smartsolve.com'
      }
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Lead Developer',
      image: '👨‍💻',
      bio: 'Full-stack developer with expertise in React, Node.js, and blockchain technologies. Architect of SmartSolve\'s core platform.',
      expertise: ['Full-Stack Development', 'Blockchain', 'System Architecture'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'michael@smartsolve.com'
      }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: '👩‍🎨',
      bio: 'UX/UI designer focused on creating intuitive, beautiful interfaces that make complex tasks feel simple and enjoyable.',
      expertise: ['UX/UI Design', 'User Research', 'Design Systems'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'emily@smartsolve.com'
      }
    },
    {
      name: 'David Kim',
      role: 'Product Manager',
      image: '👨‍💼',
      bio: 'Product strategist with a knack for understanding user needs and translating them into powerful, user-friendly features.',
      expertise: ['Product Management', 'User Experience', 'Market Research'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'david@smartsolve.com'
      }
    },
    {
      name: 'Lisa Thompson',
      role: 'Head of Marketing',
      image: '👩‍💼',
      bio: 'Marketing expert specializing in growth strategies and community building. Passionate about spreading the word about Pi-powered productivity.',
      expertise: ['Digital Marketing', 'Growth Strategy', 'Community Building'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'lisa@smartsolve.com'
      }
    },
    {
      name: 'Alex Martinez',
      role: 'Senior Developer',
      image: '👨‍💻',
      bio: 'Backend specialist with deep knowledge of cloud infrastructure and security. Ensures SmartSolve runs smoothly and securely.',
      expertise: ['Backend Development', 'Cloud Infrastructure', 'Security'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'alex@smartsolve.com'
      }
    }
  ]

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
          <h1 className="text-5xl font-bold text-text mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate individuals behind SmartSolve, dedicated to making productivity accessible 
            to everyone through innovative Pi-powered solutions.
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-primary mb-2">6</div>
            <div className="text-gray-600">Team Members</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-primary mb-2">50+</div>
            <div className="text-gray-600">Years Combined Experience</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600">Dedication</div>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{member.image}</div>
                  <h3 className="text-xl font-bold text-text mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold">{member.role}</p>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-text mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={member.social.github}
                    className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-secondary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text mb-4">Our Team Values</h2>
            <p className="text-gray-600">The principles that guide our work and collaboration</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-text mb-2">Collaboration</h3>
              <p className="text-gray-600 text-sm">
                We believe the best solutions come from working together and sharing diverse perspectives.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-text mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                We constantly explore new technologies and approaches to solve complex problems.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-text mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">
                We maintain high standards in everything we do, from code quality to user experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-text mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                We strive for excellence in every aspect of our work and user interactions.
              </p>
            </div>
          </div>
        </div>

        {/* Culture Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-text mb-6">Our Culture</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                At Mrwain Organization, we foster a culture of continuous learning, innovation, and mutual respect. 
                Our team members are encouraged to think creatively, take ownership of their work, and collaborate 
                effectively to achieve our shared goals.
              </p>
              <p>
                We believe in the power of diversity and inclusion, recognizing that different perspectives lead to 
                better solutions. Our team brings together individuals from various backgrounds, each contributing 
                unique skills and insights to our mission.
              </p>
              <p>
                We're committed to work-life balance and personal growth, understanding that happy, fulfilled team 
                members create the best products and provide the best service to our users.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Why Work With Us?</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-white/20 rounded-full mr-3 mt-1 flex items-center justify-center">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Cutting-Edge Technology</h4>
                  <p className="text-sm opacity-90">Work with the latest blockchain and web technologies</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-white/20 rounded-full mr-3 mt-1 flex items-center justify-center">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Global Impact</h4>
                  <p className="text-sm opacity-90">Help people worldwide organize their lives better</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-white/20 rounded-full mr-3 mt-1 flex items-center justify-center">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Growth Opportunities</h4>
                  <p className="text-sm opacity-90">Continuous learning and career development</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-text mb-4">Join Our Team</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about technology, 
            innovation, and making a positive impact on people's lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              View Open Positions
            </Link>
            <Link
              to="/contact"
              className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              Send Us Your Resume
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Team 