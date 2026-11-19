import { site } from '$lib/me/site';
import { drawCard } from '$lib/server/share-card';

export const prerender = true;

/* the site's own card, used by the homepage and any page without its own */
export const GET = () =>
	drawCard({
		title: site.name,
		description: site.tagline,
		path: '/',
		mood: 'grinning',
		stacked: true
	});
