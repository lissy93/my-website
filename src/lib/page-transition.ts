import type { OnNavigate } from '@sveltejs/kit';
import { on } from 'svelte/events';
import { bandEdge } from '$lib/band';

let swiped = false;

/* spots swipe backs the browser animates itself, so we skip ours */
export const watchSwipes = () =>
	on(window, 'popstate', (event) => (swiped = event.hasUAVisualTransition), { capture: true });

/* runs page changes as a view transition, sliding content with the band */
export const pageTransition = (navigation: OnNavigate) => {
	const root = document.documentElement;
	const restore = () => root.style.removeProperty('scroll-behavior');
	root.style.scrollBehavior = 'auto';
	navigation.complete.then(restore, restore);

	const skip = swiped || !document.startViewTransition;
	swiped = false;
	if (skip) return;

	const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
	const from = bandEdge();

	return new Promise<void>((resolve) => {
		const transition = document.startViewTransition(async () => {
			resolve();
			await navigation.complete.catch(() => {});
			const to = bandEdge();
			if (from && to && !reduceMotion) root.style.setProperty('--band-shift', `${from - to}px`);
		});
		const clear = () => root.style.removeProperty('--band-shift');
		transition.finished.then(clear, clear);
	});
};
