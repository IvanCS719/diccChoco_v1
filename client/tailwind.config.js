/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        mfBoxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.4)',
      },
      colors:{
        mfColor: '#F47101',
      }
    },
  },
  plugins: [],
}

