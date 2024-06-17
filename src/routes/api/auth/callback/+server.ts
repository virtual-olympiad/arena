import { error, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.js';

export const GET = async (event) => {
	const { url } = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		const { error: e } = await supabase.auth.exchangeCodeForSession(code);
		if (!e) {
			throw redirect(303, `/${next.slice(1)}`);
		}

		throw error(e.status ?? 400, e.code);
	}

	// return the user to an error page with instructions
	throw error(400);
};
