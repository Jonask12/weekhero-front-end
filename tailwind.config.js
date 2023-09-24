module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      backgroundImage: {
        background: 'url(/src/assets/background_login.webp)'
      },

      fontFamily: {
        sans: 'Poppins, sans-serif',
      },

      colors: {
        primary: {
          500: '#348789',
        },
        secondary: {
          500: '#001489',
        },
        gray: {
          50: '#DDDFEB',
          100: '#97909050',
          200: '#535653',
          300: '#7C838B',
        },

        black: {
          500: '#272B30'
        },
        white: {
          500: '#fff'
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}