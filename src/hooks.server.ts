import { redirect, type Handle } from '@sveltejs/kit';
import { movedTo } from '$lib/server/redirects';

/* links to the old site get a permanent redirect to wherever that page lives now */
export const handle: Handle = ({ event, resolve }) => {
	const location = movedTo(event.url.pathname);
	if (location) redirect(301, location);

	return resolve(event);
};
