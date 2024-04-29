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
              300:"hsla(0, 0%, 84%, 0.83)", //background-color SignUp and SignIn
              350:"#333230", //background whitout home header  
              400:"hsla(233, 12%, 13%, 1)", // background fon color header for home page
              450:"hsla(31, 0%, 100%, 1)",
            }, 
            Default:{
              DEFAULT: "#f4f4f5"
            },
            neutral:{
              700: "#d4d4d4", //bg button admin panel active
            },
            zinc:{
              150:"#e4e4e7", //bg button admin panel hover
            },
            success:{
              DEFAULT: "#17c964"
            },
          },
        },
        dark: {
          layout: {}, 
          colors: {
            background: "hsla(225, 10%, 8%, 1)", //background fon theme web-app
            foreground: "hsla(31, 0%, 100%, 1)", //text color theme web-app
            success: {
              foreground: "#ECEDEE",
              DEFAULT: "hsla(231, 48%, 48%, 0.5)",
            },
            danger:{
              foreground: "#ECEDEE",
              DEFAULT: "hsla(0, 100%, 68%, 0.6)",
            },
            layout: {
              foreground:"#B6B7BF", //text color layout
              DEFAULT: "hsla(233, 12%, 13%, 1)", //background fon color header and form
              50:"#18181b",
              100:"#27272A",
              150:"#3B3B3B",
              200:"#202023",
              300:"hsla(203, 83%, 4%, 0.8)", //background fon color SignUp and SignIn 
              350:"#333230", //background whitout home header  
              400:"hsla(233, 12%, 13%, 1)", // background fon color header for home page
              450:"hsla(31, 0%, 100%, 1)",// text color for main block and header for home page
            },
            Default:{
              DEFAULT: "#27272A"
            },
            neutral:{
              700: "#404040", //bg button admin panel active
            },
            zinc:{
              150:"#52525b", //bg button admin panel hover
            },
            success:{
              DEFAULT: "#17c964"
            },
          },
        },
      },
    }),
  ]
}

export default config;