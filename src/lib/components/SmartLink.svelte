<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import NewTab from '$components/NewTab.svelte';
	import type { Link } from '$lib/types';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		label,
		href,
		icon,
		arrow = false,
		...rest
	}: Link & HTMLAnchorAttributes & { icon?: string; arrow?: boolean } = $props();

	/* site paths go through the router, web links open in a new tab */
	let internal = $derived(href.startsWith('/'));
	let offsite = $derived(href.startsWith('http'));
</script>

{#snippet glyph()}
	{#if icon}<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d={icon} /></svg>{/if}
{/snippet}

{#if internal}
	<a href={resolve(href as Pathname)} {...rest}>{@render glyph()}{label}</a>
{:else}
	<a {href} target={offsite ? '_blank' : undefined} rel="external noopener" {...rest}>
		{@render glyph()}{label}{#if offsite}<NewTab {arrow} />{/if}
	</a>
{/if}

<style>
	/* sits on the text like a letter, in the link's colour */
	.icon {
		display: inline-block;
		inline-size: 1.15em;
		block-size: 1.15em;
		margin-inline-end: 0.4em;
		vertical-align: -0.2em;
		fill: currentcolor;
	}
</style>
