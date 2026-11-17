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
</script>

<script lang="ts">
	import { asset } from '$app/paths';
	import { tick } from 'svelte';

	let { stars, box, ticks }: SkyLayout = $props();
	const uid = $props.id();

	let leo = $derived(stars.filter((star) => star.leo));
	let rest = $derived(stars.filter((star) => !star.leo));
	let counts = $derived(stars.map((star) => star.stars));
	let range = $derived([Math.min(...counts), Math.max(...counts)].map(compact.format).join('–'));

	let field = $state<HTMLElement>();
	let tip = $state<HTMLElement>();
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
</script>

{#snippet glint(star: Star)}
	<a
		class="star"
		class:bright={star.bright}
		class:twinkle={star.twinkle}
		href={star.href}
		rel="external"
		aria-label="{star.name}, {describe(star)}"
		tabindex={star.rank === current ? 0 : -1}
		style:--x="{star.x.toFixed(2)}%"
		style:--y="{star.y.toFixed(2)}%"
		style:--size="{star.size.toFixed(2)}px"
		style:--c={tone(star)}
		style:--rank={star.rank}
		style:--twinkle={star.twinkle && `${star.twinkle.toFixed(1)}s`}
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

	<div class="field" bind:this={field}>
		<div
			class="leo"
			style:--left="{box.left}%"
			style:--width="{box.width}%"
			style:inset-block-start="{box.centre}%"
			style:aspect-ratio={box.aspect}
		>
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

		position: relative;
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
		inset-block-start: clamp(2.5rem, 5vw, 4rem);
		inset-inline-end: var(--edge);
		inline-size: var(--moon-size);
	}

	.caption {
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

	.lines {
		position: absolute;
		inset: 0;
		inline-size: 100%;
		block-size: 100%;
		overflow: visible;

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
		inline-size: clamp(4.5rem, 9vw, 7.5rem);
		block-size: auto;
	}

	/* the stars come out brightest first as the sky scrolls in, like at dusk */
	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.star,
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

			.lines {
				animation-name: fade-in;
				animation-range: entry 70% entry 100%;
			}
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.twinkle::before {
			animation: twinkle var(--twinkle) ease-in-out infinite;
		}
	}

	@keyframes come-out {
		from {
			opacity: 0;
			scale: 0.2;
		}
	}

	@keyframes twinkle {
		92% {
			opacity: 1;
		}

		96% {
			opacity: 0.45;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}
</style>
