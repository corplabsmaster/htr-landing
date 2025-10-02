import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			lake: {
  				'50': '#EBFEF5',
  				'100': '#CFFCE5',
  				'200': '#A3F7D3',
  				'300': '#67EEB7',
  				'400': '#2ae1ac',
  				'500': '#06B97D',
  				'600': '#05a471',
  				'700': '#048f62',
  				'800': '#037a54',
  				'900': '#026545',
  				'950': '#013023'
  			},
  			lime: {
  				'50': '#f7fee7',
  				'100': '#ecfccb',
  				'200': '#d9f99d',
  				'300': '#c4ff00',
  				'400': '#a3e635',
  				'500': '#84cc16',
  				'600': '#65a30d',
  				'700': '#4d7c0f',
  				'800': '#3f6212',
  				'900': '#365314',
  				'950': '#1a2e05'
  			},
  			blue: {
  				'50': '#eff6ff',
  				'100': '#dbeafe',
  				'200': '#bfdbfe',
  				'300': '#93c5fd',
  				'400': '#60a5fa',
  				'500': '#3b82f6',
  				'600': '#0047ff',
  				'700': '#1d4ed8',
  				'800': '#1e40af',
  				'900': '#07226f',
  				'950': '#000057'
  			},
  			gray: {
  				'50': '#f9fafb',
  				'100': '#f3f4f6',
  				'200': '#e5e7eb',
  				'300': '#9ca3af',
  				'400': '#6b7280',
  				'500': '#4b5563',
  				'600': '#374151',
  				'700': '#1f2937',
  				'800': '#111827',
  				'900': '#0f172a',
  				'950': '#030712'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeOut: {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			},
  			skeletonPulse: {
  				'0%': {
  					opacity: '0.5'
  				},
  				'50%': {
  					opacity: '0.8'
  				},
  				'100%': {
  					opacity: '0.5'
  				}
  			},
  			spinReverse: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(-360deg)'
  				}
  			},
  			spinnerPulse: {
  				'0%': {
  					opacity: '0.6',
  					transform: 'scale(1)'
  				},
  				'50%': {
  					opacity: '0.9',
  					transform: 'scale(1.05)'
  				},
  				'100%': {
  					opacity: '0.6',
  					transform: 'scale(1)'
  				}
  			},
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			fadeIn: 'fadeIn 0.6s ease-in-out',
  			fadeOut: 'fadeOut 0.8s ease-in-out',
  			skeletonFade: 'skeletonPulse 1.8s ease-in-out infinite',
  			spinReverse: 'spinReverse 1.5s linear infinite',
  			spinnerPulse: 'spinnerPulse 2s ease-in-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
