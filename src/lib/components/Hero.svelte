<script lang="ts">
	import { resolve } from '$app/paths';
	import { heroLinks, site } from '$lib/config';

	let mx = $state(0);
	let my = $state(0);

	/* Pointer offset from the centre of the viewport, -1 to 1. */
	const track = ({ clientX, clientY }: PointerEvent) => {
		mx = (clientX / innerWidth) * 2 - 1;
		my = (clientY / innerHeight) * 2 - 1;
	};
</script>

<svelte:window onpointermove={track} />

<section class="hero" style="--mx: {mx}; --my: {my}">
	<h1>{site.name}</h1>

	<nav aria-label="Sections">
		{#each heroLinks as { href, label } (href)}
			<a href={resolve(href)}>{label}</a>
		{/each}
	</nav>
</section>

<style>
	.hero {
		position: relative;
		isolation: isolate;
		display: grid;
		place-content: center;
		justify-items: center;
		gap: var(--space-lg);
		min-block-size: max(13rem, 30svh);
		margin-block-end: clamp(2rem, 6vw, 4.5rem);
		text-align: center;
	}

	/* Full-bleed accent wash; the box overshoots so the gradient fades out before it clips. */
	.hero::before {
		content: '';
		position: absolute;
		inset-block: -8rem -14rem;
		inset-inline: calc(50% - 50vw - 9rem);
		z-index: -1;
		pointer-events: none;
		background: radial-gradient(
			50rem 28rem at 50% 32%,
			oklch(from var(--accent-500) l c h / 0.2),
			transparent 70%
		);
	}

	h1 {
		font-family: var(--font-wordmark);
		font-weight: var(--weight-normal);
		font-size: clamp(2.25rem, 9vw, 5rem);
		line-height: 1.05;
		letter-spacing: 0.01em;
		text-wrap: balance;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-sm) var(--space-2xl);
	}

	nav a {
		position: relative;
		padding-block: var(--space-2xs);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		font-weight: var(--weight-medium);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		text-decoration: none;
	}

	nav a::after {
		content: '';
		position: absolute;
		inset-inline: 0;
		bottom: 0;
		height: var(--border-thick);
		background: var(--color-accent);
		scale: 0 1;
		transition: scale var(--duration-base) var(--ease-out);
	}

	nav a:hover {
		color: var(--color-text);
	}

	nav a:hover::after {
		scale: 1 1;
	}

	/* Drift the whole layer, never the gradient's own position, so it composites instead of repainting. */
	@media (prefers-reduced-motion: no-preference) and (pointer: fine) {
		.hero::before {
			translate: calc(var(--mx, 0) * 4rem) calc(var(--my, 0) * 2rem);
			transition: translate var(--duration-slow) var(--ease-out);
			will-change: translate;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		h1 {
			animation: rise var(--duration-slower) var(--ease-out) backwards;
		}

		nav {
			animation: rise var(--duration-slower) var(--ease-out) var(--duration-base) backwards;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: 0 0.75rem;
		}
	}
</style>
