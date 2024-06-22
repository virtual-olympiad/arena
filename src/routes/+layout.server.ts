import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url, locals: { supabase, safeGetSession } }) => {
    const { session, user } = await safeGetSession();

    let profile;

    if (session) {
        ({ data: profile } = await supabase
            .from('profiles')
            .select(`username, display_name, arena_room`)
            .eq('id', session.user.id)
            .single());
    }

    return {
        session,
        user,
        profile
    };
}) satisfies LayoutServerLoad;
