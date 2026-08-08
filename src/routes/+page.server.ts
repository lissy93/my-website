import { miniProjects, projects } from '$lib/content';
import { allPosts } from '$lib/server/feeds';
import { withLiveStats } from '$lib/server/github';
import type { PageServerLoad } from './$types';

/* Prerendered, so GitHub and the RSS feeds are only ever hit at build time. */
export const load: PageServerLoad = async () => {
	const [main, mini, posts] = await Promise.all([
		withLiveStats(projects),
		withLiveStats(miniProjects),
		allPosts()
	]);

	return { projects: main, miniProjects: mini, posts: posts.slice(0, 4) };
};
