import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { site } from '$lib/me/site';
import type { Mood } from '$lib/stargazing/Stargazer.svelte';
import { stargazer } from '$lib/stargazing/still';
import archivo from './fonts/archivo-black-118.ttf?inline';
import figtree500 from './fonts/figtree-500.ttf?inline';
import figtree600 from './fonts/figtree-600.ttf?inline';

export type Card = {
	title: string;
	description: string;
	path: string;
	mood?: Mood;
	stacked?: boolean;
};

type Node = { type: string; key?: number; props: Record<string, unknown> };

const width = 1200;
const height = 630;
const column = 620;

/* satori can't vary a font, so these are the site's at the weight and width it uses */
const bytes = (dataUrl: string) =>
	Uint8Array.from(atob(dataUrl.split(',')[1]), (char) => char.charCodeAt(0)).buffer;
const fonts = [
	{ name: 'Archivo', data: bytes(archivo), weight: 900 as const },
	{ name: 'Figtree', data: bytes(figtree500), weight: 500 as const },
	{ name: 'Figtree', data: bytes(figtree600), weight: 600 as const }
];

const div = (style: Record<string, unknown>, children?: unknown, key?: number): Node => ({
	type: 'div',
	key,
	props: { style, children }
});

/* the same stars every build */
function seeded(seed: number) {
	return () => {
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function stars() {
	const random = seeded(11);
	return Array.from({ length: 80 }, () => {
		const r = 0.8 + random() ** 3 * 2.4;
		const fill = random() < 0.12 ? '#ffc845' : '#f6f6ff';
		const [x, y, opacity] = [random() * width, random() * height, 0.45 + random() * 0.55];
		return (
			`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" ` +
			`fill="${fill}" opacity="${opacity.toFixed(2)}"/>`
		);
	}).join('');
}

/* the favicon's night, a moon in the corner, and him on the right looking up */
const sky = (mood: Mood) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
	<defs>
		<linearGradient id="sky" x2="0" y2="1">
			<stop offset="0" stop-color="#0d0b2e"/><stop offset="1" stop-color="#3b2160"/>
		</linearGradient>
		<radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="900" cy="706" r="840"
			gradientTransform="matrix(1 0 0 .4125 0 415)">
			<stop offset="0" stop-color="#f04c8a" stop-opacity=".55"/>
			<stop offset=".7" stop-color="#f04c8a" stop-opacity="0"/>
		</radialGradient>
	</defs>
	<rect width="${width}" height="${height}" fill="url(#sky)"/>
	<rect width="${width}" height="${height}" fill="url(#glow)"/>
	${stars()}
	<circle cx="1086" cy="98" r="44" fill="#ffe6a3"/>
	<circle cx="1071.5" cy="87" r="9.7" fill="#f2cf73"/>
	<circle cx="1100.6" cy="112.6" r="7.5" fill="#f2cf73"/>
	<g transform="translate(640 178) scale(7.5) translate(6 1.5)">${stargazer(mood)}</g>
</svg>`;

const heading = (lines: string[], size: number) =>
	div(
		{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			color: '#fff',
			fontFamily: 'Archivo',
			fontWeight: 900,
			fontSize: size,
			letterSpacing: size * -0.035,
			lineHeight: 0.86,
			whiteSpace: 'nowrap'
		},
		lines.map((line, i) => div({}, line, i))
	);

/* the biggest the title can be, up to max, with its longest line still fitting the column */
async function fit(lines: string[], max: number) {
	const widths: number[] = [];
	await satori(heading(lines, max), {
		width: 4000,
		height: 1000,
		fonts,
		onNodeDetected: (node) => node.key !== undefined && widths.push(node.width)
	});
	return Math.min(max, Math.floor((max * column) / Math.max(...widths)));
}

const address = (path: string) => {
	const { host, pathname } = new URL(path, site.url);
	return pathname === '/' ? host : host + pathname;
};

/* draws a share card as a png, the page's name and description under the night sky */
export async function drawCard({ title, description, path, mood = 'calm', stacked }: Card) {
	const lines = stacked ? title.split(' ') : [title];
	const size = await fit(lines, stacked ? 150 : 160);
	const background = `data:image/svg+xml;base64,${btoa(sky(mood))}`;

	const card = div({ display: 'flex', width, height, fontFamily: 'Figtree' }, [
		{ type: 'img', props: { src: background, width, height, style: { position: 'absolute' } } },
		div(
			{
				position: 'absolute',
				left: 72,
				top: stacked ? 110 : 128,
				width: column,
				display: 'flex',
				flexDirection: 'column',
				gap: 34
			},
			[
				heading(lines, size),
				div(
					{
						display: 'block',
						lineClamp: 4,
						fontSize: 31,
						fontWeight: 500,
						lineHeight: 1.35,
						color: '#dcd6f7'
					},
					description
				)
			]
		),
		div(
			{
				position: 'absolute',
				left: 72,
				bottom: 48,
				fontSize: 25,
				fontWeight: 600,
				color: '#ffffffcc'
			},
			address(path)
		)
	]);

	const svg = await satori(card, { width, height, fonts });
	const png = new Resvg(svg, { font: { loadSystemFonts: false } }).render().asPng();
	return new Response(new Uint8Array(png), { headers: { 'content-type': 'image/png' } });
}
