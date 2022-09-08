const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT( {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { height: '0px' },
          '100%': { height: 'auto' },
        }
      },
      animation: {
        slideDown: "slideDown 0.5s ease-in-out",
      },
      colors: {
        primary: "#f13a6b",
      },
      fontFamily: {
        body: ["Quicksand", "sans-serif"],
      },
      backgroundColor: {
        "slate": "#9CA3AF",
      }
    },
  },
  plugins: [],
});
