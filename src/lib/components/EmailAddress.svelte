<script lang="ts">
	import { onMount } from 'svelte';
	import { contact } from '$lib/config';

	const rot13 = (text: string) =>
		text.replace(/[a-z]/g, (letter) =>
			String.fromCharCode(((letter.charCodeAt(0) - 84) % 26) + 97)
		);

	const address = rot13(contact.emailRot13);

	let linked = $state(false);

	onMount(() => {
		linked = true;
	});
</script>

{#if linked}
	<a href="mailto:{address}">{address}</a>
{:else}
	{address.replace('@', ' at ').replaceAll('.', ' dot ')}
{/if}
