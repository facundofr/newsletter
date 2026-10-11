import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Kept for the admin panel
        ink: "#000000",
        muted: "rgba(0,0,0,0.5)",
        line: "rgba(0,0,0,0.07)",
        soft: "#F7F7F7",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
