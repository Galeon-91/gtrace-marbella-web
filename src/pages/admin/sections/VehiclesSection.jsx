import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../../supabase/supabaseClient';
import { useNotification } from '../../../context/NotificationContext';
import { CAR_BRANDS, FUEL_TYPES, BODY_TYPES, TRANSMISSIONS, ECO_LABELS, VEHICLE_STATUS, CONDITIONS } from '../../../utils/Vehicleconstants';

const VehiclesSection = () => {
  const notify = useNotification();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    year: new Date().getFullYear(),
    price: '',
    monthly_payment: '',
    status: 'available',
    condition: 'ocasion',
    published: false,
    kilometers: '',
    fuel_type: 'gasolina',
    transmission: 'automatico',
    body_type: 'sedan',
    seats: 5,
    doors: 5,
    color: '',
    power_cv: '',
    eco_label: 'C',
    weight_kg: '',
    trunk_liters: '',
    tank_liters: '',
    max_speed: '',
    acceleration: '',
    consumption_mixed: '',
    co2_emissions: '',
    length_cm: '',
    width_cm: '',
    height_cm: '',
    warranty_months: 12,
    itv_valid_until: '',
    single_owner: false,
    description: '',
    extras: [],
    main_image: '',
    images: [],
    location: 'Marbella',
    province: 'Málaga'
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error:', error);
      notify.error('Error al cargar vehículos');
    }
    setLoading(false);
  };

  const handleImageUpload = async (files, isMain = false) => {
    if (!files || files.length === 0) return;
    
    setUploadingImages(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `vehicles/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('vehicle-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      if (isMain) {
        setFormData(prev => ({ ...prev, main_image: uploadedUrls[0] }));
      } else {
        setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
      }

      notify.success('Imágenes subidas correctamente');
    } catch (error) {
      console.error('Error:', error);
      notify.error('Error al subir imágenes');
    }
    setUploadingImages(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const vehicleData = {
        ...formData,
        price: parseFloat(formData.price),
        monthly_payment: formData.monthly_payment ? parseFloat(formData.monthly_payment) : null,
        kilometers: formData.kilometers ? parseInt(formData.kilometers) : null,
        power_cv: formData.power_cv ? parseInt(formData.power_cv) : null,
        weight_kg: formData.weight_kg ? parseInt(formData.weight_kg) : null,
        trunk_liters: formData.trunk_liters ? parseInt(formData.trunk_liters) : null,
        tank_liters: formData.tank_liters ? parseInt(formData.tank_liters) : null,
        max_speed: formData.max_speed ? parseInt(formData.max_speed) : null,
        acceleration: formData.acceleration ? parseFloat(formData.acceleration) : null,
        consumption_mixed: formData.consumption_mixed ? parseFloat(formData.consumption_mixed) : null,
        co2_emissions: formData.co2_emissions ? parseInt(formData.co2_emissions) : null
      };

      if (editingVehicle) {
        const { error } = await supabase
          .from('vehicles')
          .update(vehicleData)
          .eq('id', editingVehicle.id);

        if (error) throw error;
        notify.success('Vehículo actualizado', '✅ Actualizado');
      } else {
        const { error } = await supabase
          .from('vehicles')
          .insert([vehicleData]);

        if (error) throw error;
        notify.success('Vehículo creado', '✅ Creado');
      }

      setShowForm(false);
      setEditingVehicle(null);
      resetForm();
      fetchVehicles();
    } catch (error) {
      console.error('Error:', error);
      notify.error('Error al guardar vehículo');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este vehículo?')) return;
    
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      notify.success('Vehículo eliminado');
      fetchVehicles();
    } catch (error) {
      console.error('Error:', error);
      notify.error('Error al eliminar');
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      ...vehicle,
      extras: vehicle.extras || [],
      images: vehicle.images || []
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      marca: '', modelo: '', year: new Date().getFullYear(), price: '', monthly_payment: '',
      status: 'available', condition: 'ocasion', published: false, kilometers: '',
      fuel_type: 'gasolina', transmission: 'automatico', body_type: 'sedan',
      seats: 5, doors: 5, color: '', power_cv: '', eco_label: 'C',
      weight_kg: '', trunk_liters: '', tank_liters: '', max_speed: '',
      acceleration: '', consumption_mixed: '', co2_emissions: '',
      description: '', extras: [], main_image: '', images: [],
      location: 'Marbella', province: 'Málaga'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <motion.div
          className="w-16 h-16 border-4 border-gt-gold border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-gray-400">Cargando vehículos...</p>
      </div>
    );
  }

  // ⭐ CLASES GLASS MORPHISM PARA REUTILIZAR
  const glassSelectClass = `w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl 
    text-white font-medium focus:border-gt-gold focus:ring-2 focus:ring-gt-gold/50 focus:outline-none 
    hover:bg-black/50 hover:border-white/30 transition-all duration-300 cursor-pointer
    [&>option]:bg-gray-900 [&>option]:text-white [&>option]:py-3
    [&>option:checked]:bg-gt-gold/20 [&>option:checked]:text-gt-gold`;

  const glassInputClass = `w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl 
    text-white font-medium placeholder-gray-500 focus:border-gt-gold focus:ring-2 focus:ring-gt-gold/50 
    focus:outline-none hover:bg-black/50 hover:border-white/30 transition-all duration-300`;

  const glassTextareaClass = `w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl 
    text-white font-medium placeholder-gray-500 resize-none focus:border-gt-gold focus:ring-2 
    focus:ring-gt-gold/50 focus:outline-none hover:bg-black/50 hover:border-white/30 transition-all duration-300`;

  const glassCheckboxClass = `w-5 h-5 rounded border-2 border-white/20 bg-black/40 checked:bg-gt-gold 
    checked:border-gt-gold transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-gt-gold/50 
    focus:outline-none`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-voga font-bold text-white">Gestión de Vehículos</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setShowForm(true); resetForm(); }}
          className="px-6 py-3 bg-gradient-to-r from-gt-gold to-yellow-600 text-black rounded-xl font-bold 
            hover:shadow-lg hover:shadow-gt-gold/50 transition-all duration-300"
        >
          + Agregar Vehículo
        </motion.button>
      </div>

      {/* Lista de vehículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 
              hover:border-gt-gold/50 transition-all duration-300"
          >
            <div className="relative h-48 bg-gray-800">
              {vehicle.main_image ? (
                <img 
                  src={vehicle.main_image} 
                  alt={`${vehicle.marca} ${vehicle.modelo}`} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl">
                  🚗
                </div>
              )}
              <div className="absolute top-3 right-3 px-3 py-1 bg-gt-gold/90 backdrop-blur-sm text-black 
                rounded-full text-xs font-bold shadow-lg">
                {vehicle.published ? '✓ Publicado' : '○ Borrador'}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-1">
                {vehicle.marca} {vehicle.modelo}
              </h3>
              <p className="text-gt-gold font-bold text-xl mb-2">{vehicle.price.toLocaleString()}€</p>
              <p className="text-sm text-gray-400">
                {vehicle.year} • {vehicle.kilometers?.toLocaleString()}km
              </p>
              <div className="flex gap-2 mt-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(vehicle)} 
                  className="flex-1 py-2 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg text-sm 
                    font-semibold hover:bg-blue-600 transition-all"
                >
                  Editar
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(vehicle.id)} 
                  className="flex-1 py-2 bg-red-600/80 backdrop-blur-sm text-white rounded-lg text-sm 
                    font-semibold hover:bg-red-600 transition-all"
                >
                  Eliminar
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Formulario con Glass Morphism */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gt-gray-dark/95 backdrop-blur-xl rounded-3xl border border-white/20 
                max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl shadow-gt-gold/10"
            >
              <h2 className="text-2xl font-voga font-bold text-white mb-6">
                {editingVehicle ? 'Editar Vehículo' : 'Nuevo Vehículo'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información Básica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Marca *</label>
                    <select 
                      value={formData.marca} 
                      onChange={(e) => setFormData({...formData, marca: e.target.value})} 
                      className={glassSelectClass}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23D4AF37' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem',
                        appearance: 'none'
                      }}
                      required
                    >
                      <option value="">Seleccionar marca</option>
                      {CAR_BRANDS.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Modelo *</label>
                    <input 
                      type="text" 
                      value={formData.modelo} 
                      onChange={(e) => setFormData({...formData, modelo: e.target.value})} 
                      className={glassInputClass}
                      placeholder="Ej: 911 Carrera"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Año *</label>
                    <input 
                      type="number" 
                      value={formData.year} 
                      onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})} 
                      className={glassInputClass}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Precio (€) *</label>
                    <input 
                      type="number" 
                      value={formData.price} 
                      onChange={(e) => setFormData({...formData, price: e.target.value})} 
                      className={glassInputClass}
                      placeholder="Ej: 125000"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Kilómetros</label>
                    <input 
                      type="number" 
                      value={formData.kilometers} 
                      onChange={(e) => setFormData({...formData, kilometers: e.target.value})} 
                      className={glassInputClass}
                      placeholder="Ej: 25000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Color</label>
                    <input 
                      type="text" 
                      value={formData.color} 
                      onChange={(e) => setFormData({...formData, color: e.target.value})} 
                      className={glassInputClass}
                      placeholder="Ej: Negro Metalizado"
                    />
                  </div>
                </div>

                {/* Características con GLASS MORPHISM */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Combustible</label>
                    <select 
                      value={formData.fuel_type} 
                      onChange={(e) => setFormData({...formData, fuel_type: e.target.value})} 
                      className={glassSelectClass}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23D4AF37' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem',
                        appearance: 'none'
                      }}
                    >
                      {Object.entries(FUEL_TYPES).map(([key, val]) => (
                        <option key={key} value={key}>{val.es}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Transmisión</label>
                    <select 
                      value={formData.transmission} 
                      onChange={(e) => setFormData({...formData, transmission: e.target.value})} 
                      className={glassSelectClass}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23D4AF37' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem',
                        appearance: 'none'
                      }}
                    >
                      {Object.entries(TRANSMISSIONS).map(([key, val]) => (
                        <option key={key} value={key}>{val.es}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Carrocería</label>
                    <select 
                      value={formData.body_type} 
                      onChange={(e) => setFormData({...formData, body_type: e.target.value})} 
                      className={glassSelectClass}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23D4AF37' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem',
                        appearance: 'none'
                      }}
                    >
                      {Object.entries(BODY_TYPES).map(([key, val]) => (
                        <option key={key} value={key}>{val.es}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Potencia (CV)</label>
                    <input 
                      type="number" 
                      value={formData.power_cv} 
                      onChange={(e) => setFormData({...formData, power_cv: e.target.value})} 
                      className={glassInputClass}
                      placeholder="Ej: 450"
                    />
                  </div>
                </div>

                {/* Especificaciones Técnicas */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Peso (kg)</label>
                    <input 
                      type="number" 
                      value={formData.weight_kg} 
                      onChange={(e) => setFormData({...formData, weight_kg: e.target.value})} 
                      className={glassInputClass}
                      placeholder="Ej: 1500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Maletero (L)</label>
                    <input 
                      type="number" 
                      value={formData.trunk_liters} 
                      onChange={(e) => setFormData({...formData, trunk_liters: e.target.value})} 
                      className={glassInputClass}
                      placeholder="Ej: 350"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Depósito (L)</label>
                    <input 
                      type="number" 
                      value={formData.tank_liters} 
                      onChange={(e) => setFormData({...formData, tank_liters: e.target.value})} 
                      className={glassInputClass}
                      placeholder="Ej: 70"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Vel. Máx (km/h)</label>
                    <input 
                      type="number" 
                      value={formData.max_speed} 
                      onChange={(e) => setFormData({...formData, max_speed: e.target.value})} 
                      className={glassInputClass}
                      placeholder="Ej: 280"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">0-100 km/h (seg)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={formData.acceleration} 
                      onChange={(e) => setFormData({...formData, acceleration: e.target.value})} 
                      className={glassInputClass}
                      placeholder="Ej: 3.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">Consumo (L/100km)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={formData.consumption_mixed} 
                      onChange={(e) => setFormData({...formData, consumption_mixed: e.target.value})} 
                      className={glassInputClass}
                      placeholder="Ej: 8.5"
                    />
                  </div>
                </div>

                {/* Imágenes */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-medium">Imagen Principal</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleImageUpload(e.target.files, true)} 
                    className={glassInputClass}
                    disabled={uploadingImages} 
                  />
                  {formData.main_image && (
                    <motion.img 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={formData.main_image} 
                      alt="Principal" 
                      className="mt-3 w-32 h-32 object-cover rounded-xl border-2 border-gt-gold/30" 
                    />
                  )}
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-medium">Descripción</label>
                  <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    rows="4" 
                    className={glassTextareaClass}
                    placeholder="Describe las características principales del vehículo..."
                  />
                </div>

                {/* Publicar */}
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={formData.published} 
                    onChange={(e) => setFormData({...formData, published: e.target.checked})} 
                    className={glassCheckboxClass}
                    id="publishCheckbox"
                  />
                  <label htmlFor="publishCheckbox" className="text-white font-medium cursor-pointer">
                    Publicar inmediatamente
                  </label>
                </div>

                {/* Botones */}
                <div className="flex gap-4 pt-4">
                  <motion.button 
                    type="button" 
                    onClick={() => setShowForm(false)} 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white 
                      rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-gradient-to-r from-gt-gold to-yellow-600 text-black 
                      rounded-xl font-bold hover:shadow-lg hover:shadow-gt-gold/50 transition-all duration-300"
                  >
                    {editingVehicle ? 'Actualizar Vehículo' : 'Crear Vehículo'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VehiclesSection;