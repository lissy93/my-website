<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import Glyph from '$components/Glyph.svelte';
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

	/* site paths go through the router, #links stay on the page, web links open in a new tab */
	let internal = $derived(href.startsWith('/'));
	let onPage = $derived(href.startsWith('#'));
	let offsite = $derived(href.startsWith('http'));
</script>

{#snippet glyph()}
	{#if icon}<Glyph path={icon} />{/if}
{/snippet}

{#if internal}
	<a href={resolve(href as Pathname)} {...rest}>{@render glyph()}{label}</a>
{:else if onPage}
	<a href="#{href.slice(1)}" {...rest}>{@render glyph()}{label}</a>
{:else}
	<a {href} target={offsite ? '_blank' : undefined} rel="external noopener" {...rest}>
		{@render glyph()}{label}{#if offsite}<NewTab {arrow} />{/if}
	</a>
{/if}
