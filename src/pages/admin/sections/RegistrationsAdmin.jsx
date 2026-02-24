import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../../supabase/supabaseClient';

// ============================================
// COMPONENTE: REGISTRATIONS ADMIN
// ============================================

const RegistrationsAdmin = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchRegistrations();
    fetchEvents();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select(`
          *,
          events (
            id,
            title,
            start_date,
            category,
            price
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      alert('Error al cargar inscripciones');
    }
    setLoading(false);
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, start_date')
        .eq('published', true)
        .order('start_date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const updateRegistrationStatus = async (regId, newStatus) => {
    try {
      const { error } = await supabase
        .from('event_registrations')
        .update({ status: newStatus })
        .eq('id', regId);

      if (error) throw error;
      
      alert('Estado actualizado exitosamente');
      fetchRegistrations();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error al actualizar estado');
    }
  };

  const updatePaymentStatus = async (regId, newStatus) => {
    try {
      const { error } = await supabase
        .from('event_registrations')
        .update({ payment_status: newStatus })
        .eq('id', regId);

      if (error) throw error;
      
      alert('Estado de pago actualizado');
      fetchRegistrations();
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Error al actualizar pago');
    }
  };

  const deleteRegistration = async (regId) => {
    if (!confirm('¿Estás seguro de eliminar esta inscripción?')) return;
    
    try {
      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('id', regId);

      if (error) throw error;
      
      alert('Inscripción eliminada');
      fetchRegistrations();
      setShowDetailModal(false);
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Error al eliminar');
    }
  };

  const exportToCSV = () => {
    const headers = ['Nombre', 'Email', 'Teléfono', 'Evento', 'Estado', 'Pago', 'Fecha'];
    const csvData = filteredRegistrations.map(reg => [
      reg.full_name,
      reg.email,
      reg.phone,
      reg.events?.title || 'N/A',
      reg.status,
      reg.payment_status,
      new Date(reg.created_at).toLocaleDateString()
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inscripciones_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Filtros
  const filteredRegistrations = registrations.filter(reg => {
    const matchesStatus = filter === 'all' || reg.status === filter;
    const matchesEvent = eventFilter === 'all' || reg.event_id === eventFilter;
    const matchesSearch = 
      reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm);
    
    return matchesStatus && matchesEvent && matchesSearch;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
      attended: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getPaymentColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      completed: 'bg-green-500/20 text-green-400',
      failed: 'bg-red-500/20 text-red-400',
      refunded: 'bg-orange-500/20 text-orange-400'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'pending').length,
    confirmed: registrations.filter(r => r.status === 'confirmed').length,
    cancelled: registrations.filter(r => r.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-march font-bold mb-2 bg-gradient-to-r from-gt-gold to-yellow-500 bg-clip-text text-transparent">
            Gestión de Inscripciones
          </h1>
          <p className="text-gray-400">Administra todas las inscripciones a eventos</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <p className="text-gray-400 text-sm mb-1">Total</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 backdrop-blur-xl rounded-2xl border border-yellow-500/20 p-6"
          >
            <p className="text-yellow-400 text-sm mb-1">Pendientes</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-xl rounded-2xl border border-green-500/20 p-6"
          >
            <p className="text-green-400 text-sm mb-1">Confirmadas</p>
            <p className="text-3xl font-bold text-green-400">{stats.confirmed}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-red-500/10 to-red-500/5 backdrop-blur-xl rounded-2xl border border-red-500/20 p-6"
          >
            <p className="text-red-400 text-sm mb-1">Canceladas</p>
            <p className="text-3xl font-bold text-red-400">{stats.cancelled}</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Buscar</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nombre, email o teléfono..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gt-gold"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Estado</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gt-gold"
              >
                <option value="all">Todos</option>
                <option value="pending">Pendientes</option>
                <option value="confirmed">Confirmadas</option>
                <option value="cancelled">Canceladas</option>
                <option value="attended">Asistieron</option>
              </select>
            </div>

            {/* Event Filter */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Evento</label>
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gt-gold"
              >
                <option value="all">Todos los eventos</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>{event.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportToCSV}
              className="px-6 py-2 bg-gt-gold text-black rounded-xl font-semibold hover:bg-gt-gold-light transition-all"
            >
              📥 Exportar CSV
            </motion.button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <motion.div
                className="w-12 h-12 border-4 border-gt-gold border-t-transparent rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-gray-400 mt-4">Cargando inscripciones...</p>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-2xl mb-2">📋</p>
              <p className="text-gray-400">No hay inscripciones</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Evento</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Fecha</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Pago</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredRegistrations.map((reg) => (
                    <motion.tr
                      key={reg.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white">{reg.full_name}</p>
                          <p className="text-sm text-gray-400">{reg.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white">{reg.events?.title || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300 text-sm">
                          {new Date(reg.created_at).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(reg.status)}`}>
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentColor(reg.payment_status)}`}>
                          {reg.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedRegistration(reg);
                            setShowDetailModal(true);
                          }}
                          className="px-4 py-2 bg-gt-gold/20 text-gt-gold rounded-lg hover:bg-gt-gold/30 transition-all text-sm font-semibold"
                        >
                          Ver
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {showDetailModal && selectedRegistration && (
            <DetailModal
              registration={selectedRegistration}
              onClose={() => setShowDetailModal(false)}
              onUpdateStatus={updateRegistrationStatus}
              onUpdatePayment={updatePaymentStatus}
              onDelete={deleteRegistration}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ============================================
// COMPONENTE: DETAIL MODAL
// ============================================

const DetailModal = ({ registration, onClose, onUpdateStatus, onUpdatePayment, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gt-gray-dark to-black rounded-3xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-march font-bold text-white mb-2">Detalle de Inscripción</h2>
            <p className="text-gray-400">ID: {registration.id.slice(0, 8)}...</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-all"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          
          {/* Evento */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Evento</p>
            <p className="text-white font-semibold text-lg">{registration.events?.title}</p>
            <p className="text-gray-300 text-sm mt-1">
              {new Date(registration.events?.start_date).toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>

          {/* Datos del Usuario */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Nombre Completo</p>
              <p className="text-white font-medium">{registration.full_name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <p className="text-white font-medium">{registration.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Teléfono</p>
              <p className="text-white font-medium">{registration.phone}</p>
            </div>
            {registration.company && (
              <div>
                <p className="text-gray-400 text-sm mb-1">Empresa</p>
                <p className="text-white font-medium">{registration.company}</p>
              </div>
            )}
          </div>

          {/* Notas */}
          {registration.notes && (
            <div>
              <p className="text-gray-400 text-sm mb-1">Notas</p>
              <p className="text-white bg-white/5 p-4 rounded-xl">{registration.notes}</p>
            </div>
          )}

          {/* Plazas */}
          <div>
            <p className="text-gray-400 text-sm mb-1">Plazas Reservadas</p>
            <p className="text-white font-semibold text-2xl">{registration.spots_reserved}</p>
          </div>

          {/* Estado */}
          <div>
            <p className="text-gray-400 text-sm mb-2">Estado de Inscripción</p>
            <div className="flex gap-2">
              {['pending', 'confirmed', 'cancelled', 'attended'].map(status => (
                <button
                  key={status}
                  onClick={() => onUpdateStatus(registration.id, status)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    registration.status === status
                      ? 'bg-gt-gold text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Pago */}
          <div>
            <p className="text-gray-400 text-sm mb-2">Estado de Pago</p>
            <div className="flex gap-2 mb-3">
              {['pending', 'completed', 'failed', 'refunded'].map(status => (
                <button
                  key={status}
                  onClick={() => onUpdatePayment(registration.id, status)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    registration.payment_status === status
                      ? 'bg-gt-gold text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            {registration.payment_amount && (
              <p className="text-gt-gold font-bold text-xl">{registration.payment_amount}€</p>
            )}
          </div>

          {/* Fecha de Inscripción */}
          <div>
            <p className="text-gray-400 text-sm mb-1">Fecha de Inscripción</p>
            <p className="text-white">
              {new Date(registration.created_at).toLocaleString('es-ES')}
            </p>
          </div>

          {/* Delete Button */}
          <div className="pt-6 border-t border-white/10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDelete(registration.id)}
              className="w-full py-3 bg-red-500/20 text-red-400 rounded-xl font-semibold hover:bg-red-500/30 transition-all"
            >
              🗑️ Eliminar Inscripción
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationsAdmin;