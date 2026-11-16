<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import archivo from '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url';
	import figtree from '@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2?url';
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import { analytics } from '$lib/config';
	import { pageTransition, watchSwipes } from '$lib/page-transition';
	import { theme } from '$lib/theme.svelte';

	let { children } = $props();

	$effect(watchSwipes);
	$effect(theme.watch);
	onNavigate(pageTransition);
</script>

<svelte:head>
	{#each [archivo, figtree] as font (font)}
		<link rel="preload" href={font} as="font" type="font/woff2" crossorigin="anonymous" />
	{/each}
	{#if analytics}
		<script defer data-domain={analytics.domain} src={analytics.script}></script>
	{/if}
</svelte:head>

<a class="skip chip" href="#main">Skip to content</a>
<Header />
<main id="main">
	{@render children()}
</main>
<Footer />

<style>
	.skip {
		position: absolute;
		inset: var(--space-md) auto auto var(--space-md);
		z-index: var(--layer-skip);
		translate: 0 -200%;

		&:focus {
			translate: 0;
		}
	}

	main {
		flex: 1;
	}
</style>
