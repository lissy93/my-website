<script lang="ts" module>
	import { leoLines, type SkyLayout, type Star } from '$lib/sky';

	const count = new Intl.NumberFormat('en-GB');
	const compact = new Intl.NumberFormat('en-GB', { notation: 'compact' });

	/* what the tooltip and screen readers say, like "35,531 stars · 2023" */
	function describe({ stars, year }: Star) {
		const noun = stars === 1 ? 'star' : 'stars';
		return [`${count.format(stars)} ${noun}`, year].filter(Boolean).join(' · ');
	}

	/* gold for the brightest, pink for the ones on the timeline */
	function tone({ bright, launch }: Star) {
		if (bright) return 'var(--star-sun)';
		return launch ? 'var(--star-pink)' : 'var(--star)';
	}

	const steps: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

	const between = (min: number, max: number) => min + Math.random() * (max - min);
	const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

	/* runs fn again and again, a random min to max seconds apart, until stopped */
	function nowAndThen(fn: () => void, min: number, max: number) {
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

	/* how visible each band of background stars is, brightest first */
	const bandOpacity = [0.75, 0.56, 0.38];

	/* a quick dim, a flicker, then back to full */
	const flicker = [1, 0.4, 0.9, 0.55, 1].map((opacity) => ({ opacity }));
</script>

<script lang="ts">
	import { asset } from '$app/paths';
	import { tick } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';

	let { stars, box, ticks, backdrop }: SkyLayout = $props();
	const uid = $props.id();

	let leo = $derived(stars.filter((star) => star.leo));
	let rest = $derived(stars.filter((star) => !star.leo));
	let counts = $derived(stars.map((star) => star.stars));
	let range = $derived([Math.min(...counts), Math.max(...counts)].map(compact.format).join('–'));

	/* bigger stars hold more tickets, so they twinkle a little more often */
	let tickets = $derived(
		stars.flatMap((star) => Array<Star>(Math.round(Math.sqrt(star.size))).fill(star))
	);

	let field = $state<HTMLElement>();
	let tip = $state<HTMLElement>();
	let meteor = $state<HTMLElement>();
	let faintMeteor = $state<HTMLElement>();
	let pointed = $state<Star>();
	let spot = $state({ left: 0, top: 0 });
	let current = $state(0);
	const links: HTMLAnchorElement[] = [];

	/* one shared label that follows whichever star you point at or tab to */
	async function show(star: Star, el: HTMLElement) {
		pointed = star;
		await tick();
		if (!field || !tip) return;

		const sky = field.getBoundingClientRect();
		const target = el.getBoundingClientRect();
		const width = tip.offsetWidth;
		const centre = target.left - sky.left + target.width / 2;
		const left = Math.min(Math.max(centre - width / 2, 8), sky.width - width - 8);
		const above = target.top - sky.top - tip.offsetHeight - 6;
		const below = target.bottom - sky.top + 6;
		spot = { left, top: above > 0 ? above : below };
	}

	const hide = () => (pointed = undefined);

	/* the sky is one tab stop, and arrow keys step through it brightest first */
	function step(event: KeyboardEvent) {
		const by = steps[event.key];
		if (!by) return;
		event.preventDefault();
		links[(current + by + stars.length) % stars.length]?.focus();
	}

	/* one star twinkles, its spikes too if it has them */
	function twinkle() {
		const star = pick(tickets);
		const parts = star.bright ? ['::before', '::after'] : ['::before'];
		for (const pseudoElement of parts) {
			links[star.rank]?.animate(flicker, { duration: 900, pseudoElement });
		}
	}

	/* a streak falls from the top of the sky, bending downward by bend degrees */
	function shoot(streak: HTMLElement | undefined, { scale = 1, bend = 0 } = {}) {
		if (!field || !streak) return;

		const { width, height } = field.getBoundingClientRect();
		const rightward = Math.random() < 0.5;
		const across = between(0.1, 0.6) * width;
		const x = rightward ? across : width - across;
		const y = between(0, 0.25) * height;
		/* degrees below level */
		const fall = between(30, 50);
		const heading = rightward ? fall : 180 - fall;
		const turn = rightward ? bend : -bend;
		const distance = 0.2 * scale * width;
		const pose = (angle: number, along: number, tail: number) =>
			`translate(${x}px, ${y}px) rotate(${angle}deg) translateX(${along}px) scaleX(${tail})`;

		streak.animate(
			[
				{ transform: pose(heading, 0, 0.2), opacity: 0, easing: 'ease-out' },
				{ opacity: 1, offset: 0.15, easing: 'ease-in' },
				{ transform: pose(heading + turn, distance, 1), opacity: 0 }
			],
			between(700, 1100) * scale
		);
	}

	/* a twinkle every second or so, plus bright and faint shooting stars */
	$effect(() => {
		if (prefersReducedMotion.current) return;

		const stops = [
			nowAndThen(twinkle, 0.4, 1.6),
			nowAndThen(() => shoot(meteor), 5, 15),
			nowAndThen(() => shoot(faintMeteor, { scale: 0.6, bend: 12 }), 3, 12)
		];
		return () => stops.forEach((stop) => stop());
	});
</script>

{#snippet glint(star: Star)}
	<a
		class="star"
		class:bright={star.bright}
		href={star.href}
		rel="external"
		aria-label="{star.name}, {describe(star)}"
		tabindex={star.rank === current ? 0 : -1}
		style:--x="{star.x.toFixed(2)}%"
		style:--y="{star.y.toFixed(2)}%"
		style:--size="{star.size.toFixed(2)}px"
		style:--c={tone(star)}
		style:--rank={star.rank}
		bind:this={links[star.rank]}
		onpointerenter={(event) => show(star, event.currentTarget)}
		onpointerleave={hide}
		onfocus={(event) => {
			current = star.rank;
			show(star, event.currentTarget);
		}}
		onblur={hide}
		onkeydown={step}
	></a>
{/snippet}

<section class="sky" aria-labelledby="{uid}-title">
	<svg class="moon" viewBox="0 0 24 24" aria-hidden="true">
		<circle cx="12" cy="12" r="11" fill="var(--moon)" />
		<circle cx="8.5" cy="9" r="2.4" fill="var(--crater)" />
		<circle cx="15" cy="15.5" r="1.8" fill="var(--crater)" />
		<circle cx="15.5" cy="7.5" r="1.1" fill="var(--crater)" />
	</svg>

	<p class="caption">
		<strong id="{uid}-title">My projects, mapped onto the night sky.</strong>
		Star size shows GitHub stars <span class="range">({range})</span>.
		<span class="by-year">The x-axis is the year released.</span>
	</p>

	<div
		class="field"
		bind:this={field}
		style:--left="{box.left}%"
		style:--width="{box.width}%"
		style:--centre="{box.centre}%"
		style:--aspect={box.aspect}
	>
		<div class="night" aria-hidden="true">
			<div class="leo">
				<svg class="backdrop" viewBox="0 0 100 100" preserveAspectRatio="none">
					{#each backdrop as d, i (i)}
						<path {d} style:opacity={bandOpacity[i]} />
					{/each}
				</svg>
			</div>
		</div>

		<span class="meteor" aria-hidden="true" bind:this={meteor}></span>
		<span class="meteor faint" aria-hidden="true" bind:this={faintMeteor}></span>

		<div class="leo">
			<svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
				{#each leoLines as points (points)}
					<polyline {points} />
				{/each}
			</svg>
			{#each leo as star (star.repo)}
				{@render glint(star)}
			{/each}
		</div>

		{#each rest as star (star.repo)}
			{@render glint(star)}
		{/each}

		{#each ticks as { year, x } (year)}
			<span class="year" aria-hidden="true" style:inset-inline-start="{x.toFixed(2)}%">{year}</span>
		{/each}

		<div
			class="tip"
			class:shown={pointed}
			class:with-logo={pointed?.logo}
			aria-hidden="true"
			bind:this={tip}
			style:left="{spot.left}px"
			style:top="{spot.top}px"
		>
			{#if pointed?.logo}<img src={pointed.logo} alt="" width="24" height="24" />{/if}
			<strong>{pointed?.name}</strong>
			<span>{pointed ? describe(pointed) : ''}</span>
		</div>
	</div>

	<img class="dino" src={asset('/dinos/stargazer.svg')} alt="" width="58" height="50" />
</section>

<style>
	/* a night sky in both themes, its curved top rising out of the page */
	.sky {
		--sky-top: oklch(14% 0.055 276);
		--sky-mid: var(--ink-900);
		--sky-low: oklch(30% 0.1 300);
		--star: oklch(97% 0.015 276);
		--star-pink: var(--primary-300);
		--star-sun: #ffc845;
		--moon: #ffe6a3;
		--crater: #f2cf73;
		--edge: max(var(--gutter), calc((100% - var(--width-page)) / 2 + var(--gutter)));
		--moon-size: clamp(2.25rem, 4.5vw, 3.75rem);
		--dino: clamp(4.5rem, 9vw, 7.5rem);

		position: relative;
		overflow: clip;
		padding-block-start: clamp(2.5rem, 6vw, 4.5rem);
		view-timeline: --sky;
		background:
			radial-gradient(70% 45% at 50% 100%, oklch(from var(--primary-500) l c h / 0.3), transparent),
			linear-gradient(var(--sky-top), var(--sky-mid) 55%, var(--sky-low));
		color: var(--neutral-0);
		mask-image: radial-gradient(160% 100% at 50% 100%, #000 99.4%, transparent 100%);

		:focus-visible {
			outline-color: var(--neutral-0);
		}
	}

	.moon {
		position: absolute;
		z-index: 1;
		inset-block-start: clamp(2.5rem, 5vw, 4rem);
		inset-inline-end: var(--edge);
		inline-size: var(--moon-size);
	}

	.caption {
		position: relative;
		z-index: 1;
		max-inline-size: min(80ch, 100% - 2 * var(--edge) - var(--moon-size) - var(--space-md));
		margin-inline: var(--edge);
		margin-block-end: var(--space-md);
		color: oklch(100% 0 0 / 0.7);
		font-size: var(--text-xs);
		line-height: var(--leading-snug);
		text-wrap: pretty;

		strong {
			display: block;
			color: var(--neutral-0);
			font-weight: var(--weight-semibold);
		}
	}

	.range {
		white-space: nowrap;
	}

	.by-year {
		display: none;
	}

	.field {
		position: relative;
		aspect-ratio: 1;
		margin-inline: var(--edge);
	}

	.leo {
		position: absolute;
		inset-inline: 5%;
		inset-block-start: var(--centre);
		aspect-ratio: var(--aspect);
		translate: 0 -50%;
	}

	.year {
		display: none;
		position: absolute;
		inset-block-end: var(--space-sm);
		translate: -50% 0;
		color: oklch(100% 0 0 / 0.58);
		font-size: var(--text-2xs);
		font-weight: var(--weight-semibold);
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.12em;
		pointer-events: none;
	}

	@media (width >= 40rem) {
		.field {
			aspect-ratio: 2.75;
		}

		.leo {
			inset-inline: var(--left) auto;
			inline-size: var(--width);
		}

		.year,
		.by-year {
			display: inline;
		}
	}

	.night {
		position: absolute;
		inset: 0;
		/* the dino's head, which the sky turns around */
		transform-origin: calc(var(--dino) * 0.85) calc(100% - var(--dino) * 0.7);
	}

	.backdrop,
	.lines {
		position: absolute;
		inset: 0;
		inline-size: 100%;
		block-size: 100%;
		overflow: visible;
	}

	.backdrop path {
		stroke: var(--star);
		stroke-width: 1;
		stroke-linecap: round;
		vector-effect: non-scaling-stroke;
	}

	.lines {
		polyline {
			fill: none;
			stroke: oklch(100% 0 0 / 0.3);
			stroke-width: 1;
			stroke-dasharray: 2 5;
			stroke-linecap: round;
			vector-effect: non-scaling-stroke;
		}
	}

	.star {
		--glow: calc(var(--size) * 2.6);

		position: absolute;
		inset-inline-start: var(--x);
		inset-block-start: var(--y);
		display: grid;
		place-items: center;
		inline-size: max(var(--glow), 1.5rem);
		aspect-ratio: 1;
		translate: -50% -50%;
		border-radius: var(--radius-full);
		color: var(--c);

		&::before {
			content: '';
			inline-size: var(--glow);
			aspect-ratio: 1;
			border-radius: inherit;
			background: radial-gradient(
				circle,
				currentcolor 0 21%,
				color-mix(in oklch, currentcolor 45%, transparent) 33%,
				transparent 70%
			);
			transition: scale var(--duration-base) var(--ease-out);
		}

		&:is(:hover, :focus-visible)::before {
			scale: 1.35;
		}
	}

	/* the brightest few get diffraction spikes, like a telescope photo */
	.bright::after {
		content: '';
		position: absolute;
		inline-size: calc(var(--size) * 5.5);
		aspect-ratio: 1;
		background:
			linear-gradient(
					90deg,
					transparent,
					color-mix(in oklch, currentcolor 70%, transparent),
					transparent
				)
				center / 100% 1.5px no-repeat,
			linear-gradient(transparent, color-mix(in oklch, currentcolor 70%, transparent), transparent)
				center / 1.5px 100% no-repeat;
		pointer-events: none;
	}

	.meteor {
		position: absolute;
		inset-block-start: 0;
		inset-inline-end: 100%;
		inline-size: clamp(3rem, 7vw, 6rem);
		block-size: 1.5px;
		border-radius: var(--radius-full);
		background: linear-gradient(to right, transparent, var(--star));
		opacity: 0;
		transform-origin: right;
		pointer-events: none;
	}

	.faint {
		inline-size: clamp(2rem, 4vw, 3.5rem);
		block-size: 1px;
		background: linear-gradient(to right, transparent, oklch(from var(--star) l c h / 0.5));
	}

	.tip {
		position: absolute;
		z-index: 1;
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		column-gap: var(--space-xs);
		inline-size: max-content;
		max-inline-size: 16rem;
		border: var(--border-thin) solid oklch(100% 0 0 / 0.16);
		border-radius: var(--radius-sm);
		padding: var(--space-xs) var(--space-sm);
		background: oklch(27% 0.09 276);
		box-shadow: 0 6px 18px oklch(0% 0 0 / 0.35);
		font-size: var(--text-sm);
		line-height: var(--leading-snug);
		opacity: 0;
		translate: 0 var(--rise);
		pointer-events: none;
		transition:
			opacity var(--duration-fast) var(--ease-out),
			translate var(--duration-fast) var(--ease-out);

		&.shown {
			opacity: 1;
			translate: 0;
		}

		img {
			grid-row: span 2;
			inline-size: 1.5rem;
			border-radius: var(--radius-xs);
		}

		&:not(.with-logo) > * {
			grid-column: 1 / -1;
		}

		strong {
			font-weight: var(--weight-semibold);
		}

		span {
			color: oklch(100% 0 0 / 0.7);
			font-size: var(--text-xs);
			font-variant-numeric: tabular-nums;
		}
	}

	.dino {
		position: absolute;
		inset-block-end: 0;
		inset-inline-start: var(--edge);
		inline-size: var(--dino);
		block-size: auto;
	}

	/* the stars come out brightest first as the sky scrolls in, like at dusk */
	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.star,
			.backdrop,
			.lines {
				animation-timing-function: var(--ease-out);
				animation-fill-mode: backwards;
				animation-timeline: --sky;
			}

			.star {
				animation-name: come-out;
				animation-range: entry min(calc(10% + var(--rank) * 0.5%), 60%) entry
					min(calc(40% + var(--rank) * 0.5%), 95%);
			}

			.backdrop,
			.lines {
				animation-name: fade-in;
				animation-range: entry 70% entry 100%;
			}
		}
	}

	/* the sky turns slowly, like a night-long time-lapse, then eases back */
	@media (prefers-reduced-motion: no-preference) {
		.night {
			animation: turn 90s ease-in-out infinite alternate;
			/* start mid-swing, so it's already moving */
			animation-delay: -45s;
		}
	}

	@keyframes turn {
		from {
			rotate: -8deg;
		}

		to {
			rotate: 8deg;
		}
	}

	@keyframes come-out {
		from {
			opacity: 0;
			scale: 0.2;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}
</style>
