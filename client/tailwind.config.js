/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens:{
        'tablet':'640px',
        'desktop': '1024px'
      }
    },
  },
  plugins: [],
}
