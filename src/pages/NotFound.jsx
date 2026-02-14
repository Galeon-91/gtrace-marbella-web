import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
      {/* Gradiente de fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gt-gray-dark to-black opacity-50" />
      
      {/* Huellas de neumático SVG - Animadas */}
      <motion.svg
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-auto"
        viewBox="0 0 400 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Huella izquierda - patrón diagonal */}
        <g opacity="1" fill="#C9A961">
          {/* Líneas de neumático - patrón repetido */}
          {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520].map((y, i) => (
            <g key={i}>
              <rect x="20" y={y} width="60" height="15" rx="3" transform={`rotate(-20 50 ${y + 7.5})`} />
              <rect x="90" y={y + 10} width="55" height="12" rx="2" transform={`rotate(-20 117 ${y + 16})`} />
              <rect x="155" y={y + 20} width="50" height="10" rx="2" transform={`rotate(-20 180 ${y + 25})`} />
              <rect x="210" y={y + 30} width="45" height="8" rx="2" transform={`rotate(-20 232 ${y + 34})`} />
            </g>
          ))}
        </g>
      </motion.svg>

      {/* Contenido central */}
      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* "Oops!" text */}
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-2"
          >
            ¡Oops!
          </motion.h1>

          {/* "404" grande con gradiente dorado */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
            className="relative inline-block mb-6"
          >
            <h2 className="text-[150px] md:text-[200px] font-heading font-black leading-none
                           bg-gradient-to-br from-gt-gold via-gt-gold-light to-gt-gold
                           bg-clip-text text-transparent
                           drop-shadow-2xl">
              404
            </h2>
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                            animate-pulse blur-xl opacity-50" />
          </motion.div>

          {/* Subtítulo */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-heading font-bold text-white mb-4"
          >
            Esta ruta no está en nuestro circuito
          </motion.h3>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-300 text-lg mb-8 max-w-md mx-auto leading-relaxed"
          >
            Parece que has tomado un desvío equivocado. 
            Esta página no existe o ha sido movida al garaje.
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              to="/" 
              className="px-8 py-3 bg-gt-gold text-black rounded-xl
                         font-semibold text-lg
                         hover:bg-gt-gold-light hover:scale-105
                         transition-all duration-300
                         shadow-lg hover:shadow-gt-gold/50"
            >
              Volver al Inicio
            </Link>
            
            <Link 
              to="/cars" 
              className="px-8 py-3 bg-white/5 backdrop-blur-lg
                         border border-white/10 text-white rounded-xl
                         font-semibold text-lg
                         hover:bg-gt-gold/10 hover:border-gt-gold/30
                         transition-all duration-300"
            >
              Ver Colección
            </Link>
          </motion.div>

          {/* Texto con chistes sobre coches */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-gray-500 text-sm mt-8 italic"
          >
            "No todos los caminos llevan a la victoria, pero este sin duda te perdió en boxes"
          </motion.p>
        </motion.div>
      </div>

      {/* Huella derecha - efecto espejito */}
      <motion.svg
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-auto scale-x-[-1]"
        viewBox="0 0 400 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Huella derecha - mismo patrón pero invertido */}
        <g opacity="1" fill="#C9A961">
          {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520].map((y, i) => (
            <g key={i}>
              <rect x="20" y={y} width="60" height="15" rx="3" transform={`rotate(-20 50 ${y + 7.5})`} />
              <rect x="90" y={y + 10} width="55" height="12" rx="2" transform={`rotate(-20 117 ${y + 16})`} />
              <rect x="155" y={y + 20} width="50" height="10" rx="2" transform={`rotate(-20 180 ${y + 25})`} />
              <rect x="210" y={y + 30} width="45" height="8" rx="2" transform={`rotate(-20 232 ${y + 34})`} />
            </g>
          ))}
        </g>
      </motion.svg>

      {/* Partículas doradas flotantes (Academia ILM) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            y: -100,
            x: Math.random() * 200 - 100
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute bottom-0 w-1 h-1 bg-gt-gold rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default NotFound;