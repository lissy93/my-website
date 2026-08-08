export type Project = {
	name: string;
	blurb: string;
	repo: string;
	website?: string;
	stars: number;
	from: number;
	to?: number;
	lang?: string;
	license?: string;
	logo?: string;
};

export type ContactFields = 'reason' | 'name' | 'email' | 'message';

export type ContactResult = {
	sent?: boolean;
	failed?: boolean;
	errors?: Partial<Record<ContactFields, string>>;
	values?: Record<ContactFields, string>;
};

/* A leading slash routes internally; anything else is treated as off-site. */
export type FooterLink = { label: string; href: string };

export type Post = {
	title: string;
	url: string;
	date: string;
	blurb: string;
	source: string;
};
