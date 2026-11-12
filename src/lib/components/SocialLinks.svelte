<script lang="ts">
	import { socials } from '$lib/config';
	import { socialIcons } from '$lib/icons';
</script>

<ul role="list">
	{#each socials as { label, href, color } (label)}
		<li>
			<a {href} style:--brand={color} target="_blank" rel="me external noopener">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d={socialIcons[label]} /></svg>
				<span class="visually-hidden">{label}, opens in a new tab</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	/* fills with the network's own colour on hover */
	a {
		display: grid;
		place-items: center;
		inline-size: 2.75rem;
		block-size: 2.75rem;
		border-radius: var(--radius-full);
		background: var(--color-surface);
		color: var(--color-on-primary-container);
		box-shadow: var(--shadow-1);
		transition:
			background var(--duration-base) var(--ease-out),
			color var(--duration-base) var(--ease-out),
			box-shadow var(--duration-base) var(--ease-out);

		&:hover {
			background: var(--brand);
			color: var(--neutral-0);
			box-shadow: var(--shadow-2);
		}
	}

	svg {
		inline-size: 1.25rem;
		fill: currentcolor;
	}
</style>
