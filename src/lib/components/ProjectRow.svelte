<script lang="ts">
	import ProjectMeta from '$components/ProjectMeta.svelte';
	import Stars from '$components/Stars.svelte';
	import { repoUrl } from '$lib/content';
	import type { Project } from '$lib/types';

	let {
		project,
		compact = false,
		meta = true
	}: { project: Project; compact?: boolean; meta?: boolean } = $props();

	let size = $derived(compact ? 32 : 40);
</script>

<li>
	<a class:compact href={repoUrl(project.repo)} target="_blank" rel="external noopener">
		{#if project.logo}
			<img class="mark" src={project.logo} alt="" width={size} height={size} loading="lazy" />
		{:else}
			<span class="mark letter" aria-hidden="true">{project.name.slice(0, 1)}</span>
		{/if}
		<span class="name">{project.name}</span>
		<Stars count={project.stars} />
		{#if project.blurb}<span class="blurb">{project.blurb}</span>{/if}
		{#if meta}<ProjectMeta {project} />{/if}
		<span class="visually-hidden">, opens in a new tab</span>
	</a>
</li>

<style>
	a {
		--mark: 2.5rem;

		display: grid;
		grid-template-columns: var(--mark) minmax(0, 1fr) auto;
		align-items: center;
		column-gap: var(--space-md);
		row-gap: var(--space-3xs);
		block-size: 100%;
		padding: var(--space-sm) var(--card-padding);
		color: inherit;
		text-decoration: none;
		transition: background var(--duration-fast) var(--ease-out);

		&:hover {
			background: var(--state-hover);
		}

		&:active {
			background: var(--state-press);
		}

		&:focus-visible {
			outline-offset: calc(var(--focus-ring) * -1);
		}

		.blurb,
		> :global(.meta) {
			grid-column: 2 / -1;
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
