/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#c8102e',
          dark: '#a20d25',
          light: '#fef2f2'
        }
      }
    },
  },
  plugins: [],
}
