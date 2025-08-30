/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ASU Brand Colors
        'asu-maroon': '#8C1D40',
        'asu-gold': '#FFC627', 
        'asu-black': '#000000',
        'asu-white': '#FFFFFF',
        
        // User's brand palette from memory
        'brand-brown': '#B1591E',
        'brand-purple': '#8A5764',
        'brand-tan': '#DDB176',
        'brand-teal': '#006269',
        'brand-mint': '#A5C9CA',
        'brand-dark-purple': '#634B7B',
        'brand-light-grey': '#F0EDE9',
        
        // Design system greys
        'grey-1': '#191919',
        'grey-2': '#484848',
        'grey-3': '#747474',
        'grey-4': '#BFBFBF',
        'grey-5': '#D0D0D0',
        'grey-6': '#E8E8E8',
        'grey-7': '#FAFAFA',
      },
      fontFamily: {
        'arial': ['Arial', 'sans-serif'],
      },
      fontSize: {
        'body-small': ['14px', '18px'],
        'body-default': ['16px', '24px'],
        'body-large': ['20px', '28px'],
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      addUtilities(newUtilities)
    }
  ],
}
