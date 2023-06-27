/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // media significa que o modo dark pode ser ativado por padrão ou pelo usuário
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
