<script lang="ts" module>
	import type { Project } from '$lib/types';

	const thisYear = new Date().getFullYear();

	/* updated this year counts as ongoing */
	function yearRange({ from, to }: Project) {
		if (!from) return;
		const single = from === to || from >= thisYear;
		const end = to && to < thisYear ? to : 'now';
		return single ? `${from}` : `${from}–${end}`;
	}
</script>

<script lang="ts">
	import { calendarIcon, langColors, langIcons, licenseIcon } from '$lib/icons';

	let { project }: { project: Project } = $props();

	let years = $derived(yearRange(project));
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

	/* eased towards the text so brand colours read on both themes */
	svg {
		inline-size: 1.1em;
		fill: color-mix(in oklab, var(--icon-color, currentcolor) 70%, var(--color-text));
	}
</style>
