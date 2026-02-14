import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

// ============================================
// ICONOS SVG PERSONALIZADOS ANIMADOS
// ============================================

const CarHotelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      fill="currentColor"
      opacity="0.2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.path
      d="M9 22V12H15V22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
  </svg>
);

const WorkshopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M14.7 6.3C15.1 5.9 15.7 5.9 16.1 6.3L17.7 7.9C18.1 8.3 18.1 8.9 17.7 9.3L9.3 17.7C8.9 18.1 8.3 18.1 7.9 17.7L6.3 16.1C5.9 15.7 5.9 15.1 6.3 14.7L14.7 6.3Z"
      fill="currentColor"
      opacity="0.2"
      animate={{ rotate: [0, 15, -15, 0] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
    />
    <motion.path
      d="M14.7 6.3C15.1 5.9 15.7 5.9 16.1 6.3L17.7 7.9C18.1 8.3 18.1 8.9 17.7 9.3L9.3 17.7C8.9 18.1 8.3 18.1 7.9 17.7L6.3 16.1C5.9 15.7 5.9 15.1 6.3 14.7L14.7 6.3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <motion.path
      d="M11 3L13 5M3 11L5 13M18 11L20 13M11 18L13 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

const WrappingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M12 2L4 10V14L12 22L20 14V10L12 2Z"
      fill="currentColor"
      opacity="0.2"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.path
      d="M12 2L4 10V14L12 22L20 14V10L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2 }}
    />
    <motion.circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

const DetailingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z"
      fill="currentColor"
      opacity="0.2"
      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.path
      d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      d="M19 15L20 18L23 19L20 20L19 23L18 20L15 19L18 18L19 15Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </svg>
);

const RacingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <motion.path
      d="M5 13L7 7H17L19 13M5 13H19M5 13L4 17M19 13L20 17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <motion.circle
      cx="8"
      cy="17"
      r="2"
      fill="currentColor"
      opacity="0.2"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <motion.circle
      cx="8"
      cy="17"
      r="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <motion.circle
      cx="16"
      cy="17"
      r="2"
      fill="currentColor"
      opacity="0.2"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <motion.circle
      cx="16"
      cy="17"
      r="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <motion.path
      d="M8 7L10 4M14 7L16 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
  </svg>
);

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const Services = () => {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const content = {
    es: {
      badge: 'Nuestros Servicios',
      title: 'Excelencia en Cada Detalle',
      subtitle: 'Servicios premium diseñados para satisfacer todas las necesidades de tu superdeportivo. Desde almacenamiento de lujo hasta mantenimiento especializado.',
      videoTitle: 'Descubre GT Race Marbella',
      videoDescription: 'Un vistazo a nuestras instalaciones y servicios de clase mundial',
      servicesTitle: 'Servicios Premium',
      servicesSubtitle: 'Todo lo que tu vehículo de lujo necesita en un solo lugar',
      whyUs: 'Por Qué Elegirnos',
      cta: 'Solicitar Información',
      viewService: 'Ver Servicio',
      galleryTitle: 'Nuestras Instalaciones',
      testimonials: 'Testimonios',
    },
    en: {
      badge: 'Our Services',
      title: 'Excellence in Every Detail',
      subtitle: 'Premium services designed to meet all your supercar needs. From luxury storage to specialized maintenance.',
      videoTitle: 'Discover GT Race Marbella',
      videoDescription: 'A glimpse into our world-class facilities and services',
      servicesTitle: 'Premium Services',
      servicesSubtitle: 'Everything your luxury vehicle needs in one place',
      whyUs: 'Why Choose Us',
      cta: 'Request Information',
      viewService: 'View Service',
      galleryTitle: 'Our Facilities',
      testimonials: 'Testimonials',
    }
  };

  const t = content[language];

  // ============================================
  // DATOS DE SERVICIOS
  // ============================================

  const services = [
    {
      id: 'car-hotel',
      icon: <CarHotelIcon />,
      title: language === 'es' ? 'Car Hotel' : 'Car Hotel',
      description: language === 'es' 
        ? 'Hotel de 5 estrellas para tu vehículo. Seguridad 24/7, control climático e iluminación LED premium.'
        : '5-star hotel for your vehicle. 24/7 security, climate control, and premium LED lighting.',
      features: language === 'es'
        ? ['Seguridad 24/7', 'Control Climático', 'Plazas VIP Limitadas', 'Mantenimiento Incluido']
        : ['24/7 Security', 'Climate Control', 'Limited VIP Spaces', 'Maintenance Included'],
      link: '/services/car-hotel',
      gradient: 'from-purple-500/20 to-blue-500/20'
    },
    {
      id: 'workshop',
      icon: <WorkshopIcon />,
      title: language === 'es' ? 'Taller Premium' : 'Premium Workshop',
      description: language === 'es'
        ? 'Mantenimiento especializado para supercars. Mecánicos certificados y equipamiento de última generación.'
        : 'Specialized maintenance for supercars. Certified mechanics and state-of-the-art equipment.',
      features: language === 'es'
        ? ['Mecánicos Certificados', 'Diagnóstico Avanzado', 'Piezas Originales', 'Servicio Express']
        : ['Certified Mechanics', 'Advanced Diagnostics', 'Original Parts', 'Express Service'],
      link: '/services/workshop',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      id: 'wrapping',
      icon: <WrappingIcon />,
      title: language === 'es' ? 'Wrapping & PPF' : 'Wrapping & PPF',
      description: language === 'es'
        ? 'Vinilado profesional y protección PPF. Transforma y protege tu vehículo con los mejores materiales.'
        : 'Professional wrapping and PPF protection. Transform and protect your vehicle with the best materials.',
      features: language === 'es'
        ? ['Acabados Premium', 'Protección PPF', 'Diseños Custom', 'Garantía Extendida']
        : ['Premium Finishes', 'PPF Protection', 'Custom Designs', 'Extended Warranty'],
      link: '/services/wrapping',
      gradient: 'from-pink-500/20 to-purple-500/20'
    },
    {
      id: 'detailing',
      icon: <DetailingIcon />,
      title: language === 'es' ? 'Detailing' : 'Detailing',
      description: language === 'es'
        ? 'Detailing profesional completo. Devolvemos a tu vehículo el brillo y protección que merece.'
        : 'Complete professional detailing. We restore your vehicle to the shine and protection it deserves.',
      features: language === 'es'
        ? ['Car Wash Premium', 'Pulido Profesional', 'Tratamientos Cerámicos', 'Limpieza Interior']
        : ['Premium Car Wash', 'Professional Polishing', 'Ceramic Treatments', 'Interior Cleaning'],
      link: '/services/detailing',
      gradient: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      id: 'racing',
      icon: <RacingIcon />,
      title: language === 'es' ? 'Race Team' : 'Race Team',
      description: language === 'es'
        ? 'Preparación y soporte para circuito. Llevamos tu pasión por la velocidad al siguiente nivel.'
        : 'Track preparation and support. We take your passion for speed to the next level.',
      features: language === 'es'
        ? ['Preparación Circuito', 'Setup Personalizado', 'Soporte en Pista', 'Telemetría']
        : ['Track Preparation', 'Custom Setup', 'Track Support', 'Telemetry'],
      link: '/services/racing',
      gradient: 'from-yellow-500/20 to-orange-500/20'
    }
  ];

  // ============================================
  // IMÁGENES PLACEHOLDER PARA CARRUSEL
  // (El usuario las reemplazará después)
  // ============================================

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200',
      alt: language === 'es' ? 'Instalaciones GT Race' : 'GT Race Facilities'
    },
    {
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
      alt: language === 'es' ? 'Car Hotel Premium' : 'Premium Car Hotel'
    },
    {
      url: 'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?w=1200',
      alt: language === 'es' ? 'Taller Especializado' : 'Specialized Workshop'
    },
    {
      url: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=1200',
      alt: language === 'es' ? 'Wrapping Professional' : 'Professional Wrapping'
    },
    {
      url: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200',
      alt: language === 'es' ? 'Detailing Premium' : 'Premium Detailing'
    }
  ];

  // Auto-advance carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // ============================================
  // RAZONES PARA ELEGIRNOS
  // ============================================

  const reasons = [
    {
      number: '15+',
      label: language === 'es' ? 'Años de Experiencia' : 'Years of Experience'
    },
    {
      number: '500+',
      label: language === 'es' ? 'Clientes Satisfechos' : 'Satisfied Clients'
    },
    {
      number: '24/7',
      label: language === 'es' ? 'Soporte Disponible' : 'Support Available'
    },
    {
      number: '100%',
      label: language === 'es' ? 'Satisfacción Garantizada' : 'Satisfaction Guaranteed'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      
      {/* ============================================ */}
      {/* HERO SECTION CON VIDEO */}
      {/* ============================================ */}
      
      <section className="relative py-20 px-4 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background con efectos */}
        <div className="absolute inset-0 bg-gradient-to-b from-gt-gray-dark via-black to-black" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-gt-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gt-gold/5 rounded-full blur-3xl animate-pulse" 
             style={{animationDelay: '1s'}} />

        <div className="relative z-10 container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-6 py-3 bg-gt-gold/10 backdrop-blur-xl 
                         border border-gt-gold/30 rounded-full mb-6"
            >
              <span className="text-gt-gold font-voga font-semibold text-sm uppercase tracking-widest">
                {t.badge}
              </span>
            </motion.div>

            {/* Título Principal */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-voga font-bold text-white mb-6 
                         drop-shadow-2xl leading-tight">
              {t.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              {t.subtitle}
            </p>

            {/* Botones CTA */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/membership"
                className="px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold text-lg
                         hover:bg-gt-gold-light hover:scale-105 transition-all duration-300
                         shadow-lg shadow-gt-gold/50"
              >
                {language === 'es' ? 'Hazte Miembro' : 'Become a Member'}
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 
                         text-white rounded-xl font-semibold text-lg
                         hover:bg-white/10 hover:border-gt-gold/50 transition-all duration-300"
              >
                {t.cta}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN DE VIDEO */}
      {/* El usuario podrá reemplazar el video más tarde */}
      {/* ============================================ */}
      
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-voga font-bold text-white mb-4">
              {t.videoTitle}
            </h2>
            <p className="text-xl text-gray-300">
              {t.videoDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden 
                     border border-white/10 aspect-video group"
          >
            {/* PLACEHOLDER PARA VIDEO */}
            {/* El usuario reemplazará esto con su video */}
            
            {!isVideoPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gt-gold/20 to-black/80">
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="relative z-10 group/play"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 rounded-full bg-gt-gold flex items-center justify-center
                             shadow-2xl shadow-gt-gold/50 transition-all duration-300
                             group-hover/play:shadow-gt-gold/80"
                  >
                    <svg className="w-10 h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <p className="mt-4 text-white font-semibold">
                    {language === 'es' ? 'Reproducir Video' : 'Play Video'}
                  </p>
                </button>

                {/* Imagen de fondo placeholder */}
                <div className="absolute inset-0 -z-10">
                  <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200"
                    alt="GT Race Marbella"
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                {/* AQUÍ EL USUARIO PONDRÁ SU VIDEO */}
                {/* Ejemplo con iframe de YouTube/Vimeo: */}
                {/* <iframe 
                     src="TU_URL_DE_VIDEO" 
                     className="w-full h-full"
                     allow="autoplay; fullscreen"
                     allowFullScreen
                   ></iframe> */}
                
                {/* Por ahora, placeholder */}
                <div className="text-center text-white p-8">
                  <p className="text-2xl font-voga mb-4">
                    {language === 'es' ? '📹 Video Placeholder' : '📹 Video Placeholder'}
                  </p>
                  <p className="text-gray-400">
                    {language === 'es' 
                      ? 'Aquí irá tu video de presentación' 
                      : 'Your presentation video will go here'}
                  </p>
                  <button
                    onClick={() => setIsVideoPlaying(false)}
                    className="mt-4 px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {language === 'es' ? 'Cerrar' : 'Close'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* GRID DE SERVICIOS */}
      {/* ============================================ */}
      
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-voga font-bold text-white mb-4">
              {t.servicesTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.servicesSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10
                          hover:border-gt-gold/50 transition-all duration-300 group overflow-hidden`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icono */}
                  <div className="w-20 h-20 text-gt-gold mb-6 transform group-hover:scale-110 
                                transition-transform duration-300">
                    {service.icon}
                  </div>

                  {/* Título */}
                  <h3 className="text-2xl font-voga font-bold text-white mb-3">
                    {service.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-gt-gold"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-gt-gold font-semibold
                             hover:gap-4 transition-all duration-300"
                  >
                    {t.viewService}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CARRUSEL DE IMÁGENES */}
      {/* El usuario podrá reemplazar las imágenes más tarde */}
      {/* ============================================ */}
      
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-gt-gray-dark to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-voga font-bold text-white mb-4">
              {t.galleryTitle}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Carrusel */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-white/5 
                       backdrop-blur-2xl border border-white/10"
            >
              <img
                src={galleryImages[currentImageIndex].url}
                alt={galleryImages[currentImageIndex].alt}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay con info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
                            flex items-end">
                <div className="p-8 w-full">
                  <p className="text-white text-2xl font-voga">
                    {galleryImages[currentImageIndex].alt}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Controles del carrusel */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
                       bg-white/10 backdrop-blur-xl border border-white/20 text-white
                       hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
                       bg-white/10 backdrop-blur-xl border border-white/20 text-white
                       hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-gt-gold w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* POR QUÉ ELEGIRNOS */}
      {/* ============================================ */}
      
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-voga font-bold text-white mb-4">
              {t.whyUs}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10
                              hover:border-gt-gold/50 transition-all duration-300">
                  <motion.p
                    className="text-5xl md:text-6xl font-voga font-bold text-gt-gold mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: index * 0.1 + 0.3 }}
                  >
                    {reason.number}
                  </motion.p>
                  <p className="text-gray-300 font-medium">
                    {reason.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA FINAL */}
      {/* ============================================ */}
      
      <section className="relative py-20 px-4">
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
              <h2 className="text-4xl md:text-5xl font-voga font-bold text-white mb-6">
                {language === 'es' 
                  ? '¿Listo para la Experiencia GT Race?' 
                  : 'Ready for the GT Race Experience?'}
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {language === 'es'
                  ? 'Únete a nuestra comunidad exclusiva y descubre el verdadero significado del lujo automotriz.'
                  : 'Join our exclusive community and discover the true meaning of automotive luxury.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/membership"
                  className="px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold text-lg
                           hover:bg-gt-gold-light hover:scale-105 transition-all duration-300
                           shadow-lg shadow-gt-gold/50"
                >
                  {language === 'es' ? 'Hazte Miembro Ahora' : 'Become a Member Now'}
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 
                           text-white rounded-xl font-semibold text-lg
                           hover:bg-white/20 transition-all duration-300"
                >
                  {language === 'es' ? 'Contactar' : 'Contact Us'}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Services;