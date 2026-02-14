import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// CONTEXT
// ============================================

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

// ============================================
// ICONOS SVG
// ============================================

const SuccessIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      initial={{ rotate: -90, scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    />
  </svg>
);

const WarningIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      initial={{ y: -5 }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
    />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      initial={{ scale: 0 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.3 }}
    />
  </svg>
);

// ============================================
// COMPONENTE: NOTIFICATION ITEM
// ============================================

const NotificationItem = ({ notification, onClose }) => {
  const icons = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    info: <InfoIcon />
  };

  const styles = {
    success: {
      bg: 'from-green-500/20 to-green-600/10',
      border: 'border-green-500/50',
      icon: 'text-green-400',
      text: 'text-green-100'
    },
    error: {
      bg: 'from-red-500/20 to-red-600/10',
      border: 'border-red-500/50',
      icon: 'text-red-400',
      text: 'text-red-100'
    },
    warning: {
      bg: 'from-yellow-500/20 to-yellow-600/10',
      border: 'border-yellow-500/50',
      icon: 'text-yellow-400',
      text: 'text-yellow-100'
    },
    info: {
      bg: 'from-blue-500/20 to-blue-600/10',
      border: 'border-blue-500/50',
      icon: 'text-blue-400',
      text: 'text-blue-100'
    }
  };

  const style = styles[notification.type] || styles.info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`flex items-start gap-3 bg-gradient-to-r ${style.bg} backdrop-blur-xl border ${style.border} rounded-2xl p-4 shadow-2xl max-w-md w-full`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 ${style.icon}`}>
        {icons[notification.type]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {notification.title && (
          <h4 className="text-white font-bold text-sm mb-1">
            {notification.title}
          </h4>
        )}
        <p className={`text-sm ${style.text}`}>
          {notification.message}
        </p>
      </div>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onClose(notification.id)}
        className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>

      {/* Progress Bar */}
      {notification.duration && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: notification.duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

// ============================================
// COMPONENTE: NOTIFICATION CONTAINER
// ============================================

const NotificationContainer = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <NotificationItem
              notification={notification}
              onClose={removeNotification}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// PROVIDER
// ============================================

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = ({ type = 'info', title, message, duration = 5000 }) => {
    const id = Date.now() + Math.random();
    const notification = { id, type, title, message, duration };

    setNotifications((prev) => [...prev, notification]);

    if (duration) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Shortcuts
  const success = (message, title) => addNotification({ type: 'success', title, message });
  const error = (message, title) => addNotification({ type: 'error', title, message });
  const warning = (message, title) => addNotification({ type: 'warning', title, message });
  const info = (message, title) => addNotification({ type: 'info', title, message });

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </NotificationContext.Provider>
  );
};