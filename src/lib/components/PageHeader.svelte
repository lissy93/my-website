<script lang="ts">
	import SmartLink from '$components/SmartLink.svelte';
	import type { Link } from '$lib/types';

	let { title, lede, links = [] }: { title: string; lede?: string; links?: Link[] } = $props();
</script>

<div class="band">
	<div class="wrap">
		<h1>{title}</h1>
		{#if lede}<p>{lede}</p>{/if}
		{#if links.length}
			<ul role="list">
				{#each links as link (link.href)}
					<li><SmartLink class="chip" {...link} /></li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.wrap {
		display: grid;
		justify-items: start;
		gap: var(--space-lg);
		padding-block: clamp(1.5rem, 5vw, 3rem) clamp(2rem, 5vw, 3.5rem);
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
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}
</style>
