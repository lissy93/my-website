const notes = 'https://notes.aliciasykes.com';

/* the old site served each post at /blog/<its title, slugified>, they all live on notes now */
const posts: Record<string, string> = {
	'20-amazing-collections-for-self-taught-developers-':
		'42310/20-amazing-collections-for-self-taught-developers',
	'20-git-commands-you-probably-didnt-know-': '41171/20-git-commands-you-probably-didn-t-know',
	'50-awesome-dev-tool-tips-': '40065/50-awesome-dev-tool-tips',
	'50-ways-to-bring-in-extra-cash-as-a-developer-':
		'47804/50-ways-to-bring-in-extra-cash-as-a-developer',
	'ahk-use-arrow-keys-as-modfifiers': '25326/ahk-use-arrow-keys-as-modfifiers',
	'aht-gpg-public-key-': '13403/aht-gpg-public-key',
	'astro-is-pretty-cool-': '51203/astro-is-pretty-cool',
	'cli-tools-you-cant-live-without-': '41983/cli-tools-you-can-t-live-without',
	'comparison-of-private--secure-emai-providers-':
		'35375/comparison-of-private-secure-emai-providers',
	'custom-styling-for-listed-blog-': '18756/custom-styling-for-listed-blog',
	'dashy---a-self-hosted-home-lab-dashboard-': '25291/dashy-a-self-hosted-home-lab-dashboard',
	'epic-internet-stuff-': '18724/epic-internet-stuff',
	'errors-and-solutions-': '24099/errors-and-solutions',
	'expressing-my-gratitude-to-the-universe-': '18762/expressing-my-gratitude-to-the-universe',
	'fave-youtube-chanels-': '16496/fave-youtube-chanels',
	'fun-with-consolelog-': '38041/fun-with-console-log',
	'fun-with-real-time-data-': '18611/fun-with-real-time-data',
	'generate-pretty-code--app-screenshots-': '40473/generate-pretty-code-app-screenshots',
	'github-markdown-tricks-': '36402/github-markdown-tricks',
	'hello-world-': '13001/hello-world',
	'how-to-compile--install-software-on-arch-': '16801/how-to-compile-install-software-on-arch',
	'how-to-enable-disable-pi-hole-from-cli-': '13402/how-to-enable-disable-pi-hole-from-cli',
	'how-to-mullvad-vpn-using-wireguard-on-opnsense-':
		'18842/how-to-mullvad-vpn-using-wireguard-on-opnsense',
	'how-to-operate-the-sharkjack-': '14972/how-to-operate-the-sharkjack',
	'how-to-remove-all-node_modules-folders-': '16988/how-to-remove-all-node_modules-folders',
	'how-to-use-ssh-for-server-authentication-': '15742/how-to-use-ssh-for-server-authentication',
	'introduction-to-digital-privacy--security-': '17371/introduction-to-digital-privacy-security',
	'keep-mouse-movinsh-': '16818/keep-mouse-movin-sh',
	'key-mirrorts-': '16769/key-mirror-ts',
	'my-life-in-months-': '24701/my-life-in-months',
	'my-server-setup-': '22798/my-server-setup',
	'my-thoughts-on-tailwind-': '49557/my-thoughts-on-tailwind',
	'my-top-50-android-apps-': '18336/my-top-50-android-apps',
	'my-top-50-windows-apps-': '21879/my-top-50-windows-apps',
	'my-worry-about-the-future-of-keybase-': '14871/my-worry-about-the-future-of-keybase',
	'npm-dependency-security-best-practices-': '28300/npm-dependency-security-best-practices',
	'one-line-web-server-': '32456/one-line-web-server',
	'pi-zero-tor-routed-access-point-': '19109/pi-zero-tor-routed-access-point',
	'pimping-up-your-duckduckgo-search-results-': '23054/pimping-up-your-duckduckgo-search-results',
	'project-ideas-agile-': '48239/project-ideas-agile',
	'quick-how-to-guides-': '23844/quick-how-to-guides',
	'quick-tip-git-submodules': '17996/quick-tip-git-submodules',
	'react-grid-system-': '16564/react-grid-system',
	'reference-infosec-abbreviations-': '18536/reference-infosec-abbreviations',
	'reference-using-variable-fonts-in-css-': '20679/reference-using-variable-fonts-in-css',
	'reference-wireshark-display-filters-': '18452/reference-wireshark-display-filters',
	'spelling-auto-correct-system-': '22944/spelling-auto-correct-system',
	'ssh-tarpit-with-endlessh-': '23745/ssh-tarpit-with-endlessh',
	'super-useful-css-resources-': '40638/super-useful-css-resources',
	'sveltekit-10---building-a-blog-that-fetches-from-rss-':
		'42764/sveltekit-1-0-building-a-blog-that-fetches-from-rss',
	'top-25-raspberry-pi-projects-': '23239/top-25-raspberry-pi-projects',
	'try-': '25192/try',
	'trying-out-solidjs-': '48068/trying-out-solid-js',
	'using-espanso-to-boost-efficiency-': '25213/using-espanso-to-boost-efficiency'
};

/* old pages, plus the files that old HTML, manifests and share cards still point at */
const paths: Record<string, string> = {
	'/index': '/',
	'/supporters': 'https://github.com/sponsors/Lissy93',
	'/feed.rss': `${notes}/feed`,
	'/manifest.json': '/manifest.webmanifest',
	'/favicon.png': '/icon-192.png',
	'/preview.png': '/og.png',
	'/pwa/android-chrome-192x192.png': '/icon-192.png',
	'/pwa/android-chrome-512x512.png': '/icon-512.png'
};

/* an old post we don't know about still lands on the blog, rather than a 404 */
export function movedTo(pathname: string) {
	const path = pathname.replace(/\/$/, '');
	if (!path.startsWith('/blog/')) return paths[path];

	const post = posts[path.slice('/blog/'.length)];
	return post ? `${notes}/${post}` : '/blog';
}
