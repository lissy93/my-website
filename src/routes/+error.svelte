<script lang="ts">
	import { page } from '$app/state';
	import Hero from '$components/Hero.svelte';
	import Seo from '$components/Seo.svelte';

	let status = $derived(String(page.status));
</script>

<Seo title={status} />

<Hero title={status} --hero-size="clamp(5rem, 22vw, 9rem)">
	<p>{page.status === 404 ? 'This page doesn’t exist, or it’s moved.' : page.error?.message}</p>
</Hero>

<style>
	p {
		max-inline-size: 30ch;
		color: var(--color-text-muted);
		font-size: var(--text-lg);
		text-wrap: balance;
	}
</style>
