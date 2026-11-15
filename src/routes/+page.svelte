<script lang="ts">
	import Bio from '$components/Bio.svelte';
	import Landing from '$components/Landing.svelte';
	import PostList from '$components/PostList.svelte';
	import ProjectList from '$components/ProjectList.svelte';
	import Section from '$components/Section.svelte';
	import Seo from '$components/Seo.svelte';
	import { socials } from '$lib/config';
	import { photo } from '$lib/content';

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
