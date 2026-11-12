<script lang="ts">
	import PageHeader from '$components/PageHeader.svelte';
	import PostList from '$components/PostList.svelte';
	import Section from '$components/Section.svelte';
	import Seo from '$components/Seo.svelte';
	import { feeds, site } from '$lib/config';

	let { data } = $props();

	const subscribe = feeds.map(({ source, url }) => ({ label: `${source} RSS`, href: url }));

	let schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: `Blog · ${site.name}`,
		url: `${site.url}/blog`,
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: data.total,
			itemListElement: data.years
				.flatMap(([, posts]) => posts)
				.map((post, position) => ({
					'@type': 'ListItem',
					position: position + 1,
					url: post.url,
					name: post.title
				}))
		}
	});
</script>

<Seo
	title="Blog"
	description="Notes, guides and write-ups on security, privacy, self-hosting, Linux and web development, by Alicia Sykes."
	{schema}
/>

<PageHeader
	title="Blog"
	lede="Notes, guides and the odd rant. Some of it lands on my blog, some on Dev.to, and this page pulls the lot together."
	links={subscribe}
/>

<div class="wrap page">
	{#each data.years as [year, posts] (year)}
		<Section title={year} flush>
			<PostList {posts} />
		</Section>
	{:else}
		<p>Can’t reach the feeds right now. Try them directly with the links above.</p>
	{/each}
</div>
