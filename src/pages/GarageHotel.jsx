import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseAsset } from '../hooks/useSupabaseAsset';
import { supabase } from '../../supabase/supabaseClient';

// ============================================
// ICONOS SVG ANIMADOS
// ============================================

const ClimateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M12 2C8 2 5 5 5 9c0 2 1 4 2 5v5c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-5c1-1 2-3 2-5 0-4-3-7-7-7z"
      fill="currentColor"
      opacity="0.2"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <path
      d="M12 2C8 2 5 5 5 9c0 2 1 4 2 5v5c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-5c1-1 2-3 2-5 0-4-3-7-7-7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <motion.line
      x1="12"
      y1="9"
      x2="12"
      y2="16"
      stroke="currentColor"
      strokeWidth="2"
      animate={{ y1: [9, 11, 9], y2: [16, 14, 16] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

const SecurityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M12 2L4 6v6c0 5 3 9 8 10 5-1 8-5 8-10V6l-8-4z"
      fill="currentColor"
      opacity="0.2"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <path
      d="M12 2L4 6v6c0 5 3 9 8 10 5-1 8-5 8-10V6l-8-4z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <motion.path
      d="M9 12l2 2 4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
    />
  </svg>
);

const WorkshopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M14.7 6.3l3.7 3.7-9.4 9.4-3.7-3.7 9.4-9.4z"
      fill="currentColor"
      opacity="0.2"
      animate={{ rotate: [0, 5, 0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      style={{ transformOrigin: "center" }}
    />
    <path
      d="M14.7 6.3C15.1 5.9 15.7 5.9 16.1 6.3L19.8 10C20.2 10.4 20.2 11 19.8 11.4L10.4 20.8C10 21.2 9.4 21.2 9 20.8L5.3 17.1C4.9 16.7 4.9 16.1 5.3 15.7L14.7 6.3Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line x1="11" y1="3" x2="13" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="3" y1="11" x2="5" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LogisticsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M3 6h18M3 12h18M3 18h18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      animate={{ x: [0, 3, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.circle
      cx="19"
      cy="12"
      r="2"
      fill="currentColor"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

const DetailingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.circle
      cx="12"
      cy="12"
      r="8"
      fill="currentColor"
      opacity="0.2"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <motion.circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="1.5"
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
    />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <motion.line
        key={i}
        x1="12"
        y1="12"
        x2={12 + Math.cos((angle * Math.PI) / 180) * 7}
        y2={12 + Math.sin((angle * Math.PI) / 180) * 7}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </svg>
);

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const GarageHotel = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // ============================================
  // ASSETS DESDE SUPABASE
  // ============================================
  
  // Videos
  const { url: heroVideoUrl } = useSupabaseAsset('videos/Taller.mp4');
  const { url: garageVideoUrl } = useSupabaseAsset('videos/garage.mp4');
  
  // Imágenes del garaje
  const { url: garageImg1 } = useSupabaseAsset('gallery/garage-plataformas.webp');
  const { url: garageImg2 } = useSupabaseAsset('gallery/lucescirculares.webp');
  const { url: garageImg3 } = useSupabaseAsset('services/garage2.webp');
  const { url: garageImg4 } = useSupabaseAsset('services/taller-garage.webp');
  const { url: garageImg5 } = useSupabaseAsset('club/venta-countach.webp');
  const { url: garageImg6 } = useSupabaseAsset('services/garage3.webp');

  // ============================================
  // TRADUCCIONES
  // ============================================
  
  const translations = {
    es: {
      // SEO
      seoTitle: 'Car Hotel Premium Marbella | Garaje de Lujo 5 Estrellas | GT Race',
      seoDescription: 'Hotel de 5 estrellas para tu coche de lujo en Marbella. Instalaciones climatizadas, taller propio, logística completa y cuidado premium 24/7.',
      seoKeywords: 'car hotel marbella, garaje lujo marbella, storage premium marbella, almacenamiento coches marbella, taller propio marbella, car storage costa del sol',
      
      // Hero
      hero: {
        badge: 'Car Hotel Premium',
        title: 'Hotel de 5 Estrellas',
        subtitle: 'para tu Vehículo de Lujo',
        description: 'Instalaciones de última generación climatizadas que funcionan como un verdadero hotel de cinco estrellas para automóviles premium.',
        cta1: 'Reservar Plaza',
        cta2: 'Ver Servicios'
      },
      
      // Intro
      intro: {
        title: 'Tu coche merece lo mejor',
        subtitle: 'Servicios integrales para que solo te preocupes del placer de conducir',
        p1: 'En GT Race Marbella, proporcionamos una suite completa de servicios diseñados para que te concentres únicamente en el placer de conducir tu vehículo de lujo.',
        p2: 'Nuestras amplias instalaciones de última generación, climatizadas, funcionan como un verdadero hotel de cinco estrellas para automóviles premium.'
      },
      
      // Services
      services: {
        title: 'Servicios Premium',
        subtitle: 'Todo lo que tu vehículo necesita en un solo lugar',
        climate: {
          title: 'Control Climático',
          description: 'Temperatura y humedad perfectamente controladas las 24 horas para preservar tu vehículo en condiciones óptimas.'
        },
        security: {
          title: 'Seguridad Total',
          description: 'Vigilancia 24/7, acceso controlado y sistemas de alarma avanzados. Tu tranquilidad es nuestra prioridad.'
        },
        workshop: {
          title: 'Taller Propio',
          description: 'Acceso prioritario a servicios de reparación y mantenimiento de alta calidad en nuestro taller profesional dentro de las instalaciones.'
        },
        logistics: {
          title: 'Logística Completa',
          description: 'Gestionamos todo el proceso: recogida, supervisión del trabajo y devolución. Tu coche siempre impecable.'
        },
        detailing: {
          title: 'Detailing Premium',
          description: 'Tu vehículo siempre te será devuelto pulido, preparado y listo para conducir en condiciones perfectas.'
        }
      },
      
      // Process
      process: {
        title: 'Cómo Funciona',
        subtitle: 'Un proceso simple y sin preocupaciones',
        step1: {
          title: 'Reserva tu Plaza',
          description: 'Contacta con nosotros y reserva tu espacio VIP en nuestro garaje premium.'
        },
        step2: {
          title: 'Entrega o Recogida',
          description: 'Trae tu vehículo o nosotros lo recogemos. Tú decides la opción más cómoda.'
        },
        step3: {
          title: 'Cuidado Profesional',
          description: 'Nos encargamos de todo: almacenamiento, mantenimiento, limpieza y supervisión constante.'
        },
        step4: {
          title: 'Listo para Conducir',
          description: 'Recoge tu vehículo impecable o te lo llevamos. Siempre perfecto y listo para disfrutar.'
        }
      },
      
      // Features
      features: {
        title: 'Por qué GT Race Garage',
        subtitle: 'La excelencia en cada detalle',
        feature1: 'Control total y excelencia',
        feature2: 'Instalaciones de última generación',
        feature3: 'Taller profesional en las instalaciones',
        feature4: 'Gestión logística completa',
        feature5: 'Acabado impecable garantizado',
        feature6: 'Servicio personalizado VIP'
      },
      
      // Gallery
      gallery: {
        title: 'Nuestras Instalaciones',
        subtitle: 'Un vistazo a nuestro garaje de 5 estrellas'
      },
      
      // Form
      form: {
        title: 'Reserva tu Plaza',
        subtitle: 'Completa el formulario y nos pondremos en contacto contigo',
        name: 'Nombre completo',
        email: 'Email',
        phone: 'Teléfono',
        vehicle: 'Vehículo',
        vehiclePlaceholder: 'Ferrari 488, Porsche 911, etc.',
        message: 'Mensaje (opcional)',
        messagePlaceholder: 'Cuéntanos tus necesidades específicas...',
        submit: 'Solicitar Información',
        sending: 'Enviando...',
        success: '¡Solicitud enviada!',
        successMsg: 'Gracias por tu interés. Nos pondremos en contacto contigo pronto.',
        error: 'Error al enviar',
        errorMsg: 'Hubo un problema. Por favor, inténtalo de nuevo.'
      },
      
      // CTA
      cta: {
        title: '¿Listo para dar a tu coche el cuidado que merece?',
        subtitle: 'Únete a los propietarios más exigentes que confían en GT Race Marbella',
        button: 'Contactar Ahora'
      }
    },
    en: {
      // SEO
      seoTitle: 'Premium Car Hotel Marbella | 5-Star Luxury Garage | GT Race',
      seoDescription: '5-star hotel for your luxury car in Marbella. Climate-controlled facilities, in-house workshop, complete logistics and premium 24/7 care.',
      seoKeywords: 'car hotel marbella, luxury garage marbella, premium storage marbella, car storage marbella, in-house workshop marbella, car storage costa del sol',
      
      // Hero
      hero: {
        badge: 'Premium Car Hotel',
        title: '5-Star Hotel',
        subtitle: 'for Your Luxury Vehicle',
        description: 'State-of-the-art climate-controlled facilities that function as a true five-star hotel for premium automobiles.',
        cta1: 'Reserve Space',
        cta2: 'View Services'
      },
      
      // Intro
      intro: {
        title: 'Your car deserves the best',
        subtitle: 'Comprehensive services so you focus solely on the pleasure of driving',
        p1: 'At GT Race Marbella, we provide a comprehensive suite of services tailored to ensure you focus solely on the pleasure of driving your luxury vehicle.',
        p2: 'Our expansive, state-of-the-art, climate-controlled facilities function as a true five-star hotel for premium automobiles.'
      },
      
      // Services
      services: {
        title: 'Premium Services',
        subtitle: 'Everything your vehicle needs in one place',
        climate: {
          title: 'Climate Control',
          description: 'Perfectly controlled temperature and humidity 24 hours a day to preserve your vehicle in optimal conditions.'
        },
        security: {
          title: 'Total Security',
          description: '24/7 surveillance, controlled access and advanced alarm systems. Your peace of mind is our priority.'
        },
        workshop: {
          title: 'In-House Workshop',
          description: 'Priority access to high-quality repair and maintenance services in our professional workshop within our facilities.'
        },
        logistics: {
          title: 'Complete Logistics',
          description: 'We handle the entire process: collection, work supervision and return. Your car always impeccable.'
        },
        detailing: {
          title: 'Premium Detailing',
          description: 'Your car will always be returned polished, prepared, and ready to drive in perfect condition.'
        }
      },
      
      // Process
      process: {
        title: 'How It Works',
        subtitle: 'A simple and worry-free process',
        step1: {
          title: 'Reserve Your Space',
          description: 'Contact us and reserve your VIP space in our premium garage.'
        },
        step2: {
          title: 'Drop-off or Collection',
          description: 'Bring your vehicle or we collect it. You choose the most convenient option.'
        },
        step3: {
          title: 'Professional Care',
          description: 'We take care of everything: storage, maintenance, cleaning and constant supervision.'
        },
        step4: {
          title: 'Ready to Drive',
          description: 'Pick up your impeccable vehicle or we deliver it. Always perfect and ready to enjoy.'
        }
      },
      
      // Features
      features: {
        title: 'Why GT Race Garage',
        subtitle: 'Excellence in every detail',
        feature1: 'Complete control and excellence',
        feature2: 'State-of-the-art facilities',
        feature3: 'Professional workshop on-site',
        feature4: 'Complete logistics management',
        feature5: 'Impeccable finish guaranteed',
        feature6: 'VIP personalized service'
      },
      
      // Gallery
      gallery: {
        title: 'Our Facilities',
        subtitle: 'A glimpse of our 5-star garage'
      },
      
      // Form
      form: {
        title: 'Reserve Your Space',
        subtitle: 'Complete the form and we will contact you',
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        vehicle: 'Vehicle',
        vehiclePlaceholder: 'Ferrari 488, Porsche 911, etc.',
        message: 'Message (optional)',
        messagePlaceholder: 'Tell us your specific needs...',
        submit: 'Request Information',
        sending: 'Sending...',
        success: 'Request sent!',
        successMsg: 'Thank you for your interest. We will contact you soon.',
        error: 'Error sending',
        errorMsg: 'There was a problem. Please try again.'
      },
      
      // CTA
      cta: {
        title: 'Ready to give your car the care it deserves?',
        subtitle: 'Join the most demanding owners who trust GT Race Marbella',
        button: 'Contact Now'
      }
    }
  };

  const t = translations[language];

  // Galería de imágenes
  const galleryImages = [
    { url: garageImg1, alt: 'Garage Platforms' },
    { url: garageImg2, alt: 'LED Lighting' },
    { url: garageImg3, alt: 'Multicolor Garage' },
    { url: garageImg4, alt: 'Workshop Area' },
    { url: garageImg5, alt: 'Luxury Vehicles' },
    { url: garageImg6, alt: 'Premium Care' }
  ];

  // Servicios
  const services = [
    {
      icon: <ClimateIcon />,
      title: t.services.climate.title,
      description: t.services.climate.description,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: <SecurityIcon />,
      title: t.services.security.title,
      description: t.services.security.description,
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30'
    },
    {
      icon: <WorkshopIcon />,
      title: t.services.workshop.title,
      description: t.services.workshop.description,
      color: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30'
    },
    {
      icon: <LogisticsIcon />,
      title: t.services.logistics.title,
      description: t.services.logistics.description,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: <DetailingIcon />,
      title: t.services.detailing.title,
      description: t.services.detailing.description,
      color: 'from-gt-gold/20 to-yellow-500/20',
      borderColor: 'border-gt-gold/30'
    }
  ];

  // Process steps
  const processSteps = [
    {
      number: '01',
      title: t.process.step1.title,
      description: t.process.step1.description
    },
    {
      number: '02',
      title: t.process.step2.title,
      description: t.process.step2.description
    },
    {
      number: '03',
      title: t.process.step3.title,
      description: t.process.step3.description
    },
    {
      number: '04',
      title: t.process.step4.title,
      description: t.process.step4.description
    }
  ];

  // Features
  const features = [
    t.features.feature1,
    t.features.feature2,
    t.features.feature3,
    t.features.feature4,
    t.features.feature5,
    t.features.feature6
  ];

  // Handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase
        .from('garage_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicle: formData.vehicle,
          message: formData.message || null,
          language: language,
          status: 'pending'
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', vehicle: '', message: '' });
      
      setTimeout(() => {
        document.getElementById('success-message')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* ============================================ */}
      {/* SEO - HELMET */}
      {/* ============================================ */}
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDescription} />
        <meta name="keywords" content={t.seoKeywords} />
        
        {/* Open Graph */}
        <meta property="og:title" content={t.seoTitle} />
        <meta property="og:description" content={t.seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gtracemarbella.com/garage" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.seoTitle} />
        <meta name="twitter:description" content={t.seoDescription} />
      </Helmet>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        {heroVideoUrl && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gt-gold rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: -20,
                opacity: Math.random() * 0.5
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 20,
                opacity: [null, Math.random() * 0.5, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gt-gold/10 backdrop-blur-xl 
                         border border-gt-gold/30 rounded-full mb-6 sm:mb-8"
            >
              <span className="text-gt-gold font-march font-semibold text-xs sm:text-sm uppercase tracking-widest">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-march font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl"
            >
              {t.hero.title}
              <span className="block text-gt-gold mt-2">{t.hero.subtitle}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
            >
              <a
                href="#form"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gt-gold text-black rounded-xl
                           font-semibold text-base sm:text-lg
                           hover:bg-gt-gold-light hover:scale-105
                           transition-all duration-300 shadow-lg hover:shadow-gt-gold/50"
              >
                {t.hero.cta1}
              </a>
              
              <a
                href="#services"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-xl
                           border border-white/20 text-white rounded-xl
                           font-semibold text-base sm:text-lg
                           hover:bg-white/20 hover:border-gt-gold/50
                           transition-all duration-300"
              >
                {t.hero.cta2}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-gt-gold/50 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gt-gold rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* INTRO SECTION */}
      {/* ============================================ */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-black to-gt-gray-dark">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-march font-bold text-white mb-6">
              {t.intro.title}
            </h2>
            <p className="text-lg sm:text-xl text-gt-gold mb-8">
              {t.intro.subtitle}
            </p>
            <div className="space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              <p>{t.intro.p1}</p>
              <p>{t.intro.p2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICES SECTION */}
      {/* ============================================ */}
      <section id="services" className="py-16 sm:py-24 px-4 bg-gt-gray-dark">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-march font-bold text-white mb-4">
              {t.services.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              {t.services.subtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`bg-gradient-to-br ${service.color} backdrop-blur-xl
                           border ${service.borderColor} rounded-2xl p-6 sm:p-8
                           transition-all duration-300 group`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 text-gt-gold mb-6
                               transform group-hover:scale-110 group-hover:rotate-6
                               transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-march font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROCESS SECTION */}
      {/* ============================================ */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-gt-gray-dark to-black">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-march font-bold text-white mb-4">
              {t.process.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              {t.process.subtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-gt-gold to-yellow-600
                                 rounded-full flex items-center justify-center
                                 shadow-lg shadow-gt-gold/50">
                    <span className="text-3xl sm:text-4xl font-march font-bold text-black">
                      {step.number}
                    </span>
                  </div>
                  
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5
                                    bg-gradient-to-r from-gt-gold/50 to-transparent -translate-y-1/2" />
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-march font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* GALLERY SECTION */}
      {/* ============================================ */}
      <section className="py-16 sm:py-24 px-4 bg-black">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-march font-bold text-white mb-4">
              {t.gallery.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              {t.gallery.subtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer"
              >
                {image.url && (
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700
                               group-hover:scale-110"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6
                               transform translate-y-full group-hover:translate-y-0
                               transition-transform duration-300">
                  <p className="text-white text-sm sm:text-base font-semibold">
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video si existe */}
          {garageVideoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 sm:mt-12"
            >
              <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden">
                <video
                  src={garageVideoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURES SECTION */}
      {/* ============================================ */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-black to-gt-gray-dark">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-march font-bold text-white mb-4">
              {t.features.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              {t.features.subtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-xl
                           border border-white/10 rounded-xl p-4 sm:p-6
                           hover:border-gt-gold/30 transition-all duration-300"
              >
                <div className="w-3 h-3 rounded-full bg-gt-gold flex-shrink-0" />
                <p className="text-sm sm:text-base text-white font-medium">
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FORM SECTION */}
      {/* ============================================ */}
      <section id="form" className="py-16 sm:py-24 px-4 bg-gt-gray-dark">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-march font-bold text-white mb-4">
              {t.form.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              {t.form.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10
                       rounded-2xl p-6 sm:p-8 md:p-12"
          >
            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.div
                id="success-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-green-500 font-semibold mb-1">{t.form.success}</h4>
                    <p className="text-gray-300 text-sm">{t.form.successMsg}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-red-500 font-semibold mb-1">{t.form.error}</h4>
                    <p className="text-gray-300 text-sm">{t.form.errorMsg}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {t.form.name} *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 text-sm sm:text-base
                             focus:outline-none focus:border-gt-gold/50 transition-colors"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2 text-sm sm:text-base">
                    {t.form.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                               text-white placeholder-gray-500 text-sm sm:text-base
                               focus:outline-none focus:border-gt-gold/50 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-2 text-sm sm:text-base">
                    {t.form.phone} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                               text-white placeholder-gray-500 text-sm sm:text-base
                               focus:outline-none focus:border-gt-gold/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="vehicle" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {t.form.vehicle} *
                </label>
                <input
                  type="text"
                  id="vehicle"
                  required
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  placeholder={t.form.vehiclePlaceholder}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 text-sm sm:text-base
                             focus:outline-none focus:border-gt-gold/50 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {t.form.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.form.messagePlaceholder}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 text-sm sm:text-base
                             focus:outline-none focus:border-gt-gold/50 transition-colors
                             resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl
                           font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg
                           ${isSubmitting
                             ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                             : 'bg-gt-gold text-black hover:bg-gt-gold-light hover:scale-105 hover:shadow-gt-gold/50'
                           }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t.form.sending}
                  </span>
                ) : (
                  t.form.submit
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA FINAL */}
      {/* ============================================ */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        {garageImg2 && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${garageImg2})` }}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        
        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-march font-bold text-white mb-6 drop-shadow-2xl">
              {t.cta.title}
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-12 leading-relaxed">
              {t.cta.subtitle}
            </p>

            <Link
              to="/contact"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gt-gold text-black rounded-xl
                         font-semibold text-base sm:text-lg
                         hover:bg-gt-gold-light hover:scale-105
                         transition-all duration-300 shadow-2xl hover:shadow-gt-gold/50"
            >
              {t.cta.button}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GarageHotel;