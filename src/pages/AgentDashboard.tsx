import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Plus, Calendar, Home, MapPin, DollarSign, Bed, Bath, Square, Clock, CheckCircle2 } from 'lucide-react'

interface House {
    id: string
    title: string
    price: string
    location: string
    beds: number
    baths: number
    sqft: number
    image: string
    status: 'active' | 'pending' | 'sold'
}

interface Inspection {
    id: string
    property: string
    client: string
    date: string
    time: string
    status: 'confirmed' | 'pending'
}

const AgentDashboard = () => {
    const { user } = useAuth()
    const [showAddModal, setShowAddModal] = useState(false)

    // Mock Data State
    const [listings, setListings] = useState<House[]>([])
    const [inspections] = useState<Inspection[]>([
        {
            id: '1',
            property: 'Modern Hills Villa',
            client: 'John Smith',
            date: '2024-03-25',
            time: '10:00 AM',
            status: 'confirmed'
        },
        {
            id: '2',
            property: 'Oceanfront Penthouse',
            client: 'Sarah Johnson',
            date: '2024-03-26',
            time: '2:30 PM',
            status: 'pending'
        }
    ])

    // New Listing Form State
    const [newListing, setNewListing] = useState({
        title: '',
        price: '',
        location: '',
        beds: '',
        baths: '',
        sqft: '',
        image: 'https://images.unsplash.com/photo-1600596542815-27bfefd0c3c6?auto=format&fit=crop&q=80'
    })

    useEffect(() => {
        // Load listings from localStorage
        const storedListings = localStorage.getItem('agent_listings')
        if (storedListings) {
            setListings(JSON.parse(storedListings))
        }
    }, [])

    const handleAddListing = (e: React.FormEvent) => {
        e.preventDefault()
        const listing: House = {
            id: Date.now().toString(),
            title: newListing.title,
            price: newListing.price,
            location: newListing.location,
            beds: Number(newListing.beds),
            baths: Number(newListing.baths),
            sqft: Number(newListing.sqft),
            image: newListing.image,
            status: 'active'
        }

        const updatedListings = [...listings, listing]
        setListings(updatedListings)
        localStorage.setItem('agent_listings', JSON.stringify(updatedListings))
        setShowAddModal(false)
        setNewListing({
            title: '',
            price: '',
            location: '',
            beds: '',
            baths: '',
            sqft: '',
            image: 'https://images.unsplash.com/photo-1600596542815-27bfefd0c3c6?auto=format&fit=crop&q=80'
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-luxury-black mb-2">
                            Agent Dashboard
                        </h1>
                        <p className="text-gray-500">Welcome back, {user?.name}</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-luxury-gold text-luxury-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-luxury-gold/90 transition-colors"
                    >
                        <Plus size={20} />
                        Add New Listing
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Home size={24} />
                            </div>
                            <span className="text-sm text-gray-400">Total Listings</span>
                        </div>
                        <h3 className="text-3xl font-bold text-luxury-black">{listings.length}</h3>
                        <p className="text-sm text-green-500 mt-2">+2 this week</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <Calendar size={24} />
                            </div>
                            <span className="text-sm text-gray-400">Inspections</span>
                        </div>
                        <h3 className="text-3xl font-bold text-luxury-black">{inspections.length}</h3>
                        <p className="text-sm text-gray-500 mt-2">Upcoming this week</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                <CheckCircle2 size={24} />
                            </div>
                            <span className="text-sm text-gray-400">Active Requests</span>
                        </div>
                        <h3 className="text-3xl font-bold text-luxury-black">12</h3>
                        <p className="text-sm text-red-500 mt-2">3 urgent</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Listings Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-serif font-bold text-luxury-black">Active Listings</h2>
                        <div className="grid gap-6">
                            {listings.length === 0 ? (
                                <div className="bg-white p-8 rounded-2xl text-center border border-dashed border-gray-300">
                                    <p className="text-gray-500">No active listings. Add your first property!</p>
                                </div>
                            ) : (
                                listings.map((house) => (
                                    <motion.div
                                        key={house.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-6"
                                    >
                                        <img
                                            src={house.image}
                                            alt={house.title}
                                            className="w-48 h-32 object-cover rounded-xl"
                                        />
                                        <div className="flex-1 py-2">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-luxury-black">{house.title}</h3>
                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">
                                                    {house.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                                                <MapPin size={14} />
                                                {house.location}
                                            </p>
                                            <div className="flex items-center gap-6 text-sm text-gray-600">
                                                <span className="flex items-center gap-2">
                                                    <DollarSign size={16} className="text-luxury-gold" />
                                                    <span className="font-bold text-luxury-black">{house.price}</span>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Bed size={16} /> {house.beds}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Bath size={16} /> {house.baths}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Square size={16} /> {house.sqft} sqft
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Inspections Column */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif font-bold text-luxury-black">Upcoming Inspections</h2>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                            {inspections.map((inspection) => (
                                <div key={inspection.id} className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                    <div className="p-3 bg-luxury-gold/10 text-luxury-gold rounded-xl">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-luxury-black">{inspection.property}</h4>
                                        <p className="text-sm text-gray-500 mb-2">with {inspection.client}</p>
                                        <div className="flex items-center gap-3 text-xs font-medium">
                                            <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                                                {inspection.date}
                                            </span>
                                            <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                                                {inspection.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Listing Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif font-bold text-luxury-black">Add New Property</h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                Cancel
                            </button>
                        </div>

                        <form onSubmit={handleAddListing} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                                    <input
                                        type="text"
                                        value={newListing.title}
                                        onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-luxury-gold focus:ring-0"
                                        placeholder="e.g. Modern Sunset Villa"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                                    <input
                                        type="text"
                                        value={newListing.price}
                                        onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-luxury-gold focus:ring-0"
                                        placeholder="$2,500,000"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={newListing.location}
                                        onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-luxury-gold focus:ring-0"
                                        placeholder="Beverly Hills, CA"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Beds</label>
                                    <input
                                        type="number"
                                        value={newListing.beds}
                                        onChange={(e) => setNewListing({ ...newListing, beds: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-luxury-gold focus:ring-0"
                                        placeholder="4"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Baths</label>
                                    <input
                                        type="number"
                                        value={newListing.baths}
                                        onChange={(e) => setNewListing({ ...newListing, baths: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-luxury-gold focus:ring-0"
                                        placeholder="3.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sqft</label>
                                    <input
                                        type="number"
                                        value={newListing.sqft}
                                        onChange={(e) => setNewListing({ ...newListing, sqft: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-luxury-gold focus:ring-0"
                                        placeholder="3500"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                    <input
                                        type="url"
                                        value={newListing.image}
                                        onChange={(e) => setNewListing({ ...newListing, image: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-luxury-gold focus:ring-0"
                                        placeholder="https://..."
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-luxury-gold text-luxury-black py-4 rounded-xl font-bold hover:bg-luxury-gold/90 transition-colors"
                            >
                                Add Property
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default AgentDashboard
