import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "pill-bg": "#C12A5D",
        "pill-bg": "#FFF7E2",
        "second-pill": "#FE9797",
        "text-color": "#3a643b",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
