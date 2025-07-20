/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Original SmartSolve colors from the HTML guide
        primary: {
          50: '#E6F0FA',
          100: '#D1E5F7',
          200: '#A3CFFA',
          300: '#75B9FD',
          400: '#47A3FF',
          500: '#A3CFFA', // Original primary color
          600: '#1A8DFF',
          700: '#0077E6',
          800: '#0061CC',
          900: '#004BB3',
        },
        secondary: {
          50: '#E8F5E8',
          100: '#D1EBD1',
          200: '#A8D5BA', // Original secondary color
          300: '#7FBF93',
          400: '#56A96C',
          500: '#A8D5BA',
          600: '#2D9345',
          700: '#247D3A',
          800: '#1B672F',
          900: '#125124',
        },
        text: {
          DEFAULT: '#2A3B5A', // Original text color
          light: '#4A5568',
          dark: '#1A202C',
        },
        background: {
          DEFAULT: '#F5F5F5', // Original background color
          dark: '#2A3B5A', // Original dark background
        },
        card: {
          DEFAULT: '#FFFFFF', // Original card background
          dark: '#2A3B5A',
        },
        footer: {
          DEFAULT: '#EDEFF2', // Original footer background
        },
        gradient: {
          from: '#A3CFFA',
          to: '#A8D5BA',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05)', // Original shadow
        'hover': '0 6px 16px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '20px', // Original border radius
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 