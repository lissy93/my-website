import { site } from '$lib/config';

export const prerender = true;

/* Read off the route tree, so a new page is listed the moment the file exists. */
const paths = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
	.filter((file) => !file.includes('['))
	.map((file) => file.replace('/src/routes', '').replace('/+page.svelte', '') || '/')
	.sort();

export const GET = () =>
	new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `\t<url><loc>${site.url}${path}</loc></url>`).join('\n')}
</urlset>
`,
		{ headers: { 'content-type': 'application/xml' } }
	);
