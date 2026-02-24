import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabase/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Animado de Llave con Corona
const KeyCrownIcon = () => (
  <motion.svg
    viewBox="0 0 100 100"
    className="w-full h-full"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Llave */}
    <motion.g
      animate={{
        y: [0, -3, 0],
        rotate: [0, -5, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Cuerpo de la llave */}
      <circle cx="35" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="35" cy="35" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="33" y="47" width="4" height="35" fill="currentColor" rx="2" />
      
      {/* Dientes de la llave */}
      <rect x="28" y="70" width="4" height="6" fill="currentColor" />
      <rect x="37" y="75" width="4" height="6" fill="currentColor" />
      <rect x="28" y="82" width="4" height="5" fill="currentColor" />
    </motion.g>
    
    {/* Corona encima */}
    <motion.g
      animate={{
        y: [0, 2, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
    >
      <path
        d="M60 15 L50 25 L40 20 L35 30 L40 40 L80 40 L85 30 L80 20 L70 25 Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M60 15 L50 25 L40 20 L35 30 L40 40 L80 40 L85 30 L80 20 L70 25 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Joyas en la corona */}
      <motion.circle
        cx="60" cy="20" r="2" fill="currentColor"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="50" cy="25" r="2" fill="currentColor"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle
        cx="70" cy="25" r="2" fill="currentColor"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      />
    </motion.g>
  </motion.svg>
);

// Partículas flotantes de fondo
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-gt-gold rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.5
        }}
        animate={{
          y: [null, Math.random() * window.innerHeight],
          x: [null, Math.random() * window.innerWidth],
          opacity: [null, Math.random() * 0.5, 0]
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Estado para recuperación de contraseña
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Login con Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Verificar si es admin
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('rank')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      if (profile.rank !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('No tienes permisos de administrador');
      }

      // Redirigir al dashboard
      navigate('/admin/membership');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) throw error;
      
      setResetSent(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al enviar email de recuperación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-gt-gold/5 via-transparent to-gt-gold/5" />
      
      {/* Partículas flotantes */}
      <FloatingParticles />
      
      {/* Grid decorativo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Icono animado */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 mb-6 relative"
            whileHover={{ scale: 1.05 }}
          >
            {/* Círculo exterior con pulso */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-gt-gold to-yellow-600"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Círculo interior */}
            <div className="relative w-20 h-20 bg-gt-gold/20 rounded-full flex items-center justify-center border-2 border-gt-gold/40">
              <div className="w-16 h-16 text-gt-gold">
                <KeyCrownIcon />
              </div>
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl font-march font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Admin Panel
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            GT Race Marbella
          </motion.p>
        </motion.div>

        {/* Formulario con glass morphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {!forgotPassword ? (
              // FORMULARIO DE LOGIN
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold">Email</label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@gtracemarbella.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gt-gold focus:outline-none transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold">Contraseña</label>
                    <div className="relative">
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gt-gold focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gt-gold transition-colors"
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  {/* Olvidé contraseña */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setForgotPassword(true)}
                      className="text-gt-gold hover:text-gt-gold-light transition-colors text-sm font-semibold"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-gt-gold to-yellow-600 text-black rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-gt-gold/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Iniciando sesión...
                      </span>
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </motion.button>
                </form>

                {/* Info */}
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    🔒 Solo administradores autorizados
                  </p>
                </div>
              </motion.div>
            ) : (
              // FORMULARIO DE RECUPERACIÓN
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button
                  onClick={() => {
                    setForgotPassword(false);
                    setResetSent(false);
                    setError('');
                  }}
                  className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  ← Volver al login
                </button>

                {resetSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="text-6xl mb-4">📧</div>
                    <h3 className="text-2xl font-march font-bold text-white mb-3">
                      Email Enviado
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Revisa tu correo para restablecer tu contraseña
                    </p>
                    <button
                      onClick={() => {
                        setForgotPassword(false);
                        setResetSent(false);
                      }}
                      className="px-6 py-3 bg-gt-gold text-black rounded-xl font-semibold hover:bg-gt-gold-light transition-all"
                    >
                      Volver al Login
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-march font-bold text-white mb-2">
                        Recuperar Contraseña
                      </h3>
                      <p className="text-gray-400">
                        Te enviaremos un email para restablecer tu contraseña
                      </p>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    <form onSubmit={handleForgotPassword} className="space-y-6">
                      <div>
                        <label className="block text-gray-300 mb-2 font-semibold">Email</label>
                        <input
                          type="email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          required
                          placeholder="tu@email.com"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gt-gold focus:outline-none transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-gt-gold to-yellow-600 text-black rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-gt-gold/50 transition-all duration-300 disabled:opacity-50"
                      >
                        {loading ? 'Enviando...' : 'Enviar Email de Recuperación'}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Volver */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a 
            href="/" 
            className="text-gray-400 hover:text-gt-gold transition-colors inline-flex items-center gap-2"
          >
            ← Volver al sitio
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;