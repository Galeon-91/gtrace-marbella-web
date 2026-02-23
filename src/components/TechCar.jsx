<<<<<<< HEAD
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Zap, Gauge, Fuel, Settings, Wind, Award } from 'lucide-react';

function TechCar() {
  const { language } = useLanguage();

  const specs = {
    es: [
      { icon: Zap, label: 'Potencia', value: '700+ HP', color: 'from-red-500 to-orange-500' },
      { icon: Gauge, label: '0-100 km/h', value: '2.8s', color: 'from-blue-500 to-cyan-500' },
      { icon: Wind, label: 'V. Máxima', value: '350 km/h', color: 'from-purple-500 to-pink-500' },
      { icon: Settings, label: 'Transmisión', value: '7-DCT', color: 'from-green-500 to-emerald-500' },
      { icon: Fuel, label: 'Tracción', value: 'AWD', color: 'from-yellow-500 to-orange-500' },
      { icon: Award, label: 'Prestaciones', value: 'Elite', color: 'from-red-500 to-pink-500' }
    ],
    en: [
      { icon: Zap, label: 'Power', value: '700+ HP', color: 'from-red-500 to-orange-500' },
      { icon: Gauge, label: '0-60 mph', value: '2.8s', color: 'from-blue-500 to-cyan-500' },
      { icon: Wind, label: 'Top Speed', value: '217 mph', color: 'from-purple-500 to-pink-500' },
      { icon: Settings, label: 'Transmission', value: '7-DCT', color: 'from-green-500 to-emerald-500' },
      { icon: Fuel, label: 'Drivetrain', value: 'AWD', color: 'from-yellow-500 to-orange-500' },
      { icon: Award, label: 'Performance', value: 'Elite', color: 'from-red-500 to-pink-500' }
    ]
  };

  const currentSpecs = specs[language];

  return (
    <div className="relative w-full py-20 overflow-hidden bg-black">
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent animate-pulse" />
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)'
          }}
        />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-march bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            {language === 'es' ? 'Tecnología Premium' : 'Premium Technology'}
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* CAR SVG - Supercar deportivo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl animate-pulse" />
            
            <svg
              viewBox="0 0 800 400"
              className="w-full h-auto relative z-10 drop-shadow-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Reflejo en el suelo */}
              <defs>
                <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#DC2626', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#EF4444', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#F97316', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#1E40AF', stopOpacity: 0.6 }} />
                </linearGradient>
                <radialGradient id="wheelGradient">
                  <stop offset="0%" style={{ stopColor: '#1F2937', stopOpacity: 1 }} />
                  <stop offset="70%" style={{ stopColor: '#374151', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#111827', stopOpacity: 1 }} />
                </radialGradient>
              </defs>

              {/* Sombra del coche */}
              <ellipse cx="400" cy="340" rx="280" ry="30" fill="rgba(0,0,0,0.4)" />

              {/* Cuerpo principal del supercar */}
              <g>
                {/* Parte trasera */}
                <path
                  d="M 150 250 L 180 220 L 200 200 L 250 180 L 300 180 L 320 190 L 330 210 L 340 230 L 340 260 L 150 260 Z"
                  fill="url(#carGradient)"
                  stroke="#991B1B"
                  strokeWidth="2"
                />

                {/* Capó y techo */}
                <path
                  d="M 340 230 L 360 210 L 420 190 L 500 180 L 580 185 L 640 200 L 680 220 L 700 240 L 700 260 L 340 260 Z"
                  fill="url(#carGradient)"
                  stroke="#991B1B"
                  strokeWidth="2"
                />

                {/* Parabrisas */}
                <path
                  d="M 360 210 L 420 195 L 480 190 L 520 195 L 540 210 L 540 230 L 360 230 Z"
                  fill="url(#glassGradient)"
                  stroke="#1E40AF"
                  strokeWidth="2"
                  opacity="0.9"
                />

                {/* Ventana lateral */}
                <path
                  d="M 545 210 L 590 200 L 620 205 L 640 215 L 640 230 L 545 230 Z"
                  fill="url(#glassGradient)"
                  stroke="#1E40AF"
                  strokeWidth="1.5"
                  opacity="0.8"
                />

                {/* Parte delantera/morro */}
                <path
                  d="M 700 240 L 730 250 L 750 260 L 750 270 L 700 270 Z"
                  fill="#B91C1C"
                  stroke="#7F1D1D"
                  strokeWidth="2"
                />

                {/* Spoiler trasero */}
                <motion.rect
                  x="140"
                  y="200"
                  width="40"
                  height="8"
                  fill="#DC2626"
                  stroke="#991B1B"
                  strokeWidth="2"
                  initial={{ y: 200 }}
                  animate={{ y: [200, 198, 200] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Detalles de luz delantera */}
                <motion.circle
                  cx="740"
                  cy="255"
                  r="6"
                  fill="#FEF3C7"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Luz trasera */}
                <motion.rect
                  x="155"
                  y="240"
                  width="15"
                  height="8"
                  fill="#DC2626"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />

                {/* Líneas de velocidad - Speed lines */}
                <g opacity="0.5">
                  {[...Array(8)].map((_, i) => (
                    <motion.line
                      key={i}
                      x1={50 + i * 15}
                      y1={220 + i * 5}
                      x2={100 + i * 15}
                      y2={220 + i * 5}
                      stroke="#EF4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ x1: 50 + i * 15, x2: 50 + i * 15 }}
                      animate={{ 
                        x1: 50 + i * 15,
                        x2: 100 + i * 15,
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </g>
              </g>

              {/* Ruedas delanteras */}
              <g>
                {/* Rueda delantera */}
                <motion.circle
                  cx="650"
                  cy="270"
                  r="35"
                  fill="url(#wheelGradient)"
                  stroke="#000"
                  strokeWidth="3"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '650px 270px' }}
                />
                <circle cx="650" cy="270" r="20" fill="#1F2937" stroke="#4B5563" strokeWidth="2" />
                <circle cx="650" cy="270" r="8" fill="#6B7280" />
                
                {/* Rayos de la llanta */}
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <motion.line
                    key={angle}
                    x1="650"
                    y1="270"
                    x2={650 + Math.cos((angle * Math.PI) / 180) * 25}
                    y2={270 + Math.sin((angle * Math.PI) / 180) * 25}
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: '650px 270px' }}
                  />
                ))}
                
                {/* Rueda trasera */}
                <motion.circle
                  cx="220"
                  cy="270"
                  r="35"
                  fill="url(#wheelGradient)"
                  stroke="#000"
                  strokeWidth="3"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '220px 270px' }}
                />
                <circle cx="220" cy="270" r="20" fill="#1F2937" stroke="#4B5563" strokeWidth="2" />
                <circle cx="220" cy="270" r="8" fill="#6B7280" />
                
                {/* Rayos de la llanta trasera */}
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <motion.line
                    key={`rear-${angle}`}
                    x1="220"
                    y1="270"
                    x2={220 + Math.cos((angle * Math.PI) / 180) * 25}
                    y2={270 + Math.sin((angle * Math.PI) / 180) * 25}
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: '220px 270px' }}
                  />
                ))}
              </g>

              {/* Partículas de escape */}
              {[...Array(5)].map((_, i) => (
                <motion.circle
                  key={`exhaust-${i}`}
                  cx={140}
                  cy={260}
                  r={3 + i}
                  fill="#DC2626"
                  opacity={0.6 - i * 0.1}
                  initial={{ cx: 140, opacity: 0.6 - i * 0.1, r: 3 + i }}
                  animate={{
                    cx: 140 - i * 20,
                    opacity: 0,
                    r: 1
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </svg>
          </motion.div>

          {/* SPECS TÉCNICAS */}
          <div className="grid grid-cols-2 gap-4">
            {currentSpecs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${spec.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
                
                <div className="relative bg-gradient-to-br from-zinc-900/90 to-black border border-zinc-800 group-hover:border-red-500/50 rounded-xl p-6 transition-all duration-300">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500/50 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/50 rounded-br-xl" />
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${spec.color} p-2.5 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <spec.icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm text-gray-400 uppercase tracking-wider mb-1 font-mono">
                    {spec.label}
                  </div>
                  
                  {/* Value */}
                  <div className={`text-2xl font-bold bg-gradient-to-r ${spec.color} bg-clip-text text-transparent`}>
                    {spec.value}
                  </div>

                  {/* Animated underline */}
                  <motion.div
                    className={`h-0.5 bg-gradient-to-r ${spec.color} mt-3`}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mt-16 origin-center"
        />
      </div>
    </div>
  );
}
=======
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
>>>>>>> f25943209545c56670f20683564d6aa7e80cb14b

export default TechCar;