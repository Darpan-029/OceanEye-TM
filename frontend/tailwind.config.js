/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          darkest: '#020914',
          navy: '#030c18',
          midnight: '#040e1b',
          card: 'rgba(6, 21, 39, 0.85)',
          blue: '#22d3ee',
          cyan: '#38bdf8',
          seafoam: '#7FD4D4',
          mint: '#9FE2E6',
          coral: '#FF7F50',
          glow: 'rgba(34, 211, 238, 0.25)'
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(34, 211, 238, 0.35)',
        'glow-blue': '0 0 30px rgba(34, 211, 238, 0.4)',
        'glow-coral': '0 0 25px rgba(255, 127, 80, 0.35)',
        'ambient': '0 10px 30px rgba(0, 0, 0, 0.5)'
      },
      borderRadius: {
        'card': '20px',
        'button': '14px',
        'panel': '24px'
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px'
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 2s linear infinite',
        'sonar': 'sonar 3s ease-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sonar: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}
