<<<<<<< HEAD
# gtrace-marbella-web
=======
# 🏎️ GT Race Marbella - Web Oficial

Web oficial del club de supercoches GT Race Marbella, ubicado en Puerto Banús.

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **Routing**: React Router v6
- **Animaciones**: Framer Motion
- **Idiomas**: i18next (ES/EN)
- **Forms**: React Hook Form
- **Deploy**: Vercel

## 📦 Instalación
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/gtrace-marbella-web.git
cd gtrace-marbella-web

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Ejecutar en desarrollo
npm run dev
```

## 🗄️ Configurar Supabase

1. Crear cuenta en [Supabase](https://supabase.com)
2. Crear nuevo proyecto
3. Ejecutar el schema SQL de `supabase-schema.sql` en SQL Editor
4. Crear buckets de Storage:
   - `cars` (público)
   - `events` (público)
   - `blog` (público)
   - `services` (público)
   - `agents` (público)
5. Copiar Project URL y anon key al archivo `.env`

## 🏗️ Scripts
```bash
npm run dev      # Desarrollo (localhost:3000)
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linter
```

## 📂 Estructura del Proyecto
>>>>>>> 3605c7b (Arreglos GT Race Marbella)
