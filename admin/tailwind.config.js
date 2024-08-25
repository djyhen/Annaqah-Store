/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00712D",
        secondary: "#ebddda",
        tertiary: "#222222",
        secondaryRed: "#f43c37",
        secondaryYellow: "#fdc62e",
        secondaryGreen: "#2dcc6f",
        secondaryBlue: "#1376f4",
        secondaryWhite: "#eeeeee",
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#787878",
          50: "#585858",
          90: "#141414",
        },
      },
      screens: {
        xs: "400px",
        "3x1": "1680px",
        "4x1": "2200px",
      },
      backgroundImage: {
        hero: "url(/src/assets/bg.png)",
        banner: "url(/src/assets/banner.png)",
      },
    },
  },
  plugins: [],
}
