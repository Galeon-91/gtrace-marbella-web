import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  // Servicios principales basados en fotos reales - ORDEN ACTUALIZADO POR CLIENTE
  const services = [
    // 1º - Club Exclusivo
    {
      title: 'Car Club',
      titleEs: 'Club Exclusivo',
      description: 'Únete a la comunidad más selecta de Marbella',
      descriptionEs: 'Únete a la comunidad más selecta de Marbella',
      image: '/assets/images/club-evento.jpg',
      link: '/membership'
    },
    // 2º - Venta de coches
    {
      title: 'Luxury Car Sales',
      titleEs: 'Venta de coches',
      description: 'Colección exclusiva de los vehículos más excepcionales del mundo',
      descriptionEs: 'Colección exclusiva de los vehículos más excepcionales del mundo',
      image: '/assets/images/venta-countach.jpg',
      link: '/services/sales'
    },
    // 3º - Race Team
    {
      title: 'Race Team',
      titleEs: 'Race Team',
      description: 'Participa en competiciones profesionales internacionales',
      descriptionEs: 'Participa en competiciones profesionales internacionales',
      image: '/assets/images/competicion-pilotos.jpg',
      link: '/services/racing'
    },
    // 4º - Car Hotel
    {
      title: 'Car Hotel',
      titleEs: 'Car Hotel',
      description: 'Hotel de cinco estrellas para automóviles de alta gama',
      descriptionEs: 'Hotel de cinco estrellas para automóviles de alta gama',
      image: '/assets/images/garage-multicolor.jpg',
      link: '/services/car-hotel'
    },
    // 5º - Taller Premium
    {
      title: 'Workshop',
      titleEs: 'Taller Premium',
      description: 'Mantenimiento y personalización de alto nivel',
      descriptionEs: 'Mantenimiento y personalización de alto nivel',
      image: '/assets/images/taller-garage.jpg',
      link: '/services/workshop'
    }
  ];

  // Stats reales del negocio (información Saud)
  const stats = [
    { number: '100+', label: 'Vehículos Premium', labelEn: 'Premium Vehicles' },
    { number: '80+', label: 'Miembros VIP', labelEn: 'VIP Members' },
    { number: '15+', label: 'Años Experiencia', labelEn: 'Years Experience' },
    { number: '24/7', label: 'Servicio Exclusivo', labelEn: 'Exclusive Service' }
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION - Con video de fondo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video de fondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-110"
          style={{ filter: 'brightness(1.05) contrast(0.95)' }}
        >
          <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay gradient REDUCIDO para ver mejor el video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />

        {/* Contenido Hero */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 🎨 LOGO CON VOGA */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-voga font-bold mb-6">
              <span className="text-gt-gold">GT RACE</span>
              <br />
              <span className="text-white">MARBELLA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Luxury Car Center · Sales & Rent a Car · Car Club · Race Team · Workshop
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cars" className="btn-primary text-lg px-8 py-4">
                Ver Colección
              </Link>
              <Link to="/membership" className="btn-outline text-lg px-8 py-4">
                Únete al Club
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
                {/* 🎨 NÚMEROS CON VOGA */}
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
            {/* 🎨 TÍTULO CON VOGA */}
            <h2 className="text-4xl md:text-5xl font-voga font-bold mb-4">
              <span className="text-white">Nuestros </span>
              <span className="text-gt-gold">Servicios</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experiencias exclusivas diseñadas para los amantes de los supercoches
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
                  {/* Imagen con zoom hover como me dijo Hori */}
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.titleEs}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6">
                    {/* 🎨 TÍTULO DE SERVICIO CON VOGA */}
                    <h3 className="text-2xl font-voga font-bold text-white mb-3 group-hover:text-gt-gold transition-colors">
                      {service.titleEs}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {service.descriptionEs}
                    </p>
                    <div className="mt-4 flex items-center text-gt-gold group-hover:translate-x-2 transition-transform">
                      <span className="font-medium">Más información</span>
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

      {/* THE GARAGE - Sección especial con fotos del garage multicolor (Prueba supeditada por Saud) */}
      <section className="py-20 bg-gradient-to-b from-gt-black via-gt-gray-dark to-gt-black">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* 🎨 TÍTULO "THE GARAGE" CON VOGA */}
            <h2 className="text-4xl md:text-5xl font-voga font-bold mb-4">
              <span className="text-white">The </span>
              <span className="text-gt-gold">Garage</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Un espacio único en Europa con una iluminación espectacular y los mejores supercoches del mundo
            </p>
          </motion.div>

          {/* Grid de fotos del garage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Garage multicolor panorámico */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-lg overflow-hidden group"
            >
              <img 
                src="/assets/images/garage-multicolor.jpg" 
                alt="Garage GT Race Marbella"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <div className="absolute bottom-6 left-6 z-20">
                {/* 🎨 SUBTÍTULO CON VOGA */}
                <h3 className="text-2xl font-voga font-bold text-white mb-2">
                  Luces Circulares Icónicas
                </h3>
                <p className="text-gray-300">Diseño exclusivo GT Race Marbella</p>
              </div>
            </motion.div>

            {/* Plataformas iluminadas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative h-96 rounded-lg overflow-hidden group"
            >
              <img 
                src="/assets/images/garage-plataformas.jpg" 
                alt="Plataformas iluminadas GT Race"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <div className="absolute bottom-6 left-6 z-20">
                {/* 🎨 SUBTÍTULO CON VOGA */}
                <h3 className="text-2xl font-voga font-bold text-white mb-2">
                  Plataformas Iluminadas
                </h3>
                <p className="text-gray-300">Cada coche en su propia exhibición</p>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link to="/services/garage" className="btn-primary text-lg px-8 py-4">
              Explorar el Garage
            </Link>
          </div>
        </div>
      </section>

      {/* Sección del equipo de Fórmula F4 */}
      <section className="py-20 bg-gt-black">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-2 bg-gt-gold/10 rounded-full mb-6">
                {/* 🎨 BADGE CON VOGA */}
                <span className="text-gt-gold font-voga font-semibold flex items-center text-sm uppercase tracking-widest">
                  {/* Icono SVG personalizadito con bandera de carreras */}
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
                  </svg>
                  GT RACE TEAM
                </span>
              </div>
              {/* 🎨 TÍTULO CON VOGA */}
              <h2 className="text-4xl md:text-5xl font-voga font-bold mb-6">
                <span className="text-white">Competición </span>
                <span className="text-gt-gold">Profesional</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Nuestro equipo compite en los principales campeonatos internacionales:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  {/* SVG check doradito */}
                  <svg className="w-6 h-6 text-gt-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Fórmula 4 Nórdica</h4>
                    <p className="text-gray-400">Formando pilotos profesionales</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-gt-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Porsche Sprint Challenge Iberica</h4>
                    <p className="text-gray-400">Competición y emoción en pista</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-gt-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="text-white font-semibold text-lg">CAVA Championship</h4>
                    <p className="text-gray-400">Campeonato de Andalucía de Velocidad en Circuitos de España</p>
                  </div>
                </li>
              </ul>
              <Link to="/services/racing" className="btn-primary">
                Conocer el Equipo
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Imagen real del McLaren dorado de su garage */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl group">
                <img 
                  src="/assets/images/competicion-pilotos.jpg" 
                  alt="GT Race Team McLaren"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 border-4 border-gt-gold/20 rounded-lg" />
              </div>
              {/* 🎨 BADGE CON VOGA */}
              <div className="absolute -bottom-6 -right-6 bg-gt-gold text-black px-6 py-4 rounded-lg font-voga font-bold text-xl shadow-xl">
                Competición Real
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección de Eventos */}
      <section className="py-20 bg-gt-gray-dark">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* 🎨 TÍTULO CON VOGA */}
            <h2 className="text-4xl md:text-5xl font-voga font-bold mb-4">
              <span className="text-white">Eventos </span>
              <span className="text-gt-gold">Exclusivos</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experiencias únicas para nuestra comunidad VIP
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Concursos de Elegancia',
                description: 'En los mejores campos de golf de la Costa del Sol',
                image: '/assets/images/concurso-belleza3.png',
                svgIcon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                )
              },
              {
                title: 'Track Days',
                description: 'Días exclusivos en circuitos profesionales',
                image: '/assets/images/circuito-profesional.jpg',
                svgIcon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
                  </svg>
                )
              },
              {
                title: 'Social Events',
                description: 'Networking con la comunidad luxury car de Marbella',
                image: '/assets/images/evento-trackday.jpg',
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
                {/* Imagen de fondo con overlay como me dijo Hori */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  {/* SVG icono flotante */}
                  <div className="absolute top-4 right-4 text-gt-gold opacity-80">
                    {event.svgIcon}
                  </div>
                </div>
                
                {/* Contenido */}
                <div className="p-6">
                  {/* 🎨 TÍTULO DE EVENTO CON VOGA */}
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
              Ver Próximos Eventos
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-br from-gt-black via-gt-gray-dark to-gt-black relative overflow-hidden">
        {/* Decorative elements */}
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
            {/* 🎨 TÍTULO FINAL CON VOGA */}
            <h2 className="text-4xl md:text-6xl font-voga font-bold mb-6">
              <span className="text-white">Únete a la </span>
              <span className="text-gt-gold">Comunidad</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Experimenta el mundo de los supercoches con acceso exclusivo a nuestra colección, 
              eventos VIP y servicios premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/membership" className="btn-primary text-lg px-10 py-4">
                Solicitar Membresía
              </Link>
              <Link to="/contact" className="btn-outline text-lg px-10 py-4">
                Contactar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;