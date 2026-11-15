import { sourceUrl } from '$lib/projects';
import type { Post, Project } from '$lib/types';

/* structured data for search engines, Seo adds each page's name, description and url */

export const collection = (items: object[]) => ({
	'@type': 'CollectionPage',
	mainEntity: {
		'@type': 'ItemList',
		numberOfItems: items.length,
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item
		}))
	}
});

export const sourceCode = (project: Project, image?: string) => ({
	'@type': 'SoftwareSourceCode',
	name: project.name,
	description: project.blurb,
	url: project.website ?? sourceUrl(project),
	codeRepository: sourceUrl(project),
	programmingLanguage: project.lang,
	license: project.license && `https://spdx.org/licenses/${project.license}`,
	image
});

export const blogPost = (post: Post) => ({
	'@type': 'BlogPosting',
	headline: post.title,
	url: post.url,
	datePublished: post.date
});
