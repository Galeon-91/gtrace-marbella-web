#!/usr/bin/env node
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);

const CONFIG = {
  bucketName: 'site-assets',
  folders: ['gallery', 'services', 'club', 'racing', 'wrapping', 'videos', 'images'],
  images: { quality: 85, maxWidth: 1920, formats: ['jpg', 'jpeg', 'png', 'webp'], outputFormat: 'webp' },
  videos: { codec: 'libx265', crf: 28, maxWidth: 1920, formats: ['mp4', 'mov', 'avi', 'webm'], outputFormat: 'mp4' },
  tempDir: './temp-optimization',
  keepOriginals: true,
  originalSuffix: '.original',
  minFileSize: 100 * 1024,
};

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: Faltan credenciales');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

async function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) await mkdir(dirPath, { recursive: true });
}

function getFileExtension(filename) {
  return path.extname(filename).toLowerCase().replace('.', '');
}

function isImage(filename) {
  const ext = getFileExtension(filename);
  return CONFIG.images.formats.includes(ext);
}

function isVideo(filename) {
  const ext = getFileExtension(filename);
  return CONFIG.videos.formats.includes(ext);
}

async function downloadFromSupabase(remotePath, localPath) {
  const { data, error } = await supabase.storage.from(CONFIG.bucketName).download(remotePath);
  if (error) throw new Error(`Error downloading: ${error.message}`);
  const arrayBuffer = await data.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.promises.writeFile(localPath, buffer);
  return buffer.length;
}

async function uploadToSupabase(localPath, remotePath, contentType) {
  const fileBuffer = fs.readFileSync(localPath);
  const { data, error } = await supabase.storage.from(CONFIG.bucketName).upload(remotePath, fileBuffer, {
    contentType: contentType, upsert: true, cacheControl: '31536000'
  });
  if (error) throw new Error(`Error uploading: ${error.message}`);
  return data;
}

async function backupOriginal(remotePath) {
  if (!CONFIG.keepOriginals) return;
  const backupPath = remotePath + CONFIG.originalSuffix;
  const { error } = await supabase.storage.from(CONFIG.bucketName).copy(remotePath, backupPath);
  if (error && !error.message.includes('already exists')) {
    console.log(`   ⚠️  No se pudo hacer backup`);
  }
}

async function optimizeImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  let pipeline = image;
  if (metadata.width > CONFIG.images.maxWidth) {
    pipeline = pipeline.resize(CONFIG.images.maxWidth, null, { withoutEnlargement: true, fit: 'inside' });
  }
  await pipeline.webp({ quality: CONFIG.images.quality, effort: 6 }).toFile(outputPath);
  const inputSize = fs.statSync(inputPath).size;
  const outputSize = fs.statSync(outputPath).size;
  return {
    inputSize, outputSize,
    saved: inputSize - outputSize,
    savedPercent: ((inputSize - outputSize) / inputSize * 100).toFixed(1)
  };
}

async function optimizeVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const inputSize = fs.statSync(inputPath).size;
    ffmpeg(inputPath)
      .videoCodec(CONFIG.videos.codec)
      .outputOptions([`-crf ${CONFIG.videos.crf}`, '-preset medium', `-vf scale='min(${CONFIG.videos.maxWidth},iw):-2'`, '-movflags +faststart'])
      .audioCodec('aac').audioBitrate('128k')
      .on('progress', (progress) => {
        if (progress.percent) process.stdout.write(`\r   ⏳ Progreso: ${Math.round(progress.percent)}%`);
      })
      .on('end', () => {
        console.log('\r   ✅ Video optimizado                    ');
        const outputSize = fs.statSync(outputPath).size;
        const saved = inputSize - outputSize;
        const savedPercent = ((saved / inputSize) * 100).toFixed(1);
        resolve({ inputSize, outputSize, saved, savedPercent });
      })
      .on('error', (err) => reject(new Error(`FFmpeg error: ${err.message}`)))
      .save(outputPath);
  });
}

