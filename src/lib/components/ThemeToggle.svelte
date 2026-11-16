<script lang="ts">
	import { moonIcon, sunIcon } from '$lib/icons';
	import { theme } from '$lib/theme.svelte';

	/* the bar has room for it on wider screens, and the footer takes it on narrow ones */
	let { place }: { place: 'bar' | 'footer' } = $props();
</script>

<button
	type="button"
	class="toggle press {place}"
	role="switch"
	aria-checked={theme.dark}
	aria-label="Dark theme"
	onclick={theme.toggle}
>
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path class="sun" d={sunIcon} />
		<path class="moon" d={moonIcon} />
	</svg>
</button>

<style>
	.toggle {
		display: grid;
		flex: none;
		place-items: center;
		inline-size: 2rem;
		block-size: 2rem;
		border: 0;
		border-radius: var(--radius-full);
		padding: 0;
		background: transparent;
		color: inherit;
		cursor: pointer;
		transition:
			background-color var(--duration-fast) var(--ease-out),
			color var(--duration-fast) var(--ease-out),
			var(--spring-back);

		@media (hover: hover) {
			&:hover {
				background: color-mix(in oklch, currentcolor 12%, transparent);
			}
		}
	}

	svg {
		inline-size: 1.25rem;
		block-size: 1.25rem;
		fill: currentcolor;
	}

	/* driven by the theme in use rather than by script, so it's right before the page loads */
	path {
		transform-box: view-box;
		transform-origin: center;
	}

	.sun {
		opacity: calc(1 - var(--dark));
		rotate: calc(var(--dark) * 90deg);
		scale: calc(1 - var(--dark) / 2);
	}

	.moon {
		opacity: var(--dark);
		rotate: calc((var(--dark) - 1) * 90deg);
		scale: calc(0.5 + var(--dark) / 2);
	}

	/* the sun spins away as the moon springs in */
	@media (prefers-reduced-motion: no-preference) {
		path {
			transition:
				opacity var(--duration-base) var(--ease-out),
				rotate var(--duration-release) var(--ease-spring),
				scale var(--duration-release) var(--ease-spring);
		}
	}

	.bar {
		@media (width < 28rem) {
			display: none;
		}
	}

	.footer {
		color: var(--color-text-muted);

		@media (hover: hover) {
			&:hover {
				color: var(--color-primary-text);
			}
		}

		@media (width >= 28rem) {
			display: none;
		}
	}
</style>
