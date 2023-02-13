import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		open: true,
	},
	plugins: [react()],
	build: {
		outDir: "./build",
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom"],
					mui: ["@emotion/react", "@emotion/styled", "@mui/material"],
					recharts: ["recharts"],
				},
			},
		},
	},
})
