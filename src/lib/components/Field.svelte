<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		name,
		label,
		min,
		max,
		value = $bindable(''),
		error,
		type = 'text',
		rows,
		options,
		describes,
		autocomplete
	}: {
		name: string;
		label: string;
		min?: number;
		max?: number;
		value?: string;
		error?: string;
		type?: 'text' | 'email';
		rows?: number;
		options?: { value: string; label: string }[];
		describes?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
	} = $props();

	let errorId = $derived(error ? `${name}-error` : undefined);
	let describedBy = $derived([errorId, describes].filter(Boolean).join(' ') || undefined);
	let invalid = $derived(error ? true : undefined);
</script>

<p class="field">
	<label for={name}>{label}</label>
	{#if options}
		<select id={name} {name} bind:value aria-invalid={invalid} aria-describedby={describedBy}>
			{#each options as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	{:else if rows}
		<textarea
			id={name}
			{name}
			{rows}
			{value}
			minlength={min}
			maxlength={max}
			required
			aria-invalid={invalid}
			aria-describedby={describedBy}></textarea>
	{:else}
		<input
			id={name}
			{name}
			{type}
			{value}
			{autocomplete}
			minlength={min}
			maxlength={max}
			required
			aria-invalid={invalid}
			aria-describedby={describedBy}
		/>
	{/if}
	{#if error}<span class="error" id={errorId}>{error}</span>{/if}
</p>

<style>
	.field {
		display: grid;
		gap: var(--space-2xs);
	}

	label {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	input,
	textarea,
	select {
		border: var(--border-thin) solid var(--color-border-field);
		border-radius: var(--radius-md);
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-bg-alt);
		font-size: var(--text-sm);
		transition: border-color var(--duration-fast) var(--ease-out);

		&:hover {
			border-color: var(--color-accent);
		}
	}

	textarea {
		min-block-size: 8rem;
		line-height: var(--leading-snug);
		resize: vertical;
	}

	[aria-invalid] {
		border-color: var(--color-danger);
	}

	.error {
		color: var(--color-danger);
		font-size: var(--text-xs);
	}
</style>
