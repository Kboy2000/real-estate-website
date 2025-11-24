import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  SlidersHorizontal,
  X
} from 'lucide-react'
import { properties, Property } from '../data/properties'

const PropertiesListing = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBeds: '',
    minBaths: '',
    location: '',
  })

  // Read URL params on mount
  useEffect(() => {
    const urlSearch = searchParams.get('search')
    const urlMinPrice = searchParams.get('minPrice')
    const urlMaxPrice = searchParams.get('maxPrice')

    if (urlSearch) {
      setSearchQuery(urlSearch)
    }
    if (urlMinPrice) {
      setFilters(prev => ({ ...prev, minPrice: urlMinPrice }))
    }
    if (urlMaxPrice) {
      setFilters(prev => ({ ...prev, maxPrice: urlMaxPrice }))
    }
  }, [searchParams])

  const [allProperties, setAllProperties] = useState<Property[]>([])

  // Load properties from static data and localStorage
  useEffect(() => {
    const loadProperties = () => {
      const storedListings = localStorage.getItem('agent_listings')
      let agentProperties: Property[] = []

      if (storedListings) {
        const listings = JSON.parse(storedListings)
        agentProperties = listings.map((listing: any) => ({
          id: listing.id,
          name: listing.title,
          location: listing.location,
          city: listing.location.split(',')[0] || listing.location,
          state: listing.location.split(',')[1]?.trim() || '',
          country: 'USA', // Default
          price: parseInt(listing.price.replace(/[^0-9]/g, '')),
          beds: listing.beds,
          baths: listing.baths,
          sqft: listing.sqft,
          garage: 2, // Default
          year: new Date().getFullYear(),
          type: 'Villa', // Default
          images: [listing.image],
          description: 'Exclusive agent listing. Contact for more details.',
          features: ['Agent Listed'],
          amenities: [],
          smartHomeFeatures: [],
          personality: ['luxury'],
          coordinates: { lat: 0, lng: 0 },
          agent: {
            name: 'Listing Agent',
            email: 'agent@example.com',
            phone: '(555) 000-0000',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
          },
          status: listing.status === 'active' ? 'available' : listing.status,
          listedDate: new Date().toISOString()
        }))
      }

      setAllProperties([...properties, ...agentProperties])
    }

    loadProperties()
    // Listen for storage events to update real-time if changed in another tab
    window.addEventListener('storage', loadProperties)
    return () => window.removeEventListener('storage', loadProperties)
  }, [])

  const filteredProperties = useMemo(() => {
    let result: Property[] = allProperties

    // Apply search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.location.toLowerCase().includes(lowerQuery) ||
        p.city.toLowerCase().includes(lowerQuery) ||
        p.type.toLowerCase().includes(lowerQuery)
      )
    }

    // Apply filters
    const filterParams: any = {}
    if (filters.type) filterParams.type = filters.type
    if (filters.minPrice) filterParams.minPrice = parseInt(filters.minPrice)
    if (filters.maxPrice) filterParams.maxPrice = parseInt(filters.maxPrice)
    if (filters.minBeds) filterParams.minBeds = parseInt(filters.minBeds)
    if (filters.minBaths) filterParams.minBaths = parseInt(filters.minBaths)
    if (filters.location) filterParams.location = filters.location

    if (Object.keys(filterParams).length > 0) {
      result = result.filter(p => {
        if (filters.type && p.type !== filters.type) return false
        if (filters.minPrice && p.price < parseInt(filters.minPrice)) return false
        if (filters.maxPrice && p.price > parseInt(filters.maxPrice)) return false
        if (filters.minBeds && p.beds < parseInt(filters.minBeds)) return false
        if (filters.minBaths && p.baths < parseInt(filters.minBaths)) return false
        if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false
        return true
      })
    }

    return result
  }, [searchQuery, filters, allProperties])

  const clearFilters = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      minBeds: '',
      minBaths: '',
      location: '',
    })
    setSearchQuery('')
  }

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length

  return (
    <div className="min-h-screen bg-luxury-white pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-luxury-black mb-4">
            Explore <span className="text-gold-emboss">Properties</span>
          </h1>
          <p className="text-xl text-luxury-black/70">
            Discover {allProperties.length} exclusive luxury properties worldwide
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, location, or type..."
              className="w-full pl-12 pr-4 py-4 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-luxury-gold/10 text-luxury-gold rounded-xl hover:bg-luxury-gold/20 premium-ease"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-0.5 bg-luxury-gold text-luxury-white rounded-full text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 text-luxury-black/70 hover:text-luxury-black premium-ease"
              >
                <X className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-6 bg-luxury-champagne/20 rounded-2xl border border-luxury-gold/20 space-y-4"
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                    Property Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease"
                  >
                    <option value="">All Types</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Estate">Estate</option>
                    <option value="Mansion">Mansion</option>
                    <option value="Retreat">Retreat</option>
                    <option value="Beachfront">Beachfront</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    placeholder="Min"
                    className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    placeholder="Max"
                    className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                    Min Bedrooms
                  </label>
                  <input
                    type="number"
                    value={filters.minBeds}
                    onChange={(e) => setFilters({ ...filters, minBeds: e.target.value })}
                    placeholder="Min"
                    className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                    Min Bathrooms
                  </label>
                  <input
                    type="number"
                    value={filters.minBaths}
                    onChange={(e) => setFilters({ ...filters, minBaths: e.target.value })}
                    placeholder="Min"
                    className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    placeholder="City or State"
                    className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-luxury-black/70">
            Showing <span className="font-semibold text-luxury-gold">{filteredProperties.length}</span> of {allProperties.length} properties
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-luxury-white border-2 border-luxury-champagne rounded-2xl overflow-hidden hover:border-luxury-gold/50 premium-ease luxury-shadow"
            >
              <Link to={`/property/${property.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
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

        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-luxury-black/70 mb-4">No properties found</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertiesListing

