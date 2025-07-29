import { redirect } from '@sveltejs/kit';
import type { LayoutLoad, PageServerLoad } from './$types';

export const load = (async ({ parent, locals: { supabase } }) => {
    const { session, user } = await parent();

    let game = null;

    if (session) {
        const { data } = await supabase
        .from('arena_users_rooms')
        .select(
            `
            room_code
            `
        )
        .eq('user_id', user.id).limit(1).single();
    
        game = data?.room_code;
    }

    let { data: rooms } = await supabase
        .from('arena_rooms')
        .select(`
            code,
            title,
            description,
            mode,
            host,
            players,
            max_players
        `)
        .eq('private', false);

    if (rooms == null){
        rooms = [];
    }
    
    return {
        rooms,
        game
    };
}) satisfies PageServerLoad;