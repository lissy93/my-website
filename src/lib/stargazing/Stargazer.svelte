<script lang="ts" module>
	/* the faces the dino pulls, depending on what you point at */
	export type Mood = 'calm' | 'content' | 'awed' | 'grinning' | 'moonlit';
</script>

<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';
	import { on } from 'svelte/events';
	import { prefersReducedMotion, Spring } from 'svelte/motion';
	import { nowAndThen } from '$lib/bits-and-bobs/random';

	type Props = { mood?: Mood; watching?: HTMLElement } & SVGAttributes<SVGSVGElement>;
	let { mood = 'calm', watching, ...rest }: Props = $props();

	let eye = $state<SVGGElement>();
	let head = $state<SVGGElement>();

	/* how far the eye shuts, and for how many ms */
	const blinks = {
		subtle: { shut: 0.45, duration: 160 },
		pronounced: { shut: 0.05, duration: 320 }
	};

	/* mostly a quick half blink, and now and then a slow full one */
	function blink() {
		const { shut, duration } = Math.random() < 0.3 ? blinks.pronounced : blinks.subtle;
		const open = { transform: 'none' };
		const closed = { transform: `scaleY(${shut})` };
		eye?.animate([open, closed, closed, open], { duration, easing: 'ease-in-out' });
	}

	/* how far his head tips down in degrees, or up when it's negative */
	const tilt = new Spring(0, { stiffness: 0.08, damping: 0.7 });

	/* the furthest it tips, with the pointer at the top or bottom of the area */
	const reach = 8;

	/* tips his head toward a height in the area, more the further away it is */
	function lookAt(y: number, area: DOMRect) {
		if (!head) return;

		const { top, height } = head.getBoundingClientRect();
		const level = top + height / 2;
		const room = y > level ? area.bottom - level : level - area.top;
		tilt.target = (reach * (y - level)) / room;
	}

	/* he blinks every 6 to 8 seconds, unless motion is reduced */
	$effect(() => {
		if (prefersReducedMotion.current) return;
		return nowAndThen(blink, 6, 8);
	});

	/* his head follows the pointer up and down the area he's watching */
	$effect(() => {
		const area = watching;
		if (prefersReducedMotion.current || !area) return;

		const stops = [
			on(area, 'pointermove', (event) => lookAt(event.clientY, area.getBoundingClientRect())),
			on(area, 'pointerleave', () => (tilt.target = 0))
		];
		return () => {
			stops.forEach((stop) => stop());
			tilt.target = 0;
		};
	});
</script>

