/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'h-navy': '#0A1628',
        'h-blue': '#1B4FD8',
        'h-sky': '#60A5FA',
        'h-slate': '#475569',
        'h-muted': '#F8FAFC',
        'h-border': '#E2E8F0',
        'h-gold': '#C9A84C',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.25rem, 5vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.75rem, 3.5vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      spacing: {
        'section': '120px',
        'section-sm': '80px',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'smooth': 'cubic-bezier(0.43, 0.195, 0.02, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        'hero-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #EFF6FF 100%)',
        'card-gradient': 'linear-gradient(to bottom, transparent 40%, rgba(10,22,40,0.85) 100%)',
        'blue-gradient': 'linear-gradient(135deg, #1B4FD8 0%, #0A1628 100%)',
      },
      boxShadow: {
        'luxury': '0 25px 60px -12px rgba(10, 22, 40, 0.15)',
        'luxury-lg': '0 40px 80px -16px rgba(10, 22, 40, 0.2)',
        'card': '0 4px 24px rgba(10, 22, 40, 0.08)',
        'card-hover': '0 16px 48px rgba(27, 79, 216, 0.15)',
        'glow': '0 0 40px rgba(27, 79, 216, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
