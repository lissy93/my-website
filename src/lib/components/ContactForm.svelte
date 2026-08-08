<script lang="ts">
	import { tick, untrack } from 'svelte';
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Field from '$components/Field.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ContactResult } from '$lib/types';
	import { reasons } from '$lib/config';

	let { result, stamp }: { result: ContactResult | null; stamp: string } = $props();

	let sending = $state(false);
	let panel: HTMLElement | undefined = $state();
	let reason = $state(untrack(() => result?.values?.reason) ?? reasons[0].value);

	let chosen = $derived(reasons.find(({ value }) => value === reason) ?? reasons[0]);

	const submit: SubmitFunction = () => {
		sending = true;

		return async ({ update }) => {
			await update();
			sending = false;
			await tick();
			panel?.focus();
		};
	};
</script>

<div bind:this={panel} tabindex="-1">
	{#if result?.sent}
		<div class="message-is-sent">
			<p class="sent">Got it, thanks. I’ll get back to you as soon as I can.</p>
			<p><a href={resolve('/contact')}>Send another</a></p>
		</div>
	{:else}
		<form method="POST" use:enhance={submit}>
			<input type="hidden" name="stamp" value={stamp} />
			<p class="visually-hidden" aria-hidden="true">
				<label for="website">Website</label>
				<input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
			</p>

			<Field
				name="reason"
				label="What’s this about?"
				options={reasons}
				bind:value={reason}
				error={result?.errors?.reason}
				describes="reason-hint"
			/>

			<p class="hint" id="reason-hint" role="status">
				{chosen.hint}
				{#if chosen.link}
					{@const offsite = chosen.link.href.startsWith('http')}
					<a
						href={chosen.link.href}
						target={offsite ? '_blank' : undefined}
						rel="external noopener"
					>
						{chosen.link.label}{#if offsite}<span class="visually-hidden">
								, opens in a new tab</span
							>{/if}
					</a>
				{/if}
			</p>

			<div class="pair">
				<Field
					name="name"
					label="Name"
					min={2}
					max={60}
					autocomplete="name"
					value={result?.values?.name}
					error={result?.errors?.name}
				/>
				<Field
					name="email"
					label="Email"
					type="email"
					min={5}
					max={120}
					autocomplete="email"
					value={result?.values?.email}
					error={result?.errors?.email}
				/>
			</div>

			<Field
				name="message"
				label="Message"
				rows={7}
				min={20}
				max={2000}
				value={result?.values?.message}
				error={result?.errors?.message}
			/>

			{#if result?.failed}
				<p class="failed">That didn’t send, sorry. Give it another go, or email me directly.</p>
			{/if}

			<button type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send'}</button>
		</form>
	{/if}
</div>

<style>
	div:focus {
		outline: none;
	}

	.message-is-sent {
		background: var(--color-bg-alt);
		padding: var(--space-md) var(--space-lg);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-sm);
	}

	form {
		display: grid;
		gap: var(--space-md);
	}

	.pair {
		display: grid;
		gap: var(--space-md);
	}

	.hint {
		margin-block-start: calc(var(--space-xs) * -1);
		border-radius: var(--radius-sm);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-bg-alt);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: var(--leading-snug);
		text-wrap: pretty;
	}

	.sent {
		margin-block-end: var(--space-xs);
		font-size: var(--text-lg);
	}

	.failed {
		color: var(--color-danger);
		font-size: var(--text-sm);
	}

	button {
		justify-self: start;
		border-radius: var(--radius-md);
		padding: var(--space-xs) var(--space-lg);
		background: var(--color-accent);
		color: var(--color-on-accent);
		font-family: var(--font-display);
		font-size: var(--text-sm);
		font-weight: var(--weight-semibold);
		letter-spacing: var(--tracking-tight);
		transition: background var(--duration-fast) var(--ease-out);
		&:hover {
			background: var(--color-accent-hover);
		}
		&:disabled {
			background: var(--color-surface-alt);
			color: var(--color-text-muted);
			cursor: progress;
		}
	}

	@media (width >= 30rem) {
		.pair {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
