import { seeded } from './random';
import type { SkyProject } from './types';

/* Leo's main stars in % of its box, left to right as they sit in the sky */
const leo = {
	Denebola: [0, 81],
	Zosma: [28, 39],
	Chertan: [28, 75],
	Algieba: [72, 44],
	Adhafera: [75, 18],
	Regulus: [82, 100],
	'Eta Leonis': [83, 66],
	Rasalas: [94, 0],
	'Epsilon Leonis': [100, 18]
} as const;

type LeoStar = keyof typeof leo;

/* the lines that join Leo's stars into a lion */
const figure: LeoStar[][] = [
	['Epsilon Leonis', 'Rasalas', 'Adhafera', 'Algieba', 'Eta Leonis', 'Regulus'],
	['Algieba', 'Zosma', 'Denebola', 'Chertan', 'Regulus'],
	['Zosma', 'Chertan']
];

export const leoLines = figure.map((path) => path.map((name) => leo[name].join(',')).join(' '));

export type Star = SkyProject & {
	/* in % of the sky, or of Leo's box for the stars in Leo */
	x: number;
	y: number;
	/* in px */
	size: number;
	/* 0 is the most starred */
	rank: number;
	bright: boolean;
	leo?: LeoStar;
	/* seconds between twinkles */
	twinkle?: number;
};

/* Leo's true shape, centred this far down the sky */
const shape = { aspect: 2.08, centre: 46 };

/* a phone has no room for the years, so Leo spans its sky as .leo does there */
const phone = { left: 5, width: 90 };

type Box = typeof shape & typeof phone;

/* .field at its narrowest in each shape: a 360px phone, a 640px tablet */
const screens = [
	{ w: 328, h: 328, wide: false },
	{ w: 589, h: 589 / 2.75, wide: true }
];

type Screen = (typeof screens)[number];
type Spot = { x: number; y: number };

const percent = (value: number, of: number) => (value * of) / 100;

/* where a star lands in px, laying Leo out in its box as Sky.svelte does */
function onScreen({ x, y, leo }: Star, box: Box, { w, h, wide }: Screen): Spot {
	if (!leo) return { x: percent(x, w), y: percent(y, h) };

	const { left, width } = wide ? box : phone;
	const across = percent(width, w);
	return {
		x: percent(left, w) + percent(x, across),
		y: percent(box.centre, h) + percent(y - 50, across / box.aspect)
	};
}

/* keeps stars clear of the moon, the dino and the row of years, in px */
function blocked({ x, y }: Spot, { w, h }: Screen) {
	const moon = x > w - 40 && y < 40;
	const dino = x < 76 && y > h - 66;
	const years = y > h - 30;
	return moon || dino || years;
}

/* half a star's tap target, which Sky.svelte sizes the same way */
const reach = (star: Star) => Math.max(1.3 * star.size, 12);

/* how much space a star has, below zero means it's too close to something */
function room(star: Star, placed: Star[], box: Box) {
	let space = Infinity;

	for (const screen of screens) {
		const spot = onScreen(star, box, screen);
		if (blocked(spot, screen)) return -Infinity;

		for (const other of placed) {
			const { x, y } = onScreen(other, box, screen);
			const gap = Math.hypot(spot.x - x, spot.y - y) - (reach(star) + reach(other));
			space = Math.min(space, gap);
		}
	}
	return space;
}

/* the roomiest of many random spots, so stars spread out without a grid */
function scatter(star: Omit<Star, keyof Spot>, placed: Star[], box: Box, guess: () => Spot) {
	let best = { space: -Infinity, x: 0, y: 0 };

	for (let tries = 0; tries < 100; tries++) {
		const candidate = { ...star, ...guess() };
		const space = room(candidate, placed, box);
		if (space > best.space) best = { space, x: candidate.x, y: candidate.y };
	}
	return [best.x, best.y] as const;
}

/* years run left to right, quiet ones squeezed so the busy ones get room */
function timeline(projects: SkyProject[]) {
	const years = projects.flatMap(({ year }) => year ?? []);
	const first = Math.min(...years);
	const last = Math.max(...years) + 1;

	/* anything undated goes in with the newest */
	const yearOf = ({ year }: SkyProject) => year ?? last - 1;

	/* how wide a year is, by how many projects came out in it */
	const yearWidth = (year: number) => {
		const count = years.filter((y) => y === year).length;
		if (count === 0) return 0.1;
		if (count === 1) return 0.5;
		return 1;
	};

	/* how far along the axis a moment is, in full-width years */
	const along = (when: number) => {
		let sum = 0;
		for (let year = first; year < last; year++) {
			const passed = Math.min(Math.max(when - year, 0), 1);
			sum += yearWidth(year) * passed;
		}
		return sum;
	};

	/* in %, kept clear at each end */
	const margin = 4;
	const xOf = (when: number) => margin + ((100 - 2 * margin) * along(when)) / along(last);

	/* a label every third year back from the newest, unless the dino's there */
	const ticks: { year: number; x: number }[] = [];
	for (let year = last - 1; year >= first; year -= 3) ticks.push({ year, x: xOf(year + 0.5) });

	return { yearOf, xOf, ticks: ticks.filter(({ x }) => x > 16) };
}

/* a star's width in px, growing faster at the top so the biggest stand out */
function sizeFor(stars: number) {
	const digits = Math.log10(stars + 1);
	return 1.2 + 1.4 * digits + 0.35 * digits ** 2;
}

/* the brightest form Leo, oldest on the left, so it fits the timeline too */
export function place(projects: SkyProject[]) {
	const names = Object.keys(leo) as LeoStar[];
	if (projects.length < names.length)
		throw new Error(`Leo needs ${names.length} projects, the sky has ${projects.length}`);

	const { yearOf, xOf, ticks } = timeline(projects);
	const brightest = [...projects].sort((a, b) => b.stars - a.stars);
	const inLeo = brightest
		.slice(0, names.length)
		.sort((a, b) => yearOf(a) - yearOf(b) || b.stars - a.stars);
	const leoOf = new Map(inLeo.map((project, i) => [project, names[i]]));

	/* Leo's box runs from the year of its oldest star to its newest */
	const left = xOf(yearOf(inLeo[0]) + 0.5);
	const right = xOf(yearOf(inLeo[inLeo.length - 1]) + 0.5);
	const box: Box = { ...shape, left, width: right - left };

	const placed: Star[] = [];
	brightest.forEach((project, rank) => {
		const roll = seeded(project.repo);
		const star = {
			...project,
			rank,
			size: sizeFor(project.stars),
			bright: project.stars >= 10_000,
			leo: leoOf.get(project),
			/* about a third twinkle, each every 5 to 14 seconds */
			twinkle: roll() < 0.3 ? 5 + roll() * 9 : undefined
		};

		/* within its own year, spilling a little either side, at any height */
		const nearItsYear = () => ({
			x: xOf(yearOf(star) - 0.25 + roll() * 1.5),
			y: 4 + roll() * 92
		});

		const [x, y] = star.leo ? leo[star.leo] : scatter(star, placed, box, nearItsYear);
		placed.push({ ...star, x, y });
	});

	return { stars: placed, box, ticks };
}

export type SkyLayout = ReturnType<typeof place>;
