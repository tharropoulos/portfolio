/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
		keyframes: {
			'pan-zoom': {
				'0%': { transform: 'scale(1.1) translate(-3%, -1%)', opacity: 0.3 },
				'100%': { transform: 'scale(1) translate(0%, 0%)', opacity: 1 }
			},
			fadein: {
				from: {
				opacity: "0",
				},
				to: {
				opacity: "1",
				},
			},
			'fadein-slide': {
				from: {
				opacity: "0",
				transform: 'translateY(20px)'
				},
				to: {
				opacity: "1",
				transform: 'translateY(0)'
				},
			},
			text: {
				"0%, 100%": {
				"background-size": "200% 200%",
				"background-position": "left center",
				},
				"50%": {
				"background-size": "200% 200%",
				"background-position": "right center",
				},
			}
		},
		animation: {
			'pan-zoom': 'pan-zoom 0.6s ease-out forwards',
			fadein: "fadein 1s ease var(--fadein-delay, 0) forwards",
			'fadein-slide': "fadein-slide 0.5s ease var(--fadein-delay, 0) forwards",
			text: "text 5s ease infinite",
			textfadein: "fadein 1s ease var(--fadein-delay, 0) forwards, text 5s ease infinite",
		},
		fontFamily: {
			logo: ["Gloria Hallelujah", "sans"],
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
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
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
