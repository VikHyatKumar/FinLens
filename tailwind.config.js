/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        bg3: 'var(--bg3)',
        bg4: 'var(--bg4)',
        border1: 'var(--border)',
        border2: 'var(--border2)',
        textMain: 'var(--text)',
        text2: 'var(--text2)',
        text3: 'var(--text3)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
        red: 'var(--red)',
        blue: 'var(--blue)',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideOut: {
          '100%': { opacity: '0', transform: 'translateX(20px)' },
        }
      },
      animation: {
        fadeUp: 'fadeUp 0.4s both',
        scaleIn: 'scaleIn 0.2s ease',
        slideIn: 'slideIn 0.2s ease',
        slideOut: 'slideOut 0.3s ease forwards',
      }
    },
  },
  plugins: [],
}
