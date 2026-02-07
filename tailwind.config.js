/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Valentine Palette
        'valentine-pink': '#FFC0CB',
        'valentine-red': '#FF4D6D',
        'valentine-lavender': '#E6E6FA',
        'deep-rose': '#B83260',
        'blush': '#F8C8DC',
        'warm-cream': '#FFF6EC',
        'elegant-maroon': '#7A1E3A',
        'soft-gold': '#C9A227',
        
        // Enhanced Accent Colors
        'rose-gold': '#B76E79',
        'peach-glow': '#FFD4D4',
        'lavender-mist': '#E4D4F4',
        'champagne': '#F7E7CE',
        'burgundy': '#800020',
        'coral-pink': '#FF6B9D',
        'dusty-rose': '#DCAE96',
        'pearl-white': '#FAF9F6',
        
        // Semantic Colors with Opacity Support
        'romantic': {
          50: '#FFF5F7',
          100: '#FFE5EA',
          200: '#FFD4DD',
          300: '#FFB3C1',
          400: '#FF8FA3',
          500: '#FF4D6D',
          600: '#E6375A',
          700: '#CC2847',
          800: '#B31D38',
          900: '#991429',
        },
      },
      fontFamily: {
        'romantic': ['"Crimson Pro"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        'body': ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'elegant': ['"Cormorant Garamond"', 'Baskerville', 'serif'],
        'display': ['"Crimson Pro"', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
        'gradient-slow': 'gradient 8s ease infinite',
        'pulse-soft': 'pulse-soft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'heart-beat': 'heart-beat 1.5s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'heart-beat': {
          '0%, 100%': { transform: 'scale(1)' },
          '10%, 30%': { transform: 'scale(1.1)' },
          '20%, 40%': { transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 77, 109, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 77, 109, 0.6), 0 0 60px rgba(255, 77, 109, 0.3)' },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
}
