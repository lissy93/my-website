import { feeds } from '$lib/config';
import type { Post } from '$lib/types';

const week = 7 * 24 * 60 * 60 * 1000;
const named: Record<string, string> = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
	nbsp: ' '
};

const decode = (xml: string) =>
	xml
		.replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(+dec))
		.replace(/&#x([\da-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
		.replace(/&(\w+);/g, (match, name) => named[name] ?? match);

const tag = (item: string, name: string) =>
	decode(item.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`))?.[1] ?? '').trim();

const flatten = (part: string) =>
	decode(part.replace(/<[^>]+>/g, ' '))
		.replace(/\s+([,.;:!?])/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();

/* Feeds hand over whole articles, so the standfirst is the first real paragraph, trimmed to fit. */
function summarise(html: string, max = 150) {
	const blocks = html
		.replace(/<(?:style|script)[\s\S]*?<\/(?:style|script)>|<h[1-6][\s\S]*?<\/h[1-6]>/gi, '')
		.split(/<br[^>]*>|<\/p>/i)
		.map(flatten)
		.filter((block) => !/\S{40,}/.test(block));

	const text = blocks.find((block) => block.length > 60) ?? blocks.join(' ').trim();
	if (text.length <= max) return text;

	/* A whole sentence beats a stump, but only once there's enough of one to be worth reading. */
	const opening = text.slice(0, max + 1);
	const sentence = [...opening.matchAll(/[.!?](?=\s)/g)].at(-1)?.index ?? -1;
	if (sentence > max * 0.4) return opening.slice(0, sentence + 1);

	const word = opening.lastIndexOf(' ');
	return `${opening.slice(0, word > 0 ? word : max).replace(/[,;:.]$/, '')}…`;
}

const words = (title: string) =>
	new Set(
		title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, ' ')
			.split(' ')
			.filter((word) => word.length > 2)
	);

const overlap = (a: Set<string>, b: Set<string>) => {
	const shared = [...a].filter((word) => b.has(word)).length;
	return shared / (a.size + b.size - shared) || 0;
};

/* Cross-posts get retitled, so two posts from the same week count as one if the titles mostly agree. */
const isSame = (a: Post, b: Post) =>
	overlap(words(a.title), words(b.title)) >=
	(Math.abs(Date.parse(a.date) - Date.parse(b.date)) < week ? 0.3 : 1);

/* A feed that's slow, moved or malformed comes back empty rather than taking the build down. */
async function readFeed({ source, url }: (typeof feeds)[number]): Promise<Post[]> {
	try {
		const res = await fetch(url, {
			headers: { accept: 'application/rss+xml, application/xml', 'user-agent': 'aliciasykes.com' },
			signal: AbortSignal.timeout(8000)
		});
		if (!res.ok) return [];

		return (await res.text())
			.split(/<item[\s>]/)
			.slice(1)
			.flatMap((item) => {
				const [title, link, date] = [tag(item, 'title'), tag(item, 'link'), tag(item, 'pubDate')];
				const published = new Date(date);
				if (!title || !link.startsWith('http') || Number.isNaN(+published)) return [];

				return {
					title,
					url: link,
					date: published.toISOString().slice(0, 10),
					blurb: summarise(tag(item, 'description')),
					source
				};
			});
	} catch {
		return [];
	}
}

/* Newest first, and where a post appears twice the earlier feed in the config wins. */
async function merge(): Promise<Post[]> {
	const found = (await Promise.all(feeds.map(readFeed))).flat();

	return found
		.filter((post, i) => !found.slice(0, i).some((seen) => isSame(seen, post)))
		.sort((a, b) => b.date.localeCompare(a.date));
}

let buildCache: Promise<Post[]> | undefined;

export const allPosts = () => (buildCache ??= merge());
