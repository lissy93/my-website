<script lang="ts" module>
	const thisYear = new Date().getFullYear();
</script>

<script lang="ts">
	import { calendarIcon, langColors, langIcons, licenseIcon } from '$lib/icons';
	import type { Project } from '$lib/types';

	let { project }: { project: Project } = $props();

	/* updated this year counts as ongoing */
	let to = $derived(project.to && project.to < thisYear ? project.to : 'now');
	let years = $derived(
		project.from && (project.from === to ? `${project.from}` : `${project.from}–${to}`)
	);
</script>

{#snippet fact(label: string, icon?: string, color?: string)}
	<span style:--icon-color={color}>
		{#if icon}<svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon} /></svg>{/if}
		{label}
	</span>
{/snippet}

<span class="meta">
	{#if project.lang}
		{@render fact(project.lang, langIcons[project.lang], langColors[project.lang])}
	{/if}
	{#if years}{@render fact(years, calendarIcon)}{/if}
	{#if project.license}{@render fact(project.license, licenseIcon)}{/if}
</span>

<style>
	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3xs) var(--space-md);
		color: var(--color-text-muted);
		font-size: var(--text-xs);
		font-variant-numeric: tabular-nums;

		span {
			display: flex;
			align-items: center;
			gap: var(--space-2xs);
		}
	}

	/* brand colour eased towards the text so it reads on both themes, oklab keeps the hue */
	svg {
		inline-size: 1.1em;
		fill: color-mix(in oklab, var(--icon-color, currentcolor) 70%, var(--color-text));
	}
</style>
