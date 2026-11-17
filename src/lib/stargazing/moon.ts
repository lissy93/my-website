/* a known new moon, and the time from one new moon to the next, in ms */
const newMoon = Date.UTC(2000, 0, 6, 18, 14);
const lunarMonth = 29.530589 * 24 * 60 * 60 * 1000;

/* the moon's seas as ellipses on its 24 by 24 face, left to right */
export const maria = {
	Procellarum: [4.6, 10.5, 2.9, 5],
	Nubium: [9.1, 16, 2.2, 2.1],
	Imbrium: [9.5, 6, 3.4, 2.9],
	Serenitatis: [14.9, 6.8, 2, 1.9],
	Tranquillitatis: [17.7, 10.4, 2.4, 2.7],
	Fecunditatis: [20.5, 13.5, 1.8, 2.6],
	Crisium: [21, 8.8, 0.9, 1.7]
} as const;

/* the moon at a given time, as seen from the UK */
export function moonAt(now: number) {
	/* 0 is new, 0.5 full, and it's lit from the right until then */
	const phase = ((now - newMoon) / lunarMonth) % 1;
	const bulge = Math.cos(phase * 2 * Math.PI);
	const crescent = bulge > 0;

	/* its dark side, down the edge of the disc then back up the terminator */
	const limb = phase < 0.5 ? 0 : 1;
	const terminator = crescent ? limb : 1 - limb;
	const width = (11 * Math.abs(bulge)).toFixed(2);

	return {
		/* how much of it is lit, from 0 to 1 */
		lit: (1 - bulge) / 2,
		shade: `M12 1A11 11 0 0 ${limb} 12 23A${width} 11 0 0 ${terminator} 12 1`
	};
}
