<script lang="ts">
	import PageHeader from '$components/PageHeader.svelte';
	import ProjectList from '$components/ProjectList.svelte';
	import Section from '$components/Section.svelte';
	import Seo from '$components/Seo.svelte';
	import { forges, site } from '$lib/config';
	import { repoUrl } from '$lib/content';

	let { data } = $props();

	const homes = forges.map(({ name, url }) => ({ label: name, href: url }));

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

<PageHeader
	title="Projects"
	lede="Pretty much everything I’ve built and open sourced. The featured ones are what I actually maintain, the rest is small tools, old experiments and things I made to learn something."
	links={homes}
/>

<div class="wrap page">
	<Section title="Featured" flush>
		<ProjectList projects={data.featured} />
	</Section>

	{#if data.rest.length}
		<Section title="Everything else" flush>
			<ProjectList projects={data.rest} compact meta />
		</Section>
	{/if}
</div>
