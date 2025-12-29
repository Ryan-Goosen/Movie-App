import { createClient } from "@supabase/supabase-js";

const BASE_DB_URL = import.meta.env.VITE_APP_SUPABASE_PUBLISHABLE_URL;
const DB_API_KEY = import.meta.env.VITE_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
console.log(DB_API_KEY)
console.log(BASE_DB_URL)
export const supabase = createClient(BASE_DB_URL, DB_API_KEY);

// # TEST