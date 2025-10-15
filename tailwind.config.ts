import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#273055', // azul noche
          accent:  '#DB8367', // naranja
          base:    '#F1F1F2', // gris muy claro
          a: '#295BA7',
          b: '#7D85BF',
          c: '#0099DB',
        },
        // atajos útiles
        ink: {
          DEFAULT: '#273055',
          light:   '#7D85BF',
        },
      },
      borderRadius: {
        'xl2': '1rem',
      },
      boxShadow: {
        brand: '0 8px 24px rgba(39,48,85,0.12)',
      },
      // tipografías (punto 3)
      fontFamily: {
        // Bariol / Myriad tienen licencia; proponemos equivalentes libres:
        // - "Nunito" (para títulos, recuerda importar)
        // - "Inter" o "System" para cuerpos
        display: ['Nunito', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Inter', 'Arial', 'sans-serif'],
        body:    ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
