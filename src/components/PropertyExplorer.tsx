import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, MeshReflectorMaterial, Html, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Home, Droplet, Flame, X } from 'lucide-react'

// Interactive Zone Component
function InteractiveZone({ 
  name, 
  position, 
  size, 
  isSelected, 
  onSelect,
  measurement 
}: { 
  name: string
  position: [number, number, number]
  size: [number, number, number]
  isSelected: boolean
  onSelect: () => void
  measurement: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(0, 0, 0)
    }
  }, [])

  return (
    <group position={position}>
      {/* Clickable area */}
      <mesh 
        ref={meshRef}
        onClick={onSelect}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color={isSelected ? '#D4AF37' : '#FFFFFF'} 
          transparent 
          opacity={isSelected ? 0.3 : 0} 
          emissive={isSelected ? '#D4AF37' : '#000000'}
          emissiveIntensity={isSelected ? 0.5 : 0}
        />
      </mesh>
      
      {/* Measurement display */}
      {isSelected && (
        <Html position={[0, size[1] / 2 + 0.5, 0]} center>
          <div className="bg-luxury-black/90 backdrop-blur-md text-luxury-white px-4 py-2 rounded-lg shadow-lg border border-luxury-gold">
            <div className="font-serif font-bold text-lg mb-1">{name}</div>
            <div className="text-sm text-luxury-gold">{measurement}</div>
          </div>
        </Html>
      )}
      
      {/* Highlight ring */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[size[0] / 2 + 0.5, size[0] / 2 + 0.7, 32]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            emissive="#D4AF37"
            emissiveIntensity={1}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  )
}

// Simple 3D House Model Component
function HouseModel({ 
  timeOfDay, 
  selectedArea, 
  onAreaSelect 
}: { 
  timeOfDay: 'morning' | 'noon' | 'evening'
  selectedArea: string | null
  onAreaSelect: (area: string) => void
}) {
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

  const getWindowIntensity = () => {
    switch (timeOfDay) {
      case 'morning': return 0.6
      case 'noon': return 0.8
      case 'evening': return 0.4
      default: return 0.5
    }
  }

  return (
    <group ref={meshRef}>
      {/* Main Structure */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 4]} />
        <meshStandardMaterial 
          color={timeOfDay === 'evening' ? '#E8E8E8' : '#F5F5F5'} 
          metalness={0.3} 
          roughness={0.2} 
        />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 3.5, 0]} rotation={[0, 0.785, 0]} castShadow>
        <coneGeometry args={[3, 1.5, 4]} />
        <meshStandardMaterial 
          color={timeOfDay === 'evening' ? '#B8941E' : '#D4AF37'} 
          metalness={0.8} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* Windows with glow */}
      {[-1, 1].map((x) => (
        <group key={x}>
          <mesh position={[x * 1.5, 1.5, 2.01]} castShadow>
            <planeGeometry args={[0.8, 1]} />
            <meshStandardMaterial 
              color={getLightColor()} 
              emissive={getLightColor()} 
              emissiveIntensity={getWindowIntensity()}
            />
          </mesh>
          <mesh position={[x * 1.5, 1.5, 2.02]}>
            <planeGeometry args={[1, 1.2]} />
            <meshStandardMaterial 
              color={timeOfDay === 'evening' ? '#1A1A1A' : '#2C2C2C'} 
              transparent 
              opacity={0.8} 
            />
          </mesh>
        </group>
      ))}
      
      {/* Door */}
      <mesh position={[0, 0.5, 2.01]} castShadow>
        <boxGeometry args={[0.8, 1.5, 0.1]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Living Room Zone (left side of house) */}
      <InteractiveZone
        name="Living Room"
        position={[-1.5, 1.5, 0]}
        size={[1.5, 2, 2]}
        isSelected={selectedArea === 'Living Room'}
        onSelect={() => onAreaSelect('Living Room')}
        measurement="18'6\" × 14'2\""
      />
      
      {/* Kitchen Zone (right side of house) */}
      <InteractiveZone
        name="Kitchen"
        position={[1.5, 1.5, 0]}
        size={[1.5, 2, 2]}
        isSelected={selectedArea === 'Kitchen'}
        onSelect={() => onAreaSelect('Kitchen')}
        measurement="16'0\" × 12'8\""
      />
      
      {/* Pool Area Zone */}
      <InteractiveZone
        name="Pool Area"
        position={[0, -0.1, -3]}
        size={[3.5, 0.2, 2.5]}
        isSelected={selectedArea === 'Pool Area'}
        onSelect={() => onAreaSelect('Pool Area')}
        measurement="32'0\" × 24'0\""
      />
      
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
          color={timeOfDay === 'evening' ? '#2E5C8A' : timeOfDay === 'morning' ? '#6BA8E8' : '#4A90E2'}
          metalness={0.8}
          mirror={timeOfDay === 'noon' ? 0.9 : 0.7}
        />
      </mesh>
    </group>
  )
}

