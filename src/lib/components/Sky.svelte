<script lang="ts" module>
	import { seeded } from '$lib/random';
	import type { SkyRepo } from '$lib/types';

	type Star = SkyRepo & {
		x: number;
		y: number;
		d: number;
		year: number;
		tone: string;
		named: boolean;
		rank: number;
	};

	/* a few of the brightest, joined up by when they came out */
	const constellations = [
		{ label: '2017–19', repos: ['personal-security-checklist', 'awesome-privacy', 'dashy'], y: 34 },
		{ label: '2022–23', repos: ['AdGuardian-Term', 'web-check', 'portainer-templates'], y: 46 },
		{ label: '2024–25', repos: ['domain-locker', 'who-dat', 'networking-toolbox'], y: 30 }
	];

	const thisYear = new Date().getFullYear();
	const firstYear = 2013;
	const ticks = [thisYear - 9, thisYear - 6, thisYear - 3, thisYear];
	const xOf = (year: number) => 4 + (92 * (year - firstYear)) / (thisYear + 1 - firstYear);

	/* a launch keeps the year about.ts gives it, everything else sits at the month it was made */
	function yearOf({ created, launch }: SkyRepo) {
		const [year, month] = created.split('-').map(Number);
		if (launch && launch !== year) return launch + 0.5;
		return year + (month - 1) / 12;
	}

	function tone({ stars, launch }: SkyRepo) {
		if (stars >= 10000) return 'var(--star-sun)';
		return launch ? 'var(--star-pink)' : 'var(--star)';
	}

	/* the legend sits top left and the dino bottom left, so the stars keep clear of both */
	const blocked = ({ x, y }: Star) => (x < 34 && y < 11) || (x < 17 && y > 62);

	/* measured in phone pixels, the tightest the sky ever gets */
	const gap = (a: Star, b: Star) => Math.hypot((a.x - b.x) * 3.9, (a.y - b.y) * 4.8);

	function place(repos: SkyRepo[]) {
		const placed: Star[] = [];
		const brightest = [...repos].sort((a, b) => b.stars - a.stars);

		brightest.forEach((repo, rank) => {
			const roll = seeded(repo.name);
			const constellation = constellations.find(({ repos }) => repos.includes(repo.name));
			const star: Star = {
				...repo,
				year: yearOf(repo),
				x: 0,
				y: 0,
				d: 1.3 + 1.9 * Math.log10(repo.stars + 1),
				tone: tone(repo),
				named: repo.stars >= 100,
				rank
			};

			for (let attempt = 0; attempt < 120; attempt++) {
				star.x = Math.min(96, Math.max(3, xOf(star.year) + (roll() - 0.5) * 2.5));
				star.y = constellation ? constellation.y + (roll() - 0.5) * 34 : 5 + roll() * 72;
				const near = placed.some(
					(other) => gap(star, other) < (star.named && other.named ? 30 : 12)
				);
				if (!blocked(star) && !near) break;
			}
			placed.push(star);
		});

		return placed;
	}

	function lines(stars: Star[]) {
		return constellations.flatMap(({ label, repos }) => {
			const members = stars.filter((star) => repos.includes(star.name)).sort((a, b) => a.x - b.x);
			if (members.length < 2) return [];
			const top = members.reduce((a, b) => (a.y < b.y ? a : b));
			return [{ label, top, points: members.map(({ x, y }) => `${x},${y}`).join(' ') }];
		});
	}

	const count = new Intl.NumberFormat('en-GB');
	const describe = (star: Star) =>
		`${count.format(star.stars)} ${star.stars === 1 ? 'star' : 'stars'} · ${Math.floor(star.year)}`;
</script>

<script lang="ts">
	import { asset } from '$app/paths';

	let { repos }: { repos: SkyRepo[] } = $props();

	let stars = $derived(place(repos));
	let shapes = $derived(lines(stars));
	let byX = $derived([...stars].sort((a, b) => a.x - b.x));

	let field = $state<HTMLElement>();
	let tip = $state<HTMLElement>();
	let pointed = $state<{ star: Star; left: number; top: number }>();

	/* one shared label that follows whichever star you point at or tab to */
	function show(star: Star, el: HTMLElement) {
		if (!field || !tip) return;
		const box = field.getBoundingClientRect();
		const spot = el.getBoundingClientRect();
		const width = tip.offsetWidth;
		const left = Math.min(
			Math.max(spot.left - box.left + spot.width / 2 - width / 2, 8),
			box.width - width - 8
		);
		const above = spot.top - box.top - tip.offsetHeight - 6;
		pointed = { star, left, top: above > 0 ? above : spot.bottom - box.top + 6 };
	}

	const hide = () => (pointed = undefined);
</script>

