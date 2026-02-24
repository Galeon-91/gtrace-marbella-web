import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../../supabase/supabaseClient';

// ============================================
// 🔍 DEBUG - VER URLs EN CONSOLE
// ============================================
console.log('🏎️ RACING.JSX CARGADO');
console.log('📦 Supabase:', supabase ? '✅ OK' : '❌ ERROR');

// ============================================
// FUNCIÓN PARA OBTENER URL PÚBLICA DE SUPABASE
// ============================================

const getSupabaseUrl = (path) => {
  const { data } = supabase.storage.from('site-assets').getPublicUrl(path);
  console.log(`🔗 ${path} → ${data.publicUrl}`);
  return data.publicUrl;
};

// ============================================
// BANDERA DE CARRERAS ANIMADA
// ============================================

const AnimatedRaceFlag = () => {
  return (
    <div className="relative w-full h-64">
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <motion.rect
          x="50"
          y="50"
          width="6"
          height="200"
          fill="currentColor"
          opacity="0.8"
        />
        
        <g>
          {[0, 1, 2, 3].map((row) => (
            [0, 1, 2, 3, 4].map((col) => (
              <motion.rect
                key={`${row}-${col}`}
                x={56 + col * 30}
                y={50 + row * 25}
                width="30"
                height="25"
                fill={(row + col) % 2 === 0 ? "currentColor" : "#000"}
                opacity={(row + col) % 2 === 0 ? 0.9 : 0.3}
                animate={{
                  x: [56 + col * 30, 56 + col * 30 + Math.sin(row) * 8, 56 + col * 30],
                  y: [50 + row * 25, 50 + row * 25 + Math.cos(col) * 4, 50 + row * 25]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (row + col) * 0.1
                }}
              />
            ))
          ))}
        </g>

        {[0, 1, 2, 3, 4].map((i) => (
          <motion.line
            key={`line-${i}`}
            x1="250"
            y1={80 + i * 25}
            x2="300"
            y2={80 + i * 25}
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.3"
            initial={{ x1: 250, x2: 300 }}
            animate={{
              x1: [250, 220],
              x2: [300, 270],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}

        <motion.text
          x="200"
          y="280"
          fill="currentColor"
          fontSize="20"
          fontWeight="bold"
          textAnchor="middle"
          opacity="0.6"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          GT RACE
        </motion.text>
      </svg>
    </div>
  );
};

// ============================================
// NÚMEROS ANIMADOS PARA TELEMETRÍA
// ============================================

const AnimatedNumber = ({ value, suffix = '', color = 'text-white', duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomVariation = (Math.random() - 0.5) * 0.1;
      const newValue = value * (1 + randomVariation);
      setDisplayValue(newValue);
    }, duration);
    
    return () => clearInterval(interval);
  }, [value, duration]);

  return (
    <motion.span
      className={`${color} font-march font-bold`}
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 0.5 }}
    >
      {displayValue.toFixed(color.includes('gold') ? 0 : 1)}{suffix}
    </motion.span>
  );
};

// ============================================
// TIEMPOS DE SECTOR EN VIVO
// ============================================

