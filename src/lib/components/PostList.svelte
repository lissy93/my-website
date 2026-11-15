<script lang="ts" module>
	const day = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' });
</script>

<script lang="ts">
	import NewTab from '$components/NewTab.svelte';
	import type { Post } from '$lib/types';

	let { posts }: { posts: Post[] } = $props();
</script>

<ol role="list">
	{#each posts as post (post.url)}
		<li>
			<a class="row" href={post.url} target="_blank" rel="external noopener">
				<span class="title">{post.title}<NewTab /></span>
				<span class="when">
					<time datetime={post.date}>{day.format(new Date(post.date))}</time> on {post.source}
				</span>
				{#if post.blurb}<span class="blurb">{post.blurb}</span>{/if}
			</a>
		</li>
	{/each}
</ol>

<style>
	a {
		display: grid;
		gap: var(--space-3xs) var(--space-lg);
		overflow-wrap: anywhere;

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
		text-wrap: balance;
	}

	.when {
		color: var(--color-text-muted);
		font-size: var(--text-xs);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
</style>
