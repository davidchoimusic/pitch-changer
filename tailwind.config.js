/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': 'rgb(17 24 39)',
        'bg-card': 'rgb(31 41 55)',
        'accent': 'rgb(59 130 246)',
        'primary': 'rgb(168 85 247)',
        'accent-pink': 'rgb(244 114 182)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderColor: {
        'divider': 'rgb(255 255 255 / 0.1)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, rgb(244 114 182) 0%, rgb(168 85 247) 100%)',
        'gradient-subtle': 'linear-gradient(180deg, rgb(31 41 55) 0%, rgb(17 24 39) 100%)',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(192, 132, 252, 0.5)',
      },
    },
  },
  plugins: [],
}
