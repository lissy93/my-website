<script lang="ts">
	import SocialLinks from '$components/SocialLinks.svelte';
	import { bio } from '$lib/content';

	const [lead, ...rest] = bio;
</script>

<div class="bio">
	<p class="lead">{lead}</p>
	<div class="rest">
		{#each rest as line (line)}
			<p>{line}</p>
		{/each}
		<SocialLinks />
	</div>
</div>

<style>
	.bio {
		grid-column: 1 / -1;
		display: grid;
		gap: var(--space-lg);
		padding-block-end: clamp(0.5rem, 2vw, 1.5rem);
	}

	p {
		max-inline-size: 62ch;
		color: var(--color-text-muted);
		text-wrap: pretty;
	}

	.lead {
		max-inline-size: 38ch;
		color: var(--color-text);
		font-size: var(--text-intro);
		font-weight: var(--weight-medium);
		line-height: var(--leading-snug);
	}

	.rest {
		display: grid;
		align-content: start;
		gap: var(--space-lg);
	}

	@media (width >= 56rem) {
		.bio {
			grid-template-columns: 7fr 5fr;
			gap: clamp(1.5rem, 4vw, 4rem);
		}
	}
</style>
