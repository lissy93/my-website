<script lang="ts">
	import PostList from '$lib/bits-and-bobs/PostList.svelte';
	import Section from '$lib/bits-and-bobs/Section.svelte';
	import Seo from '$lib/for-the-robots/Seo.svelte';
	import Bio from '$lib/front-door/Bio.svelte';
	import Landing from '$lib/front-door/Landing.svelte';
	import { photo } from '$lib/me/bio';
	import { socials } from '$lib/me/site';
	import ProjectList from '$lib/show-and-tell/ProjectList.svelte';

	let { data } = $props();

	const schema = {
		'@type': 'Person',
		image: photo,
		jobTitle: 'Software engineer',
		sameAs: socials.map((social) => social.href)
	};
</script>

<Seo {schema} />

<Landing />

<div class="wrap page">
	<Bio />

	<Section title="Projects" href="/projects" action="All projects" flush wide={!data.posts.length}>
		<ProjectList projects={data.projects} />
	</Section>

	{#if data.posts.length}
		<Section title="Writing" href="/blog" action="All posts" flush>
			<PostList posts={data.posts} />
		</Section>
	{/if}

	<Section title="Mini apps" flush wide>
		<ProjectList projects={data.miniProjects} compact />
	</Section>
</div>

<style>
	@media (width >= 56rem) {
		.page {
			grid-template-columns: 7fr 5fr;
			align-items: start;
		}
	}
</style>
