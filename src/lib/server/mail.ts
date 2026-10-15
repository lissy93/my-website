import { env } from '$env/dynamic/private';

type Message = { reason: string; name: string; email: string; message: string };

const endpoint = 'https://api.resend.com/emails';

const displayName = (name: string) =>
	name
		.replace(/[\r\n"<>\\]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

const mailbox = (from: string) => from.match(/<([^>]+)>/)?.[1] ?? from;

export async function deliver({ reason, name, email, message }: Message) {
	const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = env;

	if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) {
		console.error(
			'[contact] not configured: RESEND_API_KEY, CONTACT_FROM and CONTACT_TO are all required'
		);

		return false;
	}

	try {
		const res = await fetch(endpoint, {
			method: 'POST',
			headers: { authorization: `Bearer ${RESEND_API_KEY}`, 'content-type': 'application/json' },
			body: JSON.stringify({
				from: `"${displayName(name)} via website" <${mailbox(CONTACT_FROM)}>`,
				to: [CONTACT_TO],
				reply_to: email,
				subject: `[${reason}] Website message from ${displayName(name)}`,
				text: `${message}\n\n${reason}\nFrom ${name} <${email}>`
			}),
			signal: AbortSignal.timeout(10_000)
		});

		if (res.ok) return true;

		console.error(`[contact] Resend refused the message (${res.status}): ${await res.text()}`);
	} catch (error) {
		console.error('[contact] could not reach Resend:', error);
	}

	return false;
}
