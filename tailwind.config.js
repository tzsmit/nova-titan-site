/** @type {import('tailwindcss').Config} */
// Used to build assets/css/main.css:
//   npx tailwindcss@3.4.18 -c tailwind.config.js -i assets/css/input.css -o assets/css/main.css --minify
// Scans BUILT output (_site) so Liquid-composed classes (e.g. bg-{{ color }}-600/20
// in _layouts/case-study.html) are picked up after `bundle exec jekyll build`.
module.exports = {
  content: [
    './_site/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './assets/**/*.js',
  ],
  safelist: [
    // classes toggled by JS at runtime (not always present in HTML)
    'hidden', 'active', 'open', 'menu-open', 'shadow-2xl', 'fade-in', 'rotate',
    // Liquid-composed case-study color variants ({{ color }} = blue/cyan/green/orange/purple/red)
    { pattern: /^(bg|text|border|from|to|via)-(blue|cyan|green|orange|purple|red)-(300|400|500|600|900)(\/(10|20|30|40|50|60))?$/ },
    { pattern: /^(hover:)?(bg|text|border)-(blue|cyan|green|orange|purple|red)-(300|400|500|600)(\/(20|30|40|50))?$/, variants: ['hover', 'group-hover'] },
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
