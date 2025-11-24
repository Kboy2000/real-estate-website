import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { motion } from 'framer-motion'
import { School, ShoppingBag, Utensils, Dumbbell, TreePine, PlusSquare } from 'lucide-react'

// Fix for default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
})

const amenities = [
    {
        id: 1,
        name: 'Beverly Hills High School',
        type: 'School',
        position: [34.0696, -118.4053] as [number, number],
        description: 'Top-rated public high school known for academic excellence.',
        icon: School,
        color: '#4A90E2'
    },
    {
        id: 2,
        name: 'Cedars-Sinai Medical Center',
        type: 'Hospital',
        position: [34.0754, -118.3808] as [number, number],
        description: 'World-class medical facility providing comprehensive care.',
        icon: PlusSquare,
        color: '#E25555'
    },
    {
        id: 3,
        name: 'Rodeo Drive',
        type: 'Shopping',
        position: [34.0696, -118.4030] as [number, number],
        description: 'World-famous luxury shopping destination.',
        icon: ShoppingBag,
        color: '#D4AF37'
    },
    {
        id: 4,
        name: 'Spago Beverly Hills',
        type: 'Restaurant',
        position: [34.0674, -118.3977] as [number, number],
        description: 'Iconic flagship restaurant of Wolfgang Puck.',
        icon: Utensils,
        color: '#F5A623'
    },
    {
        id: 5,
        name: 'Equinox Beverly Hills',
        type: 'Gym',
        position: [34.0658, -118.4099] as [number, number],
        description: 'Luxury fitness club with premium amenities.',
        icon: Dumbbell,
        color: '#50E3C2'
    },
    {
        id: 6,
        name: 'Beverly Gardens Park',
        type: 'Park',
        position: [34.0725, -118.4025] as [number, number],
        description: 'Historic park featuring the famous Beverly Hills sign.',
        icon: TreePine,
        color: '#7ED321'
    }
]

const AmenitiesMap = () => {
    return (
        <section id="location" className="py-24 lg:py-32 bg-luxury-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl lg:text-7xl font-serif font-bold text-luxury-black mb-4">
                        Prime <span className="text-gold-emboss">Location</span>
                    </h2>
                    <p className="text-xl text-luxury-black/70 max-w-2xl mx-auto">
                        Discover the exceptional amenities surrounding your future home. From top-tier schools to world-class dining.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Map Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2 h-[500px] rounded-3xl overflow-hidden luxury-shadow-lg border-2 border-luxury-gold/20 relative z-0"
                    >
                        <MapContainer
                            center={[34.0700, -118.4000]}
                            zoom={14}
                            style={{ height: '100%', width: '100%' }}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {amenities.map((amenity) => (
                                <Marker key={amenity.id} position={amenity.position}>
                                    <Popup>
                                        <div className="p-2 min-w-[200px]">
                                            <div className="flex items-center gap-2 mb-2">
                                                <amenity.icon size={16} color={amenity.color} />
                                                <span className="font-bold text-luxury-black">{amenity.name}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{amenity.description}</p>
                                            <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                                {amenity.type}
                                            </span>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </motion.div>

                    {/* Legend / List */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-2xl font-serif font-bold text-luxury-black mb-6">Nearby Amenities</h3>
                        <div className="space-y-4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {amenities.map((amenity) => (
                                <div
                                    key={amenity.id}
                                    className="p-4 rounded-xl bg-white border border-luxury-champagne hover:border-luxury-gold transition-colors duration-300 group cursor-pointer"
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="p-3 rounded-lg bg-opacity-10 group-hover:bg-opacity-20 transition-colors"
                                            style={{ backgroundColor: `${amenity.color}20` }}
                                        >
                                            <amenity.icon size={20} color={amenity.color} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-luxury-black group-hover:text-luxury-gold transition-colors">
                                                {amenity.name}
                                            </h4>
                                            <p className="text-sm text-gray-500 mt-1">{amenity.type}</p>
                                            <p className="text-xs text-gray-400 mt-2">{amenity.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AmenitiesMap
