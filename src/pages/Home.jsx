import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseAsset } from '../hooks/useSupabaseAsset';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const { language } = useLanguage();

  // ⭐ CARGAR VIDEO DESDE SUPABASE
  const { url: heroVideoUrl } = useSupabaseAsset('videos/hero-video.mp4');

  // ⭐ CARGAR IMÁGENES DE SERVICIOS DESDE SUPABASE
  const { url: clubEventoUrl } = useSupabaseAsset('services/club-evento.jpg');
  const { url: ventaCountachUrl } = useSupabaseAsset('services/venta-countach.jpg');
  const { url: competicionPilotosUrl } = useSupabaseAsset('services/competicion-pilotos.jpg');
  const { url: garageMulticolorUrl } = useSupabaseAsset('services/garage-multicolor.jpg');
  const { url: tallerGarageUrl } = useSupabaseAsset('services/taller-garage.jpg');

  // ⭐ CARGAR IMÁGENES DEL GARAGE DESDE SUPABASE
  const { url: garagePlataformasUrl } = useSupabaseAsset('gallery/garage-plataformas.jpg');

  // ⭐ CARGAR IMÁGENES DE EVENTOS DESDE SUPABASE
  const { url: concursoBellezaUrl } = useSupabaseAsset('events/concurso-belleza3.png');
  const { url: circuitoProfesionalUrl } = useSupabaseAsset('events/circuito-profesional.jpg');
  const { url: eventoTrackdayUrl } = useSupabaseAsset('events/eventotrackday.jpg');

  // ============================================
  // TRADUCCIONES COMPLETAS
  // ============================================
  const t = {
    es: {
      // SEO
      metaTitle: 'GT Race Marbella - Club Exclusivo de Supercoches en Marbella',
      metaDescription: 'El club más exclusivo de supercoches en Marbella. Car Hotel, venta de vehículos premium, Racing Team y servicios de lujo.',
      
      // Hero
      heroTitle: 'Bienvenido a GT Race Marbella',
      viewCollection: 'Ver Colección',
      joinClub: 'Únete al Club',
      
      // Stats
      stat1: 'Vehículos Premium',
      stat2: 'Miembros VIP',
      stat3: 'Años Experiencia',
      stat4: 'Servicio Exclusivo',
      
      // Services
      servicesTitle: 'Nuestros Servicios',
      servicesSubtitle: 'Experiencias exclusivas diseñadas para los amantes de los supercoches',
      
      service1Title: 'Club Exclusivo',
      service1Desc: 'Únete a la comunidad más selecta de Marbella',
      
      service2Title: 'Venta de Coches',
      service2Desc: 'Colección exclusiva de los vehículos más excepcionales del mundo',
      
      service3Title: 'Race Team',
      service3Desc: 'Participa en competiciones profesionales internacionales',
      
      service4Title: 'Car Hotel',
      service4Desc: 'Hotel de cinco estrellas para automóviles de alta gama',
      
      service5Title: 'Taller Premium',
      service5Desc: 'Mantenimiento y personalización de alto nivel',
      
      moreInfo: 'Más información',
      
      // The Garage
      garageTitle: 'The Garage',
      garageSubtitle: 'Un espacio único en Europa con una iluminación espectacular y los mejores supercoches del mundo',
      garageFeature1: 'Luces Circulares Icónicas',
      garageFeature1Desc: 'Diseño exclusivo GT Race Marbella',
      garageFeature2: 'Plataformas Iluminadas',
      garageFeature2Desc: 'Cada coche en su propia exhibición',
      exploreGarage: 'Explorar el Garaje',
      
      // Racing Team
      racingBadge: 'GT RACE TEAM',
      racingTitle: 'Competición Profesional',
      racingDescription: 'Nuestro equipo compite en los principales campeonatos internacionales:',
      racingChampionship1: 'Fórmula 4 Nórdica',
      racingChampionship1Desc: 'Formando pilotos profesionales',
      racingChampionship2: 'Porsche Sprint Challenge Iberica',
      racingChampionship2Desc: 'Competición y emoción en pista',
      racingChampionship3: 'CAVA Championship',
      racingChampionship3Desc: 'Campeonato de Andalucía de Velocidad en Circuitos de España',
      knowTeam: 'Conocer el Equipo',
      realCompetition: 'Competición Real',
      
      // Events
      eventsTitle: 'Eventos Exclusivos',
      eventsSubtitle: 'Experiencias únicas para nuestra comunidad VIP',
      
      event1Title: 'Concursos de Elegancia',
      event1Desc: 'En los mejores campos de golf de la Costa del Sol',
      
      event2Title: 'Track Days',
      event2Desc: 'Días exclusivos en circuitos profesionales',
      
      event3Title: 'Social Events',
      event3Desc: 'Networking con la comunidad luxury car de Marbella',
      
      viewEvents: 'Ver Próximos Eventos',
      
      // CTA
      ctaTitle: 'Únete a la Comunidad',
      ctaDescription: 'Experimenta el mundo del motor con acceso exclusivo a nuestra colección, eventos VIP y servicios premium.',
      requestMembership: 'Solicitar Membresía',
      contact: 'Contactar'
    },
    en: {
      // SEO
      metaTitle: 'GT Race Marbella - Exclusive Supercar Club in Marbella',
      metaDescription: 'The most exclusive supercar club in Marbella. Car Hotel, premium vehicle sales, Racing Team and luxury services.',
      
      // Hero
      heroTitle: 'The Ultimate Supercar Experience',
      heroSubtitle: 'Welcome to GT Race Marbella',
      viewCollection: 'View Collection',
      joinClub: 'Join the Club',
      
      // Stats
      stat1: 'Premium Vehicles',
      stat2: 'VIP Members',
      stat3: 'Years Experience',
      stat4: 'Exclusive Service',
      
      // Services
      servicesTitle: 'Our Services',
      servicesSubtitle: 'Exclusive experiences designed for supercar enthusiasts',
      
      service1Title: 'Exclusive Club',
      service1Desc: 'Join the most selective community in Marbella',
      
      service2Title: 'Luxury Car Sales',
      service2Desc: 'Exclusive collection of the world\'s most exceptional vehicles',
      
      service3Title: 'Race Team',
      service3Desc: 'Participate in international professional competitions',
      
      service4Title: 'Car Hotel',
      service4Desc: 'Five-star hotel for high-end automobiles',
      
      service5Title: 'Premium Workshop',
      service5Desc: 'High-level maintenance and customization',
      
      moreInfo: 'More information',
      
      // The Garage
      garageTitle: 'The Garage',
      garageSubtitle: 'A unique space in Europe with spectacular lighting and the world\'s best supercars',
      garageFeature1: 'Iconic Circular Lights',
      garageFeature1Desc: 'Exclusive GT Race Marbella design',
      garageFeature2: 'Illuminated Platforms',
      garageFeature2Desc: 'Each car in its own exhibition',
      exploreGarage: 'Explore the Garage',
      
      // Racing Team
      racingBadge: 'GT RACE TEAM',
      racingTitle: 'Professional Competition',
      racingDescription: 'Our team competes in major international championships:',
      racingChampionship1: 'Nordic Formula 4',
      racingChampionship1Desc: 'Training professional drivers',
      racingChampionship2: 'Porsche Sprint Challenge Iberica',
      racingChampionship2Desc: 'Competition and excitement on track',
      racingChampionship3: 'CAVA Championship',
      racingChampionship3Desc: 'Andalusian Speed ​​Circuit Championship of Spain',
      knowTeam: 'Meet the Team',
      realCompetition: 'Real Competition',
      
      // Events
      eventsTitle: 'Exclusive Events',
      eventsSubtitle: 'Unique experiences for our VIP community',
      
      event1Title: 'Concours d\'Elegance',
      event1Desc: 'At the best golf courses on the Costa del Sol',
      
      event2Title: 'Track Days',
      event2Desc: 'Exclusive days at professional circuits',
      
      event3Title: 'Social Events',
      event3Desc: 'Networking with Marbella\'s luxury car community',
      
      viewEvents: 'View Upcoming Events',
      
      // CTA
      ctaTitle: 'Join the Community',
      ctaDescription: 'Experience the world of motorsport with exclusive access to our collection, VIP events and premium services.',
      requestMembership: 'Request Membership',
      contact: 'Contact'
    }
  }[language];

  // Servicios principales basados en fotos reales - ORDEN ACTUALIZADO
  const services = [
    {
      title: t.service1Title,
      description: t.service1Desc,
      imageUrl: clubEventoUrl,
      link: '/membership'
    },
    {
      title: t.service2Title,
      description: t.service2Desc,
      imageUrl: ventaCountachUrl,
      link: '/cars'
    },
    {
      title: t.service3Title,
      description: t.service3Desc,
      imageUrl: competicionPilotosUrl,
      link: '/services/racing'
    },
    {
      title: t.service4Title,
      description: t.service4Desc,
      imageUrl: garageMulticolorUrl,
      link: '/services/car-hotel' // ✅ CORREGIDO
    },
    {
      title: t.service5Title,
      description: t.service5Desc,
      imageUrl: tallerGarageUrl,
      link: '/services/workshop'
    }
  ];

  // Stats reales del negocio
  const stats = [
    { number: '100+', label: t.stat1 },
    { number: '200+', label: t.stat2 },
    { number: '15+', label: t.stat3 },
    { number: '24/7', label: t.stat4 }
  ];

  return (
    <>
      {/* ⭐ SEO OPTIMIZATION */}
      <Helmet>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.metaTitle} />
        <meta name="twitter:description" content={t.metaDescription} />
        <link rel="canonical" href="https://gtracemarbella.com" />
      </Helmet>

      <div className="min-h-screen">
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Video de fondo */}
          {heroVideoUrl && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover brightness-110"
              style={{ filter: 'brightness(1.05) contrast(0.95)' }}
            >
              <source src={heroVideoUrl} type="video/mp4" />
            </video>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />

          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-voga font-bold text-white mb-6 drop-shadow-2xl">
                {t.heroTitle}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-12 drop-shadow-lg">
                {t.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cars" className="btn-primary text-lg px-8 py-4">
                  {t.viewCollection}
                </Link>
                <Link to="/membership" className="btn-outline text-lg px-8 py-4">
                  {t.joinClub}
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-gt-gold rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gt-gold rounded-full mt-2" />
            </div>
          </motion.div>
        </section>

        {/* STATS SECTION */}
        <section className="py-16 bg-gt-gray-dark">
          <div className="container-custom px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-voga font-bold text-gt-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-20 bg-gt-black">
          <div className="container-custom px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-voga font-bold mb-4">
                <span className="text-white">{t.servicesTitle.split(' ')[0]} </span>
                <span className="text-gt-gold">{t.servicesTitle.split(' ')[1]}</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {t.servicesSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={service.link}
                    className="group block bg-gt-gray-dark rounded-lg overflow-hidden hover:shadow-xl hover:shadow-gt-gold/20 transition-all duration-300"
                  >
                    <div className="h-64 overflow-hidden relative">
                      {service.imageUrl && (
                        <img 
                          src={service.imageUrl} 
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-voga font-bold text-white mb-3 group-hover:text-gt-gold transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-4 flex items-center text-gt-gold group-hover:translate-x-2 transition-transform">
                        <span className="font-medium">{t.moreInfo}</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* THE GARAGE */}
        <section className="py-20 bg-gradient-to-b from-gt-black via-gt-gray-dark to-gt-black">
          <div className="container-custom px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-voga font-bold mb-4">
                <span className="text-white">The </span>
                <span className="text-gt-gold">Garage</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {t.garageSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-96 rounded-lg overflow-hidden group"
              >
                {garageMulticolorUrl && (
                  <img 
                    src={garageMulticolorUrl} 
                    alt="Garage GT Race Marbella"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute bottom-6 left-6 z-20">
                  <h3 className="text-2xl font-voga font-bold text-white mb-2">
                    {t.garageFeature1}
                  </h3>
                  <p className="text-gray-300">{t.garageFeature1Desc}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative h-96 rounded-lg overflow-hidden group"
              >
                {garagePlataformasUrl && (
                  <img 
                    src={garagePlataformasUrl} 
                    alt="Plataformas iluminadas GT Race"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute bottom-6 left-6 z-20">
                  <h3 className="text-2xl font-voga font-bold text-white mb-2">
                    {t.garageFeature2}
                  </h3>
                  <p className="text-gray-300">{t.garageFeature2Desc}</p>
                </div>
              </motion.div>
            </div>

            <div className="text-center mt-12">
              <Link to="/services/car-hotel" className="btn-primary text-lg px-8 py-4">
                {t.exploreGarage}
              </Link>
            </div>
          </div>
        </section>

        {/* RACING TEAM */}
        <section className="py-20 bg-gt-black">
          <div className="container-custom px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block px-4 py-2 bg-gt-gold/10 rounded-full mb-6">
                  <span className="text-gt-gold font-voga font-semibold flex items-center text-sm uppercase tracking-widest">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
                    </svg>
                    {t.racingBadge}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-voga font-bold mb-6">
                  <span className="text-white">{t.racingTitle.split(' ')[0]} </span>
                  <span className="text-gt-gold">{t.racingTitle.split(' ')[1]}</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {t.racingDescription}
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-gt-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{t.racingChampionship1}</h4>
                      <p className="text-gray-400">{t.racingChampionship1Desc}</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-gt-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{t.racingChampionship2}</h4>
                      <p className="text-gray-400">{t.racingChampionship2Desc}</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-gt-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{t.racingChampionship3}</h4>
                      <p className="text-gray-400">{t.racingChampionship3Desc}</p>
                    </div>
                  </li>
                </ul>
                <Link to="/services/racing" className="btn-primary">
                  {t.knowTeam}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-lg overflow-hidden shadow-2xl group">
                  {competicionPilotosUrl && (
                    <img 
                      src={competicionPilotosUrl} 
                      alt="GT Race Team"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 border-4 border-gt-gold/20 rounded-lg" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gt-gold text-black px-6 py-4 rounded-lg font-voga font-bold text-xl shadow-xl">
                  {t.realCompetition}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* EVENTS */}
        <section className="py-20 bg-gt-gray-dark">
          <div className="container-custom px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-voga font-bold mb-4">
                <span className="text-white">{t.eventsTitle.split(' ')[0]} </span>
                <span className="text-gt-gold">{t.eventsTitle.split(' ')[1]}</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {t.eventsSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: t.event1Title,
                  description: t.event1Desc,
                  imageUrl: concursoBellezaUrl,
                  svgIcon: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  )
                },
                {
                  title: t.event2Title,
                  description: t.event2Desc,
                  imageUrl: circuitoProfesionalUrl,
                  svgIcon: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
                    </svg>
                  )
                },
                {
                  title: t.event3Title,
                  description: t.event3Desc,
                  imageUrl: eventoTrackdayUrl,
                  svgIcon: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                  )
                }
              ].map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-gt-black rounded-lg overflow-hidden border border-gt-gray-light hover:border-gt-gold transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    {event.imageUrl && (
                      <img 
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute top-4 right-4 text-gt-gold opacity-80">
                      {event.svgIcon}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-voga font-bold text-white mb-3 group-hover:text-gt-gold transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/events" className="btn-outline text-lg px-8 py-4">
                {t.viewEvents}
              </Link>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-20 bg-gradient-to-br from-gt-black via-gt-gray-dark to-gt-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gt-gold rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gt-gold rounded-full blur-3xl" />
          </div>

          <div className="container-custom px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-6xl font-voga font-bold mb-6">
                <span className="text-white">{t.ctaTitle.split(' ')[0]} </span>
                <span className="text-white">{t.ctaTitle.split(' ')[1]} </span>
                <span className="text-gt-gold">{t.ctaTitle.split(' ')[2]}</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                {t.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/membership" className="btn-primary text-lg px-10 py-4">
                  {t.requestMembership}
                </Link>
                <Link to="/contact" className="btn-outline text-lg px-10 py-4">
                  {t.contact}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;