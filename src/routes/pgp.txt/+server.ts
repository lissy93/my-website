import { pgp } from '$lib/me/pgp';

export const prerender = true;

export const GET = () =>
	new Response(pgp.key, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
