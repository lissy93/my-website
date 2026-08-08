<script lang="ts">
	import Bio from '$components/Bio.svelte';
	import Hero from '$components/Hero.svelte';
	import MiniProjectGrid from '$components/MiniProjectGrid.svelte';
	import PostList from '$components/PostList.svelte';
	import ProjectList from '$components/ProjectList.svelte';
	import Section from '$components/Section.svelte';
	import Seo from '$components/Seo.svelte';
	import { site, socials } from '$lib/config';
	import { photo } from '$lib/content';

	let { data } = $props();

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.name,
		url: site.url,
		image: photo,
		sameAs: socials.map((social) => social.href)
	};
</script>

<Seo {schema} />

<Hero />

<div class="sections">
	<Section title="About" href="/about" action="More about me">
		<Bio />
	</Section>

	<Section title="Projects" href="/projects" action="All projects">
		<ProjectList projects={data.projects} />
	</Section>

	<Section title="Mini Apps">
		<MiniProjectGrid projects={data.miniProjects} />
	</Section>

	{#if data.posts.length}
		<Section title="Writing" href="/blog" action="All posts">
			<PostList posts={data.posts} />
		</Section>
	{/if}
</div>

<style>
	.sections {
		display: grid;
		gap: var(--space-3xl);
	}
</style>
