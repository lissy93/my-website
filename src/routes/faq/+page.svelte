<script lang="ts">
	import { asset } from '$app/paths';
	import { SvelteSet } from 'svelte/reactivity';
	import NewTab from '$lib/bits-and-bobs/NewTab.svelte';
	import PageHeader from '$lib/bits-and-bobs/PageHeader.svelte';
	import SmartLink from '$lib/bits-and-bobs/SmartLink.svelte';
	import { pieces, unlinked } from '$lib/bits-and-bobs/inline-links';
	import { slug } from '$lib/bits-and-bobs/slug';
	import Seo from '$lib/for-the-robots/Seo.svelte';
	import { avatar, ending, topics } from '$lib/me/faq';
	import { pages } from '$lib/me/pages';
	import type { Block, Photo, Question, Topic } from '$lib/types';

	const jump = topics.map(({ title }) => ({ label: title, href: `#${slug(title)}` }));

	/* the written parts of each answer, for search engines */
	const plain = (answer: Block[]) =>
		answer
			.filter((block) => typeof block === 'string')
			.map(unlinked)
			.join(' ');

	const schema = {
		'@type': 'FAQPage',
		mainEntity: topics
			.flatMap(({ questions }) => questions)
			.map(({ question, answer }) => ({
				'@type': 'Question',
				name: question,
				acceptedAnswer: { '@type': 'Answer', text: plain(answer) }
			}))
	};

	const srcset = (src: string) => [256, 512, 1024].map((w) => `${src}/w${w} ${w}w`).join(', ');

	const stuck = new SvelteSet<string>();

	/* tracks which questions are pinned, so the answer under them can fade */
	function pin(id: string) {
		return (node: HTMLElement) => {
			const top = parseFloat(getComputedStyle(node).top);
			const observer = new IntersectionObserver(
				([{ intersectionRatio, boundingClientRect }]) => {
					if (intersectionRatio < 1 && boundingClientRect.top <= top + 1) stuck.add(id);
					else stuck.delete(id);
				},
				{ rootMargin: `${-top - 1}px 0px 0px`, threshold: 1 }
			);
			observer.observe(node);
			return () => observer.disconnect();
		};
	}
</script>

<Seo {...pages['/faq']} {schema} />

<PageHeader title="FAQ" links={jump} />

