<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import Nav from '$components/Nav.svelte';
	import ThemeToggle from '$components/ThemeToggle.svelte';
	import Wordmark from '$components/Wordmark.svelte';
	import { site } from '$lib/config';
	import { hero } from '$lib/hero.svelte';

	let home = $derived(page.route.id === '/');
</script>

<header class="band" data-bar class:home class:tucked={home && !hero.folded}>
	<div class="wrap">
		<a class="brand press" href={resolve('/')} aria-label={site.name}>
			<img class="icon" src={asset('/favicon.svg')} alt="" width="36" height="36" />
			<span class="wordmark" data-wordmark><Wordmark /></span>
		</a>
		<Nav />
		<ThemeToggle place="bar" />
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

		/* keeps the nav beside the theme toggle on the right */
		> :global(nav) {
			margin-inline-start: auto;
		}
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
		/* the shadow waits until the band, or on the homepage the whole first screen, has gone */
		header {
			animation-name: lift;
			animation-fill-mode: both;
			animation-timeline: --band;
			animation-range: exit-crossing 100% exit-crossing calc(100% + 1.5rem);
		}

		.home {
			animation-timeline: --landing;
		}

		/* the name swaps in the moment the hero's one lands */
		@media (prefers-reduced-motion: no-preference) {
			.home .wordmark {
				animation: take-over step-end both;
				animation-timeline: --band;
				animation-range: exit-crossing;
			}
		}

		/* and on desktop the nav does once its big copy below the hero lands */
		@media (width >= 56rem) {
			.home .wrap > :global(nav) {
				animation: take-over step-end both;
				animation-timeline: --landing;
				animation-range: exit-crossing;
			}
		}
	}

	/* without scroll-driven animation, the nav fades in with the logo instead */
	@supports not (animation-timeline: view()) {
		@media (width >= 56rem) {
			.wrap > :global(nav) {
				transition:
					visibility var(--duration-base),
					opacity var(--duration-base) var(--ease-out);
			}

			.tucked .wrap > :global(nav) {
				visibility: hidden;
				opacity: 0;
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
			visibility: hidden;
		}
	}
</style>
