<script lang="ts">
	import { socials } from '$lib/config';
	import { socialIcons } from '$lib/icons';
</script>

<ul role="list">
	{#each socials as { label, href, color } (label)}
		<li>
			<a class="press" {href} style:--brand={color} target="_blank" rel="me external noopener">
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

	a {
		display: grid;
		place-items: center;
		inline-size: 2.75rem;
		block-size: 2.75rem;
		border-radius: var(--radius-full);
		background: var(--color-secondary-container);
		color: var(--color-on-secondary-container);
		transition:
			background-color var(--duration-fast) var(--ease-out),
			color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out),
			translate var(--duration-fast) var(--ease-out),
			var(--spring-back);

		@media (hover: hover) {
			&:hover {
				background: var(--brand);
				color: var(--neutral-0);
				box-shadow: var(--shadow-2);
				translate: 0 calc(var(--lift) * -1);
			}
		}

		&:active {
			translate: 0;
		}
	}

	svg {
		inline-size: 1.25rem;
		fill: currentcolor;
	}
</style>
