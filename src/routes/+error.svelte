<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Seo from '$components/Seo.svelte';
</script>

<Seo title={String(page.status)} />

<div class="prose">
	<h1>{page.status}</h1>
	<p>{page.error?.message}</p>
	<p><a href={resolve('/')}>Back home</a></p>
</div>
