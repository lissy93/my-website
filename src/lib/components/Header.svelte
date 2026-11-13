<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import Nav from '$components/Nav.svelte';
	import Wordmark from '$components/Wordmark.svelte';
	import { site } from '$lib/config';
	import { hero } from '$lib/hero.svelte';

	let home = $derived(page.route.id === '/');
</script>

<header class="band" data-bar class:home class:tucked={home && !hero.folded}>
	<div class="wrap">
		<a class="brand press" href={resolve('/')} aria-label={site.name}>
			<img class="icon" src={asset('/favicon.svg')} alt="" width="36" height="36" />
			<span class="wordmark" data-collapse-to><Wordmark /></span>
		</a>
		<Nav />
	</div>
</header>

<style>
	header {
		position: sticky;
		inset-block-start: 0;
		z-index: var(--layer-bar);
		view-transition-name: bar;
	}

	.wrap {
		container-type: inline-size;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		block-size: var(--bar-height);
	}

	.brand {
		flex: none;
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: inherit;
		text-decoration: none;
		transition:
			visibility var(--duration-fast),
			var(--spring-back);
	}

	.icon {
		transition:
			opacity var(--duration-fast) var(--ease-out),
			var(--spring-back),
			rotate var(--duration-release) var(--ease-spring);
	}

	/* a mini copy of the hero's name, for it to shrink into */
	.wordmark {
		font-size: 1.125rem;

		@media (width < 40rem) {
			display: none;
		}
	}

	/* on the homepage, the logo hides until the hero has folded away */
	.tucked {
		.brand {
			visibility: hidden;
		}

		.icon {
			opacity: 0;
			transition-duration: var(--duration-fast);
			transition-timing-function: var(--ease-out);

			@media (prefers-reduced-motion: no-preference) {
				scale: 0.4;
				rotate: -20deg;
			}
		}
	}

	@supports (animation-timeline: view()) and (timeline-scope: --band) {
		/* the shadow waits until the pink band has gone */
		header {
			animation-name: lift;
			animation-fill-mode: both;
			animation-timeline: --band;
			animation-range: exit-crossing 100% exit-crossing calc(100% + 1.5rem);
		}

		/* the name swaps in the moment the hero's one lands */
		@media (prefers-reduced-motion: no-preference) {
			.home .wordmark {
				animation-name: take-over;
				animation-timing-function: step-end;
				animation-fill-mode: both;
				animation-timeline: --band;
				animation-range: exit-crossing;
			}
		}
	}

	@keyframes lift {
		from {
			box-shadow: none;
		}

		to {
			box-shadow: var(--shadow-2);
		}
	}

	@keyframes take-over {
		from {
			opacity: 0;
		}
	}
</style>
