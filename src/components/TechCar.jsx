import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Silueta SVG de coche deportivo moderno con reflejo
const CarSilhouette = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full">
    <defs>
      <linearGradient id="carGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#B8941F" stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id="reflectionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Coche principal - silueta deportiva */}
    <g filter="url(#glow)">
      {/* Carrocería */}
      <path 
        d="M 150 180 L 200 160 L 280 150 L 400 145 L 520 150 L 600 160 L 650 180 L 680 200 L 680 220 L 650 230 L 150 230 L 120 220 L 120 200 Z" 
        fill="url(#carGradient)"
        stroke="#D4AF37"
        strokeWidth="2"
      />
      
      {/* Techo deportivo */}
      <path 
        d="M 250 150 L 280 130 L 350 120 L 450 120 L 520 130 L 550 150" 
        fill="url(#carGradient)"
        stroke="#D4AF37"
        strokeWidth="2"
      />
      
      {/* Parabrisas delantero */}
      <path 
        d="M 280 150 L 300 135 L 350 125 L 380 135 L 400 145" 
        fill="rgba(255,255,255,0.1)"
        stroke="#D4AF37"
        strokeWidth="1"
      />
      
      {/* Parabrisas trasero */}
      <path 
        d="M 450 125 L 480 135 L 520 145 L 540 150" 
        fill="rgba(255,255,255,0.1)"
        stroke="#D4AF37"
        strokeWidth="1"
      />
      
      {/* Rueda delantera */}
      <circle cx="250" cy="230" r="35" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="3"/>
      <circle cx="250" cy="230" r="20" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="2"/>
      <circle cx="250" cy="230" r="8" fill="#D4AF37"/>
      
      {/* Rueda trasera */}
      <circle cx="550" cy="230" r="35" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="3"/>
      <circle cx="550" cy="230" r="20" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="2"/>
      <circle cx="550" cy="230" r="8" fill="#D4AF37"/>
      
      {/* Detalles frontales */}
      <ellipse cx="160" cy="200" rx="15" ry="8" fill="#FFD700" opacity="0.6"/>
      
      {/* Spoiler trasero */}
      <rect x="620" y="155" width="40" height="8" fill="url(#carGradient)" stroke="#D4AF37" strokeWidth="1"/>
      
      {/* Líneas de velocidad */}
      <line x1="300" y1="180" x2="380" y2="180" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
      <line x1="420" y1="180" x2="500" y2="180" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
    </g>
    
    {/* Reflejo */}
    <g opacity="0.4" transform="translate(0, 465) scale(1, -1)">
      <path 
        d="M 150 180 L 200 160 L 280 150 L 400 145 L 520 150 L 600 160 L 650 180 L 680 200 L 680 220 L 650 230 L 150 230 L 120 220 L 120 200 Z" 
        fill="url(#reflectionGradient)"
      />
      <circle cx="250" cy="230" r="35" fill="url(#reflectionGradient)"/>
      <circle cx="550" cy="230" r="35" fill="url(#reflectionGradient)"/>
    </g>
  </svg>
);

const TechCar = () => {
  const { language } = useLanguage();

  const content = {
    es: {
      title: 'Tecnología de Punta',
      subtitle: 'Experimenta la excelencia automotriz',
      features: [
        {
          title: 'Rendimiento Extremo',
          description: 'Máxima potencia y control'
        },
        {
          title: 'Diseño Aerodinámico',
          description: 'Elegancia y velocidad combinadas'
        },
        {
          title: 'Experiencia Premium',
          description: 'Lujo en cada detalle'
        }
      ]
    },
    en: {
      title: 'Cutting-Edge Technology',
      subtitle: 'Experience automotive excellence',
      features: [
        {
          title: 'Extreme Performance',
          description: 'Maximum power and control'
        },
        {
          title: 'Aerodynamic Design',
          description: 'Elegance and speed combined'
        },
        {
          title: 'Premium Experience',
          description: 'Luxury in every detail'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-black">
      {/* Fondo con partículas doradas */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gt-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gt-gold/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-voga font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-400 font-march">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Coche central con animación */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CarSilhouette />
            </motion.div>
          </div>
        </motion.div>

        {/* Features cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 
                            hover:border-gt-gold/50 transition-all duration-300
                            hover:bg-white/10 hover:scale-105">
                {/* Icono decorativo */}
                <div className="w-12 h-12 mb-4 bg-gt-gold/20 rounded-xl flex items-center justify-center
                              group-hover:bg-gt-gold/30 transition-all">
                  <div className="w-6 h-6 border-2 border-gt-gold rounded-full" />
                </div>

                <h3 className="text-xl font-voga font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 font-march">
                  {feature.description}
                </p>

                {/* Línea decorativa */}
                <div className="mt-4 h-1 w-0 bg-gradient-to-r from-gt-gold to-transparent
                              group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Línea decorativa inferior */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 h-px bg-gradient-to-r from-transparent via-gt-gold to-transparent"
        />
      </div>
    </section>
  );
};

export default TechCar;