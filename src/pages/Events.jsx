import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase/supabaseClient';
import { useLanguage } from '../context/LanguageContext';

// ============================================
// SVG ICONOS PERSONALIZADOS ANIMADOS
// ============================================

const EventIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <motion.g
      animate={{ y: [0, -2, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M35 25 L35 15 C35 10 40 10 45 10 L55 10 C60 10 65 10 65 15 L65 25 L35 25 Z" />
      <path d="M30 25 L35 40 L42 40 L42 70 L40 70 L40 75 L60 75 L60 70 L58 70 L58 40 L65 40 L70 25 Z" />
      <ellipse cx="50" cy="72" rx="8" ry="2" opacity="0.3" />
      <motion.circle cx="48" cy="20" r="1.5" opacity="0.6"
        animate={{ y: [0, -8], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.circle cx="52" cy="22" r="1" opacity="0.6"
        animate={{ y: [0, -10], opacity: [0.6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
    </motion.g>
  </svg>
);

const TrackdayIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <motion.g
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "20px 80px" }}
    >
      <rect x="18" y="20" width="4" height="65" />
      <path d="M22 20 L60 20 L60 45 L22 45 Z" />
      <rect x="22" y="20" width="9.5" height="6.25" fill="white" />
      <rect x="31.5" y="20" width="9.5" height="6.25" fill="black" />
      <rect x="41" y="20" width="9.5" height="6.25" fill="white" />
      <rect x="50.5" y="20" width="9.5" height="6.25" fill="black" />
      <rect x="31.5" y="26.25" width="9.5" height="6.25" fill="white" />
      <rect x="22" y="26.25" width="9.5" height="6.25" fill="black" />
      <rect x="50.5" y="26.25" width="9.5" height="6.25" fill="white" />
      <rect x="41" y="26.25" width="9.5" height="6.25" fill="black" />
      <rect x="22" y="32.5" width="9.5" height="6.25" fill="white" />
      <rect x="31.5" y="32.5" width="9.5" height="6.25" fill="black" />
      <rect x="41" y="32.5" width="9.5" height="6.25" fill="white" />
      <rect x="50.5" y="32.5" width="9.5" height="6.25" fill="black" />
      <rect x="31.5" y="38.75" width="9.5" height="6.25" fill="white" />
      <rect x="22" y="38.75" width="9.5" height="6.25" fill="black" />
      <rect x="50.5" y="38.75" width="9.5" height="6.25" fill="white" />
      <rect x="41" y="38.75" width="9.5" height="6.25" fill="black" />
    </motion.g>
    <motion.g
      animate={{ x: [70, 50, 70] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <line x1="65" y1="25" x2="75" y2="25" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="65" y1="32" x2="80" y2="32" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="65" y1="39" x2="75" y2="39" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </motion.g>
  </svg>
);

const RutasIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <motion.g
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M20 25 L35 20 L35 70 L20 75 Z" opacity="0.8" />
      <path d="M35 20 L50 25 L50 75 L35 70 Z" opacity="0.9" />
      <path d="M50 25 L65 20 L65 70 L50 75 Z" opacity="1" />
      <path d="M65 20 L80 25 L80 75 L65 70 Z" opacity="0.8" />
      <motion.path
        d="M28 35 Q32 40 28 45"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="2,2"
        animate={{ strokeDashoffset: [0, -10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M42 40 Q46 35 42 30"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="2,2"
        animate={{ strokeDashoffset: [0, -10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
      />
      <motion.path
        d="M58 32 Q54 38 58 44"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="2,2"
        animate={{ strokeDashoffset: [0, -10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </motion.g>
  </svg>
);

const NoticiasIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <motion.g
      animate={{ rotateY: [0, 10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "center" }}
    >
      <rect x="25" y="20" width="50" height="60" rx="2" />
      <rect x="30" y="26" width="20" height="15" fill="white" opacity="0.9" />
      <line x1="55" y1="28" x2="70" y2="28" stroke="white" strokeWidth="2" opacity="0.7" />
      <line x1="55" y1="33" x2="70" y2="33" stroke="white" strokeWidth="2" opacity="0.7" />
      <line x1="55" y1="38" x2="70" y2="38" stroke="white" strokeWidth="2" opacity="0.7" />
      <line x1="30" y1="46" x2="70" y2="46" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="30" y1="51" x2="70" y2="51" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="30" y1="56" x2="70" y2="56" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="30" y1="61" x2="55" y2="61" stroke="white" strokeWidth="1.5" opacity="0.6" />
    </motion.g>
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <rect x="20" y="25" width="60" height="55" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
    <line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" strokeWidth="3" />
    <line x1="35" y1="20" x2="35" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="65" y1="20" x2="65" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <motion.circle cx="35" cy="50" r="3" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
    <circle cx="50" cy="50" r="3" />
    <circle cx="65" cy="50" r="3" />
    <circle cx="35" cy="65" r="3" />
    <motion.circle cx="50" cy="65" r="3" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
    <circle cx="65" cy="65" r="3" />
  </svg>
);

const LocationIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3">
    <motion.path
      d="M50 20 C40 20 32 28 32 38 C32 52 50 75 50 75 C50 75 68 52 68 38 C68 28 60 20 50 20 Z"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <circle cx="50" cy="38" r="8" fill="currentColor" />
  </svg>
);

// ============================================
// TRADUCCIONES
// ============================================

const translations = {
  es: {
    hero: {
      title: "Eventos Exclusivos",
      subtitle: "Vive experiencias únicas con GT Race Marbella",
      description: "Desde trackdays en circuitos de élite hasta rutas panorámicas por la Costa del Sol, eventos privados y las últimas novedades del mundo del motor.",
      cta: "Ver Próximos Eventos"
    },
    filters: {
      all: "Todos",
      upcoming: "Próximos",
      finished: "Finalizados"
    },
    categories: {
      all: "Todas",
      eventos: "Eventos",
      trackday: "Trackday",
      rutas: "Rutas",
      noticias: "Noticias"
    },
    sections: {
      upcoming: "Próximos Eventos",
      upcomingSubtitle: "No te pierdas nuestras próximas experiencias exclusivas",
      finished: "Eventos Realizados",
      finishedSubtitle: "Revive los mejores momentos de nuestros eventos pasados",
      featured: "Destacados",
      featuredSubtitle: "Los eventos más esperados de la temporada"
    },
    event: {
      viewDetails: "Ver Detalles",
      register: "Inscribirse",
      fullEvent: "Evento Completo",
      freeEvent: "Gratis",
      spots: "plazas",
      spotsLeft: "plazas disponibles",
      date: "Fecha",
      location: "Ubicación",
      capacity: "Capacidad",
      price: "Precio",
      watchVideo: "Ver Video",
      gallery: "Galería"
    },
    empty: {
      noEvents: "No hay eventos disponibles",
      noUpcoming: "No hay eventos próximos en este momento",
      noFinished: "No hay eventos finalizados",
      checkBack: "Vuelve pronto para ver nuevos eventos"
    },
    loading: "Cargando eventos...",
    showMore: "Ver Más Eventos",
    showLess: "Ver Menos"
  },
  en: {
    hero: {
      title: "Exclusive Events",
      subtitle: "Live unique experiences with GT Race Marbella",
      description: "From track days at elite circuits to scenic routes along the Costa del Sol, private events and the latest news from the automotive world.",
      cta: "View Upcoming Events"
    },
    filters: {
      all: "All",
      upcoming: "Upcoming",
      finished: "Past"
    },
    categories: {
      all: "All",
      eventos: "Events",
      trackday: "Track Day",
      rutas: "Routes",
      noticias: "News"
    },
    sections: {
      upcoming: "Upcoming Events",
      upcomingSubtitle: "Don't miss our next exclusive experiences",
      finished: "Past Events",
      finishedSubtitle: "Relive the best moments of our past events",
      featured: "Featured",
      featuredSubtitle: "The most anticipated events of the season"
    },
    event: {
      viewDetails: "View Details",
      register: "Register",
      fullEvent: "Full Event",
      freeEvent: "Free",
      spots: "spots",
      spotsLeft: "spots available",
      date: "Date",
      location: "Location",
      capacity: "Capacity",
      price: "Price",
      watchVideo: "Watch Video",
      gallery: "Gallery"
    },
    empty: {
      noEvents: "No events available",
      noUpcoming: "No upcoming events at the moment",
      noFinished: "No past events",
      checkBack: "Check back soon for new events"
    },
    loading: "Loading events...",
    showMore: "Show More Events",
    showLess: "Show Less"
  }
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const Events = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllFinished, setShowAllFinished] = useState(false);

  const categories = [
    { value: 'all', label: t.categories.all, Icon: CalendarIcon },
    { value: 'eventos', label: t.categories.eventos, Icon: EventIcon },
    { value: 'trackday', label: t.categories.trackday, Icon: TrackdayIcon },
    { value: 'rutas', label: t.categories.rutas, Icon: RutasIcon },
    { value: 'noticias', label: t.categories.noticias, Icon: NoticiasIcon }
  ];

  useEffect(() => {
    fetchEvents();
  }, [categoryFilter]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('events')
        .select('*')
        .eq('published', true)
        .order('start_date', { ascending: false });

      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setLoading(false);
  };

  const getCategoryInfo = (categoryValue) => {
    return categories.find(c => c.value === categoryValue) || categories[1];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { month: 'short' }),
      year: date.getFullYear()
    };
  };

  const isUpcoming = (event) => {
    return new Date(event.start_date) > new Date() && event.status === 'upcoming';
  };

  const isFinished = (event) => {
    return new Date(event.start_date) < new Date() || event.status === 'finished';
  };

  const upcomingEvents = events.filter(isUpcoming);
  const finishedEvents = events.filter(isFinished);

  const displayUpcomingEvents = showAllUpcoming ? upcomingEvents : upcomingEvents.slice(0, 6);
  const displayFinishedEvents = showAllFinished ? finishedEvents : finishedEvents.slice(0, 6);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background con gradientes animados */}
        <div className="absolute inset-0 bg-gradient-to-br from-gt-gold/10 via-black to-gt-gold/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gt-gold/20 via-transparent to-transparent" />

        {/* Partículas doradas flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gt-gold rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: -20,
                opacity: Math.random() * 0.7
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 20,
                opacity: [null, Math.random() * 0.7, 0]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Círculos decorativos */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gt-gold/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gt-gold/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />

        {/* Contenido Hero */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">

            {/* Icono animado */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="mb-8"
            >
              <CalendarIcon className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto text-gt-gold" />
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-voga font-bold mb-6 bg-gradient-to-r from-gt-gold via-yellow-500 to-gt-gold bg-clip-text text-transparent"
            >
              {t.hero.title}
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-4 font-light"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('upcoming-events')}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-gt-gold to-yellow-600 text-black text-lg sm:text-xl font-bold rounded-full shadow-2xl shadow-gt-gold/50 hover:shadow-gt-gold/70 transition-all duration-300"
            >
              {t.hero.cta}
            </motion.button>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-20"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gt-gold text-4xl"
              >
                ↓
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FILTROS DE CATEGORÍA */}
      {/* ============================================ */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-black via-gt-gray-dark/50 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategoryFilter(cat.value)}
                className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 ${categoryFilter === cat.value
                    ? 'bg-gradient-to-r from-gt-gold to-yellow-600 text-black shadow-lg shadow-gt-gold/50'
                    : 'bg-white/5 backdrop-blur-sm text-white border border-white/10 hover:bg-white/10 hover:border-gt-gold/50'
                  }`}
              >
                <cat.Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                <span className="hidden sm:inline">{cat.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRÓXIMOS EVENTOS */}
      {/* ============================================ */}
      <section id="upcoming-events" className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gt-gray-dark/30 to-black" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-voga font-bold mb-4 bg-gradient-to-r from-gt-gold to-yellow-500 bg-clip-text text-transparent">
              {t.sections.upcoming}
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              {t.sections.upcomingSubtitle}
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <motion.div
                className="w-16 h-16 border-4 border-gt-gold border-t-transparent rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-gray-400 mt-6 text-lg">{t.loading}</p>
            </div>
          )}

          {/* Events Grid */}
          {!loading && upcomingEvents.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                <AnimatePresence mode="popLayout">
                  {displayUpcomingEvents.map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                      categories={categories}
                      getCategoryInfo={getCategoryInfo}
                      formatShortDate={formatShortDate}
                      setSelectedEvent={setSelectedEvent}
                      setShowModal={setShowModal}
                      t={t}
                      language={language}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Show More/Less Button */}
              {upcomingEvents.length > 6 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAllUpcoming(!showAllUpcoming)}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
                  >
                    {showAllUpcoming ? t.showLess : t.showMore} ({upcomingEvents.length})
                  </motion.button>
                </motion.div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && upcomingEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="text-7xl mb-6"
              >
                📅
              </motion.div>
              <h3 className="text-2xl font-voga font-bold text-gray-300 mb-4">{t.empty.noUpcoming}</h3>
              <p className="text-gray-500">{t.empty.checkBack}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* EVENTOS FINALIZADOS */}
      {/* ============================================ */}
      <section id="finished-events" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black via-gt-gray-dark/20 to-black">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-voga font-bold mb-4 bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
              {t.sections.finished}
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              {t.sections.finishedSubtitle}
            </p>
          </motion.div>

          {/* Events Grid */}
          {!loading && finishedEvents.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                <AnimatePresence mode="popLayout">
                  {displayFinishedEvents.map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                      categories={categories}
                      getCategoryInfo={getCategoryInfo}
                      formatShortDate={formatShortDate}
                      setSelectedEvent={setSelectedEvent}
                      setShowModal={setShowModal}
                      t={t}
                      language={language}
                      isFinished={true}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Show More/Less Button */}
              {finishedEvents.length > 6 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAllFinished(!showAllFinished)}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
                  >
                    {showAllFinished ? t.showLess : t.showMore} ({finishedEvents.length})
                  </motion.button>
                </motion.div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && finishedEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-7xl mb-6 grayscale"
              >
                📸
              </motion.div>
              <h3 className="text-2xl font-voga font-bold text-gray-300 mb-4">{t.empty.noFinished}</h3>
              <p className="text-gray-500">{t.empty.checkBack}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* MODAL DE DETALLES */}
      {/* ============================================ */}
      <AnimatePresence>
        {showModal && selectedEvent && (
          <EventModal
            event={selectedEvent}
            setShowModal={setShowModal}
            getCategoryInfo={getCategoryInfo}
            formatDate={formatDate}
            t={t}
            language={language}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// COMPONENTE: EVENT CARD
// ============================================

const EventCard = ({ event, index, categories, getCategoryInfo, formatShortDate, setSelectedEvent, setShowModal, t, language, isFinished = false }) => {
  const catInfo = getCategoryInfo(event.category);
  const dateInfo = formatShortDate(event.start_date);
  const spotsLeft = event.capacity ? event.capacity : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-gt-gold/50 transition-all duration-500 ${isFinished ? 'opacity-80 grayscale hover:grayscale-0' : ''}`}
    >
      {/* Badge de categoría */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-gt-gold/90 backdrop-blur-sm rounded-full flex items-center gap-2">
        <catInfo.Icon className="w-4 h-4 text-black" />
        <span className="text-xs font-bold text-black">{catInfo.label}</span>
      </div>

      {/* Badge de estado (si es finalizado) */}
      {isFinished && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-gray-500/90 backdrop-blur-sm rounded-full">
          <span className="text-xs font-bold text-white">✓ {t.filters.finished}</span>
        </div>
      )}

      {/* Imagen o Video */}
      <div className="relative h-64 overflow-hidden bg-gt-gray-dark">
        {event.video_url ? (
          <video
            src={event.video_url}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            muted
            loop
            playsInline
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => {
              e.target.pause();
              e.target.currentTime = 0;
            }}
          />
        ) : event.image_url ? (
          <motion.img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gt-gold/20 to-transparent">
            <catInfo.Icon className="w-24 h-24 text-gt-gold/30" />
          </div>
        )}

        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      {/* Contenido */}
      <div className="p-6">

        {/* Fecha destacada */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex flex-col items-center justify-center w-16 h-16 bg-gt-gold/20 border border-gt-gold/50 rounded-xl">
            <span className="text-2xl font-bold text-gt-gold">{dateInfo.day}</span>
            <span className="text-xs text-gt-gold uppercase">{dateInfo.month}</span>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-voga font-bold text-white mb-1 line-clamp-2 group-hover:text-gt-gold transition-colors">
              {event.title}
            </h3>
          </div>
        </div>

        {/* Detalles */}
        <div className="space-y-2 text-sm text-gray-400 mb-6">
          {event.location && (
            <div className="flex items-center gap-2">
              <LocationIcon className="w-4 h-4 text-gt-gold" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}

          {spotsLeft && (
            <div className="flex items-center gap-2">
              <span className="text-gt-gold">👥</span>
              <span>{spotsLeft} {t.event.spots}</span>
            </div>
          )}

          {/* PRECIO OCULTO - Solo visible en admin */}
          <div className="flex items-center gap-2">
            <span className="text-gt-gold">ℹ️</span>
            <span className="font-semibold text-gt-gold">Consultar precio</span>
          </div>
        </div>

        {/* Botón de acción */}
        <Link to={`/events/${event.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-gt-gold to-yellow-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-gt-gold/50 transition-all"
          >
            {t.event.viewDetails} →
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

// ============================================
// COMPONENTE: EVENT MODAL
// ============================================

const EventModal = ({ event, setShowModal, getCategoryInfo, formatDate, t, language }) => {
  const catInfo = getCategoryInfo(event.category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={() => setShowModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gt-gray-dark to-black rounded-3xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl border border-white/20"
        >
          ×
        </motion.button>

        {/* Imagen/Video de portada */}
        {(event.image_url || event.video_url) && (
          <div className="relative h-96 overflow-hidden rounded-t-3xl">
            {event.video_url ? (
              <video
                src={event.video_url}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {/* Badge de categoría */}
            <div className="absolute bottom-4 left-4 px-4 py-2 bg-gt-gold/90 backdrop-blur-sm rounded-full flex items-center gap-2">
              <catInfo.Icon className="w-5 h-5 text-black" />
              <span className="font-bold text-black">{catInfo.label}</span>
            </div>
          </div>
        )}

        {/* Contenido */}
        <div className="p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl font-voga font-bold text-white mb-6">
            {event.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">{t.event.date}</p>
                <p className="text-white font-semibold">{formatDate(event.start_date)}</p>
              </div>

              {event.location && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t.event.location}</p>
                  <p className="text-white font-semibold">{event.location}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {event.capacity && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">{t.event.capacity}</p>
                  <p className="text-white font-semibold">{event.capacity} {t.event.spots}</p>
                </div>
              )}

              <div>
                <p className="text-gray-400 text-sm mb-1">{t.event.price}</p>
                <p className="text-gt-gold font-bold text-2xl">
                  {event.price > 0 ? `${event.price}€` : t.event.freeEvent}
                </p>
              </div>
            </div>
          </div>

          {event.description && (
            <div className="mb-8">
              <h3 className="text-xl font-voga font-bold text-gt-gold mb-4">Descripción</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}

          <Link to={`/events/${event.id}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-gt-gold to-yellow-600 text-black text-lg font-bold rounded-xl hover:shadow-lg hover:shadow-gt-gold/50 transition-all"
            >
              {t.event.viewDetails} →
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Events;