import tailwindcssAnimate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

// Raw's palette lives in src/index.css as oklch channels, so opacity modifiers work.
const raw = (name) => `oklch(var(--${name}) / <alpha-value>)`;

// Raw's sizes, as steps of its 16.5px body. The body grows on wide screens (--body in
// src/index.css), and every step grows with it.
const step = (px) => `calc(var(--body) * ${px} / 16.5)`;

const noise =
	"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .11 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}"],
	future: {
		hoverOnlyWhenSupported: true,
	},
  theme: {
  	extend: {
		keyframes: {
			fadein: {
				from: {
				opacity: "0",
				},
				to: {
				opacity: "1",
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
			fadein: "fadein 1s ease var(--fadein-delay, 0) forwards",
			text: "text 5s ease infinite",
			textfadein: "fadein 1s ease var(--fadein-delay, 0) forwards, text 5s ease infinite",
		},
		fontFamily: {
			cast: ['"Archivo Variable"', "system-ui", "sans-serif"],
			inter: ['"Inter Variable"', '"Inter Fallback"', "system-ui", "sans-serif"],
			"dm-mono": ['"DM Mono"', "ui-monospace", "Menlo", "monospace"],
		},
		fontSize: {
			badge: step(11.5),
			label: step(12.5),
			meta: step(13),
			small: step(15),
			note: step(15.5),
			body: "var(--body)",
			"body-lg": step(17),
			title: step(21),
			tool: step(30),
		},
		borderWidth: {
			hairline: "var(--hairline)",
		},
		backgroundImage: {
			noise,
		},
		// Motion's { bounce: 0, visualDuration: 0.2 } spring, sampled at 60fps.
		transitionDuration: {
			spring: "417ms",
		},
		transitionTimingFunction: {
			spring:
				"linear(0, 0.079, 0.232, 0.384, 0.53, 0.65, 0.739, 0.812, 0.865, 0.903, 0.931, 0.952, 0.966, 0.976, 0.983, 0.988, 0.992, 0.994, 0.996, 0.997, 0.998, 0.999, 0.999, 0.999, 1, 1)",
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			paper: raw("paper"),
  			ink: {
  				DEFAULT: raw("ink"),
  				2: raw("ink-2"),
  				3: raw("ink-3"),
  			},
  			concrete: raw("concrete"),
  			wash: raw("wash"),
  			teal: {
  				DEFAULT: raw("teal"),
  				ink: raw("teal-ink"),
  				deep: raw("teal-deep"),
  			},
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
  plugins: [
	tailwindcssAnimate,
	plugin(({ addVariant }) => addVariant("pointer-coarse", "@media (pointer: coarse)")),
  ],
};
