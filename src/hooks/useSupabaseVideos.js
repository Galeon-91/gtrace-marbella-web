import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';

/**
 * Hook para cargar videos desde Supabase Storage
 * @param {string} folder - Carpeta donde están los videos (ej: 'racing/videos')
 * @returns {Object} - { videos: Array, loading: boolean }
 */
export const useSupabaseVideos = (folder) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Listar todos los archivos en la carpeta
        const { data: files, error: listError } = await supabase
          .storage
          .from('site-assets')
          .list(folder, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (listError) throw listError;

        if (!files || files.length === 0) {
          setVideos([]);
          setLoading(false);
          return;
        }

        // Filtrar solo archivos de video
        const videoFiles = files.filter(file => 
          file.name.match(/\.(mp4|webm|mov|avi)$/i) && 
          !file.name.startsWith('.')
        );

        // Obtener URLs públicas para cada video
        const videosWithUrls = videoFiles.map((file) => {
          const { data } = supabase
            .storage
            .from('site-assets')
            .getPublicUrl(`${folder}/${file.name}`);

          // Extraer información del nombre del archivo
          // Formato esperado: "1_titulo-del-video_categoria_duracion.mp4"
          // Ejemplo: "1_highlights-2024_highlights_5-32.mp4"
          const nameParts = file.name.replace(/\.(mp4|webm|mov|avi)$/i, '').split('_');
          
          return {
            url: data.publicUrl,
            thumbnail: data.publicUrl, // Se puede mejorar con un thumbnail separado
            title: nameParts[1]?.replace(/-/g, ' ') || file.name,
            category: nameParts[2] || 'general',
            duration: nameParts[3]?.replace('-', ':') || '0:00',
            filename: file.name,
            size: file.metadata?.size || 0,
            created_at: file.created_at
          };
        });

        setVideos(videosWithUrls);
      } catch (err) {
        console.error('Error loading videos:', err);
        setError(err.message);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    if (folder) {
      loadVideos();
    }
  }, [folder]);

  return { videos, loading, error };
};

// Hook alternativo con configuración manual (si prefieres controlar los videos)
export const useSupabaseVideosManual = (videoConfigs) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);

        const videosWithUrls = await Promise.all(
          videoConfigs.map(async (config) => {
            const { data } = supabase
              .storage
              .from('site-assets')
              .getPublicUrl(config.path);

            return {
              url: data.publicUrl,
              thumbnail: config.thumbnail || data.publicUrl,
              title: config.title,
              category: config.category,
              duration: config.duration
            };
          })
        );

        setVideos(videosWithUrls);
      } catch (err) {
        console.error('Error loading videos:', err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    if (videoConfigs && videoConfigs.length > 0) {
      loadVideos();
    }
  }, [videoConfigs]);

  return { videos, loading };
};