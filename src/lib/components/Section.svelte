<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import type { Snippet } from 'svelte';

	let {
		title,
		href,
		action = 'View all',
		children
	}: { title: string; href?: Pathname; action?: string; children: Snippet } = $props();

	let id = $derived(title.toLowerCase().replace(/\W+/g, '-'));
</script>

<section aria-labelledby={id}>
	<div class="head">
		<h2 {id}>{title}</h2>
		{#if href}
			<a href={resolve(href)}>{action}</a>
		{/if}
	</div>
	{@render children()}
</section>

<style>
	.head {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		margin-block-end: var(--space-lg);
	}

	h2 {
		display: flex;
		flex: 1;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--text-sm);
		font-weight: var(--weight-semibold);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
	}

	h2::before {
		content: '';
		flex: none;
		inline-size: var(--space-xs);
		block-size: var(--space-xs);
		background: var(--color-accent);
		rotate: 45deg;
	}

	h2::after {
		content: '';
		flex: 1;
		border-top: var(--border-thin) solid var(--color-border);
	}

	.head a {
		flex: none;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		text-decoration: none;
	}

	.head a:hover {
		color: var(--color-accent);
	}
</style>
