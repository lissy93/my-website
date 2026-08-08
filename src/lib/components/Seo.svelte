<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/config';

	let {
		title,
		description = site.description,
		schema
	}: { title?: string; description?: string; schema?: Record<string, unknown> } = $props();

	let heading = $derived(title ? `${title} · ${site.name}` : site.name);
	let url = $derived(new URL(page.url.pathname, site.url).href);

	/* Escape `<` so the data cannot break out, and split the closing tag so source parsers don't. */
	let ld = $derived(
		`<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</${'script'}>`
	);
</script>

<svelte:head>
	<title>{heading}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:title" content={heading} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	{#if schema}
		{@html ld}
	{/if}
</svelte:head>
