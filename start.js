#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 SmartSolve MVP Startup Script');
console.log('================================\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file from template...');
  try {
    fs.copyFileSync('env.example', '.env');
    console.log('✅ .env file created successfully!');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
    process.exit(1);
  }
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  const install = spawn('npm', ['install'], { stdio: 'inherit' });
  
  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Dependencies installed successfully!');
      startServer();
    } else {
      console.error('❌ Failed to install dependencies');
      process.exit(1);
    }
  });
} else {
  console.log('✅ Dependencies already installed');
  startServer();
}

function startServer() {
  console.log('\n🔧 Starting SmartSolve MVP...');
  console.log('📱 The app will be available at: http://localhost:3000');
  console.log('🔗 API Health check: http://localhost:3000/api/health');
  console.log('\n💡 Tips:');
  console.log('   - Make sure MongoDB is running');
  console.log('   - Check .env file for configuration');
  console.log('   - Press Ctrl+C to stop the server\n');
  
  const server = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });
  
  server.on('close', (code) => {
    console.log(`\n👋 Server stopped with code ${code}`);
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.kill('SIGINT');
  });
} 