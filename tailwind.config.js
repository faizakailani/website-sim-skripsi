/* eslint-disable no-undef */
import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#145374",
        orange: "#EE6F57",
        bw: "#F6F5F5",
        navy: "#00334E",
        green: "#54FF45",
        red: "#FF4545",
      },
    },
  },
  plugins: [],
});
