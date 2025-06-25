/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-pink': '#FF2A6D',
        'cyber-blue': '#05D9E8',
        'cyber-purple': '#7700FF',
        'cyber-yellow': '#FFD700',
        'cyber-dark': '#01012B',
        'cyber-darker': '#000016',
      },
      fontFamily: {
        digital: ['Digital-7', 'monospace'],
        cyber: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 6s linear infinite',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'electric': 'electric 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-5px, 2px)' },
          '66%': { transform: 'translate(5px, -2px)' },
        },
        glow: {
          'from': { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #FF2A6D, 0 0 20px #FF2A6D' },
          'to': { textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FF2A6D, 0 0 40px #FF2A6D' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        electric: {
          '0%': { 
            color: '#05D9E8',
            textShadow: '0 0 5px #05D9E8, 0 0 10px #05D9E8, 0 0 20px #05D9E8'
          },
          '50%': {
            color: '#05D9E8',
            textShadow: '0 0 10px #05D9E8, 0 0 20px #05D9E8, 0 0 40px #05D9E8, 0 0 80px #05D9E8'
          },
          '100%': {
            color: '#05D9E8',
            textShadow: '0 0 5px #05D9E8, 0 0 10px #05D9E8, 0 0 20px #05D9E8'
          },
        },
      },
    },
  },
  plugins: [],
} 