/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          100: "#303245",
          200: "#15172b",
        },
        light: {
          100: "#eee",
        },
        sky: {
          100: "#08d",
          200: "#06b",
        },
      },
    },
  },
  plugins: [],
};
