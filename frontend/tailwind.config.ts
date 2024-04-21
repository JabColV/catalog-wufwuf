import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'olivine': {
          '50': '#f5f9ec',
          '100': '#e7f0d7',
          '200': '#d1e3b3',
          '300': '#accc7b',
          '400': '#96bc5f',
          '500': '#78a141',
          '600': '#5d7f31',
          '700': '#476229',
          '800': '#3c4f25',
          '900': '#344423',
          '950': '#19240f',
          'fondo': '#668A4c'
        }, 
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
