<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import type { Link } from '$lib/types';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let { label, href, ...rest }: Link & HTMLAnchorAttributes = $props();

	/* site paths go through the router, web links open in a new tab */
	let internal = $derived(href.startsWith('/'));
	let offsite = $derived(href.startsWith('http'));
</script>

{#if internal}
	<a href={resolve(href as Pathname)} {...rest}>{label}</a>
{:else}
	<a {href} target={offsite ? '_blank' : undefined} rel="external noopener" {...rest}>
		{label}{#if offsite}<span class="visually-hidden">, opens in a new tab</span>{/if}
	</a>
{/if}
