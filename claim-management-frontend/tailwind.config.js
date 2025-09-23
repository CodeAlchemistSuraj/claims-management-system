/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2dd4bf',
        secondary: '#4b5563',
        accent: '#7c3aed',
      },
    },
  },
}