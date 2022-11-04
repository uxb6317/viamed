// configuration for tailwind

module.exports = {
  theme: {
    borderRadius: {
      none: '0',
      sm: '.125rem',
      default: '.25rem',
      lg: '.5rem',
      xl: '.75rem',
      full: '9999px',
    },
    extend: {
      colors: {
        'dark-blue': '#384359',
        'light-blue': '#2CA2EF',
        'dark-turquoise': '#04D9D9',
        'primary-purple': '#5852F2',
        offwhite: '#FDFFFF',
      },
      spacing: {
        '4': '1rem',
        '32': '8rem',
        '72': '18rem',
        '80': '20rem',
        '86': '22rem',
        '94': '24rem',
      },
    },
  },
  variants: {
    padding: ['responsive', 'first', 'last', 'hover', 'focus'],
    margin: ['responsive', 'first', 'last', 'hover', 'focus'],
  },
  plugins: [],
};
