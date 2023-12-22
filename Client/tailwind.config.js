/** @type {import('tailwindcss').Config} */
import scrollbarPlugin from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        full: "100%",
        screen: "94vh",
      },
    },
  },
  plugins: [scrollbarPlugin()],
};
