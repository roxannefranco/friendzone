/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/css/*.css", "./src/js/*.js"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "border-orange-300",
    "object-cover",
    "hover:bg-neutral-100",
    "px-2",
  ],
};
