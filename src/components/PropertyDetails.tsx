import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getPropertyById } from '../data/properties'
import InspectionBooking from './InspectionBooking'
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Calendar,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const PropertyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user, addFavorite, removeFavorite } = useAuth()
  const [currentImage, setCurrentImage] = useState(0)
  const [mortgageAmount, setMortgageAmount] = useState(5000000)
  const [interestRate, setInterestRate] = useState(4.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [showBookingModal, setShowBookingModal] = useState(false)
  
  const property = getPropertyById(id || '')
  const isFavorited = user?.favorites.includes(id || '') || false

  if (!property) {
    return (
      <div className="min-h-screen bg-luxury-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-luxury-black mb-4">
            Property Not Found
          </h2>
          <Link
            to="/properties"
            className="text-luxury-gold hover:text-luxury-gold-dark premium-ease"
          >
            Browse All Properties
          </Link>
        </div>
      </div>
    )
  }

  const calculateMortgage = () => {
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm * 12
    const monthlyPayment = 
      (mortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    return monthlyPayment
  }

  const monthlyPayment = calculateMortgage()

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  useEffect(() => {
    if (property) {
      setMortgageAmount(Math.floor(property.price * 0.2)) // 20% down payment
    }
  }, [property])

  useEffect(() => {
    const interval = setInterval(nextImage, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-luxury-white pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-luxury-black hover:text-luxury-gold premium-ease mb-8"
          >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </Link>

        {/* Image Gallery */}
        <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden luxury-shadow-lg mb-12">
          <motion.img
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src={property.images[currentImage]}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 to-transparent" />
          
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 glassmorphism rounded-full hover:bg-luxury-gold/20 premium-ease"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 glassmorphism rounded-full hover:bg-luxury-gold/20 premium-ease"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2 rounded-full premium-ease ${
                  currentImage === index
                    ? 'w-8 bg-luxury-gold'
                    : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-serif font-bold text-luxury-black mb-2">
                    {property.name}
                  </h1>
                  <div className="flex items-center text-luxury-black/70">
                    <MapPin className="w-5 h-5 mr-2 text-luxury-gold" />
                    <span className="text-xl">{property.location}</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 glassmorphism rounded-full hover:bg-luxury-gold/20 premium-ease"
                  >
                    <Share2 className="w-5 h-5 text-luxury-black" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate('/login')
                        return
                      }
                      if (isFavorited) {
                        removeFavorite(id || '')
                      } else {
                        addFavorite(id || '')
                      }
                    }}
                    className={`p-3 glassmorphism rounded-full premium-ease ${
                      isFavorited
                        ? 'bg-red-500/20 hover:bg-red-500/30'
                        : 'hover:bg-luxury-gold/20'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-red-500' : 'text-luxury-black'}`} />
                  </motion.button>
                </div>
              </div>

              <div className="text-4xl font-serif font-bold text-luxury-gold mb-6">
                ${property.price.toLocaleString()}
              </div>
              
              {/* Agent Info */}
              <div className="flex items-center space-x-4 p-4 bg-luxury-champagne/10 rounded-xl mb-6">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-luxury-black">{property.agent.name}</p>
                  <p className="text-sm text-luxury-black/70">Listing Agent</p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-4 gap-6 p-6 bg-luxury-champagne/20 rounded-2xl">
                <div className="text-center">
                  <Bed className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-luxury-black">{property.beds}</div>
                  <div className="text-sm text-luxury-black/60">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-luxury-black">{property.baths}</div>
                  <div className="text-sm text-luxury-black/60">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Square className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-luxury-black">{property.sqft.toLocaleString()}</div>
                  <div className="text-sm text-luxury-black/60">Sq Ft</div>
                </div>
                <div className="text-center">
                  <Car className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-luxury-black">{property.garage}</div>
                  <div className="text-sm text-luxury-black/60">Garage</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-luxury-black mb-4">
                About This Property
              </h2>
              <p className="text-lg text-luxury-black/70 leading-relaxed mb-6">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-luxury-black mb-6">
                Features & Amenities
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {property.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3 p-4 bg-luxury-champagne/10 rounded-xl"
                  >
                    <div className="w-2 h-2 rounded-full bg-luxury-gold" />
                    <span className="text-luxury-black">{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Smart Home Features */}
              {property.smartHomeFeatures.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-luxury-black mb-4">
                    Smart Home Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {property.smartHomeFeatures.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center space-x-3 p-4 bg-luxury-gold/10 rounded-xl"
                      >
                        <div className="w-2 h-2 rounded-full bg-luxury-gold" />
                        <span className="text-luxury-black">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Blueprint Section */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-luxury-black mb-6">
                Floor Plan
              </h2>
              <div className="relative p-8 bg-luxury-champagne/10 rounded-2xl border-2 border-luxury-gold/20">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  {/* Rooms with gold outlines */}
                  <rect x="20" y="20" width="160" height="120" fill="none" stroke="#D4AF37" strokeWidth="2" />
                  <text x="100" y="85" textAnchor="middle" className="text-sm fill-luxury-black">Living Room</text>
                  
                  <rect x="200" y="20" width="180" height="120" fill="none" stroke="#D4AF37" strokeWidth="2" />
                  <text x="290" y="85" textAnchor="middle" className="text-sm fill-luxury-black">Kitchen</text>
                  
                  <rect x="20" y="160" width="120" height="120" fill="none" stroke="#D4AF37" strokeWidth="2" />
                  <text x="80" y="225" textAnchor="middle" className="text-sm fill-luxury-black">Master Bed</text>
                  
                  <rect x="160" y="160" width="100" height="120" fill="none" stroke="#D4AF37" strokeWidth="2" />
                  <text x="210" y="225" textAnchor="middle" className="text-sm fill-luxury-black">Bedroom 2</text>
                  
                  <rect x="280" y="160" width="100" height="120" fill="none" stroke="#D4AF37" strokeWidth="2" />
                  <text x="330" y="225" textAnchor="middle" className="text-sm fill-luxury-black">Bedroom 3</text>
                </svg>
              </div>
            </div>

            {/* 360° Virtual Tour */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-luxury-black mb-6">
                360° Virtual Tour
              </h2>
              <div className="relative h-[400px] rounded-2xl overflow-hidden luxury-shadow">
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/20 to-luxury-champagne/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                      <Calendar className="w-10 h-10 text-luxury-gold" />
                    </div>
                    <p className="text-luxury-black/70">Interactive 360° tour coming soon</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 px-6 py-3 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease"
                    >
                      Schedule Viewing
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gradient-to-br from-luxury-gold/10 to-luxury-champagne/20 border border-luxury-gold/20 luxury-shadow"
            >
              <h3 className="text-2xl font-serif font-bold text-luxury-black mb-4">
                Schedule a Viewing
              </h3>
              <p className="text-luxury-black/70 mb-6">
                Contact our luxury property specialists to arrange a private viewing
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/login')
                    return
                  }
                  setShowBookingModal(true)
                }}
                className="w-full py-4 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease luxury-shadow mb-4"
              >
                <Calendar className="w-5 h-5 inline mr-2" />
                Schedule Inspection
              </motion.button>
              <div className="space-y-3">
                <div className="p-4 bg-luxury-champagne/10 rounded-xl">
                  <p className="text-sm font-semibold text-luxury-black mb-2">Contact Agent</p>
                  <p className="text-luxury-black/70 text-sm">{property.agent.name}</p>
                  <a href={`mailto:${property.agent.email}`} className="text-luxury-gold text-sm hover:underline">
                    {property.agent.email}
                  </a>
                  <br />
                  <a href={`tel:${property.agent.phone}`} className="text-luxury-gold text-sm hover:underline">
                    {property.agent.phone}
                  </a>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-transparent border-2 border-luxury-gold text-luxury-gold rounded-xl font-semibold hover:bg-luxury-gold/10 premium-ease"
                >
                  Request Information
                </motion.button>
              </div>
            </motion.div>

            {/* Mortgage Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-luxury-white border-2 border-luxury-champagne luxury-shadow"
            >
              <h3 className="text-2xl font-serif font-bold text-luxury-black mb-6">
                Mortgage Calculator
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                    Loan Amount
                  </label>
                  <input
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="100000"
                    value={mortgageAmount}
                    onChange={(e) => setMortgageAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-luxury-champagne rounded-lg appearance-none accent-luxury-gold"
                  />
                  <div className="text-2xl font-bold text-luxury-gold mt-2">
                    ${(mortgageAmount / 1000000).toFixed(1)}M
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                    Interest Rate: {interestRate}%
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-luxury-champagne rounded-lg appearance-none accent-luxury-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                    Loan Term: {loanTerm} years
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="30"
                    step="5"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                    className="w-full h-2 bg-luxury-champagne rounded-lg appearance-none accent-luxury-gold"
                  />
                </div>

                <div className="pt-6 border-t border-luxury-champagne">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-luxury-black/70">Monthly Payment</span>
                    <span className="text-3xl font-bold text-luxury-gold">
                      ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-luxury-black/60">
                    <span>Total Interest</span>
                    <span>${((monthlyPayment * loanTerm * 12) - mortgageAmount).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Inspection Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookingModal(false)}
              className="fixed inset-0 bg-luxury-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <motion.div
                className="bg-luxury-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto luxury-shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <InspectionBooking
                  propertyId={id || ''}
                  onClose={() => setShowBookingModal(false)}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PropertyDetails

