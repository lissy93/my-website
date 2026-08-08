<script lang="ts" module>
	const thisYear = new Date().getFullYear();
</script>

<script lang="ts">
	import { calendarIcon, langColors, langIcons, licenseIcon } from '$lib/icons';
	import type { Project } from '$lib/types';

	let { project }: { project: Project } = $props();

	/* Anything touched this year is still going; a year that stands alone doesn't need repeating. */
	let to = $derived(project.to && project.to < thisYear ? project.to : 'present');
	let years = $derived(project.from === to ? `${project.from}` : `${project.from}–${to}`);
</script>

{#snippet fact(icon: string | undefined, label: string)}
	{#if icon}<svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon} /></svg>{/if}
	{label}
{/snippet}

<span class="line">
	{#if project.lang}
		<span class="lang" style="--brand: {langColors[project.lang] ?? 'var(--color-accent-hover)'}">
			{@render fact(langIcons[project.lang], project.lang)}
		</span>
	{/if}
	<span>{@render fact(calendarIcon, years)}</span>
	{#if project.license}<span>{@render fact(licenseIcon, project.license)}</span>{/if}
</span>

<style>
	.line {
		display: flex;
		align-items: center;
		gap: var(--fact-gap, var(--space-sm));
		color: var(--color-text-muted);
		font-size: var(--text-2xs);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		white-space: nowrap;

		span {
			display: flex;
			align-items: center;
			gap: var(--space-3xs);
		}

		svg {
			inline-size: 1.15em;
			fill: currentcolor;
		}

		/* Supporting marks hold their space but fade out wherever a parent sets --fact-icons. */
		span svg {
			opacity: var(--fact-icons, 1);
			transition: opacity var(--duration-base) var(--ease-out);
		}

		.lang {
			transition: color var(--duration-base) var(--ease-out);
		}
	}

	/* Keep each brand's hue, but pull its lightness into a band this theme can actually read. */
	:global(a:hover) .lang {
		color: oklch(from var(--brand) clamp(var(--brand-l-min), l, var(--brand-l-max)) c h);
	}
</style>
