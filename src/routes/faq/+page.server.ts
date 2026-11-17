import { questions } from '$lib/me/faq';
import { featured, sourceUrl } from '$lib/me/projects';
import { numbers } from '$lib/server/stats';
import type { PageServerLoad } from './$types';

/* each id is a #link, so a repeat would send two questions to one place */
const ids = questions.map(({ id }) => id);
const twice = ids.find((id, index) => ids.indexOf(id) !== index);
if (twice) throw new Error(`"${twice}" is in src/lib/me/faq.ts twice`);

/* the projects page's featured ones, not every launch on the timeline */
const projects = featured.map((project) => ({
	title: project.name,
	href: sourceUrl(project),
	logo: project.logo
}));

export const load: PageServerLoad = async () => ({ projects, numbers: await numbers() });
