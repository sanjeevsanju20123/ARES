module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ares: {
          dark: '#0a0e27',
          darker: '#050810',
          accent: '#00d9ff',
          'accent-dim': '#0099cc',
          text: '#e0e0e0',
          'text-dim': '#a0a0a0',
          success: '#00ff88',
          warning: '#ffaa00',
          error: '#ff4444',
        },
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 1s linear infinite',
        'think-pulse': 'think-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        'think-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
