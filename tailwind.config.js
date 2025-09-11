/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
          600: '#242424',
          500: '#2e2e2e',
          400: '#383838',
        },
        blood: {
          600: '#8B0000',
          500: '#B22222',
          400: '#DC143C',
        },
        steel: {
          600: '#71797E',
          500: '#848884',
          400: '#C0C0C0',
        }
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'blood-gradient': 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
        'steel-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2e2e2e 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'russo': ['Russo One', 'sans-serif'],
      }
    },
  },
  plugins: [],
}