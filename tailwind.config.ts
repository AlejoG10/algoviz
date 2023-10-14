import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      "visualizer-bp": "900px",
      ...defaultTheme.screens,
    },
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        'navbar': '5rem',
        'filters': '5rem',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
export default config
