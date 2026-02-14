import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// CARS SERVICE
// ============================================

export const carsService = {
  // Obtener todos los coches publicados
  async getAll(filters = {}) {
    let query = supabase
      .from('cars')
      .select('*, car_agents(*)')
      .eq('published', true);

    // Aplicar filtros
    if (filters.brand) {
      query = query.eq('brand', filters.brand);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters.year) {
      query = query.eq('year', filters.year);
    }
    if (filters.fuelType) {
      query = query.eq('fuel_type', filters.fuelType);
    }
    
    // Ordenar
    const orderBy = filters.orderBy || 'created_at';
    const order = filters.order || 'desc';
    query = query.order(orderBy, { ascending: order === 'asc' });

    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  },

  // Obtener un coche por ID
  async getById(id) {
    const { data, error } = await supabase
      .from('cars')
      .select('*, car_agents(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    
    // Incrementar contador de vistas
    await this.incrementViews(id);
    
    return data;
  },

  // Incrementar vistas
  async incrementViews(id) {
    const { error } = await supabase.rpc('increment_car_views', { car_id: id });
    if (error) console.error('Error incrementing views:', error);
  },

  // Obtener marcas únicas
  async getBrands() {
    const { data, error } = await supabase
      .from('cars')
      .select('brand')
      .eq('published', true);

    if (error) throw error;
    
    const uniqueBrands = [...new Set(data.map(car => car.brand))];
    return uniqueBrands.sort();
  },

  // Obtener coches destacados
  async getFeatured(limit = 3) {
    const { data, error } = await supabase
      .from('cars')
      .select('*, car_agents(*)')
      .eq('published', true)
      .eq('featured', true)
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Crear coche (admin)
  async create(carData) {
    const { data, error } = await supabase
      .from('cars')
      .insert([carData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Actualizar coche (admin)
  async update(id, carData) {
    const { data, error } = await supabase
      .from('cars')
      .update(carData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Eliminar coche (admin)
  async delete(id) {
    const { error } = await supabase
      .from('cars')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },
};

// ============================================
// EVENTS SERVICE
// ============================================

export const eventsService = {
  // Obtener eventos próximos
  async getUpcoming() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('published', true)
      .eq('status', 'upcoming')
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Obtener eventos pasados
  async getPast(limit = 10) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('published', true)
      .eq('status', 'past')
      .order('event_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Obtener evento por ID
  async getById(id) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },
};

// ============================================
// SERVICES SERVICE
// ============================================

export const servicesService = {
  // Obtener todos los servicios
  async getAll() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Obtener servicio por slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();

    if (error) throw error;
    return data;
  },
};

// ============================================
// CONTACT SERVICE
// ============================================

export const contactService = {
  // Enviar formulario de contacto
  async submit(formData) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([formData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// ============================================
// MEMBERSHIP SERVICE
// ============================================

export const membershipService = {
  // Obtener tiers de membresía
  async getTiers() {
    const { data, error } = await supabase
      .from('membership_tiers')
      .select('*')
      .eq('active', true)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Enviar solicitud de membresía
  async submitInquiry(formData) {
    const { data, error } = await supabase
      .from('membership_inquiries')
      .insert([formData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// ============================================
// STORAGE SERVICE
// ============================================

export const storageService = {
  // Subir archivo
  async uploadFile(bucket, path, file) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Obtener URL pública
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicData.publicUrl;
  },

  // Eliminar archivo
  async deleteFile(bucket, path) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
    return true;
  },

  // Obtener URL pública
  getPublicUrl(bucket, path) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  },
};

export default supabase;