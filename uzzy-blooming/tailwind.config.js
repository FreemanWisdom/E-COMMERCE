module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a', // Deep Navy
        accent: '#d97706', // Amber/Gold
        'neutral-light': '#f8fafc', // Slate 50
        'neutral-dark': '#334155', // Slate 700
        // Legacy support
        blush: '#f8fafc',
        rose: '#d97706',
        sand: '#f1f5f9',
        cocoa: '#0f172a',
        pine: '#334155'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.12)'
      },
      animation: {
        floatIn: 'floatIn 0.6s ease-out both'
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};
