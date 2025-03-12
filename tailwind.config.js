/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc6fd',
          400: '#36a3f9',
          500: '#0d8df2', // primary brand color - vibrant blue
          600: '#006ae0',
          700: '#0055c4',
          800: '#0447a0',
          900: '#073d83',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f5eaff',
          200: '#ead5ff',
          300: '#d9b0ff',
          400: '#c07cff',
          500: '#9f48ff', // secondary brand color - vibrant purple
          600: '#8520ff',
          700: '#7412df',
          800: '#6211b5',
          900: '#510f93',
        },
        accent: {
          50: '#fff1f9',
          100: '#ffe4f4',
          200: '#ffcaea',
          300: '#ffa1d6',
          400: '#ff69bb',
          500: '#ff269a', // accent color - vibrant pink
          600: '#fa007f',
          700: '#d6006c',
          800: '#b10059',
          900: '#93064c',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        background: {
          light: '#ffffff',
          dark: '#f8fafc',
          gradient: 'linear-gradient(120deg, #f0f7ff 0%, #faf5ff 100%)',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        logo: ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 15px rgba(157, 72, 255, 0.3)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.05)',
        'button': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}