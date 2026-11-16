import { nights, skyRepos } from '$lib/server/about';
import { numbers } from '$lib/server/stats';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [night, sky, stats] = await Promise.all([nights(), skyRepos(), numbers()]);

	return { nights: night, sky, numbers: stats };
};
