<script lang="ts">
	import PageHeader from '$components/PageHeader.svelte';
	import PostList from '$components/PostList.svelte';
	import Section from '$components/Section.svelte';
	import Seo from '$components/Seo.svelte';
	import { feeds } from '$lib/config';
	import { blogPost, collection } from '$lib/schema';

	let { data } = $props();

	const subscribe = feeds.map(({ source, url }) => ({ label: `${source} RSS`, href: url }));

	const description =
		'Notes, guides and write-ups on security, privacy, self-hosting, Linux ' +
		'and web development, by Alicia Sykes.';

	let schema = $derived(collection(data.years.flatMap(([, posts]) => posts.map(blogPost))));
</script>

<Seo title="Blog" {description} {schema} />

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
