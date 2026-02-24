import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../supabase/supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { CAR_BRANDS, FUEL_TYPES, BODY_TYPES } from '../utils/Vehicleconstants';

const Vehicles = () => {
  const { language } = useLanguage();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    marca: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    bodyType: '',
    minYear: '',
    maxYear: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('vehicles')
        .select('*')
        .eq('published', true)
        .eq('status', 'available');

      if (filters.marca) query = query.eq('marca', filters.marca);
      if (filters.minPrice) query = query.gte('price', parseFloat(filters.minPrice));
      if (filters.maxPrice) query = query.lte('price', parseFloat(filters.maxPrice));
      if (filters.fuelType) query = query.eq('fuel_type', filters.fuelType);
      if (filters.bodyType) query = query.eq('body_type', filters.bodyType);
      if (filters.minYear) query = query.gte('year', parseInt(filters.minYear));
      if (filters.maxYear) query = query.lte('year', parseInt(filters.maxYear));

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const t = {
    es: {
      title: 'Vehículos Premium',
      subtitle: 'Descubre nuestra exclusiva selección',
      filters: 'Filtros',
      brand: 'Marca',
      priceRange: 'Rango de Precio',
      fuelType: 'Combustible',
      bodyType: 'Carrocería',
      year: 'Año',
      from: 'Desde',
      to: 'Hasta',
      results: 'vehículos encontrados',
      noResults: 'No se encontraron vehículos',
      viewDetails: 'Ver Detalles'
    },
    en: {
      title: 'Premium Vehicles',
      subtitle: 'Discover our exclusive selection',
      filters: 'Filters',
      brand: 'Brand',
      priceRange: 'Price Range',
      fuelType: 'Fuel Type',
      bodyType: 'Body Type',
      year: 'Year',
      from: 'From',
      to: 'To',
      results: 'vehicles found',
      noResults: 'No vehicles found',
      viewDetails: 'View Details'
    }
  }[language];

  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-march font-bold mb-4 bg-gradient-to-r from-gt-gold to-yellow-500 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-12"
        >
          <h2 className="text-xl font-bold text-white mb-4">{t.filters}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">{t.brand}</label>
              <select value={filters.marca} onChange={(e) => setFilters({...filters, marca: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                <option value="">Todas</option>
                {CAR_BRANDS.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">{t.fuelType}</label>
              <select value={filters.fuelType} onChange={(e) => setFilters({...filters, fuelType: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                <option value="">Todos</option>
                {Object.entries(FUEL_TYPES).map(([key, val]) => <option key={key} value={key}>{val[language]}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">{t.bodyType}</label>
              <select value={filters.bodyType} onChange={(e) => setFilters({...filters, bodyType: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                <option value="">Todos</option>
                {Object.entries(BODY_TYPES).map(([key, val]) => <option key={key} value={key}>{val[language]}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">{t.priceRange}</label>
              <div className="flex gap-2">
                <input type="number" placeholder={t.from} value={filters.minPrice} onChange={(e) => setFilters({...filters, minPrice: e.target.value})} className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm" />
                <input type="number" placeholder={t.to} value={filters.maxPrice} onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-400">{vehicles.length} {t.results}</p>
        </div>

        {/* Grid de Vehículos */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Cargando...</div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20 text-gray-400">{t.noResults}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link to={`/vehicles/${vehicle.id}`}>
                  <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-gt-gold/50 transition-all duration-500">
                    
                    {/* Imagen */}
                    <div className="relative h-64 overflow-hidden bg-gray-900">
                      {vehicle.main_image ? (
                        <motion.img
                          src={vehicle.main_image}
                          alt={`${vehicle.marca} ${vehicle.modelo}`}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.7 }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-6xl">🚗</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-gt-gold/90 backdrop-blur-sm rounded-full">
                        <span className="text-xs font-bold text-black">{vehicle.year}</span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <h3 className="text-2xl font-march font-bold text-white mb-2 group-hover:text-gt-gold transition-colors">
                        {vehicle.marca} {vehicle.modelo}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span>{vehicle.kilometers?.toLocaleString()}km</span>
                        <span>•</span>
                        <span>{FUEL_TYPES[vehicle.fuel_type]?.[language]}</span>
                        <span>•</span>
                        <span>{vehicle.power_cv}CV</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold text-gt-gold">
                          {vehicle.price?.toLocaleString()}€
                        </p>
                        <motion.span
                          whileHover={{ x: 5 }}
                          className="text-gt-gold font-semibold flex items-center gap-2"
                        >
                          {t.viewDetails} →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;