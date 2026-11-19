import type { Pathname } from '$app/types';

type Page = { title: string; description: string };

/* what search results say about each page, and what its share card shows */
export const pages = {
	'/projects': {
		title: 'Projects',
		description:
			'Open source apps, tools and experiments by Alicia Sykes, ' +
			'covering security, privacy, self-hosting and web development.'
	},
	'/about': {
		title: 'About',
		description:
			'Alicia Sykes, software engineer in London. ' +
			'Who I am, what I care about, and why it’s all free and open source.'
	},
	'/timeline': {
		title: 'Timeline',
		description:
			'What Alicia Sykes has done by day and built by night: jobs from Accenture to loveholidays, ' +
			'alongside Web Check, Dashy, awards and hackathon prizes.'
	},
	'/faq': {
		title: 'FAQ',
		description:
			'Alicia Sykes on where her project ideas come from, what happened when Web Check took off, ' +
			'the friends open source brought her, and why there’s a dinosaur.'
	},
	'/blog': {
		title: 'Blog',
		description:
			'Notes, guides and write-ups on security, privacy, self-hosting, Linux ' +
			'and web development, by Alicia Sykes.'
	},
	'/contact': {
		title: 'Contact',
		description:
			'Get in touch with Alicia Sykes. Send a message, or reach me over email, ' +
			'Matrix, XMPP or Signal. PGP key included.'
	}
} satisfies Partial<Record<Pathname, Page>>;

export const hasCard = (path: string): path is keyof typeof pages => path in pages;
