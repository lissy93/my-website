import { env } from '$env/dynamic/private';
import { miniProjects, projects } from '$lib/content';
import type { Project } from '$lib/types';

type Repo = {
	name: string;
	full_name: string;
	description: string | null;
	homepage: string | null;
	language: string | null;
	stargazers_count: number;
	created_at: string;
	pushed_at: string;
	fork: boolean;
	archived: boolean;
	license: { spdx_id?: string } | null;
};

const api = 'https://api.github.com/users/Lissy93/repos?per_page=100';

const headers = {
	accept: 'application/vnd.github+json',
	'user-agent': 'aliciasykes.com',
	...(env.GITHUB_TOKEN ? { authorization: `Bearer ${env.GITHUB_TOKEN}` } : {})
};

const key = (repo: string) => repo.toLowerCase();

const title = (name: string) =>
	name.includes('.')
		? name
		: name.replace(/[-_]/g, ' ').replace(/\b\p{Ll}/gu, (letter) => letter.toUpperCase());

const tidy = (text: string | null) =>
	(text ?? '')
		.replace(/:[\w+-]+:/g, '')
		.replace(/^[^\p{L}\p{N}("']+/u, '')
		.replace(/\s+/g, ' ')
		.trim();

function toProject(repo: Repo): Project {
	const spdx = repo.license?.spdx_id;

	return {
		name: title(repo.name),
		blurb: tidy(repo.description),
		repo: repo.full_name,
		website: repo.homepage || undefined,
		stars: repo.stargazers_count,
		from: +repo.created_at.slice(0, 4),
		to: +repo.pushed_at.slice(0, 4),
		lang: repo.language ?? undefined,
		license: spdx && spdx !== 'NOASSERTION' ? spdx : undefined
	};
}

async function fetchPage(page: number): Promise<Repo[]> {
	try {
		const res = await fetch(`${api}&page=${page}`, { headers, signal: AbortSignal.timeout(8000) });
		const body = res.ok ? await res.json() : [];

		return Array.isArray(body) ? body : [];
	} catch {
		return [];
	}
}

const worthShowing = (repo: Repo) =>
	!repo.fork && repo.description && (!repo.archived || repo.stargazers_count >= 100);

async function fetchRepos() {
	const found = new Map<string, Project>();

	for (let page = 1; page <= 5; page++) {
		const batch = await fetchPage(page);
		for (const repo of batch)
			if (worthShowing(repo)) found.set(key(repo.full_name), toProject(repo));
		if (batch.length < 100) break;
	}

	return found;
}

let buildCache: Promise<Map<string, Project>> | undefined;

const allRepos = () => (buildCache ??= fetchRepos());

const overlay = (project: Project, repo?: Project): Project =>
	repo
		? { ...repo, ...project, stars: repo.stars, license: repo.license ?? project.license }
		: project;

export async function withLiveStats(list: Project[]): Promise<Project[]> {
	const repos = await allRepos();

	return list.map((project) => overlay(project, repos.get(key(project.repo))));
}

export async function allProjects(): Promise<Project[]> {
	const repos = await allRepos();
	const known = [...projects, ...miniProjects];
	const seen = new Set(known.map((project) => key(project.repo)));

	return [
		...known.map((project) => overlay(project, repos.get(key(project.repo)))),
		...[...repos].filter(([id]) => !seen.has(id)).map(([, repo]) => repo)
	].sort((a, b) => b.stars - a.stars);
}
