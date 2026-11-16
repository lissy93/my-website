<script lang="ts">
	import { asset } from '$app/paths';
	import Numbers from '$components/Numbers.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import Seo from '$components/Seo.svelte';
	import SmartLink from '$components/SmartLink.svelte';
	import { interests, jobs, portrait, reserves } from '$lib/about';
	import { jobSpan } from '$lib/dates';
	import { questions } from '$lib/faq';
	import { moonIcon, sunIcon } from '$lib/icons';
	import type { Block } from '$lib/types';

	let { data } = $props();

	/* an answer that's only links doesn't need a chip of its own */
	const onlyLinks = (answer: Block[]) =>
		answer.every((block) => typeof block === 'object' && 'links' in block);

	const jump = questions
		.filter(({ answer }) => !onlyLinks(answer))
		.map(({ id, question }) => ({ label: question, href: `#${id}` }));

	function written(block: Block) {
		if (typeof block === 'string') return block;
		return 'pull' in block ? block.pull : '';
	}

	/* the written parts of each answer, for search engines */
	const plain = (answer: Block[]) => answer.map(written).filter(Boolean).join(' ');

	const schema = {
		'@type': 'FAQPage',
		mainEntity: questions
			.filter(({ answer }) => plain(answer))
			.map(({ question, answer }) => ({
				'@type': 'Question',
				name: question,
				acceptedAnswer: { '@type': 'Answer', text: plain(answer) }
			}))
	};

	/* an answer that opens with a paragraph leads with it, one that opens with anything else doesn't */
	const leads = (answer: Block[]) => typeof answer[0] === 'string';
</script>

<Seo
	title="FAQ"
	description="How Alicia Sykes got into coding, why her apps are free, where she’s worked, and what she gets up to away from the keyboard."
	{schema}
/>

<PageHeader title="FAQ" links={jump} />

