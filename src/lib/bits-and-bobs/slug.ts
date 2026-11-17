/* lowercase, with each run of anything but letters and numbers turned into one hyphen */
export const slug = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, '-')
		.replace(/^-|-$/g, '');
