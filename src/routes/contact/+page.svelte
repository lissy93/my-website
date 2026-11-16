<script lang="ts">
	import ContactDetails from '$components/ContactDetails.svelte';
	import ContactForm from '$components/ContactForm.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import PgpKey from '$components/PgpKey.svelte';
	import Section from '$components/Section.svelte';
	import Seo from '$components/Seo.svelte';
	import { site } from '$lib/config';

	let { data, form } = $props();

	const description =
		'Get in touch with Alicia Sykes. Send a message, or reach me over email, ' +
		'Matrix, XMPP or Signal. PGP key included.';

	const schema = {
		'@type': 'ContactPage',
		mainEntity: { '@type': 'Person', name: site.name, url: site.url }
	};
</script>

<Seo title="Contact" {description} {schema} />

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
