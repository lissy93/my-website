<script lang="ts">
	import PageHeader from '$lib/bits-and-bobs/PageHeader.svelte';
	import PostList from '$lib/bits-and-bobs/PostList.svelte';
	import Section from '$lib/bits-and-bobs/Section.svelte';
	import Seo from '$lib/for-the-robots/Seo.svelte';
	import { blogPost, collection } from '$lib/for-the-robots/schema';
	import { pages } from '$lib/me/pages';
	import { feeds } from '$lib/me/site';

	let { data } = $props();

	const subscribe = feeds.map(({ source, url }) => ({ label: `${source} RSS`, href: url }));

	let schema = $derived(collection(data.years.flatMap(([, posts]) => posts.map(blogPost))));
</script>

<Seo {...pages['/blog']} {schema} />

<PageHeader title="Blog" links={subscribe}>
	Notes, guides and the odd rant. Some of it lands on my blog, some on Dev.to, and this page pulls
	the lot together.
</PageHeader>

<div class="wrap page">
	{#each data.years as [year, posts] (year)}
		<Section title={year} flush>
			<PostList {posts} />
		</Section>
	{:else}
		<p>Can’t reach the feeds right now. Try them directly with the links above.</p>
	{/each}
</div>
