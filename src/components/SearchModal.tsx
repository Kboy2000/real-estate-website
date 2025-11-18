import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, DollarSign } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [specifications, setSpecifications] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    // Build search params
    const params = new URLSearchParams()
    
    if (specifications.trim()) {
      params.append('search', specifications.trim())
    }
    if (minPrice.trim()) {
      params.append('minPrice', minPrice.trim())
    }
    if (maxPrice.trim()) {
      params.append('maxPrice', maxPrice.trim())
    }

    // Navigate to properties page with search params
    const queryString = params.toString()
    navigate(`/properties${queryString ? `?${queryString}` : ''}`)
    
    // Reset and close
    setSpecifications('')
    setMinPrice('')
    setMaxPrice('')
    onClose()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-luxury-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-2xl bg-luxury-white rounded-3xl shadow-2xl luxury-shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-luxury-gold to-luxury-gold-dark px-8 py-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-luxury-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Search className="w-6 h-6 text-luxury-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-luxury-white">
                      Find Your Perfect Property
                    </h2>
                    <p className="text-luxury-white/80 text-sm">
                      Search by specifications and price range
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-luxury-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-luxury-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Specifications Input */}
                <div>
                  <label className="block text-sm font-semibold text-luxury-black mb-3">
                    What are you looking for?
                  </label>
                  <textarea
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="E.g., 3 bedrooms, 2 bathrooms, swimming pool, beachfront, modern kitchen, garden..."
                    className="w-full px-4 py-4 bg-luxury-champagne/20 border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease resize-none text-luxury-black placeholder:text-luxury-black/50"
                    rows={4}
                  />
                  <p className="mt-2 text-xs text-luxury-black/60">
                    Describe your ideal property features, location preferences, and any specific requirements
                  </p>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-luxury-black mb-3">
                    Price Range
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold" />
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder="Minimum Price"
                          className="w-full pl-12 pr-4 py-4 bg-luxury-champagne/20 border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black placeholder:text-luxury-black/50"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold" />
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder="Maximum Price"
                          className="w-full pl-12 pr-4 py-4 bg-luxury-champagne/20 border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black placeholder:text-luxury-black/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 text-luxury-black hover:text-luxury-gold premium-ease font-medium"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearch}
                    disabled={!specifications.trim() && !minPrice.trim() && !maxPrice.trim()}
                    className="px-8 py-3 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease luxury-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Search className="w-5 h-5" />
                    <span>Search Properties</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SearchModal

