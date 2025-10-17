/** @type {import('tailwindcss').Config} */
// Tailwind v4 is CSS-first and prefers configuration inside your CSS files
// (see TAILWIND_V4_DARK_MODE_FIX.md). This minimal config file exists so
// tooling that expects a config won't fail. You can safely remove this file
// if you fully rely on the CSS @variant/@source approach.
export default {
  content: [
    './hugo_stats.json',
    './layouts/**/*.html',
    './content/**/*.{md,html}',
    './exampleSite/**/*.{html,md,js}',
    './assets/**/*.{css,js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  safelist: [
    // 代码高亮和复制按钮相关的类
    {
      pattern: /(copy-btn|fa-|fas|text-green-500|duration-200|transition-colors)/,
    },
    // 响应式和状态变体
    {
      pattern: /(dark|hover|focus|active):(.*)/,
    }
  ],  
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
