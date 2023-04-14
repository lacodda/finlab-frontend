const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    join(
      __dirname,
      '{apps,libs}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      gridTemplateColumns: {
        'footer': '1fr auto auto'
      },
      gridTemplateRows: {
        'auth-layout': '1fr auto',
        'default-layout': '1fr auto 1fr',
      },
      backgroundSize: {
        '500': '500%',
      },
      keyframes: {
        refreshedLoadingBarProgress: {
          '0%': { 'background-position': '125% 0' },
          '100%': { 'background-position': '0% 0' }
        },
        loadingBarEnter: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        }
      },
      animation: {
        'loading-bar': '2s linear infinite refreshedLoadingBarProgress, 0.5s ease-out loadingBarEnter',
      }
    }
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};