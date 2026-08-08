<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { nav, site } from '$lib/config';
</script>

<header>
	<div class="wrap">
		<a class="brand" href={resolve('/')}>{site.name}</a>
		<nav aria-label="Main">
			{#each nav as { href, label } (href)}
				<a href={resolve(href)} aria-current={page.route.id?.startsWith(href) ? 'page' : undefined}>
					{label}
				</a>
			{/each}
		</nav>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: var(--z-sticky);
		border-bottom: var(--border-thin) solid var(--color-border);
		background: var(--color-bg);
	}

	.wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-lg);
		min-height: var(--space-3xl);
	}

	.brand {
		color: var(--color-text);
		font-weight: var(--weight-semibold);
		letter-spacing: var(--tracking-tight);
		text-decoration: none;
	}

	nav {
		display: flex;
		gap: var(--space-lg);
		font-size: var(--text-sm);
	}

	nav a {
		color: var(--color-text-muted);
		text-decoration: none;
	}

	nav a:hover,
	nav a[aria-current='page'] {
		color: var(--color-text);
	}
</style>
