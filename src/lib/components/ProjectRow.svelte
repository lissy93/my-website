<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import Stars from '$components/Stars.svelte';
	import { repoUrl } from '$lib/content';
	import type { Project } from '$lib/types';

	let { project }: { project: Project } = $props();
</script>

<li>
	<a href={repoUrl(project.repo)} target="_blank" rel="external noopener">
		{#if project.logo}
			<img class="mark" src={project.logo} alt="" width="40" height="40" loading="lazy" />
		{:else}
			<span class="mark" aria-hidden="true">{project.name.slice(0, 1)}</span>
		{/if}
		<span class="name">{project.name}</span>
		<span class="rule"></span>
		<span class="stars"><Stars count={project.stars} /></span>
		<span class="desc">{project.blurb}</span>
		<span class="meta"><Meta {project} /></span>
		<span class="visually-hidden">opens in a new tab</span>
	</a>
</li>

<style>
	a {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		column-gap: var(--space-sm);
		row-gap: var(--space-2xs);
		margin-inline: calc(var(--space-sm) * -1);
		border-radius: var(--radius-md);
		padding: var(--space-md) var(--space-sm);
		color: inherit;
		text-decoration: none;
		transition: background var(--duration-fast) var(--ease-out);

		.mark {
			grid-area: 1 / 1 / 4 / 2;
			align-self: start;
			inline-size: 2.5rem;
			block-size: 2.5rem;
			border-radius: var(--radius-md);
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
			align-self: center;
			font-family: var(--font-display);
			font-size: var(--text-lg);
			font-weight: var(--weight-medium);
			letter-spacing: var(--tracking-tight);
			transition: color var(--duration-base) var(--ease-out);
		}

		.rule {
			display: none;
		}

		.desc {
			grid-area: 2 / 2;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}

		.stars,
		.meta {
			grid-row: 3;
			grid-column: 2;
		}

		.stars {
			justify-self: end;
			font-size: var(--text-xs);
			letter-spacing: var(--tracking-wide);
			transition: color var(--duration-base) var(--ease-out);
		}

		.meta {
			justify-self: start;
		}

		&:hover {
			background: var(--color-bg-alt);

			.name,
			.stars,
			span.mark {
				color: var(--color-accent-hover);
			}

			.rule {
				border-color: var(--color-border-strong);
			}
		}

		@media (width >= 40rem) {
			grid-template-columns: auto auto minmax(var(--space-lg), 1fr) auto;
			align-items: center;
			column-gap: var(--space-md);

			.rule {
				display: block;
				grid-area: 1 / 3;
				border-top: var(--border-thin) solid var(--color-border);
				transition: border-color var(--duration-base) var(--ease-out);
			}

			.stars {
				grid-area: 1 / 4;
			}

			.desc {
				grid-area: 2 / 2 / 3 / 5;
			}

			.meta {
				grid-column: 2 / 5;
			}
		}
	}
</style>
