/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'Trebuchet MS', 'Segoe UI', 'sans-serif'],
        body: ['Manrope', 'Segoe UI', 'sans-serif']
      },
      colors: {
        brand: {
          100: '#ffd9b8',
          500: '#c05020',
          600: '#9d3f19'
        },
        paper: {
          50: '#fffaf2',
          100: '#f7ecdc',
          200: '#f2dfc5',
          300: '#e7ccaa',
          400: '#d5b488'
        }
      }
    }
  }
}
