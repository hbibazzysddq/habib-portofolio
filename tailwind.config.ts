import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		container: {
  			center: true,
  			padding: '15px'
  		},
  		colors: {
  			primary: '#1c1c22',
  			accent: {
  				DEFAULT: '#00FF99',
  				hover: '#00e187'
  			}
  		},
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '960px',
  			xl: '1280px'
  		},
  		fontFamily: {
  			primary: 'var(--font-jetbrainsMono)'
  		},
  		animation: {
  			marquee: 'marquee var(--duration) linear infinite',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
  		},
  		keyframes: {
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require('daisyui'), // Tambahkan plugin DaisyUI di sini
      require("tailwindcss-animate")
],
};

export default config;
