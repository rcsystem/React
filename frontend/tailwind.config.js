/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1d4ed8",
          foreground: "#ffffff"
        },
        sindical: {
          DEFAULT: "#0f766e",
          foreground: "#ffffff"
        },
        admin: {
          DEFAULT: "#7c3aed",
          foreground: "#ffffff"
        }
      }
    }
  },
  plugins: []
};
