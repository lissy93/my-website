<script lang="ts">
	import DayNight from '$components/DayNight.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import Seo from '$components/Seo.svelte';

	let { data } = $props();
</script>

<Seo
	title="Timeline"
	description="What Alicia Sykes has done by day and built by night: jobs from Accenture to loveholidays, alongside Web Check, Dashy, awards and hackathon prizes."
/>

<PageHeader title="Timeline">The main things I’ve got up to over the past 20 years.</PageHeader>

<div class="wrap page">
	<DayNight nights={data.nights} />
</div>
