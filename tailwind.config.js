/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      //main colors to use throughout the application
      colors: {
        'primary-btn': '',
        'bg-main': '#33052a',
      },
      //hero image for homepage
      backgroundImage: {
        'hero-img': "url('/src/assets/bg.jpg')",
        'mobile-hero': "url('/src/assets/bg-rotated.jpg')",
        'new-bg': "url('/src/assets/new-bg.jpg')",
      },
    },
  },
  plugins: [],
};
