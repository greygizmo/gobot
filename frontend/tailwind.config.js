/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F15A22',  // BLT Orange
        secondary: '#2D3748', // Charcoal gray instead of black
        background: '#FFFFFF', // White background
        lightGray: '#F5F5F5', // Light gray for subtle sections
        bltBlue: '#004B93',   // Keeping the blue for some accents
        bltBlueLight: '#0067B2'
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
