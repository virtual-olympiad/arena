import { redirect } from '@sveltejs/kit';
import type { LayoutLoad, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase } }) => {
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
        rooms
    };
}) satisfies PageServerLoad;