// Camera Controller
function CameraController({ selectedArea, timeOfDay }: { selectedArea: string | null, timeOfDay: string }) {
  const { camera } = useThree()

  useEffect(() => {
    // @ts-ignore - accessing global controls ref
    const controls = window.controlsRef
    if (!controls) return
    
    let targetPosition: [number, number, number] = [8, 6, 8]
    let targetLookAt: [number, number, number] = [0, 1, 0]

    switch (selectedArea) {
      case 'Living Room':
        targetPosition = [5, 5, 5]
        targetLookAt = [-1.5, 1.5, 0]
        break
      case 'Kitchen':
        targetPosition = [5, 5, -5]
        targetLookAt = [1.5, 1.5, 0]
        break
      case 'Pool Area':
        targetPosition = [0, 4, -6]
        targetLookAt = [0, -0.1, -3]
        break
      default:
        targetPosition = [8, 6, 8]
        targetLookAt = [0, 1, 0]
    }

    // Animate camera
    const startPos = new THREE.Vector3(...camera.position.toArray())
    const endPos = new THREE.Vector3(...targetPosition)
    const startLook = new THREE.Vector3(...controls.target.toArray())
    const endLook = new THREE.Vector3(...targetLookAt)
    
    const duration = 1000 // ms
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2 // Smooth ease-in-out

      const currentPos = startPos.clone().lerp(endPos, eased)
      const currentLook = startLook.clone().lerp(endLook, eased)

      camera.position.copy(currentPos)
      controls.target.copy(currentLook)
      controls.update()

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    animate()
  }, [selectedArea, camera])

  return null
}

const PropertyExplorer = () => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'noon' | 'evening'>('noon')
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const areas = [
    { name: 'Living Room', icon: Home, position: 'left', measurement: "18'6\" × 14'2\"" },
    { name: 'Kitchen', icon: Flame, position: 'center', measurement: "16'0\" × 12'8\"" },
    { name: 'Pool Area', icon: Droplet, position: 'right', measurement: "32'0\" × 24'0\"" },
  ]

  const getEnvironmentPreset = () => {
    switch (timeOfDay) {
      case 'morning': return 'sunrise'
      case 'noon': return 'sunset'
      case 'evening': return 'night'
      default: return 'sunset'
    }
  }

  const getAmbientIntensity = () => {
    switch (timeOfDay) {
      case 'morning': return 0.5
      case 'noon': return 0.7
      case 'evening': return 0.3
      default: return 0.5
    }
  }

  const getDirectionalIntensity = () => {
    switch (timeOfDay) {
      case 'morning': return 1.2
      case 'noon': return 1.8
      case 'evening': return 0.6
      default: return 1.5
    }
  }

  const getDirectionalColor = () => {
    switch (timeOfDay) {
      case 'morning': return '#FFE5B4'
      case 'noon': return '#FFFFFF'
      case 'evening': return '#FFA07A'
      default: return '#FFFFFF'
    }
  }

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
              <ambientLight intensity={getAmbientIntensity()} />
              <directionalLight
                position={timeOfDay === 'evening' ? [5, 8, 5] : [10, 10, 5]}
                intensity={getDirectionalIntensity()}
                color={getDirectionalColor()}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight
                position={timeOfDay === 'evening' ? [-5, 3, -5] : [-10, 5, -10]}
                intensity={timeOfDay === 'evening' ? 1.2 : timeOfDay === 'morning' ? 0.5 : 0.3}
                color={timeOfDay === 'evening' ? '#FFA07A' : timeOfDay === 'morning' ? '#FFE5B4' : '#FFFFFF'}
              />
              {timeOfDay === 'evening' && (
                <pointLight
                  position={[0, 2, 0]}
                  intensity={0.6}
                  color="#FFD700"
                />
              )}
              <HouseModel 
                timeOfDay={timeOfDay} 
                selectedArea={selectedArea}
                onAreaSelect={(area) => setSelectedArea(selectedArea === area ? null : area)}
              />
              <OrbitControls
                ref={(controls) => {
                  if (controls) {
                    // @ts-ignore
                    window.controlsRef = controls
                  }
                }}
                enablePan={false}
                minDistance={4}
                maxDistance={15}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
                enableDamping
                dampingFactor={0.05}
              />
              <CameraController selectedArea={selectedArea} timeOfDay={timeOfDay} />
              <Environment preset={getEnvironmentPreset()} />
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
                      <p className="text-sm text-luxury-black/60 mb-2">
                        {area.measurement}
                      </p>
                      <p className="text-xs text-luxury-black/50">
                        Click to explore this area in 3D
                      </p>
                    </div>
                    {isSelected && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedArea(null)
                        }}
                        className="p-2 hover:bg-luxury-gold/20 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-luxury-gold" />
                      </button>
                    )}
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

