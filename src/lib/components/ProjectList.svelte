<script lang="ts">
	import ProjectRow from '$components/ProjectRow.svelte';
	import type { Project } from '$lib/types';

	let {
		projects,
		compact = false,
		meta = !compact
	}: { projects: Project[]; compact?: boolean; meta?: boolean } = $props();
</script>

<ul role="list" class:compact>
	{#each projects as project (project.repo)}
		<ProjectRow {project} {compact} {meta} />
	{/each}
</ul>

<style>
	/* rows flow into as many columns as fit */
	ul {
		--row-width: 30rem;

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--row-width)), 1fr));
	}

	.compact {
		--row-width: 19rem;
	}
</style>
