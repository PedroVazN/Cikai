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
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        accent: {
          50: '#fffbf0',
          100: '#fff4d6',
          200: '#ffe8b3',
          300: '#ffdc90',
          400: '#ffd06d',
          500: '#d4af37',
          600: '#b8941f',
          700: '#9c7a0a',
          800: '#806000',
          900: '#644d00',
        },
        luxury: {
          dark: '#0a1929',
          navy: '#1e3a5f',
          gold: '#d4af37',
          cream: '#f5f3f0',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'elegant-lg': '0 10px 40px rgba(0, 0, 0, 0.12)',
        'luxury': '0 8px 32px rgba(30, 58, 95, 0.15)',
      },
    },
  },
  plugins: [],
}