{#snippet icon(path: string)}
	<svg viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg>
{/snippet}

{#snippet list(name: 'projects' | 'work' | 'numbers' | 'interests')}
	{#if name === 'projects'}
		<ul role="list" class="made">
			{#each data.projects as project (project.title)}
				<li>
					<a href={project.href} target="_blank" rel="external noopener">
						{#if project.logo}<img
								src={project.logo}
								alt=""
								width="28"
								height="28"
								loading="lazy"
							/>{/if}
						{project.title}<span class="visually-hidden">, opens in a new tab</span>
					</a>
				</li>
			{/each}
		</ul>
	{:else if name === 'work'}
		<ol role="list" class="jobs">
			{#each jobs as job (job.org)}
				<li>
					{#if job.logo}
						<img src={job.logo} alt="" width="40" height="40" style:background={job.tile} />
					{:else}
						<span class="blank" aria-hidden="true">{job.org[0]}</span>
					{/if}
					<span class="role">{job.role}, {job.org}</span>
					<span class="span">{jobSpan(job)}</span>
				</li>
			{/each}
			<li>
				<img src={reserves.logo} alt="" width="40" height="40" />
				<span class="role">{reserves.org}</span>
				<span class="span"
					>{jobSpan(reserves)} · {reserves.units[0]} +{reserves.units.length - 1} more</span
				>
			</li>
		</ol>
	{:else if name === 'numbers'}
		<div class="tally"><Numbers stats={data.numbers} /></div>
	{:else}
		<ul role="list" class="likes" aria-label="Interests">
			{#each interests as interest (interest)}
				<li>{interest}</li>
			{/each}
		</ul>
	{/if}
{/snippet}

<div class="wrap page">
	<article class="card interview">
		{#each questions as { id, question, answer } (id)}
			<section class="qa" {id} aria-labelledby="{id}-q">
				<div class="ask">
					<img class="dino" src={asset('/dinos/hello.svg')} alt="" width="48" height="48" />
					<h2 id="{id}-q">{question}</h2>
				</div>
				<div class="answer">
					<img class="me" src={portrait.src} alt="" width="44" height="44" loading="lazy" />
					<div class="said">
						{#each answer as block, i (i)}
							{#if typeof block === 'string'}
								<p class:lead={i === 0 && leads(answer)}>{block}</p>
							{:else if 'pull' in block}
								<p class="pull">{block.pull}</p>
							{:else if 'day' in block}
								<div class="clock">
									<blockquote class="morning">
										{@render icon(sunIcon)}
										<p>{block.day}</p>
									</blockquote>
									<blockquote class="evening">
										{@render icon(moonIcon)}
										<p>{block.night}</p>
									</blockquote>
								</div>
							{:else if 'links' in block}
								<ul role="list" class="next">
									{#each block.links as link (link.href)}
										<li><SmartLink class="chip" {...link} /></li>
									{/each}
								</ul>
							{:else}
								{@render list(block.show)}
							{/if}
						{/each}
					</div>
				</div>
			</section>
		{/each}
	</article>
</div>

<style>
	.interview {
		grid-column: 1 / -1;
	}

	.qa {
		display: grid;
		gap: var(--space-lg);
		padding: clamp(1.5rem, 1rem + 2.5vw, 3.25rem) clamp(1.25rem, 0.5rem + 3vw, 3.5rem);

		& + & {
			border-block-start: var(--border-thin) solid var(--color-border);
		}
	}

	.ask {
		display: grid;
		align-content: start;
		justify-items: start;
		gap: var(--space-md);

		h2 {
			max-inline-size: 16ch;
			font-size: var(--text-headline);
			font-weight: var(--weight-black);
			font-stretch: var(--stretch-display);
			letter-spacing: var(--tracking-display);
			line-height: 1;
		}
	}

	.dino {
		inline-size: 3rem;
		block-size: 3rem;
		transform-origin: 50% 100%;
	}

	.answer {
		display: grid;
		grid-template-columns: 2.75rem minmax(0, 1fr);
		align-items: start;
		gap: var(--space-md);
	}

	.me {
		inline-size: 2.75rem;
		aspect-ratio: 1;
		border-radius: calc(2.75rem * 0.17);
		background: var(--color-secondary-container);
		object-fit: cover;
		object-position: 50% 22%;
	}

	.said {
		display: grid;
		gap: var(--space-md);
		max-inline-size: 62ch;
		font-size: var(--text-lg);
		text-wrap: pretty;

		> p {
			color: var(--color-text-muted);
		}

		> .lead {
			color: var(--color-text);
			font-size: var(--text-intro);
			font-weight: var(--weight-medium);
			line-height: var(--leading-snug);
		}

		> .pull {
			color: var(--color-primary-text);
			font-family: var(--font-display);
			font-size: clamp(1.375rem, 1.1rem + 1.2vw, 2.25rem);
			font-weight: var(--weight-heavy);
			letter-spacing: var(--tracking-tight);
			line-height: var(--leading-tight);
			text-wrap: balance;
		}
	}

	.made {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-block-start: var(--space-2xs);

		a {
			display: flex;
			align-items: center;
			gap: var(--space-xs);
			border-radius: var(--radius-sm);
			padding: var(--space-2xs) var(--space-sm) var(--space-2xs) var(--space-2xs);
			background: var(--color-surface-sunken);
			color: var(--color-text);
			font-size: var(--text-sm);
			font-weight: var(--weight-semibold);
			text-decoration: none;
			transition:
				background-color var(--duration-fast) var(--ease-out),
				var(--spring-back);

			@media (hover: hover) {
				&:hover {
					background: var(--state-hover);
				}
			}
		}

		img {
			inline-size: 1.75rem;
			block-size: 1.75rem;
			border-radius: var(--radius-xs);
		}
	}

	.clock {
		display: grid;
		gap: var(--space-sm);

		@media (width >= 40rem) {
			grid-template-columns: 1fr 1fr;
		}

		blockquote {
			display: grid;
			align-content: start;
			gap: var(--space-sm);
			border-radius: var(--radius-md);
			padding: var(--space-lg);
			font-size: var(--text-md);
			line-height: var(--leading-snug);
		}

		svg {
			inline-size: 1.75rem;
			block-size: 1.75rem;
			fill: currentcolor;
		}
	}

	.morning {
		background: light-dark(
			oklch(from var(--primary-300) l c h / 0.28),
			oklch(from var(--primary-300) l c h / 0.12)
		);
		color: var(--color-text);

		svg {
			color: var(--color-primary);
		}
	}

	.evening {
		background: light-dark(var(--ink-900), var(--neutral-dark-900));
		color: var(--neutral-dark-100);

		svg {
			color: var(--primary-300);
		}
	}

	.jobs {
		display: grid;
		gap: var(--space-md);

		li {
			display: grid;
			grid-template-columns: 2.5rem minmax(0, 1fr);
			column-gap: var(--space-md);
		}

		img,
		.blank {
			grid-row: span 2;
			inline-size: 2.5rem;
			block-size: 2.5rem;
			border-radius: var(--radius-sm);
			background: var(--neutral-0);
			box-shadow: inset 0 0 0 1px var(--color-border);
			object-fit: contain;
		}

		.blank {
			display: grid;
			place-items: center;
			background: var(--color-secondary-container);
			color: var(--color-on-secondary-container);
			font-family: var(--font-display);
			font-weight: var(--weight-heavy);
		}

		.role {
			font-weight: var(--weight-semibold);
			line-height: var(--leading-snug);
		}

		.span {
			color: var(--color-text-muted);
			font-size: var(--text-sm);
			font-variant-numeric: tabular-nums;
		}
	}

	.tally {
		margin-inline: calc(var(--card-padding) * -1);
		font-size: var(--text-md);
	}

	.likes {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);

		li {
			border-radius: var(--radius-full);
			padding: var(--space-2xs) var(--space-sm);
			background: var(--color-secondary-container);
			color: var(--color-on-secondary-container);
			font-size: var(--text-sm);
			font-weight: var(--weight-semibold);
		}
	}

	.next {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);

		:global(.chip) {
			--chip-bg: var(--color-secondary-container);
			font-size: var(--text-md);
		}
	}

	@media (width < 40rem) {
		.answer {
			grid-template-columns: minmax(0, 1fr);
		}

		.me {
			display: none;
		}
	}

	@media (width >= 56rem) {
		.qa {
			grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
			column-gap: clamp(2rem, 5vw, 5rem);
		}

		.ask {
			position: sticky;
			inset-block-start: calc(var(--bar-height) + var(--space-lg));
			align-self: start;
		}
	}

	/* jumping to a question makes its dino hop, so you can see where you landed */
	@media (prefers-reduced-motion: no-preference) {
		.qa:target .dino {
			animation: hop 0.75s var(--ease-out) 0.35s both;
		}
	}

	@keyframes hop {
		30% {
			translate: 0 -0.75rem;
			rotate: -10deg;
		}

		55% {
			translate: 0 0;
			rotate: 6deg;
		}

		75% {
			rotate: -3deg;
		}
	}
</style>
