import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { supabase } from '../../../supabase/supabaseClient';
import { motion } from 'framer-motion';

const WrappingAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, []);

=======
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../supabase/supabaseClient';

const WrappingAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();

    // Suscripción en tiempo real
    const subscription = supabase
      .channel('wrapping-requests-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'service_requests' }, () => {
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

>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
<<<<<<< HEAD
        // Solo solicitudes de wrapping/ppf desde la página de wrapping
        .in('service_type', ['wrapping', 'ppf'])
        .eq('source', 'wrapping_page')
=======
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
<<<<<<< HEAD
      console.error('Error:', error);
=======
      console.error('Error fetching service requests:', error);
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
  const filterRequests = () => {
    if (filter === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(r => r.status === filter));
    }
  };

>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchRequests();
    } catch (error) {
<<<<<<< HEAD
      console.error('Error:', error);
    }
  };

  const deleteRequest = async (id) => {
    if (!confirm('¿Eliminar esta solicitud?')) return;
    
    try {
      const { error } = await supabase
        .from('service_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchRequests();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredRequests = requests.filter(r => 
    filter === 'all' ? true : r.status === filter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gt-gold border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-march font-bold text-white">
          Solicitudes Wrapping / PPF
        </h2>
        <div className="flex gap-2">
          {['all', 'pending', 'contacted', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                filter === status
                  ? 'bg-gt-gold text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {status === 'all' ? 'Todos' : 
               status === 'pending' ? 'Pendientes' : 
               status === 'contacted' ? 'Contactados' : 'Completadas'}
            </button>
          ))}
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-2xl font-bold text-white">{requests.length}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">Wrapping</p>
          <p className="text-2xl font-bold text-gt-gold">
            {requests.filter(r => r.service_type === 'wrapping').length}
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">PPF</p>
          <p className="text-2xl font-bold text-blue-400">
            {requests.filter(r => r.service_type === 'ppf').length}
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-400">
            {requests.filter(r => r.status === 'pending').length}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            <p className="text-gray-400 text-lg">No hay solicitudes</p>
            <p className="text-gray-500 text-sm mt-2">
              Las solicitudes aparecerán aquí cuando los clientes envíen el formulario
            </p>
          </div>
        ) : (
          filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-gt-gold/30 transition-all"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Info del cliente */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{request.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      request.service_type === 'wrapping' 
                        ? 'bg-gt-gold/20 text-gt-gold border border-gt-gold/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {request.service_type === 'wrapping' ? 'WRAPPING' : 'PPF'}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-gt-gold font-semibold">Email:</span>{' '}
                      <a href={`mailto:${request.email}`} className="hover:text-gt-gold transition-colors">
                        {request.email}
                      </a>
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gt-gold font-semibold">Teléfono:</span>{' '}
                      <a href={`tel:${request.phone}`} className="hover:text-gt-gold transition-colors">
                        {request.phone}
                      </a>
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gt-gold font-semibold">Idioma:</span>{' '}
                      {request.language === 'es' ? 'Español' : 'English'}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gt-gold font-semibold">Estado:</span>{' '}
                      <span className={`font-semibold ${
                        request.status === 'pending' ? 'text-yellow-400' :
                        request.status === 'contacted' ? 'text-blue-400' :
                        request.status === 'completed' ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {request.status === 'pending' ? 'Pendiente' :
                         request.status === 'contacted' ? 'Contactado' :
                         request.status === 'completed' ? 'Completado' : request.status}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Mensaje y acciones */}
                <div>
                  {request.message && (
                    <div className="mb-4 bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-gt-gold text-sm font-semibold mb-2">Mensaje:</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{request.message}</p>
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => updateStatus(request.id, 'contacted')}
                      className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all text-sm font-semibold"
                    >
                      Contactado
                    </button>
                    <button
                      onClick={() => updateStatus(request.id, 'completed')}
                      className="px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg hover:bg-green-500/30 transition-all text-sm font-semibold"
                    >
                      Completar
                    </button>
                    <button
                      onClick={() => deleteRequest(request.id)}
                      className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition-all text-sm font-semibold"
                    >
                      Eliminar
                    </button>
                  </div>

                  {/* Info adicional */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Creada: {new Date(request.created_at).toLocaleString('es-ES')}</p>
                    {request.updated_at && request.updated_at !== request.created_at && (
                      <p>Actualizada: {new Date(request.updated_at).toLocaleString('es-ES')}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
=======
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
          🎨 Wrapping & PPF
        </h1>
        <p className="text-gray-400">
          Gestiona las solicitudes de wrapping y protección PPF
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
                      <p>🎨 {request.service_type}</p>
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
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
    </div>
  );
};

export default WrappingAdmin;