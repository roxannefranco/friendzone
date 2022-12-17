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
    "w-8",
    "h-8",
    "mt-4",
    "h-auto",
    "w-full",
    "flex-wrap",
    "loader",
  ],
};
