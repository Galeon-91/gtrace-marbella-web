import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';

// Loading de las páginas
const Home = lazy(() => import('./pages/Home'));
const Club = lazy(() => import('./pages/Club'));
const Membership = lazy(() => import('./pages/Membership'));
const Cars = lazy(() => import('./pages/Cars'));
const CarDetail = lazy(() => import('./pages/CarDetail'));
const CarRequest = lazy(() => import('./pages/CarRequest'));
const SellCar = lazy(() => import('./pages/SellCar'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const Sponsors = lazy(() => import('./pages/Sponsors'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Página principal de servicios
const Services = lazy(() => import('./pages/Services'));

// Páginas de servicios específicos
const Detailing = lazy(() => import('./pages/services/Detailing'));
const Wrapping = lazy(() => import('./pages/services/Wrapping'));
const CarHotel = lazy(() => import('./pages/services/CarHotel'));
const Racing = lazy(() => import('./pages/services/Racing'));

// Páginas de admin - SOLO Login y Dashboard unificado
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));

// ⭐ YA NO IMPORTAMOS: CarsAdmin, EventsAdmin, MembershipAdmin, ContactAdmin
// Esos componentes ahora se importan DENTRO del Dashboard como sections

function App() {
  return (
    <div className="min-h-screen bg-gt-black text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* ========================================== */}
            {/* RUTAS PÚBLICAS                             */}
            {/* ========================================== */}
            <Route path="/" element={<Home />} />
            <Route path="/club" element={<Club />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/car-request" element={<CarRequest />} />
            <Route path="/sell-car" element={<SellCar />} />
            
            {/* Servicios */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/detailing" element={<Detailing />} />
            <Route path="/services/wrapping" element={<Wrapping />} />
            <Route path="/services/car-hotel" element={<CarHotel />} />
            <Route path="/services/racing" element={<Racing />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            
            {/* Eventos */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            
            {/* Otras */}
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* ========================================== */}
            {/* RUTAS DE ADMIN                             */}
            {/* ========================================== */}
            
            {/* Login - Sin protección */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Dashboard Unificado - UNA SOLA RUTA ⭐ */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* 
              ⭐ IMPORTANTE: Ya NO necesitas estas rutas:
              
              ❌ /admin/cars
              ❌ /admin/events  
              ❌ /admin/membership
              ❌ /admin/contacts
              
              Ahora TODO se maneja dentro del Dashboard con sidebar/tabs.
              La ruta /admin/* captura cualquier subruta y siempre muestra el Dashboard.
              
              El usuario navega entre secciones clickeando los tabs del sidebar,
              NO cambiando la URL.
            */}
            
            {/* ========================================== */}
            {/* 404                                        */}
            {/* ========================================== */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </main>
      
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}

export default App;