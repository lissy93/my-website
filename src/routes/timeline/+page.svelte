<script lang="ts">
	import PageHeader from '$lib/bits-and-bobs/PageHeader.svelte';
	import DayNight from '$lib/day-and-night/DayNight.svelte';
	import Seo from '$lib/for-the-robots/Seo.svelte';
	import { pages } from '$lib/me/pages';

	let { data } = $props();
</script>

<Seo {...pages['/timeline']} />

<PageHeader title="Timeline">The main things I’ve got up to over the past 20 years.</PageHeader>

<div class="wrap page">
	<DayNight nights={data.nights} />
</div>
