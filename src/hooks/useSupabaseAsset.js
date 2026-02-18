import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';

/**
 * Hook para cargar assets (imágenes, videos) desde Supabase Storage
 * 
 * @param {string} path - Ruta del archivo en el bucket (ej: 'backgrounds/dashboard-bg.jpg')
 * @param {string} bucket - Nombre del bucket (default: 'site-assets')
 * @returns {object} { url, loading, error }
 * 
 * @example
 * const { url, loading } = useSupabaseAsset('backgrounds/home-hero.jpg');
 * 
 * {url && <img src={url} alt="Hero" />}
 */
export const useSupabaseAsset = (path, bucket = 'site-assets') => {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) {
      setLoading(false);
      return;
    }

    const loadAsset = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener URL pública del asset
        const { data } = supabase.storage
          .from(bucket)
          .getPublicUrl(path);

        if (data?.publicUrl) {
          setUrl(data.publicUrl);
        } else {
          setError('No se pudo obtener la URL');
        }
      } catch (err) {
        console.error('Error loading asset:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAsset();
  }, [path, bucket]);

  return { url, loading, error };
};

/**
 * Hook para cargar múltiples assets desde Supabase Storage
 * 
 * @param {Array<string>} paths - Array de rutas de archivos
 * @param {string} bucket - Nombre del bucket (default: 'site-assets')
 * @returns {object} { urls, loading, errors }
 * 
 * @example
 * const { urls, loading } = useSupabaseAssets([
 *   'backgrounds/hero.jpg',
 *   'logos/logo-gold.png',
 *   'videos/intro.mp4'
 * ]);
 */
export const useSupabaseAssets = (paths, bucket = 'site-assets') => {
  const [urls, setUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!paths || paths.length === 0) {
      setLoading(false);
      return;
    }

    const loadAssets = async () => {
      try {
        setLoading(true);
        const loadedUrls = {};
        const loadedErrors = {};

        for (const path of paths) {
          try {
            const { data } = supabase.storage
              .from(bucket)
              .getPublicUrl(path);

            if (data?.publicUrl) {
              loadedUrls[path] = data.publicUrl;
            }
          } catch (err) {
            loadedErrors[path] = err.message;
          }
        }

        setUrls(loadedUrls);
        setErrors(loadedErrors);
      } catch (err) {
        console.error('Error loading assets:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, [JSON.stringify(paths), bucket]);

  return { urls, loading, errors };
};

/**
 * Hook para subir archivos a Supabase Storage
 * 
 * @param {string} bucket - Nombre del bucket (default: 'site-assets')
 * @returns {object} { upload, uploading, uploadError, uploadedUrl }
 * 
 * @example
 * const { upload, uploading, uploadedUrl } = useSupabaseUpload();
 * 
 * const handleFileChange = async (e) => {
 *   const file = e.target.files[0];
 *   await upload(file, 'backgrounds/new-bg.jpg');
 * };
 */
export const useSupabaseUpload = (bucket = 'site-assets') => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const upload = async (file, path) => {
    setUploading(true);
    setUploadError(null);
    setUploadedUrl(null);

    try {
      // Subir archivo
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true // Sobrescribir si ya existe
        });

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

      if (data?.publicUrl) {
        setUploadedUrl(data.publicUrl);
        return data.publicUrl;
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setUploadError(err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, uploadError, uploadedUrl };
};

export default useSupabaseAsset;