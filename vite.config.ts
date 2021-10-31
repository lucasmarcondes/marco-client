import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import WindiCSSForms from 'windicss/plugin/forms'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		WindiCSS({
			config: {
				plugins: [WindiCSSForms],
			},
		}),
	],
})
