import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async'; // ← AGREGADO
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';
import GarageHotel from './pages/GarageHotel';

// Loading de las páginas PÚBLICAS
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

// Vehículos Premium (Catálogo de venta)
const Vehicles = lazy(() => import('./pages/Vehicles'));
const VehicleDetail = lazy(() => import('./pages/VehicleDetail'));

// Página principal de servicios
const Services = lazy(() => import('./pages/Services'));

// Páginas de servicios específicos
const Detailing = lazy(() => import('./pages/services/Detailing'));
const Wrapping = lazy(() => import('./pages/services/Wrapping'));
const CarHotel = lazy(() => import('./pages/services/CarHotel'));
const Racing = lazy(() => import('./pages/services/Racing'));
const Workshop = lazy(() => import('./pages/services/Workshop')); // ← AGREGADO

// Páginas legales
const Privacy = lazy(() => import('./pages/Privacy')); // ← AGREGADO
const Terms = lazy(() => import('./pages/Terms')); // ← AGREGADO

// ⭐ ADMIN - SOLO Login y Dashboard
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));

function App() {
  const location = useLocation();
  
  // ⭐ Detectar si estamos en rutas admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <HelmetProvider> {/* ← AGREGADO - WRAPPER PRINCIPAL */}
      <div className="min-h-screen bg-gt-black text-white flex flex-col">
        {/* ⭐ Navbar SOLO en rutas públicas */}
        {!isAdminRoute && <Navbar />}
        
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* ========================================== */}
              {/* RUTAS PÚBLICAS                             */}
              {/* ========================================== */}
              <Route path="/" element={<Home />} />
              <Route path="/club" element={<Club />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/cars" element={<Vehicles />} />
              <Route path="/cars/:id" element={<VehicleDetail />} />
              <Route path="/car-request" element={<CarRequest />} />
              <Route path="/sell-car" element={<SellCar />} />
              
              {/* Vehículos Premium */}
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicles/:id" element={<VehicleDetail />} />
              
              {/* Servicios */}
              <Route path="/services" element={<Services />} />
              <Route path="/services/detailing" element={<Detailing />} />
              <Route path="/services/wrapping" element={<Wrapping />} />
              <Route path="/services/car-hotel" element={<CarHotel />} />
              <Route path="/services/racing" element={<Racing />} />
              <Route path="/services/workshop" element={<Workshop />} /> {/* ← AGREGADO */}
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/garage" element={<GarageHotel />} />
              
              {/* Eventos */}
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              
              {/* Páginas Legales - AGREGADAS */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* Otras */}
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/contact" element={<Contact />} />


              
              {/* ========================================== */}
              {/* RUTAS DE ADMIN - SOLO 2 RUTAS ⭐⭐⭐        */}
              {/* ========================================== */}
              
              {/* 1. Login - Sin protección */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* 2. Dashboard - Captura TODAS las rutas /admin/* */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* ========================================== */}
              {/* 404                                        */}
              {/* ========================================== */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </main>
        
        {/* ⭐ Footer, WhatsApp y ScrollToTop SOLO en rutas públicas */}
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <WhatsAppButton />}
        {!isAdminRoute && <ScrollToTop />}
      </div>
    </HelmetProvider>
  );
}

export default App;