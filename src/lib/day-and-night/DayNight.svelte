<script lang="ts" module>
	import { langColors, langIcons, licenseIcon, moonIcon, sunIcon } from '$lib/bits-and-bobs/icons';
	import { seeded } from '$lib/bits-and-bobs/random';
	import type { Job, Night } from '$lib/types';
	import { jobSpan } from './dates';

	/* a bare year counts as January for a job, and July for a night entry */
	const start = (when: string) => (when.length === 4 ? `${when}-01` : when);
	const middle = (when: string) => (when.length === 4 ? `${when}-07` : when);

	/* puts each night beside the latest job that had started by then */
	function besideJobs(jobs: Job[], nights: Night[]) {
		const rows = jobs
			.toSorted((a, b) => start(b.from).localeCompare(start(a.from)))
			.map((job) => ({ job, nights: [] as Night[] }));
		const earlier: Night[] = [];

		for (const night of nights) {
			const row = rows.find(({ job }) => start(job.from) <= middle(night.when));
			(row?.nights ?? earlier).push(night);
		}

		return { rows, earlier };
	}

	const year = (night: Night) => night.when.slice(0, 4);

	/* each year's newest entry, marking only every other year in a quiet run */
	function yearMarks(nights: Night[]) {
		const newestOfYear = nights.filter(
			(night, i) => i === 0 || year(night) !== year(nights[i - 1])
		);
		let quietBefore = false;

		return newestOfYear.filter((night) => {
			const quiet = nights.filter((other) => year(other) === year(night)).length === 1;
			const marked = !(quiet && quietBefore);
			quietBefore = quiet && marked;
			return marked;
		});
	}

	const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

	const glyphs = {
		work: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z',
		course: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z',
		award:
			'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
		win: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z',
		press:
			'M22 3l-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3zM11 19H4v-6h7v6zm9 0h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4H4V8h16v3z',
		trending: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
		flag: 'M14.4 6 14 4H5v17h2v-7h5.6l.4 2h7V6z',
		code: 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'
	};

	const nightGlyph = {
		award: glyphs.award,
		win: glyphs.win,
		press: glyphs.press,
		trending: glyphs.trending,
		milestone: glyphs.flag,
		launch: glyphs.code
	};

	type Speck = { x: number; y: number; r: number; glow: number; tint: string };

	/* mostly white, with the odd pink or yellow star */
	function tint(roll: number) {
		if (roll < 0.07) return 'pink';
		if (roll < 0.12) return 'sun';
		return '';
	}

	/* an uneven scatter, where the brighter stars are a touch bigger too */
	function scatter(count: number): Speck[] {
		const roll = seeded('by night');

		return Array.from({ length: count }, () => {
			const glow = roll();
			return {
				x: roll() * 100,
				y: roll() * 100,
				r: 0.5 + glow * 0.8,
				glow: 0.12 + glow * 0.45,
				tint: tint(roll())
			};
		});
	}

	const panelStars = scatter(110);
	const cardStars = scatter(28);
</script>

<script lang="ts">
	import { asset } from '$app/paths';
	import NewTab from '$lib/bits-and-bobs/NewTab.svelte';
	import { endOfLine, jobs, lanes, reserves } from '$lib/me/about';

	/* newest first */
	let { nights }: { nights: Night[] } = $props();

	let { rows, earlier } = $derived(besideJobs(jobs, nights));
	let marks = $derived(yearMarks(nights));
</script>

