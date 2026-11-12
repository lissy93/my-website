<script lang="ts">
	import ProfilePhoto from '$components/ProfilePhoto.svelte';
	import { site } from '$lib/config';

	const [first, ...rest] = site.name.split(' ');
	const last = rest.join(' ');
</script>

<div class="band">
	<div class="wrap">
		<div class="intro">
			<h1>{first}<br />{last}</h1>
			<p>{site.tagline}</p>
		</div>
		<ProfilePhoto --photo-size="clamp(6.5rem, 20vw, 16rem)" />
	</div>
</div>

<style>
	.wrap {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		gap: var(--space-md);
		padding-block: clamp(1.5rem, 5vw, 3.5rem) clamp(2rem, 5vw, 4rem);
	}

	h1 {
		font-size: var(--text-hero);
	}

	p {
		max-inline-size: 24ch;
		margin-block-start: var(--space-lg);
		font-size: var(--text-lede);
		font-weight: var(--weight-medium);
		line-height: var(--leading-snug);
	}
</style>
