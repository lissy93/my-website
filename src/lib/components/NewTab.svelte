<script lang="ts">
	import { arrowIcon } from '$lib/icons';

	let { arrow = true }: { arrow?: boolean } = $props();
</script>

<!-- &#8288; keeps the arrow on the same line as the last word -->
{#if arrow}
	&#8288;<svg viewBox="0 0 24 24" aria-hidden="true"><path d={arrowIcon} /></svg>
{/if}<span class="visually-hidden">, opens in a new tab</span>

<style>
	/* hidden until its link is hovered or focused, then slides in */
	svg {
		display: inline-block;
		inline-size: 0.8em;
		margin-inline-start: 0.3em;
		vertical-align: -0.05em;
		fill: var(--color-primary-text);
		opacity: 0;
		translate: calc(var(--rise) * -0.4) calc(var(--rise) * 0.4);
		transition:
			opacity var(--duration-fast) var(--ease-out),
			translate var(--duration-fast) var(--ease-out);
	}

	:global(a:focus-visible) svg {
		opacity: 1;
		translate: 0;
	}

	@media (hover: hover) {
		:global(a:hover) svg {
			opacity: 1;
			translate: 0;
		}
	}
</style>
