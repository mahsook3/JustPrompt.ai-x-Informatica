module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [],
  style: {
    postcssOptions: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};