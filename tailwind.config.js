/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A3CFFA',
        secondary: '#A8D5BA',
        text: '#2A3B5A',
        background: '#F5F5F5',
        'card-bg': '#FFFFFF',
        'hover-bg': '#E6F0FA',
        'pi-bg': '#FFD700',
        'pi-text': '#B8860B',
        'lifetime-bg': '#FFE5B4',
        'lifetime-text': '#E65100',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
} 