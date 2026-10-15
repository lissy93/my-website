<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import Stars from '$components/Stars.svelte';
	import { repoUrl } from '$lib/content';
	import type { Project } from '$lib/types';

	let { project, blurb = false }: { project: Project; blurb?: boolean } = $props();
</script>

<li>
	<a href={repoUrl(project.repo)} target="_blank" rel="external noopener">
		{#if project.logo}
			<img class="mark" src={project.logo} alt="" width="32" height="32" loading="lazy" />
		{:else}
			<span class="mark" aria-hidden="true">{project.name.slice(0, 1)}</span>
		{/if}
		<span class="name">{project.name}</span>
		<span class="stars"><Stars count={project.stars} /></span>
		{#if blurb && project.blurb}<span class="desc">{project.blurb}</span>{/if}
		<span class="meta"><Meta {project} /></span>
		<span class="visually-hidden">opens in a new tab</span>
	</a>
</li>

<style>
	a {
		--fact-icons: 0.5;
		--fact-gap: var(--space-xs);

		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-content: start;
		column-gap: var(--space-sm);
		row-gap: var(--space-3xs);
		block-size: 100%;
		border-radius: var(--radius-md);
		padding: var(--space-sm);
		background: var(--color-bg-alt);
		color: inherit;
		text-decoration: none;
		transition: background var(--duration-fast) var(--ease-out);

		.mark {
			grid-area: 1 / 1 / 3 / 2;
			align-self: start;
			inline-size: 2rem;
			block-size: 2rem;
			border-radius: var(--radius-sm);
		}

		img.mark {
			object-fit: contain;
		}

		span.mark {
			display: grid;
			place-items: center;
			background: var(--color-surface-alt);
			color: var(--color-text-muted);
			font-family: var(--font-display);
			font-weight: var(--weight-semibold);
			transition: color var(--duration-base) var(--ease-out);
		}

		.name {
			grid-area: 1 / 2;
			font-family: var(--font-display);
			font-size: var(--text-sm);
			font-weight: var(--weight-medium);
			letter-spacing: var(--tracking-tight);
			transition: color var(--duration-base) var(--ease-out);
		}

		.stars {
			grid-area: 1 / 3;
			font-size: var(--text-xs);
			letter-spacing: var(--tracking-wide);
			transition: color var(--duration-base) var(--ease-out);
		}

		.desc {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			grid-column: 2 / 4;
			overflow: hidden;
			color: var(--color-text-muted);
			font-size: var(--text-xs);
			line-height: var(--leading-snug);
		}

		.meta {
			grid-column: 2 / 4;
		}

		&:hover {
			--fact-icons: 1;

			background: var(--color-surface-alt);

			.name,
			.stars,
			span.mark {
				color: var(--color-accent-hover);
			}
		}
	}
</style>
