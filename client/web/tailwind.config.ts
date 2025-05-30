import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

// Define custom colors
const groq = {
  "accent-bg": "#434343",
};

const customColors = {
  groq,
};

// Create a safe colors object without deprecated color names
const safeColors = { ...colors };

// Remove deprecated color names to prevent warnings
// These are renamed in Tailwind CSS v2.2 and v3.0
delete safeColors.lightBlue;  // renamed to sky
delete safeColors.warmGray;   // renamed to stone
delete safeColors.trueGray;   // renamed to neutral
delete safeColors.coolGray;   // renamed to gray
delete safeColors.blueGray;   // renamed to slate

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      slate: colors.slate,
      neutral: colors.neutral,
      stone: colors.stone,
      sky: colors.sky,
      ...safeColors,
      ...customColors,
    },
    extend: {
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
      },
    },
  },
} satisfies Config;

export default config;
