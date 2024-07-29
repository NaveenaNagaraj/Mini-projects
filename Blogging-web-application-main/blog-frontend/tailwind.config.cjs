/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      'sans': ['Inter', 'sans-serif'],
      'serif': ['Merriweather', 'serif'],
      'mono': ['JetBrains Mono', 'monospace'],
      'space': ['Space Grotesk', 'sans-serif'],
      'space2': ['Space Mono', 'monospace'],
    }
  },
  plugins: [],
}