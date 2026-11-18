import type { Honour, Job, Moment } from '$lib/types';

const icon = (name: string) => `https://pixelflare.cc/alicia/icons/${name}/w128`;

export const portrait = {
	src: 'https://pixelflare.cc/alicia/profile-pictures/alicia_sykes-110.jpg',
	alt: 'Alicia in a navy jumper dotted with little hearts and letters',
	width: 603,
	height: 906
};

/* the first one is the lead, and a [Project name] links to its GitHub */
export const intro = [
	'I’ve been fascinated by how computers work since I first used one. Twenty years later, I’m still not over it.',
	'What I enjoy most is building things people actually use. Mostly that’s free tools for privacy, security and self-hosting, plus the odd game. Every project started off as a problem of my own that nothing else quite fixed.',
	'A few of them took off. [Web Check] gets 100,000 visitors daily, [Dashy] has been installed on millions of devices, and [Digital Defense] has over 20k stars on GitHub. But it’s not the numbers I care about. It’s when something finally fixes the problem it was built for, and turns out to help other people too.'
];

export const lanes = {
	day: 'I wear many hats: architect, engineer, mentor, product-thinker and occasional DevRel. Above all, I love building great things with kind, curious people.',
	night:
		'But what I really love, is the world of open source. I’ve published 100+ production grade tools/applications, and have contributed to many, many more.'
};

/* newest start first, each one starts a row, and whatever happened by night meanwhile sits beside it */
export const jobs: Job[] = [
	{
		org: 'loveholidays',
		role: 'Staff Software Engineer',
		from: '2024-11',
		to: '2025-12',
		logo: icon('loveholidays'),
		highlights: [
			'Spearheaded accessibility strategy ahead of European Accessibility Act, building site-wide scanning and reporting platform, and then coordinating remediation across 6 teams.',
			'Strengthened infrastructure and reliability through Kubernetes/Terraform and vendor collaboration (Fastly, DataDome).',
			'Served as learning champion, establishing resources, learning pathways and fostering continuous upskilling and mentorship across the engineering department.'
		]
	},
	{
		org: 'AND Digital',
		role: 'Principal Engineer',
		from: '2022-08',
		to: '2024-10',
		logo: icon('and-digital'),
		highlights: [
			'Led architecture and development for a high-scale white-labelled mobile app for Frasers Group, achieving 1M+ downloads and a 4.8/5 rating on app stores (React Native).',
			'Delivered strategic technical leadership across multiple client projects including Lloyds Bank and International SOS, driving large-scale migrations to modern, maintainable stacks.',
			'Mentored and upskilled a team of 8–12 engineers through structured mini-projects, paired programming, and technical coaching, fostering a high-growth culture.',
			'Established and hosted a bi-weekly engineering guild attended by 40+ engineers, sharing best practices in performance, accessibility, testing, and architecture.'
		]
	},
	{
		org: 'Galaxy',
		role: 'VP of Frontend Engineering',
		from: '2020-06',
		to: '2022-05',
		logo: 'https://i.ibb.co/fX2rF84/galaxy-digital.png',
		tile: '#111111',
		highlights: [
			'Directed frontend engineering for Galaxy’s flagship OTC trading platform, enabling over $1B in trading volume with enterprise-grade performance and reliability.',
			'Architected and led a full-stack modernization of legacy codebases, improving app load times by 50% and significantly reducing tech debt.',
			'Oversaw and scaled frontend engineering strategy, standards, and execution across multiple teams, including hiring, mentoring, and tech governance.'
		]
	},
	{
		org: 'Freelance',
		role: 'Contract Software Engineer Lead',
		from: '2018-01',
		to: '2020-06',
		highlights: [
			'Acted as engineering lead on high-impact React Native projects including Shell Recharge, driving delivery from design to deployment across platforms.',
			'Built a performant, scalable component library from scratch for a UK fintech startup, establishing strong frontend architecture and design consistency.',
			'Delivered a full-stack IoT dashboard for Machine Max, visualizing real-time CO2 and idling metrics from edge devices (Raspberry Pi + cloud stack).'
		]
	},
	{
		org: 'Accenture',
		role: 'Developer',
		from: '2014-05',
		to: '2019-01',
		logo: icon('accenture'),
		highlights: [
			'Took lead on the 3D/AR work for the B&Q bathroom planner (Angular, A-Frame)',
			'Led a team of apprentices on the Accenture UKI Innovation Programme (Google Glass, React, D3.js)',
			'Headed up the pair programming initiative within Accenture Digital and their clients',
			'Also supported with the roll-out of Universal Credit (Java), Boots NHS Prescriptions integration (Node.js), E.ON Next Smart Meter portal (React) and the Post Office Kiosk Terminal'
		]
	},
	{
		org: 'University of Oxford',
		role: 'Intern',
		from: '2013-06',
		to: '2013-09',
		logo: icon('university-of-oxford'),
		highlights: [
			'Worked on developing a Java application which would calculate the most effective mg of antimalarial drug, per kg of patient body weight, to prevent vaccine resistance building up.',
			'Involved dealing with millions of patient records, which were often in varying formats and units.'
		]
	},
	{
		org: 'Oxford Brookes',
		role: 'BSc Computer Science',
		from: '2012',
		to: '2016',
		highlights: [
			'1st Class Honours',
			'Winner of Best Final Year Project Prize',
			'President of Computing Society'
		]
	}
];

