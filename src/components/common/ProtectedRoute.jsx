import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // 1. Obtener usuario actual de Supabase
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setUser(currentUser);

      // 2. Si requiere admin, verificar el rank
      if (requireAdmin) {
        const { data, error } = await supabase
          .from('profiles')
          .select('rank')
          .eq('id', currentUser.id)
          .single();

        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data?.rank === 'admin');
        }
      }
    } catch (error) {
      console.error('Error in checkUser:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mientras carga
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-gt-gold border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-white">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // No autenticado
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Requiere admin pero no lo es
  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">🚫</div>
          <h1 className="text-4xl font-voga font-bold text-white mb-4">Acceso Denegado</h1>
          <p className="text-gray-300 mb-8">No tienes permisos para acceder a esta página.</p>
          <a href="/" className="px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold hover:bg-gt-gold-light transition-all inline-block">
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;