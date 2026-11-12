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
		<span class="title">{post.title}</span>
		<span class="when">
			<time datetime={post.date}>{formatter.format(new Date(post.date))}</time> on {post.source}
		</span>
		{#if post.blurb}<span class="blurb">{post.blurb}</span>{/if}
		<span class="visually-hidden">, opens in a new tab</span>
	</a>
</li>

<style>
	a {
		display: grid;
		gap: var(--space-3xs) var(--space-lg);
		padding: var(--space-sm) var(--card-padding);
		color: inherit;
		overflow-wrap: anywhere;
		text-decoration: none;
		transition: background var(--duration-fast) var(--ease-out);

		&:hover {
			background: var(--state-hover);
		}

		&:active {
			background: var(--state-press);
		}

		&:focus-visible {
			outline-offset: calc(var(--focus-ring) * -1);
		}

		@media (width >= 40rem) {
			grid-template-columns: minmax(0, 1fr) auto;

			.when {
				grid-area: 1 / 2;
				padding-block-start: 0.2em;
			}

			.blurb {
				grid-column: 1 / -1;
			}
		}
	}

	.title {
		font-weight: var(--weight-semibold);
		font-size: var(--text-lg);
		line-height: var(--leading-snug);
		text-wrap: balance;
	}

	.when {
		color: var(--color-text-muted);
		font-size: var(--text-xs);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.blurb {
		color: var(--color-text-muted);
		font-size: var(--text-md);
		line-height: var(--leading-snug);
	}
</style>
