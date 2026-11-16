/* random numbers seeded from some text, so anything scattered with them lands in the same place on every build */
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
