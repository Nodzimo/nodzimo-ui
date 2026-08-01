import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { mdxReactProxyPlugin } from './build-plugins/mdx-react-proxy-plugin.ts'

export default defineConfig({
	plugins: [tailwindcss(), mdxReactProxyPlugin()],
})
