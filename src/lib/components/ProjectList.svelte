<script lang="ts">
	import ProjectRow from '$components/ProjectRow.svelte';
	import type { Project } from '$lib/types';

	let { projects }: { projects: Project[] } = $props();
</script>

<ul role="list">
	{#each projects as project (project.repo)}
		<ProjectRow {project} />
	{/each}
</ul>
