import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, MeshReflectorMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Home, Droplet, Flame } from 'lucide-react'

// Simple 3D House Model Component
function HouseModel({ timeOfDay }: { timeOfDay: 'morning' | 'noon' | 'evening' }) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const getLightColor = () => {
    switch (timeOfDay) {
      case 'morning': return '#FFE5B4'
      case 'noon': return '#FFFFFF'
      case 'evening': return '#FFA07A'
      default: return '#FFFFFF'
    }
  }

  return (
    <group ref={meshRef}>
      {/* Main Structure */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 4]} />
        <meshStandardMaterial color="#F5F5F5" metalness={0.3} roughness={0.2} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 3.5, 0]} rotation={[0, 0.785, 0]} castShadow>
        <coneGeometry args={[3, 1.5, 4]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Windows with glow */}
      {[-1, 1].map((x) => (
        <group key={x}>
          <mesh position={[x * 1.5, 1.5, 2.01]} castShadow>
            <planeGeometry args={[0.8, 1]} />
            <meshStandardMaterial 
              color={getLightColor()} 
              emissive={getLightColor()} 
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh position={[x * 1.5, 1.5, 2.02]}>
            <planeGeometry args={[1, 1.2]} />
            <meshStandardMaterial color="#2C2C2C" transparent opacity={0.8} />
          </mesh>
        </group>
      ))}
      
      {/* Door */}
      <mesh position={[0, 0.5, 2.01]} castShadow>
        <boxGeometry args={[0.8, 1.5, 0.1]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Pool */}
      <mesh position={[0, -0.1, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3, 2]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#4A90E2"
          metalness={0.8}
          mirror={0.8}
        />
      </mesh>
    </group>
  )
}

const PropertyExplorer = () => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'noon' | 'evening'>('noon')
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const areas = [
    { name: 'Living Room', icon: Home, position: 'left' },
    { name: 'Kitchen', icon: Flame, position: 'center' },
    { name: 'Pool Area', icon: Droplet, position: 'right' },
  ]

  return (
    <section id="properties" className="relative py-24 lg:py-32 bg-luxury-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-luxury-black mb-4">
            Interactive <span className="text-gold-emboss">3D Explorer</span>
          </h2>
          <p className="text-xl text-luxury-black/70 max-w-2xl mx-auto">
            Experience your future home in immersive 3D. Rotate, explore, and interact with every detail.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden luxury-shadow-lg"
          >
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[8, 6, 8]} fov={50} />
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={timeOfDay === 'noon' ? 1.5 : timeOfDay === 'morning' ? 1 : 0.8}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight
                position={[-10, 5, -10]}
                intensity={timeOfDay === 'evening' ? 0.8 : 0.3}
                color={timeOfDay === 'evening' ? '#FFA07A' : '#FFFFFF'}
              />
              <HouseModel timeOfDay={timeOfDay} />
              <OrbitControls
                enablePan={false}
                minDistance={6}
                maxDistance={15}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2.2}
              />
              <Environment preset="sunset" />
            </Canvas>

            {/* Time of Day Controls */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-center space-x-4">
              {(['morning', 'noon', 'evening'] as const).map((time) => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTimeOfDay(time)}
                  className={`px-6 py-2 rounded-full font-medium premium-ease ${
                    timeOfDay === time
                      ? 'bg-luxury-gold text-luxury-white luxury-shadow'
                      : 'bg-white/20 backdrop-blur-md text-luxury-black border border-luxury-gold/30'
                  }`}
                >
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Interactive Areas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-serif font-bold text-luxury-black mb-8">
              Explore Interactive Zones
            </h3>
            
            {areas.map((area, index) => {
              const Icon = area.icon
              const isSelected = selectedArea === area.name
              
              return (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  onClick={() => setSelectedArea(isSelected ? null : area.name)}
                  className={`p-6 rounded-2xl cursor-pointer premium-ease ${
                    isSelected
                      ? 'bg-luxury-gold/10 border-2 border-luxury-gold luxury-shadow'
                      : 'bg-luxury-white border-2 border-luxury-champagne hover:border-luxury-gold/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-xl ${
                      isSelected ? 'bg-luxury-gold' : 'bg-luxury-champagne'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isSelected ? 'text-luxury-white' : 'text-luxury-gold'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-serif font-bold text-luxury-black mb-1">
                        {area.name}
                      </h4>
                      <p className="text-sm text-luxury-black/60">
                        Click to highlight this area in the 3D model
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-8 p-6 bg-gradient-to-br from-luxury-gold/10 to-luxury-champagne/20 rounded-2xl border border-luxury-gold/20"
            >
              <p className="text-luxury-black/80 leading-relaxed">
                <span className="font-semibold text-luxury-gold">Pro Tip:</span> Drag to rotate the model, 
                scroll to zoom, and click on areas to see detailed information about each space.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PropertyExplorer

