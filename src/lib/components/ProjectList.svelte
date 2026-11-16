<script lang="ts">
	import NewTab from '$components/NewTab.svelte';
	import ProjectMeta from '$components/ProjectMeta.svelte';
	import Stars from '$components/Stars.svelte';
	import { sourceUrl } from '$lib/projects';
	import type { Project } from '$lib/types';

	let {
		projects,
		compact = false,
		meta = !compact
	}: { projects: Project[]; compact?: boolean; meta?: boolean } = $props();

	let size = $derived(compact ? 32 : 40);
</script>

<ul role="list" class:compact>
	{#each projects as project (project.repo)}
		<li>
			<a class="row" href={sourceUrl(project)} target="_blank" rel="external noopener">
				{#if project.logo}
					<img class="mark" src={project.logo} alt="" width={size} height={size} loading="lazy" />
				{:else}
					<span class="mark letter" aria-hidden="true">{project.name.slice(0, 1)}</span>
				{/if}
				<span class="title">{project.name}<NewTab /></span>
				<Stars count={project.stars} />
				{#if project.blurb}<span class="blurb">{project.blurb}</span>{/if}
				{#if meta}<ProjectMeta {project} />{/if}
			</a>
		</li>
	{/each}
</ul>

<style>
	/* rows flow into as many columns as fit */
	ul {
		--row-width: 30rem;
		--mark: 2.5rem;

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--row-width)), 1fr));
	}

	.compact {
		--row-width: 19rem;
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

	a {
		display: grid;
		grid-template-columns: var(--mark) minmax(0, 1fr) auto;
		align-items: center;
		align-content: start;
		gap: var(--space-3xs) var(--space-md);
		block-size: 100%;

		@media (hover: hover) {
			&:hover .mark {
				scale: var(--grow-scale);
			}
		}

		.blurb {
			grid-column: 2 / -1;
		}

		> :global(.meta) {
			grid-column: 2 / -1;
			margin-block-start: var(--space-2xs);
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
		background: var(--color-secondary-container);
		color: var(--color-on-secondary-container);
		font-family: var(--font-display);
		font-weight: var(--weight-heavy);
	}
</style>
