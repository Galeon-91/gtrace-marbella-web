import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../supabase/supabaseClient';
import { useLanguage } from '../../context/LanguageContext';

// ============================================
// SVG ICONOS PERSONALIZADOS
// ============================================

const MessageIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    />
    <motion.polyline
      points="22,6 12,13 2,6"
      animate={{ pathLength: [0.9, 1, 0.9] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      animate={{ rotate: [0, 5, 0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <motion.path
      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

// ============================================
// TRADUCCIONES
// ============================================

const translations = {
  es: {
    title: 'Solicitudes de Contacto',
    subtitle: 'Gestiona los mensajes recibidos',
    all: 'Todas',
    date: 'Fecha',
    name: 'Nombre',
    email: 'Email',
    phone: 'Teléfono',
    subject: 'Asunto',
    actions: 'Acciones',
    viewDetails: 'Ver Detalles',
    loading: 'Cargando solicitudes...',
    noSubmissions: 'No hay solicitudes de contacto',
    detailsTitle: 'Detalles del Mensaje',
    contactInfo: 'Información de Contacto',
    message: 'Mensaje',
    replyEmail: 'Responder por Email',
    call: 'Llamar',
    delete: 'Eliminar',
    close: 'Cerrar',
    confirmDelete: '¿Eliminar esta solicitud?',
    general: 'General'
  },
  en: {
    title: 'Contact Requests',
    subtitle: 'Manage received messages',
    all: 'All',
    date: 'Date',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    subject: 'Subject',
    actions: 'Actions',
    viewDetails: 'View Details',
    loading: 'Loading requests...',
    noSubmissions: 'No contact requests',
    detailsTitle: 'Message Details',
    contactInfo: 'Contact Information',
    message: 'Message',
    replyEmail: 'Reply by Email',
    call: 'Call',
    delete: 'Delete',
    close: 'Close',
    confirmDelete: 'Delete this request?',
    general: 'General'
  }
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const ContactAdmin = ({ embedded = false }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
    setLoading(false);
  };

  const deleteSubmission = async (id) => {
    if (!confirm(t.confirmDelete)) return;
    
    try {
      const { error } = await supabase
        .from('contact_requests')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setSelectedSubmission(null);
      fetchSubmissions();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className={embedded ? '' : 'min-h-screen bg-black text-white pt-20 sm:pt-24 pb-12 sm:pb-20 px-3 sm:px-4'}>
      {/* Background - Solo si NO embedded */}
      {!embedded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gt-gold/5 via-black to-gt-gold/5 pointer-events-none" />
      )}

      <div className={embedded ? '' : 'container mx-auto max-w-7xl relative z-10'}>
        
        {/* HEADER - Solo si NO embedded */}
        {!embedded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-voga font-bold mb-2">
              {t.title}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">{t.subtitle}</p>
          </motion.div>
        )}

        {/* FILTROS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: embedded ? 0 : 0.1 }}
          className="flex gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all ${
              filter === 'all'
                ? 'bg-gt-gold text-black shadow-lg shadow-gt-gold/30'
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <MessageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            {t.all} ({submissions.length})
          </motion.button>
        </motion.div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-12 sm:py-20">
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-gt-gold border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-400 text-sm sm:text-base">{t.loading}</p>
          </div>
        )}

        {/* TABLA */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: embedded ? 0 : 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden"
          >
            {submissions.length === 0 ? (
              <div className="text-center py-12 sm:py-20">
                <motion.div
                  className="text-5xl sm:text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  📬
                </motion.div>
                <p className="text-gray-400 text-base sm:text-lg">{t.noSubmissions}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-gray-400 font-semibold text-xs sm:text-sm">{t.date}</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-gray-400 font-semibold text-xs sm:text-sm">{t.name}</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-gray-400 font-semibold text-xs sm:text-sm hidden md:table-cell">{t.email}</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-gray-400 font-semibold text-xs sm:text-sm hidden lg:table-cell">{t.phone}</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-gray-400 font-semibold text-xs sm:text-sm hidden sm:table-cell">{t.subject}</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-gray-400 font-semibold text-xs sm:text-sm">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission, index) => (
                      <motion.tr
                        key={submission.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-300 text-xs sm:text-sm">
                          {new Date(submission.created_at).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-white font-semibold text-xs sm:text-sm">
                          {submission.name}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-300 text-xs sm:text-sm hidden md:table-cell">
                          {submission.email}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-300 text-xs sm:text-sm hidden lg:table-cell">
                          {submission.phone || '-'}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-300 text-xs sm:text-sm hidden sm:table-cell">
                          {submission.subject || t.general}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedSubmission(submission)}
                            className="px-3 sm:px-4 py-2 bg-gt-gold text-black rounded-lg font-semibold text-xs sm:text-sm hover:bg-gt-gold-light transition-all"
                          >
                            {t.viewDetails}
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* MODAL DETALLES */}
        <AnimatePresence>
          {selectedSubmission && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
              onClick={() => setSelectedSubmission(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gt-gray-dark rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full border border-white/10 max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-voga font-bold text-white">
                    {t.detailsTitle}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedSubmission(null)}
                    className="text-gray-400 hover:text-white text-2xl sm:text-3xl leading-none"
                  >
                    ×
                  </motion.button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Información de Contacto */}
                  <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <MessageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gt-gold" />
                      {t.contactInfo}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.name}</p>
                        <p className="text-white font-semibold text-sm sm:text-base">{selectedSubmission.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.email}</p>
                        <p className="text-white text-sm sm:text-base">{selectedSubmission.email}</p>
                      </div>
                      {selectedSubmission.phone && (
                        <div>
                          <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.phone}</p>
                          <p className="text-white text-sm sm:text-base">{selectedSubmission.phone}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-gray-400 text-xs sm:text-sm mb-1">{t.date}</p>
                        <p className="text-white text-sm sm:text-base">
                          {new Date(selectedSubmission.created_at).toLocaleString(language === 'es' ? 'es-ES' : 'en-US')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Asunto */}
                  {selectedSubmission.subject && (
                    <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{t.subject}</h4>
                      <p className="text-gray-300 text-sm sm:text-base">{selectedSubmission.subject}</p>
                    </div>
                  )}

                  {/* Mensaje */}
                  <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{t.message}</h4>
                    <p className="text-gray-300 whitespace-pre-wrap text-sm sm:text-base">{selectedSubmission.message}</p>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject || 'Consulta GT Race'}`}
                      className="flex-1 py-3 bg-gt-gold text-black rounded-xl font-semibold text-center hover:bg-gt-gold-light transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <MailIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {t.replyEmail}
                    </motion.a>
                    {selectedSubmission.phone && (
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={`tel:${selectedSubmission.phone}`}
                        className="flex-1 py-3 bg-white/10 text-white rounded-xl font-semibold text-center hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        {t.call}
                      </motion.a>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => deleteSubmission(selectedSubmission.id)}
                      className="px-4 sm:px-6 py-3 bg-red-500/20 text-red-300 rounded-xl font-semibold hover:bg-red-500/30 transition-all border border-red-500/50 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {t.delete}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactAdmin;