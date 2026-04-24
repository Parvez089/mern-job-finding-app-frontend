const config = {
  important: '#root',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // নিশ্চিত করুন 'app' ফোল্ডারটি এখানে আছে
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
  plugins: [],
};

export default config;
