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
        'dark-bg': '#0A2B2F',
        'light-bg': '#FFFFFF',
        'hi-text': '#39F1DA',
        'name-text': '#CCD6F6',
        'tagline-text': '#8892B0',
        'body-text': '#8892B0',
        'logo-color': '#CCD6F6',
        'nav-text': '#8892B0',
        'highlight': '#39F1DA',
        'light-name-text': '#0A2B2F',
        'light-tagline-text': '#2D3748',
        'light-body-text': '#4A5568',
        'light-logo-color': '#2D3748',
        'light-nav-text': '#4A5568',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
