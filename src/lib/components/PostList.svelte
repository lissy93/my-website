<script lang="ts">
	import PostRow from '$components/PostRow.svelte';
	import type { Post } from '$lib/types';

	let { posts }: { posts: Post[] } = $props();
</script>

<ol role="list">
	{#each posts as post (post.url)}
		<PostRow {post} />
	{/each}
</ol>
