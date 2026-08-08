<script lang="ts">
	import ContactDetails from '$components/ContactDetails.svelte';
	import ContactForm from '$components/ContactForm.svelte';
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

<div class="contact">
	<header class="prose">
		<h1>Contact</h1>
		<p>
			Got a question, an idea, or found a bug in something I've built? Send it over and I'll get
			back to you. If it's sensitive, encrypt it with the key at the bottom.
		</p>
	</header>

	<div class="cols">
		<Section title="Send a message">
			<ContactForm result={form} stamp={data.stamp} />
		</Section>

		<Section title="Other ways">
			<ContactDetails />
		</Section>
	</div>

	<Section title="Keys">
		<PgpKey />
	</Section>
</div>

<style>
	.contact {
		display: grid;
		gap: var(--space-xl);
	}

	.cols {
		display: grid;
		gap: var(--space-xl);
	}

	@media (width >= 52rem) {
		.cols {
			grid-template-columns: minmax(0, 1fr) minmax(0, 17rem);
			gap: var(--space-2xl);
		}
	}
</style>
