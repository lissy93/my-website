<script lang="ts">
	import '../app.css';
	import wordmark from '$lib/fonts/chopic-3d.woff2?url';
	import { page } from '$app/state';
	import Footer from '$components/Footer.svelte';
	import Nav from '$components/Nav.svelte';
	import { analytics } from '$lib/config';

	let { children } = $props();
	let isHome = $derived(page.route.id === '/');
</script>

<svelte:head>
	<link rel="preload" href={wordmark} as="font" type="font/woff2" crossorigin="anonymous" />
	{#if analytics}
		<script defer data-domain={analytics.domain} src={analytics.script}></script>
	{/if}
</svelte:head>

<a class="visually-hidden" href="#main">Skip to content</a>
{#if !isHome}
	<Nav />
{/if}
<main id="main" class="wrap">
	{@render children()}
</main>
<Footer />

<style>
	main {
		flex: 1;
		padding-block: var(--space-2xl) var(--space-3xl);
	}
</style>
