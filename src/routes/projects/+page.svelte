<script lang="ts">
	import MiniProjectGrid from '$components/MiniProjectGrid.svelte';
	import ProjectList from '$components/ProjectList.svelte';
	import Section from '$components/Section.svelte';
	import Seo from '$components/Seo.svelte';
	import { forges, site } from '$lib/config';
	import { repoUrl } from '$lib/content';

	let { data } = $props();

	let schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: `Projects · ${site.name}`,
		url: `${site.url}/projects`,
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: data.featured.length + data.rest.length,
			itemListElement: [...data.featured, ...data.rest].map((project, position) => ({
				'@type': 'ListItem',
				position: position + 1,
				url: repoUrl(project.repo),
				name: project.name
			}))
		}
	});
</script>

<Seo
	title="Projects"
	description="Open source apps, tools and experiments by Alicia Sykes, covering security, privacy, self-hosting and web development."
	{schema}
/>

<div class="projects">
	<header class="prose">
		<h1>Projects</h1>
		<p>
			Pretty much everything I've built and open sourced. The featured ones are what I actually
			maintain, the rest is a mix of small tools, old experiments and things I made just to learn
			something.
		</p>
		<p class="forges">
			<span>It all lives on:</span>
			{#each forges as { name, url } (name)}
				<a href={url} target="_blank" rel="external noopener">
					{name}<span class="visually-hidden">, opens in a new tab</span>
				</a>
			{/each}
		</p>
	</header>

	<Section title="Featured">
		<ProjectList projects={data.featured} />
	</Section>

	{#if data.rest.length}
		<Section title="Everything else">
			<MiniProjectGrid projects={data.rest} blurb />
		</Section>
	{/if}
</div>

<style>
	.projects {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--space-xl);
	}

	.forges {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
</style>
