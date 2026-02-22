import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../supabase/supabaseClient';

const WorkshopAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();

    // Suscripción en tiempo real
    const subscription = supabase
      .channel('workshop-requests-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'workshop_requests' }, () => {
        fetchRequests();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    filterRequests();
  }, [filter, requests]);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('workshop_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching workshop requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    if (filter === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(r => r.status === filter));
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('workshop_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchRequests();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
      contacted: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      scheduled: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
      completed: 'bg-green-500/20 text-green-500 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-500 border-red-500/30'
    };

    const labels = {
      pending: 'Pendiente',
      contacted: 'Contactado',
      scheduled: 'Agendado',
      completed: 'Completado',
      cancelled: 'Cancelado'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-march font-bold text-white mb-2">
          🔧 Taller Premium
        </h1>
        <p className="text-gray-400">
          Gestiona las solicitudes de servicio de taller
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('pending')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            filter === 'pending'
              ? 'bg-gt-gold text-black'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          🕐 Pendientes ({requests.filter(r => r.status === 'pending').length})
        </button>

        <button
          onClick={() => setFilter('contacted')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            filter === 'contacted'
              ? 'bg-gt-gold text-black'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          📞 Contactadas ({requests.filter(r => r.status === 'contacted').length})
        </button>

        <button
          onClick={() => setFilter('scheduled')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            filter === 'scheduled'
              ? 'bg-gt-gold text-black'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          📅 Agendadas ({requests.filter(r => r.status === 'scheduled').length})
        </button>

        <button
          onClick={() => setFilter('completed')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            filter === 'completed'
              ? 'bg-gt-gold text-black'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          ✅ Completadas ({requests.filter(r => r.status === 'completed').length})
        </button>

        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
            filter === 'all'
              ? 'bg-gt-gold text-black'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          📋 Todas ({requests.length})
        </button>
      </div>

      {/* Lista de solicitudes */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gt-gold"></div>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/10 text-center">
          <p className="text-gray-400 text-lg">No hay solicitudes</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10
                         hover:border-gt-gold/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-white">
                        {request.name}
                      </h3>
                      {getStatusBadge(request.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
                      <p>📧 {request.email}</p>
                      <p>📱 {request.phone}</p>
                      <p>🛠️ {request.service}</p>
                      {request.vehicle_brand && (
                        <p>🚗 {request.vehicle_brand} {request.vehicle_model}</p>
                      )}
                    </div>

                    {request.message && (
                      <div className="mt-3 p-3 bg-white/5 rounded-xl">
                        <p className="text-sm text-gray-300">{request.message}</p>
                      </div>
                    )}

                    <p className="text-xs text-gray-500 mt-3">
                      📅 {new Date(request.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-wrap gap-2">
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(request.id, 'contacted')}
                          className="px-4 py-2 bg-blue-500/20 text-blue-500 rounded-xl
                                   hover:bg-blue-500/30 transition-all font-semibold text-sm"
                        >
                          📞 Contactar
                        </button>
                        <button
                          onClick={() => updateStatus(request.id, 'scheduled')}
                          className="px-4 py-2 bg-purple-500/20 text-purple-500 rounded-xl
                                   hover:bg-purple-500/30 transition-all font-semibold text-sm"
                        >
                          📅 Agendar
                        </button>
                      </>
                    )}
                    
                    {request.status === 'scheduled' && (
                      <button
                        onClick={() => updateStatus(request.id, 'completed')}
                        className="px-4 py-2 bg-green-500/20 text-green-500 rounded-xl
                                 hover:bg-green-500/30 transition-all font-semibold text-sm"
                      >
                        ✅ Completar
                      </button>
                    )}
                    
                    {request.status !== 'cancelled' && request.status !== 'completed' && (
                      <button
                        onClick={() => updateStatus(request.id, 'cancelled')}
                        className="px-4 py-2 bg-red-500/20 text-red-500 rounded-xl
                                 hover:bg-red-500/30 transition-all font-semibold text-sm"
                      >
                        ❌ Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default WorkshopAdmin;