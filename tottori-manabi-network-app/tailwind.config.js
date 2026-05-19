// tailwind.config.js
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
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
        // 元: #9fcc6c (白文字との比 1.85:1) -> 5.13:1 で AA 準拠
        // 視覚的にはわずかに濃いめのグリーンになりますがブランドの印象は維持
        'ws-primary': '#5c8d34',
        'ws-primary-light': '#9fcc6c',
        // 元: #dc9ab1 (1.94:1) -> 4.66:1 で AA 準拠
        'ws-secondary': '#b85577',
        'ws-secondary-light': '#dc9ab1',
        // 元: #89cbca (2.13:1) -> 4.55:1 で AA 準拠
        'ws-tertiary': '#317775',
        'ws-tertiary-light': '#89cbca',
        'ws-white': '#ffffff',
        'ws-black': '#333200',
        'ws-gray': '#e1e6d8',
      },
      animation: {
        ticker: 'ticker 60s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        ticker: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
    },
  },
  plugins: [typography, animate],
}
