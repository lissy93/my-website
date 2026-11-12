<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import type { Snippet } from 'svelte';

	let {
		title,
		href,
		action = 'View all',
		flush = false,
		wide = false,
		children
	}: {
		title: string;
		href?: Pathname;
		action?: string;
		/* lists run edge to edge, everything else gets padding */
		flush?: boolean;
		/* spans every column of the page grid */
		wide?: boolean;
		children: Snippet;
	} = $props();

	let id = $derived(title.toLowerCase().replace(/\W+/g, '-'));
</script>

<section class="card" class:flush class:wide aria-labelledby={id}>
	<header>
		<h2 {id}>{title}</h2>
		{#if href}<a class="chip" href={resolve(href)}>{action}</a>{/if}
	</header>
	<div class="body">
		{@render children()}
	</div>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-lg);
		overflow: clip;
		background: var(--color-surface);
		box-shadow: var(--shadow-1);
	}

	.wide {
		grid-column: 1 / -1;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		min-block-size: 3.5rem;
		padding: var(--space-sm) var(--space-sm) var(--space-sm) var(--card-padding);
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
	}

	.body {
		padding: var(--card-padding);
	}

	.flush .body {
		padding-inline: 0;
		padding-block: var(--space-xs);
	}
</style>
