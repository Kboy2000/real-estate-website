import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Bed, Bath, Square } from 'lucide-react'
import { properties } from '../data/properties'

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [currentProperty, setCurrentProperty] = useState(0)
  const featuredProperties = properties.slice(0, 3)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProperty((prev) => (prev + 1) % featuredProperties.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Images with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        {featuredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentProperty === index ? 1 : 0,
              scale: currentProperty === index ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-luxury-black/40 to-luxury-black/80" />
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Gold Cards */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Tagline */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <motion.h1
                className="text-6xl lg:text-8xl font-serif font-bold text-white leading-tight"
                style={{
                  textShadow: '0 4px 30px rgba(212, 175, 55, 0.5)',
                }}
              >
                <span className="text-gold-emboss">Where</span>
                <br />
                <span className="text-white">Luxury Meets</span>
                <br />
                <span className="text-gold-emboss">Tomorrow</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-xl text-luxury-champagne font-light max-w-lg"
              >
                Discover ultra-premium estates enhanced with cutting-edge smart home automation
              </motion.p>
            </motion.div>

            {/* Right: Property Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -10 }}
                className="glassmorphism rounded-3xl p-8 luxury-shadow-lg backdrop-blur-2xl border border-luxury-gold/30"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-luxury-gold mb-2">
                      {featuredProperties[currentProperty].name}
                    </h3>
                    <div className="flex items-center text-luxury-champagne">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{featuredProperties[currentProperty].location}</span>
                    </div>
                  </div>

                  <div className="text-4xl font-serif font-bold text-white mb-6">
                    ${(featuredProperties[currentProperty].price / 1000000).toFixed(1)}M
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-luxury-gold/20">
                    <div className="flex items-center space-x-2 text-luxury-champagne">
                      <Bed className="w-5 h-5 text-luxury-gold" />
                      <div>
                        <div className="text-2xl font-bold text-white">{featuredProperties[currentProperty].beds}</div>
                        <div className="text-xs">Bedrooms</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-luxury-champagne">
                      <Bath className="w-5 h-5 text-luxury-gold" />
                      <div>
                        <div className="text-2xl font-bold text-white">{featuredProperties[currentProperty].baths}</div>
                        <div className="text-xs">Bathrooms</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-luxury-champagne">
                      <Square className="w-5 h-5 text-luxury-gold" />
                      <div>
                        <div className="text-2xl font-bold text-white">{featuredProperties[currentProperty].sqft.toLocaleString()}</div>
                        <div className="text-xs">Sq Ft</div>
                      </div>
                    </div>
                  </div>

                  <Link to={`/property/${featuredProperties[currentProperty].id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-4 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease luxury-shadow"
                    >
                      Explore Property
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-luxury-gold rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-luxury-gold rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection

