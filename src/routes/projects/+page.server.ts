import { projects } from '$lib/content';
import { allProjects, withLiveStats } from '$lib/server/github';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [featured, everything] = await Promise.all([withLiveStats(projects), allProjects()]);
	const shown = new Set(featured.map((project) => project.repo.toLowerCase()));

	return { featured, rest: everything.filter((p) => !shown.has(p.repo.toLowerCase())) };
};
