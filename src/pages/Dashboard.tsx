import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getPropertyById, properties } from '../data/properties'
import { 
  Heart, 
  Search, 
  Settings, 
  LogOut, 
  Home, 
  Calendar,
  Bell,
  TrendingUp,
  Eye,
  MapPin,
  Clock
} from 'lucide-react'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'favorites' | 'searches' | 'settings' | 'bookings'>('overview')
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('luxe_bookings') || '[]')
    const userBookings = storedBookings.filter((b: any) => b.userId === user?.id)
    setBookings(userBookings)
  }, [user])

  // Refresh bookings when component updates
  useEffect(() => {
    const interval = setInterval(() => {
      const storedBookings = JSON.parse(localStorage.getItem('luxe_bookings') || '[]')
      const userBookings = storedBookings.filter((b: any) => b.userId === user?.id)
      setBookings(userBookings)
    }, 1000)
    return () => clearInterval(interval)
  }, [user])

  const stats = [
    { label: 'Properties Viewed', value: properties.length.toString(), icon: Eye, color: 'text-luxury-gold' },
    { label: 'Favorites', value: user?.favorites.length.toString() || '0', icon: Heart, color: 'text-red-500' },
    { label: 'Saved Searches', value: user?.savedSearches.length.toString() || '0', icon: Search, color: 'text-blue-500' },
    { label: 'Viewings Scheduled', value: bookings.length.toString(), icon: Calendar, color: 'text-green-500' },
  ]

  const favoriteProperties = user?.favorites
    .map(id => getPropertyById(id))
    .filter(Boolean)
    .slice(0, 5) || []

  const recentProperties = properties.slice(0, 3).map(prop => ({
    id: prop.id,
    name: prop.name,
    location: prop.location,
    price: `$${(prop.price / 1000000).toFixed(1)}M`,
    image: prop.images[0],
    viewedAt: 'Recently viewed'
  }))

  return (
    <div className="min-h-screen bg-luxury-white pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-luxury-black mb-2">
                Welcome back, <span className="text-gold-emboss">{user?.name?.split(' ')[0]}</span>
              </h1>
              <p className="text-xl text-luxury-black/70">
                Manage your properties, favorites, and preferences
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="flex items-center space-x-2 px-6 py-3 bg-luxury-black-matte text-white rounded-xl hover:bg-luxury-black premium-ease luxury-shadow"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-6 rounded-2xl bg-luxury-white border-2 border-luxury-champagne hover:border-luxury-gold/50 premium-ease luxury-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-luxury-champagne/20`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-luxury-black mb-1">{stat.value}</div>
                <div className="text-sm text-luxury-black/60">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex space-x-2 border-b border-luxury-champagne">
              {[
                { id: 'overview', label: 'Overview', icon: Home },
                { id: 'favorites', label: 'Favorites', icon: Heart },
                { id: 'bookings', label: 'Bookings', icon: Calendar },
                { id: 'searches', label: 'Saved Searches', icon: Search },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium premium-ease relative ${
                      activeTab === tab.id
                        ? 'text-luxury-gold'
                        : 'text-luxury-black/60 hover:text-luxury-black'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-serif font-bold text-luxury-black mb-6">
                    Recent Activity
                  </h2>
                  
                  <div className="space-y-4">
                    {recentProperties.map((property, index) => (
                      <motion.div
                        key={property.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center space-x-4 p-6 bg-luxury-white border-2 border-luxury-champagne rounded-2xl hover:border-luxury-gold/50 premium-ease"
                      >
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-bold text-luxury-black mb-1">
                            {property.name}
                          </h3>
                          <div className="flex items-center text-luxury-black/60 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <div className="text-lg font-bold text-luxury-gold">{property.price}</div>
                        </div>
                        <div className="text-sm text-luxury-black/50">{property.viewedAt}</div>
                        <Link
                          to={`/property/${property.id}`}
                          className="px-6 py-2 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease"
                        >
                          View
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'favorites' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {favoriteProperties.length > 0 ? (
                    <>
                      <h2 className="text-3xl font-serif font-bold text-luxury-black mb-6">
                        Your Favorites ({favoriteProperties.length})
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        {favoriteProperties.map((property, index) => (
                          property && (
                            <motion.div
                              key={property.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.01 }}
                              className="flex items-center space-x-4 p-6 bg-luxury-white border-2 border-luxury-champagne rounded-2xl hover:border-luxury-gold/50 premium-ease"
                            >
                              <img
                                src={property.images[0]}
                                alt={property.name}
                                className="w-24 h-24 rounded-xl object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="text-xl font-serif font-bold text-luxury-black mb-1">
                                  {property.name}
                                </h3>
                                <div className="flex items-center text-luxury-black/60 mb-2">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  <span className="text-sm">{property.location}</span>
                                </div>
                                <div className="text-lg font-bold text-luxury-gold">
                                  ${(property.price / 1000000).toFixed(1)}M
                                </div>
                              </div>
                              <Link
                                to={`/property/${property.id}`}
                                className="px-6 py-2 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease"
                              >
                                View
                              </Link>
                            </motion.div>
                          )
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <Heart className="w-16 h-16 text-luxury-gold/30 mx-auto mb-4" />
                      <p className="text-luxury-black/60">
                        You haven't saved any favorites yet
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'bookings' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-serif font-bold text-luxury-black mb-6">
                    Your Inspections ({bookings.length})
                  </h2>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking, index) => {
                        const property = getPropertyById(booking.propertyId)
                        return (
                          <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 bg-luxury-white border-2 border-luxury-champagne rounded-2xl hover:border-luxury-gold/50 premium-ease"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-xl font-serif font-bold text-luxury-black mb-2">
                                  {booking.propertyName}
                                </h3>
                                <div className="space-y-1 text-luxury-black/70">
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-luxury-gold" />
                                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-luxury-gold" />
                                    <span>{booking.time}</span>
                                  </div>
                                  <div className="mt-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      booking.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : booking.status === 'confirmed'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {property && (
                                <Link
                                  to={`/property/${property.id}`}
                                  className="px-6 py-2 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease"
                                >
                                  View Property
                                </Link>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <Calendar className="w-16 h-16 text-luxury-gold/30 mx-auto mb-4" />
                      <p className="text-luxury-black/60 mb-4">
                        No inspections scheduled yet
                      </p>
                      <Link
                        to="/properties"
                        className="inline-block px-6 py-3 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease"
                      >
                        Browse Properties
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'searches' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Search className="w-16 h-16 text-luxury-gold/30 mx-auto mb-4" />
                  <p className="text-luxury-black/60">No saved searches yet</p>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-serif font-bold text-luxury-black mb-6">
                    Account Settings
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="p-6 bg-luxury-white border-2 border-luxury-champagne rounded-2xl">
                      <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
                      />
                    </div>
                    
                    <div className="p-6 bg-luxury-white border-2 border-luxury-champagne rounded-2xl">
                      <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
                      />
                    </div>
                    
                    <div className="p-6 bg-luxury-white border-2 border-luxury-champagne rounded-2xl">
                      <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue={user?.phone}
                        className="w-full px-4 py-3 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
                      />
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease luxury-shadow"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-luxury-gold/10 to-luxury-champagne/20 border border-luxury-gold/20 luxury-shadow"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-luxury-gold flex items-center justify-center text-3xl font-bold text-luxury-white">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-2xl font-serif font-bold text-luxury-black text-center mb-2">
                {user?.name}
              </h3>
              <p className="text-center text-luxury-black/70 mb-6">{user?.email}</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease"
              >
                Edit Profile
              </motion.button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-luxury-white border-2 border-luxury-champagne luxury-shadow"
            >
              <h3 className="text-xl font-serif font-bold text-luxury-black mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/"
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-luxury-champagne/20 premium-ease"
                >
                  <Home className="w-5 h-5 text-luxury-gold" />
                  <span className="text-luxury-black">Browse Properties</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-luxury-champagne/20 premium-ease"
                >
                  <Bell className="w-5 h-5 text-luxury-gold" />
                  <span className="text-luxury-black">Notifications</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-luxury-champagne/20 premium-ease"
                >
                  <TrendingUp className="w-5 h-5 text-luxury-gold" />
                  <span className="text-luxury-black">Market Insights</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

