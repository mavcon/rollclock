/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        'app-bg': {
          light: '#F8FAFC',
          dark: '#000000'
        },
        'app-card': {
          light: '#F1F4F7',
          dark: '#0F141D'
        },
        'app-hover': {
          light: '#E5EAF0',
          dark: '#1A202A'
        },
        'app-text-primary': {
          light: '#0F172A',
          dark: '#F8FAFC'
        },
        'app-text-controls': {
          light: '#878D99',
          dark: '#A6A6A6'
        },
        'app-text-title': {
          light: '#595959',
          dark: '#CCCCCC'
        },
        'app-text-secondary': {
          light: '#B2BAC5',
          dark: '#4A515C'
        },
        'app-accent-primary': '#8B5CF6',
        'app-accent-secondary': '#A78BFA',
        'app-success-primary': '#22C55E',
        'app-success-hover': '#16A34A',
        'app-danger-primary': '#EF4444',
        'app-danger-hover': '#DC2626',
        'app-border': {
          light: '#E5EAF0',
          dark: '#232B34'
        },
      },
      fontSize: {
        'timer': '20rem',
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flash': 'flash 1s ease-in-out infinite',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'flash': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.timer-input': {
          'caret-color': 'transparent',
          '&::selection': {
            'background-color': 'transparent'
          }
        }
      })
    }
  ],
}
