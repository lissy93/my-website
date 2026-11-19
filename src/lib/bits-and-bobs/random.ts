export const between = (min: number, max: number) => min + Math.random() * (max - min);

/* runs fn again and again, a random min to max seconds apart, until stopped */
export function nowAndThen(fn: () => void, min: number, max: number) {
	let timer: ReturnType<typeof setTimeout>;
	const wait = () => {
		timer = setTimeout(run, between(min, max) * 1000);
	};
	const run = () => {
		fn();
		wait();
	};
	wait();
	return () => clearTimeout(timer);
}

/* random numbers from a seed, so scattered things land the same every build */
export function seeded(text: string) {
	let seed = 2166136261;
	for (const ch of text) seed = Math.imul(seed ^ ch.charCodeAt(0), 16777619);

	return () => {
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}
