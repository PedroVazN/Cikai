/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#1a1d20',
        },
        accent: {
          50: '#faf8f6',
          100: '#f5f1ed',
          200: '#e8ddd4',
          300: '#d4c4b8',
          400: '#b8a08f',
          500: '#9d8574',
          600: '#7a6a5d',
          700: '#5d5047',
          800: '#3f3630',
          900: '#2a231f',
        },
        luxury: {
          dark: '#2c2c2c',
          navy: '#3d3d3d',
          gold: '#d4c4b8',
          cream: '#faf8f6',
          rose: '#c9a99e',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'elegant-lg': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'luxury': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
