/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FAF7EE',
          100: '#F4EDD7',
          200: '#E9DAB0',
          300: '#DFC789',
          400: '#D4B462',
          500: '#C5A059',
          600: '#B08840',
          700: '#8E6733',
          800: '#6F4E27',
          900: '#4F3519',
        },
        obsidian: {
          950: '#070707',
          900: '#0E0E0F',
          850: '#141416',
          800: '#1B1B1E',
          750: '#232328',
          700: '#2C2C34',
          600: '#3D3D48',
        },
        ivory: {
          50: '#FDFCF7',
          100: '#F9F6ED',
          200: '#F3EEDB',
          300: '#EAE1C5',
          400: '#DDD0A8',
        },
        sand: {
          50: '#FBF9F5',
          100: '#F5EFE6',
          200: '#EBDDCB',
          300: '#DFCAAe',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'regal': '0.35em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DFC789 0%, #C5A059 50%, #9E7430 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #B08840 0%, #F4EDD7 50%, #B08840 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 20%, #1A1A1E 0%, #0A0A0B 100%)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
