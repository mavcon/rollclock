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
        'app-bg': {
          light: '#F8FAFC',
          dark: '#0F172A'
        },
        'app-card': {
          light: '#E2E8F0',
          dark: '#1E293B'
        },
        'app-hover': {
          light: '#CBD5E1',
          dark: '#334155'
        },
        'app-text-primary': {
          light: '#0F172A',
          dark: '#F8FAFC'
        },
        'app-text-secondary': {
          light: '#64748B',
          dark: '#94A3B8'
        },
        'app-accent-primary': '#8B5CF6',
        'app-accent-secondary': '#A78BFA',
        'app-success-primary': '#22C55E',
        'app-success-hover': '#16A34A',
        'app-danger-primary': '#EF4444',
        'app-danger-hover': '#DC2626',
        'app-border': {
          light: '#CBD5E1',
          dark: '#475569'
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
  plugins: [],
}
