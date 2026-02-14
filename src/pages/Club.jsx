import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Club = () => {
  const { t } = useLanguage();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // ============================================
  // 🎬 VIDEOS Y FOTOS - CONFIGURA AQUÍ
  // ============================================
  const assets = {
    // 🎬 VIDEO HERO - Pon el video del garaje aquí
    // Opciones: hero-video.mp4 (ya lo tienes) o cualquier video nuevo
    heroVideo: '/assets/videos/hero-video.mp4',
    
    // 📸 FOTO ESTILO DE VIDA - Foto principal grande (Countach showroom o similar)
    estiloVidaImage: '/assets/images/venta-countach.jpg',
    
    // 📸 GALERÍA - 6 fotos de instalaciones/coches CON LINKS
    galeria: [
      {
        src: '/assets/images/garage-multicolor.jpg',
        alt: 'Garage GT Race - Luces circulares',
        link: '/services/car-hotel'  // ← Link al Car Hotel
      },
      {
        src: '/assets/images/garage-plataformas.jpg',
        alt: 'Plataformas iluminadas',
        link: '/services/car-hotel'  // ← Link al Car Hotel
      },
      {
        src: '/assets/images/taller-garage.jpg',
        alt: 'Taller GT Race',
        link: '/services/workshop'  // ← Link al Taller
      },
      {
        src: '/assets/images/alquiler-interior.jpg',
        alt: 'Interior exclusivo',
        link: '/services/rental'  // ← Link a Alquiler
      },
      {
        src: '/assets/images/competicion-pilotos.jpg',
        alt: 'Equipo de competición',
        link: '/services/racing'  // ← Link a Race Team
      },
      {
        src: '/assets/images/club-evento.jpg',
        alt: 'Evento del club',
        link: '/events'  // ← Link a Eventos
      },
    ],
    
    // 📸 BACKGROUNDS ACORDEÓN - 3 fotos para cada sección expandible
    acordeon: {
      networking: '/assets/images/club-evento.jpg',
      // 👆 CAMBIAR: Pon foto de evento social/networking
      
      eventos: '/assets/images/evento-concurso.jpg',
      // 👆 CAMBIAR: Pon foto de evento/concurso/red carpet
      
      servicios: '/assets/images/taller-garage.jpg',
      // 👆 CAMBIAR: Pon foto del taller o servicios
    },
    
    // 🎬 VIDEO EXPERIENCIAS (OPCIONAL) - Si tienes video de evento/circuito
    experienciasVideo: null, // Cambia a '/assets/videos/nombre-video.mp4' si tienes
    
    // 📸 BACKGROUND FORMULARIO - Foto sutil de fondo para el formulario
    formularioBackground: '/assets/images/garage-multicolor.jpg',
    // 👆 CAMBIAR: Pon foto sutil del garaje para fondo
  };

  // Contenido del acordeón
  const accordionSections = [
    {
      id: 'networking',
      title: 'Red',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      content: 'En GT Race Marbella, el networking no es un extra, es la base. Creemos que rodearnos de personas con ideas afines, que comparten tanto la pasión por los coches como un estilo de vida refinado, abre la puerta a valiosas colaboraciones. Las oportunidades de negocio fluyen de forma natural cuando hay confianza, respeto mutuo y una visión común.',
      background: assets.acordeon.networking,
    },
    {
      id: 'eventos',
      title: 'Eventos y estilo de vida',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
        </svg>
      ),
      content: 'Los eventos de GT Race Marbella están marcados por un arraigado espíritu automovilístico, impulsado por la filosofía competitiva de nuestros fundadores italianos. Desde exclusivas jornadas en circuito hasta aventuras en carretera de varios días y experiencias de conducción inmersivas en escenarios extraordinarios.',
      background: assets.acordeon.eventos,
    },
    {
      id: 'servicios',
      title: 'Servicios',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ),
      content: 'Nuestros servicios cubren todos los aspectos de su estilo de vida automovilístico, desde la adquisición y la venta hasta el alquiler, la reparación, el wrapping, el detailing y el almacenamiento seguro. A través de nuestro servicio de conserjería dedicado, su coche estará siempre listo cuando lo necesite.',
      background: assets.acordeon.servicios,
    },
  ];

  const handleAccordionToggle = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Conectar con Supabase
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black">
      
      {/* ================================================
          🎬 HERO SECTION - VIDEO BACKGROUND
          ================================================
          CAMBIAR VIDEO: Edita assets.heroVideo arriba
          Puedes usar hero-video.mp4 o añadir uno nuevo
          ================================================ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video de fondo - ALTA CALIDAD HD */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover brightness-110"
          style={{ 
            filter: 'brightness(1.15) contrast(1.05)',
            imageRendering: 'high-quality'
          }}
        >
          <source src={assets.heroVideo} type="video/mp4" />
          <source src={assets.heroVideo.replace('.mp4', '.webm')} type="video/webm" />
        </video>
        
        {/* Overlay REDUCIDO para ver mejor el video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
        
        {/* Contenido hero */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-block px-6 py-2 bg-gt-gold/10 backdrop-blur-lg 
                            border border-gt-gold/30 rounded-full mb-6">
              {/* 🎨 BADGE CON VOGA */}
              <span className="text-gt-gold font-voga font-semibold flex items-center text-sm uppercase tracking-widest">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                Club Exclusivo
              </span>
            </div>

            {/* 🎨 TÍTULO HERO CON VOGA */}
            <h1 className="text-5xl md:text-7xl font-voga font-black text-white mb-6">
              GT RACE MARBELLA
              <span className="block text-gt-gold mt-2">CLUB</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Supercoches y centro de interconexión. 
              El club definitivo para los entusiastas del automóvil.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/membership"
                className="px-8 py-4 bg-gt-gold text-black rounded-xl
                           font-semibold text-lg
                           hover:bg-gt-gold-light hover:scale-105
                           transition-all duration-300
                           shadow-lg hover:shadow-gt-gold/50"
              >
                Solicitar Membresía
              </Link>
              
              <a 
                href="#info"
                className="px-8 py-4 bg-white/5 backdrop-blur-lg
                           border border-white/10 text-white rounded-xl
                           font-semibold text-lg
                           hover:bg-white/10 hover:border-gt-gold/30
                           transition-all duration-300"
              >
                Descubre Más
              </a>
            </div>
          </motion.div>
        </div>

        {/* Indicador scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
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

      {/* ================================================
          🏎️ ESTILO DE VIDA AUTOMOVILÍSTICO
          ================================================
          CAMBIAR FOTO: Edita assets.estiloVidaImage
          Pon aquí una foto impactante de showroom/garage
          ================================================ */}
      <section id="info" className="py-24 px-4 bg-gradient-to-b from-black to-gt-gray-dark">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-gt-gold/10 rounded-full mb-4">
              {/* 🎨 BADGE CON VOGA */}
              <span className="text-gt-gold font-voga font-semibold text-sm uppercase tracking-widest">
                Nuestro Club
              </span>
            </div>
            {/* 🎨 TÍTULO CON VOGA */}
            <h2 className="text-4xl md:text-5xl font-voga font-bold text-white mb-4">
              Como en casa
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Entre miembros selectos que comparten los mismos valores y estilo de vida
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* FOTO PRINCIPAL - CAMBIAR AQUÍ 📸 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img 
                src={assets.estiloVidaImage}
                alt="GT Race Marbella Club"
                className="w-full h-[600px] object-cover transition-transform 
                           duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-black/60 backdrop-blur-lg rounded-xl p-4 border border-gt-gold/20">
                    {/* 🎨 NÚMEROS CON VOGA */}
                    <div className="text-3xl font-bold font-voga text-gt-gold">100+</div>
                    <div className="text-sm text-gray-300">Miembros</div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-lg rounded-xl p-4 border border-gt-gold/20">
                    <div className="text-3xl font-bold font-voga text-gt-gold">50+</div>
                    <div className="text-sm text-gray-300">Eventos</div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-lg rounded-xl p-4 border border-gt-gold/20">
                    <div className="text-3xl font-bold font-voga text-gt-gold">2024</div>
                    <div className="text-sm text-gray-300">Fundado</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contenido texto */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* 🎨 TÍTULO CON VOGA */}
              <h3 className="text-3xl md:text-4xl font-voga font-bold text-white mb-6">
                Estilo de vida automovilístico
              </h3>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  En GT Race Marbella, la pasión por el automóvil se mezcla a la perfección 
                  con el lujo y las conexiones significativas. Más que un club, es un universo 
                  privado donde los miembros selectos comparten no solo el amor por los 
                  supercoches, sino también un estilo de vida refinado y un espacio para 
                  conectar, colaborar y sentirse como en casa.
                </p>
                
                <p>
                  Desde eventos de lujo y reuniones privadas hasta experiencias en pista y 
                  rutas exclusivas a través de paisajes impresionantes - cada momento en 
                  GT Race Marbella está diseñado para ser inolvidable, hecho posible a través 
                  de nuestra red única de conexiones.
                </p>
                
                <p>
                  Únete a un mundo reservado para aquellos que realmente viven el estilo de 
                  vida automovilístico. Ponte en contacto con nosotros y da el primer paso 
                  para convertirte en miembro de GT Race Marbella - no todo el mundo entra.
                </p>
              </div>

              <Link 
                to="/membership"
                className="inline-flex items-center mt-8 px-6 py-3 
                           bg-gt-gold text-black rounded-xl font-semibold
                           hover:bg-gt-gold-light transition-all duration-300
                           hover:scale-105 shadow-lg hover:shadow-gt-gold/50"
              >
                Solicitud de membresía
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================
          🎨 CARRUSEL DE INSTALACIONES - LUXURY STYLE
          ================================================
          CAMBIAR FOTOS: Edita assets.galeria (array arriba)
          6 fotos del garaje, eventos, coches, etc.
          ================================================ */}
      <section className="py-24 px-4 bg-gt-gray-dark">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* 🎨 TÍTULO CON VOGA */}
            <h2 className="text-4xl md:text-5xl font-voga font-bold text-white mb-4">
              Nuestras Instalaciones
            </h2>
            <p className="text-gray-400 text-lg">
              Un vistazo al mundo exclusivo de GT Race Marbella
            </p>
          </motion.div>

          {/* CARRUSEL LUXURY CON LINKS */}
          <div className="relative">
            {/* Contenedor del carrusel */}
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex"
                animate={{
                  x: [0, -100 * (assets.galeria.length / 3) + '%'],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 35,  // ← MÁS LENTO (antes 20, ahora 35)
                    ease: "linear",
                  },
                }}
              >
                {/* Duplicar fotos para loop infinito */}
                {[...assets.galeria, ...assets.galeria].map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2"
                  >
                    {/* LINK WRAPPER - Cada foto es clickeable */}
                    <Link
                      to={item.link}
                      className="block relative h-96 rounded-xl overflow-hidden group cursor-pointer"
                    >
                      {/* FOTO DE GALERÍA 📸 */}
                      <img 
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform 
                                   duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay con gradient premium */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent
                                      opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                      
                      {/* Brillo dorado en hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gt-gold/0 via-gt-gold/0 to-gt-gold/20
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Título con glass morphism */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 
                                      transform translate-y-2 group-hover:translate-y-0
                                      transition-all duration-300">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 
                                        rounded-xl p-4">
                          {/* 🎨 TÍTULO CON VOGA */}
                          <h3 className="text-white text-xl font-voga font-bold mb-1">
                            {item.alt}
                          </h3>
                          <div className="flex items-center text-gt-gold text-sm">
                            <span>Ver más</span>
                            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Badge número en esquina */}
                      <div className="absolute top-4 right-4 w-12 h-12 
                                      bg-black/60 backdrop-blur-lg rounded-full
                                      flex items-center justify-center
                                      border border-gt-gold/30
                                      opacity-0 group-hover:opacity-100
                                      transition-all duration-300">
                        <span className="text-gt-gold font-voga font-bold">
                          {(index % assets.galeria.length) + 1}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Indicador de scroll */}
            <div className="flex justify-center mt-8 gap-2">
              {assets.galeria.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-gt-gold/30 hover:bg-gt-gold transition-colors"
                />
              ))}
            </div>

            {/* Gradient fade en los bordes */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gt-gray-dark to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gt-gray-dark to-transparent pointer-events-none" />
          </div>

          {/* Texto decorativo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 italic">
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================================================
          🎯 ¿QUÉ OFRECEMOS? - ACORDEÓN
          ================================================
          CAMBIAR FOTOS: Edita assets.acordeon
          3 fotos de fondo para cada sección
          ================================================ */}
      <section className="py-24 px-4 bg-black">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* 🎨 TÍTULO CON VOGA */}
            <h2 className="text-4xl md:text-5xl font-voga font-bold text-white mb-4">
              ¿Quiere saber más?
            </h2>
            <p className="text-gray-400 text-lg">
              Pulse cada sección para descubrir más sobre nosotros
            </p>
          </motion.div>

          <div className="space-y-4">
            {accordionSections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`
                  relative overflow-hidden rounded-2xl
                  border border-white/10
                  transition-all duration-300
                  ${openAccordion === section.id 
                    ? 'bg-black/80 backdrop-blur-xl' 
                    : 'bg-white/5 backdrop-blur-lg hover:bg-white/10'
                  }
                `}
              >
                {/* Background image cuando está abierto - CAMBIAR AQUÍ 📸 */}
                {openAccordion === section.id && (
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={section.background}
                      alt={section.title}
                      className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80" />
                  </div>
                )}

                {/* Header clickeable */}
                <button
                  onClick={() => handleAccordionToggle(section.id)}
                  className="relative z-10 w-full px-8 py-6 flex items-center justify-between
                             text-left transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      p-3 rounded-xl transition-all duration-300
                      ${openAccordion === section.id
                        ? 'bg-gt-gold text-black'
                        : 'bg-white/5 text-gt-gold'
                      }
                    `}>
                      {section.icon}
                    </div>
                    {/* 🎨 TÍTULO DE ACORDEÓN CON VOGA */}
                    <h3 className="text-2xl font-voga font-bold text-white">
                      {section.title}
                    </h3>
                  </div>

                  {/* Icono +/- */}
                  <div className={`
                    text-gt-gold transition-transform duration-300
                    ${openAccordion === section.id ? 'rotate-180' : ''}
                  `}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Contenido expandible */}
                <motion.div
                  initial={false}
                  animate={{
                    height: openAccordion === section.id ? 'auto' : 0,
                    opacity: openAccordion === section.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="relative z-10 px-8 pb-8 pt-0">
                    <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          🎬 EXPERIENCIAS - AJUSTADO PARA LOGO
          ================================================
          CAMBIAR VIDEO: Edita assets.experienciasVideo
          Si tienes video de evento/circuito, ponlo aquí
          Si no, esta sección usa una foto de fondo
          ================================================ */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background - Video o Foto - MEJORADO */}
        {assets.experienciasVideo ? (
          // Si hay video, mostrarlo con más brillo
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover brightness-110"
            style={{ filter: 'brightness(1.15) contrast(1.05)' }}
          >
            <source src={assets.experienciasVideo} type="video/mp4" />
          </video>
        ) : (
          // Si no hay video, mostrar foto de fondo AJUSTADA
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${assets.galeria[0].src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          />
        )}
        
        {/* Overlay REDUCIDO para ver mejor + vignette para logo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        
        {/* Vignette extra en las esquinas para proteger logo */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent" />
        
        {/* Contenido - MÁS ESPACIO ARRIBA */}
        <div className="relative z-10 container mx-auto max-w-4xl text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge decorativo */}
            <div className="inline-block px-6 py-3 bg-black/40 backdrop-blur-xl 
                            border border-gt-gold/30 rounded-full mb-8">
              <span className="text-gt-gold font-voga font-semibold text-sm uppercase tracking-widest">
                Experiencia Exclusiva
              </span>
            </div>

            {/* 🎨 TÍTULO CON VOGA */}
            <h2 className="text-4xl md:text-6xl font-voga font-black text-white mb-6 
                           drop-shadow-2xl">
              Vive la experiencia
              <span className="block text-gt-gold mt-2">GT Race</span>
            </h2>
            
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed
                          drop-shadow-lg">
              Eventos exclusivos, track days inolvidables y una comunidad de 
              apasionados que comparten tu pasión por los supercoches.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/events"
                className="px-8 py-4 bg-gt-gold text-black rounded-xl
                           font-semibold text-lg
                           hover:bg-gt-gold-light hover:scale-105
                           transition-all duration-300
                           shadow-2xl hover:shadow-gt-gold/50"
              >
                Ver Próximos Eventos
              </Link>
              
              <Link 
                to="/membership"
                className="px-8 py-4 bg-white/10 backdrop-blur-lg
                           border border-white/20 text-white rounded-xl
                           font-semibold text-lg
                           hover:bg-white/20 hover:border-gt-gold/50
                           transition-all duration-300
                           shadow-2xl"
              >
                Únete al Club
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================
          📝 FORMULARIO DE CONTACTO
          ================================================
          CAMBIAR FOTO: Edita assets.formularioBackground
          Foto sutil del garaje para el fondo
          ================================================ */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background image sutil */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${assets.formularioBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gt-gray-dark via-black to-gt-gray-dark" />
        
        <div className="relative z-10 container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* 🎨 TÍTULO CON VOGA */}
            <h2 className="text-4xl md:text-5xl font-voga font-bold text-white mb-4">
              Envíenos un correo electrónico para hacerse miembro
            </h2>
            <p className="text-gray-400 text-lg">
              Complete el formulario y nos pondremos en contacto con usted
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 
                       rounded-2xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500
                             focus:outline-none focus:border-gt-gold/50
                             transition-colors duration-300"
                  placeholder="Juan Pérez"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500
                             focus:outline-none focus:border-gt-gold/50
                             transition-colors duration-300"
                  placeholder="juan@email.com"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500
                             focus:outline-none focus:border-gt-gold/50
                             transition-colors duration-300"
                  placeholder="+34 600 000 000"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500
                             focus:outline-none focus:border-gt-gold/50
                             transition-colors duration-300 resize-none"
                  placeholder="Cuéntenos por qué quiere unirse al club..."
                />
              </div>

              {/* Checkbox privacidad */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="mt-1 w-4 h-4 rounded border-white/20 
                             bg-white/5 text-gt-gold
                             focus:ring-gt-gold focus:ring-offset-0"
                />
                <label htmlFor="privacy" className="text-sm text-gray-400">
                  Acepto la política de privacidad del sitio.
                </label>
              </div>

              {/* Botón submit */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gt-gold text-black rounded-xl
                           font-semibold text-lg
                           hover:bg-gt-gold-light hover:scale-105
                           transition-all duration-300
                           shadow-lg hover:shadow-gt-gold/50"
              >
                Enviar Solicitud
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Club;