import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabase/supabaseClient';
import { useLanguage } from '../../context/LanguageContext';

// Lazy load de componentes
const MembershipSection = lazy(() => import('./sections/MembershipSection'));
const EventsSection = lazy(() => import('./sections/EventsSection'));
const ContactsSection = lazy(() => import('./sections/ContactsSection'));
const RegistrationsAdmin = lazy(() => import('./sections/RegistrationsAdmin')); // ⭐ NUEVO

// ============================================
// SVG ICONOS PARA SIDEBAR
// ============================================

const MembershipIcon = ({ className }) => (
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

const EventsIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <motion.line
      x1="16" y1="2" x2="16" y2="6"
      animate={{ y2: [6, 7, 6] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.line
      x1="8" y1="2" x2="8" y2="6"
      animate={{ y2: [6, 7, 6] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// ⭐ NUEVO: Icono para Inscripciones
const RegistrationsIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path
      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
      animate={{ pathLength: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <motion.path
      d="M9 12h6"
      animate={{ pathLength: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
    />
    <motion.path
      d="M9 16h6"
      animate={{ pathLength: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
    />
  </svg>
);

const ContactsIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="12" cy="11" r="1"
      animate={{ r: [1, 1.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="8" cy="11" r="1"
      animate={{ r: [1, 1.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
    />
    <motion.circle
      cx="16" cy="11" r="1"
      animate={{ r: [1, 1.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
    />
  </svg>
);

const CarsIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path
      d="M5 17h-2v-3l1.5-4.5h15L21 13v4h-2"
      animate={{ pathLength: [0.9, 1, 0.9] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="7" cy="17" r="2"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
    <motion.circle
      cx="17" cy="17" r="2"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

const DashboardIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const LogoutIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// ============================================
// TRADUCCIONES
// ============================================

const translations = {
  es: {
    title: "Panel de Administración",
    subtitle: "Gestiona tu club exclusivo",
    tabs: {
      dashboard: "Dashboard",
      memberships: "Membresías",
      events: "Eventos",
      registrations: "Inscripciones", // ⭐ NUEVO
      contacts: "Contactos",
      cars: "Vehículos",
      settings: "Configuración"
    },
    logout: "Cerrar Sesión",
    welcome: "Bienvenido de nuevo",
    loading: "Cargando..."
  },
  en: {
    title: "Admin Panel",
    subtitle: "Manage your exclusive club",
    tabs: {
      dashboard: "Dashboard",
      memberships: "Memberships",
      events: "Events",
      registrations: "Registrations", // ⭐ NUEVO
      contacts: "Contacts",
      cars: "Vehicles",
      settings: "Settings"
    },
    logout: "Logout",
    welcome: "Welcome back",
    loading: "Loading..."
  }
};

// ============================================
// LOADING COMPONENT
// ============================================

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <motion.div
        className="w-16 h-16 border-4 border-gt-gold border-t-transparent rounded-full mx-auto mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-gray-400">Cargando...</p>
    </div>
  </div>
);

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const AdminDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = translations[language] || translations.es;

  const [activeTab, setActiveTab] = useState('memberships');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminName, setAdminName] = useState('Admin');

  // Cargar info del admin
  useState(() => {
    const loadAdminInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        if (data?.full_name) {
          setAdminName(data.full_name);
        }
      }
    };
    loadAdminInfo();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: t.tabs.dashboard, Icon: DashboardIcon, badge: null },
    { id: 'memberships', label: t.tabs.memberships, Icon: MembershipIcon, badge: '2' },
    { id: 'events', label: t.tabs.events, Icon: EventsIcon, badge: null },
    { id: 'registrations', label: t.tabs.registrations, Icon: RegistrationsIcon, badge: null }, // ⭐ NUEVO
    { id: 'contacts', label: t.tabs.contacts, Icon: ContactsIcon, badge: null },
    { id: 'cars', label: t.tabs.cars, Icon: CarsIcon, badge: null },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
      {/* Fondo animado */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gt-gold/5 via-black to-gt-gold/5" />
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gt-gold/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -20,
            }}
            animate={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 20,
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="relative z-10 bg-gt-gray-dark/80 backdrop-blur-xl border-r border-white/10 flex flex-col"
      >
        {/* Logo y Toggle */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-gt-gold to-yellow-600 rounded-xl flex items-center justify-center font-voga font-bold text-black">
                    GT
                  </div>
                  <div>
                    <h2 className="font-voga font-bold text-lg text-white">GT Race</h2>
                    <p className="text-xs text-gray-400">Marbella</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Admin Info */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gt-gold/20 rounded-full flex items-center justify-center text-gt-gold font-bold">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-sm font-semibold text-white">{adminName}</p>
                  <p className="text-xs text-gray-400">Administrador</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    isActive
                      ? 'bg-gt-gold text-black shadow-lg shadow-gt-gold/30'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-black' : ''}`} />
                  <AnimatePresence mode="wait">
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-semibold text-sm whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {item.badge && sidebarOpen && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogoutIcon className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-semibold text-sm"
                >
                  {t.logout}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-voga font-bold mb-2 bg-gradient-to-r from-gt-gold to-yellow-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-gray-400">{t.subtitle}</p>
          </motion.div>

          {/* Content Area */}
          <Suspense fallback={<LoadingScreen />}>
            <AnimatePresence mode="wait">
              {activeTab === 'memberships' && (
                <motion.div
                  key="memberships"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MembershipSection />
                </motion.div>
              )}
              
              {activeTab === 'events' && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <EventsSection />
                </motion.div>
              )}

              {/* ⭐ NUEVO: Sección de Inscripciones */}
              {activeTab === 'registrations' && (
                <motion.div
                  key="registrations"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RegistrationsAdmin />
                </motion.div>
              )}
              
              {activeTab === 'contacts' && (
                <motion.div
                  key="contacts"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContactsSection />
                </motion.div>
              )}

              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {/* Stats Cards */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-400 text-sm">Membresías Activas</h3>
                      <MembershipIcon className="w-5 h-5 text-gt-gold" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">24</p>
                    <p className="text-xs text-green-400">↑ 12% este mes</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-400 text-sm">Eventos Próximos</h3>
                      <EventsIcon className="w-5 h-5 text-gt-gold" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">3</p>
                    <p className="text-xs text-blue-400">2 este mes</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-400 text-sm">Mensajes Nuevos</h3>
                      <ContactsIcon className="w-5 h-5 text-gt-gold" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">7</p>
                    <p className="text-xs text-yellow-400">Pendientes</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'cars' && (
                <motion.div
                  key="cars"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-20"
                >
                  <CarsIcon className="w-20 h-20 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Gestión de Vehículos</h3>
                  <p className="text-gray-500">Próximamente...</p>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-20"
                >
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Configuración</h3>
                  <p className="text-gray-500">Próximamente...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;