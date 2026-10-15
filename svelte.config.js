import netlify from '@sveltejs/adapter-netlify';
import node from '@sveltejs/adapter-node';
import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const adapter = process.env.VERCEL ? vercel() : process.env.NETLIFY ? netlify() : node();

export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter,
		alias: { $components: 'src/lib/components', $styles: 'src/lib/styles' }
	}
};
