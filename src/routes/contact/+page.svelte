<script lang="ts">
	import ContactDetails from '$components/ContactDetails.svelte';
	import ContactForm from '$components/ContactForm.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import PgpKey from '$components/PgpKey.svelte';
	import Section from '$components/Section.svelte';
	import Seo from '$components/Seo.svelte';
	import { site } from '$lib/config';

	let { data, form } = $props();

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: `Contact · ${site.name}`,
		url: `${site.url}/contact`,
		mainEntity: { '@type': 'Person', name: site.name, url: site.url }
	};
</script>

<Seo
	title="Contact"
	description="Get in touch with Alicia Sykes. Send a message, or reach me over email, Matrix, XMPP or Signal. PGP key included."
	{schema}
/>

<PageHeader title="Contact">
	Got a question, an idea, or found a bug in something I’ve built? Send it over and I’ll get back to
	you.
</PageHeader>

<div class="wrap page">
	<Section title="Send a message">
		<ContactForm result={form} stamp={data.stamp} />
	</Section>

	<Section title="Other ways">
		<ContactDetails />
	</Section>

	<Section title="Keys" wide>
		<p class="note">If it’s sensitive, encrypt it with this key.</p>
		<PgpKey />
	</Section>
</div>

<style>
	.note {
		margin-block-end: var(--space-md);
		color: var(--color-text-muted);
	}

	@media (width >= 52rem) {
		.page {
			grid-template-columns: minmax(0, 1fr) minmax(0, 22rem);
			align-items: start;
		}
	}
</style>
