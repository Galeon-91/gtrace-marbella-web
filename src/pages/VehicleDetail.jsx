import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../supabase/supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { FUEL_TYPES, BODY_TYPES, TRANSMISSIONS, ECO_LABELS } from '../utils/Vehicleconstants';

const VehicleDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchVehicle();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchVehicle = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

      if (error) throw error;
      setVehicle(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const t = {
    es: {
      back: '← Volver a Vehículos',
      contact: 'Contactar',
      whatsapp: 'WhatsApp',
      specs: 'Especificaciones',
      description: 'Descripción',
      features: 'Características',
      dimensions: 'Dimensiones',
      performance: 'Prestaciones y Consumo',
      price: 'Precio',
      year: 'Año',
      km: 'Kilómetros',
      fuel: 'Combustible',
      transmission: 'Transmisión',
      power: 'Potencia',
      seats: 'Plazas',
      doors: 'Puertas',
      color: 'Color',
      weight: 'Peso',
      trunk: 'Maletero',
      tank: 'Depósito',
      maxSpeed: 'Velocidad Máxima',
      acceleration: '0-100 km/h',
      consumption: 'Consumo Mixto',
      emissions: 'Emisiones CO₂'
    },
    en: {
      back: '← Back to Vehicles',
      contact: 'Contact',
      whatsapp: 'WhatsApp',
      specs: 'Specifications',
      description: 'Description',
      features: 'Features',
      dimensions: 'Dimensions',
      performance: 'Performance & Consumption',
      price: 'Price',
      year: 'Year',
      km: 'Kilometers',
      fuel: 'Fuel',
      transmission: 'Transmission',
      power: 'Power',
      seats: 'Seats',
      doors: 'Doors',
      color: 'Color',
      weight: 'Weight',
      trunk: 'Trunk',
      tank: 'Tank',
      maxSpeed: 'Max Speed',
      acceleration: '0-100 km/h',
      consumption: 'Mixed Consumption',
      emissions: 'CO₂ Emissions'
    }
  }[language];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div className="w-16 h-16 border-4 border-gt-gold border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center flex-col">
        <p className="text-3xl font-bold text-white mb-4">Vehículo no encontrado</p>
        <Link to="/vehicles" className="px-8 py-4 bg-gt-gold text-black rounded-xl font-bold">Volver</Link>
      </div>
    );
  }

  const allImages = [vehicle.main_image, ...(vehicle.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/vehicles" className="inline-flex items-center gap-2 text-gray-400 hover:text-gt-gold transition-colors mb-8">
          {t.back}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Galería de Imágenes */}
          <div>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="bg-gray-900 rounded-2xl overflow-hidden mb-4">
              <img src={allImages[selectedImage]} alt={`${vehicle.marca} ${vehicle.modelo}`} className="w-full h-96 object-cover" />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {allImages.map((img, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.05 }} onClick={() => setSelectedImage(idx)} className={`cursor-pointer rounded-xl overflow-hidden border-2 ${selectedImage === idx ? 'border-gt-gold' : 'border-transparent'}`}>
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-20 object-cover" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Información Principal */}
          <div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-4xl sm:text-5xl font-voga font-bold mb-2">{vehicle.marca} {vehicle.modelo}</h1>
              <p className="text-xl text-gray-400 mb-6">{vehicle.year}</p>
              
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6">
                <p className="text-5xl font-bold text-gt-gold mb-2">{vehicle.price?.toLocaleString()}€</p>
                {vehicle.monthly_payment && <p className="text-gray-400">Desde {vehicle.monthly_payment}€/mes</p>}
              </div>

              {/* Datos Rápidos */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
                  <p className="text-sm text-gray-400">{t.km}</p>
                  <p className="text-xl font-bold text-white">{vehicle.kilometers?.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
                  <p className="text-sm text-gray-400">{t.fuel}</p>
                  <p className="text-xl font-bold text-white">{FUEL_TYPES[vehicle.fuel_type]?.[language]}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
                  <p className="text-sm text-gray-400">{t.transmission}</p>
                  <p className="text-xl font-bold text-white">{TRANSMISSIONS[vehicle.transmission]?.[language]}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
                  <p className="text-sm text-gray-400">{t.power}</p>
                  <p className="text-xl font-bold text-white">{vehicle.power_cv} CV</p>
                </div>
              </div>

              {/* Botones de Contacto */}
              <div className="flex gap-4">
                <a href={`https://wa.me/34687999427?text=Hola, estoy interesado en el ${vehicle.marca} ${vehicle.modelo} ${vehicle.year}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-gradient-to-r from-gt-gold to-yellow-600 text-black text-center rounded-xl font-bold hover:shadow-lg transition-all">
                  {t.whatsapp}
                </a>
                <a href="tel:+34687999427" className="flex-1 py-4 bg-white/10 border border-white/20 text-white text-center rounded-xl font-bold hover:bg-white/20 transition-all">
                  {t.contact}
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Descripción */}
        {vehicle.description && (
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-voga font-bold mb-4 text-gt-gold">{t.description}</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{vehicle.description}</p>
          </motion.div>
        )}

        {/* Especificaciones Técnicas */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
          <h2 className="text-3xl font-voga font-bold mb-6 text-gt-gold">{t.specs}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicle.seats && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gt-gold/20 rounded-xl flex items-center justify-center text-2xl">👥</div>
                <div>
                  <p className="text-sm text-gray-400">{t.seats}</p>
                  <p className="text-white font-semibold">{vehicle.seats}</p>
                </div>
              </div>
            )}
            {vehicle.doors && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gt-gold/20 rounded-xl flex items-center justify-center text-2xl">🚪</div>
                <div>
                  <p className="text-sm text-gray-400">{t.doors}</p>
                  <p className="text-white font-semibold">{vehicle.doors}</p>
                </div>
              </div>
            )}
            {vehicle.color && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gt-gold/20 rounded-xl flex items-center justify-center text-2xl">🎨</div>
                <div>
                  <p className="text-sm text-gray-400">{t.color}</p>
                  <p className="text-white font-semibold">{vehicle.color}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Prestaciones y Consumo - Estilo OcasionPlus */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
          <h2 className="text-3xl font-voga font-bold mb-8 text-center text-gt-gold">{t.performance}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {vehicle.max_speed && (
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full border-8 border-gt-gold/30 flex items-center justify-center">
                  <div>
                    <p className="text-3xl font-bold text-gt-gold">{vehicle.max_speed}</p>
                    <p className="text-xs text-gray-400">km/h</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">{t.maxSpeed}</p>
              </div>
            )}
            {vehicle.acceleration && (
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full border-8 border-gt-gold/30 flex items-center justify-center">
                  <div>
                    <p className="text-3xl font-bold text-gt-gold">{vehicle.acceleration}</p>
                    <p className="text-xs text-gray-400">seg</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">{t.acceleration}</p>
              </div>
            )}
            {vehicle.consumption_mixed && (
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full border-8 border-gt-gold/30 flex items-center justify-center">
                  <div>
                    <p className="text-3xl font-bold text-gt-gold">{vehicle.consumption_mixed}</p>
                    <p className="text-xs text-gray-400">L/100</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">{t.consumption}</p>
              </div>
            )}
            {vehicle.co2_emissions && (
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full border-8 border-gt-gold/30 flex items-center justify-center">
                  <div>
                    <p className="text-3xl font-bold text-gt-gold">{vehicle.co2_emissions}</p>
                    <p className="text-xs text-gray-400">CO₂</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">{t.emissions}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Dimensiones - Estilo OcasionPlus */}
        {(vehicle.length_cm || vehicle.weight_kg || vehicle.trunk_liters || vehicle.tank_liters) && (
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-voga font-bold mb-8 text-center text-gt-gold">{t.dimensions}</h2>
            
            <div className="flex justify-center mb-8">
              <svg viewBox="0 0 400 200" className="w-full max-w-md text-gt-gold">
                <g stroke="currentColor" strokeWidth="2" fill="none">
                  <rect x="50" y="80" width="300" height="80" rx="10" />
                  <circle cx="100" cy="160" r="20" />
                  <circle cx="300" cy="160" r="20" />
                  <path d="M 50 100 Q 100 50 200 50 Q 300 50 350 100" />
                </g>
                {vehicle.length_cm && (
                  <g>
                    <line x1="50" y1="190" x2="350" y2="190" stroke="currentColor" strokeWidth="1" markerEnd="url(#arrowhead)" />
                    <text x="200" y="195" textAnchor="middle" fill="currentColor" fontSize="14">{(vehicle.length_cm / 100).toFixed(2)}m</text>
                  </g>
                )}
                {vehicle.width_cm && (
                  <g>
                    <line x1="360" y1="80" x2="360" y2="160" stroke="currentColor" strokeWidth="1" />
                    <text x="375" y="120" fill="currentColor" fontSize="14">{(vehicle.width_cm / 100).toFixed(2)}m</text>
                  </g>
                )}
              </svg>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {vehicle.weight_kg && (
                <div>
                  <p className="text-sm text-gray-400">{t.weight}</p>
                  <p className="text-2xl font-bold text-white">{vehicle.weight_kg} kg</p>
                </div>
              )}
              {vehicle.trunk_liters && (
                <div>
                  <p className="text-sm text-gray-400">{t.trunk}</p>
                  <p className="text-2xl font-bold text-white">{vehicle.trunk_liters}L</p>
                </div>
              )}
              {vehicle.tank_liters && (
                <div>
                  <p className="text-sm text-gray-400">{t.tank}</p>
                  <p className="text-2xl font-bold text-white">{vehicle.tank_liters}L</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetail;