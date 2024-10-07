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
        primary: '#1E3A8A', 
        secondary: '#FBBF24', 
        accent: '#EF4444', 
        background: '#F9FAFB', 
        text: '#111827', 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
