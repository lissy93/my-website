<script lang="ts">
	import FeaturedProject from '$components/FeaturedProject.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import ProjectList from '$components/ProjectList.svelte';
	import Section from '$components/Section.svelte';
	import Seo from '$components/Seo.svelte';
	import SmartLink from '$components/SmartLink.svelte';
	import { forges } from '$lib/config';
	import { screenUrl } from '$lib/projects';
	import { collection, sourceCode } from '$lib/schema';
	import type { Featured } from '$lib/types';

	let { data } = $props();

	const [github, codeberg] = forges.map(({ name, url }) => ({ label: name, href: url }));

	/* stars rounded down, so it never claims more than there are */
	const compact = new Intl.NumberFormat('en', { notation: 'compact', roundingMode: 'floor' });
	const about =
		'Open source apps, tools and experiments by Alicia Sykes, ' +
		'covering security, privacy, self-hosting and web development';
	let description = $derived(
		data.stars ? `${about}, with ${compact.format(data.stars)} stars on GitHub.` : `${about}.`
	);

	const cover = (project: Featured) => {
		const id = project.screens.find((shot) => shot.id)?.id;
		return id && screenUrl(id);
	};

	let schema = $derived(
		collection([
			...data.featured.map((project) => sourceCode(project, cover(project))),
			...data.groups.flatMap((group) => group.projects.map((project) => sourceCode(project)))
		])
	);
</script>

<Seo title="Projects" {description} {schema} />

<PageHeader title="Projects">
	I build privacy, security and self-hosting tools. Everything is free and open source on
	<SmartLink {...github} />, and mirrored to <SmartLink {...codeberg} />.
</PageHeader>

<div class="wrap page">
	<section aria-labelledby="featured">
		<h2 id="featured" class="visually-hidden">Featured</h2>
		<ul class="tiles" role="list">
			{#each data.featured as project, index (project.repo)}
				<li><FeaturedProject {project} flip={index % 2 === 1} eager={index === 0} /></li>
			{/each}
		</ul>
	</section>

	{#each data.groups as group (group.title)}
		<Section title={group.title} flush>
			<ProjectList projects={group.projects} compact meta />
		</Section>
	{/each}
</div>

<style>
	.tiles {
		display: grid;
		gap: var(--space-section);
	}
</style>
