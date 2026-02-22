import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabaseVideos } from '../../hooks/useSupabaseVideos';
import { VideoCard, VideoModal } from '../../components/VideoCard';

/**
 * Sección de Videos del Equipo
 * Carga videos desde Supabase Storage o usa configuración manual
 */
export const VideosSection = ({ language }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Opción 1: Cargar automáticamente desde Supabase
  const { videos: supabaseVideos, loading } = useSupabaseVideos('racing/videos');

  // Opción 2: Configuración manual (descomenta si prefieres control manual)
  /*
  const manualVideos = [
    {
      url: 'racing/videos/highlights-2024.mp4', // Ruta en Supabase
      thumbnail: 'racing/thumbnails/highlights-thumb.jpg',
      title: language === 'es' ? 'Highlights Temporada 2024' : '2024 Season Highlights',
      duration: '5:32',
      category: 'highlights'
    },
    {
      url: 'https://www.youtube.com/embed/VIDEO_ID', // YouTube embed
      thumbnail: 'racing/thumbnails/bts-thumb.jpg',
      title: language === 'es' ? 'Detrás de Escenas' : 'Behind the Scenes',
      duration: '8:15',
      category: 'bts'
    },
    // ... más videos
  ];
  const { videos: manualLoadedVideos, loading } = useSupabaseVideosManual(manualVideos);
  const videos = manualLoadedVideos;
  */

  // Usar videos de Supabase
  const videos = supabaseVideos;

  const content = {
    es: {
      title: 'Videos del Equipo',
      subtitle: 'Revive la emoción de la pista',
      loading: 'Cargando videos...',
      noVideos: 'No hay videos disponibles',
      uploadNote: '🎥 Sube tus videos a Supabase Storage en: racing/videos/'
    },
    en: {
      title: 'Team Videos',
      subtitle: 'Relive the track excitement',
      loading: 'Loading videos...',
      noVideos: 'No videos available',
      uploadNote: '🎥 Upload your videos to Supabase Storage at: racing/videos/'
    }
  };

  const t = content[language];

  return (
    <>
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.title}
            </h2>
            <p className="text-xl text-gray-300">
              {t.subtitle}
            </p>
          </motion.div>

          {loading ? (
            // Loading State
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-gt-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-xl">{t.loading}</p>
            </div>
          ) : videos.length > 0 ? (
            // Videos Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video, index) => (
                <VideoCard
                  key={index}
                  video={video}
                  index={index}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl mb-8">{t.noVideos}</p>
              <div className="p-6 bg-gt-gold/10 backdrop-blur-xl border border-gt-gold/30 rounded-2xl max-w-2xl mx-auto">
                <p className="text-gray-300">
                  {t.uploadNote}
                </p>
              </div>
            </div>
          )}

          {/* Nota informativa */}
          {videos.length > 0 && (
            <div className="mt-8 p-6 bg-gt-gold/10 backdrop-blur-xl border border-gt-gold/30 rounded-2xl">
              <p className="text-gray-300 text-center">
                {language === 'es' 
                  ? '🎥 Puedes subir videos directos (.mp4) o usar enlaces de YouTube/Vimeo' 
                  : '🎥 You can upload direct videos (.mp4) or use YouTube/Vimeo links'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};