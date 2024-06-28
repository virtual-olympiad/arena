import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load = (async ({ parent, locals: { supabase, safeGetSession } }) => {
    const { session, user } = await parent();

    if (!session) {
        redirect(303, '/signin');
    }

    const { data } = await supabase
        .from('arena_users_rooms')
        .select(
            `
            arena_rooms (
                code,
                title,
                description,
                mode,
                host,
                players,
                max_players
            )
            `
        )
        .eq('user_id', user.id).limit(1).single();

    const room = data?.arena_rooms;

    if (!room) {
        redirect(303, '/');
    }

    return {
        room
    };
}) satisfies PageServerLoad;
