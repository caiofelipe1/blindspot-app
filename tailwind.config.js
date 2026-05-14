/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0077C8',
        normal: '#19191B',
        'subtle-dark': '#51565F',
        'subtle-light': '#AFB1B6',
        background: '#EFEFF0',
        muted: '#7C7D81',
      },
    },
  },
  plugins: [],
};
