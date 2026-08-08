import type { Project } from './types';

export const photo = 'https://pixelflare.cc/alicia/profile-pictures/alicia_sykes-077.jpg';

/* First line carries the section; the rest fill it in. */
export const bio = [
	'I build privacy-respecting apps, then give them away for free. Mostly security, privacy, self-hosting and Linux stuff - but sometimes just a handy little tool to make life a bit easier.',
	'It’s all open source, because the software you rely on should be something you can actually read. By day I’m a software engineer in London, 12 years of it now, across web, mobile, infra and data. By night, mostly more of the same, which probably tells you everything you need to know.'
];

/* Every project lives on GitHub, so the link is just the repo path. */
export const repoUrl = (repo: string) => `https://github.com/${repo}`;

/* Stars, end dates and licenses get refreshed from GitHub at build time - these are the fallbacks. */
export const projects: Project[] = [
	{
		name: 'Web Check',
		blurb: 'The all-in-one OSINT tool for analysing any website',
		repo: 'Lissy93/web-check',
		website: 'https://web-check.xyz',
		lang: 'React',
		license: 'MIT',
		logo: '/logos/web-check.png',
		stars: 34394,
		from: 2023
	},
	{
		name: 'Dashy',
		blurb: 'A self-hostable server dashboard with status checks, widgets, themes and a UI editor',
		repo: 'Lissy93/dashy',
		website: 'https://dashy.to',
		lang: 'Vue',
		license: 'MIT',
		logo: '/logos/dashy.png',
		stars: 26117,
		from: 2019
	},
	{
		name: 'Digital Defense',
		blurb: 'The ultimate security checklist, 300+ tips for protecting your data online',
		repo: 'Lissy93/personal-security-checklist',
		website: 'https://digital-defense.io',
		lang: 'Qwik',
		license: 'CC-BY-4.0',
		logo: '/logos/personal-security-checklist.png',
		stars: 21996,
		from: 2017
	},
	{
		name: 'Awesome Privacy',
		blurb: 'A curated list of apps, services and alternatives that respect your privacy',
		repo: 'Lissy93/awesome-privacy',
		website: 'https://awesome-privacy.xyz',
		lang: 'Astro',
		license: 'CC0-1.0',
		logo: '/logos/awesome-privacy.png',
		stars: 9702,
		from: 2019
	},
	{
		name: 'Domain Locker',
		blurb: 'Domain name portfolio app for monitoring your domains',
		repo: 'Lissy93/domain-locker',
		website: 'https://domain-locker.com',
		lang: 'Angular',
		license: 'MIT',
		logo: '/logos/domain-locker.png',
		stars: 1475,
		from: 2024
	},
	{
		name: 'Pixelflare',
		blurb: 'An edge-powered image CDN that stays entirely under your own control',
		repo: 'Lissy93/pixelflare',
		lang: 'Svelte',
		license: 'MIT',
		logo: '/logos/pixelflare.png',
		stars: 0,
		from: 2025
	}
];

/* Smaller apps, tools and experiments. Same shape, shown as a grid of tiles. */
export const miniProjects: Project[] = [
	{
		name: 'AdGuardian Term',
		blurb: 'Terminal-based, real-time traffic monitoring for your AdGuard Home instance',
		repo: 'Lissy93/AdGuardian-Term',
		website: 'https://adguardian.as93.net',
		lang: 'Rust',
		license: 'MIT',
		logo: '/logos/adguardian.png',
		stars: 1633,
		from: 2022
	},
	{
		name: 'Portainer Templates',
		blurb: '500+ one-click Portainer app templates',
		repo: 'Lissy93/portainer-templates',
		website: 'https://portainer-templates.as93.net',
		lang: 'Python',
		license: 'MIT',
		logo: '/logos/portainer-templates.png',
		stars: 2868,
		from: 2023
	},
	{
		name: 'Bug Bounties',
		blurb: 'A community-maintained directory of 3,000+ active bug bounty programs and VDPs',
		repo: 'Lissy93/bug-bounties',
		website: 'https://bug-bounties.as93.net',
		lang: 'TypeScript',
		license: 'MIT',
		logo: '/logos/bug-bounties.png',
		stars: 375,
		from: 2022
	},
	{
		name: 'Who Dat',
		blurb: 'A thorough domain lookup API, using RDAP and WHOIS for maximum TLD support',
		repo: 'Lissy93/who-dat',
		website: 'https://who-dat.as93.net',
		lang: 'Go',
		license: 'MIT',
		logo: '/logos/who-dat.png',
		stars: 295,
		from: 2024
	},
	{
		name: 'Networking Toolbox',
		blurb: 'The all-in-one collection of 100+ free offline-first tools for sysadmins',
		repo: 'Lissy93/networking-toolbox',
		website: 'https://networkingtoolbox.net',
		lang: 'Svelte',
		license: 'MIT',
		logo: '/logos/networking-toolbox.png',
		stars: 2623,
		from: 2025
	},
	{
		name: 'Framework Benchmarks',
		blurb: 'The same app built in 10 frontend frameworks, benchmarked automatically',
		repo: 'Lissy93/framework-benchmarks',
		website: 'https://framework-benchmarks.as93.net',
		lang: 'Python',
		license: 'MIT',
		logo: '/logos/framework-benchmarks.png',
		stars: 134,
		from: 2025
	},
	{
		name: 'Email Comparison',
		blurb: 'A quick comparison of private and secure email providers',
		repo: 'Lissy93/email-comparison',
		website: 'https://email-comparison.as93.net',
		lang: 'Lit',
		license: 'MIT',
		logo: '/logos/email-comparison.png',
		stars: 180,
		from: 2021
	},
	{
		name: 'Readme Contribs',
		blurb: 'Embeddable contributor and sponsor widgets for your GitHub README',
		repo: 'Lissy93/readme-contribs',
		website: 'https://readme-contribs.as93.net',
		lang: 'Hono',
		license: 'MIT',
		logo: '/logos/readme-contribs.png',
		stars: 33,
		from: 2024
	},
	{
		name: 'Repo Mirror Action',
		blurb: 'Mirror your repos to any other Git host, commits, branches, tags and all',
		repo: 'Lissy93/repo-mirror-action',
		license: 'MIT',
		stars: 17,
		from: 2026
	},
	{
		name: 'Sentiment Sweep',
		blurb: 'Sentiment analysis over real-time social data, rendered as live charts',
		repo: 'Lissy93/twitter-sentiment-visualisation',
		lang: 'CoffeeScript',
		logo: '/logos/sentiment-sweep.png',
		stars: 235,
		from: 2015,
		to: 2020
	},
	{
		name: 'Permissionator',
		blurb: 'A Linux chmod calculator, for generating safe file permissions',
		repo: 'Lissy93/permissionator',
		website: 'https://permissionator.as93.net',
		lang: 'Marko',
		logo: '/logos/permissionator.png',
		stars: 44,
		from: 2025
	},
	{
		name: 'Chief Snack Officer',
		blurb: 'A platform for requesting, voting on and managing office snacks',
		repo: 'Lissy93/cso',
		lang: 'Solid',
		license: 'MIT',
		logo: '/logos/cso.png',
		stars: 22,
		from: 2023,
		to: 2023
	}
];
