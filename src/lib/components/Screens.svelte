<script lang="ts" module>
	const widths = [512, 1024, 1536];
</script>

<script lang="ts">
	import { screenUrl } from '$lib/projects';
	import type { Featured, Screen } from '$lib/types';

	let { project, eager = false }: { project: Featured; eager?: boolean } = $props();

	/* placeholders without an id stay out until they're uploaded */
	let shots = $derived(project.screens.filter((shot): shot is Required<Screen> => !!shot.id));
	let current = $state(0);
	let track: HTMLElement | undefined = $state();

	const show = (index: number) => track?.scrollTo({ left: index * track.clientWidth });

	const sync = () => {
		if (track?.clientWidth)
			current = Math.min(Math.round(track.scrollLeft / track.clientWidth), shots.length - 1);
	};
</script>

{#if shots.length}
	<div
		class="carousel"
		role="region"
		aria-roledescription="carousel"
		aria-label="{project.name} screenshots"
	>
		<div class="track" bind:this={track} onscroll={sync}>
			{#each shots as shot, index (shot.id)}
				<img
					src={screenUrl(shot.id)}
					srcset={widths.map((width) => `${screenUrl(shot.id, width)} ${width}w`).join(', ')}
					sizes="(width >= 80rem) 42rem, (width >= 56rem) 52vw, 92vw"
					alt={shot.alt}
					width="1536"
					height="960"
					loading={eager && index === 0 ? 'eager' : 'lazy'}
					fetchpriority={eager && index === 0 ? 'high' : 'auto'}
				/>
			{/each}
		</div>
		{#if shots.length > 1}
			<div class="dots">
				{#each shots as shot, index (shot.id)}
					<button
						type="button"
						aria-label="Show screenshot {index + 1}"
						aria-current={index === current}
						onclick={() => show(index)}
					></button>
				{/each}
			</div>
			<p class="visually-hidden" aria-live="polite">
				Screenshot {current + 1} of {shots.length}: {shots[current].alt}
			</p>
		{/if}
	</div>
{:else}
	<div class="soon">
		{#if project.logo}<img src={project.logo} alt="" width="96" height="96" />{/if}
		<p>Screenshots coming soon</p>
	</div>
{/if}

<style>
	.track,
	.soon {
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-2);
	}

	/* one screenshot per view, swiped or scrolled, snapping into place */
	.track {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 100%;
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;

		@media (prefers-reduced-motion: no-preference) {
			scroll-behavior: smooth;
		}

		img {
			inline-size: 100%;
			block-size: auto;
			aspect-ratio: 16 / 10;
			object-fit: cover;
			object-position: top;
			scroll-snap-align: start;
			background: var(--color-surface-sunken);
		}
	}

	/* small dots with full-size tap targets, the current one stretched into a pill */
	.dots {
		display: flex;
		justify-content: center;
		margin-block-start: var(--space-sm);
	}

	button {
		display: grid;
		place-items: center;
		inline-size: 1.75rem;
		block-size: 1.75rem;
		border: 0;
		background: none;
		cursor: pointer;

		&::before {
			content: '';
			inline-size: 0.5rem;
			block-size: 0.5rem;
			border-radius: var(--radius-full);
			background: var(--color-text-muted);

			@media (prefers-reduced-motion: no-preference) {
				transition:
					inline-size var(--duration-base) var(--ease-out),
					background-color var(--duration-fast) var(--ease-out);
			}
		}

		&[aria-current='true']::before {
			inline-size: 1.25rem;
			background: var(--color-text);
		}

		@media (hover: hover) {
			&:hover::before {
				background: var(--color-text);
			}
		}
	}

	.soon {
		display: grid;
		place-content: center;
		justify-items: center;
		gap: var(--space-md);
		aspect-ratio: 16 / 10;
		background: var(--color-surface);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		font-weight: var(--weight-semibold);

		img {
			inline-size: 6rem;
			block-size: 6rem;
			object-fit: contain;
		}
	}
</style>
