import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../supabase/supabaseClient';
import { useLanguage } from '../context/LanguageContext';

// ============================================
// SVG ICONOS PERSONALIZADOS ANIMADOS
// ============================================

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

const UsersIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <motion.circle cx="35" cy="30" r="12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} />
    <motion.circle cx="65" cy="30" r="12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
    <path d="M35 45 C20 45 10 55 10 70 L60 70 C60 55 50 45 35 45 Z" />
    <path d="M65 45 C50 45 40 55 40 70 L90 70 C90 55 80 45 65 45 Z" />
  </svg>
);

const MoneyIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3">
    <motion.circle cx="50" cy="50" r="25" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
    <motion.path d="M50 35 L50 65 M42 42 C45 38 55 38 58 42 M42 58 C45 62 55 62 58 58" strokeLinecap="round" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="50" cy="50" r="25" />
    <motion.path d="M50 30 L50 50 L65 50" strokeLinecap="round" animate={{ rotate: [0, 360] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "50px 50px" }} />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4">
    <motion.path d="M25 50 L40 65 L75 30" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
  </svg>
);

const ArrowLeftIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4">
    <path d="M60 20 L30 50 L60 80" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShareIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <circle cx="70" cy="25" r="12" />
    <circle cx="30" cy="50" r="12" />
    <circle cx="70" cy="75" r="12" />
    <line x1="40" y1="45" x2="60" y2="30" stroke="currentColor" strokeWidth="3" />
    <line x1="40" y1="55" x2="60" y2="70" stroke="currentColor" strokeWidth="3" />
  </svg>
);

const EventIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <motion.g animate={{ y: [0, -2, 0], rotate: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M35 25 L35 15 C35 10 40 10 45 10 L55 10 C60 10 65 10 65 15 L65 25 L35 25 Z" />
      <path d="M30 25 L35 40 L42 40 L42 70 L40 70 L40 75 L60 75 L60 70 L58 70 L58 40 L65 40 L70 25 Z" />
      <ellipse cx="50" cy="72" rx="8" ry="2" opacity="0.3" />
    </motion.g>
  </svg>
);

const TrackdayIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <motion.g animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "20px 80px" }}>
      <rect x="18" y="20" width="4" height="65" />
      <path d="M22 20 L60 20 L60 45 L22 45 Z" />
      <rect x="22" y="20" width="9.5" height="6.25" fill="white" />
      <rect x="31.5" y="20" width="9.5" height="6.25" fill="black" />
      <rect x="41" y="20" width="9.5" height="6.25" fill="white" />
      <rect x="50.5" y="20" width="9.5" height="6.25" fill="black" />
    </motion.g>
  </svg>
);

const RutasIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M20 25 L35 20 L35 70 L20 75 Z" opacity="0.8" />
      <path d="M35 20 L50 25 L50 75 L35 70 Z" opacity="0.9" />
      <path d="M50 25 L65 20 L65 70 L50 75 Z" opacity="1" />
      <path d="M65 20 L80 25 L80 75 L65 70 Z" opacity="0.8" />
    </motion.g>
  </svg>
);

const NoticiasIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <rect x="25" y="20" width="50" height="60" rx="2" />
    <rect x="30" y="26" width="20" height="15" fill="white" opacity="0.9" />
    <line x1="55" y1="28" x2="70" y2="28" stroke="white" strokeWidth="2" opacity="0.7" />
    <line x1="55" y1="33" x2="70" y2="33" stroke="white" strokeWidth="2" opacity="0.7" />
    <line x1="55" y1="38" x2="70" y2="38" stroke="white" strokeWidth="2" opacity="0.7" />
  </svg>
);

// ============================================
// TRADUCCIONES COMPLETAS
// ============================================

