import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// Icono inline para evitar problemas de imports
const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  // ⭐ OCULTAR NAVBAR EN RUTAS DE ADMIN
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      // ⭐ Aparece después de 100px de scroll
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // ============================================
  // MENÚ DE NAVEGACIÓN - ORDEN DEL CLIENTE
  // ============================================
  const navLinks = [
    { path: '/', label: 'Inicio', labelEn: 'Home' },
    { path: '/club', label: 'Club', labelEn: 'Club' },
    { path: '/cars', label: 'Ventas', labelEn: 'Sales' },
    {
      path: '/services',
      label: 'Nuestros Servicios',
      labelEn: 'Our Services',
      subMenu: [
        { path: '/services/car-hotel', label: 'Car Hotel' },
        { path: '/services/workshop', label: 'Taller Premium', labelEn: 'Premium Workshop' },
        { path: '/services/wrapping', label: 'Wrapping' },
        { path: '/services/detailing', label: 'Detailing' },
        { path: '/services/racing', label: 'Race Team' },
      ],
    },
    { path: '/events', label: 'Eventos', labelEn: 'Events' },
    { path: '/contact', label: 'Contáctanos', labelEn: 'Contact Us' },
  ];

  // Helper para obtener label según idioma
  const getLabel = (link) => {
    return language === 'es' ? link.label : (link.labelEn || link.label);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500 ease-out
        ${scrolled
          ? 'translate-y-0 opacity-100 bg-black/40 backdrop-blur-2xl shadow-2xl border-b border-gt-gold/10'
          : '-translate-y-full opacity-0'
        }
      `}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group relative z-10">
            <img 
              src="/assets/images/logo-gold.png" 
              alt="GT Race Marbella" 
              className="h-14 w-auto transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 drop-shadow-2xl"
            />
          </Link>

          {/* Desktop Navigation - Centrado y profesional */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`
                    px-4 py-2 rounded-lg text-[15px] font-medium tracking-wide
                    transition-all duration-300 relative
                    ${location.pathname === link.path || (link.subMenu && location.pathname.startsWith('/services'))
                      ? 'text-gt-gold bg-gt-gold/10'
                      : 'text-white/90 hover:text-gt-gold hover:bg-white/5'
                    }
                  `}
                >
                  {getLabel(link)}
                  {/* Underline animado */}
                  <span className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gt-gold
                    transition-all duration-300
                    ${location.pathname === link.path || (link.subMenu && location.pathname.startsWith('/services'))
                      ? 'w-3/4' 
                      : 'w-0 group-hover:w-3/4'
                    }
                  `} />
                </Link>

                {/* Submenu con glass morphism */}
                {link.subMenu && (
                  <div
                    className="absolute left-0 top-full mt-2 w-64 
                               bg-black/60 backdrop-blur-2xl
                               border border-gt-gold/20 rounded-2xl shadow-2xl
                               opacity-0 invisible group-hover:opacity-100 
                               group-hover:visible transition-all duration-300
                               overflow-hidden"
                  >
                    {link.subMenu.map((subLink) => (
                      <Link
                        key={subLink.path}
                        to={subLink.path}
                        className={`
                          block px-5 py-3 text-[15px]
                          hover:bg-gt-gold/10 hover:text-gt-gold
                          transition-all duration-200 border-b border-white/5
                          last:border-b-0
                          ${location.pathname === subLink.path
                            ? 'text-gt-gold bg-gt-gold/10'
                            : 'text-white/90'
                          }
                        `}
                      >
                        <span className="flex items-center">
                          <span className={`
                            w-1.5 h-1.5 rounded-full mr-3
                            ${location.pathname === subLink.path
                              ? 'bg-gt-gold'
                              : 'bg-gt-gold/50'
                            }
                          `} />
                          {language === 'es' ? subLink.label : (subLink.labelEn || subLink.label)}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions - Alineación perfecta */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Phone con glass morphism */}
            <a
              href="tel:+34687999427"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                         bg-white/5 backdrop-blur-lg border border-white/10
                         text-white/90 hover:text-gt-gold hover:bg-gt-gold/10 
                         hover:border-gt-gold/30 transition-all duration-300
                         group"
            >
              <PhoneIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-[15px] font-medium">+34 687 99 94 27</span>
            </a>

            {/* Language Toggle con glass */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2.5 rounded-xl text-[15px] font-semibold
                         bg-white/5 backdrop-blur-lg border border-white/10
                         text-white/90 hover:bg-gt-gold hover:text-black
                         hover:border-gt-gold transition-all duration-300
                         min-w-[60px]"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            {/* CTA Button - Premium - "HÁGASE SOCIO" */}
            <Link
              to="/membership"
              className="px-6 py-2.5 rounded-xl text-[15px] font-semibold
                         bg-gt-gold text-black
                         hover:bg-gt-gold-light hover:shadow-lg hover:shadow-gt-gold/30
                         transition-all duration-300 hover:scale-105"
            >
              {language === 'es' ? 'Hágase socio' : 'Become a Member'}
            </Link>
          </div>

          {/* Mobile Menu Button - Mejorado */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-white
                       bg-white/5 backdrop-blur-lg border border-white/10
                       hover:bg-gt-gold/10 hover:border-gt-gold/30
                       transition-all duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Glass morphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/60 backdrop-blur-2xl 
                       border-t border-gt-gold/10"
          >
            <div className="px-6 py-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    className={`
                      block px-4 py-3 rounded-xl text-[15px] font-medium
                      transition-all duration-300
                      ${location.pathname === link.path || (link.subMenu && location.pathname.startsWith('/services'))
                        ? 'bg-gt-gold/20 text-gt-gold border border-gt-gold/30'
                        : 'text-white/90 hover:bg-white/5 border border-transparent'
                      }
                    `}
                  >
                    {getLabel(link)}
                  </Link>
                  
                  {/* Submenu móvil */}
                  {link.subMenu && (
                    <div className="pl-4 space-y-1 mt-2">
                      {link.subMenu.map((subLink) => (
                        <Link
                          key={subLink.path}
                          to={subLink.path}
                          className={`
                            flex items-center px-4 py-2.5 rounded-lg
                            text-[14px] 
                            hover:bg-white/5 transition-all duration-200
                            ${location.pathname === subLink.path
                              ? 'text-gt-gold bg-gt-gold/10'
                              : 'text-white/70 hover:text-gt-gold'
                            }
                          `}
                        >
                          <span className={`
                            w-1.5 h-1.5 rounded-full mr-3
                            ${location.pathname === subLink.path
                              ? 'bg-gt-gold'
                              : 'bg-gt-gold/50'
                            }
                          `} />
                          {language === 'es' ? subLink.label : (subLink.labelEn || subLink.label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Actions móvil */}
              <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
                {/* Phone */}
                <a
                  href="tel:+34687999427"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl
                             bg-white/5 border border-white/10
                             text-white/90 hover:text-gt-gold hover:bg-gt-gold/10
                             hover:border-gt-gold/30 transition-all duration-300"
                >
                  <PhoneIcon className="w-5 h-5" />
                  <span className="text-[15px] font-medium">+34 687 99 94 27</span>
                </a>

                {/* Language */}
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-between px-4 py-3
                             rounded-xl text-[15px] font-medium
                             bg-white/5 border border-white/10
                             text-white/90 hover:bg-gt-gold hover:text-black
                             hover:border-gt-gold transition-all duration-300"
                >
                  <span>{language === 'es' ? 'Idioma' : 'Language'}</span>
                  <span className="font-semibold">{language === 'es' ? 'Español' : 'English'}</span>
                </button>

                {/* CTA - "HÁGASE SOCIO" */}
                <Link
                  to="/membership"
                  className="block text-center px-6 py-3 rounded-xl
                             text-[15px] font-semibold
                             bg-gt-gold text-black
                             hover:bg-gt-gold-light hover:shadow-lg
                             transition-all duration-300"
                >
                  {language === 'es' ? 'Hágase socio' : 'Become a Member'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;