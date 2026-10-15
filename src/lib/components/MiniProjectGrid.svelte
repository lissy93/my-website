<script lang="ts">
	import MiniProjectTile from '$components/MiniProjectTile.svelte';
	import type { Project } from '$lib/types';

	let { projects, blurb = false }: { projects: Project[]; blurb?: boolean } = $props();
</script>

<ul role="list">
	{#each projects as project (project.repo)}
		<MiniProjectTile {project} {blurb} />
	{/each}
</ul>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
		gap: var(--space-xs);
		margin-inline: calc(var(--space-sm) * -1);
	}
</style>
