import { site } from '$lib/config';

export const prerender = true;

/* RFC 9116 wants an expiry, so each build pushes it a year out */
const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

export const GET = () =>
	new Response(
		`Contact: mailto:security@as93.net
Expires: ${expires}
Preferred-Languages: ${site.locale}
Canonical: ${site.url}/.well-known/security.txt
`,
		{ headers: { 'content-type': 'text/plain; charset=utf-8' } }
	);
