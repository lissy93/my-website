<script lang="ts">
	import { page } from '$app/state';
	import PageHeader from '$lib/bits-and-bobs/PageHeader.svelte';
	import Seo from '$lib/for-the-robots/Seo.svelte';

	let status = $derived(String(page.status));
	let message = $derived(
		page.status === 404 ? 'This page doesn’t exist, or it’s moved.' : page.error?.message
	);
	const home = [{ label: 'Go to the homepage', href: '/' }];
</script>

<Seo title={status} />
<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<PageHeader title={status} links={home}>{message}</PageHeader>
