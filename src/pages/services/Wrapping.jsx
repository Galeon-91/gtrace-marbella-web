import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';
import { useSupabaseAsset } from '../../hooks/useSupabaseAsset';
import { supabase } from '../../../supabase/supabaseClient';

// Iconos SVG personalizados
const PaintIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 2L4 10V14L12 22L20 14V10L12 2Z" fill="currentColor" opacity="0.2"/>
    <path d="M12 2L4 10V14L12 22L20 14V10L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ShieldLayerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" fill="currentColor" opacity="0.1"/>
    <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 6L7 8.5V12C7 15 9 17.5 12 18C15 17.5 17 15 17 12V8.5L12 6Z" fill="currentColor" opacity="0.2"/>
    <path d="M12 6L7 8.5V12C7 15 9 17.5 12 18C15 17.5 17 15 17 12V8.5L12 6Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" fill="currentColor" opacity="0.2"/>
    <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 15L20 18L23 19L20 20L19 23L18 20L15 19L18 18L19 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M5 13L7 7H17L19 13M5 13H19M5 13L4 17M19 13L20 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8" cy="17" r="2" fill="currentColor" opacity="0.2"/>
    <circle cx="8" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="16" cy="17" r="2" fill="currentColor" opacity="0.2"/>
    <circle cx="16" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// ✅ COMPONENTE MODAL DEFINIDO FUERA PARA EVITAR BUG DE RECARGA