async function processFile(file, remotePath) {
  const filename = path.basename(remotePath);
  const ext = getFileExtension(filename);
  const fileType = isImage(filename) ? 'image' : 'video';
  console.log(`\n📁 ${filename}`);
  console.log(`   Tipo: ${fileType.toUpperCase()}`);
  await ensureDir(CONFIG.tempDir);
  const tempInput = path.join(CONFIG.tempDir, `input_${filename}`);
  const tempOutput = path.join(CONFIG.tempDir, `output_${filename.replace(ext, fileType === 'image' ? 'webp' : 'mp4')}`);
  try {
    console.log(`   ⬇️  Descargando...`);
    const downloadedSize = await downloadFromSupabase(remotePath, tempInput);
    console.log(`   📦 Tamaño original: ${formatBytes(downloadedSize)}`);
    if (downloadedSize < CONFIG.minFileSize) {
      console.log(`   ⏭️  Archivo muy pequeño, omitiendo`);
      await unlink(tempInput);
      return null;
    }
    console.log(`   💾 Haciendo backup...`);
    await backupOriginal(remotePath);
    console.log(`   ⚙️  Optimizando...`);
    let result;
    if (fileType === 'image') {
      result = await optimizeImage(tempInput, tempOutput);
    } else {
      result = await optimizeVideo(tempInput, tempOutput);
    }
    console.log(`   📊 Resultado: ${formatBytes(result.inputSize)} → ${formatBytes(result.outputSize)}`);
    console.log(`   💰 Ahorro: ${formatBytes(result.saved)} (${result.savedPercent}%)`);
    console.log(`   ⬆️  Subiendo optimizado...`);
    const newExt = fileType === 'image' ? '.webp' : '.mp4';
    const newRemotePath = remotePath.replace(new RegExp(`\\.${ext}$`), newExt);
    const contentType = fileType === 'image' ? 'image/webp' : 'video/mp4';
    await uploadToSupabase(tempOutput, newRemotePath, contentType);
    console.log(`   ✅ Subido: ${newRemotePath}`);
    await unlink(tempInput);
    await unlink(tempOutput);
    return { ...result, originalPath: remotePath, newPath: newRemotePath, type: fileType };
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    if (fs.existsSync(tempInput)) await unlink(tempInput);
    if (fs.existsSync(tempOutput)) await unlink(tempOutput);
    return null;
  }
}

async function listFiles(folder) {
  const { data, error } = await supabase.storage.from(CONFIG.bucketName).list(folder, { limit: 1000, offset: 0 });
  if (error) throw new Error(`Error listing files: ${error.message}`);
  return data || [];
}

async function main() {
  console.log('🚀 OPTIMIZADOR AUTOMÁTICO GT RACE MARBELLA');
  console.log('==========================================\n');
  console.log('⚙️  Configuración:');
  console.log(`   Bucket: ${CONFIG.bucketName}`);
  console.log(`   Imágenes: WebP ${CONFIG.images.quality}%`);
  console.log(`   Videos: H.265 CRF ${CONFIG.videos.crf}`);
  console.log(`   Backup originales: ${CONFIG.keepOriginals ? 'Sí' : 'No'}\n`);
  let totalFiles = 0;
  let processedFiles = 0;
  let totalInputSize = 0;
  let totalOutputSize = 0;
  const changedPaths = [];
  for (const folder of CONFIG.folders) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📂 CARPETA: ${folder}`);
    console.log('='.repeat(60));
    try {
      const files = await listFiles(folder);
      if (files.length === 0) {
        console.log('   ℹ️  Sin archivos');
        continue;
      }
      console.log(`   Encontrados: ${files.length} archivos`);
      for (const file of files) {
        if (file.id === null) continue;
        const remotePath = `${folder}/${file.name}`;
        if (!isImage(file.name) && !isVideo(file.name)) continue;
        totalFiles++;
        const result = await processFile(file, remotePath);
        if (result) {
          processedFiles++;
          totalInputSize += result.inputSize;
          totalOutputSize += result.outputSize;
          if (result.originalPath !== result.newPath) {
            changedPaths.push({ old: result.originalPath, new: result.newPath });
          }
        }
      }
    } catch (error) {
      console.log(`   ❌ Error procesando carpeta: ${error.message}`);
    }
  }
  if (fs.existsSync(CONFIG.tempDir)) {
    fs.rmSync(CONFIG.tempDir, { recursive: true });
  }
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN FINAL');
  console.log('='.repeat(60));
  console.log(`Total archivos encontrados: ${totalFiles}`);
  console.log(`Archivos procesados: ${processedFiles}`);
  console.log(`\n📦 Tamaño original: ${formatBytes(totalInputSize)}`);
  console.log(`📦 Tamaño optimizado: ${formatBytes(totalOutputSize)}`);
  if (totalInputSize > 0) {
    const totalSaved = totalInputSize - totalOutputSize;
    const totalSavedPercent = ((totalSaved / totalInputSize) * 100).toFixed(1);
    console.log(`💰 Ahorro total: ${formatBytes(totalSaved)} (${totalSavedPercent}%)`);
  }
  if (changedPaths.length > 0) {
    console.log('\n📝 RUTAS CAMBIADAS EN CÓDIGO:');
    console.log('='.repeat(60));
    changedPaths.forEach(({ old, new: newPath }) => {
      console.log(`\n   ❌ ${old}`);
      console.log(`   ✅ ${newPath}`);
    });
    console.log('\n⚠️  IMPORTANTE: Actualiza estas rutas en tu código!');
  }
  console.log('\n✅ ¡OPTIMIZACIÓN COMPLETADA!');
  console.log('\n📝 Próximos pasos:');
  console.log('   1. Actualiza las rutas en el código');
  console.log('   2. git commit y push');
  console.log('   3. Verifica en producción\n');
}

main().catch(error => {
  console.error('\n❌ Error fatal:', error);
  process.exit(1);
});
