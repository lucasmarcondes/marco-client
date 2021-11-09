import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import WindiCSSForms from 'windicss/plugin/forms'
import WindiCSSClamp from 'windicss/plugin/line-clamp'
import WindiCSSAnimate from '@windicss/plugin-animations'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		WindiCSS({
			config: {
				plugins: [
					WindiCSSForms,
					WindiCSSClamp,
					WindiCSSAnimate({
						settings: { animatedSpeed: 150 },
						variants: ['responsive'],
					}),
				],
			},
		}),
	],
})
