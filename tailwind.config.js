/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2563EB',
        'secondary-blue': '#1E3A8A',
        'accent-blue': '#3B82F6',
        'orange': '#F59E0B',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'great-vibes': ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}
