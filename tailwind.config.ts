import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: "36px",
        h2: "24px",
        h3: "21px",
        h4: "18px",
        h5: "16px",
        h6: "14px",
      },
    },
  },
  plugins: [require("rippleui")],
};
export default config;
