import { allProjects, featured, groups } from '$lib/me/projects';
import { totalStars, withLiveStats } from '$lib/server/github';
import type { PageServerLoad } from './$types';

/* the page's lists are keyed on these, and a repeat breaks it in the browser, so stop the build */
const keys = [
	...allProjects().map(({ repo }) => repo.toLowerCase()),
	...featured.flatMap(({ screens }) => screens.flatMap(({ id }) => id ?? [])),
	...groups.map(({ title }) => title)
];
const twice = keys.find((key, index) => keys.indexOf(key) !== index);
if (twice) throw new Error(`"${twice}" is in src/lib/me/projects.ts twice`);

export const load: PageServerLoad = async () => ({
	stars: await totalStars(),
	featured: await withLiveStats(featured),
	groups: await Promise.all(
		groups.map(async (group) => ({ ...group, projects: await withLiveStats(group.projects) }))
	)
});
