import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseAsset } from '../hooks/useSupabaseAsset';
import { supabase } from '../../supabase/supabaseClient';

const Club = () => {
  const { t, language } = useLanguage();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Estados para el formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  // ============================================
  // 🎬 CARGAR ASSETS DESDE SUPABASE
  // ============================================
  
  // Videos
  const { url: heroVideoUrl } = useSupabaseAsset('videos/ferrari.mp4');
  
  // Imágenes principales
  const { url: estiloVidaImageUrl } = useSupabaseAsset('club/venta-countach.webp');
  
  // Galería (6 fotos)
  const { url: galeriaImg1 } = useSupabaseAsset('gallery/lucescirculares.webp');
  const { url: galeriaImg2 } = useSupabaseAsset('gallery/garage-plataformas.webp');
  const { url: galeriaImg3 } = useSupabaseAsset('services/taller-garage.webp');
  const { url: galeriaImg4 } = useSupabaseAsset('club/alquiler-interior.webp');
  const { url: galeriaImg5 } = useSupabaseAsset('services/competicion-pilotos.webp');
  const { url: galeriaImg6 } = useSupabaseAsset('services/club-evento.webp');
  
  // Fondos de acordeón
  const { url: networkingBgUrl } = useSupabaseAsset('club/networking-bg.jpg');
  const { url: eventosBgUrl } = useSupabaseAsset('club/eventos-bg.jpg');
  const { url: serviciosBgUrl } = useSupabaseAsset('services/taller-garage.webp');
  
  // Fondo formulario
  const { url: formularioBgUrl } = useSupabaseAsset('gallery/garage-multicolor.jpg');

  // ============================================
  // ✅ GALERÍA - "INTERIOR EXCLUSIVO" REDIRIGE A /GARAGE
  // ============================================
  const galeria = [
    {
      url: galeriaImg1,
      alt: language === 'es' ? 'Garage GT Race - Luces circulares' : 'GT Race Garage - Circular lights',
      link: '/services/car-hotel'
    },
    {
      url: galeriaImg2,
      alt: language === 'es' ? 'Plataformas iluminadas' : 'Illuminated platforms',
      link: '/services/car-hotel'
    },
    {
      url: galeriaImg3,
      alt: language === 'es' ? 'Taller GT Race' : 'GT Race Workshop',
      link: '/services/workshop'
    },
    {
      url: galeriaImg4,
      alt: language === 'es' ? 'Interior exclusivo' : 'Exclusive interior',
      link: '/garage' // ✅ REDIRIGE A LA PÁGINA DEL GARAGE HOTEL
    },
    {
      url: galeriaImg5,
      alt: language === 'es' ? 'Equipo de competición' : 'Racing team',
      link: '/services/racing'
    },
    {
      url: galeriaImg6,
      alt: language === 'es' ? 'Evento del club' : 'Club event',
      link: '/events'
    },
  ];

  // Traducciones
  const translations = {
    es: {
      hero: {
        badge: 'Club Exclusivo',
        title: 'GT RACE MARBELLA CLUB',
        subtitle: 'Supercoches y centro de interconexión. El club definitivo para los entusiastas del automóvil.',
        cta1: 'Solicitar Membresía',
        cta2: 'Descubre Más'
      },
      lifestyle: {
        badge: 'Nuestro Club',
        title: 'Como en casa',
        subtitle: 'Entre miembros selectos que comparten los mismos valores y estilo de vida',
        heading: 'Estilo de vida automovilístico',
        p1: 'En GT Race Marbella, la pasión por el automóvil se mezcla a la perfección con el lujo y las conexiones significativas. Más que un club, es un universo privado donde los miembros selectos comparten no solo el amor por los supercoches, sino también un estilo de vida refinado y un espacio para conectar, colaborar y sentirse como en casa.',
        p2: 'Desde eventos de lujo y reuniones privadas hasta experiencias en pista y rutas exclusivas a través de paisajes impresionantes - cada momento en GT Race Marbella está diseñado para ser inolvidable, hecho posible a través de nuestra red única de conexiones.',
        p3: 'Únete a un mundo reservado para aquellos que realmente viven el estilo de vida automovilístico. Ponte en contacto con nosotros y da el primer paso para convertirte en miembro de GT Race Marbella - no todo el mundo entra.',
        cta: 'Solicitud de membresía',
        stat1: 'Miembros',
        stat2: 'Eventos',
        stat3: 'Fundado'
      },
      gallery: {
        title: 'Nuestras Instalaciones',
        subtitle: 'Un vistazo al mundo exclusivo de GT Race Marbella',
        viewMore: 'Ver más'
      },
      accordion: {
        title: '¿Quiere saber más?',
        subtitle: 'Pulse cada sección para descubrir más sobre nosotros',
        sections: {
          networking: {
            title: 'Red',
            content: 'En GT Race Marbella, el networking no es un extra, es la base. Creemos que rodearnos de personas con ideas afines, que comparten tanto la pasión por los coches como un estilo de vida refinado, abre la puerta a valiosas colaboraciones. Las oportunidades de negocio fluyen de forma natural cuando hay confianza, respeto mutuo y una visión común.'
          },
          eventos: {
            title: 'Eventos y estilo de vida',
            content: 'Los eventos de GT Race Marbella están marcados por un arraigado espíritu automovilístico, impulsado por la filosofía competitiva de nuestros fundadores italianos. Desde exclusivas jornadas en circuito hasta aventuras en carretera de varios días y experiencias de conducción inmersivas en escenarios extraordinarios.'
          },
          servicios: {
            title: 'Servicios',
            content: 'Nuestros servicios cubren todos los aspectos de su estilo de vida automovilístico, desde la adquisición y la venta hasta el alquiler, la reparación, el wrapping, el detailing y el almacenamiento seguro. A través de nuestro servicio de conserjería dedicado, su coche estará siempre listo cuando lo necesite.'
          }
        }
      },
      experience: {
        badge: 'Experiencia Exclusiva',
        title: 'Vive la experiencia GT Race',
        subtitle: 'Eventos exclusivos, track days inolvidables y una comunidad de apasionados que comparten tu pasión por los supercoches.',
        cta1: 'Ver Próximos Eventos',
        cta2: 'Únete al Club'
      },
      form: {
        title: 'Envíenos un correo electrónico para hacerse miembro',
        subtitle: 'Complete el formulario y nos pondremos en contacto con usted',
        name: 'Nombre completo',
        email: 'Email',
        phone: 'Teléfono',
        message: 'Mensaje',
        messagePlaceholder: 'Cuéntenos por qué quiere unirse al club...',
        privacy: 'Acepto la política de privacidad del sitio.',
        submit: 'Enviar Solicitud'
      }
    },
    en: {
      hero: {
        badge: 'Exclusive Club',
        title: 'GT RACE MARBELLA CLUB',
        subtitle: 'Supercars and networking hub. The ultimate club for automotive enthusiasts.',
        cta1: 'Request Membership',
        cta2: 'Discover More'
      },
      lifestyle: {
        badge: 'Our Club',
        title: 'Feel at home',
        subtitle: 'Among select members who share the same values and lifestyle',
        heading: 'Automotive lifestyle',
        p1: 'At GT Race Marbella, passion for automobiles blends seamlessly with luxury and meaningful connections. More than a club, it\'s a private universe where select members share not only love for supercars, but also a refined lifestyle and a space to connect, collaborate and feel at home.',
        p2: 'From luxury events and private gatherings to track experiences and exclusive routes through stunning landscapes - every moment at GT Race Marbella is designed to be unforgettable, made possible through our unique network of connections.',
        p3: 'Join a world reserved for those who truly live the automotive lifestyle. Contact us and take the first step to become a member of GT Race Marbella - not everyone gets in.',
        cta: 'Membership application',
        stat1: 'Members',
        stat2: 'Events',
        stat3: 'Founded'
      },
      gallery: {
        title: 'Our Facilities',
        subtitle: 'A glimpse into the exclusive world of GT Race Marbella',
        viewMore: 'View more'
      },
      accordion: {
        title: 'Want to know more?',
        subtitle: 'Click each section to discover more about us',
        sections: {
          networking: {
            title: 'Network',
            content: 'At GT Race Marbella, networking is not an extra, it\'s the foundation. We believe that surrounding ourselves with like-minded people, who share both passion for cars and a refined lifestyle, opens the door to valuable collaborations. Business opportunities flow naturally when there is trust, mutual respect and a common vision.'
          },
          eventos: {
            title: 'Events and lifestyle',
            content: 'GT Race Marbella events are marked by a deep-rooted automotive spirit, driven by the competitive philosophy of our Italian founders. From exclusive track days to multi-day road adventures and immersive driving experiences in extraordinary settings.'
          },
          servicios: {
            title: 'Services',
            content: 'Our services cover all aspects of your automotive lifestyle, from acquisition and sales to rental, repair, wrapping, detailing and secure storage. Through our dedicated concierge service, your car will always be ready when you need it.'
          }
        }
      },
      experience: {
        badge: 'Exclusive Experience',
        title: 'Live the GT Race experience',
        subtitle: 'Exclusive events, unforgettable track days and a community of enthusiasts who share your passion for supercars.',
        cta1: 'View Upcoming Events',
        cta2: 'Join the Club'
      },
      form: {
        title: 'Email us to become a member',
        subtitle: 'Complete the form and we will get in touch with you',
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
        messagePlaceholder: 'Tell us why you want to join the club...',
        privacy: 'I accept the site\'s privacy policy.',
        submit: 'Submit Application'
      }
    }
  };

  const tr = translations[language];

  // Contenido del acordeón con URLs de Supabase
  const accordionSections = [
    {
      id: 'networking',
      title: tr.accordion.sections.networking.title,
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      content: tr.accordion.sections.networking.content,
      background: networkingBgUrl,
    },
    {
      id: 'eventos',
      title: tr.accordion.sections.eventos.title,
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
        </svg>
      ),
      content: tr.accordion.sections.eventos.content,
      background: eventosBgUrl,
    },
    {
      id: 'servicios',
      title: tr.accordion.sections.servicios.title,
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ),
      content: tr.accordion.sections.servicios.content,
      background: serviciosBgUrl,
    },
  ];

  const handleAccordionToggle = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Insertar en Supabase
      const { data, error } = await supabase
        .from('membership_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message || null,
            source: 'club_page',
            language: language,
            status: 'pending'
          }
        ])
        .select();

      if (error) {
        console.error('Error submitting form:', error);
        throw error;
      }

      // Éxito
      setSubmitStatus('success');
      
      // Resetear formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      // Scroll al mensaje de éxito
      setTimeout(() => {
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black">
      
      {/* HERO SECTION - Video desde Supabase */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video de fondo */}
        {heroVideoUrl && (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover brightness-110"
            style={{ 
              filter: 'brightness(1.15) contrast(1.05)',
              imageRendering: 'high-quality'
            }}
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
        
        {/* Contenido hero */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-block px-4 sm:px-6 py-2 bg-gt-gold/10 backdrop-blur-lg 
                            border border-gt-gold/30 rounded-full mb-4 sm:mb-6">
              <span className="text-gt-gold font-march font-semibold flex items-center text-xs sm:text-sm uppercase tracking-widest">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                {tr.hero.badge}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-march font-black text-white mb-4 sm:mb-6">
              GT RACE MARBELLA
              <span className="block text-gt-gold mt-2">CLUB</span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
              {tr.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link 
                to="/membership"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gt-gold text-black rounded-xl
                           font-semibold text-base sm:text-lg
                           hover:bg-gt-gold-light hover:scale-105
                           transition-all duration-300
                           shadow-lg hover:shadow-gt-gold/50"
              >
                {tr.hero.cta1}
              </Link>
              
              <a 
                href="#info"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-lg
                           border border-white/10 text-white rounded-xl
                           font-semibold text-base sm:text-lg
                           hover:bg-white/10 hover:border-gt-gold/30
                           transition-all duration-300"
              >
                {tr.hero.cta2}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Indicador scroll - oculto en mobile pequeño */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="hidden sm:block absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
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

      {/* ESTILO DE VIDA AUTOMOVILÍSTICO */}
      <section id="info" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-black to-gt-gray-dark">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block px-4 py-2 bg-gt-gold/10 rounded-full mb-4">
              <span className="text-gt-gold font-march font-semibold text-xs sm:text-sm uppercase tracking-widest">
                {tr.lifestyle.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-march font-bold text-white mb-4 px-4">
              {tr.lifestyle.title}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              {tr.lifestyle.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Foto principal */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden group"
            >
              {estiloVidaImageUrl && (
                <img 
                  src={estiloVidaImageUrl}
                  alt="GT Race Marbella Club"
                  className="w-full h-[400px] sm:h-[600px] object-cover transition-transform 
                             duration-500 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8">
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-black/60 backdrop-blur-lg rounded-xl p-2 sm:p-4 border border-gt-gold/20">
                    <div className="text-xl sm:text-3xl font-bold font-march text-gt-gold">200+</div>
                    <div className="text-xs sm:text-sm text-gray-300">{tr.lifestyle.stat1}</div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-lg rounded-xl p-2 sm:p-4 border border-gt-gold/20">
                    <div className="text-xl sm:text-3xl font-bold font-march text-gt-gold">50+</div>
                    <div className="text-xs sm:text-sm text-gray-300">{tr.lifestyle.stat2}</div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-lg rounded-xl p-2 sm:p-4 border border-gt-gold/20">
                    <div className="text-xl sm:text-3xl font-bold font-march text-gt-gold">2025</div>
                    <div className="text-xs sm:text-sm text-gray-300">{tr.lifestyle.stat3}</div>
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
              className="px-4"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-march font-bold text-white mb-4 sm:mb-6">
                {tr.lifestyle.heading}
              </h3>
              
              <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
                <p>{tr.lifestyle.p1}</p>
                <p>{tr.lifestyle.p2}</p>
                <p>{tr.lifestyle.p3}</p>
              </div>

              <Link 
                to="/membership"
                className="inline-flex items-center mt-6 sm:mt-8 px-6 py-3 
                           bg-gt-gold text-black rounded-xl font-semibold text-sm sm:text-base
                           hover:bg-gt-gold-light transition-all duration-300
                           hover:scale-105 shadow-lg hover:shadow-gt-gold/50"
              >
                {tr.lifestyle.cta}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CARRUSEL DE INSTALACIONES */}
      <section className="py-16 sm:py-24 px-4 bg-gt-gray-dark">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-march font-bold text-white mb-4 px-4">
              {tr.gallery.title}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg px-4">
              {tr.gallery.subtitle}
            </p>
          </motion.div>

          {/* Carrusel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex"
                animate={{
                  x: [0, `-${100 * (galeria.length / 3)}%`],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 35,
                    ease: "linear",
                  },
                }}
              >
                {[...galeria, ...galeria].map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2"
                  >
                    <Link
                      to={item.link}
                      className="block relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden group cursor-pointer"
                    >
                      {item.url && (
                        <img 
                          src={item.url}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform 
                                     duration-700 group-hover:scale-110"
                        />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent
                                      opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-gt-gold/0 via-gt-gold/0 to-gt-gold/20
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 
                                      transform translate-y-2 group-hover:translate-y-0
                                      transition-all duration-300">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 
                                        rounded-xl p-3 sm:p-4">
                          <h3 className="text-white text-base sm:text-xl font-march font-bold mb-1">
                            {item.alt}
                          </h3>
                          <div className="flex items-center text-gt-gold text-xs sm:text-sm">
                            <span>{tr.gallery.viewMore}</span>
                            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 
                                      bg-black/60 backdrop-blur-lg rounded-full
                                      flex items-center justify-center
                                      border border-gt-gold/30
                                      opacity-0 group-hover:opacity-100
                                      transition-all duration-300">
                        <span className="text-gt-gold font-march font-bold text-sm sm:text-base">
                          {(index % galeria.length) + 1}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex justify-center mt-6 sm:mt-8 gap-2">
              {galeria.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-gt-gold/30 hover:bg-gt-gold transition-colors"
                />
              ))}
            </div>

            <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-gt-gray-dark to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-gt-gray-dark to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ACORDEÓN */}
      <section className="py-16 sm:py-24 px-4 bg-black">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-march font-bold text-white mb-4 px-4">
              {tr.accordion.title}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg px-4">
              {tr.accordion.subtitle}
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
                {openAccordion === section.id && section.background && (
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={section.background}
                      alt={section.title}
                      className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80" />
                  </div>
                )}

                <button
                  onClick={() => handleAccordionToggle(section.id)}
                  className="relative z-10 w-full px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between
                             text-left transition-all duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`
                      p-2 sm:p-3 rounded-xl transition-all duration-300
                      ${openAccordion === section.id
                        ? 'bg-gt-gold text-black'
                        : 'bg-white/5 text-gt-gold'
                      }
                    `}>
                      {section.icon}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-march font-bold text-white">
                      {section.title}
                    </h3>
                  </div>

                  <div className={`
                    text-gt-gold transition-transform duration-300
                    ${openAccordion === section.id ? 'rotate-180' : ''}
                  `}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openAccordion === section.id ? 'auto' : 0,
                    opacity: openAccordion === section.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="relative z-10 px-4 sm:px-8 pb-6 sm:pb-8 pt-0">
                    <p className="text-gray-300 text-sm sm:text-lg leading-relaxed max-w-3xl">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCIAS */}
      <section className="relative py-20 sm:py-32 px-4 overflow-hidden">
        {galeriaImg1 && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${galeriaImg1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent" />
        
        <div className="relative z-10 container mx-auto max-w-4xl text-center pt-12 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-black/40 backdrop-blur-xl 
                            border border-gt-gold/30 rounded-full mb-6 sm:mb-8">
              <span className="text-gt-gold font-march font-semibold text-xs sm:text-sm uppercase tracking-widest">
                {tr.experience.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-march font-black text-white mb-4 sm:mb-6 
                           drop-shadow-2xl px-4">
              {tr.experience.title.split(' GT Race')[0]}
              <span className="block text-gt-gold mt-2">GT Race</span>
            </h2>
            
            <p className="text-base sm:text-xl text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed
                          drop-shadow-lg px-4">
              {tr.experience.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Link 
                to="/events"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gt-gold text-black rounded-xl
                           font-semibold text-base sm:text-lg
                           hover:bg-gt-gold-light hover:scale-105
                           transition-all duration-300
                           shadow-2xl hover:shadow-gt-gold/50"
              >
                {tr.experience.cta1}
              </Link>
              
              <Link 
                to="/membership"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-lg
                           border border-white/20 text-white rounded-xl
                           font-semibold text-base sm:text-lg
                           hover:bg-white/20 hover:border-gt-gold/50
                           transition-all duration-300
                           shadow-2xl"
              >
                {tr.experience.cta2}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        {formularioBgUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${formularioBgUrl})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-gt-gray-dark via-black to-gt-gray-dark" />
        
        <div className="relative z-10 container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-march font-bold text-white mb-4 px-4">
              {tr.form.title}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg px-4">
              {tr.form.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 
                       rounded-2xl p-6 sm:p-8 md:p-12"
          >
            {/* Mensaje de éxito */}
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
                    <h4 className="text-green-500 font-semibold mb-1">
                      {language === 'es' ? '¡Solicitud enviada!' : 'Request submitted!'}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {language === 'es' 
                        ? 'Gracias por tu interés. Nos pondremos en contacto contigo pronto.' 
                        : 'Thank you for your interest. We will contact you soon.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mensaje de error */}
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
                    <h4 className="text-red-500 font-semibold mb-1">
                      {language === 'es' ? 'Error al enviar' : 'Error submitting'}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {language === 'es' 
                        ? 'Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.' 
                        : 'There was a problem submitting your request. Please try again.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {tr.form.name} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 text-sm sm:text-base
                             focus:outline-none focus:border-gt-gold/50
                             transition-colors duration-300"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {tr.form.email} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 text-sm sm:text-base
                             focus:outline-none focus:border-gt-gold/50
                             transition-colors duration-300"
                  placeholder="juan@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {tr.form.phone} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 text-sm sm:text-base
                             focus:outline-none focus:border-gt-gold/50
                             transition-colors duration-300"
                  placeholder="+34 600 000 000"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {tr.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                             text-white placeholder-gray-500 text-sm sm:text-base
                             focus:outline-none focus:border-gt-gold/50
                             transition-colors duration-300 resize-none"
                  placeholder={tr.form.messagePlaceholder}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="mt-1 w-4 h-4 rounded border-white/20 
                             bg-white/5 text-gt-gold
                             focus:ring-gt-gold focus:ring-offset-0"
                />
                <label htmlFor="privacy" className="text-xs sm:text-sm text-gray-400">
                  {tr.form.privacy}
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl
                  font-semibold text-base sm:text-lg
                  transition-all duration-300
                  shadow-lg
                  ${isSubmitting
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gt-gold text-black hover:bg-gt-gold-light hover:scale-105 hover:shadow-gt-gold/50'
                  }
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {language === 'es' ? 'Enviando...' : 'Sending...'}
                  </span>
                ) : (
                  tr.form.submit
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Club;