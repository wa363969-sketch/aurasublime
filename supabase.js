import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes('your_supabase') &&
  !SUPABASE_ANON_KEY.includes('your_supabase')
);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

if (!isSupabaseConfigured) {
  console.info(
    '%c[AURA SUBLIME]%c Supabase credentials not found or placeholder in .env. Running on local persistent layer. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to activate cloud PostgreSQL & Storage.',
    'color: #C5A059; font-weight: bold;',
    'color: inherit;'
  );
}