const LiveSectorTimes = ({ language }) => {
  const [sectorTimes, setSectorTimes] = useState([
    { sector: 1, time: 28.234, isBest: true },
    { sector: 2, time: 32.112, isBest: false },
    { sector: 3, time: 24.221, isBest: true }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSectorTimes(prev => prev.map(sector => {
        const variation = (Math.random() - 0.5) * 1.0;
        const newTime = Math.max(20, sector.time + variation);
        
        return {
          ...sector,
          time: parseFloat(newTime.toFixed(3)),
          isBest: newTime < 29
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const totalTime = sectorTimes.reduce((sum, sector) => sum + sector.time, 0);

  return (
    <div className="space-y-4">
      {sectorTimes.map((sector) => (
        <motion.div
          key={sector.sector}
          animate={{
            scale: sector.isBest ? [1, 1.02, 1] : 1,
            borderColor: sector.isBest ? ['rgba(212, 175, 55, 0.5)', 'rgba(212, 175, 55, 0.8)', 'rgba(212, 175, 55, 0.5)'] : 'rgba(255, 255, 255, 0.1)'
          }}
          transition={{ duration: 0.5 }}
          className={`p-4 rounded-xl ${
            sector.isBest
              ? 'bg-gt-gold/20 border-2 border-gt-gold/50'
              : 'bg-white/5 border border-white/10'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-400 text-sm">
              {language === 'es' ? 'Sector' : 'Sector'} {sector.sector}
            </p>
            {sector.isBest && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-gt-gold text-xs font-bold"
              >
                ✓ {language === 'es' ? 'MEJOR' : 'BEST'}
              </motion.span>
            )}
          </div>
          <motion.p
            key={sector.time}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className={`text-3xl font-march font-bold ${
              sector.isBest ? 'text-gt-gold' : 'text-white'
            }`}
          >
            {sector.time.toFixed(3)}
          </motion.p>
        </motion.div>
      ))}

      <motion.div
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="p-4 rounded-xl bg-gradient-to-r from-gt-gold/20 to-transparent border border-gt-gold/30"
      >
        <p className="text-gray-400 text-sm mb-2">
          {language === 'es' ? 'Tiempo Total' : 'Total Time'}
        </p>
        <motion.p
          key={totalTime}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          className="text-4xl font-march font-bold text-gt-gold"
        >
          {totalTime.toFixed(3)}
        </motion.p>
      </motion.div>
    </div>
  );
};

// ============================================
// ICONOS SVG PERSONALIZADOS
// ============================================

const F4Icon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M12 2 L4 8 L4 16 L12 22 L20 16 L20 8 Z"
      fill="currentColor"
      opacity="0.2"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <path
      d="M12 2 L4 8 L4 16 L12 22 L20 16 L20 8 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <motion.text
      x="12"
      y="15"
      textAnchor="middle"
      fill="currentColor"
      fontSize="10"
      fontWeight="bold"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      F4
    </motion.text>
  </svg>
);

const PorscheIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      opacity="0.2"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <motion.path
      d="M12 3 L12 21 M3 12 L21 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{ rotate: 90 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
    />
    <motion.circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

const CAVAIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M3 12 L12 3 L21 12 L12 21 Z"
      fill="currentColor"
      opacity="0.2"
      animate={{ rotate: [0, 180, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
    />
    <path
      d="M3 12 L12 3 L21 12 L12 21 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <motion.circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M6 9H4C3.44772 9 3 9.44772 3 10V11C3 11.5523 3.44772 12 4 12H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      d="M18 9H20C20.5523 9 21 9.44772 21 10V11C21 11.5523 20.5523 12 20 12H18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
    />
    <path
      d="M6 9V5C6 3.89 6.89 3 8 3H16C17.11 3 18 3.89 18 5V9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <motion.path
      d="M6 9C6 13 8 17 12 17C16 17 18 13 18 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M12 17V20M8 20H16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const SpeedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      opacity="0.1"
    />
    <motion.path
      d="M12 6V12L16 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "12px 12px" }}
    />
  </svg>
);

const HelmetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M12 3C7.02944 3 3 7.02944 3 12C3 13.6569 3.52678 15.1886 4.41964 16.4375L6 18H18L19.5804 16.4375C20.4732 15.1886 21 13.6569 21 12C21 7.02944 16.9706 3 12 3Z"
      fill="currentColor"
      opacity="0.2"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <path
      d="M12 3C7.02944 3 3 7.02944 3 12C3 13.6569 3.52678 15.1886 4.41964 16.4375L6 18H18L19.5804 16.4375C20.4732 15.1886 21 13.6569 21 12C21 7.02944 16.9706 3 12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 10 L16 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6 18 L6 20 L18 20 L18 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ============================================
// COMPONENTE PRINCIPAL - RACING
// ============================================

const Racing = () => {
  const { language } = useLanguage();
  const [activeChampionship, setActiveChampionship] = useState('f4');
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [stats, setStats] = useState({
    races: 0,
    wins: 0,
    podiums: 0,
    points: 0
  });

  // ============================================
  // GALERÍA DE FOTOS - URLS DIRECTAS DE SUPABASE
  // ============================================
  
  const galleryImages = [
    {
      url: getSupabaseUrl('racing/gallery/carrera1.png'),
      alt: language === 'es' ? 'Carrera 1' : 'Race 1',
      category: 'f4'
    },
    {
      url: getSupabaseUrl('racing/gallery/carrera10.jpg'),
      alt: language === 'es' ? 'Carrera 10' : 'Race 10',
      category: 'porsche'
    },
    {
      url: getSupabaseUrl('racing/gallery/carrera11.jpg'),
      alt: language === 'es' ? 'Carrera 11' : 'Race 11',
      category: 'cava'
    },
    {
      url: getSupabaseUrl('racing/gallery/carrera12.jpg'),
      alt: language === 'es' ? 'Carrera 12' : 'Race 12',
      category: 'team'
    },
    {
      url: getSupabaseUrl('racing/gallery/carrera13.jpg'),
      alt: language === 'es' ? 'Carrera 13' : 'Race 13',
      category: 'podium'
    },
    {
      url: getSupabaseUrl('racing/gallery/carrera2.png'),
      alt: language === 'es' ? 'Carrera 2' : 'Race 2',
      category: 'preparation'
    },
    {
      url: getSupabaseUrl('racing/gallery/carrera3.jpg'),
      alt: language === 'es' ? 'Carrera 3' : 'Race 3',
      category: 'f4'
    },
    {
      url: getSupabaseUrl('racing/gallery/carrera4.jpg'),
      alt: language === 'es' ? 'Carrera 4' : 'Race 4',
      category: 'porsche'
    },
    {
      url: getSupabaseUrl('racing/gallery/carrera5.jpg'),
      alt: language === 'es' ? 'Carrera 5' : 'Race 5',
      category: 'cava'
    }
  ];

  // ============================================
  // VIDEOS - URLS DIRECTAS CON DURACIONES REALES
  // ============================================
  
  const videos = [
    {
      url: getSupabaseUrl('racing/videos/carrera.mp4'),
      thumbnail: getSupabaseUrl('racing/videos/carrera.mp4'),
      title: language === 'es' ? 'Adrenalina en estado puro' : 'Pure Adrenaline',
      duration: '0:12', // 12 segundos
      category: 'highlights'
    },
    {
      url: getSupabaseUrl('racing/videos/carrera1.mp4'),
      thumbnail: getSupabaseUrl('racing/videos/carrera1.mp4'),
      title: language === 'es' ? 'Detrás de Escenas' : 'Behind the Scenes',
      duration: '0:28', // 28 segundos
      category: 'bts'
    },
    {
      url: getSupabaseUrl('racing/videos/carrera2.mp4'),
      thumbnail: getSupabaseUrl('racing/videos/carrera2.mp4'),
      title: language === 'es' ? 'Simulación de Carrera' : 'Race Simulation',
      duration: '0:12', // 12 segundos
      category: 'interview'
    },
    {
      url: getSupabaseUrl('racing/videos/carrera3.mp4'),
      thumbnail: getSupabaseUrl('racing/videos/carrera3.mp4'),
      title: language === 'es' ? 'Vive la emoción de la competición' : 'Feel the Competition',
      duration: '0:25', // 25 segundos
      category: 'action'
    }
  ];

  // ============================================
  // SPONSORS - URLS DIRECTAS
  // ============================================
  
  const sponsors = {
    gold: getSupabaseUrl('racing/thumbnails/legend-sponsor-3.png'),
    silver: getSupabaseUrl('racing/thumbnails/pro-sponsors.png'),
    bronze: getSupabaseUrl('racing/thumbnails/rookie-sponsors.png')
  };

  // Animación de estadísticas
  useEffect(() => {
    const targets = { races: 45, wins: 12, podiums: 28, points: 856 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        races: Math.floor(targets.races * progress),
        wins: Math.floor(targets.wins * progress),
        podiums: Math.floor(targets.podiums * progress),
        points: Math.floor(targets.points * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // ============================================
  // CONTENIDO BILINGÜE
  // ============================================

  const content = {
    es: {
      badge: 'GT Race Team',
      title: 'Velocidad, Pasión y Competición',
      subtitle: 'Nuestro equipo compite en los principales campeonatos internacionales, formando pilotos profesionales y llevando la emoción de la competición a cada circuito.',
      
      championshipsTitle: 'Nuestros Campeonatos',
      championshipsSubtitle: 'Competimos al más alto nivel en tres campeonatos de prestigio',
      
      f4Title: 'Fórmula 4 Nórdica',
      f4Description: 'Formando la próxima generación de pilotos profesionales en el campeonato más competitivo del norte de Europa.',
      f4Details: 'La Fórmula 4 Nórdica es la puerta de entrada al automovilismo profesional. Nuestro equipo trabaja con jóvenes talentos para desarrollar sus habilidades técnicas y mentales necesarias para competir al más alto nivel.',
      
      porscheTitle: 'Porsche Sprint Challenge Ibérica',
      porscheDescription: 'Competición y emoción en pista con los icónicos Porsche 911 GT3 Cup en circuitos españoles y portugueses.',
      porscheDetails: 'El desafío definitivo para pilotos experimentados. Carreras sprint intensas donde cada décima cuenta, compitiendo con algunos de los mejores pilotos de la Península Ibérica.',
      
      cavaTitle: 'CAVA Championship',
      cavaDescription: 'Campeonato de Andalucía de Velocidad en Circuitos, representando la excelencia en el automovilismo andaluz.',
      cavaDetails: 'Competimos en los mejores circuitos de Andalucía, demostrando la velocidad y precisión de nuestros pilotos en cada carrera del campeonato regional más competitivo de España.',
      
      galleryTitle: 'Galería de Competición',
      gallerySubtitle: 'Momentos épicos de nuestras carreras',
      
      videosTitle: 'Videos del Equipo',
      videosSubtitle: 'Revive la emoción de la pista',
      
      statsTitle: 'Temporada 2025',
      races: 'Carreras',
      wins: 'Victorias',
      podiums: 'Podios',
      points: 'Puntos',
      
      joinTitle: '¿Quieres Unirte al Equipo?',
      joinSubtitle: 'Buscamos pilotos con pasión, talento y determinación',
      joinButton: 'Contactar al Equipo',
      
      servicesTitle: 'Servicios para Pilotos',
      service1: 'Preparación Física',
      service2: 'Setup y Telemetría',
      service3: 'Análisis de Datos',
      service4: 'Coaching en Pista',
      
      ctaTitle: '¿Listo para la Velocidad?',
      ctaButton: 'Más Información',
      contactButton: 'Contactar'
    },
    en: {
      badge: 'GT Race Team',
      title: 'Speed, Passion and Competition',
      subtitle: 'Our team competes in major international championships, training professional drivers and bringing the excitement of competition to every circuit.',
      
      championshipsTitle: 'Our Championships',
      championshipsSubtitle: 'Competing at the highest level in three prestigious championships',
      
      f4Title: 'Nordic Formula 4',
      f4Description: 'Training the next generation of professional drivers in Northern Europe\'s most competitive championship.',
      f4Details: 'Nordic Formula 4 is the gateway to professional motorsport. Our team works with young talents to develop the technical and mental skills needed to compete at the highest level.',
      
      porscheTitle: 'Porsche Sprint Challenge Iberia',
      porscheDescription: 'Competition and excitement on track with iconic Porsche 911 GT3 Cup on Spanish and Portuguese circuits.',
      porscheDetails: 'The ultimate challenge for experienced drivers. Intense sprint races where every tenth counts, competing with some of the best drivers in the Iberian Peninsula.',
      
      cavaTitle: 'CAVA Championship',
      cavaDescription: 'Andalusian Circuit Speed Championship, representing excellence in Andalusian motorsport.',
      cavaDetails: 'We compete on the best circuits in Andalusia, demonstrating the speed and precision of our drivers in every race of Spain\'s most competitive regional championship.',
      
      galleryTitle: 'Racing Gallery',
      gallerySubtitle: 'Epic moments from our races',
      
      videosTitle: 'Team Videos',
      videosSubtitle: 'Relive the track excitement',
      
      statsTitle: '2025 Season',
      races: 'Races',
      wins: 'Wins',
      podiums: 'Podiums',
      points: 'Points',
      
      joinTitle: 'Want to Join the Team?',
      joinSubtitle: 'We seek drivers with passion, talent and determination',
      joinButton: 'Contact Team',
      
      servicesTitle: 'Driver Services',
      service1: 'Physical Preparation',
      service2: 'Setup and Telemetry',
      service3: 'Data Analysis',
      service4: 'On-Track Coaching',
      
      ctaTitle: 'Ready for Speed?',
      ctaButton: 'More Information',
      contactButton: 'Contact'
    }
  };

  const t = content[language];

  // ============================================
  // DATOS DE CAMPEONATOS
  // ============================================

  const championships = [
    {
      id: 'f4',
      icon: <F4Icon />,
      title: t.f4Title,
      description: t.f4Description,
      details: t.f4Details,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      features: language === 'es' 
        ? ['Monoplazas F4', 'Circuitos Internacionales', 'Formación Profesional', 'Tecnología Avanzada']
        : ['F4 Single-Seaters', 'International Circuits', 'Professional Training', 'Advanced Technology'],
      stats: {
        circuits: 8,
        races: 16,
        drivers: 3
      }
    },
    {
      id: 'porsche',
      icon: <PorscheIcon />,
      title: t.porscheTitle,
      description: t.porscheDescription,
      details: t.porscheDetails,
      gradient: 'from-red-500/20 to-orange-500/20',
      features: language === 'es'
        ? ['Porsche 911 GT3 Cup', 'Carreras Sprint', 'Alta Competición', 'Pilotos Experimentados']
        : ['Porsche 911 GT3 Cup', 'Sprint Races', 'High Competition', 'Experienced Drivers'],
      stats: {
        circuits: 6,
        races: 12,
        drivers: 2
      }
    },
    {
      id: 'cava',
      icon: <CAVAIcon />,
      title: t.cavaTitle,
      description: t.cavaDescription,
      details: t.cavaDetails,
      gradient: 'from-yellow-500/20 to-amber-500/20',
      features: language === 'es'
        ? ['Circuitos Andaluces', 'Campeonato Regional', 'Varias Categorías', 'Gran Nivel']
        : ['Andalusian Circuits', 'Regional Championship', 'Multiple Categories', 'High Level'],
      stats: {
        circuits: 5,
        races: 10,
        drivers: 4
      }
    }
  ];

  // ============================================
  // SERVICIOS PARA PILOTOS
  // ============================================

  const services = [
    {
      icon: <HelmetIcon />,
      title: t.service1,
      description: language === 'es' 
        ? 'Entrenamiento específico para pilotos profesionales'
        : 'Specific training for professional drivers'
    },
    {
      icon: <SpeedIcon />,
      title: t.service2,
      description: language === 'es'
        ? 'Optimización del coche para cada circuito'
        : 'Car optimization for each circuit'
    },
    {
      icon: <TrophyIcon />,
      title: t.service3,
      description: language === 'es'
        ? 'Mejora tu rendimiento con tecnología avanzada'
        : 'Improve your performance with advanced technology'
    },
    {
      icon: <F4Icon />,
      title: t.service4,
      description: language === 'es'
        ? 'Instructores expertos durante entrenamientos y carreras'
        : 'Expert instructors during training and races'
    }
  ];

  // Auto-advance gallery
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openVideoModal = (videoUrl) => {
  setCurrentVideoUrl(videoUrl);
  setVideoModalOpen(true);
};

const closeVideoModal = () => {
  setVideoModalOpen(false);
  setCurrentVideoUrl('');
};
  
  return (
    <div className="min-h-screen bg-black pt-20">
      
      {/* HERO SECTION */}
      <section className="relative py-20 px-4 overflow-hidden min-h-[95vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gt-gray-dark via-black to-black" />
        
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 2 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-gt-gold to-transparent"
              style={{ 
                top: `${i * 5}%`,
                width: '100%',
                left: 0
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        <div className="absolute top-20 left-10 w-96 h-96 bg-gt-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gt-gold/5 rounded-full blur-3xl animate-pulse" 
             style={{animationDelay: '1s'}} />

        <div className="relative z-10 container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-6 py-3 bg-gt-gold/10 backdrop-blur-xl 
                           border border-gt-gold/30 rounded-full mb-6"
              >
                <span className="text-gt-gold font-march font-semibold text-sm uppercase tracking-widest">
                  {t.badge}
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-march font-bold text-white mb-6 
                           drop-shadow-2xl leading-tight">
                {t.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                {t.subtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold text-lg
                           hover:bg-gt-gold-light hover:scale-105 transition-all duration-300
                           shadow-lg shadow-gt-gold/50"
                >
                  {t.joinButton}
                </Link>
                <Link
                  to="/membership"
                  className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 
                           text-white rounded-xl font-semibold text-lg
                           hover:bg-white/10 hover:border-gt-gold/50 transition-all duration-300"
                >
                  {t.ctaButton}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="w-full h-64 text-gt-gold">
                <AnimatedRaceFlag />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center"
                >
                  <p className="text-4xl font-march font-bold text-gt-gold">3</p>
                  <p className="text-gray-300 text-sm">
                    {language === 'es' ? 'Campeonatos' : 'Championships'}
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center"
                >
                  <p className="text-4xl font-march font-bold text-gt-gold">9</p>
                  <p className="text-gray-300 text-sm">
                    {language === 'es' ? 'Pilotos' : 'Drivers'}
                  </p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/50 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.statsTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: stats.races, label: t.races, delay: 0.1 },
              { value: stats.wins, label: t.wins, delay: 0.2 },
              { value: stats.podiums, label: t.podiums, delay: 0.3 },
              { value: stats.points, label: t.points, delay: 0.4 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10
                         hover:border-gt-gold/50 transition-all duration-300 text-center"
              >
                <motion.p
                  className="text-6xl md:text-7xl font-march font-bold text-gt-gold mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: stat.delay + 0.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-300 font-semibold text-lg">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPEONATOS */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.championshipsTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.championshipsSubtitle}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {championships.map((championship) => (
              <button
                key={championship.id}
                onClick={() => setActiveChampionship(championship.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                  activeChampionship === championship.id
                    ? 'bg-gt-gold text-black scale-105'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="w-6 h-6">
                  {championship.icon}
                </div>
                {championship.title}
              </button>
            ))}
          </div>

          {championships.map((championship) => (
            championship.id === activeChampionship && (
              <motion.div
                key={championship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 
                          border border-white/10 overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${championship.gradient} 
                              opacity-50`} />

                <div className="relative z-10 grid lg:grid-cols-2 gap-12">
                  <div>
                    <div className="w-20 h-20 text-gt-gold mb-6">
                      {championship.icon}
                    </div>
                    
                    <h3 className="text-4xl font-march font-bold text-white mb-4">
                      {championship.title}
                    </h3>
                    
                    <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                      {championship.description}
                    </p>
                    
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      {championship.details}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {championship.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-300"
                        >
                          <div className="w-2 h-2 rounded-full bg-gt-gold"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                      <p className="text-gray-400 mb-2">
                        {language === 'es' ? 'Circuitos' : 'Circuits'}
                      </p>
                      <p className="text-5xl font-march font-bold text-gt-gold">
                        {championship.stats.circuits}
                      </p>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                      <p className="text-gray-400 mb-2">
                        {language === 'es' ? 'Carreras' : 'Races'}
                      </p>
                      <p className="text-5xl font-march font-bold text-gt-gold">
                        {championship.stats.races}
                      </p>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                      <p className="text-gray-400 mb-2">
                        {language === 'es' ? 'Pilotos' : 'Drivers'}
                      </p>
                      <p className="text-5xl font-march font-bold text-gt-gold">
                        {championship.stats.drivers}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* GALERÍA DE FOTOS */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/30 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.galleryTitle}
            </h2>
            <p className="text-xl text-gray-300">
              {t.gallerySubtitle}
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentGalleryIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video rounded-3xl overflow-hidden bg-white/5 
                       backdrop-blur-2xl border border-white/10"
            >
              <img
                src={galleryImages[currentGalleryIndex].url}
                alt={galleryImages[currentGalleryIndex].alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Error cargando imagen:', galleryImages[currentGalleryIndex].url);
                  e.target.src = 'https://via.placeholder.com/1920x1080/1a1a1a/d4af37?text=Imagen+no+disponible';
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
                            flex items-end">
                <div className="p-8 w-full">
                  <p className="text-white text-3xl font-march mb-2">
                    {galleryImages[currentGalleryIndex].alt}
                  </p>
                  <p className="text-gray-400">
                    {galleryImages[currentGalleryIndex].category.toUpperCase()}
                  </p>
                </div>
              </div>

              <button
                onClick={prevGalleryImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full
                         bg-white/10 backdrop-blur-xl border border-white/20 text-white
                         hover:bg-white/20 hover:scale-110 transition-all duration-300 
                         flex items-center justify-center group"
              >
                <svg className="w-6 h-6 group-hover:scale-125 transition-transform" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextGalleryImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full
                         bg-white/10 backdrop-blur-xl border border-white/20 text-white
                         hover:bg-white/20 hover:scale-110 transition-all duration-300 
                         flex items-center justify-center group"
              >
                <svg className="w-6 h-6 group-hover:scale-125 transition-transform" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6">
              {galleryImages.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentGalleryIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                    index === currentGalleryIndex
                      ? 'border-gt-gold shadow-lg shadow-gt-gold/50'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x225/1a1a1a/d4af37?text=...';
                    }}
                  />
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentGalleryIndex
                      ? 'bg-gt-gold w-8'
                      : 'bg-white/30 w-2 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIDEOS DEL EQUIPO */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.videosTitle}
            </h2>
            <p className="text-xl text-gray-300">
              {t.videosSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                 onClick={() => openVideoModal(video.url)}
                className="relative bg-white/5 backdrop-blur-2xl rounded-2xl overflow-hidden 
                         border border-white/10 hover:border-gt-gold/50 transition-all duration-300 
                         cursor-pointer group"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <video
                    src={video.thumbnail}
                    className="w-full h-full object-cover"
                    muted
                    onError={(e) => {
                      console.error('Error cargando video:', video.thumbnail);
                    }}
                  />
                  
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

                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm 
                                rounded text-white text-sm font-semibold">
                    {video.duration}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm uppercase tracking-wide">
                    {video.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS PARA PILOTOS */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/50 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.servicesTitle}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10
                         hover:border-gt-gold/50 transition-all duration-300 text-center group"
              >
                <div className="w-20 h-20 text-gt-gold mx-auto mb-6 transform group-hover:scale-110 
                              group-hover:rotate-12 transition-all duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ÚNETE AL EQUIPO */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-gt-gold/20 via-gt-gold/10 to-transparent 
                     backdrop-blur-2xl rounded-3xl p-12 border border-gt-gold/30 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gt-gold/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gt-gold/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-march font-bold text-white mb-6">
                  {t.joinTitle}
                </h2>
                <p className="text-xl text-gray-300 mb-4">
                  {t.joinSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold text-lg
                           hover:bg-gt-gold-light hover:scale-105 transition-all duration-300
                           shadow-lg shadow-gt-gold/50"
                >
                  {t.joinButton}
                </Link>
                <Link
                  to="/membership"
                  className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 
                           text-white rounded-xl font-semibold text-lg
                           hover:bg-white/20 transition-all duration-300"
                >
                  {t.ctaButton}
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 text-gt-gold mx-auto mb-3">
                    <TrophyIcon />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {language === 'es' ? 'Experiencia Probada' : 'Proven Experience'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {language === 'es' 
                      ? '15+ años en competición' 
                      : '15+ years in competition'}
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 text-gt-gold mx-auto mb-3">
                    <SpeedIcon />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {language === 'es' ? 'Tecnología Avanzada' : 'Advanced Technology'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {language === 'es' 
                      ? 'Equipamiento de última generación' 
                      : 'State-of-the-art equipment'}
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 text-gt-gold mx-auto mb-3">
                    <HelmetIcon />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {language === 'es' ? 'Equipo Profesional' : 'Professional Team'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {language === 'es' 
                      ? 'Ingenieros y mecánicos expertos' 
                      : 'Expert engineers and mechanics'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-march font-bold text-white mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Únete a GT Race Team y compite en los mejores campeonatos'
                : 'Join GT Race Team and compete in the best championships'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold text-lg
                         hover:bg-gt-gold-light hover:scale-105 transition-all duration-300
                         shadow-lg shadow-gt-gold/50"
              >
                {t.contactButton}
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 
                         text-white rounded-xl font-semibold text-lg
                         hover:bg-white/20 transition-all duration-300"
              >
                {language === 'es' ? 'Ver Todos los Servicios' : 'View All Services'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DATOS Y TELEMETRÍA */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/30 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {language === 'es' ? 'Datos y Telemetría' : 'Data & Telemetry'}
            </h2>
            <p className="text-xl text-gray-300">
              {language === 'es' 
                ? 'Tecnología de punta en análisis de rendimiento' 
                : 'Cutting-edge performance analysis technology'}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Panel izquierdo - Velocidad */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-march font-bold text-white mb-6">
                {language === 'es' ? 'Análisis de Velocidad' : 'Speed Analysis'}
              </h3>

              <div className="relative h-48 bg-black/30 rounded-xl mb-6 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 300 150">
                  {[...Array(8)].map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="0"
                      y1={i * 20}
                      x2="300"
                      y2={i * 20}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  ))}
                  {[...Array(15)].map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={i * 20}
                      y1="0"
                      x2={i * 20}
                      y2="150"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  ))}
                  
                  <motion.polyline
                    points="0,140 30,120 60,110 90,100 120,80 150,60 180,50 210,45 240,40 270,35 300,30"
                    fill="none"
                    stroke="#35d116"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </svg>

                <div className="absolute top-2 left-2 text-gt-gold text-xs font-semibold">
                  {language === 'es' ? 'Velocidad (km/h)' : 'Speed (km/h)'}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{language === 'es' ? 'Vel. Máxima' : 'Top Speed'}</span>
                  <span className="text-gt-gold font-semibold">
                    <AnimatedNumber value={287} suffix=" km/h" color="text-gt-gold" duration={1500} />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{language === 'es' ? 'Vel. Media' : 'Avg Speed'}</span>
                  <span className="text-white font-semibold">
                    <AnimatedNumber value={156} suffix=" km/h" color="text-white" duration={2000} />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{language === 'es' ? 'Aceleración' : 'Acceleration'}</span>
                  <span className="text-white font-semibold">
                    <AnimatedNumber value={2.8} suffix=" G" color="text-white" duration={1800} />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Panel central - Telemetría */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-march font-bold text-white mb-6">
                {language === 'es' ? 'Telemetría en Vivo' : 'Live Telemetry'}
              </h3>

              <div className="space-y-4">
                {[
                  { label: language === 'es' ? 'RPM Motor' : 'Engine RPM', baseValue: 8750, color: 'text-red-500', duration: 1200 },
                  { label: language === 'es' ? 'Temp. Frenos' : 'Brake Temp', baseValue: 850, suffix: '°C', color: 'text-orange-500', duration: 1500 },
                  { label: language === 'es' ? 'Presión Neumát.' : 'Tire Pressure', baseValue: 1.9, suffix: ' bar', color: 'text-blue-500', duration: 2000 },
                  { label: language === 'es' ? 'Consumo' : 'Fuel Consumption', baseValue: 45, suffix: ' L/h', color: 'text-green-500', duration: 1800 },
                  { label: language === 'es' ? 'G-Force Lateral' : 'Lateral G-Force', baseValue: 1.8, suffix: ' G', color: 'text-purple-500', duration: 1400 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center p-3 bg-black/20 rounded-xl"
                  >
                    <span className="text-gray-400">{item.label}</span>
                    <span className={`${item.color} font-bold text-lg`}>
                      <AnimatedNumber 
                        value={item.baseValue} 
                        suffix={item.suffix || ''} 
                        color={item.color} 
                        duration={item.duration} 
                      />
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Panel derecho - Sectores EN VIVO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-march font-bold text-white mb-6">
                {language === 'es' ? 'Tiempos por Sector' : 'Sector Times'}
              </h3>

              <LiveSectorTimes language={language} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* HISTORIA DEL EQUIPO */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {language === 'es' ? 'Nuestra Historia' : 'Our History'}
            </h2>
            <p className="text-xl text-gray-300">
              {language === 'es' 
                ? 'Años de pasión y dedicación al automovilismo' 
                : 'Years of passion and dedication to motorsport'}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gt-gold via-gt-gold/50 to-transparent" />

            <div className="space-y-12">
              {[
                {
                  year: '2025',
                  title: language === 'es' ? 'Fundación del Equipo' : 'Team Foundation',
                  description: language === 'es' 
                    ? 'GT Race Team nace con la visión de formar pilotos profesionales y competir al más alto nivel en los principales campeonatos europeos.'
                    : 'GT Race Team is born with the vision of training professional drivers and competing at the highest level in major European championships.',
                  highlight: true
                },
                {
                  year: '2025',
                  title: language === 'es' ? 'Primer trofeo Porsche Cup Sprint Challenge' : 'First Porsche Cup Sprint Challenge trophy',
                  description: language === 'es'
                    ? 'En noviembre conseguimos alzarnos con el campeonato ibérico de la Porsche Cup Sprint Challenge, estableciendo las bases para futuras victorias.'
                    : 'In November we managed to win the Iberian championship of the Porsche Cup Sprint Challenge, laying the foundations for future victories.',
                  highlight: false
                },
                {
                  year: '2025',
                  title: language === 'es' ? 'Participación CAVA' : 'CAVA Competition' ,
                  description: language === 'es'
                    ? 'En octubre participamos en el campeonato CAVA. Carreras, adrenalina y emoción en una temporada histórica que marca un hito en la historia del equipo.'
                    : 'In October we participated in the CAVA championship. Racing, adrenaline and excitement in a historic season that marks a milestone in the team\'s history.',
                  highlight: true
                },
                {
                  year: '2026',
                  title: language === 'es' ? 'Nueva Era de Excelencia' : 'New Era of Excellence',
                  description: language === 'es'
                    ? 'Ampliación del equipo con 5 pilotos en competición. Nuevas alianzas estratégicas y tecnología de punta para seguir compitiendo al más alto nivel.'
                    : 'Team expansion with 5 drivers in competition. New strategic alliances and cutting-edge technology to continue competing at the highest level.',
                  highlight: false
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex gap-8 items-start"
                >
                  <div className={`flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center
                                ${milestone.highlight 
                                  ? 'bg-gt-gold text-black scale-110' 
                                  : 'bg-white/5 backdrop-blur-xl border border-white/10 text-white'}`}>
                    <span className="text-lg font-march font-bold">{milestone.year}</span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex-grow bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border transition-all duration-300 ${
                      milestone.highlight
                        ? 'border-gt-gold/50 bg-gt-gold/5'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <h3 className={`text-2xl font-march font-bold mb-3 ${
                      milestone.highlight ? 'text-gt-gold' : 'text-white'
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {milestone.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/30 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {language === 'es' ? 'Lo Que Dicen de Nosotros' : 'What They Say About Us'}
            </h2>
            <p className="text-xl text-gray-300">
              {language === 'es' 
                ? 'Testimonios de pilotos y profesionales del equipo' 
                : 'Testimonials from drivers and team professionals'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Carlos Martínez',
                role: language === 'es' ? 'Piloto Principal F4' : 'Lead F4 Driver',
                quote: language === 'es'
                  ? 'GT Race Team me ha dado todas las herramientas para competir al más alto nivel. El apoyo técnico y humano es excepcional, y el equipo siempre está buscando la perfección en cada detalle.'
                  : 'GT Race Team has given me all the tools to compete at the highest level. The technical and human support is exceptional, and the team is always seeking perfection in every detail.',
                image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400'
              },
              {
                name: 'Elena Ruiz',
                role: language === 'es' ? 'Ingeniera Jefe' : 'Chief Engineer',
                quote: language === 'es'
                  ? 'Trabajar con este equipo es un privilegio. La pasión por las carreras se siente en cada detalle, desde el setup del coche hasta el análisis de telemetría.'
                  : 'Working with this team is a privilege. The passion for racing is felt in every detail, from car setup to telemetry analysis.',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
              },
              {
                name: 'Miguel Ángel Torres',
                role: language === 'es' ? 'Piloto Porsche Sprint' : 'Porsche Sprint Driver',
                quote: language === 'es'
                  ? 'La preparación de los coches es impecable. Cada carrera se aborda con profesionalidad y dedicación total. Es un honor formar parte de este equipo.'
                  : 'The preparation of the cars is impeccable. Each race is approached with professionalism and total dedication. It\'s an honor to be part of this team.',
                image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10
                         hover:border-gt-gold/30 transition-all duration-300"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-gt-gold">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-gt-gold text-5xl mb-4 font-serif">"</div>

                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  {testimonial.quote}
                </p>

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gt-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="text-white font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* PATROCINADORES */}
<section className="relative py-20 px-4">
  <div className="container mx-auto max-w-7xl">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
        {language === 'es' ? 'Nuestros Patrocinadores' : 'Our Sponsors'}
      </h2>
      <p className="text-xl text-gray-300">
        {language === 'es' 
          ? 'Gracias por hacer posible nuestro sueño' 
          : 'Thank you for making our dream possible'}
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-8 mb-12">
      
      {/* ============================================ */}
      {/* LEGEND SPONSORS */}
      {/* ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-gt-gold/30 via-gt-gold/20 to-transparent 
                 backdrop-blur-2xl rounded-3xl p-8 border-2 border-gt-gold/50 text-center
                 overflow-hidden group hover:scale-105 transition-all duration-500"
      >
        {/* Brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gt-gold/20 to-transparent
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        <div className="relative z-10">
          {/* Marco del logo mejorado */}
          <div className="w-56 h-56 mx-auto mb-6 rounded-2xl overflow-hidden bg-black/30 
                        border-2 border-gt-gold/30 p-6 flex items-center justify-center
                        shadow-2xl shadow-gt-gold/50 backdrop-blur-xl">
            <img
              src={sponsors.gold}
              alt="Legend Sponsors"
              className="w-full h-full object-contain filter drop-shadow-2xl"
              onError={(e) => {
                console.error('Error cargando logo legend:', sponsors.gold);
                e.target.style.display = 'none';
              }}
            />
          </div>
          
          <div className="w-20 h-20 mx-auto mb-4 text-gt-gold">
            <TrophyIcon />
          </div>
          
          <h3 className="text-3xl font-march font-bold text-gt-gold mb-2 tracking-wide">
            LEGEND SPONSORS
          </h3>
          
          <div className="h-1 w-24 mx-auto mb-4 bg-gradient-to-r from-transparent via-gt-gold to-transparent" />
          
          <p className="text-gray-200 text-sm font-semibold mb-4 uppercase tracking-wider">
            {language === 'es' ? 'Máxima visibilidad en coches y equipamiento' : 'Maximum visibility on cars and equipment'}
          </p>
        </div>
      </motion.div>

      {/* ============================================ */}
      {/* PRO SPONSORS */}
      {/* ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="relative bg-gradient-to-br from-gray-300/20 via-gray-400/10 to-transparent 
                 backdrop-blur-2xl rounded-3xl p-8 border-2 border-gray-300/40 text-center
                 overflow-hidden group hover:scale-105 transition-all duration-500"
      >
        {/* Brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/20 to-transparent
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        <div className="relative z-10">
          {/* Marco del logo mejorado */}
          <div className="w-56 h-56 mx-auto mb-6 rounded-2xl overflow-hidden bg-black/30 
                        border-2 border-gray-300/30 p-6 flex items-center justify-center
                        shadow-2xl shadow-gray-300/30 backdrop-blur-xl">
            <img
              src={sponsors.silver}
              alt="Pro Sponsors"
              className="w-full h-full object-contain filter drop-shadow-2xl"
              onError={(e) => {
                console.error('Error cargando logo pro:', sponsors.silver);
                e.target.style.display = 'none';
              }}
            />
          </div>
          
          <div className="w-20 h-20 mx-auto mb-4 text-gray-300">
            <SpeedIcon />
          </div>
          
          <h3 className="text-3xl font-march font-bold text-gray-200 mb-2 tracking-wide">
            PRO SPONSORS
          </h3>
          
          <div className="h-1 w-24 mx-auto mb-4 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          
          <p className="text-gray-300 text-sm font-semibold mb-4 uppercase tracking-wider">
            {language === 'es' ? 'Presencia destacada en medios y eventos' : 'Featured presence in media and events'}
          </p>
        </div>
      </motion.div>

      {/* ============================================ */}
      {/* ROOKIE SPONSORS */}
      {/* ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative bg-gradient-to-br from-orange-400/20 via-red-500/10 to-transparent 
                 backdrop-blur-2xl rounded-3xl p-8 border-2 border-orange-400/40 text-center
                 overflow-hidden group hover:scale-105 transition-all duration-500"
      >
        {/* Brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        <div className="relative z-10">
          {/* Marco del logo mejorado */}
          <div className="w-56 h-56 mx-auto mb-6 rounded-2xl overflow-hidden bg-black/30 
                        border-2 border-orange-400/30 p-6 flex items-center justify-center
                        shadow-2xl shadow-orange-400/30 backdrop-blur-xl">
            <img
              src={sponsors.bronze}
              alt="Rookie Sponsors"
              className="w-full h-full object-contain filter drop-shadow-2xl"
              onError={(e) => {
                console.error('Error cargando logo rookie:', sponsors.bronze);
                e.target.style.display = 'none';
              }}
            />
          </div>
          
          <div className="w-20 h-20 mx-auto mb-4 text-orange-400">
            <HelmetIcon />
          </div>
          
          <h3 className="text-3xl font-march font-bold text-orange-300 mb-2 tracking-wide">
            ROOKIE SPONSORS
          </h3>
          
          <div className="h-1 w-24 mx-auto mb-4 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
          
          <p className="text-gray-200 text-sm font-semibold mb-4 uppercase tracking-wider">
            {language === 'es' ? 'Colaboración y visibilidad en redes' : 'Collaboration and social media visibility'}
          </p>
        </div>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-gray-300 mb-6 text-lg">
        {language === 'es' 
          ? '¿Interesado en patrocinar al equipo?' 
          : 'Interested in sponsoring the team?'}
      </p>
      <Link
        to="/contact"
        className="inline-block px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold text-lg
                 hover:bg-gt-gold-light hover:scale-105 transition-all duration-300
                 shadow-lg shadow-gt-gold/50"
      >
        {language === 'es' ? 'Contáctanos' : 'Contact Us'}
      </Link>
    </motion.div>
  </div>
</section>

      {/* ============================================ */}
      {/* VIDEO MODAL */}
      {/* ============================================ */}
      
      {videoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeVideoModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 
                     backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl 
                       overflow-hidden shadow-2xl"
          >
            <video
              src={currentVideoUrl}
              controls
              autoPlay
              className="w-full h-full"
            />
            
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 
                         backdrop-blur-xl border border-white/20 text-white
                         hover:bg-white/20 transition-all duration-300 flex items-center 
                         justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
};

export default Racing;