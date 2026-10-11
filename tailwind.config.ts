import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0a0a0a",
        muted: "#6b6b6b",
        line: "#ececec",
        soft: "#f6f6f6",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
