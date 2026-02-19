/** @type {import(''tailwindcss'').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        gold: "#DBC18D",
        midnight: "#080716",
        deepsea: "#092B42"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      fontSize: {
        h1: ["clamp(3.1rem, 6vw, 5.625rem)", "1.05"],
        h2: ["clamp(2.4rem, 4.8vw, 4.25rem)", "1.1"],
        h3: ["clamp(1.2rem, 2.2vw, 1.875rem)", "1.2"],
        body: ["clamp(1rem, 1.4vw, 1.125rem)", "1.7"]
      },
      letterSpacing: {
        tight: "-0.02em",
        wide: "0.08em"
      }
    }
  },
  plugins: []
};
