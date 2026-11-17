<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Glyph from '$lib/bits-and-bobs/Glyph.svelte';
	import { navIcons } from '$lib/bits-and-bobs/icons';
	import { nav } from '$lib/me/site';
	import Hero from './Hero.svelte';
	import { dockInto } from './hero.svelte';

	let pages: HTMLElement;

	/* the big link you follow flies into the bar as the next page's current-page pill */
	onNavigate(({ to }) => {
		if (getComputedStyle(pages).visibility === 'hidden') return;
		const link = [...pages.querySelectorAll('a')].find((a) => a.pathname === to?.url.pathname);
		link?.style.setProperty('view-transition-name', 'nav-pill');
	});
</script>

<!-- the hero, then a big copy of the bar's nav that shrinks into it as you scroll -->
<div class="landing">
	<Hero />
	<div class="strip">
		<div class="wrap">
			<nav
				class="dock"
				aria-label="Pages"
				bind:this={pages}
				{@attach dockInto('[data-bar] nav', '.landing')}
			>
				{#each nav as { href, label } (href)}
					<a class="chip" href={resolve(href)}>
						<Glyph path={navIcons[label]} />{label}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</div>

<style>
	/* the first screen, which the nav's copy crosses as it leaves */
	.landing {
		view-timeline: --landing;
		view-timeline-inset: var(--bar-height) 0;
	}

	.strip {
		display: none;
	}

	/* on desktop a strip under the band fills the rest of the screen */
	@media (width >= 56rem) {
		.landing {
			display: grid;
			grid-template-rows: auto 1fr;
			min-block-size: calc(100svh - var(--bar-height));
			background: var(--color-surface);
		}

		.strip {
			display: flex;
			align-items: center;
			padding-block: var(--space-xl);
		}
	}

	/* the bar's chips zoomed up, so it shrinks onto them exactly */
	nav {
		--landed: hidden;
		--zoom: 2;

		display: flex;
		gap: calc(var(--space-xs) * var(--zoom));
		margin-inline: auto;
		animation-timeline: --landing;

		/* bigger on tall screens, so they don't get lost in the strip */
		@media (width >= 72rem) and (height >= 58rem) {
			--zoom: 2.25;
		}
	}

	/* tonal and squarer than the bar's, zoomed one by one so the nav's movement isn't */
	.chip {
		--chip-bg: var(--color-secondary-container);

		zoom: var(--zoom);
		border-radius: calc(var(--radius-xs) / var(--zoom));
		background: var(--chip-bg);

		/* so the focus ring stays as thin as everywhere else */
		&:focus-visible {
			outline-width: calc(var(--focus-ring) / var(--zoom));
			outline-offset: calc(2px / var(--zoom));
		}
	}

	@media (hover: hover) {
		.chip:hover {
			background: var(--color-primary);
			box-shadow: none;
			color: var(--color-on-primary);

			&::selection {
				background: var(--color-surface);
			}
		}
	}

	/* as the first screen leaves, the links turn into the bar's chips */
	@supports (animation-timeline: view()) and (timeline-scope: --band) {
		@media (prefers-reduced-motion: no-preference) {
			.chip {
				animation: to-chip var(--ease-settle) both;
				animation-timeline: --landing;
				animation-range: exit-crossing;
			}
		}
	}

	/* registered so it can animate, while hover still sets the background directly */
	@property --chip-bg {
		syntax: '<color>';
		inherits: false;
		initial-value: transparent;
	}

	@keyframes to-chip {
		to {
			--chip-bg: var(--color-surface);
			border-radius: var(--radius-sm);
		}
	}
</style>
