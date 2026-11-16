import { questions } from '$lib/faq';
import { featured, sourceUrl } from '$lib/projects';
import { numbers } from '$lib/server/stats';
import type { PageServerLoad } from './$types';

/* each id is a #link, so a repeat would send two questions to one place */
const ids = questions.map(({ id }) => id);
const twice = ids.find((id, index) => ids.indexOf(id) !== index);
if (twice) throw new Error(`"${twice}" is in src/lib/faq.ts twice`);

/* the featured ones from the projects page, rather than every launch on the About timeline */
const projects = featured.map((project) => ({
	title: project.name,
	href: sourceUrl(project),
	logo: project.logo
}));

export const load: PageServerLoad = async () => ({ projects, numbers: await numbers() });
