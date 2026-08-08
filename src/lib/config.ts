import type { Pathname } from '$app/types';
import type { FooterLink } from './types';

export const site = {
	name: 'Alicia Sykes',
	description: 'Personal site of Alicia Sykes.',
	url: 'https://aliciasykes.com',
	locale: 'en'
};

export const heroLinks: { href: Pathname; label: string }[] = [
	{ href: '/projects', label: 'Projects' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/contact', label: 'Contact' }
];

/* Labels key into socialIcons and socialColors; rel="me" on the links is what Mastodon verifies. */
export const socials = [
	{ label: 'GitHub', href: 'https://github.com/Lissy93' },
	{ label: 'Mastodon', href: 'https://mastodon.social/@Lissy93' },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/AliciaSykes' },
	{ label: 'Dev.to', href: 'https://dev.to/lissy93' }
];

/* Everything I write lands in one of these; where a post shows up twice, the first one listed wins. */
export const feeds = [
	{ source: 'Notes', url: 'https://notes.aliciasykes.com/feed' },
	{ source: 'Dev.to', url: 'https://dev.to/feed/lissy93' }
];

export const forges = [
	{ name: 'GitHub', url: 'https://github.com/Lissy93' },
	{ name: 'Codeberg', url: 'https://codeberg.org/alicia' }
];

export const reasons: {
	value: string;
	label: string;
	hint: string;
	link?: { href: string; label: string };
}[] = [
	{
		value: 'hello',
		label: 'Just saying hello',
		hint: 'Nothing formal needed, just say what’s on your mind :)'
	},
	{
		value: 'security',
		label: 'Security issue',
		hint:
			'You can find specific security contacts in the security.txt for each of my websites, or the security.md in each repo. ' +
			'You can securely report these via GitHub Advisories, or by emailing me at: security at as93 dot net. ' +
			'Please include the app, version, and how to reproduce the issue. I’ll aim to respond within 48 hours. ' +
			'Don’t open a public issue for anything exploitable (without first giving me at least 30 days notice). ' +
			'If you would like to encrypt or sign your message, you can do so with PGP.',
		link: { href: '#keys', label: 'Grab my PGP key' }
	},
	{
		value: 'support',
		label: 'Support (for sponsors)',
		hint: 'Sponsors get support on any of my apps. Let me know which app, what you’re trying to do, and your GitHub username so I can check.',
		link: { href: 'https://github.com/sponsors/Lissy93', label: 'Become a sponsor' }
	},
	{
		value: 'sponsorship',
		label: 'Sponsorship or partnership',
		hint: 'Tell me a bit about your company and what you’ve got in mind, and I’ll send over the options.'
	},
	{
		value: 'bug',
		label: 'Bug report or feature request',
		hint:
			'This form isn’t the best place for bug reports, feature requests or app-specific questions. ' +
			'The app’s GitHub repo is much better, so it can be triaged and handled transparently, ' +
			'instead of just getting buried in my inbox.',
		link: { href: 'https://github.com/Lissy93', label: 'Open an issue' }
	},
	{
		value: 'speaking',
		label: 'Speaking or press',
		hint: 'Let me know the date, the format, and roughly what you’d like me to talk about.'
	}
];

export const contact: {
	emailRot13: string;
	channels: { label: string; handle: string; href?: string }[];
} = {
	emailRot13: 'nyvpvn@bzt.yby',
	channels: [
		{
			label: 'Matrix',
			handle: '@lissy93:matrix.org',
			href: 'https://matrix.to/#/@lissy93:matrix.org'
		},
		{ label: 'XMPP', handle: 'alicia@xmpp.is', href: 'xmpp:alicia@xmpp.is' },
		{ label: 'Signal', handle: 'Trusted contacts only' }
	]
};

export const nav: { href: Pathname; label: string }[] = [
	{ href: '/about', label: 'About' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/contact', label: 'Contact' }
];

export const footer: {
	tagline: string;
	since: number;
	legal: { sourceLink: string; licenseLink: string };
	groups: { title: string; links: FooterLink[] }[];
} = {
	tagline: 'Open source apps for privacy, security and self-hosting.',
	since: 2012,
	legal: {
		sourceLink: 'https://github.com/Lissy93/my-website',
		licenseLink: 'https://github.com/Lissy93/my-website/blob/HEAD/LICENSE'
	},
	groups: [
		{
			title: 'Site',
			links: [
				{ label: 'About', href: '/about' },
				{ label: 'Projects', href: '/projects' },
				{ label: 'Blog', href: '/blog' },
				{ label: 'Contact', href: '/contact' }
			]
		},
		{
			title: 'Elsewhere',
			links: [
				{ label: 'GitHub', href: 'https://github.com/Lissy93' },
				{ label: 'Codeberg', href: 'https://codeberg.org/alicia' },
				{ label: 'Mastodon', href: 'https://mastodon.social/@Lissy93' },
				{ label: 'LinkedIn', href: 'https://linkedin.com/in/AliciaSykes' },
				{ label: 'Dev.to', href: 'https://dev.to/lissy93' }
			]
		},
		{
			title: 'More',
			links: [
				{ label: 'All my apps', href: 'https://as93.net' },
				{ label: 'CV', href: 'https://cv.aliciasykes.com' },
				{ label: 'Sponsor me', href: 'https://github.com/sponsors/Lissy93' },
				{ label: 'RSS feed', href: 'https://notes.aliciasykes.com/feed' },
				{ label: 'PGP key', href: '/pgp.txt' }
			]
		}
	]
};
