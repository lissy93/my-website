<script lang="ts" module>
	const formatter = new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	});
</script>

<script lang="ts">
	import type { Post } from '$lib/types';

	let { post }: { post: Post } = $props();
</script>

<li>
	<a href={post.url} target="_blank" rel="external noopener">
		<span class="when">
			<time datetime={post.date}>{formatter.format(new Date(post.date))}</time>
			<span class="source">{post.source}</span>
		</span>
		<span class="title">{post.title}</span>
		{#if post.blurb}<span class="blurb">{post.blurb}</span>{/if}
		<span class="visually-hidden">opens in a new tab</span>
	</a>
</li>

<style>
	a {
		display: grid;
		gap: var(--space-3xs);
		padding-block: var(--space-md);
		color: inherit;
		overflow-wrap: anywhere;
		text-decoration: none;

		.when {
			display: flex;
			gap: var(--space-sm);
			color: var(--color-text-muted);
			font-size: var(--text-xs);
		}

		time {
			font-variant-numeric: tabular-nums;
			letter-spacing: var(--tracking-wide);
			text-transform: uppercase;
		}

		.title {
			font-family: var(--font-display);
			font-size: var(--text-lg);
			font-weight: var(--weight-medium);
			letter-spacing: var(--tracking-tight);
			line-height: var(--leading-tight);
			text-wrap: balance;
			transition: color var(--duration-base) var(--ease-out);
		}

		.blurb {
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}

		&:hover .title {
			color: var(--color-accent);
		}

		@media (width >= 40rem) {
			grid-template-columns: 8rem minmax(0, 1fr);
			column-gap: var(--space-xl);

			.when {
				grid-area: 1 / 1 / 3 / 2;
				flex-direction: column;
				gap: var(--space-3xs);
				padding-block-start: 0.35em;
			}

			.title,
			.blurb {
				grid-column: 2;
			}
		}
	}
</style>
