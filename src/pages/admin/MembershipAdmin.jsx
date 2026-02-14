import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../supabase/supabaseClient';
import { useLanguage } from '../../context/LanguageContext';

// ============================================
// SVG ICONOS PERSONALIZADOS
// ============================================

const UserGroupIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      animate={{ pathLength: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <circle cx="9" cy="7" r="4" />
    <motion.path
      d="M23 21v-2a4 4 0 0 0-3-3.87"
      animate={{ pathLength: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />
    <motion.path
      d="M16 3.13a4 4 0 0 1 0 7.75"
      animate={{ pathLength: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
  </svg>
);

const CheckCircleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <motion.circle
      cx="12" cy="12" r="10"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M9 12l2 2 4-4"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    />
  </svg>
);

const XCircleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <motion.line
      x1="15" y1="9" x2="9" y2="15"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
    />
    <motion.line
      x1="9" y1="9" x2="15" y2="15"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2, delay: 0.15 }}
    />
  </svg>
);

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const AdminDashboard = ({ embedded = false }) => {
  const { language } = useLanguage();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedApp, setSelectedApp] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('membership_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
    setLoading(false);
  };

  const handleApprove = async (applicationId, rank) => {
    setProcessing(true);
    try {
      const { error } = await supabase.rpc('approve_membership_application', {
        application_id: applicationId,
        approved_rank: rank
      });

      if (error) throw error;

      alert(`✅ ${t.approveSuccess} ${rank.toUpperCase()}`);
      fetchApplications();
      setSelectedApp(null);
    } catch (error) {
      console.error('Error approving:', error);
      alert(`❌ ${t.error}`);
    }
    setProcessing(false);
  };

  const handleReject = async (applicationId) => {
    if (!confirm(t.confirmReject)) return;

    setProcessing(true);
    try {
      const { error } = await supabase
        .from('membership_applications')
        .update({ status: 'rejected' })
        .eq('id', applicationId);

      if (error) throw error;

      alert(`❌ ${t.rejectSuccess}`);
      fetchApplications();
      setSelectedApp(null);
    } catch (error) {
      console.error('Error rejecting:', error);
      alert(`❌ ${t.error}`);
    }
    setProcessing(false);
  };

  const translations = {
    es: {
      title: 'Panel de Administración',
      subtitle: 'Gestión de Solicitudes de Membresía',
      pending: 'Pendientes',
      approved: 'Aprobadas',
      rejected: 'Rechazadas',
      all: 'Todas',
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      date: 'Fecha',
      status: 'Estado',
      actions: 'Acciones',
      viewDetails: 'Ver Detalles',
      approveSilver: 'Aprobar Silver',
      approveGold: 'Aprobar Gold',
      approvePlatinum: 'Aprobar Platinum',
      reject: 'Rechazar',
      close: 'Cerrar',
      loading: 'Cargando...',
      noApplications: 'No hay solicitudes',
      personalInfo: 'Información Personal',
      addressInfo: 'Dirección',
      additionalInfo: 'Información Adicional',
      carIntention: 'Intención con Coche',
      carForSale: 'Coche para Vender',
      carToBuy: 'Busca Comprar',
      livesInMarbella: 'Vive en Marbella',
      carOwned: 'Coche Actual',
      numberOfCars: 'Número de Coches',
      howHeard: 'Cómo nos conoció',
      brand: 'Marca',
      model: 'Modelo',
      version: 'Versión',
      year: 'Año',
      km: 'Kilómetros',
      fuel: 'Combustible',
      power: 'Potencia',
      transmission: 'Transmisión',
      doors: 'Puertas',
      color: 'Color',
      vin: 'VIN',
      price: 'Precio',
      notes: 'Notas',
      description: 'Descripción',
      none: 'Ninguno',
      buy: 'Comprar',
      sell: 'Vender',
      approveSuccess: 'Solicitud aprobada como',
      rejectSuccess: 'Solicitud rechazada',
      confirmReject: '¿Estás seguro de rechazar esta solicitud?',
      error: 'Error al procesar'
    },
    en: {
      title: 'Admin Dashboard',
      subtitle: 'Membership Applications Management',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      all: 'All',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      date: 'Date',
      status: 'Status',
      actions: 'Actions',
      viewDetails: 'View Details',
      approveSilver: 'Approve Silver',
      approveGold: 'Approve Gold',
      approvePlatinum: 'Approve Platinum',
      reject: 'Reject',
      close: 'Close',
      loading: 'Loading...',
      noApplications: 'No applications',
      personalInfo: 'Personal Information',
      addressInfo: 'Address',
      additionalInfo: 'Additional Information',
      carIntention: 'Car Intention',
      carForSale: 'Car for Sale',
      carToBuy: 'Looking to Buy',
      livesInMarbella: 'Lives in Marbella',
      carOwned: 'Current Car',
      numberOfCars: 'Number of Cars',
      howHeard: 'How they heard about us',
      brand: 'Brand',
      model: 'Model',
      version: 'Version',
      year: 'Year',
      km: 'Kilometers',
      fuel: 'Fuel',
      power: 'Power',
      transmission: 'Transmission',
      doors: 'Doors',
      color: 'Color',
      vin: 'VIN',
      price: 'Price',
      notes: 'Notes',
      description: 'Description',
      none: 'None',
      buy: 'Buy',
      sell: 'Sell',
      approveSuccess: 'Application approved as',
      rejectSuccess: 'Application rejected',
      confirmReject: 'Are you sure you want to reject this application?',
      error: 'Error processing'
    }
  };

  const t = translations[language];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      approved: 'bg-green-500/20 text-green-400 border-green-500/50',
      rejected: 'bg-red-500/20 text-red-400 border-red-500/50'
    };
    return styles[status] || styles.pending;
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
            className="mb-8 sm:mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-voga font-bold text-white mb-2 sm:mb-4">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300">{t.subtitle}</p>
          </motion.div>
        )}

        {/* FILTROS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: embedded ? 0 : 0.1 }}
          className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-4"
        >
          {['pending', 'approved', 'rejected', 'all'].map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2
                ${filter === f 
                  ? 'bg-gt-gold text-black shadow-lg shadow-gt-gold/30' 
                  : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
            >
              {f === 'pending' && <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
              {f === 'approved' && <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
              {f === 'rejected' && <XCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
              {t[f]} ({applications.filter(app => f === 'all' || app.status === f).length})
            </motion.button>
          ))}
        </motion.div>

        {/* TABLA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: embedded ? 0 : 0.2 }}
          className="bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden"
        >
          {loading ? (
            <div className="p-8 sm:p-12 text-center">
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-gt-gold border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-gray-400 text-sm sm:text-base">{t.loading}</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="p-8 sm:p-12 text-center text-gray-400 text-sm sm:text-base">
              {t.noApplications}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left p-3 sm:p-4 text-gray-400 font-semibold text-xs sm:text-sm">{t.name}</th>
                    <th className="text-left p-3 sm:p-4 text-gray-400 font-semibold text-xs sm:text-sm hidden md:table-cell">{t.email}</th>
                    <th className="text-left p-3 sm:p-4 text-gray-400 font-semibold text-xs sm:text-sm hidden lg:table-cell">{t.phone}</th>
                    <th className="text-left p-3 sm:p-4 text-gray-400 font-semibold text-xs sm:text-sm hidden sm:table-cell">{t.date}</th>
                    <th className="text-center p-3 sm:p-4 text-gray-400 font-semibold text-xs sm:text-sm">{t.status}</th>
                    <th className="text-center p-3 sm:p-4 text-gray-400 font-semibold text-xs sm:text-sm">{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-3 sm:p-4 text-white font-semibold text-sm sm:text-base">
                        {app.first_name} {app.last_name}
                      </td>
                      <td className="p-3 sm:p-4 text-gray-300 text-xs sm:text-sm hidden md:table-cell">{app.email}</td>
                      <td className="p-3 sm:p-4 text-gray-300 text-xs sm:text-sm hidden lg:table-cell">{app.phone}</td>
                      <td className="p-3 sm:p-4 text-gray-400 text-xs sm:text-sm hidden sm:table-cell">
                        {formatDate(app.created_at)}
                      </td>
                      <td className="p-3 sm:p-4 text-center">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 text-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedApp(app)}
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

        {/* MODAL DE DETALLES */}
        <AnimatePresence>
          {selectedApp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
              onClick={() => setSelectedApp(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gt-gray-dark rounded-2xl sm:rounded-3xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 lg:p-8"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-voga font-bold text-white mb-2">
                      {selectedApp.first_name} {selectedApp.last_name}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(selectedApp.status)}`}>
                      {selectedApp.status}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedApp(null)}
                    className="text-gray-400 hover:text-white text-2xl sm:text-3xl leading-none"
                  >
                    ×
                  </motion.button>
                </div>

                {/* Información Personal */}
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-voga font-bold text-gt-gold mb-4">{t.personalInfo}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 rounded-xl p-4 sm:p-6">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">{t.email}</p>
                      <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">{t.phone}</p>
                      <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">{t.date}</p>
                      <p className="text-white font-semibold text-sm sm:text-base">{formatDate(selectedApp.created_at)}</p>
                    </div>
                  </div>
                </div>

                {/* Dirección */}
                {(selectedApp.address || selectedApp.city) && (
                  <div className="mb-6">
                    <h3 className="text-lg sm:text-xl font-voga font-bold text-gt-gold mb-4">{t.addressInfo}</h3>
                    <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                      <p className="text-white text-sm sm:text-base">{selectedApp.address}</p>
                      <p className="text-gray-300 text-sm sm:text-base">{selectedApp.city} {selectedApp.postal_code}</p>
                      <p className="text-gray-300 text-sm sm:text-base">{selectedApp.country}</p>
                    </div>
                  </div>
                )}

                {/* Información Adicional */}
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-voga font-bold text-gt-gold mb-4">{t.additionalInfo}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 rounded-xl p-4 sm:p-6">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">{t.livesInMarbella}</p>
                      <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.lives_in_marbella}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">{t.numberOfCars}</p>
                      <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.number_of_cars}</p>
                    </div>
                    {selectedApp.car_owned && (
                      <div className="md:col-span-2">
                        <p className="text-gray-400 text-xs sm:text-sm">{t.carOwned}</p>
                        <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.car_owned}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">{t.howHeard}</p>
                      <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.how_did_you_hear}</p>
                    </div>
                  </div>
                </div>

                {/* Intención Coche */}
                {selectedApp.car_intention && selectedApp.car_intention !== 'none' && (
                  <div className="mb-6">
                    <h3 className="text-lg sm:text-xl font-voga font-bold text-gt-gold mb-4">
                      {t.carIntention}: {t[selectedApp.car_intention]}
                    </h3>

                    {/* VENDER */}
                    {selectedApp.car_intention === 'sell' && (
                      <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                        <h4 className="text-base sm:text-lg font-semibold text-white mb-4">{t.carForSale}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedApp.sell_car_brand && (
                            <div>
                              <p className="text-gray-400 text-xs sm:text-sm">{t.brand}</p>
                              <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.sell_car_brand}</p>
                            </div>
                          )}
                          {selectedApp.sell_car_model && (
                            <div>
                              <p className="text-gray-400 text-xs sm:text-sm">{t.model}</p>
                              <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.sell_car_model}</p>
                            </div>
                          )}
                          {selectedApp.sell_car_version && (
                            <div className="md:col-span-2">
                              <p className="text-gray-400 text-xs sm:text-sm">{t.version}</p>
                              <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.sell_car_version}</p>
                            </div>
                          )}
                          {selectedApp.sell_car_year && (
                            <div>
                              <p className="text-gray-400 text-xs sm:text-sm">{t.year}</p>
                              <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.sell_car_year}</p>
                            </div>
                          )}
                          {selectedApp.sell_car_km && (
                            <div>
                              <p className="text-gray-400 text-xs sm:text-sm">{t.km}</p>
                              <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.sell_car_km.toLocaleString()} km</p>
                            </div>
                          )}
                          {selectedApp.sell_car_fuel && (
                            <div>
                              <p className="text-gray-400 text-xs sm:text-sm">{t.fuel}</p>
                              <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.sell_car_fuel}</p>
                            </div>
                          )}
                          {selectedApp.sell_car_power_cv && (
                            <div>
                              <p className="text-gray-400 text-xs sm:text-sm">{t.power}</p>
                              <p className="text-white font-semibold text-sm sm:text-base">
                                {selectedApp.sell_car_power_cv} CV / {selectedApp.sell_car_power_kw} kW
                              </p>
                            </div>
                          )}
                          {selectedApp.sell_car_transmission && (
                            <div>
                              <p className="text-gray-400 text-xs sm:text-sm">{t.transmission}</p>
                              <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.sell_car_transmission}</p>
                            </div>
                          )}
                          {selectedApp.sell_car_doors && (
                            <div>
                              <p className="text-gray-400 text-xs sm:text-sm">{t.doors}</p>
                              <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.sell_car_doors}</p>
                            </div>
                          )}
                          {selectedApp.sell_car_color && (
                            <div>
                              <p className="text-gray-400 text-xs sm:text-sm">{t.color}</p>
                              <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.sell_car_color}</p>
                            </div>
                          )}
                          {selectedApp.sell_car_vin && (
                            <div>
                              <p className="text-gray-400 text-xs sm:text-sm">{t.vin}</p>
                              <p className="text-white font-semibold text-sm sm:text-base">{selectedApp.sell_car_vin}</p>
                            </div>
                          )}
                          {selectedApp.sell_car_price && (
                            <div className="md:col-span-2">
                              <p className="text-gray-400 text-xs sm:text-sm">{t.price}</p>
                              <p className="text-white font-semibold text-xl sm:text-2xl text-gt-gold">
                                €{selectedApp.sell_car_price.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {selectedApp.sell_car_notes && (
                            <div className="md:col-span-2">
                              <p className="text-gray-400 text-xs sm:text-sm">{t.notes}</p>
                              <p className="text-white text-sm sm:text-base">{selectedApp.sell_car_notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* COMPRAR */}
                    {selectedApp.car_intention === 'buy' && selectedApp.buy_car_description && (
                      <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                        <h4 className="text-base sm:text-lg font-semibold text-white mb-4">{t.carToBuy}</h4>
                        <p className="text-gray-300 whitespace-pre-wrap text-sm sm:text-base">{selectedApp.buy_car_description}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Notas adicionales */}
                {selectedApp.additional_info && (
                  <div className="mb-6">
                    <h3 className="text-lg sm:text-xl font-voga font-bold text-gt-gold mb-4">{t.notes}</h3>
                    <div className="bg-white/5 rounded-xl p-4 sm:p-6">
                      <p className="text-gray-300 text-sm sm:text-base">{selectedApp.additional_info}</p>
                    </div>
                  </div>
                )}

                {/* ACCIONES */}
                {selectedApp.status === 'pending' && (
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-6 border-t border-white/10">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleApprove(selectedApp.id, 'silver')}
                      disabled={processing}
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gray-500 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-600 transition-all disabled:opacity-50"
                    >
                      {t.approveSilver}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleApprove(selectedApp.id, 'gold')}
                      disabled={processing}
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gt-gold text-black rounded-xl font-semibold text-sm sm:text-base hover:bg-gt-gold-light transition-all disabled:opacity-50"
                    >
                      {t.approveGold}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleApprove(selectedApp.id, 'platinum')}
                      disabled={processing}
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-purple-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-purple-700 transition-all disabled:opacity-50"
                    >
                      {t.approvePlatinum}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleReject(selectedApp.id)}
                      disabled={processing}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-red-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                      {t.reject}
                    </motion.button>
                  </div>
                )}

                {/* Botón cerrar */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedApp(null)}
                  className="w-full mt-4 px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-white/10 transition-all"
                >
                  {t.close}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;