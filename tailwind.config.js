/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard'],
        iropkeBatang: ['IropkeBatang'],
      },
      colors: {
        'The-julge-primary': '#EA3C12',
      },
    },
  },
  plugins: [],
};
