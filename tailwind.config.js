module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./src/components/**/*.{html,js,jsx}",
    "./src/components/**/*.{html,js,jsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#015479",
        secondary: "#1BC0DE",
        darkPrimary: "#002835",
        gray: "#74858C",
        darkSecondary: "#1D97C1",
        bgGray: "#e6e6e6",
        darkGray: "#c4c2c2",
        darkBlue: "hsl(228, 39%, 23%)",
        darkGrayishBlue: "hsl(227, 12%, 61%)",
        veryDarkBlue: "hsl(223, 12%, 13%)",
        veryPaleRed: "hsl(13, 100%, 96%)",
        veryLightGray: "hsl(0, 0%, 98%)",
      },
    },
  },
  plugins: [],
};
