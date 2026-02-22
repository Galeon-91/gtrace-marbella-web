import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Componente para mostrar una tarjeta de video
 * Soporta tanto videos de Supabase como embeds de YouTube/Vimeo
 */
export const VideoCard = ({ video, index, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Detectar si es un video directo o un embed
  const isDirectVideo = video.url.includes('.mp4') || video.url.includes('.webm');
  const isYouTube = video.url.includes('youtube.com') || video.url.includes('youtu.be');
  const isVimeo = video.url.includes('vimeo.com');

  const handleClick = () => {
    if (onClick) {
      onClick(video);
    } else if (isDirectVideo) {
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="relative bg-white/5 backdrop-blur-2xl rounded-2xl overflow-hidden 
               border border-white/10 hover:border-gt-gold/50 transition-all duration-300 
               cursor-pointer group"
      onClick={handleClick}
    >
      {/* Thumbnail o Video */}
      <div className="relative aspect-video overflow-hidden">
        {!isPlaying ? (
          <>
            {/* Thumbnail */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Overlay con Play Button */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center
                          group-hover:bg-black/60 transition-colors">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-16 h-16 rounded-full bg-gt-gold flex items-center justify-center
                         shadow-2xl shadow-gt-gold/50"
              >
                <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm 
                          rounded text-white text-sm font-semibold">
              {video.duration}
            </div>
          </>
        ) : (
          // Video Player
          <video
            controls
            autoPlay
            className="w-full h-full object-cover"
            onClick={(e) => e.stopPropagation()}
          >
            <source src={video.url} type="video/mp4" />
            Tu navegador no soporta el tag de video.
          </video>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold mb-2 line-clamp-2">
          {video.title}
        </h3>
        <p className="text-gray-400 text-sm uppercase tracking-wide">
          {video.category}
        </p>
      </div>

      {/* Indicator de tipo de video */}
      {isYouTube && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 rounded text-white text-xs font-bold">
          YOUTUBE
        </div>
      )}
      {isVimeo && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 rounded text-white text-xs font-bold">
          VIMEO
        </div>
      )}
    </motion.div>
  );
};

/**
 * Modal para reproducir video a pantalla completa
 */
export const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  const isDirectVideo = video.url.includes('.mp4') || video.url.includes('.webm');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gt-gold transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Player */}
        <div className="aspect-video bg-black rounded-2xl overflow-hidden">
          {isDirectVideo ? (
            <video
              controls
              autoPlay
              className="w-full h-full"
            >
              <source src={video.url} type="video/mp4" />
              Tu navegador no soporta el tag de video.
            </video>
          ) : (
            <iframe
              src={video.url}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Video Info */}
        <div className="mt-4 text-center">
          <h3 className="text-white text-2xl font-march font-bold mb-2">
            {video.title}
          </h3>
          <p className="text-gray-400 text-sm uppercase tracking-wide">
            {video.category}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};