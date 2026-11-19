import { env } from '$env/dynamic/private';
import { allProjects } from '$lib/me/projects';
import type { OwnRepo, Project } from '$lib/types';

type Repo = {
	full_name: string;
	fork: boolean;
	homepage: string | null;
	language: string | null;
	stargazers_count: number;
	created_at: string;
	pushed_at: string;
	license: { spdx_id?: string } | null;
};

const api = 'https://api.github.com/users/Lissy93/repos?per_page=100';

export const headers = {
	accept: 'application/vnd.github+json',
	'user-agent': 'aliciasykes.com',
	...(env.GITHUB_TOKEN ? { authorization: `Bearer ${env.GITHUB_TOKEN}` } : {})
};

/* the parts of an entry GitHub can fill in */
type Stats = Pick<Project, 'website' | 'stars' | 'from' | 'to' | 'lang' | 'license'>;

const key = (repo: string) => repo.toLowerCase();

function toStats(repo: Repo): Stats {
	const spdx = repo.license?.spdx_id;

	return {
		website: repo.homepage || undefined,
		stars: repo.stargazers_count,
		from: +repo.created_at.slice(0, 4),
		to: +repo.pushed_at.slice(0, 4),
		lang: repo.language ?? undefined,
		license: spdx && spdx !== 'NOASSERTION' ? spdx : undefined
	};
}

const toOwn = (repo: Repo): OwnRepo => ({
	name: repo.full_name.split('/')[1],
	stars: repo.stargazers_count
});

async function fetchPage(page: number): Promise<Repo[]> {
	const res = await fetch(`${api}&page=${page}`, { headers, signal: AbortSignal.timeout(8000) });
	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

	return res.json();
}

/* all or nothing, so a page that fails can't leave the star count short */
async function fetchRepos() {
	const found = new Map<string, Stats>();
	const own: OwnRepo[] = [];

	try {
		for (let page = 1; page <= 5; page++) {
			const batch = await fetchPage(page);
			for (const repo of batch) {
				found.set(key(repo.full_name), toStats(repo));
				if (!repo.fork) own.push(toOwn(repo));
			}
			if (batch.length < 100) break;
		}
	} catch (error) {
		console.warn(`GitHub stats unavailable, building without them (${error})`);
		return { found: new Map<string, Stats>(), own: [] };
	}

	/* a typo or a private repo just goes without stats, so flag it rather than fail */
	const missing = allProjects().filter(({ repo, source }) => !source && !found.has(key(repo)));
	if (missing.length)
		console.warn(`Not found on GitHub: ${missing.map(({ repo }) => repo).join(', ')}`);

	return { found, own };
}

let buildCache: ReturnType<typeof fetchRepos> | undefined;

const allRepos = () => (buildCache ??= fetchRepos());

/* fills the gaps in a hand-written entry, but stars and licences always come from GitHub */
const overlay = <T extends Project>(project: T, stats?: Stats): T =>
	stats
		? { ...stats, ...project, stars: stats.stars, license: stats.license ?? project.license }
		: project;

export async function withLiveStats<T extends Project>(list: T[]): Promise<T[]> {
	const { found } = await allRepos();

	return list.map((project) => overlay(project, found.get(key(project.repo))));
}

/* my own public repos, leaving out forks */
export const ownRepos = async () => (await allRepos()).own;

export const totalStars = async () => (await ownRepos()).reduce((sum, repo) => sum + repo.stars, 0);
