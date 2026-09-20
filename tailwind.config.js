/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        f1: {
          red: '#e10600',
          'red-bright': '#ff1801',
          'red-glow': 'rgba(225, 6, 0, 0.4)',
          black: '#07080a',
          dark: '#0d0f12',
          card: '#13161c',
          cardHover: '#1a1f28',
          border: '#232936',
          borderLight: '#323b4e',
          silver: '#8e9aa8',
          muted: '#525d70',
          cyan: '#00e5ff',
          gold: '#f5a623',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'technical-grid': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'carbon-mesh': 'radial-gradient(circle at center, rgba(20,24,32,0.8) 0%, rgba(7,8,10,0.95) 100%)',
      },
      backgroundSize: {
        'grid-sm': '24px 24px',
        'grid-md': '48px 48px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
