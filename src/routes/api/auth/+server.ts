import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const GET = async () => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: 'https://arena.volympiad.org/api/auth/callback'
		}
	});

	if (data.url) {
		redirect(303, data.url); // use the redirect API for your server framework
	}
};