<svg viewBox="-6 9.5 64 50" width="64" height="50" data-mood={mood} {...rest}>
	<g fill="var(--shadow)">
		<rect x="16" y="47" width="6.5" height="11" rx="3.25" />
		<rect x="33" y="47" width="6.5" height="11" rx="3.25" />
	</g>
	<path
		fill="var(--skin)"
		d="M11.9 38C8.6 41.1 2.4 47.6-4.6 46.6a1 1 0 0 0 .2 1.9C1.5 50.2 7 49.8 12 48.6Z"
	/>
	<path
		d="M34 41c5.5-5 7-13.5 10.5-21.5"
		fill="none"
		stroke="var(--skin)"
		stroke-width="8.5"
		stroke-linecap="round"
	/>
	<ellipse cx="25" cy="44" rx="16" ry="10.5" fill="var(--skin)" />
	<g fill="var(--skin)">
		<rect x="11.5" y="47" width="6.5" height="12" rx="3.25" />
		<rect x="28.5" y="47" width="6.5" height="12" rx="3.25" />
	</g>
	<g fill="var(--shadow)">
		<circle cx="19" cy="38" r="1.8" />
		<circle cx="26" cy="36" r="1.5" />
		<circle cx="32" cy="38.5" r="1.2" />
	</g>
	<!-- tipped toward the pointer, turning where it meets his neck -->
	<g bind:this={head} transform="rotate({tilt.current.toFixed(2)} 44.5 19.5)">
		<ellipse
			cx="47.5"
			cy="16.5"
			rx="7.6"
			ry="5.6"
			fill="var(--skin)"
			transform="rotate(-25 47.5 16.5)"
		/>

		<g class="face">
			<g class="eye" bind:this={eye}>
				<ellipse cx="48.6" cy="14.2" rx="2.4" ry="2.7" fill="#fff" />
				<circle class="pupil" cx="49.5" cy="13.3" r="1.3" fill="var(--ink)" />
				<circle class="glint" cx="50.05" cy="12.6" r="0.5" />
			</g>
			<path class="shut" d="M46.7 14.8q1.9-2.4 4-.4" stroke="var(--ink)" stroke-width="1.2" />
			<ellipse class="blush" cx="47.3" cy="18.4" rx="1.6" ry="1" fill="#ff8fbfbf" />

			<path class="smile" d="M48.8 18.4q2.2.6 3.8-1.2" stroke="var(--lip)" stroke-width="1.3" />
			<ellipse class="ooh" cx="51.4" cy="18.2" rx="0.85" ry="1.05" fill="var(--lip)" />
			<g class="grin">
				<path d="M48.6 18.1Q50.9 18.4 52.7 16.7Q52.3 20.6 48.6 18.1Z" fill="var(--lip)" />
				<path d="M52.2 18.5Q51.5 19.5 50 18.8Q51.2 17.9 52.2 18.5Z" fill="#ff7aa8" />
			</g>
		</g>
	</g>
</svg>

<style>
	svg {
		--skin: #e03284;
		--shadow: #a3134f;
		--ink: #1c1216;
		--lip: #5c0a2e;

		display: block;
		inline-size: 100%;
		block-size: auto;
		/* only the drawing catches the pointer, not the empty box around it */
		pointer-events: none;

		> * {
			pointer-events: auto;
		}
	}

	.shut,
	.smile {
		fill: none;
		stroke-linecap: round;
	}

	.face * {
		transform-box: fill-box;
		transform-origin: center;
	}

	.glint,
	.shut,
	.blush,
	.ooh,
	.grin {
		opacity: 0;
	}

	.glint {
		fill: #fff;
		scale: 0.5;
	}

	.ooh,
	.grin {
		scale: 0.4;
	}

	[data-mood='content'] {
		.eye {
			opacity: 0;
			scale: 1 0.1;
		}

		.shut,
		.blush {
			opacity: 1;
		}

		.smile {
			scale: 1.15;
		}
	}

	[data-mood='awed'] {
		.eye {
			scale: 1.08;
		}

		.pupil {
			scale: 0.88;
			translate: 0.1px -0.4px;
		}

		.glint {
			opacity: 1;
			scale: 0.7;
		}

		.smile {
			opacity: 0;
			scale: 0.5;
		}

		.ooh {
			opacity: 1;
			scale: 1;
		}
	}

	[data-mood='grinning'] {
		.eye {
			scale: 1.04;
		}

		.pupil {
			scale: 1.12;
		}

		.glint {
			opacity: 1;
			scale: 0.9;
		}

		.smile {
			opacity: 0;
		}

		.grin {
			opacity: 1;
			scale: 1;
		}
	}

	[data-mood='moonlit'] {
		.eye {
			scale: 1.04;
		}

		.pupil {
			scale: 1.2;
		}

		.glint {
			opacity: 1;
			scale: 1.1;
			fill: var(--moon);
		}
	}

	/* features ease between faces, lingering a moment before going calm */
	@media (prefers-reduced-motion: no-preference) {
		[data-mood='calm'] {
			--linger: 0.3s;
		}

		.face * {
			transition-property: opacity, scale, translate, fill;
			transition-duration: var(--duration-release);
			transition-timing-function: var(--ease-out);
			transition-delay: var(--linger, 0s);
		}
	}
</style>
