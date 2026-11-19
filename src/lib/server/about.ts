import { moments } from '$lib/me/about';
import { allProjects, featured, repoUrl, sourceUrl } from '$lib/me/projects';
import type { Link, Moment, Night, SkyProject } from '$lib/types';
import { withLiveStats } from './github';

const key = (repo: string) => repo.toLowerCase();

const launches = (list: Moment[]) =>
	new Set(list.flatMap((m) => (m.kind === 'launch' ? [key(m.repo)] : [])));

const isFeatured = new Set(featured.map((project) => key(project.repo)));
const named = launches(moments);

for (const moment of moments) {
	if (moment.kind === 'launch' && !moment.note && isFeatured.has(key(moment.repo)))
		throw new Error(`${moment.repo} is featured, so it's on the timeline already`);
}

/* every featured project is a launch, plus whatever else about.ts names */
const allMoments: Moment[] = [
	...featured
		.filter((project) => !named.has(key(project.repo)))
		.map((project): Moment => ({ kind: 'launch', repo: project.repo })),
	...moments
];

const launched = launches(allMoments);

/* fills in each launch from projects.ts and GitHub, newest first */
export async function nights(): Promise<Night[]> {
	const projects = new Map((await withLiveStats(allProjects())).map((p) => [key(p.repo), p]));

	const filled = allMoments.map((moment): Night => {
		if (moment.kind !== 'launch') return moment;

		const project = projects.get(key(moment.repo));
		if (!project)
			throw new Error(`${moment.repo} is in src/lib/me/about.ts but not src/lib/me/projects.ts`);
		if (!project.from)
			throw new Error(`${moment.repo} needs a "from" year in src/lib/me/projects.ts`);

		return {
			kind: 'launch',
			when: `${project.from}`,
			title: project.name,
			href: sourceUrl(project),
			logo: project.logo,
			stars: project.stars,
			lang: project.lang,
			license: project.license,
			note: moment.note
		};
	});

	return filled.sort((a, b) => b.when.localeCompare(a.when));
}

/* every project on /projects, flagged if it's on the timeline too */
export async function skyProjects(): Promise<SkyProject[]> {
	return (await withLiveStats(allProjects())).map((project) => ({
		repo: project.repo,
		name: project.name,
		href: sourceUrl(project),
		stars: project.stars ?? 0,
		year: project.from,
		logo: project.logo,
		launch: launched.has(key(project.repo))
	}));
}

const repoByName = new Map(allProjects().map(({ name, repo }) => [name, repo]));

/* turns each [Project name] in the copy into a link to its GitHub */
export function withRepoLinks(text: string): (string | Link)[] {
	return text.split(/\[(.+?)\]/).map((part, i) => {
		if (i % 2 === 0) return part;

		const repo = repoByName.get(part);
		if (!repo) throw new Error(`[${part}] in about.ts isn't a project in projects.ts`);

		return { label: part, href: repoUrl(repo) };
	});
}
