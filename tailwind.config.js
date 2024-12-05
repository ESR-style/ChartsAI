/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#161616',
          200: '#1a1a1a',
          300: '#0f0f0f',
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

