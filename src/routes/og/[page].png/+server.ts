import { error } from '@sveltejs/kit';
import { hasCard, pages } from '$lib/me/pages';
import { drawCard } from '$lib/server/share-card';
import type { Mood } from '$lib/stargazing/Stargazer.svelte';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

/* the face he pulls on each page's card */
const moods: Partial<Record<keyof typeof pages, Mood>> = {
	'/projects': 'awed',
	'/about': 'content',
	'/timeline': 'moonlit',
	'/faq': 'awed',
	'/contact': 'grinning'
};

/* listed rather than left to the crawler, which never sees /contact's links */
export const entries: EntryGenerator = () =>
	Object.keys(pages).map((path) => ({ page: path.slice(1) }));

export const GET: RequestHandler = ({ params }) => {
	const path = `/${params.page}`;
	if (!hasCard(path)) error(404, 'Not found');

	return drawCard({ ...pages[path], path, mood: moods[path] });
};
