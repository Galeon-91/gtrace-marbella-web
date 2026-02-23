import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// Iconos SVG personalizados
const GarageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" fill="currentColor" opacity="0.2"/>
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SecurityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" fill="currentColor" opacity="0.2"/>
    <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LEDIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.2"/>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

const ServiceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M14.7 6.3C15.1 5.9 15.7 5.9 16.1 6.3L17.7 7.9C18.1 8.3 18.1 8.9 17.7 9.3L9.3 17.7C8.9 18.1 8.3 18.1 7.9 17.7L6.3 16.1C5.9 15.7 5.9 15.1 6.3 14.7L14.7 6.3Z" fill="currentColor" opacity="0.2"/>
    <path d="M14.7 6.3C15.1 5.9 15.7 5.9 16.1 6.3L17.7 7.9C18.1 8.3 18.1 8.9 17.7 9.3L9.3 17.7C8.9 18.1 8.3 18.1 7.9 17.7L6.3 16.1C5.9 15.7 5.9 15.1 6.3 14.7L14.7 6.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 3L13 5M3 11L5 13M18 11L20 13M11 18L13 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BatteryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect x="2" y="7" width="18" height="10" rx="2" fill="currentColor" opacity="0.2"/>
    <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M22 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CarHotel = () => {
  const { language } = useLanguage();

  const content = {
    es: {
      badge: 'Car Hotel Premium',
      title: 'Hotel de 5 Estrellas para tu Vehículo',
      subtitle: 'Almacenamiento de lujo con seguridad 24/7, control climático e iluminación LED premium. Tu superdeportivo merece el mejor cuidado.',
      features: 'Características Premium',
      services: 'Servicios para tu Automóvil',
      requestService: 'Solicitar Plaza',
      whyChoose: 'Por qué Car Hotel',
      contact: 'Contáctanos',
    },
    en: {
      badge: 'Premium Car Hotel',
      title: '5-Star Hotel for Your Vehicle',
      subtitle: 'Luxury storage with 24/7 security, climate control, and premium LED lighting. Your supercar deserves the best care.',
      features: 'Premium Features',
      services: 'Automotive Services',
      requestService: 'Request Space',
      whyChoose: 'Why Car Hotel',
      contact: 'Contact Us',
    }
  };

  const t = content[language];

  const features = [
    {
      title: language === 'es' ? 'Seguridad 24/7' : '24/7 Security',
      description: language === 'es' ? 'Vigilancia constante y sistema de alarma avanzado' : 'Constant surveillance and advanced alarm system',
      icon: <SecurityIcon />
    },
    {
      title: language === 'es' ? 'Iluminación LED' : 'LED Lighting',
      description: language === 'es' ? 'Iluminación premium que realza cada línea de tu coche' : 'Premium lighting that enhances every line of your car',
      icon: <LEDIcon />
    },
    {
      title: language === 'es' ? 'Control Climático' : 'Climate Control',
      description: language === 'es' ? 'Temperatura y humedad perfectamente controladas' : 'Perfectly controlled temperature and humidity',
      icon: <GarageIcon />
    },
    {
      title: language === 'es' ? 'Plazas VIP Limitadas' : 'Limited VIP Spaces',
      description: language === 'es' ? 'Solo 15 plazas disponibles para máxima exclusividad' : 'Only 15 spaces available for maximum exclusivity',
      icon: <ServiceIcon />
    },
    {
      title: language === 'es' ? 'Servicio Técnico' : 'Technical Service',
      description: language === 'es' ? 'Mantenimiento preventivo y revisiones periódicas' : 'Preventive maintenance and periodic inspections',
      icon: <ServiceIcon />
    },
    {
      title: language === 'es' ? 'Mantenimiento de Batería' : 'Battery Maintenance',
      description: language === 'es' ? 'Cargadores inteligentes para mantener baterías óptimas' : 'Smart chargers to maintain optimal batteries',
      icon: <BatteryIcon />
    },
    {
      title: language === 'es' ? 'Acceso VIP' : 'VIP Access',
      description: language === 'es' ? 'Sistema de acceso exclusivo para miembros' : 'Exclusive access system for members',
      icon: <SecurityIcon />
    },
    {
      title: language === 'es' ? 'Limpieza Regular' : 'Regular Cleaning',
      description: language === 'es' ? 'Mantenimiento de limpieza incluido' : 'Cleaning maintenance included',
      icon: <GarageIcon />
    }
  ];

  const autoServices = [
    {
      title: 'ITV',
      description: language === 'es' ? 'Gestionamos tu ITV sin que muevas un dedo' : 'We handle your ITV without you lifting a finger'
    },
    {
      title: language === 'es' ? 'Seguros' : 'Insurance',
      description: language === 'es' ? 'Asesoramiento en seguros premium' : 'Premium insurance advisory'
    },
    {
      title: language === 'es' ? 'Servicio de Chófer' : 'Chauffeur Service',
      description: language === 'es' ? 'Chófer profesional disponible' : 'Professional chauffeur available'
    },
    {
      title: language === 'es' ? 'Servicio Oficial' : 'Official Service',
      description: language === 'es' ? 'Coordinamos servicio oficial de tu marca' : 'We coordinate official service for your brand'
    },
    {
      title: language === 'es' ? 'Mantenimiento' : 'Maintenance',
      description: language === 'es' ? 'Revisiones periódicas programadas' : 'Scheduled periodic inspections'
    },
    {
      title: language === 'es' ? 'Protección' : 'Protection',
      description: language === 'es' ? 'PPF y ceramic coating disponibles' : 'PPF and ceramic coating available'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* HERO SECTION */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gt-gray-dark via-black to-black" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-gt-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gt-gold/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />

        <div className="relative z-10 container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
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

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-voga font-bold text-white mb-6 drop-shadow-2xl">
              {t.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>

          {/* LIMITED SPACES ALERT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-gt-gold/20 via-gt-gold/10 to-transparent backdrop-blur-xl 
                          border border-gt-gold/40 rounded-2xl p-6 text-center">
              <p className="text-gt-gold font-semibold text-lg mb-2">
                {language === 'es' ? '⚠️ Plazas Limitadas' : '⚠️ Limited Spaces'}
              </p>
              <p className="text-gray-300">
                {language === 'es' 
                  ? 'Plazas limitadas disponibles. Reserva tu espacio exclusivo ahora.' 
                  : 'Limited places available. Reserve your exclusive space now.'}
              </p>
            </div>
          </motion.div>

          {/* FEATURES GRID */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-voga font-bold text-white text-center mb-12">{t.features}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6
                           hover:border-gt-gold/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 text-gt-gold mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AUTOMOTIVE SERVICES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-voga font-bold text-white text-center mb-12">{t.services}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {autoServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl p-6
                           hover:border-gt-gold/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gt-gold mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{service.title}</h3>
                      <p className="text-gray-400 text-sm">{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA & CONTACT SECTION */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-voga font-bold text-white mb-4">{t.whyChoose}</h2>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-gt-gold"></div>
                  {language === 'es' ? 'Instalaciones de última generación' : 'State-of-the-art facilities'}
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-gt-gold"></div>
                  {language === 'es' ? 'Personal especializado en supercars' : 'Supercar specialized staff'}
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-gt-gold"></div>
                  {language === 'es' ? 'Ubicación premium en Puerto Banús' : 'Premium location in Puerto Banús'}
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-gt-gold"></div>
                  {language === 'es' ? 'Servicio de conserjería completo' : 'Full concierge service'}
                </li>
              </ul>
              <Link
                to="/membership"
                className="inline-block px-6 py-3 bg-gt-gold text-black rounded-xl font-semibold
                           hover:bg-gt-gold-light transition-all duration-300"
              >
                {language === 'es' ? 'Hazte Miembro' : 'Become a Member'}
              </Link>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-voga font-bold text-white mb-4">{t.contact}</h2>
              <p className="text-gray-300 mb-6">
                {language === 'es' 
                  ? 'Visita nuestras instalaciones y descubre el mejor hotel para tu vehículo.' 
                  : 'Visit our facilities and discover the best hotel for your vehicle.'}
              </p>
              <div className="space-y-3">
                <a href="tel:+34687999427" className="flex items-center gap-3 text-gt-gold hover:text-gt-gold-light transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +34 687 99 94 27
                </a>
                <a href="mailto:info@gtracemarbella.com" className="flex items-center gap-3 text-gt-gold hover:text-gt-gold-light transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@gtracemarbella.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarHotel;