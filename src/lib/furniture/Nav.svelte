<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Glyph from '$lib/bits-and-bobs/Glyph.svelte';
	import { navIcons } from '$lib/bits-and-bobs/icons';
	import { nav } from '$lib/me/site';
</script>

<nav aria-label="Main">
	{#each nav as { href, label } (href)}
		{@const current = page.route.id?.startsWith(href)}
		<a class="chip" href={resolve(href)} aria-current={current ? 'page' : undefined}>
			{#if current}<span class="pill"></span>{/if}
			<span class="label" style:view-transition-name="nav-{label.toLowerCase()}">
				<Glyph path={navIcons[label]} />{label}
			</span>
		</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		gap: var(--space-xs);
	}

	/* icons only once the bar has room for them */
	@container (width < 40rem) {
		.label :global(.glyph) {
			display: none;
		}
	}

	/* tighter chips on narrow bars, so everything fits on one row */
	@container (width < 22rem) {
		nav {
			gap: 0.375rem;
		}

		.chip {
			padding-inline: 0.55rem;
		}
	}

	@container (width < 19.25rem) {
		nav {
			gap: var(--space-2xs);
		}

		.chip {
			padding-inline: 0.45rem;
			font-size: var(--text-xs);
		}
	}

	.chip {
		position: relative;
		isolation: isolate;

		&[aria-current='page'] {
			color: var(--color-secondary-container);
		}
	}

	.label {
		view-transition-class: nav-label;
	}

	/* the current page marker, which slides between chips */
	.pill {
		position: absolute;
		inset: 0;
		z-index: -1;
		border-radius: inherit;
		background: var(--color-on-secondary-container);
		view-transition-name: nav-pill;
	}
</style>