/* the year at the very end of the timeline's line, with no entry of its own */
export const endOfLine = 1993;

/* weekends rather than days or nights, so it gets the last row, beside anything older than every job */
export const reserves = {
	org: 'British Army',
	from: '2012',
	to: '2022',
	/* the first is shown, and the rest are counted */
	units: ['Intelligence Corps', 'Royal Corps of Signals', 'Oxford University OTC'],
	description:
		'I served in the Army Reserves. My expertise lies in signals, intelligence and comms. In the Oxford University OTC, I also learnt leadership skills and earned a Level 3 Certificate in Leadership and Management.',
	logo: icon('british-army')
};

const hackathons = 'https://cv.aliciasykes.com/achievements';

/* in any order, they're sorted by date (and ones in the same year keep this order)
   every featured project in projects.ts is here already, so only list other launches, or a featured one with a note */
export const moments: Moment[] = [
	{ kind: 'launch', repo: 'Lissy93/github-dashboards' },
	{
		kind: 'press',
		when: '2026-11',
		title: 'Web Check in MakeUseOf',
		href: 'https://www.makeuseof.com/web-check-puts-a-websites-public-clues-on-one-open-source-dashboard/',
		note: '“Web-Check puts a website’s public clues on one open-source dashboard”'
	},
	{
		kind: 'award',
		when: '2025',
		title: 'OpenUK Honours, again',
		href: 'https://openuk.uk/community/openuk-honours-lists/2025-honours-lists/'
	},
	{ kind: 'launch', repo: 'Lissy93/framework-benchmarks' },
	{
		kind: 'award',
		when: '2024',
		title: 'OpenUK Honours',
		href: 'https://openuk.uk/2024-honours-list/'
	},
	{
		kind: 'trending',
		when: '2024-06',
		title: 'Web Check on the Hacker News front page',
		href: 'https://news.ycombinator.com/item?id=40757951',
		note: '411 points, from a Show HN'
	},
	{
		kind: 'award',
		when: '2024-05',
		title: 'GitHub Accelerator, for Web Check',
		href: 'https://github.blog/2024-05-23-2024-github-accelerator-meet-the-11-projects-shaping-open-source-ai/'
	},
	{
		kind: 'milestone',
		when: '2024-02',
		title: 'Web Check passed 10,000 GitHub stars',
		href: 'https://www.star-history.com/#Lissy93/web-check&Date',
		note: 'Eight months after it launched'
	},
	{
		kind: 'press',
		when: '2024-02',
		title: 'Web Check in Help Net Security',
		href: 'https://www.helpnetsecurity.com/2024/02/26/web-check-website-open-source-intelligence/',
		note: '“Web Check: Open-source intelligence for any website”'
	},
	{ kind: 'launch', repo: 'Lissy93/who-dat' },
	{ kind: 'launch', repo: 'Lissy93/readme-contribs' },
	{
		kind: 'press',
		when: '2023-09',
		title: 'Interviewed in Console #174',
		href: 'https://console.substack.com/p/console-174'
	},
	{ kind: 'launch', repo: 'Lissy93/web-check', note: '100,000 visitors in its first two weeks' },
	{ kind: 'launch', repo: 'Lissy93/portainer-templates' },
	{
		kind: 'press',
		when: '2022-06',
		title: 'Dashy in Changelog News',
		href: 'https://changelog.com/news/Rd61',
		note: '“Dashy is a self-hosted dashboard for your homelab”'
	},
	{
		kind: 'trending',
		when: '2022-06',
		title: 'Dashy on the Hacker News front page',
		href: 'https://news.ycombinator.com/item?id=31636036',
		note: '354 points, and about 2,000 new stars that week'
	},
	{
		kind: 'press',
		when: '2022-04',
		title: 'Dashy in Linux Journal',
		href: 'https://www.linuxjournal.com/content/self-hosted-static-homepages-dashy-vs-homer',
		note: '“Self-Hosted Static Homepages: Dashy Vs. Homer”'
	},
	{
		kind: 'trending',
		when: '2022-04',
		title: 'Digital Defense on the Hacker News front page',
		href: 'https://news.ycombinator.com/item?id=30902426',
		note: '253 points, back when it was the Personal Security Checklist'
	},
	{ kind: 'launch', repo: 'Lissy93/bug-bounties' },
	{ kind: 'launch', repo: 'Lissy93/web-crypt' },
	{ kind: 'launch', repo: 'Lissy93/email-comparison' },
	{
		kind: 'win',
		when: '2019',
		title: 'Infra-hack: 1st, plus the Network Rail and TfL prizes',
		href: hackathons,
		note: 'Used computer vision to identify incidents and determine station status, in real time.'
	},
	{
		kind: 'win',
		when: '2019',
		title: 'StartHack Switzerland: 1st overall, again',
		href: hackathons,
		note: 'Created Pax, to identify and remove flashes from video footage for photosensitive viewers.'
	},
	{
		kind: 'win',
		when: '2018',
		title: 'Junction Helsinki: KONE’s Intelligent Buildings award',
		href: hackathons,
		note: 'Built Elevate-to-Awesome, an IoT app to track and gamify taking the stairs.'
	},
	{
		kind: 'win',
		when: '2018',
		title: 'StartHack Switzerland: Swisscom’s blockchain award',
		href: hackathons,
		note: 'Created UNwasted, a social food dapp to reduce waste, on the Ethereum network.'
	},
	{ kind: 'launch', repo: 'Lissy93/happy-app' },
	{
		kind: 'win',
		when: '2016',
		title: 'StartHack Switzerland: 1st overall',
		href: hackathons,
		note: 'Developed a system for real-time sentiment analysis of geographic social media data.'
	},
	{
		kind: 'award',
		when: '2016-06',
		title: 'BCS Oxford, best Computer Science project',
		href: 'https://oxon.bcs.org/2016/06/27/annual-student-prizes-2016/'
	},
	{
		kind: 'win',
		when: '2015',
		title: 'HealthHack London: 1st, as a team',
		href: hackathons,
		note: 'Built a smartwatch app for gamifying health tracking.'
	},
	{
		kind: 'win',
		when: '2015',
		title: 'AngelHack London: 2nd, plus the HP sponsor prize',
		href: hackathons,
		note: 'Created SmartDepart, an alarm to wake you up earlier if there are delays on your commute.'
	},
	{
		kind: 'win',
		when: '2015',
		title: 'NBC Universal Comcast hackathon: 2nd',
		href: hackathons,
		note: 'Created an intelligent movie recommendation engine, implemented as a Twitter bot.'
	},
	{ kind: 'launch', repo: 'Lissy93/hasami-shogi' },
	{
		kind: 'win',
		when: '2014',
		title: 'AngelHack London: 2nd',
		href: hackathons,
		note: 'Created Anti-Theft Charge, an Android app that prevents theft while your device is charging.'
	},
	{
		kind: 'win',
		when: '2014',
		title: 'DevLab Live London: 2nd, plus the Intelligent Headset prize',
		href: hackathons,
		note: 'Made CityExplorer, an interactive tour guide using accelerometers to determine line of sight.'
	},
	{ kind: 'launch', repo: 'Lissy93/anti-theft-charge' },
	{ kind: 'launch', repo: 'Lissy93/twitter-sentiment-visualisation' },
	{ kind: 'launch', repo: 'Lissy93/minesweper' },
	{ kind: 'launch', repo: 'Lissy93/usermonkey' },
	{ kind: 'milestone', when: '2012-06', title: 'Joined GitHub, as Lissy93' },
	{
		kind: 'milestone',
		when: '2011-10',
		title: 'Joined Stack Overflow',
		href: 'https://stackoverflow.com/users/lissy93'
	},
	{ kind: 'launch', repo: 'Lissy93/revision-quizzes' },
	{ kind: 'milestone', when: '2005', title: 'Wrote my first line of code (ActionScript)' }
];

