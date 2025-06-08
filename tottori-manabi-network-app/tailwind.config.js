/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ws-primary': '#9fcc6c',
        'ws-secondary': '#dc9ab1',
        'ws-tertiary': '#89cbca',
        'ws-white': '#ffffff',
        'ws-black': '#333200',
        'ws-gray': '#e1e6d8',
      },
      animation: {
        ticker: 'ticker 60s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
    plugins: [typography, require('tailwindcss-animate')],
  },
}
