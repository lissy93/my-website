import { onHome } from '$lib/me/projects';
import { allPosts } from '$lib/server/feeds';
import { withLiveStats } from '$lib/server/github';
import type { PageServerLoad } from './$types';

/* prerendered, so GitHub and the feeds are only hit at build time */
export const load: PageServerLoad = async () => {
	const [main, mini, posts] = await Promise.all([
		withLiveStats(onHome('projects')),
		withLiveStats(onHome('mini')),
		allPosts()
	]);

	return { projects: main, miniProjects: mini, posts: posts.slice(0, 5) };
};
