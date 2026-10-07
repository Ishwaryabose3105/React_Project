/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif']
      },
      colors: {
        navy: {
          50: '#f3f5fb',
          100: '#e5e9f6',
          200: '#c7d0ec',
          300: '#9aabdc',
          400: '#6a80c7',
          500: '#4a5fb0',
          600: '#394a92',
          700: '#2f3c76',
          800: '#1d2650',
          900: '#111938',
          950: '#0a0f24'
        },
        brand: {
          50: '#f1f2ff',
          100: '#e5e6ff',
          200: '#ced1ff',
          300: '#adb0ff',
          400: '#8b84fc',
          500: '#6f5df6',
          600: '#5d3ded',
          700: '#4f2dd2',
          800: '#4127aa',
          900: '#372587',
          950: '#21134f'
        },
        violetaccent: {
          400: '#b57bff',
          500: '#9b51e0',
          600: '#8138c8'
        }
      },
      boxShadow: {
        soft: '0 1px 2px rgba(17,25,56,0.04), 0 8px 24px -12px rgba(17,25,56,0.18)',
        lift: '0 18px 40px -18px rgba(17,25,56,0.35)',
        glow: '0 0 0 1px rgba(111,93,246,0.28), 0 18px 42px -20px rgba(111,93,246,0.65)'
      },
      keyframes: {
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(18px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'slide-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
        'toast-in': {
          '0%': { opacity: 0, transform: 'translateX(24px) scale(.98)' },
          '100%': { opacity: 1, transform: 'translateX(0) scale(1)' }
        }
      },
      animation: {
        'fade-in': 'fade-in .35s ease-out both',
        'fade-up': 'fade-up .5s cubic-bezier(.22,.8,.3,1) both',
        'slide-down': 'slide-down .22s ease-out both',
        'scale-in': 'scale-in .18s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'toast-in': 'toast-in .25s ease-out both'
      }
    }
  },
  plugins: []
};
