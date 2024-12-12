/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#FC8210",
      primeSupSoft: "#FFF3E7",
      primeExtSoft: "#FEE6CF",
      grey: "#BDBDBD",
      white: "#ffffff",
      garis: "#F6F7FA",
      grey1: "#333333",
      grey3: "#828282",
      grey4: "#BDBDBD",
      grey6: "#F2F2F2",
      blueLight: "#D1E5FF",
    },
    fontFamily: {
      sans: ['"Poppins"', "sans-serif"],
      nunito: ['"Nunito Sans"', "sans-serif"],
      "HK-Grostek": ['"HK Grotesk"', "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
