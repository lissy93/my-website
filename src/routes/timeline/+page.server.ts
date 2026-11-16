import { nights } from '$lib/server/about';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({ nights: await nights() });
