import { site } from '$lib/config';

export const prerender = true;

export const GET = () =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`, {
		headers: { 'content-type': 'text/plain; charset=utf-8' }
	});
