import { allPosts } from '$lib/server/feeds';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await allPosts();

	return { years: [...Map.groupBy(posts, (post) => post.date.slice(0, 4))], total: posts.length };
};
