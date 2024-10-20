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
          bgColor: "white",
          heading: "rgb(31 41 55 / var(--tw-bg-opacity))",
        },
        main: {
          gray: "rgb(31 41 55 / var(--tw-bg-opacity))",
          green: "#43a86f",
        },
        hover: {
          blue: "rgb(236 245 251)",
          gray: "rgb(55 65 81 / var(--tw-bg-opacity))",
        },
      },
    },
  },
  plugins: [],
};
export default config;
