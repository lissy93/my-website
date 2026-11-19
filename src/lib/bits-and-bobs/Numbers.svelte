<script lang="ts" module>
	const compact = new Intl.NumberFormat('en', {
		notation: 'compact',
		maximumSignificantDigits: 3
	});
	const short = (value: number) => compact.format(value).replace('K', 'k');
</script>

<script lang="ts">
	import type { Stat } from '$lib/types';
	import NewTab from './NewTab.svelte';

	let { stats }: { stats: Stat[] } = $props();
</script>

<ul role="list">
	{#each stats as stat (stat.label)}
		<li>
			<a class="row" href={stat.href} target="_blank" rel="external noopener">
				<data class="value" value={stat.value}>{short(stat.value)}</data>
				<span>
					<span class="title">{stat.label}</span>
					{#if stat.detail}<span class="blurb">{stat.detail}</span>{/if}
				</span>
				<NewTab arrow={false} />
			</a>
		</li>
	{/each}
</ul>

<style>
	a {
		display: grid;
		grid-template-columns: 6rem minmax(0, 1fr);
		align-items: baseline;
		gap: var(--space-md);
	}

	.value {
		color: var(--color-primary-text);
		font-family: var(--font-display);
		font-size: var(--text-2xl);
		font-weight: var(--weight-heavy);
		font-stretch: var(--stretch-heading);
		font-variant-numeric: tabular-nums;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-tight);
	}

	.title,
	.blurb {
		display: block;
	}
</style>
