import {nextui} from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        backgroundlight:'#9353D3',
        backgroundDark:'#301050',
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", 
      addCommonColors: false, 
      defaultTheme: "light", 
      defaultExtendTheme: "light", 
      layout: {}, 
      themes: {
        light: {
          layout: {}, 
          colors: {
            background: "#F6F4F2",
            foreground: "#0F0C24", 
            Layout: {
              DEFAULT: "#FFFFFF",
              50:"#FFFFFF",
              100:"#F4F4F5",
              150:"#3B3B3B",
            }, 
            Default:{
              DEFAULT: "#f4f4f5"
            } 
          },
        },
        dark: {
          layout: {}, 
          colors: {
            background: "#051622", 
            foreground: "#DEB992",
            Layout: {
              DEFAULT: "#051622",
              50:"#18181b",
              100:"#27272A",
              150:"#3B3B3B",

            },
            Default:{
              DEFAULT: "#27272A"
            } 
          },
        },
      },
    }),
  ]
}

export default config;