const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Component/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-text": "#164081",
        "primary-bg": "#164081",
      },
    },
  },
  plugins:
    { "@tailwindcss/postcss": {} }

};

export default config;