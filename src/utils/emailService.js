// ============================================
// SISTEMA DE EMAILS CON EMAILJS (MÁS FÁCIL)
// ============================================
// Instalación: npm install @emailjs/browser

import emailjs from '@emailjs/browser';

// ⭐ Configurar EmailJS (GRATIS hasta 200 emails/mes)
// 1. Regístrate en https://www.emailjs.com/
// 2. Crea un servicio de email (Gmail, Outlook, etc.)
// 3. Crea un template de email
// 4. Copia tus credenciales al archivo .env:
//    VITE_EMAILJS_SERVICE_ID=service_xxxxx
//    VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
//    VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx

// ⭐ Inicializar EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// ============================================
// FUNCIÓN: ENVIAR EMAIL DE CONFIRMACIÓN
// ============================================

export const sendRegistrationEmail = async ({ 
  to, 
  userName, 
  eventTitle, 
  eventDate, 
  eventLocation,
  spotsReserved,
  totalAmount 
}) => {
  try {
    const templateParams = {
      to_email: to,
      to_name: userName,
      event_title: eventTitle,
      event_date: new Date(eventDate).toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      event_location: eventLocation,
      spots_reserved: spotsReserved,
      total_amount: totalAmount > 0 ? `${totalAmount}€` : 'Gratis',
      current_year: new Date().getFullYear()
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

// ============================================
// TEMPLATE PARA EMAILJS (copiar en el dashboard)
// ============================================

/*

Título del template: Confirmación de Inscripción GT Race Marbella

Subject: ✅ Confirmación de Inscripción - {{event_title}}

HTML Content:

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Inscripción</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #000000; padding: 40px 20px;">
    <tr>
      <td align="center">
        
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 20px; border: 1px solid rgba(212, 175, 55, 0.3); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #D4AF37 0%, #C4A030 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #000000; font-size: 28px; font-weight: bold; letter-spacing: 2px;">
                GT RACE MARBELLA
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(0, 0, 0, 0.7); font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                Exclusive Supercar Club
              </p>
            </td>
          </tr>

          <!-- Título -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h2 style="margin: 0; color: #D4AF37; font-size: 32px; font-weight: bold;">
                ✅ ¡Inscripción Confirmada!
              </h2>
              <p style="margin: 15px 0 0 0; color: #888888; font-size: 16px;">
                Hola <strong style="color: #ffffff;">{{to_name}}</strong>, gracias por inscribirte
              </p>
            </td>
          </tr>

          <!-- Detalles -->
          <tr>
            <td style="padding: 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: rgba(212, 175, 55, 0.1); border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.2); padding: 30px;">
                
                <tr>
                  <td style="padding-bottom: 20px;">
                    <h3 style="margin: 0; color: #D4AF37; font-size: 24px; font-weight: bold;">
                      {{event_title}}
                    </h3>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin: 0; color: #888888; font-size: 12px;">📅 FECHA Y HORA</p>
                    <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 16px; font-weight: 500;">
                      {{event_date}}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin: 0; color: #888888; font-size: 12px;">📍 UBICACIÓN</p>
                    <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 16px; font-weight: 500;">
                      {{event_location}}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin: 0; color: #888888; font-size: 12px;">👥 PLAZAS RESERVADAS</p>
                    <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 16px; font-weight: 500;">
                      {{spots_reserved}} plazas
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin: 0; color: #888888; font-size: 12px;">💰 TOTAL A PAGAR</p>
                    <p style="margin: 5px 0 0 0; color: #D4AF37; font-size: 24px; font-weight: bold;">
                      {{total_amount}}
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Info -->
          <tr>
            <td style="padding: 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: rgba(74, 144, 226, 0.1); border-left: 4px solid #4A90E2; border-radius: 8px; padding: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0; color: #4A90E2; font-size: 14px; font-weight: bold;">
                      ℹ️ Información Importante
                    </p>
                    <p style="margin: 10px 0 0 0; color: #888888; font-size: 14px; line-height: 1.6;">
                      Hemos recibido tu inscripción correctamente. Nuestro equipo revisará tu solicitud y te contactaremos pronto para confirmar los detalles del pago y asistencia.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Botón -->
          <tr>
            <td style="padding: 20px 40px; text-align: center;">
              <a href="https://gtracemarbella.com/events" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #C4A030 100%); color: #000000; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-weight: bold; font-size: 16px; letter-spacing: 1px;">
                VER MIS EVENTOS
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 40px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 10px 0; color: #888888; font-size: 14px;">
                Si tienes alguna pregunta, contáctanos:
              </p>
              <p style="margin: 5px 0; color: #D4AF37; font-size: 14px;">
                📞 +34 687 99 94 27
              </p>
              <p style="margin: 5px 0; color: #D4AF37; font-size: 14px;">
                ✉️ info@gtracemarbella.com
              </p>
              <p style="margin: 20px 0 0 0; color: #555555; font-size: 12px;">
                © {{current_year}} GT Race Marbella. Todos los derechos reservados.
              </p>
            </td>
          </tr>

        </table>
        
      </td>
    </tr>
  </table>

</body>
</html>

*/

// ============================================
// EJEMPLO DE USO EN TU COMPONENTE:
// ============================================

/*

// En RegistrationModal (EventDetail.jsx):

import { sendRegistrationEmail } from '../utils/emailService';
import { useNotification } from '../context/NotificationContext';

const RegistrationModal = ({ event, onClose, onSuccess, t }) => {
  const notify = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Guardar en Supabase
      const { error } = await supabase
        .from('event_registrations')
        .insert([{
          event_id: event.id,
          ...formData,
          payment_amount: event.price * formData.spots_reserved
        }]);

      if (error) throw error;

      // 2. Enviar email
      const emailResult = await sendRegistrationEmail({
        to: formData.email,
        userName: formData.full_name,
        eventTitle: event.title,
        eventDate: event.start_date,
        eventLocation: event.location,
        spotsReserved: formData.spots_reserved,
        totalAmount: event.price * formData.spots_reserved
      });

      if (emailResult.success) {
        notify.success(
          'Te hemos enviado un email de confirmación',
          '✅ ¡Inscripción Exitosa!'
        );
      } else {
        notify.warning(
          'Inscripción guardada pero no se pudo enviar el email',
          '⚠️ Email no enviado'
        );
      }

      onSuccess();
    } catch (error) {
      console.error('Error:', error);
      notify.error('Error al procesar inscripción', '❌ Error');
    }
  };
};

*/

export default sendRegistrationEmail;