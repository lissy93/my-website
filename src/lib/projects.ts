import { forges } from './config';
import type { Featured, Link, Project, ProjectGroup } from './types';

export const repoUrl = (repo: string) => `https://github.com/${repo}`;
export const sourceUrl = (project: Project) => project.source ?? repoUrl(project.repo);

/* named after whichever forge in config hosts it */
export const sourceLink = (project: Project): Link => {
	const href = sourceUrl(project);
	const forge = forges.find(({ url }) => new URL(url).host === new URL(href).host);

	return { label: forge?.name ?? 'Source', href };
};

/* screenshots and logos live in albums on Pixelflare, which resizes them */
export const screenUrl = (id: string, width = 1024) =>
	`https://pixelflare.cc/alicia/project-screens/${id}/w${width}`;
const logoUrl = (id: string) => `https://pixelflare.cc/alicia/logo/${id}/w128`;

/* the big tiles at the top of /projects */
export const featured: Featured[] = [
	{
		name: 'Web Check',
		blurb: 'The all-in-one OSINT tool for analysing any website',
		pitch:
			'Enter any URL to see how the site is built and secured: ' +
			'its SSL, DNS, headers, open ports, tech stack, trackers and much more. ' +
			'Handy for auditing your own sites, or poking at someone else’s.',
		repo: 'Lissy93/web-check',
		website: 'https://web-check.xyz',
		lang: 'React',
		license: 'MIT',
		logo: '/logos/web-check.png',
		from: 2023,
		color: '#9fef00',
		home: 'projects',
		links: [
			{ label: 'Docker', href: 'https://hub.docker.com/r/lissy93/web-check' },
			{ label: 'Codeberg', href: 'https://codeberg.org/alicia/web-check' }
		],
		screens: [
			{
				id: 'web-check-2',
				alt:
					'Results for discord.com, a grid of cards covering ' +
					'location, SSL, DNS, headers and more'
			},
			{ alt: 'Results for github.com, with server location, SSL certificate and domain WHOIS' },
			{ alt: 'Results for reddit.com, with the tech stack and server info cards' }
		]
	},
	{
		name: 'Dashy',
		blurb: 'A self-hostable server dashboard with status checks, widgets, themes and a UI editor',
		pitch:
			'A homepage for your homelab. Every link gets a live status check, ' +
			'widgets pull data in from your self-hosted services, and it’s all ' +
			'configured through a UI editor or one YAML file.',
		repo: 'Lissy93/dashy',
		website: 'https://dashy.to',
		lang: 'Vue',
		license: 'MIT',
		logo: '/logos/dashy.png',
		from: 2019,
		color: '#00efe3',
		home: 'projects',
		links: [
			{ label: 'Docs', href: 'https://dashy.to/docs/' },
			{ label: 'Docker', href: 'https://hub.docker.com/r/lissy93/dashy' },
			{ label: 'Codeberg', href: 'https://codeberg.org/alicia/dashy' }
		],
		screens: [
			{ alt: 'A networking dashboard in the default theme, with a status dot on every service' },
			{
				id: 'dashy-widgets',
				alt: 'Widgets for code stats, uptime monitoring and a live CVE feed'
			},
			{ alt: 'The same dashboard in a light pastel theme' },
			{
				id: 'cloud-backup',
				alt: 'Cloud backup and restore, with the config encrypted by your password'
			},
			{
				id: 'launch',
				alt: 'Opening an app in the current tab, a new tab, a pop-up or the workspace view'
			}
		]
	},
	{
		name: 'Digital Defense',
		blurb: 'The ultimate security checklist, 300+ tips for protecting your data online',
		pitch:
			'Practical tips for securing your digital life, from passwords and ' +
			'browsers to physical security. Filter by your threat model, tick things ' +
			'off, and watch your progress chart fill up.',
		repo: 'Lissy93/personal-security-checklist',
		website: 'https://digital-defense.io',
		lang: 'Qwik',
		license: 'CC-BY-4.0',
		logo: '/logos/personal-security-checklist.png',
		from: 2017,
		color: '#a78bfa',
		home: 'projects',
		links: [{ label: 'Codeberg', href: 'https://codeberg.org/alicia/personal-security-checklist' }],
		screens: [
			{
				id: 'personal-security-checklist',
				alt: 'The homepage, with your progress across every checklist'
			},
			{ alt: 'The authentication checklist, with each tip marked essential, optional or advanced' }
		]
	},
	{
		name: 'Awesome Privacy',
		blurb: 'A curated list of apps, services and alternatives that respect your privacy',
		pitch:
			'Privacy-respecting alternatives to popular apps and services, sorted into ' +
			'categories. Each listing pulls live data from the project’s website, repo and ' +
			'privacy policy, so you can compare them properly.',
		repo: 'Lissy93/awesome-privacy',
		website: 'https://awesome-privacy.xyz',
		lang: 'Astro',
		license: 'CC0-1.0',
		logo: '/logos/awesome-privacy.png',
		from: 2019,
		color: '#5f53f4',
		home: 'projects',
		links: [{ label: 'Codeberg', href: 'https://codeberg.org/alicia/awesome-privacy' }],
		screens: [
			{
				id: 'awesome-privacyxyz_home',
				alt: 'The homepage, with a search box above the categories, from essentials to smart home'
			},
			{
				id: 'awesome-privacyxyz_browse',
				alt:
					'Browsing every listing, starting with password managers, ' +
					'with the categories in a sidebar'
			},
			{
				id: 'awesome-privacyxyz_listings',
				alt:
					'The 2-factor authentication apps, each with its stars, ' +
					'licence and a link to its report'
			},
			{
				id: 'awesome-privacyxyz_listing',
				alt:
					'The Bitwarden listing, with its links, apps to avoid or ' +
					'consider instead, and its privacy policy grade'
			},
			{
				id: 'awesome-privacyxyz_search',
				alt: 'Searching for password managers, with matches appearing as you type'
			},
			{
				id: 'awesome-privacyxyz_changelog',
				alt:
					'The changelog, showing every addition and rejected ' +
					'submission alongside its pull request'
			},
			{
				id: 'awesome-privacyxyz_about',
				alt: 'The about page, setting out the privacy and security rules every listing has to meet'
			}
		]
	},
	{
		name: 'Networking Toolbox',
		blurb: 'The all-in-one collection of 100+ free offline-first tools for sysadmins',
		pitch:
			'Over 100 networking tools in one place, from subnet and CIDR calculators to DNS, TLS and ' +
			'email checks. It works offline, and it’s easy to self-host with Docker.',
		repo: 'Lissy93/networking-toolbox',
		website: 'https://networkingtoolbox.net',
		lang: 'Svelte',
		license: 'MIT',
		logo: '/logos/networking-toolbox.png',
		from: 2025,
		color: '#e3ed70',
		home: 'mini',
		links: [
			{ label: 'Docker', href: 'https://hub.docker.com/r/lissy93/networking-toolbox' },
			{ label: 'Codeberg', href: 'https://codeberg.org/alicia/networking-toolbox' }
		],
		screens: [
			{
				id: 'networking-toolbox-3',
				alt: 'The homepage, with DNS, TLS and email tools'
			},
			{ alt: 'The same page in light and dark mode' },
			{ alt: 'The mobile layout' }
		]
	},
	{
		name: 'AdGuardian Term',
		blurb: 'Terminal-based, real-time traffic monitoring for your AdGuard Home instance',
		pitch:
			'Watch every DNS query on your network as it happens, from your ' +
			'terminal. See what’s being blocked, your busiest domains and clients, ' +
			'and which filter lists are doing the work.',
		repo: 'Lissy93/AdGuardian-Term',
		website: 'https://adguardian.as93.net',
		lang: 'Rust',
		license: 'MIT',
		logo: '/logos/adguardian.png',
		from: 2022,
		color: '#17d569',
		home: 'mini',
		links: [
			{ label: 'Docker', href: 'https://hub.docker.com/r/lissy93/adguardian' },
			{ label: 'Crates.io', href: 'https://crates.io/crates/adguardian' },
			{ label: 'Codeberg', href: 'https://codeberg.org/alicia/adguardian' }
		],
		screens: [
			{
				id: 'adguardian-demo',
				alt: 'The live dashboard, with the query log, block rate, top domains and filter lists'
			},
			{ alt: 'AdGuardian running in a browser window' },
			{ alt: 'AdGuardian on a small screen, as an always-on network monitor' }
		]
	},
	{
		name: 'Domain Locker',
		blurb: 'Domain name portfolio app for monitoring your domains',
		pitch:
			'Keep track of every domain you own. It pulls in registrar, DNS, SSL, host and subdomain ' +
			'data, watches for changes, and warns you before anything expires.',
		repo: 'Lissy93/domain-locker',
		website: 'https://domain-locker.com',
		lang: 'Angular',
		license: 'MIT',
		logo: '/logos/domain-locker.png',
		from: 2024,
		color: '#9571ff',
		home: 'projects',
		links: [
			{ label: 'Docker', href: 'https://hub.docker.com/r/lissy93/domain-locker' },
			{ label: 'Codeberg', href: 'https://codeberg.org/alicia/domain-locker' }
		],
		screens: [
			{
				id: 'domain-locker-homepage',
				alt: 'The domain grid, with the registrar and expiry of each domain'
			},
			{
				id: 'domain-locker-li-example',
				alt: 'The page for vaduz.li, with its registrar, DNS, SSL, host and subdomains'
			},
			{ alt: 'The dashboard, with upcoming expirations, providers and host locations' },
			{ alt: 'A registration timeline for every domain' },
			{ alt: 'Uptime and response times for each domain' }
		]
	},
	{
		name: 'Pixelflare',
		blurb: 'An edge-powered image CDN that stays entirely under your own control',
		pitch:
			'Deploy it to your own Cloudflare account, or use the hosted version. ' +
			'Images never expire, get resized and converted on the fly, and come with per-image stats.',
		repo: 'Lissy93/pixelflare',
		website: 'https://pixelflare.cc',
		lang: 'Svelte',
		license: 'MIT',
		logo: '/logos/pixelflare.png',
		from: 2025,
		color: '#3b82f6',
		home: 'projects',
		links: [
			{ label: 'Docs', href: 'https://pixelflare.cc/docs/' },
			{ label: 'API', href: 'https://pixelflare.cc/api/v1/docs' },
			{ label: 'Codeberg', href: 'https://codeberg.org/alicia/pixelflare' }
		],
		screens: [
			{ alt: 'Your image library in the Pixelflare dashboard' },
			{ alt: 'Stats and transformations for a single image' }
		]
	}
];

