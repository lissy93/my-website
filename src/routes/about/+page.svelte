<script lang="ts">
	import { asset } from '$app/paths';
	import NewTab from '$lib/bits-and-bobs/NewTab.svelte';
	import Numbers from '$lib/bits-and-bobs/Numbers.svelte';
	import PageHeader from '$lib/bits-and-bobs/PageHeader.svelte';
	import Section from '$lib/bits-and-bobs/Section.svelte';
	import SmartLink from '$lib/bits-and-bobs/SmartLink.svelte';
	import Seo from '$lib/for-the-robots/Seo.svelte';
	import { jobs, offTheClock, portrait, values } from '$lib/me/about';
	import { site, socials } from '$lib/me/site';
	import Sky from '$lib/stargazing/Sky.svelte';
	import type { Link } from '$lib/types';

	let { data } = $props();

	let [lead, ...rest] = $derived(data.intro);
	const links = [
		{ label: 'Timeline', href: '/timeline' },
		{ label: 'CV', href: 'https://cv.aliciasykes.com' },
		{ label: 'Sponsor', href: 'https://github.com/sponsors/Lissy93' }
	];

	/* only claimed while a job is still going */
	const current = jobs.find((job) => job.from && !job.to);

	const schema = {
		'@type': 'ProfilePage',
		mainEntity: {
			'@type': 'Person',
			name: site.name,
			alternateName: 'Lissy93',
			url: site.url,
			image: portrait.src,
			...(current && {
				jobTitle: current.role,
				worksFor: { '@type': 'Organization', name: current.org }
			}),
			alumniOf: { '@type': 'CollegeOrUniversity', name: 'Oxford Brookes University' },
			address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
			sameAs: socials.map((social) => social.href)
		}
	};
</script>

<Seo
	title="About"
	description="Alicia Sykes, software engineer in London. Who I am, what I care about, and why it’s all free and open source."
	{schema}
/>

<PageHeader title="About" {links}>
	{#snippet aside()}
		<img
			class="portrait"
			src={portrait.src}
			alt={portrait.alt}
			width={portrait.width}
			height={portrait.height}
			fetchpriority="high"
		/>
	{/snippet}
</PageHeader>

{#snippet copy(parts: (string | Link)[])}
	{#each parts as part, i (i)}
		{#if typeof part === 'string'}{part}{:else}<SmartLink {...part} />{/if}
	{/each}
{/snippet}

<div class="wrap page">
	<div class="story">
		<p class="lead">{@render copy(lead)}</p>
		{#each rest as parts, i (i)}
			<p>{@render copy(parts)}</p>
		{/each}
	</div>

	<div class="honours">
		<Section title="Along the way" flush>
			<ul role="list">
				{#each data.honours as { title, href, years } (title)}
					<li>
						<a class="row" {href} target="_blank" rel="external noopener">
							<span class="title">{title}</span>
							<span class="years">{years}</span>
							<NewTab arrow={false} />
						</a>
					</li>
				{/each}
			</ul>
		</Section>
	</div>

	<div class="values">
		<Section title="What I care about">
			<ul role="list">
				{#each values as { title, text } (title)}
					<li>
						<h3>{title}</h3>
						<p>{text}</p>
					</li>
				{/each}
			</ul>
		</Section>
	</div>

	{#if data.numbers.length}
		<div class="numbers">
			<Section title="In numbers" flush>
				<Numbers stats={data.numbers} />
			</Section>
		</div>
	{/if}

	<div class="off">
		<Section title="Off the clock">
			<div class="nap">
				<img src={asset('/dinos/nap-time.svg')} alt="" width="64" height="64" />
				<p>{offTheClock}</p>
			</div>
		</Section>
	</div>
</div>

<Sky {...data.sky} />

<style>
	.portrait {
		--size: clamp(6.5rem, 22vw, 15rem);

		inline-size: var(--size);
		aspect-ratio: 4 / 5;
		border: 0.4rem solid var(--color-on-primary);
		border-radius: calc(var(--size) * 0.17);
		background: var(--color-on-primary);
		object-fit: cover;
		object-position: 50% 25%;
	}

	.story {
		display: grid;
		align-content: start;
		gap: var(--space-lg);

		p {
			max-inline-size: 62ch;
			color: var(--color-text-muted);
			text-wrap: pretty;
		}

		.lead {
			max-inline-size: 38ch;
			color: var(--color-text);
			font-size: var(--text-intro);
			font-weight: var(--weight-medium);
			line-height: var(--leading-snug);
		}
	}

	.honours a {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-md);
	}

	.years {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.values ul {
		display: grid;
		gap: var(--space-lg);
	}

	.values li {
		display: grid;
		gap: var(--space-2xs);
		max-inline-size: 58ch;
		border-inline-start: var(--border-thin) solid var(--color-border-field);
		padding-inline-start: var(--space-md);

		h3 {
			font-size: var(--text-lg);
			font-weight: var(--weight-semibold);
			line-height: var(--leading-snug);
		}

		p {
			color: var(--color-text-muted);
			text-wrap: pretty;
		}
	}

	.nap {
		display: grid;
		grid-template-columns: 5rem minmax(0, 1fr);
		align-items: center;
		gap: var(--space-lg);

		img {
			inline-size: 5rem;
		}

		p {
			text-wrap: pretty;
		}
	}

	.values,
	.numbers,
	.off {
		display: grid;
	}

	.honours {
		align-self: start;
	}

	@media (width >= 56rem) {
		.page {
			grid-template-columns: 7fr 5fr;
		}

		.story {
			align-self: start;
		}

		.numbers {
			grid-column: 2;
			grid-row: span 2;
		}
	}
</style>
