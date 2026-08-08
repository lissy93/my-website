<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { footer, site } from '$lib/config';
	import type { FooterLink } from '$lib/types';

	const year = new Date().getFullYear();
	const years = footer.since === year ? `${year}` : `${footer.since}–${year}`;
</script>

{#snippet link({ label, href }: FooterLink)}
	{#if href.startsWith('/')}
		<a href={resolve(href as Pathname)}>{label}</a>
	{:else}
		<a {href} target="_blank" rel="external noopener">
			{label}<span class="visually-hidden">, opens in a new tab</span>
		</a>
	{/if}
{/snippet}

<footer>
	<div class="wrap">
		<div class="top">
			<div class="brand">
				<a class="wordmark" href={resolve('/')}>{site.name}</a>
				<p>{footer.tagline}</p>
			</div>

			{#each footer.groups as { title, links } (title)}
				{@const id = `footer-${title.toLowerCase()}`}
				<nav aria-labelledby={id}>
					<h2 {id}>{title}</h2>
					<ul role="list">
						{#each links as item (item.href)}
							<li>{@render link(item)}</li>
						{/each}
					</ul>
				</nav>
			{/each}
		</div>

		<div class="legal">
			<small>&copy; {years} {site.name}</small>
			<small>
				Website {@render link({ label: 'source on GitHub', href: footer.legal.sourceLink })}
				is licensed under {@render link({ label: 'MIT', href: footer.legal.licenseLink })}
			</small>
		</div>
	</div>
</footer>

<style>
	footer {
		margin-block-start: auto;
		border-block-start: var(--border-thin) solid var(--color-border);
		/* Warm the rule where it meets the page edge, echoing the hero's accent wash. */
		border-image: linear-gradient(90deg, var(--color-accent), var(--color-border) 30%) 1;
		padding-block: var(--space-2xl) var(--space-xl);
		font-size: var(--text-sm);
	}

	.top {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2xl) var(--space-md);
	}

	.brand {
		display: grid;
		flex: 1 1 100%;
		align-content: start;
		gap: var(--space-xs);

		p {
			color: var(--color-text-muted);
			line-height: var(--leading-snug);
			text-wrap: balance;
		}
	}

	.wordmark {
		justify-self: start;
		color: var(--color-text);
		font-family: var(--font-wordmark);
		font-size: var(--text-xl);
		text-decoration: none;

		&:hover {
			color: var(--color-accent);
		}
	}

	nav {
		flex: 1 1 5rem;

		h2 {
			margin-block-end: var(--space-sm);
			font-size: var(--text-xs);
			letter-spacing: var(--tracking-wide);
			text-transform: uppercase;
		}

		ul {
			display: grid;
			gap: var(--space-2xs);
		}

		a {
			text-decoration: none;
		}
	}

	a:not(.wordmark) {
		color: var(--color-text-muted);

		&:hover {
			color: var(--color-text);
		}
	}

	.legal {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--space-2xs) var(--space-lg);
		margin-block-start: var(--space-xl);
		color: var(--color-text-muted);
		font-size: var(--text-xs);
		small {
			font-size: inherit;
		}
	}

	@media (width >= 52rem) {
		.top {
			flex-wrap: nowrap;
			justify-content: space-between;
			gap: var(--space-2xl);
		}

		.brand {
			flex: 0 1 20rem;
		}

		nav {
			flex: 0 0 auto;
		}
	}
</style>
