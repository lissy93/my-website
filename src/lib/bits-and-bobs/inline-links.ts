import type { Link } from '$lib/types';

const markdownLink = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/* splits "see [this](https://…)" into its plain text and links */
export function pieces(text: string) {
	const parts: (string | Link)[] = [];
	let from = 0;
	for (const match of text.matchAll(markdownLink)) {
		parts.push(text.slice(from, match.index), { label: match[1], href: match[2] });
		from = match.index + match[0].length;
	}
	parts.push(text.slice(from));
	return parts.filter((part) => part !== '');
}

export const unlinked = (text: string) => text.replace(markdownLink, '$1');
