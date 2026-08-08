<script lang="ts" module>
	const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
</script>

<script lang="ts">
	let { count }: { count: number } = $props();
</script>

<!-- Nothing to boast about at zero, so we just leave it off. -->
{#if count > 0}
	<span class="count">
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path
				d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
			/>
		</svg>
		{compact.format(count)}
		<span class="visually-hidden">stars</span>
	</span>
{/if}

<style>
	.count {
		display: flex;
		align-items: center;
		gap: var(--space-2xs);
		font-variant-numeric: tabular-nums;

		svg {
			inline-size: 0.9em;
			fill: currentcolor;
		}
	}
</style>