/* the compact lists under the featured tiles, one card each */
export const groups: ProjectGroup[] = [
	{
		title: 'More Projects',
		projects: [
			{
				name: 'Portainer Templates',
				blurb: '500+ one-click Portainer app templates',
				repo: 'Lissy93/portainer-templates',
				website: 'https://portainer-templates.as93.net',
				lang: 'Python',
				license: 'MIT',
				logo: '/logos/portainer-templates.png',
				from: 2023,
				home: 'mini'
			},
			{
				name: 'Bug Bounties',
				blurb: 'A community-maintained directory of 3,000+ active bug bounty programs and VDPs',
				repo: 'Lissy93/bug-bounties',
				website: 'https://bug-bounties.as93.net',
				lang: 'TypeScript',
				license: 'MIT',
				logo: '/logos/bug-bounties.png',
				from: 2022,
				home: 'mini'
			},
			{
				name: 'Who Dat',
				blurb: 'A thorough domain lookup API, using RDAP and WHOIS for maximum TLD support',
				repo: 'Lissy93/who-dat',
				website: 'https://who-dat.as93.net',
				lang: 'Go',
				license: 'MIT',
				logo: '/logos/who-dat.png',
				from: 2024,
				home: 'mini'
			},
			{
				name: 'Framework Benchmarks',
				blurb: 'The same app built in 10 frontend frameworks, benchmarked automatically',
				repo: 'Lissy93/framework-benchmarks',
				website: 'https://framework-benchmarks.as93.net',
				lang: 'Python',
				license: 'MIT',
				logo: '/logos/framework-benchmarks.png',
				from: 2025,
				home: 'mini'
			},
			{
				name: 'Email Comparison',
				blurb: 'A quick comparison of private and secure email providers',
				repo: 'Lissy93/email-comparison',
				website: 'https://email-comparison.as93.net',
				lang: 'Lit',
				license: 'MIT',
				logo: '/logos/email-comparison.png',
				from: 2021,
				home: 'mini'
			},
			{
				name: 'Readme Contribs',
				blurb: 'Embeddable contributor and sponsor widgets for your GitHub README',
				repo: 'Lissy93/readme-contribs',
				website: 'https://readme-contribs.as93.net',
				lang: 'Hono',
				license: 'MIT',
				logo: '/logos/readme-contribs.png',
				from: 2024,
				home: 'mini'
			},
			{
				name: 'Repo Mirror Action',
				blurb: 'Mirror your repos to any other Git host, commits, branches, tags and all',
				repo: 'Lissy93/repo-mirror-action',
				lang: 'GitHub Actions',
				license: 'MIT',
				from: 2026
			},
			{
				name: 'Permissionator',
				blurb: 'A Linux chmod calculator, for generating safe file permissions',
				repo: 'Lissy93/permissionator',
				website: 'https://permissionator.as93.net',
				lang: 'Marko',
				logo: '/logos/permissionator.png',
				from: 2025
			},
			{
				name: 'Chief Snack Officer',
				blurb: 'A platform for requesting, voting on and managing office snacks',
				repo: 'Lissy93/cso',
				lang: 'Solid',
				license: 'MIT',
				logo: '/logos/cso.png',
				from: 2023,
				to: 2023
			},
			{
				name: 'Stack Match',
				blurb: 'Find the right frontend framework, based on what matters most for your project',
				repo: 'Lissy93/stack-match',
				website: 'https://stack-match.as93.net',
				logo: logoUrl('stack-match'),
				from: 2025
			},
			{
				name: 'Raid Calculator',
				blurb: 'Compare the capacity, speed and fault tolerance of different RAID setups',
				repo: 'Lissy93/raid-calculator',
				website: 'https://raid-calculator.as93.net',
				logo: logoUrl('raid-caclularor'),
				from: 2024
			},
			{
				name: 'GitHub Dashboards',
				blurb: 'Stats, charts, history and task lists for any GitHub user, org or repo',
				repo: 'Lissy93/github-dashboards',
				website: 'https://github-dashboards.as93.net',
				logo: logoUrl('goard'),
				from: 2026,
				home: 'mini'
			},
			{
				name: 'Web Crypt',
				blurb: 'Encrypt and decrypt messages and files with PGP or age, entirely offline',
				repo: 'Lissy93/web-crypt',
				website: 'https://web-crypt.as93.net',
				logo: logoUrl('web-crypt'),
				from: 2022,
				home: 'mini'
			},
			{
				name: 'APOD API',
				blurb: 'A free, no-auth, CORS-enabled API for NASA’s Astronomy Picture of the Day',
				repo: 'Lissy93/astronomy-picture-of-the-day',
				website: 'https://apod.as93.net',
				logo: logoUrl('apod'),
				from: 2022
			},
			{
				name: 'CV',
				blurb: 'My CV, written in YAML and auto-built into a LaTeX PDF and a website',
				repo: 'Lissy93/cv',
				logo: logoUrl('cv')
			}
		]
	},
	{
		title: 'Older projects',
		projects: [
			{
				name: 'Sentiment Sweep',
				blurb: 'Sentiment analysis over real-time social data, rendered as live charts',
				repo: 'Lissy93/twitter-sentiment-visualisation',
				lang: 'CoffeeScript',
				logo: '/logos/sentiment-sweep.png',
				from: 2014,
				to: 2019,
				home: 'mini'
			},
			{
				name: 'Anti Theft Charge',
				blurb: 'Charge your phone in public, without worrying about it being stolen',
				repo: 'Lissy93/anti-theft-charge',
				logo: logoUrl('anti-theft-charge'),
				from: 2014
			},
			{
				name: 'Hasami Shogi',
				blurb: 'A 2-player iOS game, based on the traditional Japanese board game',
				repo: 'Lissy93/hasami-shogi',
				logo: logoUrl('hasami-shogi'),
				from: 2015,
				to: 2015
			},
			{
				name: 'Pax',
				blurb: 'A script that removes flashes from a video stream',
				repo: 'Lissy93/pax',
				from: 2019,
				to: 2019
			},
			{
				name: 'Sentiment Analysis',
				blurb: 'A Node.js sentiment analysis module, based on AFINN-111',
				repo: 'Lissy93/sentiment-analysis',
				from: 2015
			},
			{
				name: 'User Monkey',
				blurb: 'A complete user system, written in PHP',
				repo: 'Lissy93/usermonkey',
				logo: logoUrl('user-monkey'),
				from: 2013,
				to: 2016
			},
			{
				name: 'Happy App',
				blurb: 'Frictionless, anonymous feedback for agile teams',
				repo: 'Lissy93/happy-app',
				logo: logoUrl('happy-app'),
				from: 2017
			},
			{
				name: 'Revision Quizzes',
				blurb: 'A site for creating, taking and sharing revision quizzes',
				repo: 'Lissy93/revision-quizzes',
				from: 2009,
				to: 2014
			},
			{
				name: 'Study Time',
				blurb: 'An Android app for cutting out distractions while you study',
				repo: 'Lissy93/Study-Time',
				logo: logoUrl('study-time'),
				from: 2014,
				to: 2014
			},
			{
				name: 'Minesweeper',
				blurb: 'A remake of classic Minesweeper for Android',
				repo: 'Lissy93/minesweper',
				logo: logoUrl('minesweeper'),
				from: 2014,
				to: 2014
			},
			{
				name: 'AdGuardian Term v1',
				blurb: 'The original Go version of AdGuardian, before the Rust rewrite',
				repo: 'Lissy93/OLD_AdGuardian-Term',
				logo: logoUrl('adguardian-go'),
				from: 2023,
				to: 2023
			}
		]
	},
	{
		title: 'Dotfiles and configs',
		projects: [
			{
				name: 'Dotfiles',
				blurb: 'My personal dotfiles, with the scripts and configs I set up every machine with',
				repo: 'Lissy93/dotfiles',
				logo: logoUrl('dotfiles'),
				from: 2021,
				home: 'mini'
			},
			{
				name: 'Brewfile',
				blurb: 'The packages I install on macOS with Homebrew, plus a script to set it all up',
				repo: 'Lissy93/Brewfile',
				website: 'https://brewfile.as93.net',
				logo: 'https://pixelflare.cc/alicia/images/brewfile/w128',
				from: 2022
			},
			{
				name: 'Espanso Config',
				blurb: 'My config for the Espanso text expander',
				repo: 'Lissy93/espanso-config',
				logo: logoUrl('espanso'),
				from: 2021
			},
			{
				name: 'Minimal Terminal Prompt',
				blurb: 'A clean bash prompt, showing user, host, path and git status',
				repo: 'Lissy93/minimal-terminal-prompt',
				logo: logoUrl('minimal-terminal-prompt'),
				from: 2017,
				to: 2020
			},
			{
				name: 'Ansibles',
				blurb: 'The Ansible playbooks and roles that set up and manage all my servers',
				repo: 'Lissy93/ansibles',
				logo: logoUrl('ansibles'),
				from: 2025
			},
			{
				name: 'Conky Stats Widget',
				blurb: 'A minimal Conky config, showing live system resource usage on Linux',
				repo: 'Lissy93/conky-system-stats-widget',
				from: 2018
			}
		]
	}
];

export const allProjects = () => [...featured, ...groups.flatMap((group) => group.projects)];

export const onHome = (spot: NonNullable<Project['home']>) =>
	allProjects().filter((project) => project.home === spot);
