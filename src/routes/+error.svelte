<script lang="ts">
	import { page } from '$app/state';
	import PageHeader from '$components/PageHeader.svelte';
	import Seo from '$components/Seo.svelte';

	let status = $derived(String(page.status));
	let message = $derived(
		page.status === 404 ? 'This page doesn’t exist, or it’s moved.' : page.error?.message
	);
</script>

<Seo title={status} />
<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<PageHeader title={status} lede={message} links={[{ label: 'Go to the homepage', href: '/' }]} />
