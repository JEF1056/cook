/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      spacing: {
        128: "32rem",

      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["winter"],
  },
};