const ServiceFormModal = ({ serviceType, onClose, language, isSubmitting, submitStatus, formData, handleInputChange, handleSubmit, t }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gt-gray-dark border border-white/10 rounded-3xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-march font-bold text-white">
            {t.requestService}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-green-500 font-semibold mb-1">{t.formSuccess}</h4>
                <p className="text-gray-300 text-sm">{t.formSuccessMsg}</p>
              </div>
            </div>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-red-500 font-semibold mb-1">{t.formError}</h4>
                <p className="text-gray-300 text-sm">{t.formErrorMsg}</p>
              </div>
            </div>
          </motion.div>
        )}

        <form onSubmit={(e) => handleSubmit(e, serviceType)} className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              {t.formName} *
            </label>
            <input
              type="text"
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

          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              {t.formEmail} *
            </label>
            <input
              type="email"
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

          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              {t.formPhone} *
            </label>
            <input
              type="tel"
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

          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              {t.formMessage}
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                         text-white placeholder-gray-500
                         focus:outline-none focus:border-gt-gold/50
                         transition-colors duration-300 resize-none"
              placeholder={language === 'es' ? 'Cuéntanos sobre tu proyecto...' : 'Tell us about your project...'}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full px-6 py-3 rounded-xl font-semibold
              transition-all duration-300
              ${isSubmitting
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-gt-gold text-black hover:bg-gt-gold-light hover:scale-105'
              }
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t.formSending}
              </span>
            ) : (
              t.formSubmit
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const Wrapping = () => {
  const { language } = useLanguage();
  
  // Video desde Supabase
  const { url: wrappingVideoUrl } = useSupabaseAsset('videos/wrapping.mp4');

  // Estados para formularios
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const content = {
    es: {
      badge: 'Car Wrapping & PPF',
      title: 'Transformamos tu Vehículo',
      subtitle: 'Servicios profesionales de vinilado con films de cambio de color de alta calidad y gráficos personalizados. Protección PPF premium que protege tu pintura de todos los peligros de la carretera.',
      wrappingTitle: 'Car Wrapping',
      wrappingDescription: 'Desde profundos acabados satinados hasta vibrantes tonos mate, cada envoltura está hecha a la perfección. No es sólo un vinilo: es un reflejo de poder, elegancia e individualidad.',
      ppfTitle: 'PPF',
      ppfDescription: 'Película protectora transparente de alto rendimiento que actúa como un escudo invisible, defendiendo la pintura original de picaduras, arañazos, rayos UV y contaminantes.',
      experienceTitle: 'Experiencia Profesional',
      experienceText: 'En GT Race Marbella dejarás tu coche en manos de entusiastas con muchos años de experiencia. También tenemos experiencia en vinilado de motos, yates y coches de carreras.',
      requestService: 'Solicitar Servicio',
      whyChoose: 'Por qué elegirnos',
      videoTitle: 'Nuestro Trabajo en Acción',
      formName: 'Nombre completo',
      formEmail: 'Email',
      formPhone: 'Teléfono',
      formMessage: 'Mensaje (opcional)',
      formSubmit: 'Enviar Solicitud',
      formSending: 'Enviando...',
      formSuccess: '¡Solicitud enviada!',
      formSuccessMsg: 'Gracias por tu interés. Nos pondremos en contacto contigo pronto.',
      formError: 'Error al enviar',
      formErrorMsg: 'Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.',
      // SEO
      seoTitle: 'Car Wrapping & PPF Marbella | GT Race Marbella',
      seoDescription: 'Servicios profesionales de car wrapping y protección PPF en Marbella. Vinilado premium, acabados mate, satinado y brillante. Experiencia en coches deportivos, motos y yates.',
      seoKeywords: 'car wrapping marbella, ppf marbella, vinilado coche marbella, wrapping marbella, protección pintura marbella, wrapping coches lujo',
    },
    en: {
      badge: 'Car Wrapping & PPF',
      title: 'Transform Your Vehicle',
      subtitle: 'Professional vehicle wrapping services with top-quality color-changing films and custom graphics. Premium PPF protection film that shields your paint from all road hazards.',
      wrappingTitle: 'Car Wrapping',
      wrappingDescription: 'From deep satin finishes to vibrant matte tones, each wrap is crafted to perfection. It\'s not just vinyl: it\'s a reflection of power, elegance, and individuality.',
      ppfTitle: 'PPF',
      ppfDescription: 'High-performance transparent protective film that acts as an invisible shield, defending original paint from chips, scratches, UV rays, and contaminants.',
      experienceTitle: 'Professional Experience',
      experienceText: 'At GT Race Marbella you will leave your car in the hands of enthusiasts with many years of experience. We also have experience in wrapping motorcycles, yachts, and racing cars.',
      requestService: 'Request Service',
      whyChoose: 'Why Choose Us',
      videoTitle: 'Our Work in Action',
      formName: 'Full name',
      formEmail: 'Email',
      formPhone: 'Phone',
      formMessage: 'Message (optional)',
      formSubmit: 'Submit Request',
      formSending: 'Sending...',
      formSuccess: 'Request sent!',
      formSuccessMsg: 'Thank you for your interest. We will contact you soon.',
      formError: 'Error submitting',
      formErrorMsg: 'There was a problem submitting your request. Please try again.',
      // SEO
      seoTitle: 'Car Wrapping & PPF Marbella | GT Race Marbella',
      seoDescription: 'Professional car wrapping and PPF protection services in Marbella. Premium vinyl wrapping, matte, satin and gloss finishes. Experience with sports cars, motorcycles and yachts.',
      seoKeywords: 'car wrapping marbella, ppf marbella, vehicle wrap marbella, paint protection marbella, luxury car wrapping',
    }
  };

  const t = content[language];

  const wrappingFeatures = [
    {
      title: language === 'es' ? 'Acabados Premium' : 'Premium Finishes',
      description: language === 'es' ? 'Satinado, mate, brillante, metálico y más' : 'Satin, matte, gloss, metallic and more',
      icon: <PaintIcon />
    },
    {
      title: language === 'es' ? 'Protección de Pintura' : 'Paint Protection',
      description: language === 'es' ? 'Protege la pintura original mientras cambias el look' : 'Protects original paint while changing the look',
      icon: <ShieldLayerIcon />
    },
    {
      title: language === 'es' ? 'Diseños Personalizados' : 'Custom Designs',
      description: language === 'es' ? 'Gráficos exclusivos adaptados a tu visión' : 'Exclusive graphics tailored to your vision',
      icon: <SparklesIcon />
    },
    {
      title: language === 'es' ? 'Todo Tipo de Vehículos' : 'All Vehicle Types',
      description: language === 'es' ? 'Coches, motos, yates y coches de carreras' : 'Cars, motorcycles, yachts, and racing cars',
      icon: <CarIcon />
    }
  ];

  const ppfFeatures = [
    {
      title: language === 'es' ? 'Auto-regeneración' : 'Self-Healing',
      description: language === 'es' ? 'Elimina pequeños arañazos automáticamente con calor' : 'Removes small scratches automatically with heat'
    },
    {
      title: language === 'es' ? 'Protección UV' : 'UV Protection',
      description: language === 'es' ? 'Previene decoloración y daño solar' : 'Prevents fading and sun damage'
    },
    {
      title: language === 'es' ? 'Resistencia a Impactos' : 'Impact Resistance',
      description: language === 'es' ? 'Protege contra piedras, gravilla y escombros' : 'Protects against stones, gravel, and debris'
    },
    {
      title: language === 'es' ? 'Acabados Versátiles' : 'Versatile Finishes',
      description: language === 'es' ? 'Disponible en brillante, mate y satinado' : 'Available in gloss, matte, and satin'
    }
  ];

  const handleSubmit = async (e, serviceType) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { data, error } = await supabase
        .from('service_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message || null,
            service_type: serviceType,
            source: 'wrapping_page',
            language: language,
            status: 'pending'
          }
        ])
        .select();

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => {
        setActiveForm(null);
        setSubmitStatus(null);
      }, 3000);

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
    <>
      {/* SEO */}
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDescription} />
        <meta name="keywords" content={t.seoKeywords} />
        
        {/* Open Graph */}
        <meta property="og:title" content={t.seoTitle} />
        <meta property="og:description" content={t.seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gtracemarbella.com/services/wrapping" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.seoTitle} />
        <meta name="twitter:description" content={t.seoDescription} />
      </Helmet>

      <div className="min-h-screen bg-black pt-20">
        {/* Formulario Modal */}
        {activeForm && (
          <ServiceFormModal
            serviceType={activeForm}
            onClose={() => {
              setActiveForm(null);
              setSubmitStatus(null);
            }}
            language={language}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            t={t}
          />
        )}

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
                <span className="text-gt-gold font-march font-semibold text-sm uppercase tracking-widest">
                  {t.badge}
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-march font-bold text-white mb-6 drop-shadow-2xl">
                {t.title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t.subtitle}
              </p>
            </motion.div>

            {/* VIDEO DESDE SUPABASE - REDUCIDO Y SIN ZOOM */}
            {wrappingVideoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-20"
              >
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-march font-bold text-white">
                    {t.videoTitle}
                  </h2>
                </div>
                
                {/* Container con max-width para reducir tamaño */}
                <div className="max-w-4xl mx-auto">
                  {/* Marco dorado con glassmorphism */}
                  <div className="relative bg-gradient-to-br from-gt-gold/20 via-black/40 to-gt-gold/20 
                                  backdrop-blur-xl rounded-3xl p-2 border-2 border-gt-gold/50
                                  shadow-2xl shadow-gt-gold/20">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-gt-gold/30 to-orange-500/30 
                                    rounded-3xl blur-xl opacity-50" />
                    
                    {/* Video container con aspect ratio - OBJECT-CONTAIN PARA NO HACER ZOOM */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                      <video
                        controls
                        className="w-full h-full object-contain"
                        preload="metadata"
                      >
                        <source src={wrappingVideoUrl} type="video/mp4" />
                        {language === 'es' 
                          ? 'Tu navegador no soporta el tag de video.' 
                          : 'Your browser does not support the video tag.'}
                      </video>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CAR WRAPPING SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-20"
            >
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-white/10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="w-20 h-20 text-gt-gold mb-6">
                      <PaintIcon />
                    </div>
                    <h2 className="text-4xl font-march font-bold text-white mb-4">{t.wrappingTitle}</h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      {t.wrappingDescription}
                    </p>
                    <button
                      onClick={() => setActiveForm('wrapping')}
                      className="inline-block px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold
                                 hover:bg-gt-gold-light hover:scale-105 transition-all duration-300
                                 shadow-lg hover:shadow-gt-gold/50"
                    >
                      {t.requestService}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {wrappingFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6
                                   hover:border-gt-gold/30 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="w-12 h-12 text-gt-gold mb-3">
                          {feature.icon}
                        </div>
                        <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PPF SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-20"
            >
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-white/10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="grid grid-cols-1 gap-4">
                      {ppfFeatures.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-start gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4
                                     hover:border-gt-gold/30 transition-all duration-300"
                        >
                          <svg className="w-6 h-6 text-gt-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div>
                            <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                            <p className="text-gray-400 text-sm">{feature.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="order-1 lg:order-2">
                    <div className="w-20 h-20 text-gt-gold mb-6">
                      <ShieldLayerIcon />
                    </div>
                    <h2 className="text-4xl font-march font-bold text-white mb-4">{t.ppfTitle}</h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      {t.ppfDescription}
                    </p>
                    <button
                      onClick={() => setActiveForm('ppf')}
                      className="inline-block px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold
                                 hover:bg-gt-gold-light hover:scale-105 transition-all duration-300
                                 shadow-lg hover:shadow-gt-gold/50"
                    >
                      {t.requestService}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* EXPERIENCE SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-r from-gt-gold/10 to-transparent backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-gt-gold/30">
                <h2 className="text-3xl font-march font-bold text-white mb-4">{t.experienceTitle}</h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                  {t.experienceText}
                </p>
              </div>
            </motion.div>

            {/* WHY CHOOSE US */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
                <h2 className="text-3xl font-march font-bold text-white mb-4">{t.whyChoose}</h2>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-gt-gold"></div>
                    {language === 'es' ? 'Años de experiencia en wrapping premium' : 'Years of experience in premium wrapping'}
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-gt-gold"></div>
                    {language === 'es' ? 'Materiales de la más alta calidad' : 'Highest quality materials'}
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-gt-gold"></div>
                    {language === 'es' ? 'Instalación profesional certificada' : 'Certified professional installation'}
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-gt-gold"></div>
                    {language === 'es' ? 'Garantía de satisfacción' : 'Satisfaction guarantee'}
                  </li>
                </ul>
                <Link
                  to="/membership"
                  className="inline-block px-6 py-3 bg-gt-gold text-black rounded-xl font-semibold
                             hover:bg-gt-gold-light transition-all duration-300"
                >
                  {language === 'es' ? 'Únete al Club' : 'Join the Club'}
                </Link>
              </div>

              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
                <h2 className="text-3xl font-march font-bold text-white mb-4">
                  {language === 'es' ? 'Contáctanos' : 'Contact Us'}
                </h2>
                <p className="text-gray-300 mb-4">
                  {language === 'es' 
                    ? 'Consulta con nuestros expertos sobre tu proyecto de wrapping o PPF.' 
                    : 'Consult with our experts about your wrapping or PPF project.'}
                </p>
                <div className="space-y-3">
                  <a href="tel:+34687999427" className="flex items-center gap-3 text-gt-gold hover:text-gt-gold-light transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +34 687 99 94 27
                  </a>
                  <a href="mailto:members@gtracemarbella.com" className="flex items-center gap-3 text-gt-gold hover:text-gt-gold-light transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    members@gtracemarbella.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Wrapping;