{#snippet message(text: string)}
	<p>
		{#each pieces(text) as piece, i (i)}
			{#if typeof piece === 'string'}{piece}{:else}<SmartLink {...piece} />{/if}
		{/each}
	</p>
{/snippet}

{#snippet photos(shots: Photo[])}
	{@const album = shots.length > 1}
	<ul role="list" class="photos" class:album>
		{#each shots as shot (shot.src)}
			<li>
				<a href={shot.src} target="_blank" rel="external noopener">
					<img
						src="{shot.src}/w1024"
						srcset={srcset(shot.src)}
						sizes={album ? '(width >= 40rem) 8rem, 22vw' : '(width >= 40rem) 26rem, 90vw'}
						alt={shot.alt}
						width={shot.width}
						height={shot.height}
						loading="lazy"
					/><NewTab arrow={false} />
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet exchange({ id, question, face = 'hello', answer }: Question, topic?: Topic)}
	{@const quick = topic?.quick}
	<div class="qa" {id}>
		<div class="pin" class:stuck={stuck.has(id)} {@attach pin(id)}>
			<div class="asked">
				{#if !quick}
					<img class="dino" src={asset(`/dinos/faces/${face}.svg`)} alt="" width="40" height="40" />
				{/if}
				<svelte:element this={topic ? 'h3' : 'h2'} class="question">{question}</svelte:element>
			</div>
		</div>
		<div class="said">
			<div class="run">
				{#each answer as block, i (i)}
					{#if typeof block === 'string'}
						{@render message(block)}
					{:else}
						{@render photos(block.photos)}
					{/if}
				{/each}
			</div>
			{#if !quick}
				<img class="me" src="{avatar}/w128" alt="" width="40" height="40" loading="lazy" />
			{/if}
		</div>
	</div>
{/snippet}

<div class="wrap page">
	{#each topics as topic (topic.title)}
		{@const id = slug(topic.title)}
		<section class="topic" class:quick={topic.quick} aria-labelledby={id}>
			<h2 {id}>{topic.title}</h2>
			{#each topic.questions as question (question.id)}
				{@render exchange(question, topic)}
			{/each}
		</section>
	{/each}
	{@render exchange(ending)}
</div>

<style>
	.page {
		max-inline-size: calc(44rem + 2 * var(--gutter));
		gap: var(--space-3xl);
	}

	.topic {
		display: grid;
		gap: var(--space-2xl);
	}

	.quick {
		gap: var(--space-md);

		.qa {
			gap: var(--space-2xs);
		}

		.asked,
		.said {
			grid-template-columns: minmax(0, 1fr);
		}

		.question {
			font-size: var(--text-lg);
		}
	}

	.topic > h2 {
		justify-self: center;
		border-radius: var(--radius-full);
		padding: var(--space-xs) var(--space-lg);
		background: light-dark(var(--ink-900), var(--ink-600));
		box-shadow: var(--shadow-1);
		color: var(--neutral-0);
		font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem);
		font-weight: var(--weight-black);
		font-stretch: var(--stretch-display);
		text-align: center;
	}

	.qa {
		display: grid;
		gap: var(--space-sm);
	}

	.asked,
	.said {
		display: grid;
		align-items: end;
		gap: var(--space-xs);
	}

	.pin {
		position: sticky;
		inset-block-start: calc(var(--bar-height) + var(--space-sm));
		z-index: 1;
		pointer-events: none;
	}

	.asked {
		position: relative;
		isolation: isolate;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		justify-items: start;
		padding-inline-end: 15%;

		> * {
			pointer-events: auto;
		}

		&::before {
			content: '';
			position: absolute;
			inset: calc(var(--space-sm) * -1) 0 calc(var(--space-lg) * -1);
			z-index: -1;
			background: linear-gradient(var(--color-bg) 70%, transparent);
			opacity: 0;
			transition: opacity var(--duration-base) var(--ease-out);
		}
	}

	.stuck {
		.asked::before {
			opacity: 1;
		}

		.question {
			box-shadow: var(--shadow-2);
		}
	}

	.said {
		grid-template-columns: minmax(0, 1fr) 2.5rem;
		padding-inline-start: 10%;
	}

	.question {
		border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-primary);
		box-shadow: var(--shadow-1);
		color: var(--color-on-primary);
		transition: box-shadow var(--duration-base) var(--ease-out);
		font-size: clamp(1.0625rem, 1rem + 0.3vw, 1.25rem);
		font-weight: var(--weight-semibold);
		line-height: var(--leading-snug);
		text-wrap: pretty;
		overflow-wrap: anywhere;

		&::selection {
			background: var(--color-surface);
			color: var(--color-primary-text);
		}
	}

	.run {
		display: grid;
		justify-items: end;
		gap: var(--space-2xs);

		> * {
			border: var(--border-thin) solid light-dark(transparent, var(--color-border));
			border-radius: var(--radius-lg) var(--radius-sm) var(--radius-sm) var(--radius-lg);
			box-shadow: var(--shadow-1);
		}

		> :first-child {
			border-start-end-radius: var(--radius-lg);
		}

		> p {
			padding: var(--space-sm) var(--space-md);
			background: var(--color-surface);
			font-size: var(--text-lg);
			text-wrap: pretty;
		}

		/* tabbing back to a link keeps it clear of the pinned question */
		:global(a) {
			scroll-margin-block-start: 8rem;
		}
	}

	.photos {
		display: grid;
		inline-size: min(100%, 26rem);
		overflow: clip;

		a {
			position: relative;
			display: block;
			overflow: clip;

			&:focus-visible {
				outline: none;
			}

			/* a two-tone ring, so it shows on dark photos and light ones */
			&:focus-visible::after {
				content: '';
				position: absolute;
				inset: 0;
				border: var(--focus-ring) solid var(--color-focus);
				box-shadow: inset 0 0 0 2px var(--neutral-0);
			}
		}

		img {
			inline-size: 100%;
			transition: scale var(--duration-fast) var(--ease-out);
		}

		@media (hover: hover) {
			a:hover img {
				scale: var(--grow-scale);
			}
		}
	}

	.album {
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--space-3xs);
		inline-size: min(100%, 32rem);
		background: var(--color-surface);

		img {
			aspect-ratio: 1;
			object-fit: cover;
		}
	}

	.dino,
	.me {
		inline-size: 2.5rem;
		block-size: 2.5rem;
	}

	.dino {
		transform-origin: 50% 100%;
		filter: brightness(calc(1 - var(--dark) * 0.15));
	}

	.me {
		border: 2px solid var(--color-border);
		border-radius: var(--radius-full);
		background: var(--color-secondary-container);
	}

	@media (width < 40rem) {
		.asked {
			grid-template-columns: 2rem minmax(0, 1fr);
			padding-inline-end: 8%;
		}

		.said {
			grid-template-columns: minmax(0, 1fr);
			padding-inline-start: 8%;
		}

		.dino {
			inline-size: 2rem;
			block-size: 2rem;
		}

		.me {
			display: none;
		}
	}

	/* jumping to a question makes its dino hop, so you see where you landed */
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
