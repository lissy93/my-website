<script lang="ts">
	import { resolve } from '$app/paths';
	import SmartLink from '$components/SmartLink.svelte';
	import { footer, site } from '$lib/config';

	const year = new Date().getFullYear();
	const years = footer.since === year ? `${year}` : `${footer.since}–${year}`;
</script>

<footer>
	<div class="wrap">
		<div class="brand">
			<a class="name" href={resolve('/')}>{site.name}</a>
			<p>{site.tagline}</p>
		</div>

		{#each footer.groups as { title, links } (title)}
			{@const id = `footer-${title.toLowerCase()}`}
			<nav aria-labelledby={id}>
				<h2 {id}>{title}</h2>
				<ul role="list">
					{#each links as item (item.href)}
						<li><SmartLink {...item} /></li>
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

	.brand {
		grid-column: 1 / -1;
		display: grid;
		align-content: start;
		gap: var(--space-xs);

		p {
			max-inline-size: 30ch;
			color: var(--color-text-muted);
			line-height: var(--leading-snug);
		}
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

		&:hover {
			color: var(--color-primary-text);
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
			text-decoration: none;

			&:hover {
				color: var(--color-primary-text);
				text-decoration: underline;
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
