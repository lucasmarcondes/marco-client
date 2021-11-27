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
				safelist:
					'bg-red-200 bg-red-400 bg-red-500 bg-green-200 bg-green-400 bg-green-500 bg-blue-200 bg-blue-400 bg-blue-500 bg-warm-gray-200 bg-warm-gray-400 bg-warm-gray-500 border-red-200 border-red-400 border-red-500 border-green-200 border-green-400 border-green-500 border-blue-200 border-blue-400 border-blue-500 border-warm-gray-200 border-warm-gray-400 border-warm-gray-500 text-red-200 text-red-400 text-red-500 text-green-200 text-green-400 text-green-500 text-blue-200 text-blue-400 text-blue-500 text-warm-gray-200 text-warm-gray-400 text-warm-gray-500',
				plugins: [
					WindiCSSForms,
					WindiCSSClamp,
					// WindiCSSAnimate({
					// 	settings: { animatedSpeed: 150 },
					// 	variants: ['responsive'],
					// }),
				],
			},
		}),
	],
})
