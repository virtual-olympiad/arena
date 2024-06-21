import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession();
    if (session) {
        await supabase.auth.signOut();
        redirect(303, '/');
    }

    return new Response(undefined, { status: 204 });
};
