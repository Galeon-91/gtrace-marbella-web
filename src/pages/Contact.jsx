import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabase/supabaseClient';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: supabaseError } = await supabase
        .from('contact_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          }
        ]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Scroll al mensaje de éxito
      setTimeout(() => {
        document.getElementById('success-message')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

    } catch (err) {
      console.error('Error:', err);
      setError(language === 'es' 
        ? 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.' 
        : 'There was an error sending the message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const content = {
    es: {
      badge: 'Contáctanos',
      title: 'Estamos aquí para ayudarte',
      subtitle: '¿Tienes alguna pregunta? Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.',
      infoTitle: 'Información de contacto',
      address: 'Dirección',
      addressText: 'C.C Rimesa-Tino N-340, Km. 175, 29660\nMálaga, España',
      email: 'Email',
      phone: 'Teléfono',
      schedule: 'Horario',
      scheduleText: 'Lunes - Viernes: 9:00 - 20:00\nSábado - Domingo: 10:00 - 18:00',
      followUs: 'Síguenos',
      formTitle: 'Envíanos un mensaje',
      nameLabel: 'Nombre completo',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Email',
      emailPlaceholder: 'tu@email.com',
      phoneLabel: 'Teléfono',
      phonePlaceholder: '+34 600 000 000',
      subjectLabel: 'Asunto',
      subjectPlaceholder: '¿En qué podemos ayudarte?',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Escribe tu mensaje aquí...',
      submitButton: 'Enviar mensaje',
      sending: 'Enviando...',
      successMessage: '¡Mensaje enviado con éxito! Te contactaremos pronto.',
    },
    en: {
      badge: 'Contact Us',
      title: 'We\'re here to help',
      subtitle: 'Have a question? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      infoTitle: 'Contact information',
      address: 'Address',
      addressText: 'Puerto Banús, Marbella\nMálaga, Spain',
      email: 'Email',
      phone: 'Phone',
      schedule: 'Schedule',
      scheduleText: 'Monday - Friday: 9:00 AM - 18:30 PM\nSaturday: 10:00 AM - 14:00 PM',
      followUs: 'Follow us',
      formTitle: 'Send us a message',
      nameLabel: 'Full name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      phoneLabel: 'Phone',
      phonePlaceholder: '+34 600 000 000',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'How can we help you?',
      messageLabel: 'Message',
      messagePlaceholder: 'Write your message here...',
      submitButton: 'Send message',
      sending: 'Sending...',
      successMessage: 'Message sent successfully! We\'ll contact you soon.',
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* HERO SECTION */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-b from-gt-gray-dark via-black to-black" />
        
        {/* Circles decorativos */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gt-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gt-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-6 py-3 bg-gt-gold/10 backdrop-blur-xl 
                         border border-gt-gold/30 rounded-full mb-6
                         hover:bg-gt-gold/20 transition-all duration-300"
            >
              <span className="text-gt-gold font-march font-semibold text-sm uppercase tracking-widest">
                {t.badge}
              </span>
            </motion.div>

            {/* Título */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-march font-bold text-white mb-6
                           drop-shadow-2xl">
              {t.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* INFORMACIÓN DE CONTACTO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 
                              rounded-3xl p-8 lg:p-10
                              hover:border-gt-gold/30 transition-all duration-500
                              shadow-2xl">
                <h2 className="text-3xl font-march font-bold text-white mb-8">
                  {t.infoTitle}
                </h2>

                <div className="space-y-6">
                  {/* Dirección */}
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl
                               hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gt-gold/10 rounded-xl flex items-center justify-center flex-shrink-0
                                    border border-gt-gold/20">
                      <svg className="w-6 h-6 text-gt-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1 text-lg">{t.address}</h3>
                      <p className="text-gray-400 whitespace-pre-line leading-relaxed">
                        {t.addressText}
                      </p>
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl
                               hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gt-gold/10 rounded-xl flex items-center justify-center flex-shrink-0
                                    border border-gt-gold/20">
                      <svg className="w-6 h-6 text-gt-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1 text-lg">{t.email}</h3>
                      <a href="mailto:info@gtracemarbella.com" 
                         className="text-gray-400 hover:text-gt-gold transition-colors">
                        info@gtracemarbella.com
                      </a>
                    </div>
                  </motion.div>

                  {/* Teléfono */}
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl
                               hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gt-gold/10 rounded-xl flex items-center justify-center flex-shrink-0
                                    border border-gt-gold/20">
                      <svg className="w-6 h-6 text-gt-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1 text-lg">{t.phone}</h3>
                      <a href="tel:+34687999427" 
                         className="text-gray-400 hover:text-gt-gold transition-colors">
                        +34 687 99 94 27
                      </a>
                    </div>
                  </motion.div>

                  {/* Horario */}
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl
                               hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gt-gold/10 rounded-xl flex items-center justify-center flex-shrink-0
                                    border border-gt-gold/20">
                      <svg className="w-6 h-6 text-gt-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1 text-lg">{t.schedule}</h3>
                      <p className="text-gray-400 whitespace-pre-line leading-relaxed">
                        {t.scheduleText}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Redes sociales */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-white font-semibold mb-4 text-lg">{t.followUs}</h3>
                  <div className="flex gap-3">
                    <a href="#" className="w-12 h-12 bg-white/5 hover:bg-gt-gold/20 
                                          border border-white/10 hover:border-gt-gold/50 
                                          rounded-xl flex items-center justify-center 
                                          transition-all duration-300 group">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-gt-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-white/5 hover:bg-gt-gold/20 
                                          border border-white/10 hover:border-gt-gold/50 
                                          rounded-xl flex items-center justify-center 
                                          transition-all duration-300 group">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-gt-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FORMULARIO DE CONTACTO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 
                              rounded-3xl p-8 lg:p-10
                              hover:border-gt-gold/30 transition-all duration-500
                              shadow-2xl">
                <h2 className="text-3xl font-march font-bold text-white mb-6">
                  {t.formTitle}
                </h2>

                {/* Mensaje de éxito */}
                {success && (
                  <motion.div 
                    id="success-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-500 font-medium">
                        {t.successMessage}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Mensaje de error */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl"
                  >
                    <p className="text-red-500">{error}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      {t.nameLabel} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-gray-500
                                 focus:outline-none focus:border-gt-gold/50 focus:bg-white/10
                                 transition-all duration-300"
                      placeholder={t.namePlaceholder}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      {t.emailLabel} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-gray-500
                                 focus:outline-none focus:border-gt-gold/50 focus:bg-white/10
                                 transition-all duration-300"
                      placeholder={t.emailPlaceholder}
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label htmlFor="phone" className="block text-white font-medium mb-2">
                      {t.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-gray-500
                                 focus:outline-none focus:border-gt-gold/50 focus:bg-white/10
                                 transition-all duration-300"
                      placeholder={t.phonePlaceholder}
                    />
                  </div>

                  {/* Asunto */}
                  <div>
                    <label htmlFor="subject" className="block text-white font-medium mb-2">
                      {t.subjectLabel} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-gray-500
                                 focus:outline-none focus:border-gt-gold/50 focus:bg-white/10
                                 transition-all duration-300"
                      placeholder={t.subjectPlaceholder}
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">
                      {t.messageLabel} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                                 text-white placeholder-gray-500
                                 focus:outline-none focus:border-gt-gold/50 focus:bg-white/10
                                 transition-all duration-300 resize-none"
                      placeholder={t.messagePlaceholder}
                    />
                  </div>

                  {/* Botón submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full px-8 py-4 bg-gt-gold text-black rounded-xl
                               font-semibold text-lg
                               hover:bg-gt-gold-light 
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all duration-300
                               shadow-lg hover:shadow-gt-gold/50
                               flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t.sending}
                      </>
                    ) : (
                      <>
                        {t.submitButton}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;