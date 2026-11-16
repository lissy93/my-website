<script lang="ts">
	import ProjectMeta from '$components/ProjectMeta.svelte';
	import Screens from '$components/Screens.svelte';
	import SmartLink from '$components/SmartLink.svelte';
	import Stars from '$components/Stars.svelte';
	import { globeIcon, linkIcons, socialIcons } from '$lib/icons';
	import { sourceLink } from '$lib/projects';
	import { slug } from '$lib/slug';
	import type { Featured } from '$lib/types';

	let {
		project,
		flip = false,
		eager = false
	}: { project: Featured; flip?: boolean; eager?: boolean } = $props();

	let id = $derived(`project-${slug(project.name)}`);
	let source = $derived(sourceLink(project));
</script>

<article class="card" class:flip style:--brand={project.color} aria-labelledby={id}>
	<div class="about">
		<header>
			{#if project.logo}
				<img src={project.logo} alt="" width="56" height="56" loading={eager ? 'eager' : 'lazy'} />
			{/if}
			<h3 {id}>{project.name}</h3>
		</header>
		<div class="copy">
			<p class="blurb">{project.blurb}</p>
			<p>{project.pitch}</p>
		</div>
		<div class="facts">
			<Stars count={project.stars} big />
			<ProjectMeta {project} />
		</div>
		<div>
			<ul class="buttons" role="list">
				{#if project.website}
					<li>
						<SmartLink class="chip lead" label="Website" href={project.website} icon={globeIcon} />
					</li>
				{/if}
				<li>
					<SmartLink
						class={project.website ? 'chip' : 'chip lead'}
						{...source}
						icon={socialIcons[source.label]}
					/>
				</li>
			</ul>
			{#if project.links?.length}
				<ul class="extras" role="list">
					{#each project.links as link (link.href)}
						<li><SmartLink {...link} icon={linkIcons[link.label]} arrow /></li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
	<div class="stage">
		<Screens {project} {eager} />
	</div>
</article>

<style>
	article {
		display: grid;

		/* the text keeps enough room that long names don't break mid-word */
		@media (width >= 56rem) {
			grid-template-columns: minmax(26rem, 5fr) 7fr;

			&.flip {
				grid-template-columns: 7fr minmax(26rem, 5fr);

				.about {
					grid-column: 2;
				}

				.stage {
					grid-area: 1 / 1;
				}
			}
		}
	}

	.about {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: var(--space-lg);
		padding: var(--space-lg) var(--card-padding);

		@media (width >= 56rem) {
			padding: var(--space-2xl);
		}
	}

	header {
		display: flex;
		align-items: center;
		gap: var(--space-md);

		img {
			inline-size: 3.5rem;
			block-size: 3.5rem;
			object-fit: contain;
		}

		h3 {
			font-size: var(--text-headline);
			overflow-wrap: anywhere;
		}
	}

	.copy {
		display: grid;
		gap: var(--space-xs);
		color: var(--color-text-muted);
		text-wrap: pretty;
	}

	.blurb {
		color: var(--color-text);
		font-size: var(--text-xl);
		font-weight: var(--weight-medium);
		line-height: var(--leading-snug);
	}

	/* stars lead, with the smaller facts lined up on their baseline */
	.facts {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--space-2xs) var(--space-lg);
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);

		/* bigger than the usual chip, and tinted so it shows on the card */
		:global(.chip) {
			padding: var(--space-xs) var(--space-lg) var(--space-xs) var(--space-md);
			background: var(--color-secondary-container);
			font-size: var(--text-md);
		}

		/* the navbar pink, eased towards the card on hover so the text gains contrast */
		:global(.lead) {
			background: var(--color-primary);
			color: var(--color-on-primary);

			&::selection {
				background: var(--color-surface);
			}

			@media (hover: hover) {
				&:hover {
					background: color-mix(in oklab, var(--color-primary), var(--color-surface) 15%);
				}
			}
		}
	}

	.extras {
		display: flex;
		flex-wrap: wrap;
		column-gap: var(--space-md);
		margin-block-start: var(--space-sm);
		font-size: var(--text-sm);
		font-weight: var(--weight-medium);

		/* taller than the text, for an easier tap */
		:global(a) {
			display: inline-block;
			padding-block: var(--space-2xs);
		}
	}

	/* the brand colour, held to one lightness so every project's stage sits at the same weight */
	.stage {
		display: grid;
		align-content: center;
		padding: var(--card-padding);
		background: light-dark(
			oklch(from var(--brand) 93% 0.045 h),
			oklch(from var(--brand) 30% 0.07 h)
		);

		@media (width >= 56rem) {
			padding: var(--space-2xl);
		}
	}
</style>
