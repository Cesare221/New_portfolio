/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Colors — fiel ao design system ───────────────────────────────
      colors: {
        // Page floors
        canvas:  '#faf9f5',
        'page-dark': '#0d0c0b',

        // Surfaces
        surface: {
          soft:           '#f5f0e8',
          card:           '#efe9de',
          'cream-strong': '#e8e0d2',
          dark:           '#181715',
          'dark-elevated':'#252320',
          'dark-soft':    '#1f1e1b',
        },

        // Brand
        coral: {
          primary:  '#cc785c',
          active:   '#a9583e',
          disabled: '#e6dfd8',
        },

        // Call to Action
        cta: '#2563EB',

        // Text
        ink:           '#141413',
        'body-strong': '#252523',
        body:          '#3d3d3a',
        muted:         '#6c6a64',
        'muted-soft':  '#8e8b82',

        // Borders
        hairline:       '#e6dfd8',
        'hairline-soft':'#ebe6df',

        // On surfaces
        'on-primary':  '#ffffff',
        'on-dark':     '#faf9f5',
        'on-dark-soft':'#a09d96',

        // Accent
        accent: {
          teal:  '#5db8a6',
          amber: '#e8a55a',
        },

        // Semantic
        success: '#5db872',
        warning: '#d4a017',
        error:   '#c64545',
      },

      // ── Typography ────────────────────────────────────────────────────
      fontFamily: {
        display: ['"Space Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans:    ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },

      fontSize: {
        'display-xl': ['64px',  { lineHeight: '1.05', letterSpacing: '-0.047em' }],
        'display-lg': ['48px',  { lineHeight: '1.10', letterSpacing: '-0.021em' }],
        'display-md': ['36px',  { lineHeight: '1.15', letterSpacing: '-0.014em' }],
        'display-sm': ['28px',  { lineHeight: '1.20', letterSpacing: '-0.011em' }],
        'title-lg':   ['22px',  { lineHeight: '1.30' }],
        'title-md':   ['18px',  { lineHeight: '1.40' }],
        'title-sm':   ['16px',  { lineHeight: '1.40' }],
        'body-md':    ['16px',  { lineHeight: '1.55' }],
        'body-sm':    ['14px',  { lineHeight: '1.55' }],
        'caption':    ['13px',  { lineHeight: '1.40' }],
        'caption-upper': ['12px', { lineHeight: '1.40', letterSpacing: '0.094em' }],
        'button':     ['14px',  { lineHeight: '1.00' }],
        'nav-link':   ['14px',  { lineHeight: '1.40' }],
        'code':       ['13px',  { lineHeight: '1.60' }],
      },

      // ── Spacing ──────────────────────────────────────────────────────
      spacing: {
        'xxs':     '4px',
        'xs':      '8px',
        'sm':      '12px',
        'md':      '16px',
        'lg':      '24px',
        'xl':      '32px',
        'xxl':     '48px',
        'section': '96px',
      },

      // ── Border radius ────────────────────────────────────────────────
      borderRadius: {
        'xs':   '4px',
        'sm':   '6px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '16px',
        'pill': '9999px',
        'full': '9999px',
      },

      // ── Shadows ──────────────────────────────────────────────────────
      boxShadow: {
        'card':       '0 1px 3px rgba(20,20,19,0.06)',
        'card-hover': '0 2px 8px rgba(20,20,19,0.10)',
        'glow':       '0 0 40px rgba(204,120,92,0.25)',
        'glow-strong':'0 0 60px rgba(204,120,92,0.40)',
      },

      // ── Animation — marquee ──────────────────────────────────────────
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee:  'marquee linear infinite',
        'fade-up':'fade-up 0.6s ease forwards',
      },

      // ── Max width ────────────────────────────────────────────────────
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
};
