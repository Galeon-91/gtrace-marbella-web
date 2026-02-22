import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../../../supabase/supabaseClient';

// ============================================
// SVG ICONOS
// ============================================

const MembershipIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const EventsIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ContactsIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="11" r="1" />
    <circle cx="8" cy="11" r="1" />
    <circle cx="16" cy="11" r="1" />
  </svg>
);

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const DashboardStats = () => {
  const [stats, setStats] = useState({
    memberships: { total: 0, growth: 0 },
    events: { upcoming: 0, thisMonth: 0 },
    messages: { total: 0, breakdown: {} }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    
    // ⭐ Suscripciones en tiempo real
    const membershipsSubscription = supabase
      .channel('memberships-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'memberships' }, () => {
        fetchStats();
      })
      .subscribe();

    const eventsSubscription = supabase
      .channel('events-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => {
        fetchStats();
      })
      .subscribe();

    const contactsSubscription = supabase
      .channel('contacts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, () => {
        fetchStats();
      })
      .subscribe();

    return () => {
      membershipsSubscription.unsubscribe();
      eventsSubscription.unsubscribe();
      contactsSubscription.unsubscribe();
    };
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // ⭐ 1. MEMBRESÍAS ACTIVAS
      const { data: memberships, error: membershipsError } = await supabase
        .from('memberships')
        .select('id, status, created_at')
        .eq('status', 'approved');

      if (membershipsError) throw membershipsError;

      // Calcular crecimiento del mes
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const membershipsThisMonth = memberships?.filter(m => 
        new Date(m.created_at) >= startOfMonth
      ).length || 0;

      const membershipsTotal = memberships?.length || 0;
      const growth = membershipsTotal > 0 
        ? Math.round((membershipsThisMonth / membershipsTotal) * 100) 
        : 0;

      // ⭐ 2. EVENTOS PRÓXIMOS
      const { data: upcomingEvents, error: eventsError } = await supabase
        .from('events')
        .select('id, start_date, status')
        .eq('status', 'upcoming')
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true });

      if (eventsError) throw eventsError;

      const eventsThisMonth = upcomingEvents?.filter(e => {
        const eventDate = new Date(e.start_date);
        return eventDate.getMonth() === now.getMonth() && 
               eventDate.getFullYear() === now.getFullYear();
      }).length || 0;

      // ⭐ 3. MENSAJES PENDIENTES
      
      // Membresías pendientes
      const { data: pendingMemberships } = await supabase
        .from('memberships')
        .select('id')
        .eq('status', 'pending');

      // Inscripciones a eventos pendientes
      const { data: pendingRegistrations } = await supabase
        .from('event_registrations')
        .select('id')
        .eq('status', 'pending');

      // Contactos no leídos
      const { data: unreadContacts } = await supabase
        .from('contacts')
        .select('id')
        .eq('read', false);

      // Solicitudes de taller pendientes
      const { data: pendingWorkshop } = await supabase
        .from('workshop_requests')
        .select('id')
        .eq('status', 'pending');

      // Solicitudes de servicios pendientes
      const { data: pendingServices } = await supabase
        .from('service_requests')
        .select('id')
        .eq('status', 'pending');

      const messagesBreakdown = {
        memberships: pendingMemberships?.length || 0,
        events: pendingRegistrations?.length || 0,
        contacts: unreadContacts?.length || 0,
        workshop: pendingWorkshop?.length || 0,
        wrapping: pendingServices?.length || 0
      };

      const totalMessages = Object.values(messagesBreakdown).reduce((sum, val) => sum + val, 0);

      setStats({
        memberships: {
          total: membershipsTotal,
          growth: growth
        },
        events: {
          upcoming: upcomingEvents?.length || 0,
          thisMonth: eventsThisMonth
        },
        messages: {
          total: totalMessages,
          breakdown: messagesBreakdown
        }
      });

    } catch (error) {
      console.error('Error fetching stats:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 animate-pulse">
            <div className="h-6 bg-white/10 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-white/10 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* ⭐ CARD 1: Membresías Activas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-gt-gold/30 transition-all group"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-semibold">Membresías Activas</h3>
          <MembershipIcon className="w-5 h-5 text-gt-gold group-hover:scale-110 transition-transform" />
        </div>
        
        <div className="space-y-2">
          <motion.p 
            className="text-4xl font-bold text-white"
            key={stats.memberships.total}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {stats.memberships.total}
          </motion.p>
          
          <p className="text-sm text-green-400 flex items-center gap-1">
            <span>↑</span>
            <span>{stats.memberships.growth}% este mes</span>
          </p>
        </div>
      </motion.div>

      {/* ⭐ CARD 2: Eventos Próximos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-gt-gold/30 transition-all group"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-semibold">Eventos Próximos</h3>
          <EventsIcon className="w-5 h-5 text-gt-gold group-hover:scale-110 transition-transform" />
        </div>
        
        <div className="space-y-2">
          <motion.p 
            className="text-4xl font-bold text-white"
            key={stats.events.upcoming}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {stats.events.upcoming}
          </motion.p>
          
          <p className="text-sm text-blue-400">
            {stats.events.thisMonth} este mes
          </p>
        </div>
      </motion.div>

      {/* ⭐ CARD 3: Mensajes Nuevos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-gt-gold/30 transition-all group"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-semibold">Mensajes Nuevos</h3>
          <ContactsIcon className="w-5 h-5 text-gt-gold group-hover:scale-110 transition-transform" />
        </div>
        
        <div className="space-y-3">
          <motion.p 
            className="text-4xl font-bold text-white"
            key={stats.messages.total}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {stats.messages.total}
          </motion.p>
          
          {/* Desglose de mensajes */}
          <div className="space-y-1 text-xs">
            {stats.messages.breakdown.memberships > 0 && (
              <p className="text-yellow-400">
                • {stats.messages.breakdown.memberships} membresías
              </p>
            )}
            {stats.messages.breakdown.events > 0 && (
              <p className="text-blue-400">
                • {stats.messages.breakdown.events} inscripciones
              </p>
            )}
            {stats.messages.breakdown.contacts > 0 && (
              <p className="text-green-400">
                • {stats.messages.breakdown.contacts} contactos
              </p>
            )}
            {stats.messages.breakdown.workshop > 0 && (
              <p className="text-purple-400">
                • {stats.messages.breakdown.workshop} taller
              </p>
            )}
            {stats.messages.breakdown.wrapping > 0 && (
              <p className="text-pink-400">
                • {stats.messages.breakdown.wrapping} wrapping
              </p>
            )}
            
            {stats.messages.total === 0 && (
              <p className="text-gray-500">Todo al día ✓</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardStats;