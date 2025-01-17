import { signUpUserWithEmail } from '$lib/auth/cognito';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({ request, url }) => {
		const data = await request.formData();
		const email = data.get('email');
		const username = data.get('username');
		const password = data.get('password');
		const repeatPassword = data.get('repeatPassword');
		const failProps = {
			name: username,
			email: email,
			password: password,
			repeat: repeatPassword,
			error: 'Failed to create user.'
		};

		if (!password) {
			return fail(422, { ...failProps, error: 'Please enter a password.' });
		}
		if (!repeatPassword) {
			return fail(422, {
				...failProps,
				error: 'Please enter the password twice.'
			});
		}
		if (password !== repeatPassword) {
			return fail(422, {
				...failProps,
				error: 'Please enter the same password twice.'
			});
		}

		try {
			await signUpUserWithEmail(username as string, email as string, password as string);
		} catch (error) {
			return fail(400, {
				...failProps,
				error: (error as Error).message
			});
		}
		throw redirect(303, url.searchParams.get('redirectTo') ?? `/verify/${username}`);
	}
};
