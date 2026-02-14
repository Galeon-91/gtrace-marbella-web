import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

// Iconos SVG personalizados
const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" fill="currentColor" opacity="0.2"/>
    <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" fill="currentColor" opacity="0.2"/>
    <path d="M12 2L4 6V12C4 17 8 21 12 22C16 21 20 17 20 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const DropIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 2.69L17.66 8.35C18.54 9.23 19.04 10.44 19.04 11.7C19.04 14.54 16.74 16.84 13.9 16.84C11.06 16.84 8.76001 14.54 8.76001 11.7C8.76001 10.44 9.26001 9.23 10.14 8.35L12 2.69Z" fill="currentColor" opacity="0.2"/>
    <path d="M12 2.69L17.66 8.35C18.54 9.23 19.04 10.44 19.04 11.7C19.04 14.54 16.74 16.84 13.9 16.84C11.06 16.84 8.76001 14.54 8.76001 11.7C8.76001 10.44 9.26001 9.23 10.14 8.35L12 2.69Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PolishIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.2"/>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const Detailing = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('wash');

  const content = {
    es: {
      badge: 'Detailing Premium',
      title: 'Detailing Profesional',
      subtitle: 'Servicios completos de detailing con los mejores productos del mercado. Devolvemos a tu vehículo el brillo y protección que merece.',
      tabs: {
        wash: 'Car Wash',
        polish: 'Pulido',
        treatments: 'Tratamientos',
        other: 'Otros Servicios'
      },
      requestService: 'Solicitar Servicio',
      contact: 'Contáctanos',
      schedule: 'Horario',
      maintenance: 'Guías de Mantenimiento',
    },
    en: {
      badge: 'Premium Detailing',
      title: 'Professional Detailing',
      subtitle: 'Complete detailing services with the best products on the market. We restore your vehicle to the shine and protection it deserves.',
      tabs: {
        wash: 'Car Wash',
        polish: 'Polishing',
        treatments: 'Treatments',
        other: 'Other Services'
      },
      requestService: 'Request Service',
      contact: 'Contact Us',
      schedule: 'Schedule',
      maintenance: 'Maintenance Guides',
    }
  };

  const t = content[language];

  const washPackages = [
    {
      name: 'Silver',
      price: '70€',
      features: language === 'es' 
        ? ['Lavado exterior completo', 'Limpieza de llantas', 'Secado premium', 'Aspirado interior']
        : ['Complete exterior wash', 'Wheel cleaning', 'Premium drying', 'Interior vacuuming']
    },
    {
      name: 'Gold',
      price: '120€',
      features: language === 'es'
        ? ['Todo Silver +', 'Limpieza profunda interior', 'Tratamiento plásticos', 'Limpieza cristales', 'Abrillantado neumáticos']
        : ['All Silver +', 'Deep interior cleaning', 'Plastic treatment', 'Glass cleaning', 'Tire shine']
    },
    {
      name: 'Platinum',
      price: '340€+',
      features: language === 'es'
        ? ['Todo Gold +', 'Descontaminación pintura', 'Sellado cera', 'Motor limpio', 'Ozono habitáculo']
        : ['All Gold +', 'Paint decontamination', 'Wax sealing', 'Engine cleaning', 'Ozone treatment']
    }
  ];

  const polishPackages = [
    {
      name: 'Silver',
      price: '489€',
      description: language === 'es' ? 'Corrección ligera de defectos' : 'Light defect correction'
    },
    {
      name: 'Gold',
      price: '789€',
      description: language === 'es' ? 'Corrección media, eliminación 70-80% defectos' : 'Medium correction, 70-80% defect removal'
    },
    {
      name: 'Platinum',
      price: '1189€',
      description: language === 'es' ? 'Corrección completa, eliminación 90-95% defectos' : 'Full correction, 90-95% defect removal'
    }
  ];

  const treatments = [
    {
      name: language === 'es' ? 'Tratamiento Cerámico Nano' : 'Ceramic Nano Treatment',
      price: language === 'es' ? 'Desde 30€' : 'From 30€',
      description: language === 'es' ? 'Protección cerámica avanzada' : 'Advanced ceramic protection'
    },
    {
      name: language === 'es' ? 'Tratamiento Cerámico 9H' : 'Ceramic 9H Treatment',
      price: language === 'es' ? 'Desde 349€' : 'From 349€',
      description: language === 'es' ? 'Máxima dureza y brillo' : 'Maximum hardness and shine'
    },
    {
      name: language === 'es' ? 'Laca Cerámica Cristales' : 'Ceramic Glass Coating',
      price: '69€',
      description: language === 'es' ? 'Repelente de agua y suciedad' : 'Water and dirt repellent'
    }
  ];

  const otherServices = [
    language === 'es' ? 'Limpieza de tapicería' : 'Upholstery cleaning',
    language === 'es' ? 'Restauración faros' : 'Headlight restoration',
    language === 'es' ? 'Tratamiento cuero' : 'Leather treatment',
    language === 'es' ? 'Limpieza de motor' : 'Engine cleaning',
    language === 'es' ? 'Eliminación de olores' : 'Odor elimination',
    language === 'es' ? 'Pulido de llantas' : 'Wheel polishing'
  ];

  const maintenanceGuides = [
    {
      title: language === 'es' ? 'Lavado Regular' : 'Regular Washing',
      tip: language === 'es' 
        ? 'Lava tu coche cada 2 semanas con productos pH neutro' 
        : 'Wash your car every 2 weeks with pH neutral products'
    },
    {
      title: language === 'es' ? 'Protección Pintura' : 'Paint Protection',
      tip: language === 'es'
        ? 'Aplica cera cada 3 meses para mantener el brillo'
        : 'Apply wax every 3 months to maintain shine'
    },
    {
      title: language === 'es' ? 'Interior' : 'Interior',
      tip: language === 'es'
        ? 'Aspira semanalmente y limpia superficies mensualmente'
        : 'Vacuum weekly and clean surfaces monthly'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gt-gray-dark via-black to-black" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-gt-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gt-gold/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />

        <div className="relative z-10 container mx-auto max-w-7xl">
          {/* HERO */}
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

          {/* TABS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(t.tabs).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === key
                      ? 'bg-gt-gold text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* CAR WASH */}
          {activeTab === 'wash' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {washPackages.map((pkg, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8
                           hover:border-gt-gold/30 transition-all duration-300"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-voga font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-4xl font-bold text-gt-gold">{pkg.price}</p>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-gt-gold"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}

          {/* PULIDO */}
          {activeTab === 'polish' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {polishPackages.map((pkg, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8
                           hover:border-gt-gold/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 text-gt-gold mb-4 mx-auto">
                    <PolishIcon />
                  </div>
                  <h3 className="text-2xl font-voga font-bold text-white text-center mb-2">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-gt-gold text-center mb-4">{pkg.price}</p>
                  <p className="text-gray-300 text-center">{pkg.description}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* TRATAMIENTOS */}
          {activeTab === 'treatments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {treatments.map((treatment, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8
                           hover:border-gt-gold/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 text-gt-gold mb-4 mx-auto">
                    <ShieldIcon />
                  </div>
                  <h3 className="text-xl font-semibold text-white text-center mb-2">{treatment.name}</h3>
                  <p className="text-2xl font-bold text-gt-gold text-center mb-3">{treatment.price}</p>
                  <p className="text-gray-300 text-center text-sm">{treatment.description}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* OTROS SERVICIOS */}
          {activeTab === 'other' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
              {otherServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl p-6
                           hover:border-gt-gold/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gt-gold"></div>
                    <p className="text-white font-medium">{service}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* MANTENIMIENTO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-voga font-bold text-white text-center mb-8">{t.maintenance}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {maintenanceGuides.map((guide, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gt-gold/10 to-transparent backdrop-blur-2xl 
                           border border-gt-gold/20 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{guide.title}</h3>
                  <p className="text-gray-300 text-sm">{guide.tip}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CONTACTO */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-voga font-bold text-white mb-4">{t.contact}</h2>
              <div className="space-y-3 mb-6">
                <a href="tel:+34620705937" className="flex items-center gap-3 text-gt-gold hover:text-gt-gold-light transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +34 620 70 59 37
                </a>
                <a href="mailto:josegtracemarbella@gmail.com" className="flex items-center gap-3 text-gt-gold hover:text-gt-gold-light transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  josegtracemarbella@gmail.com
                </a>
              </div>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-gt-gold text-black rounded-xl font-semibold
                           hover:bg-gt-gold-light transition-all duration-300"
              >
                {t.requestService}
              </Link>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-voga font-bold text-white mb-4">{t.schedule}</h2>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>{language === 'es' ? 'Lunes - Viernes' : 'Monday - Friday'}</span>
                  <span className="text-gt-gold font-semibold">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span></span>
                  <span className="text-gt-gold font-semibold">15:00 - 18:00</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 mt-3">
                  <span>{language === 'es' ? 'Sábado - Domingo' : 'Saturday - Sunday'}</span>
                  <span className="text-gray-500">{language === 'es' ? 'Cerrado' : 'Closed'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detailing;