<script lang="ts">
	import Wordmark from '$components/Wordmark.svelte';
	import { site } from '$lib/config';
	import { photo } from '$lib/content';
	import { collapse, hero, trackFold } from '$lib/hero.svelte';
</script>

<div class="band masthead" class:leaving={hero.leaving} {@attach trackFold}>
	<div class="wrap">
		<div class="intro">
			<h1 {@attach collapse}><Wordmark /></h1>
			<p>{site.tagline}</p>
		</div>
		<img src={photo} alt={site.name} width="720" height="1080" fetchpriority="high" />
	</div>
</div>

<style>
	/* stops the photo widening the page as it slides off */
	.masthead {
		overflow-x: clip;
	}

	.wrap {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		gap: var(--space-md);
	}

	/* sized to its column, so the surname never wraps on phones */
	.intro {
		container-type: inline-size;
	}

	h1 {
		font-size: min(var(--text-hero), 27.5cqi);
	}

	p {
		max-inline-size: 24ch;
		margin-block-start: var(--space-lg);
		font-size: var(--text-lede);
		font-weight: var(--weight-medium);
		line-height: var(--leading-snug);
	}

	img {
		--size: clamp(6.5rem, 20vw, 16rem);

		inline-size: var(--size);
		aspect-ratio: 4 / 5;
		border: 0.4rem solid var(--color-on-primary);
		border-radius: calc(var(--size) * 0.17);
		background: var(--color-on-primary);
		object-fit: cover;
		object-position: 50% 20%;
		transition-property: opacity, translate, scale;
		transition-duration: var(--duration-page);
		transition-timing-function: var(--ease-in-out);
	}

	/* the photo slides off as soon as you start scrolling */
	.leaving img {
		opacity: 0;

		@media (prefers-reduced-motion: no-preference) {
			translate: 60% 0;
			scale: 0.8;
		}
	}

	/* on wider screens the name shrinks into the bar as you scroll */
	@supports (animation-timeline: view()) and (timeline-scope: --band) {
		@media (prefers-reduced-motion: no-preference) and (width >= 40rem) {
			h1 {
				position: relative;
				z-index: var(--layer-hero);
				transform-origin: 0 0;
				animation-name: collapse, hand-over;
				animation-timing-function: linear, step-end;
				animation-fill-mode: both;
				animation-timeline: --band;
				animation-range: exit-crossing;
			}

			p {
				transition: opacity var(--duration-page) var(--ease-out);
			}

			.leaving p {
				opacity: 0;
			}
		}
	}

	@keyframes collapse {
		to {
			translate: var(--collapse-x, 0) var(--collapse-y, 0);
			scale: var(--collapse-scale, 1);
		}
	}

	@keyframes hand-over {
		to {
			opacity: 0;
		}
	}
</style>