const translations = {
  es: {
    loading: "Cargando evento...",
    notFound: "Evento no encontrado",
    goBack: "Volver a Eventos",
    backToEvents: "← Volver a Eventos",
    share: "Compartir",
    register: "Inscribirse Ahora",
    eventFull: "Evento Completo",
    date: "Fecha y Hora",
    location: "Ubicación",
    capacity: "Capacidad",
    price: "Precio",
    status: "Estado",
    category: "Categoría",
    duration: "Duración",
    statusUpcoming: "Próximo",
    statusFinished: "Finalizado",
    statusDraft: "Borrador",
    statusCancelled: "Cancelado",
    catEventos: "Eventos",
    catTrackday: "Trackday",
    catRutas: "Rutas",
    catNoticias: "Noticias",
    description: "Descripción del Evento",
    details: "Detalles",
    gallery: "Galería",
    whatsIncluded: "¿Qué incluye?",
    requirements: "Requisitos",
    contact: "Información de Contacto",
    included1: "Acceso completo al evento",
    included2: "Certificado de participación",
    included3: "Coffee break y catering",
    included4: "Fotografías profesionales",
    included5: "Networking con otros asistentes",
    included6: "Material exclusivo del evento",
    req1: "Ser socio activo de GT Race Marbella",
    req2: "Vehículo en condiciones óptimas",
    req3: "Seguro vigente",
    req4: "Licencia de conducir válida",
    req5: "Equipo de seguridad requerido",
    spots: "plazas",
    spotsLeft: "plazas disponibles",
    free: "Gratis",
    perPerson: "por persona",
    moreEvents: "Más Eventos",
    relatedEvents: "Eventos Relacionados",
    viewFull: "Ver galería completa",
    photos: "fotos",
    registerTitle: "Inscripción al Evento",
    registerSubtitle: "Completa el formulario para reservar tu plaza",
    fullName: "Nombre Completo",
    email: "Email",
    phone: "Teléfono",
    company: "Empresa (opcional)",
    notes: "Notas adicionales (opcional)",
    spotsReserved: "Número de plazas",
    submit: "Confirmar Inscripción",
    cancel: "Cancelar",
    registerSuccess: "¡Inscripción exitosa! Te hemos enviado un email de confirmación.",
    registerError: "Error al procesar la inscripción. Inténtalo de nuevo.",
    requiredField: "Campo requerido"
  },
  en: {
    loading: "Loading event...",
    notFound: "Event not found",
    goBack: "Back to Events",
    backToEvents: "← Back to Events",
    share: "Share",
    register: "Register Now",
    eventFull: "Event Full",
    date: "Date & Time",
    location: "Location",
    capacity: "Capacity",
    price: "Price",
    status: "Status",
    category: "Category",
    duration: "Duration",
    statusUpcoming: "Upcoming",
    statusFinished: "Finished",
    statusDraft: "Draft",
    statusCancelled: "Cancelled",
    catEventos: "Events",
    catTrackday: "Track Day",
    catRutas: "Routes",
    catNoticias: "News",
    description: "Event Description",
    details: "Details",
    gallery: "Gallery",
    whatsIncluded: "What's Included?",
    requirements: "Requirements",
    contact: "Contact Information",
    included1: "Full event access",
    included2: "Participation certificate",
    included3: "Coffee break and catering",
    included4: "Professional photography",
    included5: "Networking with attendees",
    included6: "Exclusive event materials",
    req1: "Active GT Race Marbella membership",
    req2: "Vehicle in optimal condition",
    req3: "Valid insurance",
    req4: "Valid driver's license",
    req5: "Required safety equipment",
    spots: "spots",
    spotsLeft: "spots available",
    free: "Free",
    perPerson: "per person",
    moreEvents: "More Events",
    relatedEvents: "Related Events",
    viewFull: "View full gallery",
    photos: "photos",
    registerTitle: "Event Registration",
    registerSubtitle: "Fill out the form to reserve your spot",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    company: "Company (optional)",
    notes: "Additional notes (optional)",
    spotsReserved: "Number of spots",
    submit: "Confirm Registration",
    cancel: "Cancel",
    registerSuccess: "Registration successful! We've sent you a confirmation email.",
    registerError: "Error processing registration. Please try again.",
    requiredField: "Required field"
  }
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const EventDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const t = translations[language];

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false); // ⭐ NUEVO
  const [availableSpots, setAvailableSpots] = useState(null); // ⭐ NUEVO

  const categoryIcons = {
    eventos: EventIcon,
    trackday: TrackdayIcon,
    rutas: RutasIcon,
    noticias: NoticiasIcon
  };

  useEffect(() => {
    fetchEvent();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

      if (error) throw error;
      setEvent(data);

      if (data) {
        fetchRelatedEvents(data.category);
        // ⭐ NUEVO: Verificar plazas disponibles
        if (data.capacity) {
          await checkAvailableSpots(data.id);
        }
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    }
    setLoading(false);
  };

  const fetchRelatedEvents = async (category) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .neq('id', id)
        .limit(3);

      if (error) throw error;
      setRelatedEvents(data || []);
    } catch (error) {
      console.error('Error fetching related events:', error);
    }
  };

  // ⭐ NUEVO: Verificar plazas disponibles
  const checkAvailableSpots = async (eventId) => {
    try {
      const { data, error } = await supabase.rpc('get_event_available_spots', {
        event_uuid: eventId
      });

      if (error) throw error;
      setAvailableSpots(data);
    } catch (error) {
      console.error('Error checking spots:', error);
      // Si la función no existe, usar capacidad total
      setAvailableSpots(event?.capacity);
    }
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

  const getCategoryLabel = (cat) => {
    const labels = {
      eventos: language === 'es' ? 'Eventos' : 'Events',
      trackday: 'Trackday',
      rutas: language === 'es' ? 'Rutas' : 'Routes',
      noticias: language === 'es' ? 'Noticias' : 'News'
    };
    return labels[cat] || cat;
  };

  const getStatusLabel = (status) => {
    const labels = {
      upcoming: t.statusUpcoming,
      finished: t.statusFinished,
      draft: t.statusDraft,
      cancelled: t.statusCancelled
    };
    return labels[status] || status;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const CategoryIcon = event ? categoryIcons[event.category] || EventIcon : EventIcon;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-gt-gold border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-white ml-4 text-xl">{t.loading}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center flex-col">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-7xl mb-6"
        >
          😕
        </motion.div>
        <h2 className="text-3xl font-march font-bold text-white mb-4">{t.notFound}</h2>
        <Link to="/events">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gt-gold text-black rounded-xl font-bold hover:bg-gt-gold-light transition-all"
          >
            {t.goBack}
          </motion.button>
        </Link>
      </div>
    );
  }

  const isUpcoming = new Date(event.start_date) > new Date();
  const isFull = availableSpots !== null && availableSpots <= 0; // ⭐ NUEVO
  const spotsLeft = availableSpots !== null ? availableSpots : event.capacity;

  const includedItems = [
    t.included1,
    t.included2,
    t.included3,
    t.included4,
    t.included5,
    t.included6
  ];

  const requirements = [
    t.req1,
    t.req2,
    t.req3,
    t.req4,
    t.req5
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ============================================ */}
      {/* HERO SECTION CON IMAGEN/VIDEO */}
      {/* ============================================ */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          {event.video_url ? (
            <video
              src={event.video_url}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : event.image_url ? (
            <motion.img
              src={event.image_url}
              alt={event.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeOut" }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gt-gold/20 via-black to-black flex items-center justify-center">
              <CategoryIcon className="w-64 h-64 text-gt-gold/20" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Link to="/events">
                <motion.button
                  whileHover={{ x: -5 }}
                  className="flex items-center gap-2 text-white/80 hover:text-gt-gold transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span className="text-sm sm:text-base">{t.backToEvents}</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gt-gold/90 backdrop-blur-sm rounded-full">
                <CategoryIcon className="w-5 h-5 text-black" />
                <span className="text-sm font-bold text-black">{getCategoryLabel(event.category)}</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-march font-bold mb-6 max-w-4xl"
            >
              {event.title}
            </motion.h1>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-300"
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gt-gold" />
                <span>{formatShortDate(event.start_date).day} {formatShortDate(event.start_date).month} {formatShortDate(event.start_date).year}</span>
              </div>

              {event.location && (
                <div className="flex items-center gap-2">
                  <LocationIcon className="w-5 h-5 text-gt-gold" />
                  <span>{event.location}</span>
                </div>
              )}

              {spotsLeft && (
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-gt-gold" />
                  <span>{spotsLeft} {t.spotsLeft}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <MoneyIcon className="w-5 h-5 text-gt-gold" />
                <span className="font-bold text-gt-gold">
                  Consultar al club
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              {isUpcoming && (
                <motion.button
                  whileHover={{ scale: isFull ? 1 : 1.05 }}
                  whileTap={{ scale: isFull ? 1 : 0.95 }}
                  onClick={() => !isFull && setShowRegisterModal(true)} // ⭐ NUEVO
                  disabled={isFull} // ⭐ NUEVO
                  className={`px-8 py-4 text-lg font-bold rounded-xl shadow-2xl transition-all ${isFull
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gt-gold to-yellow-600 text-black shadow-gt-gold/50 hover:shadow-gt-gold/70'
                    }`}
                >
                  {isFull ? t.eventFull : t.register}
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="relative px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <ShareIcon className="w-5 h-5" />
                <span>{t.share}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DETAILS SECTION */}
      {/* ============================================ */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black via-gt-gray-dark/30 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-march font-bold mb-6 text-gt-gold">
                  {t.description}
                </h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                    {event.description || "Próximamente más información sobre este evento exclusivo."}
                  </p>
                </div>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl sm:text-3xl font-march font-bold mb-6 text-white">
                  {t.whatsIncluded}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {includedItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-gt-gold/50 transition-all"
                    >
                      <CheckIcon className="w-6 h-6 text-gt-gold flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              {event.category !== 'noticias' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl sm:text-3xl font-march font-bold mb-6 text-white">
                    {t.requirements}
                  </h3>
                  <div className="space-y-3">
                    {requirements.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <span className="w-2 h-2 bg-gt-gold rounded-full" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-24 space-y-6"
              >

                {/* Event Details Card */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-6">
                  <h3 className="text-xl font-march font-bold text-white border-b border-white/10 pb-4">
                    {t.details}
                  </h3>

                  {/* Date */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <CalendarIcon className="w-5 h-5 text-gt-gold" />
                      <span>{t.date}</span>
                    </div>
                    <p className="text-white font-medium pl-7">{formatDate(event.start_date)}</p>
                  </div>

                  {/* Location */}
                  {event.location && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <LocationIcon className="w-5 h-5 text-gt-gold" />
                        <span>{t.location}</span>
                      </div>
                      <p className="text-white font-medium pl-7">{event.location}</p>
                    </div>
                  )}

                  {/* Capacity */}
                  {spotsLeft && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <UsersIcon className="w-5 h-5 text-gt-gold" />
                        <span>{t.capacity}</span>
                      </div>
                      <p className="text-white font-medium pl-7">{spotsLeft} {t.spotsLeft}</p>
                    </div>
                  )}

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MoneyIcon className="w-5 h-5 text-gt-gold" />
                      <span>Precio</span>
                    </div>
                    <p className="text-gt-gold font-bold text-lg pl-7">
                      Consultar al club
                    </p>
                    <p className="text-sm text-gray-400 pl-7">
                      Contacta con nosotros para más información
                    </p>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <ClockIcon className="w-5 h-5 text-gt-gold" />
                      <span>{t.status}</span>
                    </div>
                    <p className={`font-semibold pl-7 ${event.status === 'upcoming' ? 'text-green-400' :
                      event.status === 'finished' ? 'text-gray-400' :
                        'text-yellow-400'
                      }`}>
                      {getStatusLabel(event.status)}
                    </p>
                  </div>
                </div>

                {/* CTA Card */}
                {isUpcoming && !isFull && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowRegisterModal(true)} // ⭐ NUEVO
                    className="bg-gradient-to-br from-gt-gold to-yellow-600 rounded-2xl p-6 text-black cursor-pointer"
                  >
                    <h4 className="font-bold text-xl mb-2">{t.register}</h4>
                    <p className="text-sm mb-4">
                      {language === 'es' ? 'Asegura tu plaza ahora' : 'Secure your spot now'}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span>{language === 'es' ? 'Plazas limitadas' : 'Limited spots'}</span>
                      <span className="font-bold">→</span>
                    </div>
                  </motion.div>
                )}

                {/* Contact Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                  <h4 className="font-march font-bold text-white mb-4">{t.contact}</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <a href="tel:+34687999427" className="flex items-center gap-2 hover:text-gt-gold transition-colors">
                      <span>📞</span>
                      <span>+34 687 99 94 27</span>
                    </a>
                    <a href="mailto:info@gtracemarbella.com" className="flex items-center gap-2 hover:text-gt-gold transition-colors">
                      <span>✉️</span>
                      <span>info@gtracemarbella.com</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* RELATED EVENTS */}
      {/* ============================================ */}
      {relatedEvents.length > 0 && (
        <section className="relative py-16 sm:py-20 bg-gradient-to-b from-black via-gt-gray-dark/20 to-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-march font-bold mb-12 text-center bg-gradient-to-r from-gt-gold to-yellow-500 bg-clip-text text-transparent"
            >
              {t.relatedEvents}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedEvents.map((relatedEvent, index) => (
                <RelatedEventCard
                  key={relatedEvent.id}
                  event={relatedEvent}
                  index={index}
                  formatShortDate={formatShortDate}
                  categoryIcons={categoryIcons}
                  getCategoryLabel={getCategoryLabel}
                  language={language}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ⭐ NUEVO: REGISTRATION MODAL */}
      <AnimatePresence>
        {showRegisterModal && (
          <RegistrationModal
            event={event}
            onClose={() => setShowRegisterModal(false)}
            onSuccess={() => {
              setShowRegisterModal(false);
              fetchEvent(); // Actualizar plazas disponibles
            }}
            t={t}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// COMPONENTE: RELATED EVENT CARD
// ============================================

const RelatedEventCard = ({ event, index, formatShortDate, categoryIcons, getCategoryLabel, language }) => {
  const CategoryIcon = categoryIcons[event.category] || categoryIcons.eventos;
  const dateInfo = formatShortDate(event.start_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <Link to={`/events/${event.id}`}>
        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-gt-gold/50 transition-all duration-500 h-full">

          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-gt-gray-dark">
            {event.image_url ? (
              <motion.img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gt-gold/20 to-transparent">
                <CategoryIcon className="w-16 h-16 text-gt-gold/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 bg-gt-gold/90 backdrop-blur-sm rounded-full flex items-center gap-2">
              <CategoryIcon className="w-4 h-4 text-black" />
              <span className="text-xs font-bold text-black">{getCategoryLabel(event.category)}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex flex-col items-center justify-center w-14 h-14 bg-gt-gold/20 border border-gt-gold/50 rounded-xl">
                <span className="text-xl font-bold text-gt-gold">{dateInfo.day}</span>
                <span className="text-xs text-gt-gold uppercase">{dateInfo.month}</span>
              </div>

              <h3 className="text-lg font-march font-bold text-white line-clamp-2 group-hover:text-gt-gold transition-colors flex-1">
                {event.title}
              </h3>
            </div>

            {event.location && (
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <LocationIcon className="w-4 h-4 text-gt-gold" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}

            <motion.div
              whileHover={{ x: 5 }}
              className="text-gt-gold font-semibold flex items-center gap-2"
            >
              <span>{language === 'es' ? 'Ver detalles' : 'View details'}</span>
              <span>→</span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ============================================
// ⭐ NUEVO: COMPONENTE REGISTRATION MODAL
// ============================================

const RegistrationModal = ({ event, onClose, onSuccess, t }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
    spots_reserved: 1
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = t.requiredField;
    if (!formData.email.trim()) newErrors.email = t.requiredField;
    if (!formData.phone.trim()) newErrors.phone = t.requiredField;
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert([{
          event_id: event.id,
          ...formData,
          payment_amount: event.price * formData.spots_reserved
        }]);

      if (error) throw error;

      alert(t.registerSuccess);
      onSuccess();
    } catch (error) {
      console.error('Error registering:', error);
      alert(t.registerError);
    }
    setSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gt-gray-dark to-black rounded-3xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-march font-bold text-white mb-2">{t.registerTitle}</h2>
            <p className="text-gray-400">{t.registerSubtitle}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t.fullName} *</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className={`w-full px-4 py-3 bg-white/5 border ${errors.full_name ? 'border-red-500' : 'border-white/10'} rounded-xl text-white focus:outline-none focus:border-gt-gold`}
            />
            {errors.full_name && <p className="text-red-400 text-sm mt-1">{errors.full_name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t.email} *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl text-white focus:outline-none focus:border-gt-gold`}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t.phone} *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl text-white focus:outline-none focus:border-gt-gold`}
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t.company}</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gt-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t.spotsReserved}</label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.spots_reserved}
              onChange={(e) => setFormData({ ...formData, spots_reserved: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gt-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t.notes}</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="3"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gt-gold resize-none"
            />
          </div>

          {/* PRECIO OCULTO - El pago se gestiona por separado */}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-gradient-to-r from-gt-gold to-yellow-600 text-black rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {submitting ? '...' : t.submit}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EventDetail;