<script lang="ts">
	import { site } from '$lib/config';

	const [first, ...rest] = site.name.split(' ');
</script>

<span>{first}</span> <span>{rest.join(' ')}</span>

<style>
	/* one name per line, so the hero and the bar's wordmark match */
	span {
		display: block;
		font-family: var(--font-display);
		font-weight: var(--weight-black);
		font-stretch: var(--stretch-display);
		letter-spacing: var(--tracking-display);
		line-height: var(--leading-display);
	}
</style>
