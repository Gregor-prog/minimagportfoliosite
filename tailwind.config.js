/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        navy: 'var(--navy)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        cream: 'var(--cream)',
        paper: 'var(--paper)',
        line: 'var(--line)',
        field: 'var(--field)',
        accent: 'var(--teal)',
        'accent-strong': 'var(--teal-strong)',
        'accent-soft': 'var(--teal-soft)',
        'gold-ink': 'var(--gold-ink)',
        'gold-soft': 'var(--gold-soft)',
      },
    },
  },
  plugins: [],
}
