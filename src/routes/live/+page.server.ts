import { redirect } from '@sveltejs/kit';

export const load = (async ({ parent, locals: { supabase, safeGetSession } }) => {
    const { session, user, profile } = await parent();

    if (!session) {
        redirect(303, '/signin');
    }

    if (!profile?.arena_room){
        redirect(303, '/');
    }

    const { data: room } = await supabase
        .from('arena_rooms')
        .select()
        .eq('code', profile.arena_room)
        .single();

    return {
        room
    };
});