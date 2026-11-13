import type { Attachment } from 'svelte/attachments';
import { on } from 'svelte/events';
import { barBottom } from '$lib/band';

/* how far the homepage hero has folded under the bar */
export const hero = $state({ leaving: false, folded: false });

const fontSize = (el: Element) => parseFloat(getComputedStyle(el).fontSize);

/* keeps `hero` in step with the scroll */
export const trackFold: Attachment<HTMLElement> = (band) => {
	const update = () => {
		const { top, height } = band.getBoundingClientRect();
		const folded = (barBottom() - top) / height;
		hero.leaving = folded > 0.15;
		hero.folded = folded > 0.85;
	};

	const observer = new ResizeObserver(update);
	observer.observe(band);
	const stopWatching = on(window, 'scroll', update, { passive: true });

	return () => {
		observer.disconnect();
		stopWatching();
		hero.leaving = false;
		hero.folded = false;
	};
};

/* works out how far the name moves and shrinks to hit the wordmark */
export const collapse: Attachment<HTMLElement> = (name) => {
	const band = name.closest('.masthead');
	const wordmark = document.querySelector('[data-collapse-to]');
	if (!band || !wordmark) return;

	/* measured with the animation off, to get its real start */
	const measure = () => {
		name.style.animationName = 'none';
		const from = name.getBoundingClientRect();
		name.style.removeProperty('animation-name');

		const to = wordmark.getBoundingClientRect();
		const toScroll = band.getBoundingClientRect().bottom - barBottom();
		name.style.setProperty('--collapse-x', `${to.left - from.left}px`);
		name.style.setProperty('--collapse-y', `${to.top - from.top + toScroll}px`);
		name.style.setProperty('--collapse-scale', `${fontSize(wordmark) / fontSize(name)}`);
	};

	const observer = new ResizeObserver(measure);
	observer.observe(band);
	document.fonts.ready.then(measure);
	return () => observer.disconnect();
};
