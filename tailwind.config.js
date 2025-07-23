/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Escanea tus archivos Angular
    "./node_modules/flowbite/**/*.js" // Para que Tailwind lea los componentes de Flowbite
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
      spacing: {
        custom: '10px',
      },
      screens: {
        xs: '30rem',
        '2xl': '100rem',
        '3xl': '120rem',
      },
    },
  },
  plugins: [
    require('flowbite/plugin') // Activa Flowbite
  ],
}
