import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-50": "#f9f9fa",
        "gray-100": "#f3f2f8",
        "gray-200": "#e3e2e9",
        "gray-400": "#aeaebe",
        "gray-500": "#8e8e9e",
        "gray-600": "#78788b",
        "gray-700": "#585869",
        "gray-800": "#3a3a50",
        "gray-900": "#231f3a",
        "gray-950": "#1a1a2e",
        "pink-300": "#ffb3e0",
        "pink-500": "#f472b6",
        "pink-700": "#be3a8a",
        "purple-700": "#5b47d4",
        "green-500": "#3dcb5a",
      },
      backgroundImage: {
        "gradient-btn": "linear-gradient(180deg, #2e2a47 0%, #231f3a 100%)",
        "gradient-calm-subtle":
          "linear-gradient(180deg, rgba(255,240,250,0.4) 0%, rgba(242,240,255,0.4) 100%)",
        "gradient-calm-accent": "linear-gradient(-90deg, #ffafe1 0%, #6e53ff 100%)",
      },
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui"],
        logo: ["Paperlogy", "Pretendard", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        logo: ["40px", { lineHeight: "1", letterSpacing: "0", fontWeight: "700" }],
        "heading-sub": ["20px", { lineHeight: "1.4", letterSpacing: "0" }],
        "label-lg": ["20px", { lineHeight: "1", letterSpacing: "0" }],
        label: ["16px", { lineHeight: "1.4", letterSpacing: "0" }],
        "label-m": ["14px", { lineHeight: "1.4", letterSpacing: "0" }],
        "label-sm": ["14px", { lineHeight: "1.4", letterSpacing: "0" }],
        "body-lg": ["18px", { lineHeight: "1", letterSpacing: "0" }],
        eyebrow: ["12px", { lineHeight: "1.4", letterSpacing: "0" }],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "36px",
        "4xl": "48px",
        "6xl": "84px",
      },
      borderRadius: {
        button: "16px",
        card: "16px",
        "card-sm": "8px",
        badge: "9999px",
        input: "8px",
      },
      boxShadow: {
        card: "rgba(35,31,58,0.04) 0px 0px 0px, rgba(35,31,58,0.06) 0px 2px 4px, rgba(35,31,58,0.08) 0px 8px 12px",
        modal:
          "rgba(35,31,58,0.08) 0px 8px 24px, rgba(35,31,58,0.06) 0px 2px 8px, rgba(35,31,58,0.04) 0px 0px 0px 1px",
      },
      maxWidth: {
        page: "390px",
      },
      keyframes: {
        "drift-a": {
          "0%, 100%": { transform: "translate(0%, -25%) scale(1)" },
          "50%": { transform: "translate(6%, 30%) scale(1.15)" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate(0%, 25%) scale(1)" },
          "50%": { transform: "translate(-6%, -30%) scale(1.1)" },
        },
      },
      animation: {
        "drift-a": "drift-a 8s ease-in-out infinite",
        "drift-b": "drift-b 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
