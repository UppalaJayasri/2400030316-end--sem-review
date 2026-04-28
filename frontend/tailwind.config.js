/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Quicksand", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        'slow-zoom': 'slow-zoom 6s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
