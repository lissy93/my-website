import type { Mood } from './Stargazer.svelte';

/* Stargazer drawn without CSS, for images that can't run it, in Stargazer.svelte's coordinates */

const colours = {
	skin: '#e03284',
	shadow: '#a3134f',
	ink: '#1c1216',
	lip: '#5c0a2e',
	star: '#ffc845',
	moon: '#ffe6a3'
};

const smile = (scale = 1) =>
	`<path d="M48.8 18.4q2.2.6 3.8-1.2" fill="none" stroke="${colours.lip}" stroke-width="1.3" ` +
	`stroke-linecap="round" transform="translate(50.7 17.8) scale(${scale}) translate(-50.7 -17.8)"/>`;

type Eye = { rx?: number; ry?: number; x?: number; y?: number; r?: number; glint?: number };

function eye({ rx = 2.4, ry = 2.7, x = 49.5, y = 13.3, r = 1.3, glint }: Eye, glow = '#fff') {
	const shine = glint
		? `<circle cx="${x + 0.57}" cy="${y - 0.73}" r="${glint}" fill="${glow}"/>`
		: '';
	return (
		`<ellipse cx="48.6" cy="14.2" rx="${rx}" ry="${ry}" fill="#fff"/>` +
		`<circle cx="${x}" cy="${y}" r="${r}" fill="${colours.ink}"/>${shine}`
	);
}

/* the same faces the component eases between */
const faces: Record<Mood, () => string> = {
	calm: () => eye({}) + smile(),
	content: () =>
		`<path d="M46.7 14.8q1.9-2.4 4-.4" fill="none" stroke="${colours.ink}" stroke-width="1.2" ` +
		`stroke-linecap="round"/><ellipse cx="47.3" cy="18.4" rx="1.6" ry="1" fill="#ff8fbfbf"/>` +
		smile(1.15),
	awed: () =>
		eye({ rx: 2.6, ry: 2.9, x: 49.6, y: 12.9, r: 1.15, glint: 0.35 }) +
		`<ellipse cx="51.4" cy="18.2" rx=".85" ry="1.05" fill="${colours.lip}"/>`,
	grinning: () =>
		eye({ rx: 2.5, ry: 2.81, x: 49.8, y: 12.69, r: 1.51, glint: 0.47 }) +
		`<path fill="${colours.lip}" d="M48.6 18.1Q50.9 18.4 52.7 16.7Q52.3 20.6 48.6 18.1Z"/>` +
		`<path fill="#ff7aa8" d="M52.2 18.5Q51.5 19.5 50 18.8Q51.2 17.9 52.2 18.5Z"/>`,
	moonlit: () => eye({ rx: 2.5, ry: 2.81, r: 1.56, glint: 0.55 }, colours.moon) + smile()
};

const star =
	'53.6 2.5 54.72 4.76 57.21 5.13 55.41 6.89 55.83 9.37 ' +
	'53.6 8.2 51.37 9.37 51.79 6.89 49.99 5.13 52.48 4.76';

/* him looking up at the star on his nose, like the favicon, spanning -6 -1.5 64 61 */
export const stargazer = (mood: Mood = 'calm') => `
<g fill="${colours.shadow}">
	<rect x="16" y="47" width="6.5" height="11" rx="3.25"/>
	<rect x="33" y="47" width="6.5" height="11" rx="3.25"/>
</g>
<path fill="${colours.skin}"
	d="M11.9 38C8.6 41.1 2.4 47.6-4.6 46.6a1 1 0 0 0 .2 1.9C1.5 50.2 7 49.8 12 48.6Z"/>
<path d="M34 41c5.5-5 7-13.5 10.5-21.5" fill="none"
	stroke="${colours.skin}" stroke-width="8.5" stroke-linecap="round"/>
<ellipse cx="25" cy="44" rx="16" ry="10.5" fill="${colours.skin}"/>
<g fill="${colours.skin}">
	<rect x="11.5" y="47" width="6.5" height="12" rx="3.25"/>
	<rect x="28.5" y="47" width="6.5" height="12" rx="3.25"/>
</g>
<g fill="${colours.shadow}">
	<circle cx="19" cy="38" r="1.8"/><circle cx="26" cy="36" r="1.5"/><circle cx="32" cy="38.5" r="1.2"/>
</g>
<g transform="rotate(-14 44.5 19.5)">
	<ellipse cx="47.5" cy="16.5" rx="7.6" ry="5.6" fill="${colours.skin}" transform="rotate(-25 47.5 16.5)"/>
	${faces[mood]()}
	<polygon points="${star}" fill="${colours.star}"
		stroke="${colours.star}" stroke-width="1.33" stroke-linejoin="round"/>
</g>`;
