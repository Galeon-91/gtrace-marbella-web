import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../supabase/supabaseClient';
import { useLanguage } from '../../context/LanguageContext';

// ============================================
// SVG ICONOS PERSONALIZADOS
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

// ============================================
// TRADUCCIONES
// ============================================

const translations = {
  es: {
    title: "Gestión de Eventos",
    subtitle: "Crea y administra todos los eventos del club",
    createNew: "Crear Nuevo Evento",
    filters: {
      all: "Todos",
      upcoming: "Próximos",
      finished: "Finalizados",
      draft: "Borradores"
    },
    categories: {
      all: "Todas las Categorías",
      eventos: "Eventos",
      trackday: "Trackday",
      rutas: "Rutas",
      noticias: "Noticias"
    },
    status: {
      upcoming: "Próximo",
      finished: "Finalizado",
      draft: "Borrador",
      cancelled: "Cancelado"
    },
    actions: {
      view: "Ver",
      edit: "Editar",
      delete: "Eliminar",
      publish: "Publicar",
      unpublish: "Despublicar",
      save: "Guardar",
      cancel: "Cancelar",
      create: "Crear Evento",
      update: "Guardar Cambios"
    },
    form: {
      title: "Título del Evento",
      titlePlaceholder: "Diamond Event 2026",
      description: "Descripción",
      descriptionPlaceholder: "Describe el evento en detalle...",
      category: "Categoría",
      status: "Estado",
      startDate: "Fecha de Inicio",
      endDate: "Fecha de Fin",
      location: "Ubicación",
      locationPlaceholder: "Puerto Banús, Marbella",
      capacity: "Capacidad",
      capacityPlaceholder: "50",
      price: "Precio €",
      pricePlaceholder: "0.00",
      image: "Imagen del Evento",
      video: "Video del Evento (opcional)",
      publishNow: "Publicar inmediatamente (visible en la web)"
    },
    messages: {
      loading: "Cargando eventos...",
      noEvents: "No hay eventos con estos filtros",
      createFirst: "Crear Primer Evento",
      uploading: "Subiendo imagen...",
      uploadingVideo: "Subiendo video...",
      creating: "Creando...",
      updating: "Guardando...",
      deleting: "Eliminando...",
      confirmDelete: "¿Eliminar este evento?",
      created: "Evento creado exitosamente",
      updated: "Evento actualizado exitosamente",
      deleted: "Evento eliminado",
      error: "Error al procesar la solicitud",
      videoUploaded: "Video subido exitosamente",
      invalidVideo: "Por favor selecciona un archivo de video",
      videoTooLarge: "El video es demasiado grande. Máximo 100MB"
    },
    modal: {
      titleCreate: "Crear Nuevo Evento",
      titleEdit: "Editar Evento",
      details: "Detalles del Evento"
    }
  },
  en: {
    title: "Events Management",
    subtitle: "Create and manage all club events",
    createNew: "Create New Event",
    filters: {
      all: "All",
      upcoming: "Upcoming",
      finished: "Finished",
      draft: "Drafts"
    },
    categories: {
      all: "All Categories",
      eventos: "Events",
      trackday: "Trackday",
      rutas: "Routes",
      noticias: "News"
    },
    status: {
      upcoming: "Upcoming",
      finished: "Finished",
      draft: "Draft",
      cancelled: "Cancelled"
    },
    actions: {
      view: "View",
      edit: "Edit",
      delete: "Delete",
      publish: "Publish",
      unpublish: "Unpublish",
      save: "Save",
      cancel: "Cancel",
      create: "Create Event",
      update: "Save Changes"
    },
    form: {
      title: "Event Title",
      titlePlaceholder: "Diamond Event 2026",
      description: "Description",
      descriptionPlaceholder: "Describe the event in detail...",
      category: "Category",
      status: "Status",
      startDate: "Start Date",
      endDate: "End Date",
      location: "Location",
      locationPlaceholder: "Puerto Banús, Marbella",
      capacity: "Capacity",
      capacityPlaceholder: "50",
      price: "Price €",
      pricePlaceholder: "0.00",
      image: "Event Image",
      video: "Event Video (optional)",
      publishNow: "Publish immediately (visible on the web)"
    },
    messages: {
      loading: "Loading events...",
      noEvents: "No events with these filters",
      createFirst: "Create First Event",
      uploading: "Uploading image...",
      uploadingVideo: "Uploading video...",
      creating: "Creating...",
      updating: "Saving...",
      deleting: "Deleting...",
      confirmDelete: "Delete this event?",
      created: "Event created successfully",
      updated: "Event updated successfully",
      deleted: "Event deleted",
      error: "Error processing request",
      videoUploaded: "Video uploaded successfully",
      invalidVideo: "Please select a video file",
      videoTooLarge: "Video is too large. Maximum 100MB"
    },
    modal: {
      titleCreate: "Create New Event",
      titleEdit: "Edit Event",
      details: "Event Details"
    }
  }
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const EventsAdmin = ({ embedded = false }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.es;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [processing, setProcessing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'eventos',
    start_date: '',
    end_date: '',
    location: '',
    capacity: '',
    price: '',
    image_url: '',
    video_url: '',
    status: 'draft',
    published: false
  });

  const categories = [
    { value: 'eventos', label: t.categories.eventos, Icon: EventIcon },
    { value: 'trackday', label: t.categories.trackday, Icon: TrackdayIcon },
    { value: 'rutas', label: t.categories.rutas, Icon: RutasIcon },
    { value: 'noticias', label: t.categories.noticias, Icon: NoticiasIcon }
  ];

  useEffect(() => {
    fetchEvents();
  }, [filter, categoryFilter]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: false });

      if (filter === 'upcoming') query = query.eq('status', 'upcoming');
      else if (filter === 'finished') query = query.eq('status', 'finished');
      else if (filter === 'draft') query = query.eq('status', 'draft');

      if (categoryFilter !== 'all') query = query.eq('category', categoryFilter);

      const { data, error } = await query;
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `image_${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('events')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(t.messages.error);
    }
    setUploadingImage(false);
  };

  // ⭐ NUEVA FUNCIÓN: Upload de video
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar que sea video
    if (!file.type.startsWith('video/')) {
      alert(t.messages.invalidVideo);
      return;
    }

    // Validar tamaño (máx 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      alert(t.messages.videoTooLarge);
      return;
    }

    setUploadingVideo(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `video_${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('events')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(filePath);

      setFormData({ ...formData, video_url: publicUrl });
      alert(t.messages.videoUploaded);
    } catch (error) {
      console.error('Error uploading video:', error);
      alert(t.messages.error);
    }
    setUploadingVideo(false);
  };

  const handleCreateEvent = async () => {
    setProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from('events').insert([
        {
          ...formData,
          published_at: formData.published ? new Date().toISOString() : null
        }
      ]);

      if (error) throw error;
      
      alert(t.messages.created);
      setShowModal(false);
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      alert(t.messages.error);
    }
    setProcessing(false);
  };

  const handleUpdateEvent = async () => {
    setProcessing(true);
    try {
      const { error } = await supabase
        .from('events')
        .update({
          ...formData,
          published_at: formData.published && !selectedEvent.published ? new Date().toISOString() : selectedEvent.published_at
        })
        .eq('id', selectedEvent.id);

      if (error) throw error;
      
      alert(t.messages.updated);
      setShowModal(false);
      setSelectedEvent(null);
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      alert(t.messages.error);
    }
    setProcessing(false);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm(t.messages.confirmDelete)) return;
    
    setProcessing(true);
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      
      alert(t.messages.deleted);
      setShowModal(false);
      setSelectedEvent(null);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert(t.messages.error);
    }
    setProcessing(false);
  };

  const handleTogglePublish = async (event) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({
          published: !event.published,
          published_at: !event.published ? new Date().toISOString() : event.published_at
        })
        .eq('id', event.id);

      if (error) throw error;
      fetchEvents();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const openCreateModal = () => {
    resetForm();
    setModalMode('create');
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      category: event.category,
      start_date: event.start_date ? new Date(event.start_date).toISOString().slice(0, 16) : '',
      end_date: event.end_date ? new Date(event.end_date).toISOString().slice(0, 16) : '',
      location: event.location || '',
      capacity: event.capacity || '',
      price: event.price || '',
      image_url: event.image_url || '',
      video_url: event.video_url || '',
      status: event.status,
      published: event.published
    });
    setModalMode('edit');
    setShowModal(true);
  };

  const openViewModal = (event) => {
    setSelectedEvent(event);
    setModalMode('view');
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'eventos',
      start_date: '',
      end_date: '',
      location: '',
      capacity: '',
      price: '',
      image_url: '',
      video_url: '',
      status: 'draft',
      published: false
    });
  };

  const getCategoryInfo = (categoryValue) => {
    return categories.find(c => c.value === categoryValue) || categories[0];
  };

  return (
    <div className={embedded ? '' : 'min-h-screen bg-black text-white pt-20 sm:pt-24 pb-12 sm:pb-20 px-3 sm:px-4 lg:px-6 relative overflow-hidden'}>
      {/* BACKGROUND - SOLO SI NO embedded */}
      {!embedded && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-gt-gold/5 via-black to-gt-gold/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gt-gold/10 via-transparent to-transparent" />
          
          {/* Partículas doradas */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gt-gold rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: -20,
                  opacity: Math.random() * 0.5
                }}
                animate={{
                  y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 20,
                  opacity: [null, Math.random() * 0.5, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
        </>
      )}

      <div className={embedded ? '' : 'container mx-auto max-w-7xl relative z-10'}>
        
        {/* HEADER - SOLO SI NO embedded */}
        {!embedded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-march font-bold mb-2 bg-gradient-to-r from-gt-gold to-yellow-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">{t.subtitle}</p>
          </motion.div>
        )}

        {/* Botón crear */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openCreateModal}
          className="mb-6 sm:mb-8 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gt-gold to-yellow-600 text-black rounded-xl font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-gt-gold/50 transition-all duration-300"
        >
          + {t.createNew}
        </motion.button>

        {/* Filtros */}
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              { value: 'all', label: t.filters.all, count: events.length },
              { value: 'upcoming', label: t.filters.upcoming, count: events.filter(e => e.status === 'upcoming').length },
              { value: 'finished', label: t.filters.finished, count: events.filter(e => e.status === 'finished').length },
              { value: 'draft', label: t.filters.draft, count: events.filter(e => e.status === 'draft').length }
            ].map((filterOption) => (
              <motion.button
                key={filterOption.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(filterOption.value)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all ${
                  filter === filterOption.value
                    ? 'bg-gt-gold text-black shadow-lg shadow-gt-gold/30'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {filterOption.label} ({filterOption.count})
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategoryFilter('all')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all ${
                categoryFilter === 'all'
                  ? 'bg-gt-gold/20 text-gt-gold border-2 border-gt-gold'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              📅 {t.categories.all}
            </motion.button>
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategoryFilter(cat.value)}
                className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all ${
                  categoryFilter === cat.value
                    ? 'bg-gt-gold/20 text-gt-gold border-2 border-gt-gold'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <cat.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 sm:py-20">
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-gt-gold border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-400 mt-4 text-sm sm:text-base">{t.messages.loading}</p>
          </div>
        )}

        {/* Grid de eventos */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {events.map((event, index) => {
                const catInfo = getCategoryInfo(event.category);
                return (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-gt-gold/50 transition-all group"
                  >
                    <div className="relative h-40 sm:h-48 overflow-hidden bg-gt-gray-dark">
                      {event.image_url ? (
                        <motion.img 
                          src={event.image_url} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <catInfo.Icon className="w-16 h-16 sm:w-20 sm:h-20 text-gt-gold/30" />
                        </div>
                      )}
                      
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-1 bg-gt-gold/90 backdrop-blur-sm text-black rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2">
                        <catInfo.Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">{catInfo.label}</span>
                      </div>

                      <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold backdrop-blur-sm ${
                        event.status === 'upcoming' ? 'bg-green-500/20 text-green-300 border border-green-500' :
                        event.status === 'finished' ? 'bg-gray-500/20 text-gray-300 border border-gray-500' :
                        'bg-yellow-500/20 text-yellow-300 border border-yellow-500'
                      }`}>
                        {t.status[event.status]}
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-march font-bold text-white mb-2 line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2">
                          📅 {new Date(event.start_date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { 
                            day: 'numeric', 
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 line-clamp-1">
                            📍 {event.location}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openViewModal(event)}
                          className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-xs sm:text-sm transition-all"
                        >
                          {t.actions.view}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openEditModal(event)}
                          className="flex-1 py-2 bg-gt-gold/20 hover:bg-gt-gold/30 text-gt-gold rounded-lg font-semibold text-xs sm:text-sm transition-all"
                        >
                          {t.actions.edit}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleTogglePublish(event)}
                          className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-lg sm:text-xl transition-all ${
                            event.published 
                              ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' 
                              : 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30'
                          }`}
                          title={event.published ? t.actions.unpublish : t.actions.publish}
                        >
                          {event.published ? '👁️' : '🔒'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty state */}
        {!loading && events.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-20"
          >
            <motion.div 
              className="text-5xl sm:text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              📅
            </motion.div>
            <p className="text-gray-400 text-base sm:text-lg mb-6">{t.messages.noEvents}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCreateModal}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gt-gold text-black rounded-xl font-bold text-sm sm:text-base hover:bg-gt-gold-light transition-all"
            >
              {t.messages.createFirst}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gt-gray-dark rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full border border-white/10 my-4 sm:my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h3 className="text-2xl sm:text-3xl font-march font-bold text-white">
                  {modalMode === 'create' && t.modal.titleCreate}
                  {modalMode === 'edit' && t.modal.titleEdit}
                  {modalMode === 'view' && selectedEvent?.title}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white text-3xl sm:text-4xl leading-none"
                >
                  ×
                </motion.button>
              </div>

              {modalMode === 'view' ? (
                <div className="space-y-4 sm:space-y-6">
                  {selectedEvent.image_url && (
                    <motion.img 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={selectedEvent.image_url} 
                      alt={selectedEvent.title}
                      className="w-full h-48 sm:h-64 object-cover rounded-xl"
                    />
                  )}

                  {selectedEvent.video_url && (
                    <motion.video
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={selectedEvent.video_url}
                      controls
                      className="w-full h-48 sm:h-64 object-cover rounded-xl"
                    />
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.form.category}</p>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const catInfo = getCategoryInfo(selectedEvent.category);
                          return (
                            <>
                              <catInfo.Icon className="w-5 h-5 text-gt-gold" />
                              <p className="text-white font-semibold text-sm sm:text-base">{catInfo.label}</p>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.form.status}</p>
                      <p className="text-white font-semibold text-sm sm:text-base capitalize">{t.status[selectedEvent.status]}</p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.form.startDate}</p>
                      <p className="text-white text-sm sm:text-base">
                        {new Date(selectedEvent.start_date).toLocaleString(language === 'es' ? 'es-ES' : 'en-US')}
                      </p>
                    </div>

                    {selectedEvent.location && (
                      <div>
                        <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.form.location}</p>
                        <p className="text-white text-sm sm:text-base">{selectedEvent.location}</p>
                      </div>
                    )}
                  </div>

                  {selectedEvent.description && (
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-2">{t.form.description}</p>
                      <p className="text-white whitespace-pre-wrap text-sm sm:text-base">{selectedEvent.description}</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openEditModal(selectedEvent)}
                      className="flex-1 py-3 bg-gt-gold text-black rounded-xl font-semibold text-sm sm:text-base hover:bg-gt-gold-light transition-all"
                    >
                      {t.actions.edit}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDeleteEvent(selectedEvent.id)}
                      className="px-6 py-3 bg-red-500/20 text-red-300 rounded-xl font-semibold text-sm sm:text-base hover:bg-red-500/30 transition-all border border-red-500/50"
                    >
                      {t.actions.delete}
                    </motion.button>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  modalMode === 'create' ? handleCreateEvent() : handleUpdateEvent();
                }} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold text-sm sm:text-base">{t.form.title} *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder={t.form.titlePlaceholder}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base focus:border-gt-gold focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2 font-semibold text-sm sm:text-base">{t.form.category} *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base focus:border-gt-gold focus:outline-none"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 font-semibold text-sm sm:text-base">{t.form.status}</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base focus:border-gt-gold focus:outline-none"
                      >
                        <option value="draft">{t.status.draft}</option>
                        <option value="upcoming">{t.status.upcoming}</option>
                        <option value="finished">{t.status.finished}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2 font-semibold text-sm sm:text-base">{t.form.startDate} *</label>
                      <input
                        type="datetime-local"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base focus:border-gt-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 font-semibold text-sm sm:text-base">{t.form.endDate}</label>
                      <input
                        type="datetime-local"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base focus:border-gt-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold text-sm sm:text-base">{t.form.location}</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder={t.form.locationPlaceholder}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base focus:border-gt-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold text-sm sm:text-base">{t.form.description}</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={6}
                      placeholder={t.form.descriptionPlaceholder}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base focus:border-gt-gold focus:outline-none resize-none"
                    />
                  </div>

                  {/* CAMPO DE IMAGEN */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold text-sm sm:text-base">{t.form.image}</label>
                    {formData.image_url && (
                      <motion.img 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src={formData.image_url} 
                        alt="Preview"
                        className="w-full h-40 sm:h-48 object-cover rounded-xl mb-3"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gt-gold file:text-black file:text-sm file:font-semibold hover:file:bg-gt-gold-light"
                    />
                    {uploadingImage && <p className="text-gray-400 text-xs sm:text-sm mt-2">{t.messages.uploading}</p>}
                  </div>

                  {/* ⭐ NUEVO: CAMPO DE VIDEO */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold text-sm sm:text-base">{t.form.video}</label>
                    {formData.video_url && (
                      <motion.video
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src={formData.video_url}
                        controls
                        className="w-full h-40 sm:h-48 object-cover rounded-xl mb-3"
                      />
                    )}
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      disabled={uploadingVideo}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gt-gold file:text-black file:text-sm file:font-semibold hover:file:bg-gt-gold-light"
                    />
                    {uploadingVideo && <p className="text-gray-400 text-xs sm:text-sm mt-2">{t.messages.uploadingVideo}</p>}
                    <p className="text-xs text-gray-400 mt-2">
                      Formatos aceptados: MP4, MOV, AVI, WEBM (máx 100MB)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2 font-semibold text-sm sm:text-base">{t.form.capacity}</label>
                      <input
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        placeholder={t.form.capacityPlaceholder}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base focus:border-gt-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 font-semibold text-sm sm:text-base">{t.form.price}</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder={t.form.pricePlaceholder}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm sm:text-base focus:border-gt-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded border-white/20 bg-white/5 text-gt-gold focus:ring-gt-gold"
                    />
                    <label htmlFor="published" className="text-white font-semibold text-sm sm:text-base">
                      {t.form.publishNow}
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={processing}
                      className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-gt-gold to-yellow-600 text-black rounded-xl font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-gt-gold/50 transition-all disabled:opacity-50"
                    >
                      {processing 
                        ? (modalMode === 'create' ? t.messages.creating : t.messages.updating)
                        : (modalMode === 'create' ? t.actions.create : t.actions.update)
                      }
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-sm sm:text-base transition-all"
                    >
                      {t.actions.cancel}
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsAdmin;