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
