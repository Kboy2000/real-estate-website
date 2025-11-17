import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Home, TreePine, Briefcase, Heart, TrendingUp } from 'lucide-react'
import { getPropertiesByPersonality } from '../data/properties'

interface Personality {
  id: string
  name: string
  icon: any
  description: string
  color: string
}

interface Match {
  property: string
  propertyId?: string
  score: number
  reason: string
}

const AIPropertyMatch = () => {
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null)
  const [matches, setMatches] = useState<Match[]>([])

  const personalities: Personality[] = [
    {
      id: 'minimalist',
      name: 'Minimalist',
      icon: Home,
      description: 'Clean lines, open spaces, zen aesthetics',
      color: '#D4AF37'
    },
    {
      id: 'nature',
      name: 'Nature Lover',
      icon: TreePine,
      description: 'Green spaces, natural materials, outdoor living',
      color: '#2ECC71'
    },
    {
      id: 'executive',
      name: 'Tech Executive',
      icon: Briefcase,
      description: 'Smart automation, modern tech, efficiency',
      color: '#3498DB'
    },
    {
      id: 'luxury',
      name: 'Luxury Seeker',
      icon: Heart,
      description: 'Premium finishes, exclusive amenities, opulence',
      color: '#E74C3C'
    },
  ]

  const handlePersonalitySelect = (personalityId: string) => {
    setSelectedPersonality(personalityId)
    
    // Get properties matching personality
    const matchedProperties = getPropertiesByPersonality(personalityId)
    
    // Calculate match scores and create matches
    const newMatches: Match[] = matchedProperties.slice(0, 3).map((prop) => {
      let score = 85 + Math.floor(Math.random() * 15) // 85-100 score
      let reason = ''
      
      if (personalityId === 'minimalist') {
        reason = 'Clean lines and minimalist design perfect for your aesthetic'
      } else if (personalityId === 'nature') {
        reason = 'Natural materials and outdoor living spaces match your preferences'
      } else if (personalityId === 'executive') {
        reason = 'Smart home technology and modern efficiency align with your needs'
      } else if (personalityId === 'luxury') {
        reason = 'Premium finishes and exclusive amenities match your refined taste'
      }
      
      return {
        property: prop.name,
        propertyId: prop.id,
        score,
        reason,
      }
    })
    
    setTimeout(() => {
      setMatches(newMatches)
    }, 500)
  }

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-luxury-champagne/20 to-luxury-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-luxury-gold" />
            <span className="text-sm font-semibold text-luxury-gold uppercase tracking-wider">
              AI-Powered Matching
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-luxury-black mb-4">
            Find Your <span className="text-gold-emboss">Perfect Match</span>
          </h2>
          <p className="text-xl text-luxury-black/70 max-w-2xl mx-auto">
            Our AI analyzes your preferences to recommend properties tailored to your lifestyle
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personality Selection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <h3 className="text-3xl font-serif font-bold text-luxury-black mb-6">
              Select Your Personality
            </h3>
            
            {personalities.map((personality, index) => {
              const Icon = personality.icon
              const isSelected = selectedPersonality === personality.id
              
              return (
                <motion.button
                  key={personality.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePersonalitySelect(personality.id)}
                    className={`w-full p-6 rounded-2xl text-left premium-ease ${
                      isSelected
                        ? 'bg-luxury-gold/20 border-2 border-luxury-gold luxury-shadow'
                        : 'bg-luxury-white border-2 border-luxury-champagne hover:border-luxury-gold/50'
                    }`}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className={`p-4 rounded-xl ${
                        isSelected ? 'bg-luxury-gold' : 'bg-luxury-champagne'
                      }`}
                    >
                      <Icon 
                        className={`w-6 h-6 ${
                          isSelected ? 'text-luxury-white' : 'text-luxury-gold'
                        }`} 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-serif font-bold text-luxury-black mb-1">
                        {personality.name}
                      </h4>
                      <p className="text-sm text-luxury-black/60">
                        {personality.description}
                      </p>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-luxury-gold flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Match Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-serif font-bold text-luxury-black mb-6">
              Your Matches
            </h3>

            <AnimatePresence>
              {matches.length > 0 ? (
                matches.map((match, index) => (
                  <motion.div
                    key={match.property}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="p-6 rounded-2xl bg-luxury-white border-2 border-luxury-champagne hover:border-luxury-gold/50 premium-ease"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-2xl font-serif font-bold text-luxury-black mb-2">
                          {match.property}
                        </h4>
                        <p className="text-sm text-luxury-black/60">
                          {match.reason}
                        </p>
                      </div>
                      
                      {/* Compatibility Score Ring */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="35"
                            stroke="#E6D4B8"
                            strokeWidth="6"
                            fill="none"
                          />
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="35"
                            stroke="#D4AF37"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: match.score / 100 }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            strokeDasharray={`${match.score} 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-luxury-gold">
                            {match.score}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {match.propertyId && (
                      <Link to={`/property/${match.propertyId}`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease luxury-shadow"
                        >
                          View Property
                        </motion.button>
                      </Link>
                    )}
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 rounded-2xl bg-luxury-champagne/20 border-2 border-dashed border-luxury-gold/30 text-center"
                >
                  <TrendingUp className="w-16 h-16 text-luxury-gold/50 mx-auto mb-4" />
                  <p className="text-luxury-black/60">
                    Select a personality type to see AI-powered property recommendations
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Algorithm Visualization */}
        {selectedPersonality && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
              className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-luxury-gold/10 to-luxury-champagne/20 border border-luxury-gold/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="w-6 h-6 text-luxury-gold" />
              <h3 className="text-2xl font-serif font-bold text-luxury-black">
                How Our AI Matches Properties
              </h3>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Analyze Preferences', desc: 'Understanding your lifestyle' },
                { step: '2', title: 'Scan Properties', desc: 'Evaluating 10,000+ listings' },
                { step: '3', title: 'Calculate Match', desc: 'AI scoring algorithm' },
                { step: '4', title: 'Recommend', desc: 'Top matches delivered' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-luxury-gold flex items-center justify-center text-2xl font-bold text-luxury-white">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-luxury-black mb-1">{item.title}</h4>
                  <p className="text-sm text-luxury-black/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default AIPropertyMatch

