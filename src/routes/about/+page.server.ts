import { intro } from '$lib/me/about';
import { honours, skyProjects, withRepoLinks } from '$lib/server/about';
import { numbers } from '$lib/server/stats';
import { place } from '$lib/stargazing/sky';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [projects, stats] = await Promise.all([skyProjects(), numbers()]);

	return {
		intro: intro.map(withRepoLinks),
		honours,
		sky: place(projects),
		numbers: stats
	};
};
