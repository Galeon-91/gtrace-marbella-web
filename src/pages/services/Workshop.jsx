import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../../supabase/supabaseClient';

// ============================================
// FUNCIÓN PARA OBTENER URL DE SUPABASE
// ============================================

const getSupabaseUrl = (path) => {
  const { data } = supabase.storage.from('site-assets').getPublicUrl(path);
  return data.publicUrl;
};

// ============================================
// ICONOS SVG ANIMADOS
// ============================================

const WrenchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    {/* Glow effect */}
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      fill="currentColor"
      opacity="0.1"
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Outer ring */}
    <motion.circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="0.5"
      fill="none"
      opacity="0.3"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
    />
    
    {/* Wrench body */}
    <motion.path
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      opacity="0.3"
      animate={{ 
        rotate: [0, -15, 0, 15, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "center" }}
    />
    
    {/* Tech lines */}
    {[0, 1, 2, 3].map((i) => (
      <motion.line
        key={i}
        x1="12"
        y1="12"
        x2={12 + Math.cos(i * Math.PI / 2) * 7}
        y2={12 + Math.sin(i * Math.PI / 2) * 7}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        animate={{ 
          opacity: [0.2, 0.6, 0.2],
          pathLength: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          delay: i * 0.2
        }}
      />
    ))}
  </svg>
);

// ============================================
// 2. DIAGNÓSTICO ELECTRÓNICO - Circuito Digital
// ============================================

const DiagnosticIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    {/* Pulse background */}
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      fill="currentColor"
      opacity="0.05"
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.05, 0.15, 0.05]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Circuit board pattern */}
    <motion.g
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <path d="M8 4v4h4V4M8 16v4h4v-4M16 8h4v4h-4M4 8h4v4H4" 
            stroke="currentColor" 
            strokeWidth="1" 
            opacity="0.3" />
    </motion.g>
    
    {/* Shield outline */}
    <motion.path
      d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      opacity="0.2"
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: [0.2, 0.3, 0.2]
      }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ transformOrigin: "center" }}
    />
    
    {/* Checkmark animation */}
    <motion.path
      d="M9 12l2 2 4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: [0, 1, 1, 0],
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity,
        times: [0, 0.3, 0.7, 1]
      }}
    />
    
    {/* Scanning lines */}
    {[0, 1, 2].map((i) => (
      <motion.line
        key={i}
        x1="6"
        y1={8 + i * 4}
        x2="18"
        y2={8 + i * 4}
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
        animate={{ 
          x1: [6, 18],
          x2: [6, 18],
          opacity: [0, 0.5, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          delay: i * 0.3
        }}
      />
    ))}
  </svg>
);

// ============================================
// 3. MOTOR Y TRANSMISIÓN - Engranajes Dinámicos
// ============================================

const EngineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    {/* Energy pulse */}
    <motion.circle
      cx="12"
      cy="12"
      r="11"
      stroke="currentColor"
      strokeWidth="0.5"
      fill="none"
      opacity="0.2"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.2, 0, 0.2]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Main gear */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
    >
      <circle 
        cx="12" 
        cy="12" 
        r="5" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="currentColor" 
        opacity="0.2" 
      />
      
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.rect
          key={i}
          x="11"
          y="5.5"
          width="2"
          height="2"
          fill="currentColor"
          style={{
            transformOrigin: "12px 12px",
            transform: `rotate(${angle}deg)`
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ 
            duration: 1, 
            repeat: Infinity,
            delay: i * 0.125
          }}
        />
      ))}
      
      {/* Inner circle */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.5" />
    </motion.g>
    
    {/* Orbit particles */}
    {[0, 120, 240].map((angle, i) => (
      <motion.circle
        key={i}
        cx="12"
        cy="12"
        r="1.5"
        fill="currentColor"
        animate={{
          x: Math.cos((angle * Math.PI) / 180) * 8,
          y: Math.sin((angle * Math.PI) / 180) * 8,
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}
  </svg>
);

// ============================================
// 4. SISTEMA DE FRENOS - Disco Rotativo
// ============================================

const BrakeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    {/* Heat effect */}
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      fill="currentColor"
      opacity="0.05"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.05, 0.15, 0.05]
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    
    {/* Outer disc */}
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="1" 
      fill="currentColor" 
      opacity="0.1" 
    />
    
    {/* Rotating disc */}
    <motion.g
      animate={{ rotate: -360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
    >
      {/* Disc holes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.circle
          key={i}
          cx={12 + Math.cos((angle * Math.PI) / 180) * 6}
          cy={12 + Math.sin((angle * Math.PI) / 180) * 6}
          r="1.5"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
      
      {/* Disc vents */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.line
          key={i}
          x1={12 + Math.cos((angle * Math.PI) / 180) * 4}
          y1={12 + Math.sin((angle * Math.PI) / 180) * 4}
          x2={12 + Math.cos((angle * Math.PI) / 180) * 8}
          y2={12 + Math.sin((angle * Math.PI) / 180) * 8}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      ))}
    </motion.g>
    
    {/* Center hub */}
    <motion.circle 
      cx="12" 
      cy="12" 
      r="3" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      fill="currentColor"
      opacity="0.3"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Brake caliper indicator */}
    <motion.rect
      x="16"
      y="10"
      width="3"
      height="4"
      rx="0.5"
      fill="currentColor"
      opacity="0.6"
      animate={{ 
        x: [16, 15, 16],
        opacity: [0.6, 1, 0.6]
      }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </svg>
);

// ============================================
// 5. NEUMÁTICOS Y SUSPENSIÓN - Rueda Dinámica
// ============================================

const TireIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    {/* Bounce effect */}
    <motion.circle
      cx="12"
      cy="12"
      r="11"
      fill="currentColor"
      opacity="0.05"
      animate={{ 
        scale: [1, 0.95, 1],
        y: [0, 2, 0]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Tire rotating */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
    >
      {/* Outer tire */}
      <circle 
        cx="12" 
        cy="12" 
        r="9" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="currentColor" 
        opacity="0.1" 
      />
      
      {/* Tire treads */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <motion.rect
          key={i}
          x="11.5"
          y="2.5"
          width="1"
          height="2"
          fill="currentColor"
          opacity="0.5"
          style={{
            transformOrigin: "12px 12px",
            transform: `rotate(${angle}deg)`
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ 
            duration: 0.5, 
            repeat: Infinity,
            delay: i * 0.05
          }}
        />
      ))}
      
      {/* Inner rim */}
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      
      {/* Spokes */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <motion.line
          key={i}
          x1="12"
          y1="12"
          x2={12 + Math.cos((angle * Math.PI) / 180) * 5}
          y2={12 + Math.sin((angle * Math.PI) / 180) * 5}
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
      ))}
    </motion.g>
    
    {/* Center cap */}
    <motion.circle 
      cx="12" 
      cy="12" 
      r="2" 
      fill="currentColor"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Suspension indicators */}
    <motion.g
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <line x1="12" y1="2" x2="12" y2="0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <line x1="12" y1="24" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </motion.g>
  </svg>
);

// ============================================
// 6. SISTEMA ELÉCTRICO - Batería Cargando
// ============================================

const BatteryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    {/* Energy field */}
    <motion.rect
      x="1"
      y="6"
      width="20"
      height="12"
      rx="2"
      fill="currentColor"
      opacity="0.05"
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: [0.05, 0.1, 0.05]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Battery body */}
    <rect 
      x="2" 
      y="7" 
      width="18" 
      height="10" 
      rx="2" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      fill="currentColor" 
      opacity="0.2" 
    />
    
    {/* Battery terminal */}
    <path 
      d="M20 10h2v4h-2" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
    
    {/* Charging animation */}
    <motion.rect
      x="5"
      y="10"
      width="0"
      height="4"
      fill="currentColor"
      rx="0.5"
      animate={{ 
        width: [0, 3, 6, 9, 12],
        opacity: [0.5, 0.8, 0.8, 0.8, 0.8]
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity,
        repeatDelay: 0.5
      }}
    />
    
    {/* Energy particles */}
    {[0, 1, 2].map((i) => (
      <motion.circle
        key={i}
        cx="7"
        cy="12"
        r="0.5"
        fill="currentColor"
        initial={{ x: 0, opacity: 0 }}
        animate={{ 
          x: [0, 10 + i * 2],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          delay: i * 0.3
        }}
      />
    ))}
    
    {/* Plus/Minus symbols */}
    <motion.g
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <line x1="16" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="11" x2="17" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </motion.g>
  </svg>
);

// ============================================
// 7. AIRE ACONDICIONADO - Flujo de Aire
// ============================================

const OilIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    {/* Cooling wave */}
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      fill="currentColor"
      opacity="0.05"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.05, 0.1, 0.05]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* AC unit */}
    <rect 
      x="8" 
      y="6" 
      width="8" 
      height="12" 
      rx="1" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      fill="currentColor" 
      opacity="0.2" 
    />
    
    {/* Vent lines */}
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.line
        key={i}
        x1="9"
        y1={8 + i * 2}
        x2="15"
        y2={8 + i * 2}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
        animate={{ 
          opacity: [0.3, 0.7, 0.3],
          x1: [9, 8.5, 9],
          x2: [15, 15.5, 15]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          delay: i * 0.2
        }}
      />
    ))}
    
    {/* Cold air flow - left */}
    {[0, 1, 2].map((i) => (
      <motion.path
        key={`left-${i}`}
        d="M7 10 Q 4 12 7 14"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1],
          opacity: [0, 0.6, 0],
          x: [-2, 0, -2]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          delay: i * 0.5
        }}
      />
    ))}
    
    {/* Cold air flow - right */}
    {[0, 1, 2].map((i) => (
      <motion.path
        key={`right-${i}`}
        d="M17 10 Q 20 12 17 14"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1],
          opacity: [0, 0.6, 0],
          x: [2, 0, 2]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          delay: i * 0.5
        }}
      />
    ))}
    
    {/* Temperature indicator */}
    <motion.circle
      cx="12"
      cy="12"
      r="1.5"
      fill="currentColor"
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.5, 0.8, 0.5]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

// ============================================
// 8. COCHES CLÁSICOS - Motor Vintage Animado
// ============================================

const TransmissionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    {/* Vintage glow */}
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      fill="currentColor"
      opacity="0.05"
      animate={{ 
        scale: [1, 1.15, 1],
        opacity: [0.05, 0.12, 0.05]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    
    {/* Transmission case */}
    <motion.rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      opacity="0.2"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Gear shafts */}
    {[0, 1, 2].map((i) => (
      <motion.line
        key={i}
        x1={8 + i * 4}
        y1="6"
        x2={8 + i * 4}
        y2="18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
        animate={{ 
          opacity: [0.3, 0.7, 0.3],
          strokeWidth: [2, 2.5, 2]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          delay: i * 0.3
        }}
      />
    ))}
    
    {/* Gears */}
    {[8, 12, 16].map((x, i) => (
      <motion.g
        key={i}
        animate={{ 
          rotate: i % 2 === 0 ? 360 : -360 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ transformOrigin: `${x}px 12px` }}
      >
        <circle 
          cx={x} 
          cy="12" 
          r="2.5" 
          stroke="currentColor" 
          strokeWidth="1" 
          fill="currentColor"
          opacity="0.3" 
        />
        {[0, 90, 180, 270].map((angle, j) => (
          <rect
            key={j}
            x={x - 0.5}
            y="8.5"
            width="1"
            height="1.5"
            fill="currentColor"
            opacity="0.6"
            style={{
              transformOrigin: `${x}px 12px`,
              transform: `rotate(${angle}deg)`
            }}
          />
        ))}
      </motion.g>
    ))}
    
    {/* Oil drops */}
    {[0, 1].map((i) => (
      <motion.circle
        key={i}
        cx={10 + i * 4}
        cy="8"
        r="0.5"
        fill="currentColor"
        opacity="0.6"
        animate={{ 
          y: [0, 8, 0],
          opacity: [0, 0.8, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          delay: i * 1.5
        }}
      />
    ))}
    
    {/* Power indicator */}
    <motion.circle
      cx="12"
      cy="12"
      r="1"
      fill="currentColor"
      animate={{ 
        scale: [0.8, 1.3, 0.8],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);
// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const Workshop = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    vehicleBrand: '',
    vehicleModel: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Video URL
  const videoUrl = getSupabaseUrl('racing/videos/taller.mp4');
  console.log(' VIDEO URL WORKSHOP:', videoUrl);

  // ============================================
  // CONTENIDO BILINGÜE
  // ============================================

  const content = {
    es: {
      // SEO
      title: 'Taller Mecánico GT Race Marbella - Servicio Premium',
      description: 'Taller mecánico especializado en Marbella. Reparación, mantenimiento y diagnóstico de vehículos de alta gama. Servicio profesional y garantizado.',
      
      // Hero
      heroTitle: 'Taller Mecánico Premium',
      heroSubtitle: 'Expertos en mantenimiento y reparación de vehículos de alta gama en Marbella',
      heroCTA1: 'Solicitar Servicio',
      heroCTA2: 'Ver Servicios',
      
      // Stats
      statsTitle: 'Excelencia en Cada Servicio',
      stat1: '15+ Años',
      stat1Label: 'de Experiencia',
      stat2: '320+',
      stat2Label: 'Vehículos Atendidos',
      stat3: '98%',
      stat3Label: 'Satisfacción',
      stat4: '24/7',
      stat4Label: 'Asistencia',
      
      // Services
      servicesTitle: 'Nuestros Servicios',
      servicesSubtitle: 'Soluciones completas para tu vehículo',
      
      services: [
        {
          title: 'Mantenimiento General',
          description: 'Inspección completa, cambio de aceite, filtros y fluidos. Mantenimiento preventivo para alargar la vida de tu vehículo.',
          icon: <WrenchIcon />
        },
        {
          title: 'Diagnóstico Electrónico',
          description: 'Diagnóstico preciso con equipos de última generación. Detectamos y solucionamos problemas eléctricos y electrónicos.',
          icon: <DiagnosticIcon />
        },
        {
          title: 'Motor y Transmisión',
          description: 'Reparación y revisión de motor, transmisión, turbocompresor y sistemas de inyección. Especialistas en motores de alto rendimiento.',
          icon: <EngineIcon />
        },
        {
          title: 'Sistema de Frenos',
          description: 'Revisión completa de frenos, pastillas, discos y líquido. Garantizamos tu seguridad en cada frenada.',
          icon: <BrakeIcon />
        },
        {
          title: 'Neumáticos y Suspensión',
          description: 'Cambio de neumáticos, alineación, balanceo y revisión de suspensión. Conducción suave y segura garantizada.',
          icon: <TireIcon />
        },
        {
          title: 'Sistema Eléctrico',
          description: 'Reparación de alternador, batería, faros y sistemas eléctricos. Diagnóstico completo del cableado.',
          icon: <BatteryIcon />
        },
        {
          title: 'Aire Acondicionado',
          description: 'Mantenimiento y recarga de sistema de climatización. Confort garantizado en cualquier temperatura.',
          icon: <OilIcon />
        },
        {
          title: 'Coches Clásicos',
          description: 'Especialistas en restauración y mantenimiento de vehículos clásicos. Respetamos la originalidad de cada pieza.',
          icon: <TransmissionIcon />
        }
      ],
      
      // Why Us
      whyTitle: '¿Por Qué Elegirnos?',
      whySubtitle: 'Compromiso con la excelencia automotriz',
      
      reasons: [
        {
          title: 'Técnicos Certificados',
          description: 'Equipo altamente cualificado con formación continua en las últimas tecnologías automotrices.'
        },
        {
          title: 'Equipamiento Avanzado',
          description: 'Tecnología de diagnóstico de última generación para reparaciones precisas y eficientes.'
        },
        {
          title: 'Piezas Originales',
          description: 'Solo utilizamos repuestos de alta calidad y piezas originales para garantizar durabilidad.'
        },
        {
          title: 'Garantía Total',
          description: 'Todos nuestros servicios incluyen garantía completa. Tu tranquilidad es nuestra prioridad.'
        }
      ],
      
      // Process
      processTitle: 'Nuestro Proceso',
      processSubtitle: 'Servicio profesional paso a paso',
      
      steps: [
        {
          number: '01',
          title: 'Diagnóstico',
          description: 'Inspección completa y diagnóstico preciso con equipos avanzados'
        },
        {
          number: '02',
          title: 'Presupuesto',
          description: 'Presupuesto detallado y transparente sin sorpresas'
        },
        {
          number: '03',
          title: 'Reparación',
          description: 'Trabajo profesional con piezas de calidad y técnicos expertos'
        },
        {
          number: '04',
          title: 'Control de Calidad',
          description: 'Verificación exhaustiva antes de la entrega del vehículo'
        }
      ],
      
      // Form
      formTitle: 'Solicita tu Servicio',
      formSubtitle: 'Completa el formulario y nos pondremos en contacto contigo',
      formName: 'Nombre completo',
      formEmail: 'Email',
      formPhone: 'Teléfono',
      formService: 'Servicio requerido',
      formServicePlaceholder: 'Selecciona un servicio',
      formBrand: 'Marca del vehículo',
      formModel: 'Modelo del vehículo',
      formMessage: 'Describe el problema o servicio necesario',
      formButton: 'Enviar Solicitud',
      formSubmitting: 'Enviando...',
      formSuccess: '¡Solicitud enviada! Nos pondremos en contacto pronto.',
      formError: 'Error al enviar. Por favor, inténtalo de nuevo.',
      
      serviceOptions: [
        'Mantenimiento General',
        'Diagnóstico Electrónico',
        'Motor y Transmisión',
        'Sistema de Frenos',
        'Neumáticos y Suspensión',
        'Sistema Eléctrico',
        'Aire Acondicionado',
        'Coches Clásicos',
        'Otro'
      ],
      
      // Testimonials
      testimonialsTitle: 'Lo Que Dicen Nuestros Clientes',
      
      testimonials: [
        {
          name: 'David Guil',
          text: 'Garaje de supercoches espectaculares. Cuidan cada detalle y trato al cliente inmejorable. En Marbella y en España no hay un garaje superdeportivo con mayor ambición y proyección a futuro.',
          rating: 5
        },
        {
          name: 'Adrián Calvo Portillo',
          text: ' 10 de 10 para Daniel. Volvió a poner de stock la centralita de mi GSXR (estaba mapeada) y no sólo eso, sino que me aclaró muchas dudas y me explicó cosas muy interesantes y además de manera que hasta alguien que no entiende del tema (yo) pueda entenderlo y eso no sabe hacerlo cualquiera. Sin duda es una persona que siente pasión por lo que hace, lo recomendaría mil veces. De nuevo, 10 de 10 para Daniel, mil gracias por todo.',
          rating: 5
        },
        {
          name: 'Didi Lilova',
          text: 'So much more than a car club.. it’s a family! They take care of us as individuals, everyone is so friendly and we really feel comfortable. For every occasion there is a special event and everything is always so well organised. Our cars are in safe hands and we trust them.',
          rating: 5
        }
      ],
      
      // CTA
      ctaTitle: '¿Listo para Cuidar tu Vehículo?',
      ctaSubtitle: 'Agenda tu cita hoy y experimenta el mejor servicio automotriz de Marbella',
      ctaButton: 'Solicitar Cita',
      ctaButton2: 'Llamar Ahora'
    },
    en: {
      // SEO
      title: 'GT Race Marbella Workshop - Premium Service',
      description: 'Specialized mechanical workshop in Marbella. Repair, maintenance and diagnostics for high-end vehicles. Professional and guaranteed service.',
      
      // Hero
      heroTitle: 'Premium Automotive Workshop',
      heroSubtitle: 'Experts in maintenance and repair of high-end vehicles in Marbella',
      heroCTA1: 'Request Service',
      heroCTA2: 'View Services',
      
      // Stats
      statsTitle: 'Excellence in Every Service',
      stat1: '15+ Years',
      stat1Label: 'of Experience',
      stat2: '5,000+',
      stat2Label: 'Vehicles Serviced',
      stat3: '98%',
      stat3Label: 'Satisfaction',
      stat4: '24/7',
      stat4Label: 'Support',
      
      // Services
      servicesTitle: 'Our Services',
      servicesSubtitle: 'Complete solutions for your vehicle',
      
      services: [
        {
          title: 'General Maintenance',
          description: 'Complete inspection, oil change, filters and fluids. Preventive maintenance to extend your vehicle\'s life.',
          icon: <WrenchIcon />
        },
        {
          title: 'Electronic Diagnostics',
          description: 'Precise diagnostics with latest generation equipment. We detect and solve electrical and electronic problems.',
          icon: <DiagnosticIcon />
        },
        {
          title: 'Engine & Transmission',
          description: 'Engine, transmission, turbocharger and injection system repair. Specialists in high-performance engines.',
          icon: <EngineIcon />
        },
        {
          title: 'Brake System',
          description: 'Complete brake inspection, pads, discs and fluid. We guarantee your safety with every stop.',
          icon: <BrakeIcon />
        },
        {
          title: 'Tires & Suspension',
          description: 'Tire change, alignment, balancing and suspension check. Smooth and safe driving guaranteed.',
          icon: <TireIcon />
        },
        {
          title: 'Electrical System',
          description: 'Alternator, battery, headlights and electrical system repair. Complete wiring diagnostics.',
          icon: <BatteryIcon />
        },
        {
          title: 'Air Conditioning',
          description: 'HVAC system maintenance and recharge. Comfort guaranteed at any temperature.',
          icon: <OilIcon />
        },
        {
          title: 'Classic Cars',
          description: 'Specialists in restoration and maintenance of classic vehicles. We respect the originality of each piece.',
          icon: <TransmissionIcon />
        }
      ],
      
      // Why Us
      whyTitle: 'Why Choose Us?',
      whySubtitle: 'Commitment to automotive excellence',
      
      reasons: [
        {
          title: 'Certified Technicians',
          description: 'Highly qualified team with continuous training in the latest automotive technologies.'
        },
        {
          title: 'Advanced Equipment',
          description: 'Latest generation diagnostic technology for precise and efficient repairs.'
        },
        {
          title: 'Original Parts',
          description: 'We only use high-quality parts and original pieces to guarantee durability.'
        },
        {
          title: 'Full Warranty',
          description: 'All our services include complete warranty. Your peace of mind is our priority.'
        }
      ],
      
      // Process
      processTitle: 'Our Process',
      processSubtitle: 'Professional service step by step',
      
      steps: [
        {
          number: '01',
          title: 'Diagnosis',
          description: 'Complete inspection and precise diagnosis with advanced equipment'
        },
        {
          number: '02',
          title: 'Quote',
          description: 'Detailed and transparent quote with no surprises'
        },
        {
          number: '03',
          title: 'Repair',
          description: 'Professional work with quality parts and expert technicians'
        },
        {
          number: '04',
          title: 'Quality Control',
          description: 'Exhaustive verification before vehicle delivery'
        }
      ],
      
      // Form
      formTitle: 'Request Your Service',
      formSubtitle: 'Fill out the form and we\'ll contact you',
      formName: 'Full name',
      formEmail: 'Email',
      formPhone: 'Phone',
      formService: 'Required service',
      formServicePlaceholder: 'Select a service',
      formBrand: 'Vehicle brand',
      formModel: 'Vehicle model',
      formMessage: 'Describe the problem or required service',
      formButton: 'Send Request',
      formSubmitting: 'Sending...',
      formSuccess: 'Request sent! We\'ll contact you soon.',
      formError: 'Error sending. Please try again.',
      
      serviceOptions: [
        'General Maintenance',
        'Electronic Diagnostics',
        'Engine & Transmission',
        'Brake System',
        'Tires & Suspension',
        'Electrical System',
        'Air Conditioning',
        'Classic Cars',
        'Other'
      ],
      
      // Testimonials
      testimonialsTitle: 'What Our Clients Say',
      
      testimonials: [
        {
          name: 'Carlos Martínez',
          text: 'Excellent service. Took my Porsche for maintenance and the treatment was impeccable. Top-level professionals.',
          rating: 5
        },
        {
          name: 'María González',
          text: 'The best workshop in Marbella. They solved a problem others couldn\'t diagnose. Totally recommended.',
          rating: 5
        },
        {
          name: 'James Wilson',
          text: 'Outstanding service! They took great care of my classic Ferrari. True professionals who understand high-end vehicles.',
          rating: 5
        }
      ],
      
      // CTA
      ctaTitle: 'Ready to Care for Your Vehicle?',
      ctaSubtitle: 'Schedule your appointment today and experience the best automotive service in Marbella',
      ctaButton: 'Request Appointment',
      ctaButton2: 'Call Now'
    }
  };

  const t = content[language];

  // ============================================
  // HANDLE FORM SUBMIT
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase
        .from('workshop_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            vehicle_brand: formData.vehicleBrand,
            vehicle_model: formData.vehicleModel,
            message: formData.message,
            language: language,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        vehicleBrand: '',
        vehicleModel: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black">
      
      {/* SEO */}
      <title>{t.title}</title>
      <meta name="description" content={t.description} />

      {/* ============================================ */}
      {/* HERO SECTION WITH VIDEO */}
      {/* ============================================ */}
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
<video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={videoUrl}
            onError={(e) => {
              console.error('❌ Error cargando video:', videoUrl);
              console.log('Verifica que existe: racing/videos/taller.mp4');
            }}
            onLoadedData={() => {
              console.log('✅ Video cargado correctamente');
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-7xl px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-6 py-3 bg-gt-gold/10 backdrop-blur-xl 
                       border border-gt-gold/30 rounded-full mb-6"
            >
              <span className="text-gt-gold font-march font-semibold text-sm uppercase tracking-widest">
                GT Race Workshop
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-march font-bold text-white mb-6 
                         drop-shadow-2xl leading-tight">
              {t.heroTitle}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#form"
                className="px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold text-lg
                         hover:bg-gt-gold-light hover:scale-105 transition-all duration-300
                         shadow-lg shadow-gt-gold/50"
              >
                {t.heroCTA1}
              </a>
              <a
                href="#services"
                className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 
                         text-white rounded-xl font-semibold text-lg
                         hover:bg-white/10 hover:border-gt-gold/50 transition-all duration-300"
              >
                {t.heroCTA2}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-gt-gold/50 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gt-gold rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      
      <section className="relative py-20 px-4 bg-gradient-to-b from-black via-gt-gray-dark/50 to-black">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.statsTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: t.stat1, label: t.stat1Label, delay: 0.1 },
              { value: t.stat2, label: t.stat2Label, delay: 0.2 },
              { value: t.stat3, label: t.stat3Label, delay: 0.3 },
              { value: t.stat4, label: t.stat4Label, delay: 0.4 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10
                         hover:border-gt-gold/50 transition-all duration-300 text-center"
              >
                <p className="text-5xl md:text-6xl font-march font-bold text-gt-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-300 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICES SECTION */}
      {/* ============================================ */}
      
      <section id="services" className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.servicesTitle}
            </h2>
            <p className="text-xl text-gray-300">
              {t.servicesSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10
                         hover:border-gt-gold/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 text-gt-gold mb-6 transform group-hover:scale-110 
                              group-hover:rotate-12 transition-all duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHY US SECTION */}
      {/* ============================================ */}
      
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/30 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.whyTitle}
            </h2>
            <p className="text-xl text-gray-300">
              {t.whySubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10
                         hover:border-gt-gold/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-march font-bold text-gt-gold mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROCESS SECTION */}
      {/* ============================================ */}
      
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.processTitle}
            </h2>
            <p className="text-xl text-gray-300">
              {t.processSubtitle}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gt-gold via-gt-gold/50 to-transparent hidden md:block" />

            <div className="space-y-12">
              {t.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-8 items-start"
                >
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gt-gold text-black 
                                flex items-center justify-center text-2xl font-march font-bold 
                                shadow-lg shadow-gt-gold/50">
                    {step.number}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex-grow bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10
                             hover:border-gt-gold/50 transition-all duration-300"
                  >
                    <h3 className="text-2xl font-march font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FORM SECTION */}
      {/* ============================================ */}
      
      <section id="form" className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/50 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.formTitle}
            </h2>
            <p className="text-xl text-gray-300">
              {t.formSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2 font-semibold">
                    {t.formName}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 focus:border-gt-gold focus:outline-none
                             transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-semibold">
                    {t.formEmail}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 focus:border-gt-gold focus:outline-none
                             transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2 font-semibold">
                    {t.formPhone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 focus:border-gt-gold focus:outline-none
                             transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-semibold">
                    {t.formService}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white focus:border-gt-gold focus:outline-none
                             transition-all duration-300"
                  >
                    <option value="" className="bg-gt-gray-dark">
                      {t.formServicePlaceholder}
                    </option>
                    {t.serviceOptions.map((option, index) => (
                      <option key={index} value={option} className="bg-gt-gray-dark">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2 font-semibold">
                    {t.formBrand}
                  </label>
                  <input
                    type="text"
                    name="vehicleBrand"
                    value={formData.vehicleBrand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 focus:border-gt-gold focus:outline-none
                             transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-semibold">
                    {t.formModel}
                  </label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 focus:border-gt-gold focus:outline-none
                             transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold">
                  {t.formMessage}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                           text-white placeholder-gray-500 focus:border-gt-gold focus:outline-none
                           transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold text-lg
                         hover:bg-gt-gold-light hover:scale-105 transition-all duration-300
                         shadow-lg shadow-gt-gold/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t.formSubmitting : t.formButton}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-500 text-center"
                >
                  {t.formSuccess}
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-500 text-center"
                >
                  {t.formError}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-march font-bold text-white mb-4">
              {t.testimonialsTitle}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10
                         hover:border-gt-gold/30 transition-all duration-300"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gt-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-white/10 pt-6">
                  <p className="text-white font-semibold text-lg">{testimonial.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA FINAL */}
      {/* ============================================ */}
      
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/30 to-black">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-gt-gold/20 via-gt-gold/10 to-transparent 
                     backdrop-blur-2xl rounded-3xl p-12 border border-gt-gold/30 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gt-gold/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gt-gold/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-march font-bold text-white mb-6">
                {t.ctaTitle}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {t.ctaSubtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#form"
                  className="px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold text-lg
                           hover:bg-gt-gold-light hover:scale-105 transition-all duration-300
                           shadow-lg shadow-gt-gold/50"
                >
                  {t.ctaButton}
                </a>
                <a
                  href="tel:+34687999427"
                  className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 
                           text-white rounded-xl font-semibold text-lg
                           hover:bg-white/20 transition-all duration-300"
                >
                  {t.ctaButton2}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Workshop;