/* hand-picked from the moments above, so add a new one here too if it belongs */
export const honours: Honour[] = [
	{
		title: 'OpenUK Honours',
		detail: 'The UK’s yearly honours list for open source',
		years: '2024, 2025',
		href: 'https://openuk.uk/community/openuk-honours-lists/2024-honours-list/'
	},
	{
		title: 'GitHub Accelerator',
		detail: 'Web Check, one of 11 projects picked that year',
		years: '2024',
		href: 'https://github.blog/news-insights/company-news/2024-github-accelerator-meet-the-11-projects-shaping-open-source-ai/#web-check-bringing-security-to-the-web'
	},
	{
		title: 'Hacker News front page',
		detail: 'Web Check, Dashy and Digital Defense',
		years: '2022–2024',
		href: 'https://hn.algolia.com/?dateRange=all&page=0&prefix=false&query=lissy93&sort=byPopularity&type=story'
	},
	{
		title: 'In the press',
		detail: 'Linux Journal, Help Net Security, MakeUseOf and Changelog',
		years: '2022–2026',
		href: '/timeline'
	},
	{
		title: 'Top 100 on GitHub',
		detail: 'Ranked by stars, out of over 150 million developers',
		years: '2026',
		href: 'https://git-star-ranking.com/lissy93'
	},
	{
		title: '10 hackathon wins',
		detail: 'Including first overall at StartHack Switzerland, twice',
		years: '2014–2019',
		href: 'https://notes.aliciasykes.com/p/0s5s3uOtKj'
	}
];

