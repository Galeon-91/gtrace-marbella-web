import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Traducciones embebidas para evitar problemas de import
const translations = {
  es: {
    nav: {
      home: "Inicio",
      club: "Club",
      membership: "Hágase socio",
      services: "Nuestros servicios",
      events: "Eventos",
      cars: "Ventas y Alquiler",
      contact: "Contacto",
      language: "Idioma"
    },
    hero: {
      cta: {
        join: "Únete al Club",
        discover: "Descubre Más"
      }
    },
    footer: {
      description: "El club definitivo para los entusiastas del automóvil.",
      quickLinks: "Enlaces Rápidos",
      followUs: "Síguenos",
      newsletter: "Newsletter",
      newsletterText: "Suscríbete para recibir noticias exclusivas",
      rights: "Todos los derechos reservados"
    },
    contact: {
      title: "Contacto"
    },
    location: {
      address: "C.C Rimesa-Tino N-340, Km. 175, 29660 Marbella, España"
    }
  },
  en: {
    nav: {
      home: "Home",
      club: "Club",
      membership: "Membership",
      services: "Our Services",
      events: "Events",
      cars: "Sales & Rental",
      contact: "Contact",
      language: "Language"
    },
    hero: {
      cta: {
        join: "Join the Club",
        discover: "Discover More"
      }
    },
    footer: {
      description: "The ultimate club for car enthusiasts.",
      quickLinks: "Quick Links",
      followUs: "Follow Us",
      newsletter: "Newsletter",
      newsletterText: "Subscribe for exclusive news",
      rights: "All rights reserved"
    },
    contact: {
      title: "Contact"
    },
    location: {
      address: "C.C Rimesa-Tino N-340, Km. 175, 29660 Marbella, Spain"
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('gt-language');
    if (savedLang) return savedLang;
    
    const browserLang = navigator.language.split('-')[0];
    return ['es', 'en'].includes(browserLang) ? browserLang : 'es';
  });

  useEffect(() => {
    localStorage.setItem('gt-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing: ${key}`);
        return key;
      }
    }
    
    return value;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};