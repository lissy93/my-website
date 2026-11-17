export const barBottom = () =>
	document.querySelector('[data-bar]')?.getBoundingClientRect().bottom ?? 0;

/* the band's bottom edge, or 0 once it's under the bar */
export const bandEdge = () => {
	const bottom = document.querySelector('.masthead')?.getBoundingClientRect().bottom ?? 0;
	return bottom > barBottom() ? bottom : 0;
};
