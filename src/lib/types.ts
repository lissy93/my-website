/* GitHub fills in anything left out at build time, and has the final say on stars and licences */
export type Project = {
	name: string;
	blurb: string;
	repo: string;
	/* where the code lives, when it's not a public GitHub repo */
	source?: string;
	website?: string;
	/* a path in static/ or a full URL */
	logo?: string;
	lang?: string;
	license?: string;
	from?: number;
	to?: number;
	stars?: number;
	/* which homepage section it shows in, if any */
	home?: 'projects' | 'mini';
};

/* an image in the project-screens album on Pixelflare, no id means not uploaded yet */
export type Screen = { id?: string; alt: string };

export type Featured = Project & {
	/* the brand colour, which tints the screenshot panel */
	color: string;
	/* a sentence or two under the blurb */
	pitch: string;
	/* small links under the buttons, a label in linkIcons gets an icon */
	links?: Link[];
	screens: Screen[];
};

export type ProjectGroup = { title: string; projects: Project[] };

export type ContactFields = 'reason' | 'name' | 'email' | 'message';

export type ContactResult = {
	sent?: boolean;
	failed?: boolean;
	errors?: Partial<Record<ContactFields, string>>;
	values?: Record<ContactFields, string>;
};

/* leading slash routes internally, anything else is off-site */
export type Link = { label: string; href: string };

export type Post = {
	title: string;
	url: string;
	date: string;
	blurb: string;
	source: string;
};

/* a job, or a course, on the About page's "by day" side */
export type Job = {
	org: string;
	role: string;
	/* year and month, like '2024-11', or just a year */
	from: string;
	to?: string;
	logo?: string;
	/* a background for logos that vanish on white */
	tile?: string;
	highlights: string[];
};

/* something on the "by night" side, a launch just names its repo and the rest comes from projects.ts
   press is coverage in a publication, trending is a Hacker News front page */
export type Moment =
	| {
			kind: 'award' | 'win' | 'press' | 'trending' | 'milestone';
			when: string;
			title: string;
			href?: string;
			note?: string;
	  }
	| { kind: 'launch'; repo: string; note?: string };

/* a moment with everything filled in, ready to show */
export type Night = {
	kind: Moment['kind'];
	when: string;
	title: string;
	href?: string;
	logo?: string;
	stars?: number;
	lang?: string;
	license?: string;
	note?: string;
};

/* one of the About page's numbers, links to where it can be checked */
export type Stat = { value: number; label: string; detail?: string; href: string };

/* one of my own public repos, a star in the About page's night sky */
export type OwnRepo = { name: string; stars: number; created: string };

/* launch is the year about.ts gives it, which can be earlier than the repo */
export type SkyRepo = OwnRepo & { title: string; launch?: number; logo?: string };

/* a paragraph, a pull quote, the morning and evening pair, some links, or one of the page's lists */
export type Block =
	| string
	| { pull: string }
	| { day: string; night: string }
	| { links: Link[] }
	| { show: 'projects' | 'work' | 'numbers' | 'interests' };

export type Question = { id: string; question: string; answer: Block[] };
