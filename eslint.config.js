import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default ts.config(
	{ ignores: ['build/', '.svelte-kit/', '.netlify/', '.vercel/'] },
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: { parserOptions: { parser: ts.parser, svelteConfig } }
	},
	// JSON-LD has to be injected raw; the payload is our own, stringified and escaped.
	{ files: ['src/lib/components/Seo.svelte'], rules: { 'svelte/no-at-html-tags': 'off' } }
);
