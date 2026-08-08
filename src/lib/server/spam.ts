import { env } from '$env/dynamic/private';

const algorithm = { name: 'HMAC', hash: 'SHA-256' };
const encoder = new TextEncoder();
const key = crypto.subtle.importKey(
	'raw',
	encoder.encode(env.CONTACT_SECRET || crypto.randomUUID()),
	algorithm,
	false,
	['sign', 'verify']
);

const minFillTime = 3_000;
const maxFormAge = 6 * 60 * 60 * 1000;
const windowLength = 60 * 60 * 1000;
const maxPerWindow = 5;
const maxTracked = 5_000;

const seen = new Map<string, number[]>();

const blocked = (why: string) => {
	console.warn(`[contact] blocked: ${why}`);

	return true;
};

const toHex = (signature: ArrayBuffer) =>
	[...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');

const toBytes = (hex: string) =>
	Uint8Array.from(hex.match(/../g) ?? [], (pair) => Number.parseInt(pair, 16));

export async function issueStamp() {
	const issued = String(Date.now());
	const signature = await crypto.subtle.sign(algorithm, await key, encoder.encode(issued));

	return `${issued}.${toHex(signature)}`;
}

export async function submittedByBot(form: FormData) {
	if (form.get('website')) return blocked('honeypot was filled in');

	const [issued, signature = ''] = String(form.get('stamp') ?? '').split('.');
	const age = Date.now() - Number(issued);

	if (!(age > minFillTime && age < maxFormAge)) return blocked(`form was ${age}ms old`);

	const signed = await crypto.subtle
		.verify(algorithm, await key, toBytes(signature), encoder.encode(issued))
		.catch(() => false);

	return signed ? false : blocked('stamp signature did not verify');
}

export function sendingTooOften(address: string) {
	const now = Date.now();
	const recent = (times: number[] = []) => times.filter((time) => now - time < windowLength);

	if (seen.size > maxTracked)
		for (const [ip, times] of seen) if (!recent(times).length) seen.delete(ip);

	const times = [...recent(seen.get(address)), now];

	seen.set(address, times);

	return times.length > maxPerWindow && blocked(`${times.length} messages within the hour`);
}
