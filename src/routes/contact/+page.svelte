<script lang="ts">
	import PageHeader from '$lib/bits-and-bobs/PageHeader.svelte';
	import Section from '$lib/bits-and-bobs/Section.svelte';
	import Seo from '$lib/for-the-robots/Seo.svelte';
	import { pages } from '$lib/me/pages';
	import { site } from '$lib/me/site';
	import ContactDetails from '$lib/say-hello/ContactDetails.svelte';
	import ContactForm from '$lib/say-hello/ContactForm.svelte';
	import PgpKey from '$lib/say-hello/PgpKey.svelte';

	let { data, form } = $props();

	const schema = {
		'@type': 'ContactPage',
		mainEntity: { '@type': 'Person', name: site.name, url: site.url }
	};
</script>

<Seo {...pages['/contact']} {schema} />

<PageHeader title="Contact">
	Got a question, an idea, or just want to say hi? Send it over and I’ll get back to you :)
</PageHeader>

<div class="wrap page">
	<Section title="Send a message">
		<ContactForm result={form} stamp={data.stamp} />
	</Section>

	<div class="side">
		<Section title="Other ways">
			<ContactDetails />
		</Section>

		<Section title="Keys">
			<p class="note">If it’s sensitive, encrypt it with this key.</p>
			<PgpKey />
		</Section>
	</div>
</div>

<style>
	.side {
		display: grid;
		gap: var(--space-section);
	}

	.note {
		margin-block-end: var(--space-md);
		color: var(--color-text-muted);
	}

	@media (width >= 56rem) {
		.page {
			grid-template-columns: minmax(0, 1fr) 24rem;
			align-items: start;
		}

		.side {
			align-self: stretch;
			grid-template-rows: auto 1fr;
		}
	}
</style>
