/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      fontFamily: {
        Inter: ["Inter", "system-ui", "sans-serif"],
      },
      colors:{
        'dark_violet': '#6941C2',
        'light_violet': '#9747FF',
        'brand-50': '#f9f5ff',
        'brand-200': '#e9d7fe',
        'dark_orange': '#ef5533',
        'light_orange': '#fffcfc',
        'ligh_blue': '#eff5fa',
      }
    }
  },
  plugins: [],
};
