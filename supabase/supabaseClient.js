import { createClient } from '@supabase/supabase-js';

// Credenciales desde variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que las credenciales existen
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Error: Faltan las credenciales de Supabase en el archivo .env');
  console.error('Asegúrate de tener:');
  console.error('- VITE_SUPABASE_URL');
  console.error('- VITE_SUPABASE_ANON_KEY');
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Log para desarrollo (solo en desarrollo)
if (import.meta.env.DEV) {
  console.log('✅ Supabase client initialized');
  console.log('📍 URL:', supabaseUrl);
}