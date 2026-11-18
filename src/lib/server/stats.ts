import { env } from '$env/dynamic/private';
import type { Stat } from '$lib/types';
import { headers, ownRepos } from './github';

const user = 'Lissy93';
const profileUrl = `https://github.com/${user}`;

async function getJson(url: string, init?: RequestInit) {
	const res = await fetch(url, { ...init, signal: AbortSignal.timeout(8000) });
	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

	return res.json();
}

/* each number is fetched on its own, so one that fails is just left out */
async function attempt<T>(name: string, get: () => Promise<T>): Promise<T | undefined> {
	try {
		return await get();
	} catch (error) {
		console.warn(`${name} unavailable, building without it (${error})`);
	}
}

async function dockerHub() {
	const { results } = await getJson(
		`https://hub.docker.com/v2/repositories/${user.toLowerCase()}/?page_size=100`
	);
	const pulls = results.reduce(
		(sum: number, image: { pull_count: number }) => sum + image.pull_count,
		0
	);

	return { pulls, images: results.length as number };
}

async function profile() {
	const { followers } = await getJson(`https://api.github.com/users/${user}`, { headers });

	return { followers: followers as number };
}

/* one alias per year, since GitHub only totals contributions a year at a time */
function yearlyContributions() {
	const years = Array.from({ length: new Date().getFullYear() - 2007 }, (_, i) => 2008 + i);

	return years
		.map(
			(year) =>
				`y${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") { contributionCalendar { totalContributions } }`
		)
		.join('\n');
}

/* sponsors and contributions are only in the GraphQL API, which needs a token */
async function sponsorsAndContributions() {
	if (!env.GITHUB_TOKEN) throw new Error('no GITHUB_TOKEN');

	const query = `{ user(login: "${user}") {
		sponsors { totalCount }
		sponsorshipsAsMaintainer(activeOnly: false) { totalCount }
		${yearlyContributions()}
	} }`;
	const { data, errors } = await getJson('https://api.github.com/graphql', {
		method: 'POST',
		headers,
		body: JSON.stringify({ query })
	});
	if (!data?.user) throw new Error(errors?.[0]?.message ?? 'no data');

	const { sponsors, sponsorshipsAsMaintainer, ...years } = data.user;
	const contributions = Object.values(years).reduce(
		(sum: number, year) =>
			sum +
			(year as { contributionCalendar: { totalContributions: number } }).contributionCalendar
				.totalContributions,
		0
	);

	return {
		sponsorsNow: sponsors.totalCount,
		sponsorsEver: sponsorshipsAsMaintainer.totalCount,
		contributions
	};
}

async function fetchNumbers(): Promise<Stat[]> {
	const [repos, docker, github, graph] = await Promise.all([
		ownRepos(),
		attempt('Docker Hub pulls', dockerHub),
		attempt('GitHub profile', profile),
		attempt('GitHub sponsors and contributions', sponsorsAndContributions)
	]);
	const stars = repos.reduce((sum, repo) => sum + repo.stars, 0);

	const all: (Stat | false | undefined)[] = [
		repos.length > 0 && {
			value: stars,
			label: 'GitHub stars',
			detail: `across ${repos.length} repos`,
			href: `https://git-star-ranking.com/${user.toLowerCase()}`
		},
		docker && {
			value: docker.pulls,
			label: 'Docker pulls',
			detail: `across ${docker.images} images`,
			href: `https://hub.docker.com/u/${user.toLowerCase()}`
		},
		github && {
			value: github.followers,
			label: 'GitHub followers',
			href: `${profileUrl}?tab=followers`
		},
		graph && {
			value: graph.sponsorsEver,
			label: 'sponsors so far',
			detail: `${graph.sponsorsNow} right now`,
			href: `https://github.com/sponsors/${user}`
		},
		graph && {
			value: graph.contributions,
			label: 'contributions',
			href: `https://gitranks.com/profile/${user.toLowerCase()}/ranks`
		}
	];

	return all.filter((stat): stat is Stat => Boolean(stat));
}

let buildCache: Promise<Stat[]> | undefined;

/* the About and FAQ pages share one fetch per build */
export const numbers = () => (buildCache ??= fetchNumbers());
