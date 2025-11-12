/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        primary: ["Exo2", ...fontFamily.sans],
      },
      colors: {
        christi: {
          50: "#f8fbf4",
          100: "#f1f7e9",
          200: "#ddebc9",
          300: "#c8dfa8",
          400: "#9ec767",
          500: "#75af26",
          600: "#699e22",
          700: "#58831d",
          800: "#466917",
          900: "#395613",
        },
        green: {
          light: "#B7E8DA",
          DEFAULT: "#4EC69B",
          dark: "#2EB589",
        },
        purple: {
          light: "#AAAAF2",
          DEFAULT: "#6646E0",
          dark: "#362B82",
        },
        red: {
          light: "#f7988f",
          DEFAULT: "#d23f31",
          error: "#DB0000",
          error_dark: "#a80000",
        },
        grey: {
          light: "#E0E0E0",
          DEFAULT: "#C4C4C4",
          dark: "#333333",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
      },
    },
    zIndex: {
      "-1": -1,
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      75: 75,
      100: 100,
      1000: 1000,
      auto: "auto",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
