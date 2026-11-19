<script lang="ts">
	import { page } from '$app/state';
	import { hasCard, pages } from '$lib/me/pages';
	import { site } from '$lib/me/site';

	let {
		title,
		description = site.description,
		schema
	}: { title?: string; description?: string; schema?: Record<string, unknown> } = $props();

	let heading = $derived(title ? `${title} · ${site.name}` : site.name);
	let url = $derived(new URL(page.url.pathname, site.url).href);

	/* pages listed in $lib/me/pages get their own share card, the rest use the site's */
	function cardFor(path: string) {
		if (!hasCard(path)) return site.image;

		const listed = pages[path];
		return { src: `/og${path}.png`, alt: `${listed.title}: ${listed.description}` };
	}

	let card = $derived(cardFor(page.url.pathname));
	let image = $derived(new URL(card.src, site.url).href);

	let data = $derived({
		'@context': 'https://schema.org',
		name: heading,
		description,
		url,
		...schema
	});

	/* escape < so data can't break out, split the end tag so svelte doesn't see it */
	let json = $derived(JSON.stringify(data).replaceAll('<', '\\u003c'));
	let ld = $derived(`<script type="application/ld+json">${json}</${'script'}>`);
</script>

<svelte:head>
	<title>{heading}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:title" content={heading} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={card.alt} />
	<meta name="twitter:card" content="summary_large_image" />
	{#if schema}
		{@html ld}
	{/if}
</svelte:head>
