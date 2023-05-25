/** @type {import('tailwindcss').Config} */
export default {
  plugins: [
    require('@tailwindcss/forms'),
  ],  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  }, 
}