/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          800: '#1e293b',
          900: '#0f172a',
        },
        light: {
          50: '#fffbeb',
          100: '#fef3c7',
        }
      },
    },
  },
  plugins: [],
}
