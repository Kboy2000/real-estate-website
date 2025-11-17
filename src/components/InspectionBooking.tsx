import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Calendar, Clock, User, Mail, Phone, X, Check } from 'lucide-react'
import { getPropertyById } from '../data/properties'

interface InspectionBookingProps {
  propertyId: string
  onClose: () => void
}

const InspectionBooking = ({ propertyId, onClose }: InspectionBookingProps) => {
  const { isAuthenticated, user } = useAuth()
  const property = getPropertyById(propertyId)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  // Get available dates (next 30 days)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      alert('Please login to book an inspection')
      return
    }

    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem('luxe_bookings') || '[]')
    const newBooking = {
      id: Date.now().toString(),
      propertyId,
      propertyName: property?.name,
      userId: user?.id,
      userName: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: selectedDate,
      time: selectedTime,
      notes: formData.notes,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    bookings.push(newBooking)
    localStorage.setItem('luxe_bookings', JSON.stringify(bookings))

    setIsSubmitting(false)
    setIsSubmitted(true)
    
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 mx-auto mb-4 rounded-full bg-luxury-gold flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-luxury-white" />
        </motion.div>
        <h3 className="text-2xl font-serif font-bold text-luxury-black mb-2">
          Inspection Booked!
        </h3>
        <p className="text-luxury-black/70">
          We'll send you a confirmation email shortly.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-luxury-black/70 hover:text-luxury-black premium-ease"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="p-8">
        <h2 className="text-3xl font-serif font-bold text-luxury-black mb-2">
          Schedule Inspection
        </h2>
        <p className="text-luxury-black/70 mb-6">
          {property?.name}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-luxury-black/70 mb-3">
              <Calendar className="w-5 h-5 inline mr-2 text-luxury-gold" />
              Select Date
            </label>
            <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto">
              {getAvailableDates().map((date) => {
                const dateStr = date.toISOString().split('T')[0]
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
                const dayNum = date.getDate()
                const isSelected = selectedDate === dateStr

                return (
                  <button
                    key={dateStr}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-3 rounded-xl premium-ease ${
                      isSelected
                        ? 'bg-luxury-gold text-luxury-white'
                        : 'bg-luxury-champagne/20 text-luxury-black hover:bg-luxury-champagne/40'
                    }`}
                  >
                    <div className="text-xs mb-1">{dayName}</div>
                    <div className="text-lg font-bold">{dayNum}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-luxury-black/70 mb-3">
              <Clock className="w-5 h-5 inline mr-2 text-luxury-gold" />
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl premium-ease ${
                    selectedTime === time
                      ? 'bg-luxury-gold text-luxury-white'
                      : 'bg-luxury-champagne/20 text-luxury-black hover:bg-luxury-champagne/40'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 pt-4 border-t border-luxury-champagne">
            <div>
              <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                <User className="w-4 h-4 inline mr-2 text-luxury-gold" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                <Mail className="w-4 h-4 inline mr-2 text-luxury-gold" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                <Phone className="w-4 h-4 inline mr-2 text-luxury-gold" />
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
                placeholder="Any special requests or questions..."
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || !selectedDate || !selectedTime}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full py-4 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease luxury-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Booking...' : 'Confirm Inspection'}
          </motion.button>
        </form>
      </div>
    </div>
  )
}

export default InspectionBooking

