import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
  const { language } = useLanguage();

  const t = {
    es: {
      title: 'Política de Privacidad',
      subtitle: 'GT Race Marbella',
<<<<<<< HEAD
      lastUpdated: 'Última actualización: 22 de Febrero de 2025',
=======
      lastUpdated: 'Última actualización: 22 de Febrero de 2026',
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
      
      section1Title: '1. Información que Recopilamos',
      section1Content: `En GT Race Marbella, recopilamos la siguiente información personal cuando solicitas una membresía o utilizas nuestros servicios:

• Información de Contacto: nombre, apellidos, dirección de correo electrónico, número de teléfono, dirección postal
• Información de Identificación: fecha de nacimiento, documentos de identidad cuando sea necesario
• Información de Pago: datos de tarjeta de crédito/débito, información bancaria para procesar pagos
• Información del Vehículo: detalles sobre los vehículos que posees o deseas comprar/vender
• Preferencias: intereses, preferencias de comunicación, historial de eventos y servicios`,

      section2Title: '2. Cómo Utilizamos tu Información',
      section2Content: `Utilizamos la información recopilada para:

• Procesar tu solicitud de membresía y gestionar tu cuenta
• Proporcionar los servicios solicitados (Car Hotel, talleres, eventos, etc.)
• Procesar transacciones y pagos
• Comunicarnos contigo sobre servicios, eventos y actualizaciones
• Mejorar nuestros servicios y personalizar tu experiencia
• Cumplir con obligaciones legales y regulatorias
• Proteger contra fraude y actividades no autorizadas`,

      section3Title: '3. Compartir Información',
      section3Content: `No vendemos tu información personal a terceros. Podemos compartir tu información con:

• Proveedores de Servicios: empresas que nos ayudan a operar nuestro negocio (procesamiento de pagos, hosting, análisis)
• Socios Comerciales: para eventos conjuntos o servicios específicos, con tu consentimiento
• Autoridades Legales: cuando sea requerido por ley o para proteger nuestros derechos
• Clubes Asociados: si eres miembro Platinum y utilizas nuestra red internacional, con tu consentimiento`,

      section4Title: '4. Seguridad de los Datos',
      section4Content: `Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal:

• Encriptación SSL/TLS para transmisión de datos
• Almacenamiento seguro en servidores protegidos
• Acceso limitado solo a personal autorizado
• Auditorías de seguridad regulares
• Copias de seguridad periódicas
• Políticas estrictas de manejo de datos`,

      section5Title: '5. Tus Derechos',
      section5Content: `Bajo la normativa de protección de datos (GDPR/LOPD), tienes derecho a:

• Acceder a tu información personal
• Rectificar datos inexactos o incompletos
• Solicitar la eliminación de tus datos (derecho al olvido)
• Limitar el procesamiento de tus datos
• Portabilidad de datos
• Oponerte al procesamiento de tus datos
• Retirar el consentimiento en cualquier momento
• Presentar una reclamación ante la autoridad de protección de datos`,

      section6Title: '6. Cookies y Tecnologías de Rastreo',
      section6Content: `Nuestro sitio web utiliza cookies y tecnologías similares para:

• Mantener tu sesión iniciada
• Recordar tus preferencias
• Analizar el tráfico del sitio web
• Mejorar la experiencia del usuario
• Publicidad personalizada (si aceptas)

Puedes gestionar las cookies a través de la configuración de tu navegador.`,

      section7Title: '7. Retención de Datos',
      section7Content: `Conservamos tu información personal solo durante el tiempo necesario para:

• Cumplir con los fines para los que fue recopilada
• Satisfacer requisitos legales y contables
• Resolver disputas y hacer cumplir nuestros acuerdos

Los datos de membresías activas se conservan mientras la membresía esté vigente. Los datos de membresías canceladas se conservan durante 6 años por requisitos fiscales y legales.`,

      section8Title: '8. Transferencias Internacionales',
      section8Content: `Si eres miembro Platinum y utilizas clubes asociados fuera de la UE, tu información puede ser transferida a otros países. Nos aseguramos de que estas transferencias cumplan con las leyes de protección de datos aplicables mediante cláusulas contractuales estándar aprobadas.`,

      section9Title: '9. Menores de Edad',
      section9Content: `Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionalmente información de menores de edad. Si descubrimos que hemos recopilado información de un menor, la eliminaremos de inmediato.`,

      section10Title: '10. Cambios en esta Política',
      section10Content: `Podemos actualizar esta política de privacidad periódicamente. Te notificaremos sobre cambios significativos por correo electrónico o mediante un aviso destacado en nuestro sitio web. El uso continuado de nuestros servicios después de dichos cambios constituye tu aceptación de la nueva política.`,

      section11Title: '11. Contacto',
      section11Content: `Para ejercer tus derechos o si tienes preguntas sobre esta política de privacidad, puedes contactarnos:

Email: members@gtracemarbella.com
Teléfono: +34 687 99 94 27
Dirección: Marbella, Málaga, España

Delegado de Protección de Datos: members@gtracemarbella.com`,

      backHome: 'Volver al inicio'
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'GT Race Marbella',
<<<<<<< HEAD
      lastUpdated: 'Last updated: February 22, 2025',
=======
      lastUpdated: 'Last updated: February 22, 2026',
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
      
      section1Title: '1. Information We Collect',
      section1Content: `At GT Race Marbella, we collect the following personal information when you apply for membership or use our services:

• Contact Information: name, surname, email address, phone number, postal address
• Identification Information: date of birth, identity documents when necessary
• Payment Information: credit/debit card data, bank information to process payments
• Vehicle Information: details about vehicles you own or wish to buy/sell
• Preferences: interests, communication preferences, event and service history`,

      section2Title: '2. How We Use Your Information',
      section2Content: `We use the collected information to:

• Process your membership application and manage your account
• Provide requested services (Car Hotel, workshops, events, etc.)
• Process transactions and payments
• Communicate with you about services, events and updates
• Improve our services and personalize your experience
• Comply with legal and regulatory obligations
• Protect against fraud and unauthorized activities`,

      section3Title: '3. Information Sharing',
      section3Content: `We do not sell your personal information to third parties. We may share your information with:

• Service Providers: companies that help us operate our business (payment processing, hosting, analytics)
• Business Partners: for joint events or specific services, with your consent
• Legal Authorities: when required by law or to protect our rights
• Associated Clubs: if you are a Platinum member and use our international network, with your consent`,

      section4Title: '4. Data Security',
      section4Content: `We implement technical and organizational security measures to protect your personal information:

• SSL/TLS encryption for data transmission
• Secure storage on protected servers
• Limited access to authorized personnel only
• Regular security audits
• Periodic backups
• Strict data handling policies`,

      section5Title: '5. Your Rights',
      section5Content: `Under data protection regulations (GDPR/LOPD), you have the right to:

• Access your personal information
• Rectify inaccurate or incomplete data
• Request deletion of your data (right to be forgotten)
• Limit the processing of your data
• Data portability
• Object to the processing of your data
• Withdraw consent at any time
• File a complaint with the data protection authority`,

      section6Title: '6. Cookies and Tracking Technologies',
      section6Content: `Our website uses cookies and similar technologies to:

• Keep you logged in
• Remember your preferences
• Analyze website traffic
• Improve user experience
• Personalized advertising (if you accept)

You can manage cookies through your browser settings.`,

      section7Title: '7. Data Retention',
      section7Content: `We retain your personal information only for as long as necessary to:

• Fulfill the purposes for which it was collected
• Satisfy legal and accounting requirements
• Resolve disputes and enforce our agreements

Active membership data is retained while the membership is valid. Cancelled membership data is retained for 6 years for tax and legal requirements.`,

      section8Title: '8. International Transfers',
      section8Content: `If you are a Platinum member and use associated clubs outside the EU, your information may be transferred to other countries. We ensure that these transfers comply with applicable data protection laws through approved standard contractual clauses.`,

      section9Title: '9. Minors',
      section9Content: `Our services are intended for individuals over 18 years of age. We do not intentionally collect information from minors. If we discover that we have collected information from a minor, we will delete it immediately.`,

      section10Title: '10. Changes to This Policy',
      section10Content: `We may update this privacy policy periodically. We will notify you of significant changes by email or through a prominent notice on our website. Continued use of our services after such changes constitutes your acceptance of the new policy.`,

      section11Title: '11. Contact',
      section11Content: `To exercise your rights or if you have questions about this privacy policy, you can contact us:

Email: members@gtracemarbella.com
Phone: +34 687 99 94 27
Address: Marbella, Málaga, Spain

Data Protection Officer: members@gtracemarbella.com`,

      backHome: 'Back to home'
    }
  }[language];

  return (
    <>
      <Helmet>
        <title>{t.title} - GT Race Marbella</title>
        <meta name="description" content={t.title} />
      </Helmet>

      <div className="min-h-screen bg-black text-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
<<<<<<< HEAD
            <h1 className="text-4xl md:text-6xl font-voga font-bold mb-4 bg-gradient-to-r from-gt-gold to-yellow-500 bg-clip-text text-transparent">
=======
            <h1 className="text-4xl md:text-6xl font-march font-bold mb-4 bg-gradient-to-r from-gt-gold to-yellow-500 bg-clip-text text-transparent">
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              {t.title}
            </h1>
            <p className="text-xl text-gray-400">{t.subtitle}</p>
            <p className="text-sm text-gray-500 mt-2">{t.lastUpdated}</p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 space-y-8"
          >
            
            {/* Section 1 */}
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t.section1Title}</h2>
=======
              <h2 className="text-2xl font-march font-bold text-gt-gold mb-4">{t.section1Title}</h2>
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t.section1Content}</p>
            </div>

            <div className="border-t border-white/10" />

            {/* Section 2 */}
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t.section2Title}</h2>
=======
              <h2 className="text-2xl font-march font-bold text-gt-gold mb-4">{t.section2Title}</h2>
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t.section2Content}</p>
            </div>

            <div className="border-t border-white/10" />

            {/* Section 3 */}
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t.section3Title}</h2>
=======
              <h2 className="text-2xl font-march font-bold text-gt-gold mb-4">{t.section3Title}</h2>
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t.section3Content}</p>
            </div>

            <div className="border-t border-white/10" />

            {/* Section 4 */}
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t.section4Title}</h2>
=======
              <h2 className="text-2xl font-march font-bold text-gt-gold mb-4">{t.section4Title}</h2>
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t.section4Content}</p>
            </div>

            <div className="border-t border-white/10" />

            {/* Section 5 */}
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t.section5Title}</h2>
=======
              <h2 className="text-2xl font-march font-bold text-gt-gold mb-4">{t.section5Title}</h2>
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t.section5Content}</p>
            </div>

            <div className="border-t border-white/10" />

            {/* Section 6 */}
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t.section6Title}</h2>
=======
              <h2 className="text-2xl font-march font-bold text-gt-gold mb-4">{t.section6Title}</h2>
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t.section6Content}</p>
            </div>

            <div className="border-t border-white/10" />

            {/* Section 7 */}
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t.section7Title}</h2>
=======
              <h2 className="text-2xl font-march font-bold text-gt-gold mb-4">{t.section7Title}</h2>
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t.section7Content}</p>
            </div>

            <div className="border-t border-white/10" />

            {/* Section 8 */}
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t.section8Title}</h2>
=======
              <h2 className="text-2xl font-march font-bold text-gt-gold mb-4">{t.section8Title}</h2>
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t.section8Content}</p>
            </div>

            <div className="border-t border-white/10" />

            {/* Section 9 */}
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t.section9Title}</h2>
=======
              <h2 className="text-2xl font-march font-bold text-gt-gold mb-4">{t.section9Title}</h2>
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t.section9Content}</p>
            </div>

            <div className="border-t border-white/10" />

            {/* Section 10 */}
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t.section10Title}</h2>
=======
              <h2 className="text-2xl font-march font-bold text-gt-gold mb-4">{t.section10Title}</h2>
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t.section10Content}</p>
            </div>

            <div className="border-t border-white/10" />

            {/* Section 11 */}
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t.section11Title}</h2>
=======
              <h2 className="text-2xl font-march font-bold text-gt-gold mb-4">{t.section11Title}</h2>
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t.section11Content}</p>
            </div>

          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gt-gold text-black rounded-xl font-semibold hover:bg-gt-gold-light transition-all duration-300"
            >
              ← {t.backHome}
            </Link>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default Privacy;