<script lang="ts">
	import EmailAddress from '$components/EmailAddress.svelte';
	import SmartLink from '$components/SmartLink.svelte';
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
					<SmartLink label={handle} {href} />
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
