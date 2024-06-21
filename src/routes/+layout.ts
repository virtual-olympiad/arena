// src/routes/+layout.ts
import { PUBLIC_SB_ANON_KEY, PUBLIC_SB_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';

export const load = (async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient(PUBLIC_SB_URL, PUBLIC_SB_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key) {
				if (!isBrowser()) {
					return JSON.stringify(data.session);
				}

				const cookie = parse(document.cookie);
				return cookie[key];
			}
		},
		auth: {
			flowType: 'pkce'
		}
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

    const user = session?.user;

	return { supabase, session, user, profile: data.profile };
}) satisfies LayoutLoad;
