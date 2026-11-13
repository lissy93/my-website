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

	/* slides open in browsers that can animate to auto height */
	@media (prefers-reduced-motion: no-preference) {
		details::details-content {
			block-size: 0;
			overflow-y: clip;
			transition:
				block-size var(--duration-base) var(--ease-out),
				content-visibility var(--duration-base) allow-discrete;
		}

		details[open]::details-content {
			block-size: auto;
		}
	}

	summary {
		inline-size: fit-content;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: color var(--duration-fast) var(--ease-out);

		@media (hover: hover) {
			&:hover {
				color: var(--color-primary-text);
			}
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
		background: var(--color-surface-sunken);
		color: var(--color-text-muted);
		font-size: var(--text-2xs);
		line-height: var(--leading-snug);
	}
</style>
