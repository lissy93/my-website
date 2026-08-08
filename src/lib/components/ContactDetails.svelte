<script lang="ts">
	import EmailAddress from '$components/EmailAddress.svelte';
	import SocialLinks from '$components/SocialLinks.svelte';
	import { contact } from '$lib/config';
</script>

<div class="details">
	<dl>
		<dt>Email</dt>
		<dd><EmailAddress /></dd>
		{#each contact.channels as { label, handle, href } (label)}
			<dt>{label}</dt>
			<dd>
				{#if href}
					{@const offsite = href.startsWith('http')}
					<a {href} target={offsite ? '_blank' : undefined} rel="external noopener">
						{handle}{#if offsite}<span class="visually-hidden">, opens in a new tab</span>{/if}
					</a>
				{:else}
					{handle}
				{/if}
			</dd>
		{/each}
	</dl>
	<SocialLinks />
</div>

<style>
	.details {
		display: grid;
		gap: var(--space-md);
		justify-items: start;
	}

	dl {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: var(--space-2xs) var(--space-md);
		font-size: var(--text-sm);

		dt {
			color: var(--color-text-muted);
		}

		dd {
			overflow-wrap: anywhere;
		}
	}
</style>
