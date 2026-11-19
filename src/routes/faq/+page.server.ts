import { slug } from '$lib/bits-and-bobs/slug';
import { ending, topics } from '$lib/me/faq';

/* each id is a #link, so a repeat would send two places to one link */
const ids = [
	...topics.flatMap(({ title, questions }) => [slug(title), ...questions.map(({ id }) => id)]),
	ending.id
];
const twice = ids.find((id, index) => ids.indexOf(id) !== index);
if (twice) throw new Error(`"${twice}" is in src/lib/me/faq.ts twice`);
