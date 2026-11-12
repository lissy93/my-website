<script lang="ts">
	import Bio from '$components/Bio.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import Seo from '$components/Seo.svelte';
</script>

<Seo
	title="About"
	description="Who I am, what I work on, and why everything I build is free and open source."
/>

<PageHeader title="About" />

<div class="wrap page">
	<Bio />
</div>
