<script lang="ts">
	import PostList from '$components/PostList.svelte';
	import Section from '$components/Section.svelte';
	import Seo from '$components/Seo.svelte';
	import { feeds, site } from '$lib/config';

	let { data } = $props();

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

<div class="blog">
	<header class="prose">
		<h1>Blog</h1>
		<p>
			Notes, guides and the odd rant. Some of it lands on my blog, some on Dev.to - this page just
			pulls the lot together.
		</p>
		<p class="feeds">
			<span>
				{data.total
					? `${data.total} posts so far. Subscribe over RSS:`
					: 'Can’t reach the feeds right now. Try them directly:'}
			</span>
			{#each feeds as { source, url } (source)}
				<a href={url} target="_blank" rel="external noopener">
					{source}<span class="visually-hidden">, opens in a new tab</span>
				</a>
			{/each}
		</p>
	</header>

	{#each data.years as [year, posts] (year)}
		<Section title={year}>
			<PostList {posts} />
		</Section>
	{/each}
</div>

<style>
	.blog {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--space-xl);
	}

	.feeds {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
</style>
