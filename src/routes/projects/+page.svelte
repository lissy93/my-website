<script lang="ts">
	import PageHeader from '$lib/bits-and-bobs/PageHeader.svelte';
	import Section from '$lib/bits-and-bobs/Section.svelte';
	import SmartLink from '$lib/bits-and-bobs/SmartLink.svelte';
	import Seo from '$lib/for-the-robots/Seo.svelte';
	import { collection, sourceCode } from '$lib/for-the-robots/schema';
	import { pages } from '$lib/me/pages';
	import { screenUrl } from '$lib/me/projects';
	import { forges } from '$lib/me/site';
	import FeaturedProject from '$lib/show-and-tell/FeaturedProject.svelte';
	import ProjectList from '$lib/show-and-tell/ProjectList.svelte';
	import type { Featured } from '$lib/types';

	let { data } = $props();

	const [github, codeberg] = forges.map(({ name, url }) => ({ label: name, href: url }));

	/* stars rounded down, so it never claims more than there are */
	const compact = new Intl.NumberFormat('en', { notation: 'compact', roundingMode: 'floor' });
	const { title, description: about } = pages['/projects'];
	let description = $derived(
		data.stars
			? about.replace(/\.$/, `, with ${compact.format(data.stars)} stars on GitHub.`)
			: about
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

<Seo {title} {description} {schema} />

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
