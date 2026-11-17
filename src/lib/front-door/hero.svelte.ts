import type { Attachment } from 'svelte/attachments';
import { on } from 'svelte/events';
import { barBottom } from '$lib/furniture/band';

/* how far the homepage hero has folded under the bar */
export const hero = $state({ leaving: false, folded: false });

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

/* shrinks a .dock element onto its twin in the bar, while its range scrolls under the bar */
export function dockInto(twinSelector: string, rangeSelector: string): Attachment<HTMLElement> {
	return (el) => {
		const range = el.closest(rangeSelector);
		const twin = document.querySelector(twinSelector);
		if (!range || !twin) return;

		/* measured with the animation off, to get its real start */
		const measure = () => {
			el.style.animationName = 'none';
			const from = el.getBoundingClientRect();
			el.style.removeProperty('animation-name');

			/* where it sits on screen as the range starts sliding under the bar */
			const to = twin.getBoundingClientRect();
			const { top, height } = range.getBoundingClientRect();
			const start = from.top - top + barBottom();

			el.style.setProperty('--dock-x', `${to.left - from.left}px`);
			el.style.setProperty('--dock-y', `${to.top - start}px`);
			el.style.setProperty('--dock-pin', `${height}px`);
			el.style.setProperty('--dock-scale', `${to.width / from.width}`);
		};

		/* the body resizes with the window and fonts, which moves both ends */
		const observer = new ResizeObserver(measure);
		observer.observe(document.body);
		document.fonts.ready.then(measure);
		return () => observer.disconnect();
	};
}
