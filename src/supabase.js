
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log("URL Supabase:", supabaseUrl);
console.log("Clave Supabase cargada:", Boolean(supabaseKey));

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Faltan las credenciales de Supabase en el archivo .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
