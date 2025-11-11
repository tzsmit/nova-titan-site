/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/**/*.{md,html}',
    './index.html',
    './about/**/*.html',
    './services/**/*.html',
    './plans/**/*.html',
    './contact/**/*.html',
    './portfolio/**/*.html',
    './blog/**/*.html',
    './testimonials/**/*.html',
    './faqs/**/*.html',
    './resources/**/*.html',
    './book-now/**/*.html',
    './assets/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          300: '#00d4ff',
          400: '#00d4ff',
          500: '#00bfea',
          600: '#00a8d0',
        },
        green: {
          300: '#00ff88',
          400: '#00ff88',
          500: '#00e676',
          600: '#00c763',
        },
        purple: {
          300: '#b300ff',
          400: '#b300ff',
          500: '#9d00e0',
          600: '#8700c7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0,212,255,0.6)',
        'glow-green': '0 0 20px rgba(0,255,136,0.6)',
        'glow-purple': '0 0 20px rgba(179,0,255,0.6)',
      },
    },
  },
  plugins: [],
}
