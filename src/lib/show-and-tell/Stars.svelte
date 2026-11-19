<script lang="ts" module>
	const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
</script>

<script lang="ts">
	let { count = 0, big = false }: { count?: number; big?: boolean } = $props();

	/* featured tiles spell out the word, everywhere else it's for screen readers */
	let label = $derived(big ? 'label' : 'visually-hidden');
</script>

{#if count > 0}
	<span class="count" class:big>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path
				d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
			/>
		</svg>
		<data value={count}>{compact.format(count)}</data><span class={label}> stars</span>
	</span>
{/if}

<style>
	.count {
		display: flex;
		align-items: center;
		gap: var(--space-2xs);
		color: var(--color-text-muted);
		font-size: var(--text-xs);
		font-weight: var(--weight-semibold);
		font-variant-numeric: tabular-nums;
	}

	svg {
		inline-size: 1.1em;
		fill: var(--color-primary);
	}

	/* the headline number on featured tiles */
	.big {
		align-items: baseline;
		font-size: var(--text-xl);

		svg {
			align-self: center;
		}

		data {
			color: var(--color-text);
			font-family: var(--font-display);
			font-weight: var(--weight-heavy);
			font-stretch: var(--stretch-heading);
			letter-spacing: var(--tracking-tight);
			line-height: var(--leading-tight);
		}
	}

	.label {
		font-size: var(--text-sm);
	}
</style>
