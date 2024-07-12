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
                private,
                players,
                max_players
            )
            `
        )
        .eq('user_id', user.id).limit(1).single();
    
    let room;

    if (Array.isArray(data?.arena_rooms)){
        room = data?.arena_rooms[0];
    } else {
        room = data?.arena_rooms;
    }

    if (!room) {
        redirect(303, '/');
    }

    let { data: playersData } = await supabase
        .from('arena_users_rooms')
        .select(
            `
            profiles (
                id,
                username,
                display_name,
                status_text
            )
            `
        )
        .eq('room_code', room.code);
    
    let players = playersData?.map((player)=> {
        if (Array.isArray(player.profiles)){
            return player.profiles[0] as Player;
        }

        return player.profiles as Player;
    });

    if (!players){
        redirect(303, '/');
    }

    return {
        room,
        players
    };
}) satisfies PageServerLoad;
