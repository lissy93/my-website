<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { pgp } from '$lib/me/pgp';

	/* gpg prints the fingerprint in two halves, so it only ever wraps between them */
	const groups = pgp.fingerprint.split(' ');
	const head = groups.slice(0, 5).join(' ');
	const tail = groups.slice(5).join(' ');

	let canCopy = $state(false);
	let copied = $state(false);

	onMount(() => {
		canCopy = Boolean(navigator.clipboard);
	});

	async function copy() {
		try {
			await navigator.clipboard.writeText(pgp.key);
			copied = true;
		} catch {
			copied = false;
		}
	}
</script>

<div class="key">
	<code><span>{head}</span> <span>{tail}</span></code>
	<p class="actions">
		{#if canCopy}
			<button class="chip" type="button" onclick={copy}>{copied ? 'Copied' : 'Copy key'}</button>
		{/if}
		<a class="chip" href={resolve('/pgp.txt')} download>Download</a>
	</p>
	<p class="visually-hidden" role="status">{copied ? 'Public key copied' : ''}</p>
</div>

<style>
	.key {
		display: grid;
		gap: var(--space-md);
		justify-items: start;
	}

	code {
		font-size: var(--text-2xs);
		word-spacing: -0.5ch;

		span {
			white-space: nowrap;
		}
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	.chip {
		--chip-bg: var(--color-secondary-container);
	}
</style>
