<script lang="ts">
	import { resolve } from '$app/paths';
	import { pgp } from '$lib/pgp';
</script>

<div class="key">
	<p class="line">
		<code>{pgp.fingerprint}</code>
		<a href={resolve('/pgp.txt')} download>Download</a>
	</p>
	<details>
		<summary>Armoured public key</summary>
		<pre>{pgp.key}</pre>
	</details>
</div>

<style>
	.key {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--space-md);
		justify-items: start;
	}

	.line {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--space-xs) var(--space-lg);
		font-size: var(--text-sm);
	}

	details {
		justify-self: stretch;
	}

	summary {
		inline-size: fit-content;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		cursor: pointer;

		&:hover {
			color: var(--color-accent);
		}
	}

	pre {
		inline-size: fit-content;
		max-inline-size: 100%;
		margin-block-start: var(--space-sm);
		border: var(--border-thin) solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		background: var(--color-bg-alt);
		color: var(--color-text-muted);
		font-size: var(--text-2xs);
		line-height: var(--leading-snug);
	}
</style>
