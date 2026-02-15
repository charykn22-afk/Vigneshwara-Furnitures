import { createClient } from '@supabase/supabase-js'

// Vite requires the 'VITE_' prefix to read these from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The 'export' keyword allows other files to use this connection
export const supabase = createClient(supabaseUrl, supabaseAnonKey)