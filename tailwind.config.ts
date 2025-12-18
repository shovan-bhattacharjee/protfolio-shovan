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
        background: "#0b0f14", // Deep void dark
        surface: "#111827",
        primary: "#10b981", // Matrix Green / Emerald
        secondary: "#06b6d4", // Cyan
        accent: "#8b5cf6", // Purple
        "terminal-green": "#4af626",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"], // Use a coding font
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;