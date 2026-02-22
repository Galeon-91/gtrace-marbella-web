// ============================================
// COCHE TECNOLÓGICO ANIMADO - Para VehicleDetail
// ============================================

import { motion } from 'framer-motion';

const TechCar = () => {
  return (
    <div className="relative w-full h-64">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Glow de fondo pulsante */}
        <motion.ellipse
          cx="200"
          cy="150"
          rx="120"
          ry="15"
          fill="currentColor"
          opacity="0.1"
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scaleX: [1, 1.2, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Líneas de escaneo horizontales */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.line
            key={`scan-h-${i}`}
            x1="50"
            y1={80 + i * 15}
            x2="350"
            y2={80 + i * 15}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
            animate={{ 
              opacity: [0, 0.5, 0],
              x1: [50, 30],
              x2: [350, 370]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}

        {/* Grid de fondo tecnológico */}
        <motion.g opacity="0.1">
          {[...Array(10)].map((_, i) => (
            <line
              key={`grid-v-${i}`}
              x1={50 + i * 30}
              y1="60"
              x2={50 + i * 30}
              y2="140"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          ))}
        </motion.g>

        {/* ============================================ */}
        {/* CUERPO DEL COCHE - Diseño moderno */}
        {/* ============================================ */}
        
        {/* Sombra del coche */}
        <motion.ellipse
          cx="200"
          cy="145"
          rx="100"
          ry="8"
          fill="currentColor"
          opacity="0.2"
          animate={{ 
            scaleX: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Chasis inferior con gradiente */}
        <motion.path
          d="M 80 120 L 100 135 L 300 135 L 320 120 L 80 120 Z"
          fill="currentColor"
          opacity="0.3"
          animate={{ 
            opacity: [0.3, 0.4, 0.3],
            y: [0, -1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Parte trasera del coche */}
        <motion.path
          d="M 85 120 L 85 100 Q 90 85 110 80 L 140 80 L 140 120 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          opacity="0.2"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            pathLength: { duration: 2 },
            opacity: { duration: 3, repeat: Infinity }
          }}
        />

        {/* Techo del coche - forma aerodinámica */}
        <motion.path
          d="M 140 80 Q 155 65 180 60 L 220 60 Q 245 65 260 80 L 260 120 L 140 120 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          opacity="0.25"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: [0.25, 0.35, 0.25]
          }}
          transition={{ 
            pathLength: { duration: 2, delay: 0.3 },
            opacity: { duration: 3, repeat: Infinity }
          }}
        />

        {/* Parte delantera del coche */}
        <motion.path
          d="M 260 120 L 260 80 L 290 80 Q 310 85 315 100 L 315 120 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          opacity="0.2"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1,
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            pathLength: { duration: 2, delay: 0.6 },
            opacity: { duration: 3, repeat: Infinity }
          }}
        />

        {/* Contorno principal del coche - brillante */}
        <motion.path
          d="M 85 120 L 85 100 Q 90 85 110 80 L 140 80 Q 155 65 180 60 L 220 60 Q 245 65 260 80 L 290 80 Q 310 85 315 100 L 315 120"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
          animate={{ 
            opacity: [0.8, 1, 0.8],
            strokeWidth: [2.5, 3, 2.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* ============================================ */}
        {/* DETALLES TECNOLÓGICOS */}
        {/* ============================================ */}

        {/* Ventanas con efecto de vidrio */}
        <motion.path
          d="M 145 85 Q 160 70 180 65 L 185 65 L 185 115 L 145 115 Z"
          fill="currentColor"
          opacity="0.15"
          animate={{ 
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.path
          d="M 215 65 Q 235 70 250 85 L 250 115 L 215 115 Z"
          fill="currentColor"
          opacity="0.15"
          animate={{ 
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />

        {/* Faros delanteros con efecto de brillo */}
        <motion.circle
          cx="305"
          cy="90"
          r="4"
          fill="currentColor"
          opacity="0.6"
          animate={{ 
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        <motion.circle
          cx="305"
          cy="105"
          r="3"
          fill="currentColor"
          opacity="0.5"
          animate={{ 
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />

        {/* Pilotos traseros */}
        <motion.rect
          x="90"
          y="95"
          width="6"
          height="3"
          fill="currentColor"
          opacity="0.5"
          rx="1"
          animate={{ 
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* ============================================ */}
        {/* RUEDAS TECNOLÓGICAS */}
        {/* ============================================ */}

        {/* Rueda trasera */}
        <motion.g>
          {/* Llanta exterior */}
          <circle
            cx="120"
            cy="135"
            r="18"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />
          
          {/* Neumático giratorio */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "120px 135px" }}
          >
            {/* Rayos de la llanta */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <motion.line
                key={`spoke-back-${i}`}
                x1="120"
                y1="135"
                x2={120 + Math.cos((angle * Math.PI) / 180) * 12}
                y2={135 + Math.sin((angle * Math.PI) / 180) * 12}
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.6"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
            
            {/* Centro de la llanta */}
            <circle cx="120" cy="135" r="6" fill="currentColor" opacity="0.4" />
          </motion.g>
          
          {/* Efecto de brillo en llanta */}
          <motion.circle
            cx="120"
            cy="135"
            r="18"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0"
            animate={{ 
              r: [18, 22],
              opacity: [0, 0.5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>

        {/* Rueda delantera */}
        <motion.g>
          {/* Llanta exterior */}
          <circle
            cx="280"
            cy="135"
            r="18"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />
          
          {/* Neumático giratorio */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "280px 135px" }}
          >
            {/* Rayos de la llanta */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <motion.line
                key={`spoke-front-${i}`}
                x1="280"
                y1="135"
                x2={280 + Math.cos((angle * Math.PI) / 180) * 12}
                y2={135 + Math.sin((angle * Math.PI) / 180) * 12}
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.6"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
            
            {/* Centro de la llanta */}
            <circle cx="280" cy="135" r="6" fill="currentColor" opacity="0.4" />
          </motion.g>
          
          {/* Efecto de brillo en llanta */}
          <motion.circle
            cx="280"
            cy="135"
            r="18"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0"
            animate={{ 
              r: [18, 22],
              opacity: [0, 0.5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.g>

        {/* ============================================ */}
        {/* EFECTOS HOLOGRÁFICOS */}
        {/* ============================================ */}

        {/* Línea de escaneo vertical */}
        <motion.line
          x1="100"
          y1="50"
          x2="100"
          y2="145"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0"
          animate={{ 
            x1: [100, 300],
            x2: [100, 300],
            opacity: [0, 0.6, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Partículas flotantes alrededor del coche */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={80 + i * 30}
            cy={70 + (i % 2) * 20}
            r="1"
            fill="currentColor"
            opacity="0.4"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}

        {/* Indicadores de medición */}
        <motion.g opacity="0.5">
          {/* Línea de medición inferior */}
          <line x1="80" y1="155" x2="320" y2="155" stroke="currentColor" strokeWidth="1" />
          <line x1="80" y1="150" x2="80" y2="160" stroke="currentColor" strokeWidth="1" />
          <line x1="320" y1="150" x2="320" y2="160" stroke="currentColor" strokeWidth="1" />
          
          {/* Marcas de medición */}
          {[100, 150, 200, 250, 300].map((x) => (
            <line key={`mark-${x}`} x1={x} y1="153" x2={x} y2="157" stroke="currentColor" strokeWidth="0.5" />
          ))}
        </motion.g>

        {/* Puntos de datos holográficos */}
        {[
          { x: 120, y: 80, label: "A" },
          { x: 200, y: 55, label: "B" },
          { x: 280, y: 80, label: "C" }
        ].map((point, i) => (
          <motion.g key={`datapoint-${i}`}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="3"
              fill="currentColor"
              opacity="0.6"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="5"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              opacity="0.4"
              animate={{ 
                r: [5, 8],
                opacity: [0.4, 0, 0.4]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          </motion.g>
        ))}

        {/* Reflejo del suelo */}
        <motion.ellipse
          cx="200"
          cy="145"
          rx="110"
          ry="3"
          fill="currentColor"
          opacity="0.1"
          animate={{ 
            scaleX: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

      </svg>
    </div>
  );
};

export default TechCar;