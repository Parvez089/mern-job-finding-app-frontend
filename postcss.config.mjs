const config = {
  important: '#root',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        "primary-text": "#164081",
        "primary-bg": "#164081"
      }
    }
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;
