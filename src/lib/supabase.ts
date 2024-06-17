import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SB_PROJECT_URL, PUBLIC_SB_ANON_KEY } from "$env/static/public";

export const supabase = createClient(PUBLIC_SB_PROJECT_URL, PUBLIC_SB_ANON_KEY);