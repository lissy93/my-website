<script lang="ts">
	import PageHeader from '$lib/bits-and-bobs/PageHeader.svelte';
	import DayNight from '$lib/day-and-night/DayNight.svelte';
	import Seo from '$lib/for-the-robots/Seo.svelte';

	let { data } = $props();

	const description =
		'What Alicia Sykes has done by day and built by night: jobs from Accenture to loveholidays, ' +
		'alongside Web Check, Dashy, awards and hackathon prizes.';
</script>

<Seo title="Timeline" {description} />

<PageHeader title="Timeline">The main things I’ve got up to over the past 20 years.</PageHeader>

<div class="wrap page">
	<DayNight nights={data.nights} />
</div>
