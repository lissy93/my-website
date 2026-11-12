<script lang="ts">
	import { site } from '$lib/config';
	import { photo } from '$lib/content';
</script>

<img src={photo} alt={site.name} width="720" height="1080" fetchpriority="high" />

<style>
	/* a 4:5 portrait with corners that scale with its size, and a white ring */
	img {
		--size: var(--photo-size, 14rem);

		inline-size: var(--size);
		block-size: auto;
		aspect-ratio: 4 / 5;
		border: var(--photo-ring, 0.4rem) solid var(--color-on-primary);
		border-radius: calc(var(--size) * 0.17);
		background: var(--color-on-primary);
		object-fit: cover;
		object-position: 50% 20%;
	}
</style>
