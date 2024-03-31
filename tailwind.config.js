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
            foreground: "hsla(235, 15%, 31%, 1)",
            success: {
              foreground: "#0F0C24",
              DEFAULT: "hsla(132, 76%, 47%, 0.6)",
            },
            danger:{
              foreground: "#ECEDEE",
              DEFAULT: "hsla(0, 100%, 59%, 0.8)",
            },
            layout: {
              foreground:"#B6B7BF",
              DEFAULT: "#FFFFFF",
              50:"#FFFFFF",
              100:"#F4F4F5",
              150:"#3B3B3B",
              200:"#F9F9FA",
              300:"hsla(0, 0%, 84%, 0.83)" //background-color SignUp and SignIn
            }, 
            Default:{
              DEFAULT: "#f4f4f5"
            },
          },
        },
        dark: {
          layout: {}, 
          colors: {
            background: "#051622", 
            foreground: "hsla(31, 0%, 100%, 1)",
            success: {
              foreground: "#ECEDEE",
              DEFAULT: "hsla(231, 48%, 48%, 0.5)",
            },
            danger:{
              foreground: "#ECEDEE",
              DEFAULT: "hsla(0, 100%, 68%, 0.6)",
            },
            layout: {
              foreground:"#B6B7BF", //text color 
              DEFAULT: "hsla(205, 74%, 13%, 1)", ////background fon color header and form
              50:"#18181b",
              100:"#27272A",
              150:"#3B3B3B",
              200:"#202023",
              300:"hsla(203, 83%, 4%, 0.8)" //background fon color SignUp and SignIn 


            },
            Default:{
              DEFAULT: "#27272A"
            },
          },
        },
      },
    }),
  ]
}

export default config;