/* applies a theme picked with the toggle before the first paint, so there's no flash */
try {
	const theme = localStorage.getItem('theme');
	if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
} catch {
	/* storage is blocked, so the page follows the system */
}
