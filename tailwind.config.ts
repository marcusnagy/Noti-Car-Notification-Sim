import {heroui} from '@heroui/theme';
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/aceternity-ui/src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(alert|button|ripple|spinner).js"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "border-left-right": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "5%": { opacity: "1" },
          "45%": { opacity: "1" },
          "50%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "border-right-left": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "5%": { opacity: "1" },
          "45%": { opacity: "1" },
          "50%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
        "border-top-bottom": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "5%": { opacity: "1" },
          "45%": { opacity: "1" },
          "50%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "border-bottom-top": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "5%": { opacity: "1" },
          "45%": { opacity: "1" },
          "50%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "border-left-right": "border-left-right 3s linear infinite",
        "border-right-left": "border-right-left 3s linear infinite",
        "border-top-bottom": "border-top-bottom 3s linear infinite",
        "border-bottom-top": "border-bottom-top 3s linear infinite",
        "spin-slow": "spin 3s linear infinite",
        "spin-slower": "spin 6s linear infinite",
        "spin-reverse": "spin 1s linear infinite reverse",
        "spin-reverse-slow": "spin 3s linear infinite reverse",
        "spin-reverse-slower": "spin 6s linear infinite reverse",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),heroui()],
} satisfies Config;