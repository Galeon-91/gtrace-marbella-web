import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// Iconos inline para evitar problemas de imports
const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YouTubeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
  </svg>
);

const EmailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const LocationIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/club', label: t('nav.club') },
    { path: '/events', label: t('nav.events') },
    { path: '/cars', label: t('nav.cars') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/people/GTR-Marbella/61571277413324/',
      icon: FacebookIcon,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/gtracemarbella',
      icon: InstagramIcon,
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UCcvD1DV57tUIcqAimw4ryVg',
      icon: YouTubeIcon,
    },
  ];

  return (
    <footer className="bg-gt-gray-dark border-t border-gt-gray-light">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold">
              <span className="text-gt-gold">GT RACE</span>
              <span className="text-white ml-2">MARBELLA</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-gt-gold transition-colors 
                               text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4">
              {t('contact.title')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-300 text-sm">
                <LocationIcon className="w-5 h-5 text-gt-gold flex-shrink-0 mt-0.5" />
                <span>{t('location.address')}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300 text-sm">
                <PhoneIcon className="w-5 h-5 text-gt-gold flex-shrink-0" />
                <a
                  href="tel:+34687999427"
                  className="hover:text-gt-gold transition-colors"
                >
                  +34 687 99 94 27
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-300 text-sm">
                <EmailIcon className="w-5 h-5 text-gt-gold flex-shrink-0" />
                <a
                  href="mailto:info@gtracemarbella.com"
                  className="hover:text-gt-gold transition-colors"
                >
                  info@gtracemarbella.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4">
              {t('footer.followUs')}
            </h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gt-gray p-3 rounded-full hover:bg-gt-gold 
                               hover:text-gt-black transition-all duration-300 
                               transform hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-gray-300 text-sm mb-3">
                {t('footer.newsletterText')}
              </p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-2 bg-gt-gray border border-gt-gray-light 
                             rounded-l-md text-white text-sm focus:outline-none 
                             focus:border-gt-gold"
                />
                <button
                  type="submit"
                  className="bg-gt-gold text-gt-black px-4 py-2 rounded-r-md 
                             font-medium hover:bg-gt-gold-light transition-colors"
                >
                  →
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gt-gray-light">
          <div className="flex flex-col md:flex-row justify-between items-center 
                          space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} GT RACE MARBELLA. {t('footer.rights')}
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-gt-gold transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-gt-gold transition-colors"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>

          {/* Hecho con ❤️ por Ismaín */}
          <div className="mt-6 pt-6 border-t border-gt-gray-light/50">
            <div className="flex justify-center items-center space-x-2">
              <span className="text-gray-400 text-sm">Hecho con</span>
              <svg
                className="w-5 h-5 text-gt-gold animate-heartbeat"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-400 text-sm">por</span>
              <span className="text-gt-gold font-semibold text-sm hover:text-gt-gold-light transition-colors">
                Ismaín
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;