export const values = [
	{
		title: 'Your data is yours',
		text: 'Nothing I make shows ads or tracks you, and the code is always free to run yourself. GitHub Sponsors just about covers the servers, and it’s my sponsors who keep it free for everyone else.'
	},
	{
		title: 'Software you can read',
		text: 'Everything is open source, so you can check what it does, change it, or host it yourself. I lean on maintainers who build the foundations and rarely get thanked, so I try to give back where I can.'
	},
	{
		title: 'Built for everyone',
		text: 'If someone can’t use it, it isn’t finished. I try to build with screen readers, keyboards and slow connections in mind, and Pax, one of my hackathon projects, strips flashes from video for photosensitive viewers.'
	},
	{
		title: 'It should be fun',
		text: 'If you’re not having fun, you’re doing it wrong! I’ve made games, toys and plenty of things nobody asked for, and I’d make every one of them again.'
	}
];

export const offTheClock =
	'Away from computers, I love astronomy and sport. I spent ten years in the Army Reserves, in signals and intelligence. I go to church, I like chilling at the pub with friends, and if you’re in London, you’ve probably bumped into me at a tech meetup.';

export const interests = [
	'astronomy',
	'sport',
	'church',
	'tech meetups',
	'homelab tinkering',
	'the pub with friends'
];
