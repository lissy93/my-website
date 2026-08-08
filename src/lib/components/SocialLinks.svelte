<script lang="ts">
	import { socials } from '$lib/config';
	import { socialColors, socialIcons } from '$lib/icons';
</script>

<ul role="list">
	{#each socials as { label, href } (label)}
		<li>
			<a {href} style="--brand: {socialColors[label]}" target="_blank" rel="me external noopener">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d={socialIcons[label]} /></svg>
				<span class="visually-hidden">{label}, opens in a new tab</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		gap: var(--space-2xs);
		margin-inline-start: calc(var(--space-xs) * -1);
	}

	a {
		display: grid;
		place-items: center;
		inline-size: 2.25rem;
		block-size: 2.25rem;
		color: var(--color-text-muted);
		transition: color var(--duration-base) var(--ease-out);
	}

	svg {
		inline-size: 1.15rem;
		fill: currentcolor;
		transition: scale var(--duration-base) var(--ease-out);
	}

	/* Keep each brand's hue, but pull its lightness into a band this theme can actually read. */
	a:hover {
		color: oklch(from var(--brand) clamp(var(--brand-l-min), l, var(--brand-l-max)) c h);
	}

	@media (prefers-reduced-motion: no-preference) {
		a:hover svg {
			scale: 1.15;
		}
	}
</style>
