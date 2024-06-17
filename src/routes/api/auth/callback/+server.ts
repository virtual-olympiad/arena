import { error, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.js';

export async function GET({ url }) {
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		console.log(url);
		console.log(code);
		const { error: e } = await supabase.auth.exchangeCodeForSession(code);
		console.log(await supabase.auth.getSession());
		console.log(await supabase.auth.getUser());

		if (!e) {
			throw redirect(301, `/${next.slice(1)}`);
		}

		throw error(e.status ?? 400, e.code);
	}

	// return the user to an error page with instructions
	throw error(400);
}
