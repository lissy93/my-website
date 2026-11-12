<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { nav, site } from '$lib/config';

	let isHome = $derived(page.route.id === '/');
</script>

<header class="band">
	<div class="wrap">
		{#if !isHome}
			<a class="brand" href={resolve('/')}>{site.name}</a>
		{/if}
		<nav aria-label="Main">
			{#each nav as { href, label } (href)}
				<a
					class="chip"
					href={resolve(href)}
					aria-current={page.route.id?.startsWith(href) ? 'page' : undefined}
				>
					{label}
				</a>
			{/each}
		</nav>
	</div>
</header>

<style>
	.wrap {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm) var(--space-lg);
		padding-block: var(--space-md);
	}

	.brand {
		color: inherit;
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: var(--weight-heavy);
		font-stretch: var(--stretch-display);
		letter-spacing: var(--tracking-tight);
		text-decoration: none;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-inline-start: auto;
	}

	@media (width < 36rem) {
		nav {
			margin-inline-start: 0;
		}
	}
</style>
