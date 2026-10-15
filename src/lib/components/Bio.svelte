<script lang="ts">
	import SocialLinks from '$components/SocialLinks.svelte';
	import { site } from '$lib/config';
	import { bio, photo } from '$lib/content';
</script>

<div class="bio">
	<div class="prose">
		{#each bio as line (line)}
			<p>{line}</p>
		{/each}
	</div>

	<div class="me">
		<img src={photo} alt={site.name} width="720" height="1080" decoding="async" />
		<SocialLinks />
	</div>
</div>

<style>
	.bio {
		display: grid;
		gap: var(--space-xl);
	}

	p {
		color: var(--color-text-muted);
		text-wrap: pretty;
	}

	p:first-child {
		color: var(--color-text);
		font-size: var(--text-xl);
		line-height: var(--leading-snug);
	}

	.me {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}

	img {
		inline-size: 4.5rem;
		aspect-ratio: 4 / 5;
		border: var(--border-thin) solid var(--color-border);
		border-radius: var(--radius-md);
		object-fit: cover;
		object-position: 50% 20%;
	}

	@media (width >= 48rem) {
		.bio {
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: start;
			gap: var(--space-2xl);
		}

		.me {
			flex-direction: column;
			align-items: start;
			gap: var(--space-sm);
		}

		img {
			inline-size: 9.5rem;
			border-radius: var(--radius-lg);
		}
	}
</style>
