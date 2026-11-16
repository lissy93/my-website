import { skyRepos } from '$lib/server/about';
import { numbers } from '$lib/server/stats';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [sky, stats] = await Promise.all([skyRepos(), numbers()]);

	return { sky, numbers: stats };
};
