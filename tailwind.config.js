/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      //main colors to use throughout the application
      colors: {
        'primary-btn': '#ff1b50',
        'bg-main': '#0c132d',
      },
      //hero image for homepage
      backgroundImage: {
        'hero-img': "url('/src/assets/bg.jpg')",
        'mobile-hero': "url('/src/assets/bg-rotated.jpg')",
      },
    },
  },
  plugins: [],
};
