import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10233F",
        brand: "#087E8B",
        brandDark: "#06636D",
        mint: "#E9F8F6",
        cloud: "#F6F9FC",
        line: "#E5EAF0",
        muted: "#64748B"
      },
      boxShadow: {
        soft: "0 12px 36px rgba(16, 35, 63, 0.08)",
        lift: "0 20px 50px rgba(16, 35, 63, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
