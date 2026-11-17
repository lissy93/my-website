<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Link } from '$lib/types';
	import SmartLink from './SmartLink.svelte';

	/* children is the lede under the title, links become chips below it, aside sits to the right */
	let {
		title,
		links = [],
		children,
		aside
	}: { title: string; links?: Link[]; children?: Snippet; aside?: Snippet } = $props();

	let rows = $derived(1 + Number(Boolean(children)) + Number(links.length > 0));
</script>

<div class="band masthead">
	<div class="wrap" class:split={aside}>
		<h1>{title}</h1>
		{#if children}<p>{@render children()}</p>{/if}
		{#if links.length}
			<ul role="list">
				{#each links as link (link.href)}
					<li><SmartLink class="chip" {...link} /></li>
				{/each}
			</ul>
		{/if}
		{#if aside}<div class="aside" style:grid-row="1 / span {rows}">{@render aside()}</div>{/if}
	</div>
</div>

<style>
	.wrap {
		display: grid;
		justify-items: start;
		gap: var(--space-lg);
	}

	.split {
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: end;

		> :not(.aside) {
			grid-column: 1;
		}
	}

	.aside {
		grid-column: 2;
	}

	h1 {
		font-size: var(--text-title);
		overflow-wrap: anywhere;
	}

	p {
		max-inline-size: 40ch;
		font-size: var(--text-lede);
		font-weight: var(--weight-medium);
		line-height: var(--leading-snug);
		text-wrap: pretty;

		/* pink links would vanish on the pink band */
		:global(a) {
			color: inherit;
		}
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}
</style>