{#snippet glyph(path: string)}
	<svg viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg>
{/snippet}

{#snippet lane(path: string)}
	<svg class="lane" viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg>
{/snippet}

{#snippet starfield(stars: Speck[], where: string)}
	<svg class="starfield {where}" aria-hidden="true">
		{#each stars as star, i (i)}
			<circle
				class={star.tint}
				cx="{star.x.toFixed(2)}%"
				cy="{star.y.toFixed(2)}%"
				r={star.r.toFixed(2)}
				fill-opacity={star.glow.toFixed(2)}
			/>
		{/each}
	</svg>
{/snippet}

{#snippet mark(logo: string | undefined, fallback: string, tile?: string)}
	<span class="mark" style:background={tile}>
		{#if logo}
			<img src={logo} alt="" width="40" height="40" loading="lazy" />
		{:else}
			{@render glyph(fallback)}
		{/if}
	</span>
{/snippet}

{#snippet nightList(beside: Night[], label: string)}
	<ul class="nights" role="list" aria-label={label}>
		{#each beside as night (night.title)}
			<li class="item" class:marked={marks.includes(night)}>
				{#if marks.includes(night)}
					<span class="year" aria-hidden="true">{year(night)}</span>
				{/if}
				{@render lane(moonIcon)}
				{@render mark(night.logo, nightGlyph[night.kind])}
				<div>
					<p class="title">
						{#if night.href}
							<a href={night.href} target="_blank" rel="external noopener"
								>{night.title}<NewTab arrow={false} /></a
							>
						{:else}
							{night.title}
						{/if}
					</p>
					<p class="meta specs">
						<time datetime={night.when}>{year(night)}</time>
						{#if night.stars}
							<span class="stars">
								{@render glyph(glyphs.award)}{compact.format(night.stars)}
								<span class="visually-hidden">stars</span>
							</span>
						{/if}
						{#if night.lang}
							<span style:--icon-color={langColors[night.lang]}>
								{#if langIcons[night.lang]}{@render glyph(langIcons[night.lang])}{/if}
								{night.lang}
							</span>
						{/if}
						{#if night.license}
							<span>{@render glyph(licenseIcon)}{night.license}</span>
						{/if}
					</p>
					{#if night.note}<p class="note">{night.note}</p>{/if}
				</div>
			</li>
		{/each}
	</ul>
{/snippet}

<section class="lanes" aria-labelledby="lanes">
	<h2 id="lanes" class="visually-hidden">By day and by night</h2>
	{@render starfield(panelStars, 'panel')}

	<div class="head day">
		<img class="dino" src={asset('/dinos/code-review.svg')} alt="" width="64" height="64" />
		<p class="label">{@render glyph(sunIcon)}By day</p>
		<blockquote>{lanes.day}</blockquote>
	</div>
	<div class="head night">
		{@render starfield(cardStars, 'phone')}
		<img class="dino" src={asset('/dinos/late-night-commit.svg')} alt="" width="64" height="64" />
		<p class="label">{@render glyph(moonIcon)}By night</p>
		<blockquote>{lanes.night}</blockquote>
	</div>

	<ol class="chapters" role="list">
		{#each rows as { job, nights: beside } (job.org)}
			<li class="chapter">
				<div class="item job">
					{@render lane(sunIcon)}
					{@render mark(
						job.logo,
						job.role.startsWith('BSc') ? glyphs.course : glyphs.work,
						job.tile
					)}
					<div>
						<h3 class="title">{job.org}</h3>
						<p class="meta">{job.role} · {jobSpan(job)}</p>
						<ul class="highlights">
							{#each job.highlights as highlight (highlight)}
								<li>{highlight}</li>
							{/each}
						</ul>
					</div>
				</div>
				{#if beside.length}{@render nightList(beside, 'By night, meanwhile')}{/if}
			</li>
		{/each}
		<li class="chapter">
			<div class="item job">
				{@render lane(sunIcon)}
				{@render mark(reserves.logo, glyphs.work)}
				<div>
					<h3 class="title">{reserves.org}</h3>
					<p class="meta">
						{jobSpan(reserves)} · {reserves.units[0]} +{reserves.units.length - 1} more
					</p>
					<p class="description">{reserves.description}</p>
				</div>
			</div>
			{#if earlier.length}{@render nightList(earlier, 'By night, before all that')}{/if}
		</li>
	</ol>
	<p class="end" aria-hidden="true">{endOfLine}</p>
</section>

<style>
	.lanes {
		--night: light-dark(var(--ink-900), oklch(12.5% 0.055 var(--hue-ink)));
		--night-text: var(--neutral-dark-100);
		--night-muted: var(--neutral-dark-300);
		--spine: 5.5rem;

		grid-column: 1 / -1;
		position: relative;
		display: grid;
		gap: var(--space-md);
	}

	.head {
		position: relative;
		display: grid;
		align-content: start;
		gap: var(--space-sm);
		border-radius: var(--radius-lg);
		padding: var(--card-padding);

		.dino {
			position: absolute;
			inset: var(--space-sm) var(--space-sm) auto auto;
			inline-size: clamp(3.5rem, 8vw, 5rem);
		}

		.label {
			display: flex;
			align-items: center;
			gap: var(--space-xs);
			font-family: var(--font-display);
			font-size: var(--text-headline);
			font-weight: var(--weight-heavy);
			font-stretch: var(--stretch-heading);
			letter-spacing: var(--tracking-tight);
			line-height: 1;

			svg {
				inline-size: 1em;
				fill: currentcolor;
			}
		}

		blockquote {
			max-inline-size: 46ch;
			padding-inline-end: 4.5rem;
			text-wrap: pretty;
		}
	}

	.head.day {
		background: var(--color-surface);
		box-shadow: var(--shadow-1);

		svg {
			color: var(--color-primary);
		}

		blockquote {
			color: var(--color-text-muted);
		}
	}

	.head.night {
		isolation: isolate;
		background: var(--night);
		color: var(--night-text);

		svg {
			color: var(--primary-300);
		}

		blockquote {
			color: var(--night-muted);
		}
	}

	.chapters {
		display: grid;
		gap: var(--space-lg);
	}

	.chapter {
		display: grid;
		gap: var(--space-sm);
	}

	.year,
	.end {
		color: var(--color-text);
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: var(--weight-heavy);
		font-stretch: var(--stretch-heading);
		font-variant-numeric: tabular-nums;
		letter-spacing: var(--tracking-tight);
		line-height: 1;
	}

	/* stops a short night list stretching to the height of its job */
	.nights {
		display: grid;
		align-content: start;
		gap: var(--space-sm);
	}

	.year {
		position: absolute;
		inset-block-end: 100%;
		inset-inline-start: var(--space-2xs);
		padding-block-end: var(--space-xs);
	}

	.marked {
		margin-block-start: calc(var(--text-xl) + var(--space-md));
	}

	.end {
		display: none;
	}

	.item {
		position: relative;
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		align-items: start;
		gap: var(--space-sm);
		border-radius: var(--radius-md);
		padding: var(--space-sm);
		text-wrap: pretty;

		.mark {
			display: grid;
			place-items: center;
			inline-size: 2.5rem;
			aspect-ratio: 1;
			border-radius: var(--radius-sm);
			overflow: clip;

			img {
				inline-size: 100%;
				block-size: 100%;
				object-fit: contain;
			}

			svg {
				inline-size: 1.35rem;
				fill: currentcolor;
			}
		}

		.title {
			font-family: inherit;
			font-size: var(--text-md);
			font-weight: var(--weight-semibold);
			font-stretch: normal;
			letter-spacing: normal;
			line-height: var(--leading-snug);
		}

		.meta,
		.note,
		.description,
		.highlights {
			font-size: var(--text-sm);
			line-height: var(--leading-snug);
		}

		.meta {
			font-variant-numeric: tabular-nums;
		}

		.note {
			margin-block-start: var(--space-2xs);
		}

		.description {
			margin-block-start: var(--space-xs);
			max-inline-size: 62ch;
		}

		a {
			color: inherit;
			text-decoration-color: color-mix(in oklch, currentcolor 35%, transparent);
		}
	}

	.highlights {
		display: grid;
		gap: var(--space-2xs);
		margin-block-start: var(--space-xs);
		padding-inline-start: 1.1em;
		max-inline-size: 62ch;

		li::marker {
			color: var(--color-primary);
		}
	}

	.job {
		background: var(--color-surface);
		box-shadow: var(--shadow-1);

		.mark {
			background: var(--neutral-0);
			box-shadow: inset 0 0 0 1px var(--color-border);
			color: var(--ink-500);
		}

		.meta,
		.description,
		.highlights {
			color: var(--color-text-muted);
		}
	}

	.nights .item {
		background: var(--night);
		color: var(--night-text);

		.mark {
			background: oklch(100% 0 0 / 0.06);
			color: var(--primary-300);
		}

		.meta {
			color: var(--night-muted);
		}

		.note {
			color: color-mix(in oklab, var(--night-muted) 80%, var(--night));
		}

		.specs {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			column-gap: var(--space-sm);

			> span {
				display: inline-flex;
				align-items: center;
				gap: 0.3em;
			}

			svg {
				inline-size: 1em;
				fill: color-mix(in oklab, var(--icon-color, currentcolor) 60%, var(--night-text));
			}

			.stars svg {
				inline-size: 0.85em;
				fill: #ffc845;
			}
		}

		@media (hover: hover) {
			&:has(a):hover {
				background-color: oklch(100% 0 0 / 0.06);
			}
		}

		:focus-visible {
			outline-color: var(--night-text);
		}
	}

	.starfield {
		position: absolute;
		z-index: -1;
		fill: var(--neutral-dark-100);
		pointer-events: none;
		mask-image: linear-gradient(to right, oklch(0% 0 0 / 0.4), #000 75%);

		.pink {
			fill: var(--primary-300);
		}

		.sun {
			fill: #ffc845;
		}
	}

	.phone {
		inset: 0;
		inline-size: 100%;
		block-size: 100%;
	}

	.panel {
		display: none;
	}

	.lane {
		position: absolute;
		inset: var(--space-sm) var(--space-sm) auto auto;
		inline-size: 1rem;
		fill: currentcolor;
		opacity: 0.55;
	}

	@media (width < 56rem) {
		.item {
			padding-inline-end: 2.25rem;
		}
	}

	@media (width >= 56rem) {
		.lanes {
			grid-template-columns: minmax(0, 1fr) var(--spine) minmax(0, 1fr);
			gap: 0;
			isolation: isolate;

			&::before,
			&::after {
				content: '';
				position: absolute;
				inset-block: 0;
				z-index: -2;
				inline-size: calc((100% - var(--spine)) / 2);
				border-radius: var(--radius-lg);
			}

			&::before {
				inset-inline-start: 0;
				background: var(--color-surface);
				box-shadow: var(--shadow-1);
			}

			&::after {
				inset-inline-end: 0;
				background: var(--night);
			}
		}

		.panel {
			display: block;
			inset-block: 0;
			inset-inline-end: 0;
			inline-size: calc((100% - var(--spine)) / 2);
			block-size: 100%;
		}

		.phone {
			display: none;
		}

		.head {
			padding: calc(var(--card-padding) * 1.5) calc(var(--card-padding) * 1.5) var(--space-md);
		}

		.head.day {
			grid-column: 1;
			background: none;
			box-shadow: none;
		}

		.head.night {
			grid-column: 3;
			background: none;
		}

		.chapters {
			grid-column: 1 / -1;
			position: relative;
			gap: 0;

			&::before {
				content: '';
				position: absolute;
				inset-block: 0;
				inset-inline-start: 50%;
				inline-size: 2px;
				translate: -50% 0;
				background: var(--color-border-field);
				opacity: 0.5;
			}
		}

		.chapter {
			grid-template-columns: minmax(0, 1fr) var(--spine) minmax(0, 1fr);
			gap: 0;
			padding-block: var(--space-md);
			padding-inline: calc(var(--card-padding) * 1.5 - var(--space-sm));
		}

		.year,
		.end {
			border-radius: var(--radius-sm);
			padding: 0.3rem 0.5rem;
			background: var(--color-bg);
		}

		.year {
			inset-block: var(--space-xs) auto;
			inset-inline-start: calc(-1 * (var(--space-md) + var(--spine) / 2));
			translate: -50% 0;
		}

		.marked {
			margin-block-start: 0;
		}

		.end {
			display: block;
			grid-column: 2;
			justify-self: center;
			margin-block-end: var(--space-lg);
		}

		.job {
			grid-column: 1;
			grid-row: 1;
			margin-inline-end: var(--space-md);
			background: none;
			box-shadow: none;
		}

		.nights {
			grid-column: 3;
			grid-row: 1;
			margin-inline-start: var(--space-md);

			.item {
				background: none;
			}
		}

		.lane {
			display: none;
		}
	}

	@media (width >= 56rem) and (height >= 40rem) {
		.job {
			position: sticky;
			inset-block-start: calc(var(--bar-height) + var(--space-md));
			align-self: start;
		}
	}
</style>
