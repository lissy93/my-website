import type { Job } from './types';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* '2024-11' reads as Nov 2024, a year stays a year, and nothing at all is now */
export function month(when?: string) {
	if (!when) return 'now';
	const [year, m] = when.split('-');
	return m ? `${months[+m - 1]} ${year}` : year;
}

export const jobSpan = ({ from, to }: Pick<Job, 'from' | 'to'>) => `${month(from)} – ${month(to)}`;
