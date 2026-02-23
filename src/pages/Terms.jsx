import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  const { language } = useLanguage();

  const t = {
    es: {
      title: 'Términos y Condiciones',
      subtitle: 'GT Race Marbella',
      lastUpdated: 'Última actualización: 22 de Febrero de 2025',
      
      section1Title: '1. Aceptación de los Términos',
      section1Content: `Al acceder y utilizar los servicios de GT Race Marbella, aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.

Estos términos se aplican a todos los visitantes, miembros y usuarios de nuestros servicios, incluyendo pero no limitado a Car Hotel, venta de vehículos, eventos, talleres y programas de racing.`,

      section2Title: '2. Membresía',
      section2Content: `Tipos de Membresía:
• Silver: Membresía básica con acceso a eventos mensuales y descuentos limitados
• Gold: Membresía completa con acceso ilimitado y beneficios premium

Requisitos:
• Debes ser mayor de 18 años
• Proporcionar información veraz y actualizada
• Cumplir con el código de conducta del club
• Pagar las cuotas correspondientes

Duración y Renovación:
• Las membresías son anuales y se renuevan automáticamente
• Puedes cancelar con 30 días de antelación
• No se realizan reembolsos proporcionales por cancelaciones anticipadas`,

      section3Title: '3. Servicios',
      section3Content: `Car Hotel:
• Almacenamiento seguro con control de clima
• Seguro incluido durante el almacenamiento
• Acceso programado con reserva previa
• Responsabilidad limitada según condiciones específicas

Venta de Vehículos:
• Todos los vehículos se venden "tal cual"
• Garantías específicas según el vehículo
• Financiación disponible sujeta a aprobación
• Inspección recomendada antes de la compra

Eventos y Track Days:
• Requieren reserva previa
• Seguro obligatorio con cobertura adecuada
• Cumplimiento de normas de seguridad
• Capacidad limitada, por orden de llegada`,

      section4Title: '4. Pagos y Facturación',
      section4Content: `Métodos de Pago:
• Tarjeta de crédito/débito
• Transferencia bancaria
• Financiación (sujeta a aprobación)

Política de Reembolsos:
• Membresías: No reembolsables tras los primeros 14 días
• Eventos: Reembolsable hasta 7 días antes del evento
• Servicios: Según política específica de cada servicio

Facturación:
• Las facturas se emiten electrónicamente
• Conserva tus facturas para fines fiscales
• Los precios incluyen IVA cuando corresponda`,

      section5Title: '5. Código de Conducta',
      section5Content: `Como miembro o usuario de GT Race Marbella, debes:

• Tratar a otros miembros, personal y visitantes con respeto
• Cumplir con todas las normas de seguridad
• No participar en actividades ilegales o peligrosas
• Respetar la propiedad del club y de otros miembros
• Mantener la confidencialidad de información sensible del club
• No utilizar los servicios para fines comerciales sin autorización

El incumplimiento puede resultar en la suspensión o cancelación de la membresía sin reembolso.`,

      section6Title: '6. Responsabilidad y Limitaciones',
      section6Content: `Limitación de Responsabilidad:
• GT Race Marbella no es responsable de daños indirectos, incidentales o consecuentes
• La responsabilidad está limitada al monto pagado por el servicio específico
• No garantizamos resultados específicos en programas de racing
• El uso de instalaciones y vehículos es bajo tu propio riesgo

Exclusiones:
• Daños causados por negligencia grave o conducta intencional
• Daños a terceros causados por tu comportamiento
• Pérdidas no cubiertas por seguros`,

      section7Title: '7. Propiedad Intelectual',
      section7Content: `Todos los derechos de propiedad intelectual relacionados con GT Race Marbella, incluyendo:

• Nombre comercial, logotipos y marcas
• Contenido del sitio web y aplicación móvil
• Fotografías y videos
• Materiales promocionales

Están protegidos por las leyes de propiedad intelectual. No puedes usar nuestro contenido sin permiso escrito previo.`,

      section8Title: '8. Privacidad de Datos',
      section8Content: `El tratamiento de tus datos personales se rige por nuestra Política de Privacidad, que forma parte integral de estos términos.

Nos comprometemos a:
• Proteger tu información personal
• Usar tus datos solo para los fines acordados
• Cumplir con todas las leyes de protección de datos aplicables
• Permitirte ejercer tus derechos sobre tus datos

Para más información, consulta nuestra Política de Privacidad completa.`,

      section9Title: '9. Cancelación y Suspensión',
      section9Content: `Nos reservamos el derecho de:

• Suspender o cancelar tu membresía por incumplimiento de estos términos
• Modificar o discontinuar servicios con previo aviso
• Rechazar el acceso a instalaciones por razones de seguridad
• Terminar la relación contractual con 30 días de aviso

Tú puedes cancelar tu membresía en cualquier momento con 30 días de antelación, sin derecho a reembolso proporcional.`,

      section10Title: '10. Modificaciones de los Términos',
      section10Content: `Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor:

• Inmediatamente para nuevos usuarios
• 30 días después de la notificación para miembros existentes

Te notificaremos sobre cambios significativos mediante:
• Email a tu dirección registrada
• Aviso destacado en nuestro sitio web
• Notificación en la aplicación móvil

El uso continuado de nuestros servicios después de los cambios constituye la aceptación de los nuevos términos.`,

      section11Title: '11. Ley Aplicable y Jurisdicción',
      section11Content: `Estos términos se rigen por las leyes de España.

Cualquier disputa relacionada con estos términos o nuestros servicios será sometida a la jurisdicción exclusiva de los tribunales de Málaga, España.

Antes de recurrir a procedimientos judiciales, las partes intentarán resolver las disputas mediante mediación de buena fe.`,

      section12Title: '12. Contacto',
      section12Content: `Para preguntas sobre estos Términos y Condiciones:

Email: members@gtracemarbella.com
Teléfono: +34 687 99 94 27
Dirección: Marbella, Málaga, España

Horario de atención: Lunes a Viernes, 9:00 - 18:00 CET`,

      backHome: 'Volver al inicio'
    },
    en: {
      title: 'Terms and Conditions',
      subtitle: 'GT Race Marbella',
      lastUpdated: 'Last updated: February 22, 2025',
      
      section1Title: '1. Acceptance of Terms',
      section1Content: `By accessing and using the services of GT Race Marbella, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use our services.

These terms apply to all visitors, members and users of our services, including but not limited to Car Hotel, vehicle sales, events, workshops and racing programs.`,

      section2Title: '2. Membership',
      section2Content: `Membership Types:
• Silver: Basic membership with access to monthly events and limited discounts
• Gold: Full membership with unlimited access and premium benefits

Requirements:
• You must be over 18 years of age
• Provide truthful and updated information
• Comply with the club's code of conduct
• Pay corresponding fees

Duration and Renewal:
• Memberships are annual and renew automatically
• You can cancel with 30 days' notice
• No prorated refunds for early cancellations`,

      section3Title: '3. Services',
      section3Content: `Car Hotel:
• Secure climate-controlled storage
• Insurance included during storage
• Scheduled access with prior reservation
• Limited liability according to specific conditions

Vehicle Sales:
• All vehicles sold "as is"
• Specific warranties depending on the vehicle
• Financing available subject to approval
• Inspection recommended before purchase

Events and Track Days:
• Require prior reservation
• Mandatory insurance with adequate coverage
• Compliance with safety standards
• Limited capacity, first come first served`,

      section4Title: '4. Payments and Billing',
      section4Content: `Payment Methods:
• Credit/debit card
• Bank transfer
• Financing (subject to approval)

Refund Policy:
• Memberships: Non-refundable after the first 14 days
• Events: Refundable up to 7 days before the event
• Services: According to specific policy of each service

Billing:
• Invoices are issued electronically
• Keep your invoices for tax purposes
• Prices include VAT when applicable`,

      section5Title: '5. Code of Conduct',
      section5Content: `As a member or user of GT Race Marbella, you must:

• Treat other members, staff and visitors with respect
• Comply with all safety standards
• Not participate in illegal or dangerous activities
• Respect club property and that of other members
• Maintain confidentiality of sensitive club information
• Not use services for commercial purposes without authorization

Non-compliance may result in suspension or cancellation of membership without refund.`,

      section6Title: '6. Liability and Limitations',
      section6Content: `Limitation of Liability:
• GT Race Marbella is not responsible for indirect, incidental or consequential damages
• Liability is limited to the amount paid for the specific service
• We do not guarantee specific results in racing programs
• Use of facilities and vehicles is at your own risk

Exclusions:
• Damages caused by gross negligence or intentional conduct
• Damages to third parties caused by your behavior
• Losses not covered by insurance`,

      section7Title: '7. Intellectual Property',
      section7Content: `All intellectual property rights related to GT Race Marbella, including:

• Trade name, logos and trademarks
• Website and mobile app content
• Photographs and videos
• Promotional materials

Are protected by intellectual property laws. You may not use our content without prior written permission.`,

      section8Title: '8. Data Privacy',
      section8Content: `The processing of your personal data is governed by our Privacy Policy, which is an integral part of these terms.

We commit to:
• Protect your personal information
• Use your data only for agreed purposes
• Comply with all applicable data protection laws
• Allow you to exercise your rights over your data

For more information, consult our full Privacy Policy.`,

      section9Title: '9. Cancellation and Suspension',
      section9Content: `We reserve the right to:

• Suspend or cancel your membership for breach of these terms
• Modify or discontinue services with prior notice
• Deny access to facilities for safety reasons
• Terminate the contractual relationship with 30 days' notice

You can cancel your membership at any time with 30 days' notice, without right to prorated refund.`,

      section10Title: '10. Modifications to Terms',
      section10Content: `We reserve the right to modify these terms at any time. Changes will take effect:

• Immediately for new users
• 30 days after notification for existing members

We will notify you of significant changes through:
• Email to your registered address
• Prominent notice on our website
• Notification in mobile app

Continued use of our services after changes constitutes acceptance of the new terms.`,

      section11Title: '11. Applicable Law and Jurisdiction',
      section11Content: `These terms are governed by the laws of Spain.

Any dispute related to these terms or our services will be submitted to the exclusive jurisdiction of the courts of Málaga, Spain.

Before resorting to legal proceedings, the parties will attempt to resolve disputes through good faith mediation.`,

      section12Title: '12. Contact',
      section12Content: `For questions about these Terms and Conditions:

Email: members@gtracemarbella.com
Phone: +34 687 99 94 27
Address: Marbella, Málaga, Spain

Office hours: Monday to Friday, 9:00 AM - 6:00 PM CET`,

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
            <h1 className="text-4xl md:text-6xl font-voga font-bold mb-4 bg-gradient-to-r from-gt-gold to-yellow-500 bg-clip-text text-transparent">
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
            
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <div key={num}>
                <h2 className="text-2xl font-voga font-bold text-gt-gold mb-4">{t[`section${num}Title`]}</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t[`section${num}Content`]}</p>
                {num < 12 && <div className="border-t border-white/10 mt-8" />}
              </div>
            ))}

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

export default Terms;