import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        layout: {
          bgColor: process.env.BACKGROUND_COLOR ? process.env.BACKGROUND_COLOR : "white",
          mainColor: process.env.MAIN_COLOR ? process.env.MAIN_COLOR : "rgb(31 41 55)",
          hoverColor: process.env.HOVER_COLOR ? process.env.HOVER_COLOR : "rgb(208 236 255)",
        },
        main: {
          gray: "rgb(31 41 55)",
          green: "#43a86f",
          brown: "#997a6b",
          pink: "rgb(227 142 153)",
        },
        hover: {
          blue: "rgb(236 245 251)",
          gray: "rgb(55 65 81)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
