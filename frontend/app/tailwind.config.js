module.exports = {
  corePlugins: {
    preflight: false,
  },
  
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'turquoise': '#5ACCCC',
        'steel-blue': '#335C6E',
        'yellow': '#FABD33',
        'turquoise-light': '#CFFAFA',
        'orange-red': '#F76434',
        'teal': '#44A08B',
        'yellow-dark': '#FAAD00',
        'turquoise-dark-1': '#4AA5B5',
        'orange-pastel': '#F8B084',
      },
    },
  },
  plugins: [],
}