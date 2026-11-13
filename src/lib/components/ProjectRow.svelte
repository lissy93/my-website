<script lang="ts">
	import NewTab from '$components/NewTab.svelte';
	import ProjectMeta from '$components/ProjectMeta.svelte';
	import Stars from '$components/Stars.svelte';
	import { sourceUrl } from '$lib/projects';
	import type { Project } from '$lib/types';

	let {
		project,
		compact = false,
		meta = true
	}: { project: Project; compact?: boolean; meta?: boolean } = $props();

	let size = $derived(compact ? 32 : 40);
</script>

<li>
	<a class:compact href={sourceUrl(project)} target="_blank" rel="external noopener">
		{#if project.logo}
			<img class="mark" src={project.logo} alt="" width={size} height={size} loading="lazy" />
		{:else}
			<span class="mark letter" aria-hidden="true">{project.name.slice(0, 1)}</span>
		{/if}
		<span class="name">{project.name}<NewTab /></span>
		<Stars count={project.stars} />
		{#if project.blurb}<span class="blurb">{project.blurb}</span>{/if}
		{#if meta}<ProjectMeta {project} />{/if}
	</a>
</li>

<style>
	a {
		--mark: 2.5rem;

		display: grid;
		grid-template-columns: var(--mark) minmax(0, 1fr) auto;
		align-items: center;
		align-content: start;
		column-gap: var(--space-md);
		row-gap: var(--space-3xs);
		block-size: 100%;
		padding: var(--space-sm) var(--card-padding);
		color: inherit;
		text-decoration: none;
		transition: background-color var(--duration-fast) var(--ease-out);

		@media (hover: hover) {
			&:hover {
				background: var(--state-hover);

				.mark {
					scale: var(--grow-scale);
				}
			}
		}

		&:active {
			background: var(--state-press);
		}

		&:focus-visible {
			outline-offset: calc(var(--focus-ring) * -1);
		}

		.blurb {
			grid-column: 2 / -1;
		}

		> :global(.meta) {
			grid-column: 2 / -1;
			margin-block-start: var(--space-2xs);
		}
	}

	.compact {
		--mark: 2rem;

		.blurb {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			overflow: hidden;
			font-size: var(--text-sm);
		}
	}

	.mark {
		grid-row: 1 / span 3;
		align-self: start;
		inline-size: var(--mark);
		block-size: var(--mark);
		object-fit: contain;
		transition: scale var(--duration-fast) var(--ease-out);
	}

	.letter {
		display: grid;
		place-items: center;
		border-radius: var(--radius-md);
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
		font-family: var(--font-display);
		font-weight: var(--weight-heavy);
	}

	.name {
		font-weight: var(--weight-semibold);
		font-size: var(--text-lg);
		line-height: var(--leading-snug);
	}

	.blurb {
		color: var(--color-text-muted);
		font-size: var(--text-md);
		line-height: var(--leading-snug);
	}
</style>
