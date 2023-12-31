/**   @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '330px',

      xs: '480px',

      sm: '640px',

      md: '768px',

      lg: '1024px',

      xl: '1280px',

      xxl: '2000px',
    },
    extend: {
      //main colors to use throughout the application
      colors: {
        'primary-btn': '',
        'header-bg': '#2a0070',
      },
      //hero image for homepage
      backgroundImage: {
        backgr1: "url('/src/assets/background1.jpg')",
        backgr2: "url('/src/assets/background2.jpg')",
        backgr3: "url('/src/assets/background3.jpg')",
      },
    },
  },
  plugins: [],
};
