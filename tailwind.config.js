/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          white: '#FAFAF8',
          gold: '#D4AF37',
          'gold-light': '#E8D5A3',
          'gold-dark': '#B8941E',
          champagne: '#F7E7CE',
          'champagne-dark': '#E6D4B8',
          black: '#1A1A1A',
          'black-matte': '#2C2C2C',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Didot', 'serif'],
        sans: ['Neue Montreal', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'luxury-fade': 'luxuryFade 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        'luxury-slide': 'luxurySlide 1s cubic-bezier(0.22, 1, 0.36, 1)',
        'gold-glow': 'goldGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        luxuryFade: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        luxurySlide: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        goldGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

