import netlify from '@sveltejs/adapter-netlify';
import node from '@sveltejs/adapter-node';
import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const adapter = process.env.VERCEL ? vercel() : process.env.NETLIFY ? netlify() : node();
const analytics = 'https://no-track.as93.net';

export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter,
		alias: { $components: 'src/lib/components' },
		/* prerendered pages get this as a meta tag, so vercel.json sends what a meta tag can't */
		csp: {
			directives: {
				'default-src': ['self'],
				'script-src': ['self', analytics],
				'connect-src': ['self', analytics],
				'img-src': ['self', 'https:'],
				'font-src': ['self', 'data:'],
				'style-src': ['self', 'unsafe-inline'],
				'object-src': ['none'],
				'base-uri': ['self'],
				'form-action': ['self']
			}
		}
	}
};
