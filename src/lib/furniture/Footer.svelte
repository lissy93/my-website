<script lang="ts">
	import { resolve } from '$app/paths';
	import SmartLink from '$lib/bits-and-bobs/SmartLink.svelte';
	import { footer, site } from '$lib/me/site';
	import Stargazer from '$lib/stargazing/Stargazer.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const year = new Date().getFullYear();
	const years = footer.since === year ? `${year}` : `${footer.since}–${year}`;

	/* a four-pointed sparkle, one unit from its middle to each tip */
	const sparkle = 'M0-1Q0 0 1 0Q0 0 0 1Q0 0-1 0Q0 0 0-1Z';
</script>

<footer>
	<div class="wrap">
		<div class="brand">
			<a class="name" href={resolve('/')}>{site.name}</a>
			<ThemeToggle place="footer" />
			<div class="tagline">
				<!-- the sparkles sit just above the dino, drawn in his own coordinates -->
				<span class="dino" aria-hidden="true">
					<svg class="sparkles" viewBox="-6 -5.5 64 15">
						<path d={sparkle} transform="translate(51.5 0) scale(4.5)" />
						<path d={sparkle} transform="translate(40.5 -3) scale(2.25)" />
					</svg>
					<Stargazer />
				</span>
				<p>{site.tagline}</p>
			</div>
		</div>

		{#each footer.groups as { title, links } (title)}
			{@const id = `footer-${title.toLowerCase()}`}
			<nav aria-labelledby={id}>
				<h2 {id}>{title}</h2>
				<ul role="list">
					{#each links as item (item.href)}
						<li><SmartLink {...item} arrow /></li>
					{/each}
				</ul>
			</nav>
		{/each}

		<div class="legal">
			<small>&copy; {years} {site.name}</small>
			<small>
				Website <SmartLink label="source on GitHub" href={footer.legal.sourceLink} />
				is licensed under <SmartLink label="MIT" href={footer.legal.licenseLink} />
			</small>
		</div>
	</div>
</footer>

<style>
	footer {
		margin-block-start: auto;
		padding-block: var(--space-2xl) var(--space-lg);
		background: var(--color-surface);
		box-shadow: var(--shadow-1);
		font-size: var(--text-sm);
	}

	.wrap {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
		gap: var(--space-xl) var(--space-lg);
	}

	/* the name shares its row with the theme toggle, on screens too narrow for it in the bar */
	.brand {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: 1fr auto;
		align-content: start;
		align-items: center;
		gap: var(--space-xs);
	}

	.tagline {
		grid-column: 1 / -1;
		display: flex;
		align-items: center;
		gap: var(--space-sm);

		p {
			max-inline-size: 30ch;
			color: var(--color-text-muted);
			line-height: var(--leading-snug);
		}
	}

	.dino {
		flex: none;
		inline-size: 3.5rem;
	}

	.sparkles {
		display: block;
		inline-size: 100%;
		fill: light-dark(var(--ink-900), #ffc845);
	}

	.name {
		justify-self: start;
		color: var(--color-text);
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: var(--weight-heavy);
		font-stretch: var(--stretch-display);
		letter-spacing: var(--tracking-tight);
		text-decoration: none;

		@media (hover: hover) {
			&:hover {
				color: var(--color-primary-text);
			}
		}
	}

	h2 {
		margin-block-end: var(--space-sm);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: var(--weight-semibold);
		font-stretch: normal;
		letter-spacing: normal;
	}

	ul {
		display: grid;
		gap: var(--space-2xs);
	}

	nav,
	.legal {
		:global(a) {
			color: var(--color-text-muted);
			text-decoration-color: transparent;

			@media (hover: hover) {
				&:hover {
					color: var(--color-primary-text);
					text-decoration-color: currentcolor;
				}
			}
		}
	}

	.legal {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--space-2xs) var(--space-lg);
		padding-block-start: var(--space-lg);
		border-block-start: var(--border-thin) solid var(--color-border);
		color: var(--color-text-muted);
		font-size: var(--text-xs);

		small {
			font-size: inherit;
		}
	}

	@media (width >= 52rem) {
		.wrap {
			grid-template-columns: minmax(0, 2fr) repeat(3, minmax(0, 1fr));
		}

		.brand {
			grid-column: auto;
		}
	}
</style>
