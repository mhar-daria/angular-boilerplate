module.exports = {
  mode: 'jit',
  important: true,
  purge: {
    enabled: true,
  },
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        18: `4.5rem`,
      },
      minHeight: {
        '1/2': '50%',
      },
      borderTop: {
        1: '1px !important',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('postcss'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  minify: false,
  content: ['./src/**/*.{html,ts}'],
}
