import { fail } from '@sveltejs/kit';
import { reasons } from '$lib/config';
import { deliver } from '$lib/server/mail';
import { issueStamp, sendingTooOften, submittedByBot } from '$lib/server/spam';
import type { ContactFields, ContactResult } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async () => ({ stamp: await issueStamp() });

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const actions: Actions = {
	default: async ({ request, getClientAddress }) => {
		const form = await request.formData();
		const read = (field: ContactFields) => String(form.get(field) ?? '').trim();
		const values = {
			reason: read('reason'),
			name: read('name'),
			email: read('email'),
			message: read('message')
		};

		if (await submittedByBot(form)) return { sent: true } satisfies ContactResult;

		const errors: ContactResult['errors'] = {};
		const chosen = reasons.find(({ value }) => value === values.reason);

		if (!chosen) errors.reason = 'Please pick one of the listed reasons';
		if (values.name.length < 2 || values.name.length > 60)
			errors.name = 'Please add your name, between 2 and 60 characters';
		if (values.email.length > 120 || !emailPattern.test(values.email))
			errors.email = 'That email address doesn’t look right';
		if (values.message.length < 20 || values.message.length > 2000)
			errors.message = 'Messages need to be between 20 and 2000 characters';

		if (!chosen || Object.keys(errors).length)
			return fail(400, { errors, values } satisfies ContactResult);

		if (sendingTooOften(getClientAddress())) return { sent: true } satisfies ContactResult;

		const sent = await deliver({ ...values, reason: chosen.label });

		return sent
			? ({ sent: true } satisfies ContactResult)
			: fail(502, { failed: true, values } satisfies ContactResult);
	}
};
