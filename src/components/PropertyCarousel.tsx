import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { properties } from '../data/properties'

const PropertyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % properties.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length)
    setIsPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length)
    setIsPlaying(false)
  }

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-luxury-white to-luxury-champagne/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-luxury-black mb-4">
            Exclusive <span className="text-gold-emboss">Collection</span>
          </h2>
          <p className="text-xl text-luxury-black/70 max-w-2xl mx-auto">
            Curated selection of the world's most prestigious properties
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden luxury-shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={properties[currentIndex].images[0]}
                  alt={properties[currentIndex].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/50 to-transparent" />
                
                {/* Property Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="glassmorphism rounded-2xl p-8 max-w-2xl backdrop-blur-2xl border border-luxury-gold/30"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-4 py-1 bg-luxury-gold/20 text-luxury-gold rounded-full text-sm font-medium mb-3">
                          {properties[currentIndex].type}
                        </span>
                        <h3 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-2">
                          {properties[currentIndex].name}
                        </h3>
                        <p className="text-xl text-luxury-champagne">
                          {properties[currentIndex].location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl lg:text-4xl font-serif font-bold text-luxury-gold mb-1">
                          ${(properties[currentIndex].price / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                    <Link to={`/property/${properties[currentIndex].id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease luxury-shadow"
                      >
                        View Details
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 glassmorphism rounded-full hover:bg-luxury-gold/20 premium-ease group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-luxury-gold premium-ease" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 glassmorphism rounded-full hover:bg-luxury-gold/20 premium-ease group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-luxury-gold premium-ease" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-6 right-6 p-4 glassmorphism rounded-full hover:bg-luxury-gold/20 premium-ease group"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white group-hover:text-luxury-gold premium-ease" />
              ) : (
                <Play className="w-5 h-5 text-white group-hover:text-luxury-gold premium-ease" />
              )}
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-8 flex justify-center space-x-4 overflow-x-auto pb-4">
            {properties.map((property, index) => (
              <motion.button
                key={property.id}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden premium-ease ${
                  currentIndex === index
                    ? 'ring-4 ring-luxury-gold luxury-shadow'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                {currentIndex === index && (
                  <motion.div
                    layoutId="activeThumbnail"
                    className="absolute inset-0 border-2 border-luxury-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full premium-ease ${
                  currentIndex === index
                    ? 'w-8 bg-luxury-gold'
                    : 'w-2 bg-luxury-gold/30 hover:bg-luxury-gold/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyCarousel

