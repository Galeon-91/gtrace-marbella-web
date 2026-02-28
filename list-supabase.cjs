require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function listAll() {
  console.log('🔍 EXPLORANDO SUPABASE STORAGE\n');
  console.log('Bucket: gtrace-assets\n');
  
  // Listar TODO en la raíz
  const { data, error } = await supabase.storage
    .from('gtrace-assets')
    .list('', { limit: 1000 });
  
  if (error) {
    console.log('❌ Error:', error.message);
    return;
  }
  
  console.log('📁 CARPETAS Y ARCHIVOS EN LA RAÍZ:\n');
  
  if (!data || data.length === 0) {
    console.log('⚠️  El bucket está vacío o no tienes permisos\n');
    return;
  }
  
  for (const item of data) {
    if (item.id === null) {
      console.log(`📂 ${item.name}/ (carpeta)`);
    } else {
      console.log(`📄 ${item.name} (${Math.round(item.metadata?.size / 1024)}KB)`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('💡 COPIA LOS NOMBRES DE LAS CARPETAS');
  console.log('   Y actualiza el CONFIG en auto-optimize.cjs\n');
}

listAll().catch(console.error);
