import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext'; // ⭐ NUEVO
import './styles/index.css';
import './styles/fonts.css';

// ⭐ YA NO NECESITAS:
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <NotificationProvider> {/* ⭐ NUEVO - Reemplaza ToastContainer */}
          <App />
        </NotificationProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// ============================================
// CAMBIOS REALIZADOS:
// ============================================
//
// ❌ ELIMINADO:
// - import ToastContainer from 'react-toastify'
// - import 'react-toastify/dist/ReactToastify.css'
// - <ToastContainer /> component
//
// ✅ AGREGADO:
// - import NotificationProvider
// - <NotificationProvider> wrapper
//
// ============================================