<section class="sky" aria-label="Every public repo I’ve made, as a star sized by its GitHub stars">
	<svg class="moon" viewBox="0 0 24 24" aria-hidden="true">
		<circle cx="12" cy="12" r="11" fill="var(--moon)" />
		<circle cx="8.5" cy="9" r="2.4" fill="var(--crater)" />
		<circle cx="15" cy="15.5" r="1.8" fill="var(--crater)" />
		<circle cx="15.5" cy="7.5" r="1.1" fill="var(--crater)" />
	</svg>

	<div class="field" bind:this={field}>
		<div class="legend" aria-hidden="true">
			<span><i style:--d="3px"></i>10</span>
			<span><i style:--d="6px"></i>1k</span>
			<span><i style:--d="10px"></i>35k</span>
			<span>GitHub stars</span>
		</div>

		<svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
			{#each shapes as shape (shape.label)}
				<polyline points={shape.points} />
			{/each}
		</svg>

		{#each byX as star (star.name)}
			{#if star.named}
				<a
					class="star"
					class:bright={star.stars >= 10000}
					href="https://github.com/Lissy93/{star.name}"
					aria-label="{star.title}, {describe(star)}"
					style:--x="{star.x}%"
					style:--y="{star.y}%"
					style:--d="{star.d.toFixed(2)}px"
					style:--c={star.tone}
					style:--rank={star.rank}
					onpointerenter={(event) => show(star, event.currentTarget)}
					onpointerleave={hide}
					onfocus={(event) => show(star, event.currentTarget)}
					onblur={hide}
				></a>
			{:else}
				<span
					class="star"
					aria-hidden="true"
					style:--x="{star.x}%"
					style:--y="{star.y}%"
					style:--d="{star.d.toFixed(2)}px"
					style:--c={star.tone}
					style:--rank={star.rank}
				></span>
			{/if}
		{/each}

		{#each shapes as { label, top } (label)}
			<span
				class="era"
				aria-hidden="true"
				style:left="calc({top.x}% + 0.7rem)"
				style:top="calc({top.y}% - 1.7rem)"
			>
				{label}
			</span>
		{/each}

		{#each ticks as year (year)}
			<span class="year" aria-hidden="true" style:left="{xOf(year)}%">{year}</span>
		{/each}

		<div
			class="tip"
			class:shown={pointed}
			class:with-logo={pointed?.star.logo}
			aria-hidden="true"
			bind:this={tip}
			style:left="{pointed?.left ?? 0}px"
			style:top="{pointed?.top ?? 0}px"
		>
			{#if pointed?.star.logo}<img src={pointed.star.logo} alt="" width="24" height="24" />{/if}
			<strong>{pointed?.star.title}</strong>
			<span>{pointed ? describe(pointed.star) : ''}</span>
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
		inline-size: clamp(2.25rem, 4.5vw, 3.75rem);
	}

	.field {
		position: relative;
		block-size: clamp(19rem, 32vw, 27rem);
		margin-inline: var(--edge);
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

	.era,
	.year {
		position: absolute;
		color: oklch(100% 0 0 / 0.58);
		font-size: var(--text-2xs);
		font-weight: var(--weight-semibold);
		letter-spacing: 0.12em;
		white-space: nowrap;
		pointer-events: none;
	}

	.year {
		inset-block-end: var(--space-sm);
		translate: -50% 0;
		font-variant-numeric: tabular-nums;
	}

	.star {
		--size: calc(var(--d) * 2.6);

		position: absolute;
		inset-inline-start: var(--x);
		inset-block-start: var(--y);
		display: grid;
		place-items: center;
		inline-size: max(var(--size), 0.9rem);
		aspect-ratio: 1;
		translate: -50% -50%;
		border-radius: var(--radius-full);
		color: var(--c);

		&::before {
			content: '';
			inline-size: var(--size);
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

		&:is(a) {
			inline-size: max(var(--size), 1.75rem);
		}

		&:is(a:hover, a:focus-visible)::before {
			scale: 1.35;
		}
	}

	/* the brightest few get diffraction spikes, like a telescope photo */
	.bright::after {
		content: '';
		position: absolute;
		inline-size: calc(var(--d) * 5.5);
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

	.legend {
		position: absolute;
		inset-block-start: 0;
		inset-inline-start: 0;
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: oklch(100% 0 0 / 0.7);
		font-size: var(--text-2xs);
		font-weight: var(--weight-semibold);

		span {
			display: inline-flex;
			align-items: center;
			gap: 0.35rem;
		}

		i {
			inline-size: var(--d);
			aspect-ratio: 1;
			border-radius: var(--radius-full);
			background: var(--star);
		}
	}

	.tip {
		position: absolute;
		z-index: 1;
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		column-gap: var(--space-xs);
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

	/* the stars come out as the sky scrolls into view, brightest first, as they do at dusk */
	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.star,
			.lines,
			.era {
				animation-timing-function: var(--ease-out);
				animation-fill-mode: backwards;
				animation-timeline: --sky;
			}

			.star {
				animation-name: come-out;
				animation-range: entry min(calc(10% + var(--rank) * 0.5%), 60%) entry
					min(calc(40% + var(--rank) * 0.5%), 95%);
			}

			.lines,
			.era {
				animation-name: fade-in;
				animation-range: entry 70% entry 100%;
			}
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
