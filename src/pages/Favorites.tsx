import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getPropertyById, Property } from '../data/properties'
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  Trash2
} from 'lucide-react'

const Favorites = () => {
  const { user, removeFavorite } = useAuth()
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([])

  useEffect(() => {
    if (user?.favorites) {
      const properties = user.favorites
        .map(id => getPropertyById(id))
        .filter(Boolean) as Property[]
      setFavoriteProperties(properties)
    }
  }, [user])

  const handleRemoveFavorite = (propertyId: string) => {
    removeFavorite(propertyId)
    setFavoriteProperties(prev => prev.filter(p => p.id !== propertyId))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-luxury-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-luxury-black mb-4">
            Please Sign In
          </h2>
          <p className="text-luxury-black/70 mb-6">
            You need to be signed in to view your favorites
          </p>
          <Link
            to="/login"
            className="px-6 py-3 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease luxury-shadow inline-block"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-white pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center luxury-shadow">
              <Heart className="w-8 h-8 text-luxury-white fill-luxury-white" />
            </div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-luxury-black">
                My <span className="text-gold-emboss">Favorites</span>
              </h1>
              <p className="text-xl text-luxury-black/70">
                {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
              </p>
            </div>
          </div>
        </motion.div>

        {/* Favorites Grid */}
        {favoriteProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-luxury-white border-2 border-luxury-champagne rounded-2xl overflow-hidden hover:border-luxury-gold/50 premium-ease luxury-shadow relative group"
              >
                {/* Remove Favorite Button */}
                <button
                  onClick={() => handleRemoveFavorite(property.id)}
                  className="absolute top-4 right-4 z-10 p-2 bg-luxury-white/90 backdrop-blur-sm rounded-full hover:bg-red-500 hover:text-luxury-white premium-ease opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <Link to={`/property/${property.id}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-110 premium-ease transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-luxury-gold text-luxury-white rounded-full text-sm font-semibold">
                        {property.type}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-luxury-black/80 to-transparent p-4">
                      <div className="text-2xl font-serif font-bold text-white">
                        ${(property.price / 1000000).toFixed(1)}M
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <Link to={`/property/${property.id}`}>
                    <h3 className="text-2xl font-serif font-bold text-luxury-black mb-2 hover:text-luxury-gold premium-ease">
                      {property.name}
                    </h3>
                  </Link>
                  <div className="flex items-center text-luxury-black/70 mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-luxury-gold" />
                    <span>{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-luxury-champagne">
                    <div className="flex items-center space-x-1 text-luxury-black/70">
                      <Bed className="w-4 h-4 text-luxury-gold" />
                      <span className="text-sm">{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center space-x-1 text-luxury-black/70">
                      <Bath className="w-4 h-4 text-luxury-gold" />
                      <span className="text-sm">{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center space-x-1 text-luxury-black/70">
                      <Square className="w-4 h-4 text-luxury-gold" />
                      <span className="text-sm">{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>

                  <Link to={`/property/${property.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease luxury-shadow"
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-luxury-champagne/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-luxury-gold/30" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-luxury-black mb-4">
              No Favorites Yet
            </h3>
            <p className="text-luxury-black/70 mb-8 max-w-md mx-auto">
              Start exploring properties and save your favorites by clicking the heart icon on any property
            </p>
            <Link
              to="/properties"
              className="px-8 py-4 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease luxury-shadow inline-block"
            >
              Browse Properties
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Favorites

