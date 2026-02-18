import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext'; // NUEVO
import './styles/index.css';
import './styles/fonts.css';

// He quitado seximente referencias a react-toastify, ya que ahora utilizamos un sistema de notificaciones personalizado a través del NotificationProvider. Esto nos permite tener un control más directo sobre cómo se muestran las notificaciones en nuestra aplicación, y nos da la flexibilidad de personalizarlas según nuestras necesidades específicas.:
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <NotificationProvider> {/* Con esto reemplazo el ToastContainer antiguo que tenía */}
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
// ❌ Elimino:
// - import ToastContainer from 'react-toastify'
// - import 'react-toastify/dist/ReactToastify.css'
// - <ToastContainer /> component
//
// ✅ Agrego:
// - import NotificationProvider
// - <NotificationProvider> wrapper
//
// ============================================