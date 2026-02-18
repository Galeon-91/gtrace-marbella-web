import { motion } from 'framer-motion';
import { useSupabaseAsset } from '../hooks/useSupabaseAsset';

/**
 * Componente de fondo reutilizable con imagen desde Supabase Storage
 * 
 * @param {string} imagePath - Ruta de la imagen en Supabase (ej: 'backgrounds/dashboard-bg.jpg')
 * @param {string} bucket - Nombre del bucket (default: 'site-assets')
 * @param {number} opacity - Opacidad de la imagen (0-1, default: 0.35)
 * @param {boolean} particles - Mostrar partículas doradas (default: true)
 * @param {number} particleCount - Número de partículas (default: 10)
 * @param {boolean} pattern - Mostrar patrón de puntos (default: true)
 * @param {boolean} pulse - Mostrar pulso dorado (default: true)
 * @param {string} fallbackGradient - Gradiente de respaldo si no carga la imagen
 * 
 * @example
 * // Uso básico
 * <DynamicBackground imagePath="backgrounds/dashboard-bg.jpg" />
 * 
 * // Personalizado
 * <DynamicBackground 
 *   imagePath="backgrounds/home-hero.jpg"
 *   opacity={0.5}
 *   particles={true}
 *   particleCount={15}
 * />
 */
const DynamicBackground = ({
  imagePath,
  bucket = 'site-assets',
  opacity = 0.35,
  particles = true,
  particleCount = 10,
  pattern = true,
  pulse = true,
  fallbackGradient = 'from-black via-gt-gray-dark to-black'
}) => {
  // Cargar imagen desde Supabase
  const { url: backgroundUrl, loading } = useSupabaseAsset(imagePath, bucket);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Imagen de fondo desde Supabase */}
      {backgroundUrl ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundUrl}')`,
            filter: 'brightness(0.3) saturate(1.2)'
          }}
        />
      ) : (
        // Gradiente de respaldo mientras carga o si falla
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient}`} />
      )}
      
      {/* Overlay principal con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-gt-gold/10 backdrop-blur-sm" />
      
      {/* Gradiente dorado adicional */}
      <div className="absolute inset-0 bg-gradient-to-br from-gt-gold/5 via-black to-gt-gold/5" />
      
      {/* Patrón de puntos dorados */}
      {pattern && (
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} 
        />
      )}
      
      {/* Partículas doradas flotantes */}
      {particles && [...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gt-gold/40 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: -20,
          }}
          animate={{
            y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 20,
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Pulso dorado suave */}
      {pulse && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gt-gold/5 via-transparent to-gt-gold/5"
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
};

export default DynamicBackground;