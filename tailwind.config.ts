import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			// Retro cyberpunk colors
  			neon: {
  				cyan: 'hsl(var(--neon-cyan))',
  				magenta: 'hsl(var(--neon-magenta))',
  				yellow: 'hsl(var(--neon-yellow))',
  				green: 'hsl(var(--neon-green))'
  			},
  			terminal: {
  				green: 'hsl(var(--terminal-green))'
  			},
  			amber: 'hsl(var(--amber))'
  		},
  		fontFamily: {
  			retro: ['Orbitron', 'Space Mono', 'monospace'],
  			mono: ['Space Mono', 'Courier New', 'monospace'],
  			display: ['Orbitron', 'monospace']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			'retro': '0 0 10px currentColor, inset 0 0 10px rgba(0, 255, 255, 0.1)',
  			'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
  			'terminal': '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)'
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
  			'flicker': 'flicker 0.15s infinite linear alternate',
  			'scan': 'scan 2s linear infinite'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'pulse-neon': {
  				'0%': {
  					textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
  					opacity: '1'
  				},
  				'100%': {
  					textShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor',
  					opacity: '0.8'
  				}
  			},
  			'flicker': {
  				'0%': { opacity: '1' },
  				'98%': { opacity: '1' },
  				'99%': { opacity: '0.98' },
  				'100%': { opacity: '1' }
  			},
  			'scan': {
  				'0%': { transform: 'translateY(-100%)' },
  				'100%': { transform: 'translateY(100vh)' }
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
