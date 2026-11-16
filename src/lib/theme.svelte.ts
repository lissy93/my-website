import { on } from 'svelte/events';
import { MediaQuery } from 'svelte/reactivity';

type Theme = 'light' | 'dark';

const key = 'theme';
const systemDark = new MediaQuery('(prefers-color-scheme: dark)');
let picked = $state<Theme>();

const valid = (value?: string | null): Theme | undefined =>
	value === 'light' || value === 'dark' ? value : undefined;

const system = (): Theme => (systemDark.current ? 'dark' : 'light');

/* when the browser's toolbar should use a scheme's colour: with the system, or always or never */
function toolbarMedia(scheme?: string, theme?: Theme) {
	if (!theme) return `(prefers-color-scheme: ${scheme})`;
	return scheme === theme ? 'all' : 'not all';
}

/* puts a pick on the page and the browser's toolbar, or clears it to follow the system */
function show(theme?: Theme) {
	picked = theme;
	const root = document.documentElement;
	if (theme) root.dataset.theme = theme;
	else delete root.dataset.theme;

	for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
		meta.media = toolbarMedia(meta.dataset.scheme, theme);
	}
}

/* a pick that matches the system is forgotten, so the site goes back to following it */
function pick(theme: Theme) {
	show(theme === system() ? undefined : theme);
	try {
		if (picked) localStorage.setItem(key, picked);
		else localStorage.removeItem(key);
	} catch {
		/* storage is blocked, so the pick lasts until the next full load */
	}
}

export const theme = {
	get dark() {
		return picked ? picked === 'dark' : systemDark.current;
	},

	/* dissolves the page into the other theme, where the browser can */
	toggle() {
		const update = () => pick(theme.dark ? 'light' : 'dark');
		const fade =
			'startViewTransition' in document &&
			CSS.supports('selector(:active-view-transition-type(theme))') &&
			!matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (fade) document.startViewTransition({ update, types: ['theme'] });
		else update();
	},

	/* picks up the theme the page loaded with, then any picked in other tabs */
	watch() {
		show(valid(document.documentElement.dataset.theme));
		return on(window, 'storage', (event) => {
			if (event.key === key) show(valid(event.newValue));
		});
	}
};
