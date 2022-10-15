/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens:{
        'tablet':'640px',
        'desktop': '1024px'
      },
      colors:{
        primary:"#161b22",
        secondary:"#ecf2f8",
        tertiary:'#89929b'

      }
    },
  },
  plugins: [],
}
