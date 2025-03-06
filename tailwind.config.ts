
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
				urban: {
					'50': '#f0f7ff',
					'100': '#e0eefe',
					'200': '#baddff',
					'300': '#7cc2fd',
					'400': '#38a3f8',
					'500': '#0f88eb',
					'600': '#0075ea',
					'700': '#015fc5',
					'800': '#0854a0',
					'900': '#0e4884',
					'950': '#0a2d54'
				},
				eco: {
					'50': '#f1fcf9',
					'100': '#cff7eb',
					'200': '#a0ecda',
					'300': '#66d9c3',
					'400': '#36c0a9',
					'500': '#1ca38e',
					'600': '#158575',
					'700': '#166b62',
					'800': '#16554f',
					'900': '#164742',
					'950': '#05312c'
				},
				heat: {
					'50': '#fff8ed',
					'100': '#ffefd4',
					'200': '#ffd8a8',
					'300': '#ffbb71',
					'400': '#ff9339',
					'500': '#ff7214',
					'600': '#f04f08',
					'700': '#c73008',
					'800': '#a2280e',
					'900': '#84230f',
					'950': '#481005'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in-delay': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'50%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in-right': {
					from: { opacity: '0', transform: 'translateX(20px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.95)' },
					to: { opacity: '1', transform: 'scale(1)' },
				},
				'blur-in': {
					from: { opacity: '0', filter: 'blur(4px)' },
					to: { opacity: '1', filter: 'blur(0)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'fade-in-delay': 'fade-in-delay 0.8s ease-out',
				'slide-in-right': 'slide-in-right 0.4s ease-out',
				'pulse-slow': 'pulse-slow 2s infinite',
				'scale-in': 'scale-in 0.3s ease-out',
				'blur-in': 'blur-in 0.4s ease-out'
			},
			fontFamily: {
				sans: ['Inter var', 'SF Pro Display', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				'subtle': '0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
				'card': '0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04)',
				'float': '0 8px 16px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.03)',
			},
			transitionTimingFunction: {
				'in-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
				'out-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-subtle': 'linear-gradient(to right, var(--tw-gradient-stops))',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
