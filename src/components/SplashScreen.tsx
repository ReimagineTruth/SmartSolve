import React, { useState, useEffect } from 'react';
import { Star, Loader2 } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: 'Loading components...' },
      { progress: 40, text: 'Preparing dashboard...' },
      { progress: 60, text: 'Setting up features...' },
      { progress: 80, text: 'Almost ready...' },
      { progress: 100, text: 'Welcome to SmartSolve!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-secondary to-background flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Star className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-text mb-2">SmartSolve</h1>
          <p className="text-lg text-gray-600">Pi-Powered Productivity</p>
        </div>

        {/* Loading Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <Loader2 className="h-6 w-6 text-secondary animate-spin mr-3" />
            <span className="text-text font-medium">{loadingText}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Progress Percentage */}
          <div className="text-sm text-gray-600">
            {progress}%
          </div>
        </div>

        {/* Company Info */}
        <div className="text-center">
          <p className="text-sm text-text font-medium mb-1">by Mrwain Organization</p>
          <p className="text-xs text-gray-500">Need help? contact support@smartsolve.com</p>
        </div>

        {/* Music Button */}
        <button className="absolute top-6 right-6 bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm">
          <div className="flex items-center">
            <span className="text-lg mr-2">🎵</span>
            <span>Tap to enable music</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SplashScreen; 