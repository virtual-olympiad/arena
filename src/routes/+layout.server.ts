import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url, locals: { supabase, safeGetSession } }) => {
    const { session, user } = await safeGetSession();

    const firstPath = url.pathname.split('/')[1];

    if (firstPath == 'signin' || firstPath == 'api') {
        return {
            session,
            user
        };
    }

    if (!session) {
        redirect(303, '/signin');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select(`username, display_name`)
        .eq('id', session.user.id)
        .single();

    return {
        session,
        user,
        profile
    };
}) satisfies LayoutServerLoad;