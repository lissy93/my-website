import { moments, skyHidden, skyNames } from '$lib/about';
import { allProjects, featured, sourceUrl } from '$lib/projects';
import type { Moment, Night, SkyRepo } from '$lib/types';
import { ownRepos, withLiveStats } from './github';

const key = (repo: string) => repo.toLowerCase();

const isFeatured = new Set(featured.map((project) => key(project.repo)));
const named = new Set(moments.flatMap((m) => (m.kind === 'launch' ? [key(m.repo)] : [])));

for (const moment of moments) {
	if (moment.kind === 'launch' && !moment.note && isFeatured.has(key(moment.repo)))
		throw new Error(`${moment.repo} is featured, so it's on the About page already`);
}

/* every featured project is a launch, plus whatever else about.ts names */
const allMoments: Moment[] = [
	...featured
		.filter((project) => !named.has(key(project.repo)))
		.map((project): Moment => ({ kind: 'launch', repo: project.repo })),
	...moments
];

/* fills in each launch from projects.ts and GitHub, newest first */
export async function nights(): Promise<Night[]> {
	const projects = new Map((await withLiveStats(allProjects())).map((p) => [key(p.repo), p]));

	const filled = allMoments.map((moment): Night => {
		if (moment.kind !== 'launch') return moment;

		const project = projects.get(key(moment.repo));
		if (!project)
			throw new Error(`${moment.repo} is in src/lib/about.ts but not src/lib/projects.ts`);
		if (!project.from) throw new Error(`${moment.repo} needs a "from" year in src/lib/projects.ts`);

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

const pretty = (repo: string) =>
	repo.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

/* every public repo, named after its project where it has one, and marked if it's one of the launches */
export async function skyRepos(): Promise<SkyRepo[]> {
	const repos = await ownRepos();
	const name = (repo: string) => key(repo.split('/')[1]);
	const projects = new Map(allProjects().map((project) => [name(project.repo), project]));
	const launched = new Set(allMoments.flatMap((m) => (m.kind === 'launch' ? [name(m.repo)] : [])));

	return repos
		.filter((repo) => !skyHidden.includes(repo.name))
		.map((repo) => {
			const project = projects.get(key(repo.name));

			return {
				...repo,
				title: skyNames[repo.name] ?? project?.name ?? pretty(repo.name),
				launch: launched.has(key(repo.name)) ? project?.from : undefined,
				logo: project?.logo
			};
		});
}
