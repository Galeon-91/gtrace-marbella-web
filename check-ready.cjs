#!/usr/bin/env node
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

async function main() {
  console.log('🔍 VERIFICACIÓN PREVIA\n');
  console.log('='.repeat(50));
  let allGood = true;

  // Dependencias
  console.log('\n📦 Verificando dependencias Node...');
  const deps = ['@supabase/supabase-js', 'sharp', 'fluent-ffmpeg', 'dotenv'];
  for (const dep of deps) {
    try {
      require(dep);
      console.log(`   ✅ ${dep}`);
    } catch (error) {
      console.log(`   ❌ ${dep} - FALTA`);
      allGood = false;
    }
  }

  // FFmpeg
  console.log('\n🎬 Verificando FFmpeg...');
  try {
    const { stdout } = await execAsync('ffmpeg -version');
    console.log(`   ✅ ${stdout.split('\n')[0]}`);
  } catch (error) {
    console.log('   ⚠️  FFmpeg NO instalado');
  }

  // Credenciales
  console.log('\n🔐 Verificando credenciales...');
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.log('   ❌ Faltan credenciales en .env');
    allGood = false;
  } else {
    console.log('   ✅ VITE_SUPABASE_URL');
    console.log('   ✅ VITE_SUPABASE_ANON_KEY');
    
    console.log('\n🔗 Verificando conexión Supabase...');
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      const { error } = await supabase.storage.from('site-assets').list('', { limit: 1 });
      
      if (error) {
        console.log('   ❌ Error:', error.message);
        allGood = false;
      } else {
        console.log('   ✅ Conexión exitosa');
      }
    } catch (error) {
      console.log('   ❌ Error:', error.message);
      allGood = false;
    }
  }

  console.log('\n' + '='.repeat(50));
  if (allGood) {
    console.log('✅ TODO LISTO PARA OPTIMIZAR!\n');
    console.log('Ejecuta: node auto-optimize.cjs\n');
  } else {
    console.log('⚠️  HAY PROBLEMAS - Revisa arriba\n');
  }
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
