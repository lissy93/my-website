<script lang="ts">
	let { path }: { path: string } = $props();
</script>

<svg class="glyph" viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg>

<style>
	/* sits on the text like a letter, in the text's colour */
	.glyph {
		display: inline-block;
		inline-size: 1.15em;
		block-size: 1.15em;
		margin-inline-end: 0.4em;
		vertical-align: -0.2em;
		fill: currentcolor;
	}
</style>
