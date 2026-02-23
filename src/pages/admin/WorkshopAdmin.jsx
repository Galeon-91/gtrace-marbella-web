import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import { motion } from 'framer-motion';

const WorkshopAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('workshop_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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
      console.error('Error:', error);
    }
  };

  const deleteRequest = async (id) => {
    if (!confirm('¿Eliminar esta solicitud?')) return;
    
    try {
      const { error } = await supabase
        .from('workshop_requests')
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
          Solicitudes Taller Premium
        </h2>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === status
                  ? 'bg-gt-gold text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {status === 'all' ? 'Todos' : status === 'pending' ? 'Pendientes' : status === 'approved' ? 'Aprobadas' : 'Completadas'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No hay solicitudes
          </div>
        ) : (
          filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">{request.name}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-gt-gold">Email:</span> {request.email}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gt-gold">Teléfono:</span> {request.phone}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gt-gold">Vehículo:</span> {request.car_brand} {request.car_model} ({request.car_year})
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gt-gold">Servicio:</span> {request.service_type}
                    </p>
                    {request.preferred_date && (
                      <p className="text-gray-400">
                        <span className="text-gt-gold">Fecha preferida:</span> {new Date(request.preferred_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <p className="text-gt-gold text-sm mb-2">Descripción:</p>
                    <p className="text-gray-300 text-sm">{request.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateStatus(request.id, 'approved')}
                      className="px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg hover:bg-green-500/30 transition-all text-sm"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => updateStatus(request.id, 'completed')}
                      className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all text-sm"
                    >
                      Completar
                    </button>
                    <button
                      onClick={() => deleteRequest(request.id)}
                      className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition-all text-sm"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    Creada: {new Date(request.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkshopAdmin;