import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../../supabase/supabaseClient';

// ============================================
// ICONOS SVG PERSONALIZADOS ANIMADOS
// ============================================

const CrownIcon = () => (
  <motion.svg
    viewBox="0 0 100 100"
    className="w-full h-full"
    animate={{ rotate: [0, 5, -5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.path
      d="M50 20 L30 45 L10 40 L20 70 L80 70 L90 40 L70 45 Z"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M50 20 L30 45 L10 40 L20 70 L80 70 L90 40 L70 45 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <motion.circle cx="50" cy="25" r="3" fill="currentColor"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.circle cx="30" cy="45" r="3" fill="currentColor"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
    />
    <motion.circle cx="70" cy="45" r="3" fill="currentColor"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
    />
  </motion.svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.path
      d="M50 10 L61 40 L92 46 L71 67 L76 98 L50 82 L24 98 L29 67 L8 46 L39 40 Z"
      fill="currentColor"
      opacity="0.2"
      animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
    <path
      d="M50 10 L61 40 L92 46 L71 67 L76 98 L50 82 L24 98 L29 67 L8 46 L39 40 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const DiamondIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.path
      d="M50 10 L90 40 L50 90 L10 40 Z"
      fill="currentColor"
      opacity="0.2"
      animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <path
      d="M50 10 L90 40 L50 90 L10 40 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="M20 40 L50 50 L80 40" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <path d="M50 50 L50 90" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.circle
      cx="50" cy="50" r="35"
      fill="currentColor" opacity="0.2"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="3" fill="none" />
    <motion.path
      d="M35 50 L45 60 L65 40"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
    />
  </svg>
);

const VIPIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <motion.rect
      x="10" y="30" width="80" height="40" rx="10"
      fill="currentColor" opacity="0.2"
      animate={{ y: [30, 28, 30] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <rect x="10" y="30" width="80" height="40" rx="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <text x="50" y="58" textAnchor="middle" fill="currentColor" fontSize="20" fontWeight="bold">VIP</text>
    <motion.circle cx="20" cy="20" r="3" fill="currentColor"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.circle cx="80" cy="20" r="3" fill="currentColor"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
    />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="35" fill="currentColor" opacity="0.2" />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="3" fill="none" />
    <motion.line
      x1="50" y1="50" x2="50" y2="25"
      stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "50px 50px" }}
    />
    <motion.line
      x1="50" y1="50" x2="70" y2="50"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "50px 50px" }}
    />
  </svg>
);

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const Membership = () => {
  const { language } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España',
    livesInMarbella: 'no',
    carOwned: '',
    numberOfCars: '1',
    howDidYouHear: 'google',
    additionalInfo: '',

    // Intención coche
    carIntention: 'none', // 'none', 'buy', 'sell'

    // Vender coche
    sellCarBrand: '',
    sellCarModel: '',
    sellCarVersion: '',
    sellCarYear: '',
    sellCarKm: '',
    sellCarFuel: 'gasoline',
    sellCarPowerCV: '',
    sellCarPowerKW: '',
    sellCarTransmission: 'automatic',
    sellCarDoors: '4',
    sellCarColor: '',
    sellCarVIN: '',
    sellCarPrice: '',
    sellCarNotes: '',

    // Comprar coche
    buyCarDescription: '',

    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false
  });

  // Traducciones
  const t = {
    es: {
      heroTitle: 'Membresía Exclusiva',
      heroSubtitle: 'Únete a la élite del automovilismo en la Costa del Sol',
      heroDescription: 'Accede a experiencias únicas, eventos exclusivos y servicios premium diseñados para los amantes de los coches de lujo',
      ctaButton: 'Elige Tu Plan',
      learnMore: 'Conocer Beneficios',

      plansTitle: 'Planes de Membresía',
      plansSubtitle: 'Elige el plan perfecto para ti',

      silverName: 'Silver',
      silverPrice: '1,500',
      silverPeriod: '/año',
      silverDescription: 'Ideal para comenzar tu viaje con GT Race Marbella',
      silverFeatures: [
        'Acceso a eventos mensuales del club',
        '10% descuento en servicios de detailing',
        'Acceso al Car Hotel (tarifas especiales)',
        'Newsletter exclusiva mensual',
        'Invitaciones a test drives',
        'Parking prioritario en eventos',
        'Merchandising de bienvenida',
        'App móvil del club'
      ],

      goldName: 'Gold',
      goldPrice: '3,500',
      goldPeriod: '/año',
      goldDescription: 'La opción más popular para entusiastas',
      goldFeatures: [
        'Todo lo incluido en Silver',
        'Acceso ilimitado a eventos del club',
        '20% descuento en todos los servicios',
        '5 días gratis de Car Hotel al año',
        'Acceso a track days exclusivos',
        'Invitación a 2 eventos VIP al año',
        'Concierge personal',
        'Prioridad en reservas de servicios',
        'Acceso a sala VIP del club',
        '2 invitaciones de guest pass/año'
      ],

      platinumName: 'Platinum',
      platinumPrice: '7,500',
      platinumPeriod: '/año',
      platinumDescription: 'La experiencia definitiva de lujo y exclusividad',
      platinumFeatures: [
        'Todo lo incluido en Gold',
        'Acceso ilimitado Car Hotel',
        '30% descuento en todos los servicios',
        'Participación en Race Team (sujeto a disponibilidad)',
        'Acceso VIP a todos los eventos',
        'Invitación a Gala Anual',
        'Test drive ilimitado de coches del club',
        'Parking permanente en instalaciones',
        'Servicio de chófer (10 servicios/año)',
        'Acceso a red internacional de clubes',
        '5 invitaciones de guest pass/año',
        'Placa de membresía personalizada'
      ],

      mostPopular: 'Más Popular',
      selectPlan: 'Seleccionar Plan',

      benefitsTitle: 'Beneficios de Ser Miembro',
      benefitsSubtitle: 'Experiencias únicas diseñadas para ti',

      benefit1Title: 'Eventos Exclusivos',
      benefit1Desc: 'Accede a eventos privados, test drives, track days y experiencias únicas con los mejores coches del mundo',

      benefit2Title: 'Servicios Premium',
      benefit2Desc: 'Descuentos especiales en detailing, wrapping, Car Hotel y todos nuestros servicios de mantenimiento',

      benefit3Title: 'Networking Elite',
      benefit3Desc: 'Conoce a otros entusiastas, coleccionistas y profesionales del mundo del motor en un ambiente exclusivo',

      benefit4Title: 'Atención Personalizada',
      benefit4Desc: 'Concierge dedicado, prioridad en reservas y atención VIP en todas tus interacciones con el club',

      benefit5Title: 'Acceso a Racing',
      benefit5Desc: 'Participa en nuestro programa de racing, desde iniciación hasta competición profesional',

      benefit6Title: 'Red Internacional',
      benefit6Desc: 'Acceso a clubes asociados en Europa y el mundo para extender tu experiencia más allá de Marbella',

      comparisonTitle: 'Compara los Planes',
      comparisonSubtitle: 'Encuentra el plan perfecto según tus necesidades',

      feature: 'Característica',
      basicAccess: 'Acceso a eventos',
      discounts: 'Descuentos en servicios',
      carHotel: 'Días gratis Car Hotel',
      trackDays: 'Track days exclusivos',
      vipEvents: 'Eventos VIP',
      concierge: 'Concierge personal',
      guestPasses: 'Guest passes/año',
      internationalAccess: 'Red internacional',
      racingAccess: 'Acceso Racing Team',

      monthly: 'Mensuales',
      unlimited: 'Ilimitados',
      none: 'No incluido',
      included: 'Incluido',
      basic: 'Básico',
      priority: 'Prioritario',
      vip: 'VIP Total',

      formTitle: 'Solicitud de Membresía',
      formSubtitle: 'Complete el formulario para unirse',

      personalInfo: 'Información Personal',
      firstName: 'Nombre',
      lastName: 'Apellidos',
      email: 'Email',
      phone: 'Teléfono',
      birthDate: 'Fecha de Nacimiento',

      addressInfo: 'Dirección',
      address: 'Dirección',
      city: 'Ciudad',
      postalCode: 'Código Postal',
      country: 'País',

      additionalInfo: 'Información Adicional',
      livesInMarbella: '¿Vive en Marbella?',
      livesYes: 'Sí',
      livesNo: 'No',
      livesSecondary: 'Residencia secundaria',
      carOwned: '¿Qué coche tiene actualmente?',
      numberOfCars: 'Número de coches',
      howDidYouHear: '¿Cómo nos conoció?',
      hearFriend: 'Amigo/Recomendación',
      hearGoogle: 'Google',
      hearInstagramPost: 'Instagram (post)',
      hearInstagramAd: 'Instagram (anuncio)',
      hearOther: 'Otro',
      additionalNotes: 'Información adicional',

      carIntentionTitle: '¿Está interesado en comprar o vender un coche?',
      carIntentionNone: 'Ninguno',
      carIntentionBuy: 'Comprar un coche',
      carIntentionSell: 'Vender mi coche',

      sellCarTitle: 'Información del Coche a Vender',
      sellCarBrand: 'Marca',
      sellCarModel: 'Modelo',
      sellCarVersion: 'Versión exacta (ej: 1.6 TDI Sport)',
      sellCarYear: 'Año de primera matriculación',
      sellCarKm: 'Kilómetros actuales',
      sellCarFuel: 'Tipo de combustible',
      fuelGasoline: 'Gasolina',
      fuelDiesel: 'Diésel',
      fuelElectric: 'Eléctrico',
      fuelHybrid: 'Híbrido',
      fuelPluginHybrid: 'Híbrido enchufable',
      fuelGas: 'Gas',
      fuelOther: 'Otro',
      sellCarPowerCV: 'Potencia (CV)',
      sellCarPowerKW: 'Potencia (kW)',
      sellCarTransmission: 'Tipo de caja de cambios',
      transManual: 'Manual',
      transAutomatic: 'Automática',
      transSemiAuto: 'Semi-automática',
      sellCarDoors: 'Número de puertas',
      sellCarColor: 'Color',
      sellCarVIN: 'Número VIN (opcional)',
      sellCarPrice: 'Precio solicitado (€)',
      sellCarNotes: 'Notas adicionales',

      buyCarTitle: 'Describe el coche que buscas',
      buyCarDescription: 'Incluye marca, modelo, año, presupuesto, color y características que buscas',

      accountInfo: 'Seguridad',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',

      acceptTerms: 'Acepto los términos y condiciones',
      acceptMarketing: 'Deseo recibir comunicaciones comerciales',

      submitButton: 'Enviar Solicitud',
      submitting: 'Enviando...',

      successTitle: '¡Solicitud Enviada!',
      successMessage: 'Nos pondremos en contacto contigo en las próximas 24-48 horas para finalizar tu membresía.',
      backToPlans: 'Volver a Planes',

      faqTitle: 'Preguntas Frecuentes',
      faqSubtitle: 'Todo lo que necesitas saber',

      faq1Q: '¿Cómo funciona el proceso de membresía?',
      faq1A: 'Una vez envíes tu solicitud, nuestro equipo la revisará y te contactará en 24-48 horas. Programaremos una visita a nuestras instalaciones y finalizaremos el proceso de alta.',

      faq2Q: '¿Puedo cambiar mi plan más adelante?',
      faq2A: 'Sí, puedes actualizar tu membresía en cualquier momento. Solo pagarás la diferencia prorrateada.',

      faq3Q: '¿Los descuentos son acumulativos?',
      faq3A: 'Los descuentos de membresía no son acumulativos con otras promociones, se aplicará siempre el mayor descuento disponible.',

      faq4Q: '¿Qué incluye el Car Hotel?',
      faq4A: 'Almacenamiento seguro con control de clima, carga de batería, limpieza mensual y seguro incluido.',

      faq5Q: '¿Puedo llevar invitados a los eventos?',
      faq5A: 'Sí, cada plan incluye guest passes que permiten a tus invitados disfrutar de eventos seleccionados contigo.',

      faq6Q: '¿La membresía incluye seguro para mi vehículo?',
      faq6A: 'El Car Hotel incluye seguro durante el almacenamiento. Para eventos, se requiere tu propio seguro con cobertura adecuada.',

      testimonialsTitle: 'Lo Que Dicen Nuestros Miembros',
      testimonialsSubtitle: 'Experiencias reales de la comunidad GT Race',

      testimonial1Name: 'Danielle Penny',
      testimonial1Role: 'Miembro Gold desde 2025',
      testimonial1Text: 'Best car club! Such a great group of members and staff ! The trips are something else can’t wait for the next one ! And saud & his wife are so lovely so glad myself & husband joined x',

      testimonial2Name: 'DC',
      testimonial2Role: 'Primer Miembro Gold en 2025',
      testimonial2Text: 'The best car club anywhere looked after by car enthusiasts and professionals in everything that is done in this limited members exclusive environment. Great job in your first year and many to come with me a part of it as your very first member!!',

      testimonial3Name: 'Chakra Fénix',
      testimonial3Role: 'Miembro Gold desde 2025',
      testimonial3Text: 'The only word to describe them is perfection.',

      ctaTitle: '¿Listo para Unirte?',
      ctaDescription: 'Forma parte de la comunidad más exclusiva de entusiastas del automóvil en la Costa del Sol',
      ctaButton1: 'Ver Planes',
      ctaButton2: 'Contactar',

      errors: {
        fillAll: 'Por favor, completa todos los campos obligatorios',
        emailInvalid: 'Email no válido',
        passwordMatch: 'Las contraseñas no coinciden',
        passwordLength: 'La contraseña debe tener al menos 8 caracteres',
        acceptTerms: 'Debes aceptar los términos y condiciones',
        submitError: 'Error al enviar la solicitud. Inténtalo de nuevo.'
      }
    },
    en: {
      heroTitle: 'Exclusive Membership',
      heroSubtitle: 'Join the elite of motorsport on the Costa del Sol',
      heroDescription: 'Access unique experiences, exclusive events and premium services designed for luxury car lovers',
      ctaButton: 'Choose Your Plan',
      learnMore: 'Learn Benefits',

      plansTitle: 'Membership Plans',
      plansSubtitle: 'Choose the perfect plan for you',

      silverName: 'Silver',
      silverPrice: '1,500',
      silverPeriod: '/year',
      silverDescription: 'Ideal to start your journey with GT Race Marbella',
      silverFeatures: [
        'Access to monthly club events',
        '10% discount on detailing services',
        'Access to Car Hotel (special rates)',
        'Exclusive monthly newsletter',
        'Test drive invitations',
        'Priority parking at events',
        'Welcome merchandise',
        'Club mobile app'
      ],

      goldName: 'Gold',
      goldPrice: '3,500',
      goldPeriod: '/year',
      goldDescription: 'The most popular option for enthusiasts',
      goldFeatures: [
        'Everything in Silver',
        'Unlimited access to club events',
        '20% discount on all services',
        '5 free days of Car Hotel per year',
        'Access to exclusive track days',
        'Invitation to 2 VIP events per year',
        'Personal concierge',
        'Priority service bookings',
        'Access to club VIP lounge',
        '2 guest passes/year'
      ],

      platinumName: 'Platinum',
      platinumPrice: '7,500',
      platinumPeriod: '/year',
      platinumDescription: 'The ultimate luxury and exclusivity experience',
      platinumFeatures: [
        'Everything in Gold',
        'Unlimited Car Hotel access',
        '30% discount on all services',
        'Race Team participation (subject to availability)',
        'VIP access to all events',
        'Annual Gala invitation',
        'Unlimited test drives of club cars',
        'Permanent parking at facilities',
        'Chauffeur service (10 services/year)',
        'International club network access',
        '5 guest passes/year',
        'Personalized membership plaque'
      ],

      mostPopular: 'Most Popular',
      selectPlan: 'Select Plan',

      benefitsTitle: 'Member Benefits',
      benefitsSubtitle: 'Unique experiences designed for you',

      benefit1Title: 'Exclusive Events',
      benefit1Desc: 'Access private events, test drives, track days and unique experiences with the world\'s best cars',

      benefit2Title: 'Premium Services',
      benefit2Desc: 'Special discounts on detailing, wrapping, Car Hotel and all our maintenance services',

      benefit3Title: 'Elite Networking',
      benefit3Desc: 'Meet other enthusiasts, collectors and motorsport professionals in an exclusive environment',

      benefit4Title: 'Personalized Service',
      benefit4Desc: 'Dedicated concierge, booking priority and VIP attention in all your club interactions',

      benefit5Title: 'Racing Access',
      benefit5Desc: 'Participate in our racing program, from initiation to professional competition',

      benefit6Title: 'International Network',
      benefit6Desc: 'Access to partner clubs in Europe and worldwide to extend your experience beyond Marbella',

      comparisonTitle: 'Compare Plans',
      comparisonSubtitle: 'Find the perfect plan for your needs',

      feature: 'Feature',
      basicAccess: 'Event access',
      discounts: 'Service discounts',
      carHotel: 'Free Car Hotel days',
      trackDays: 'Exclusive track days',
      vipEvents: 'VIP events',
      concierge: 'Personal concierge',
      guestPasses: 'Guest passes/year',
      internationalAccess: 'International network',
      racingAccess: 'Racing Team access',

      monthly: 'Monthly',
      unlimited: 'Unlimited',
      none: 'Not included',
      included: 'Included',
      basic: 'Basic',
      priority: 'Priority',
      vip: 'Full VIP',

      formTitle: 'Membership Application',
      formSubtitle: 'Complete the form to join',

      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      birthDate: 'Birth Date',

      addressInfo: 'Address',
      address: 'Address',
      city: 'City',
      postalCode: 'Postal Code',
      country: 'Country',

      additionalInfo: 'Additional Information',
      livesInMarbella: 'Do you live in Marbella?',
      livesYes: 'Yes',
      livesNo: 'No',
      livesSecondary: 'Secondary residence',
      carOwned: 'What car do you currently own?',
      numberOfCars: 'Number of cars',
      howDidYouHear: 'How did you hear about us?',
      hearFriend: 'Friend/Recommendation',
      hearGoogle: 'Google',
      hearInstagramPost: 'Instagram (post)',
      hearInstagramAd: 'Instagram (ad)',
      hearOther: 'Other',
      additionalNotes: 'Additional information',

      carIntentionTitle: 'Are you interested in buying or selling a car?',
      carIntentionNone: 'None',
      carIntentionBuy: 'Buy a car',
      carIntentionSell: 'Sell my car',

      sellCarTitle: 'Car Information for Sale',
      sellCarBrand: 'Brand',
      sellCarModel: 'Model',
      sellCarVersion: 'Exact version (e.g., 1.6 TDI Sport)',
      sellCarYear: 'Year of first registration',
      sellCarKm: 'Current kilometers',
      sellCarFuel: 'Fuel type',
      fuelGasoline: 'Gasoline',
      fuelDiesel: 'Diesel',
      fuelElectric: 'Electric',
      fuelHybrid: 'Hybrid',
      fuelPluginHybrid: 'Plug-in hybrid',
      fuelGas: 'Gas',
      fuelOther: 'Other',
      sellCarPowerCV: 'Power (HP)',
      sellCarPowerKW: 'Power (kW)',
      sellCarTransmission: 'Transmission type',
      transManual: 'Manual',
      transAutomatic: 'Automatic',
      transSemiAuto: 'Semi-automatic',
      sellCarDoors: 'Number of doors',
      sellCarColor: 'Color',
      sellCarVIN: 'VIN number (optional)',
      sellCarPrice: 'Asking price (€)',
      sellCarNotes: 'Additional notes',

      buyCarTitle: 'Describe the car you are looking for',
      buyCarDescription: 'Include brand, model, year, budget, color and features you are looking for',

      accountInfo: 'Security',
      password: 'Password',
      confirmPassword: 'Confirm Password',

      acceptTerms: 'I accept the terms and conditions',
      acceptMarketing: 'I want to receive marketing communications',

      submitButton: 'Submit Application',
      submitting: 'Submitting...',

      successTitle: 'Application Sent!',
      successMessage: 'We will contact you within 24-48 hours to finalize your membership.',
      backToPlans: 'Back to Plans',

      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Everything you need to know',

      faq1Q: 'How does the membership process work?',
      faq1A: 'Once you submit your application, our team will review it and contact you within 24-48 hours. We\'ll schedule a visit to our facilities and finalize the registration process.',

      faq2Q: 'Can I change my plan later?',
      faq2A: 'Yes, you can upgrade your membership at any time. You\'ll only pay the prorated difference.',

      faq3Q: 'Are discounts cumulative?',
      faq3A: 'Membership discounts are not cumulative with other promotions; the highest available discount will always be applied.',

      faq4Q: 'What does Car Hotel include?',
      faq4A: 'Secure climate-controlled storage, battery charging, monthly cleaning, and insurance included.',

      faq5Q: 'Can I bring guests to events?',
      faq5A: 'Yes, each plan includes guest passes that allow your guests to enjoy selected events with you.',

      faq6Q: 'Does membership include insurance for my vehicle?',
      faq6A: 'Car Hotel includes insurance during storage. For events, you need your own insurance with adequate coverage.',

      testimonialsTitle: 'What Our Members Say',
      testimonialsSubtitle: 'Real experiences from the GT Race community',

      testimonial1Name: 'Danielle Penny',
      testimonial1Role: 'Gold Member since 2025',
      testimonial1Text: 'Best car club! Such a great group of members and staff ! The trips are something else can’t wait for the next one ! And saud & his wife are so lovely so glad myself & husband joined x',

      testimonial2Name: 'DC',
      testimonial2Role: 'First Gold Member since 2025',
      testimonial2Text: 'The best car club anywhere looked after by car enthusiasts and professionals in everything that is done in this limited members exclusive environment. Great job in your first year and many to come with me a part of it as your very first member!!',

      testimonial3Name: 'Chakra Fénix',
      testimonial3Role: 'Gold Member since 2025',
      testimonial3Text: 'The only word to describe them is perfection.',

      ctaTitle: 'Ready to Join?',
      ctaDescription: 'Become part of the most exclusive community of car enthusiasts on the Costa del Sol',
      ctaButton1: 'View Plans',
      ctaButton2: 'Contact',

      errors: {
        fillAll: 'Please fill in all required fields',
        emailInvalid: 'Invalid email',
        passwordMatch: 'Passwords do not match',
        passwordLength: 'Password must be at least 8 characters',
        acceptTerms: 'You must accept the terms and conditions',
        submitError: 'Error submitting application. Please try again.'
      }
    }
  };

  const content = t[language];

  // Planes
  const plans = [
    {
      id: 'silver',
      name: content.silverName,
      price: content.silverPrice,
      period: content.silverPeriod,
      description: content.silverDescription,
      features: content.silverFeatures,
      icon: StarIcon,
      color: 'from-gray-400 to-gray-600',
      borderColor: 'border-gray-500',
      popular: false
    },
    {
      id: 'gold',
      name: content.goldName,
      price: content.goldPrice,
      period: content.goldPeriod,
      description: content.goldDescription,
      features: content.goldFeatures,
      icon: CrownIcon,
      color: 'from-gt-gold to-yellow-600',
      borderColor: 'border-gt-gold',
      popular: true
    },
  ];

  // Beneficios
  const benefits = [
    { icon: VIPIcon, title: content.benefit1Title, description: content.benefit1Desc },
    { icon: StarIcon, title: content.benefit2Title, description: content.benefit2Desc },
    { icon: CrownIcon, title: content.benefit3Title, description: content.benefit3Desc },
    { icon: ClockIcon, title: content.benefit4Title, description: content.benefit4Desc },
    { icon: DiamondIcon, title: content.benefit5Title, description: content.benefit5Desc },
    { icon: CheckCircleIcon, title: content.benefit6Title, description: content.benefit6Desc }
  ];

  // FAQs
  const faqs = [
    { question: content.faq1Q, answer: content.faq1A },
    { question: content.faq2Q, answer: content.faq2A },
    { question: content.faq3Q, answer: content.faq3A },
    { question: content.faq4Q, answer: content.faq4A },
    { question: content.faq5Q, answer: content.faq5A },
    { question: content.faq6Q, answer: content.faq6A }
  ];

  // Testimonios
  const testimonials = [
    { name: content.testimonial1Name, role: content.testimonial1Role, text: content.testimonial1Text, rating: 5 },
    { name: content.testimonial2Name, role: content.testimonial2Role, text: content.testimonial2Text, rating: 5 },
    { name: content.testimonial3Name, role: content.testimonial3Role, text: content.testimonial3Text, rating: 5 }
  ];

  // Auto-calcular kW desde CV
  const handleCVChange = (e) => {
    const cv = e.target.value;
    setFormData(prev => ({
      ...prev,
      sellCarPowerCV: cv,
      sellCarPowerKW: cv ? Math.round(cv * 0.7355) : ''
    }));
  };

  // Validar
  const validateForm = () => {
    const errors = [];

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      errors.push(content.errors.fillAll);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push(content.errors.emailInvalid);
    }

    if (formData.password.length < 8) {
      errors.push(content.errors.passwordLength);
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push(content.errors.passwordMatch);
    }

    if (!formData.acceptTerms) {
      errors.push(content.errors.acceptTerms);
    }

    return errors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join('. '));
      return;
    }

    setLoading(true);

    try {
      // 1. Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone
          }
        }
      });

      if (authError) throw authError;

      // 2. Insertar solicitud de membresía
      const membershipData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        lives_in_marbella: formData.livesInMarbella,
        car_owned: formData.carOwned,
        number_of_cars: formData.numberOfCars,
        how_did_you_hear: formData.howDidYouHear,
        additional_info: formData.additionalInfo,
        status: 'pending',

        // Intención coche
        car_intention: formData.carIntention
      };

      // Si vende coche
      if (formData.carIntention === 'sell') {
        membershipData.sell_car_brand = formData.sellCarBrand;
        membershipData.sell_car_model = formData.sellCarModel;
        membershipData.sell_car_version = formData.sellCarVersion;
        membershipData.sell_car_year = formData.sellCarYear ? parseInt(formData.sellCarYear) : null;
        membershipData.sell_car_km = formData.sellCarKm ? parseInt(formData.sellCarKm) : null;
        membershipData.sell_car_fuel = formData.sellCarFuel;
        membershipData.sell_car_power_cv = formData.sellCarPowerCV ? parseInt(formData.sellCarPowerCV) : null;
        membershipData.sell_car_power_kw = formData.sellCarPowerKW ? parseInt(formData.sellCarPowerKW) : null;
        membershipData.sell_car_transmission = formData.sellCarTransmission;
        membershipData.sell_car_doors = formData.sellCarDoors ? parseInt(formData.sellCarDoors) : null;
        membershipData.sell_car_color = formData.sellCarColor;
        membershipData.sell_car_vin = formData.sellCarVIN;
        membershipData.sell_car_price = formData.sellCarPrice ? parseFloat(formData.sellCarPrice) : null;
        membershipData.sell_car_notes = formData.sellCarNotes;
      }

      // Si compra coche
      if (formData.carIntention === 'buy') {
        membershipData.buy_car_description = formData.buyCarDescription;
      }

      const { error: dbError } = await supabase
        .from('membership_applications')
        .insert([membershipData]);

      if (dbError) throw dbError;

      setSuccess(true);
      setLoading(false);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', birthDate: '',
        address: '', city: '', postalCode: '', country: 'España',
        livesInMarbella: 'no', carOwned: '', numberOfCars: '1',
        howDidYouHear: 'google', additionalInfo: '',
        carIntention: 'none',
        sellCarBrand: '', sellCarModel: '', sellCarVersion: '',
        sellCarYear: '', sellCarKm: '', sellCarFuel: 'gasoline',
        sellCarPowerCV: '', sellCarPowerKW: '',
        sellCarTransmission: 'automatic', sellCarDoors: '4',
        sellCarColor: '', sellCarVIN: '', sellCarPrice: '', sellCarNotes: '',
        buyCarDescription: '',
        password: '', confirmPassword: '',
        acceptTerms: false, acceptMarketing: false
      });

    } catch (err) {
      console.error('Error:', err);
      setError(content.errors.submitError);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('membership-form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gt-gold/10 via-transparent to-transparent" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-gt-gold/20 to-transparent border border-gt-gold/30 mb-8"
            >
              <div className="w-6 h-6 text-gt-gold mr-2">
                <CrownIcon />
              </div>
              <span className="text-gt-gold font-semibold">{content.heroTitle}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-voga font-bold text-white mb-6"
            >
              {content.heroSubtitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              {content.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <button
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-10 py-5 bg-gt-gold text-black rounded-xl font-semibold text-lg hover:bg-gt-gold-light hover:scale-105 transition-all duration-300 shadow-lg shadow-gt-gold/50 w-full sm:w-auto"
              >
                {content.ctaButton}
              </button>

              <button
                onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
              >
                {content.learnMore}
              </button>
            </motion.div>

            <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[StarIcon, CrownIcon, DiamondIcon].map((Icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="w-16 h-16 mx-auto text-gt-gold opacity-30"
                >
                  <Icon />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gt-gold rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-gt-gold rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* PLANES */}
      <section id="plans" className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-voga font-bold text-white mb-4">{content.plansTitle}</h2>
            <p className="text-xl text-gray-300">{content.plansSubtitle}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border-2 
                            ${plan.popular ? 'border-gt-gold scale-105' : plan.borderColor}
                            hover:scale-105 transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-6 py-2 bg-gradient-to-r from-gt-gold to-yellow-600 text-black rounded-full text-sm font-bold">
                        {content.mostPopular}
                      </span>
                    </div>
                  )}

                  <div className={`w-20 h-20 mx-auto mb-6 text-transparent bg-gradient-to-r ${plan.color} bg-clip-text`}>
                    <Icon />
                  </div>

                  <h3 className="text-3xl font-voga font-bold text-white mb-2 text-center">{plan.name}</h3>

                  {/* Precios removidos por solicitud del cliente */}

                  <p className="text-gray-300 text-center mb-8">{plan.description}</p>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-6 h-6 text-gt-gold mt-0.5 flex-shrink-0">
                          <CheckCircleIcon />
                        </div>
                        <span className="ml-3 text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300
                              ${plan.popular
                        ? 'bg-gt-gold text-black hover:bg-gt-gold-light hover:scale-105 shadow-lg shadow-gt-gold/50'
                        : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                      }`}
                  >
                    {content.selectPlan}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}

      {/* STATS SECTION */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="text-5xl md:text-6xl font-voga font-bold text-gt-gold mb-2">200+</div>
              <div className="text-gray-300 text-lg">{language === 'es' ? 'Miembros' : 'Members'}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center">
              <div className="text-5xl md:text-6xl font-voga font-bold text-gt-gold mb-2">50+</div>
              <div className="text-gray-300 text-lg">{language === 'es' ? 'Eventos' : 'Events'}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
              <div className="text-5xl md:text-6xl font-voga font-bold text-gt-gold mb-2">200+</div>
              <div className="text-gray-300 text-lg">{language === 'es' ? 'Coches' : 'Cars'}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center">
              <div className="text-5xl md:text-6xl font-voga font-bold text-gt-gold mb-2">3+</div>
              <div className="text-gray-300 text-lg">{language === 'es' ? 'Países' : 'Countries'}</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="benefits" className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/30 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-voga font-bold text-white mb-4">{content.benefitsTitle}</h2>
            <p className="text-xl text-gray-300">{content.benefitsSubtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-gt-gold/50 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 text-gt-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon />
                  </div>
                  <h3 className="text-2xl font-voga font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TABLA COMPARACIÓN */}

      {/* Sección eliminada por solicitud del cliente */}

      {/* FORMULARIO */}
      {showForm && !success && (
        <section id="membership-form" className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/30 to-transparent">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10"
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-voga font-bold text-white mb-4">{content.formTitle}</h2>
                <p className="text-xl text-gray-300 mb-6">{content.formSubtitle}</p>

                <div className="inline-flex items-center px-6 py-3 rounded-xl bg-gt-gold/20 border border-gt-gold/30">
                  <span className="text-gt-gold font-semibold">
                    {language === 'es' ? 'Plan seleccionado: ' : 'Selected plan: '}
                    {plans.find(p => p.id === selectedPlan)?.name}
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">

                {/* INFORMACIÓN PERSONAL */}
                <div>
                  <h3 className="text-2xl font-voga font-bold text-white mb-4">{content.personalInfo}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">{content.firstName} *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{content.lastName} *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{content.email} *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{content.phone} *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">{content.birthDate}</label>
                      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                {/* DIRECCIÓN */}
                <div>
                  <h3 className="text-2xl font-voga font-bold text-white mb-4">{content.addressInfo}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">{content.address}</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{content.city}</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{content.postalCode}</label>
                      <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">{content.country}</label>
                      <input type="text" name="country" value={formData.country} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                {/* INFORMACIÓN ADICIONAL */}
                <div>
                  <h3 className="text-2xl font-voga font-bold text-white mb-4">{content.additionalInfo}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">{content.livesInMarbella}</label>
                      <select name="livesInMarbella" value={formData.livesInMarbella} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors">
                        <option value="yes">{content.livesYes}</option>
                        <option value="no">{content.livesNo}</option>
                        <option value="secondary">{content.livesSecondary}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{content.numberOfCars}</label>
                      <select name="numberOfCars" value={formData.numberOfCars} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5-10">5-10</option>
                        <option value="10+">10+</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">{content.carOwned}</label>
                      <input type="text" name="carOwned" value={formData.carOwned} onChange={handleInputChange}
                        placeholder="Ferrari 488, Porsche 911, etc..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">{content.howDidYouHear}</label>
                      <select name="howDidYouHear" value={formData.howDidYouHear} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors">
                        <option value="friend">{content.hearFriend}</option>
                        <option value="google">{content.hearGoogle}</option>
                        <option value="instagram-post">{content.hearInstagramPost}</option>
                        <option value="instagram-ad">{content.hearInstagramAd}</option>
                        <option value="other">{content.hearOther}</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">{content.additionalNotes}</label>
                      <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} rows="3"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors resize-none" />
                    </div>
                  </div>
                </div>

                {/* INTENCIÓN COCHE */}
                <div>
                  <h3 className="text-2xl font-voga font-bold text-white mb-4">{content.carIntentionTitle}</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {['none', 'buy', 'sell'].map((option) => (
                      <label key={option}
                        className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                                  ${formData.carIntention === option
                            ? 'bg-gt-gold/20 border-gt-gold text-gt-gold'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'}`}>
                        <input type="radio" name="carIntention" value={option} checked={formData.carIntention === option} onChange={handleInputChange} className="hidden" />
                        <span className="font-semibold">
                          {option === 'none' && content.carIntentionNone}
                          {option === 'buy' && content.carIntentionBuy}
                          {option === 'sell' && content.carIntentionSell}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* FORMULARIO VENDER */}
                {formData.carIntention === 'sell' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                    <h3 className="text-2xl font-voga font-bold text-white mb-4">{content.sellCarTitle}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarBrand}</label>
                        <input type="text" name="sellCarBrand" value={formData.sellCarBrand} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarModel}</label>
                        <input type="text" name="sellCarModel" value={formData.sellCarModel} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 mb-2">{content.sellCarVersion}</label>
                        <input type="text" name="sellCarVersion" value={formData.sellCarVersion} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarYear}</label>
                        <input type="number" name="sellCarYear" value={formData.sellCarYear} onChange={handleInputChange} min="1900" max="2030"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarKm}</label>
                        <input type="number" name="sellCarKm" value={formData.sellCarKm} onChange={handleInputChange} min="0"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarFuel}</label>
                        <select name="sellCarFuel" value={formData.sellCarFuel} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors">
                          <option value="gasoline">{content.fuelGasoline}</option>
                          <option value="diesel">{content.fuelDiesel}</option>
                          <option value="electric">{content.fuelElectric}</option>
                          <option value="hybrid">{content.fuelHybrid}</option>
                          <option value="plug-in-hybrid">{content.fuelPluginHybrid}</option>
                          <option value="gas">{content.fuelGas}</option>
                          <option value="other">{content.fuelOther}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarPowerCV}</label>
                        <input type="number" name="sellCarPowerCV" value={formData.sellCarPowerCV} onChange={handleCVChange} min="0"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarPowerKW}</label>
                        <input type="number" name="sellCarPowerKW" value={formData.sellCarPowerKW} readOnly
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors opacity-60" />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarTransmission}</label>
                        <select name="sellCarTransmission" value={formData.sellCarTransmission} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors">
                          <option value="manual">{content.transManual}</option>
                          <option value="automatic">{content.transAutomatic}</option>
                          <option value="semi-automatic">{content.transSemiAuto}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarDoors}</label>
                        <select name="sellCarDoors" value={formData.sellCarDoors} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors">
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarColor}</label>
                        <input type="text" name="sellCarColor" value={formData.sellCarColor} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarVIN}</label>
                        <input type="text" name="sellCarVIN" value={formData.sellCarVIN} onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">{content.sellCarPrice}</label>
                        <input type="number" name="sellCarPrice" value={formData.sellCarPrice} onChange={handleInputChange} min="0" step="100"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 mb-2">{content.sellCarNotes}</label>
                        <textarea name="sellCarNotes" value={formData.sellCarNotes} onChange={handleInputChange} rows="4"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors resize-none" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* FORMULARIO COMPRAR */}
                {formData.carIntention === 'buy' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                    <h3 className="text-2xl font-voga font-bold text-white mb-4">{content.buyCarTitle}</h3>
                    <div>
                      <label className="block text-gray-300 mb-2">{content.buyCarDescription}</label>
                      <textarea name="buyCarDescription" value={formData.buyCarDescription} onChange={handleInputChange} rows="8"
                        placeholder={language === 'es' ? 'Ej: Busco Ferrari 488 GTB en rojo, año 2018 o posterior, menos de 20,000 km, presupuesto hasta €280,000...' : 'Ex: Looking for Ferrari 488 GTB in red, year 2018 or newer, less than 20,000 km, budget up to €280,000...'}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors resize-none" />
                    </div>
                  </motion.div>
                )}

                {/* CONTRASEÑA */}
                <div>
                  <h3 className="text-2xl font-voga font-bold text-white mb-4">{content.accountInfo}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">{content.password} *</label>
                      <input type="password" name="password" value={formData.password} onChange={handleInputChange} required minLength={8}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{content.confirmPassword} *</label>
                      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required minLength={8}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gt-gold focus:outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                {/* CHECKBOXES */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleInputChange} required
                      className="mt-1 mr-3 w-5 h-5 text-gt-gold bg-white/5 border-white/10 rounded focus:ring-gt-gold focus:ring-offset-0" />
                    <label className="text-gray-300">
                      {language === 'es' ? 'Acepto los ' : 'I accept the '}
                      <Link to="/terms" target="_blank" className="text-gt-gold hover:underline">
                        {language === 'es' ? 'términos y condiciones' : 'terms and conditions'}
                      </Link>
                      {' *'}
                    </label>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" name="acceptMarketing" checked={formData.acceptMarketing} onChange={handleInputChange}
                      className="mt-1 mr-3 w-5 h-5 text-gt-gold bg-white/5 border-white/10 rounded focus:ring-gt-gold focus:ring-offset-0" />
                    <label className="text-gray-300">{content.acceptMarketing}</label>
                  </div>
                </div>

                {/* BOTONES */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button type="submit" disabled={loading}
                    className="flex-1 py-4 bg-gt-gold text-black rounded-xl font-semibold text-lg hover:bg-gt-gold-light hover:scale-105 transition-all duration-300 shadow-lg shadow-gt-gold/50 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? content.submitting : content.submitButton}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setSelectedPlan(null); }}
                    className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                    {language === 'es' ? 'Cancelar' : 'Cancel'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      )}

      {/* ÉXITO */}
      {success && (
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-gt-gold/50 text-center">
              <div className="w-24 h-24 mx-auto mb-6 text-gt-gold"><CheckCircleIcon /></div>
              <h2 className="text-4xl font-voga font-bold text-white mb-4">{content.successTitle}</h2>
              <p className="text-xl text-gray-300 mb-8">{content.successMessage}</p>
              <button onClick={() => { setSuccess(false); setShowForm(false); setSelectedPlan(null); document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="px-10 py-4 bg-gt-gold text-black rounded-xl font-semibold text-lg hover:bg-gt-gold-light hover:scale-105 transition-all duration-300 shadow-lg shadow-gt-gold/50">
                {content.backToPlans}
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* TESTIMONIOS */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/30 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-voga font-bold text-white mb-4">{content.testimonialsTitle}</h2>
            <p className="text-xl text-gray-300">{content.testimonialsSubtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-gt-gold"><StarIcon /></div>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-voga font-bold text-white mb-4">{content.faqTitle}</h2>
            <p className="text-xl text-gray-300">{content.faqSubtitle}</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden hover:border-gt-gold/50 transition-all duration-300 group">
                <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between">
                  <span className="text-xl font-semibold text-white group-hover:text-gt-gold transition-colors">{faq.question}</span>
                  <span className="text-gt-gold text-2xl">+</span>
                </summary>
                <div className="px-6 pb-4 text-gray-300">{faq.answer}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gt-gold/5 to-transparent" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-2xl rounded-3xl p-12 md:p-16 border border-white/10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 text-gt-gold"><CrownIcon /></div>
            <h2 className="text-4xl md:text-5xl font-voga font-bold text-white mb-6">{content.ctaTitle}</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">{content.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-10 py-5 bg-gt-gold text-black rounded-xl font-semibold text-lg hover:bg-gt-gold-light hover:scale-105 transition-all duration-300 shadow-lg shadow-gt-gold/50 w-full sm:w-auto">
                {content.ctaButton1}
              </button>
              <Link to="/contact" className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto text-center">
                {content.ctaButton2}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      {/* WHY CHOOSE US */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark/30 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-voga font-bold text-white mb-4">
              {language === 'es' ? '¿Por Qué Elegirnos?' : 'Why Choose Us?'}
            </h2>
            <p className="text-xl text-gray-300">
              {language === 'es' ? 'La experiencia más exclusiva en la Costa del Sol' : 'The most exclusive experience on the Costa del Sol'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-gt-gold/50 transition-all duration-300">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-gt-gold to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-black font-bold text-2xl">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-voga font-bold text-white mb-3">
                    {language === 'es' ? 'Ubicación Privilegiada' : 'Prime Location'}
                  </h3>
                  <p className="text-gray-300">
                    {language === 'es'
                      ? 'En el corazón de Puerto Banús, rodeados de las mejores boutiques y restaurantes de la Costa del Sol'
                      : 'In the heart of Puerto Banús, surrounded by the best boutiques and restaurants on the Costa del Sol'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-gt-gold/50 transition-all duration-300">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-gt-gold to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-black font-bold text-2xl">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-voga font-bold text-white mb-3">
                    {language === 'es' ? 'Instalaciones de Lujo' : 'Luxury Facilities'}
                  </h3>
                  <p className="text-gray-300">
                    {language === 'es'
                      ? 'Más de 5,000m² de instalaciones premium con tecnología de última generación'
                      : 'Over 5,000m² of premium facilities with state-of-the-art technology'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-gt-gold/50 transition-all duration-300">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-gt-gold to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-black font-bold text-2xl">3</span>
                </div>
                <div>
                  <h3 className="text-2xl font-voga font-bold text-white mb-3">
                    {language === 'es' ? 'Equipo Experto' : 'Expert Team'}
                  </h3>
                  <p className="text-gray-300">
                    {language === 'es'
                      ? 'Profesionales certificados con décadas de experiencia en el mundo del motor'
                      : 'Certified professionals with decades of experience in the automotive world'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-gt-gold/50 transition-all duration-300">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-gt-gold to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-black font-bold text-2xl">4</span>
                </div>
                <div>
                  <h3 className="text-2xl font-voga font-bold text-white mb-3">
                    {language === 'es' ? 'Red Exclusiva' : 'Exclusive Network'}
                  </h3>
                  <p className="text-gray-300">
                    {language === 'es'
                      ? 'Acceso a una comunidad global de coleccionistas y entusiastas'
                      : 'Access to a global community of collectors and enthusiasts'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* JOURNEY TIMELINE */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-voga font-bold text-white mb-4">
              {language === 'es' ? 'Tu Camino a la Membresía' : 'Your Path to Membership'}
            </h2>
            <p className="text-xl text-gray-300">
              {language === 'es' ? 'Un proceso simple y exclusivo' : 'A simple and exclusive process'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
              <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gt-gold to-transparent -translate-x-4" />
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 text-center hover:border-gt-gold/50 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-gt-gold to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-black font-voga font-bold text-2xl">01</span>
                </div>
                <h3 className="text-2xl font-voga font-bold text-white mb-3">
                  {language === 'es' ? 'Solicitud' : 'Application'}
                </h3>
                <p className="text-gray-300">
                  {language === 'es' ? 'Completa el formulario online y selecciona tu plan' : 'Complete the online form and select your plan'}
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="relative">
              <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gt-gold to-transparent -translate-x-4" />
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 text-center hover:border-gt-gold/50 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-gt-gold to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-black font-voga font-bold text-2xl">02</span>
                </div>
                <h3 className="text-2xl font-voga font-bold text-white mb-3">
                  {language === 'es' ? 'Revisión' : 'Review'}
                </h3>
                <p className="text-gray-300">
                  {language === 'es' ? 'Nuestro equipo revisa tu solicitud en 24-48 horas' : 'Our team reviews your application within 24-48 hours'}
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative">
              <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gt-gold to-transparent -translate-x-4" />
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 text-center hover:border-gt-gold/50 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-gt-gold to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-black font-voga font-bold text-2xl">03</span>
                </div>
                <h3 className="text-2xl font-voga font-bold text-white mb-3">
                  {language === 'es' ? 'Visita' : 'Visit'}
                </h3>
                <p className="text-gray-300">
                  {language === 'es' ? 'Tour privado por nuestras instalaciones exclusivas' : 'Private tour of our exclusive facilities'}
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.45 }} className="relative">
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 text-center hover:border-gt-gold/50 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-gt-gold to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-black font-voga font-bold text-2xl">04</span>
                </div>
                <h3 className="text-2xl font-voga font-bold text-white mb-3">
                  {language === 'es' ? 'Bienvenida' : 'Welcome'}
                </h3>
                <p className="text-gray-300">
                  {language === 'es' ? 'Recibe tu kit de bienvenida y accede a todos los beneficios' : 'Receive your welcome kit and access all benefits'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Membership;
