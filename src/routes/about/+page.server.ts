import { skyProjects } from '$lib/server/about';
import { numbers } from '$lib/server/stats';
import { place } from '$lib/sky';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [projects, stats] = await Promise.all([skyProjects(), numbers()]);

	return { sky: place(projects), numbers: stats };
};
