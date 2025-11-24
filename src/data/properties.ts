export interface Property {
  id: string
  name: string
  location: string
  city: string
  state: string
  country: string
  price: number
  beds: number
  baths: number
  sqft: number
  garage: number
  year: number
  type: 'Villa' | 'Penthouse' | 'Estate' | 'Mansion' | 'Retreat' | 'Beachfront'
  images: string[]
  description: string
  features: string[]
  amenities: string[]
  smartHomeFeatures: string[]
  personality: ('minimalist' | 'nature' | 'executive' | 'luxury')[]
  coordinates: { lat: number; lng: number }
  agent: {
    name: string
    email: string
    phone: string
    avatar: string
  }
  status: 'available' | 'pending' | 'sold'
  listedDate: string
}

export const properties: Property[] = [
  {
    id: '1',
    name: 'Villa Serenity',
    location: 'Beverly Hills, CA',
    city: 'Beverly Hills',
    state: 'CA',
    country: 'USA',
    price: 24500000,
    beds: 6,
    baths: 8,
    sqft: 12500,
    garage: 3,
    year: 2023,
    type: 'Villa',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
    description: 'An architectural masterpiece that seamlessly blends contemporary luxury with timeless elegance. This ultra-premium estate features cutting-edge smart home automation, panoramic views, and world-class amenities.',
    features: [
      'Smart Home Automation System',
      'Infinity Pool with Spa',
      'Private Wine Cellar',
      'Home Theater',
      'Gourmet Kitchen',
      'Private Gym',
      'Rooftop Terrace',
      '3-Car Garage',
    ],
    amenities: ['Pool', 'Spa', 'Gym', 'Wine Cellar', 'Theater', 'Rooftop'],
    smartHomeFeatures: ['Full Home Automation', 'Voice Control', 'Security System', 'Climate Control', 'Lighting Control'],
    personality: ['minimalist', 'executive'],
    coordinates: { lat: 34.0736, lng: -118.4004 },
    agent: {
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@luxe.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    },
    status: 'available',
    listedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Glass Pavilion',
    location: 'Malibu, CA',
    city: 'Malibu',
    state: 'CA',
    country: 'USA',
    price: 18900000,
    beds: 5,
    baths: 6,
    sqft: 9800,
    garage: 2,
    year: 2022,
    type: 'Estate',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
    description: 'A stunning glass-fronted estate with breathtaking ocean views. This modern architectural gem features floor-to-ceiling windows, open-concept living, and seamless indoor-outdoor integration.',
    features: [
      'Ocean Views',
      'Glass Architecture',
      'Infinity Pool',
      'Beach Access',
      'Open Floor Plan',
      'Smart Home System',
      'Private Beach',
      'Helipad',
    ],
    amenities: ['Pool', 'Beach Access', 'Helipad', 'Gym', 'Spa'],
    smartHomeFeatures: ['Automated Blinds', 'Climate Control', 'Security', 'Entertainment System'],
    personality: ['minimalist', 'nature'],
    coordinates: { lat: 34.0259, lng: -118.7798 },
    agent: {
      name: 'Michael Chen',
      email: 'michael.chen@luxe.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    },
    status: 'available',
    listedDate: '2024-02-01',
  },
  {
    id: '3',
    name: 'Skyline Penthouse',
    location: 'Manhattan, NY',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    price: 32000000,
    beds: 4,
    baths: 5,
    sqft: 8200,
    garage: 0,
    year: 2024,
    type: 'Penthouse',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
    description: 'The ultimate urban sanctuary in the heart of Manhattan. This triplex penthouse offers 360-degree city views, private terraces, and unparalleled luxury in one of the world\'s most prestigious addresses.',
    features: [
      '360° City Views',
      'Private Terraces',
      'Private Elevator',
      'Wine Cellar',
      'Home Office',
      'Smart Home',
      'Concierge Service',
      'Rooftop Garden',
    ],
    amenities: ['Concierge', 'Gym', 'Spa', 'Wine Cellar', 'Rooftop'],
    smartHomeFeatures: ['Full Automation', 'Voice Control', 'Security', 'Climate', 'Lighting'],
    personality: ['executive', 'luxury'],
    coordinates: { lat: 40.7589, lng: -73.9851 },
    agent: {
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@luxe.com',
      phone: '+1 (555) 345-6789',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    },
    status: 'available',
    listedDate: '2024-01-20',
  },
  {
    id: '4',
    name: 'Oceanfront Villa',
    location: 'Monaco',
    city: 'Monaco',
    state: '',
    country: 'Monaco',
    price: 45000000,
    beds: 7,
    baths: 9,
    sqft: 15000,
    garage: 4,
    year: 2021,
    type: 'Villa',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
    ],
    description: 'A magnificent Mediterranean villa perched on the cliffs of Monaco. This palatial estate offers unparalleled luxury with direct sea access, private marina, and world-class amenities.',
    features: [
      'Direct Sea Access',
      'Private Marina',
      'Infinity Pool',
      'Private Beach',
      'Helipad',
      'Wine Cellar',
      'Home Theater',
      'Guest House',
    ],
    amenities: ['Pool', 'Marina', 'Beach', 'Helipad', 'Gym', 'Spa', 'Theater'],
    smartHomeFeatures: ['Full Automation', 'Security', 'Climate', 'Entertainment'],
    personality: ['luxury', 'nature'],
    coordinates: { lat: 43.7384, lng: 7.4246 },
    agent: {
      name: 'Jean-Pierre Dubois',
      email: 'jp.dubois@luxe.com',
      phone: '+377 93 12 34 56',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    },
    status: 'available',
    listedDate: '2024-01-10',
  },
  {
    id: '5',
    name: 'Mountain Retreat',
    location: 'Aspen, CO',
    city: 'Aspen',
    state: 'CO',
    country: 'USA',
    price: 22000000,
    beds: 6,
    baths: 7,
    sqft: 11000,
    garage: 3,
    year: 2020,
    type: 'Retreat',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'A luxurious mountain sanctuary surrounded by pristine wilderness. This architectural gem combines rustic elegance with modern luxury, featuring ski-in/ski-out access and breathtaking mountain vistas.',
    features: [
      'Ski-In/Ski-Out',
      'Mountain Views',
      'Hot Tub',
      'Fireplace',
      'Wine Cellar',
      'Game Room',
      'Home Theater',
      'Guest Quarters',
    ],
    amenities: ['Ski Access', 'Hot Tub', 'Fireplace', 'Gym', 'Spa'],
    smartHomeFeatures: ['Climate Control', 'Security', 'Lighting', 'Entertainment'],
    personality: ['nature', 'luxury'],
    coordinates: { lat: 39.1911, lng: -106.8175 },
    agent: {
      name: 'Robert Thompson',
      email: 'robert.thompson@luxe.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    },
    status: 'available',
    listedDate: '2024-02-15',
  },
  {
    id: '6',
    name: 'Beachfront Mansion',
    location: 'Miami, FL',
    city: 'Miami',
    state: 'FL',
    country: 'USA',
    price: 35000000,
    beds: 8,
    baths: 10,
    sqft: 18000,
    garage: 5,
    year: 2023,
    type: 'Mansion',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
    description: 'An opulent beachfront estate in Miami\'s most exclusive enclave. This palatial mansion features direct beach access, private dock, and resort-style amenities that redefine luxury living.',
    features: [
      'Direct Beach Access',
      'Private Dock',
      'Infinity Pool',
      'Tennis Court',
      'Guest House',
      'Home Theater',
      'Wine Cellar',
      'Private Gym',
    ],
    amenities: ['Pool', 'Beach', 'Dock', 'Tennis Court', 'Gym', 'Spa', 'Theater'],
    smartHomeFeatures: ['Full Automation', 'Security', 'Climate', 'Lighting', 'Entertainment'],
    personality: ['luxury', 'nature'],
    coordinates: { lat: 25.7617, lng: -80.1918 },
    agent: {
      name: 'Isabella Martinez',
      email: 'isabella.martinez@luxe.com',
      phone: '+1 (555) 567-8901',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    },
    status: 'available',
    listedDate: '2024-01-25',
  },
  {
    id: '7',
    name: 'Modern Glass Estate',
    location: 'Los Angeles, CA',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    price: 28900000,
    beds: 5,
    baths: 6,
    sqft: 10500,
    garage: 3,
    year: 2024,
    type: 'Estate',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    ],
    description: 'A cutting-edge architectural masterpiece featuring floor-to-ceiling glass walls, minimalist design, and state-of-the-art smart home technology. Perfect for the modern executive.',
    features: [
      'Glass Architecture',
      'Smart Home System',
      'Infinity Pool',
      'Rooftop Deck',
      'Home Office',
      'Wine Cellar',
      'Private Gym',
      'Home Theater',
    ],
    amenities: ['Pool', 'Gym', 'Spa', 'Theater', 'Wine Cellar'],
    smartHomeFeatures: ['Full Automation', 'Voice Control', 'Security', 'Climate', 'Lighting'],
    personality: ['minimalist', 'executive'],
    coordinates: { lat: 34.0522, lng: -118.2437 },
    agent: {
      name: 'David Kim',
      email: 'david.kim@luxe.com',
      phone: '+1 (555) 678-9012',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    },
    status: 'available',
    listedDate: '2024-02-10',
  },
  {
    id: '8',
    name: 'Dubai Skyline Penthouse',
    location: 'Dubai, UAE',
    city: 'Dubai',
    state: '',
    country: 'UAE',
    price: 38500000,
    beds: 5,
    baths: 6,
    sqft: 9500,
    garage: 2,
    year: 2023,
    type: 'Penthouse',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    ],
    description: 'An ultra-luxurious penthouse in the heart of Dubai with panoramic views of the Arabian Gulf and city skyline. Features world-class amenities and unparalleled opulence.',
    features: [
      '360° Views',
      'Private Elevator',
      'Infinity Pool',
      'Private Terrace',
      'Home Theater',
      'Wine Cellar',
      'Concierge Service',
      'Helipad Access',
    ],
    amenities: ['Pool', 'Concierge', 'Gym', 'Spa', 'Theater', 'Helipad'],
    smartHomeFeatures: ['Full Automation', 'Voice Control', 'Security', 'Climate'],
    personality: ['luxury', 'executive'],
    coordinates: { lat: 25.2048, lng: 55.2708 },
    agent: {
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.alrashid@luxe.com',
      phone: '+971 4 123 4567',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    },
    status: 'available',
    listedDate: '2024-01-30',
  },
  {
    id: '9',
    name: 'Swiss Alpine Chalet',
    location: 'St. Moritz, Switzerland',
    city: 'St. Moritz',
    state: '',
    country: 'Switzerland',
    price: 28000000,
    beds: 6,
    baths: 7,
    sqft: 12000,
    garage: 3,
    year: 2022,
    type: 'Retreat',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'A luxurious alpine retreat in the heart of the Swiss Alps. This stunning chalet combines traditional Swiss architecture with modern luxury and offers world-class skiing and mountain views.',
    features: [
      'Ski-In/Ski-Out',
      'Mountain Views',
      'Indoor Pool',
      'Spa Facilities',
      'Wine Cellar',
      'Home Theater',
      'Fireplace',
      'Guest Quarters',
    ],
    amenities: ['Pool', 'Spa', 'Ski Access', 'Gym', 'Theater', 'Fireplace'],
    smartHomeFeatures: ['Climate Control', 'Security', 'Lighting', 'Entertainment'],
    personality: ['nature', 'luxury'],
    coordinates: { lat: 46.4907, lng: 9.8355 },
    agent: {
      name: 'Sophie Laurent',
      email: 'sophie.laurent@luxe.com',
      phone: '+41 81 123 4567',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    },
    status: 'available',
    listedDate: '2024-02-05',
  },
  {
    id: '10',
    name: 'Hampton Estate',
    location: 'The Hamptons, NY',
    city: 'Southampton',
    state: 'NY',
    country: 'USA',
    price: 42000000,
    beds: 9,
    baths: 11,
    sqft: 22000,
    garage: 6,
    year: 2021,
    type: 'Mansion',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
    description: 'An iconic Hamptons estate on sprawling oceanfront grounds. This magnificent property features multiple structures, private beach, tennis courts, and every imaginable luxury amenity.',
    features: [
      'Oceanfront',
      'Private Beach',
      'Tennis Courts',
      'Guest Houses',
      'Pool Complex',
      'Home Theater',
      'Wine Cellar',
      'Helipad',
    ],
    amenities: ['Pool', 'Beach', 'Tennis', 'Gym', 'Spa', 'Theater', 'Helipad'],
    smartHomeFeatures: ['Full Automation', 'Security', 'Climate', 'Lighting', 'Entertainment'],
    personality: ['luxury', 'nature'],
    coordinates: { lat: 40.8843, lng: -72.3895 },
    agent: {
      name: 'Victoria Sterling',
      email: 'victoria.sterling@luxe.com',
      phone: '+1 (555) 789-0123',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    },
    status: 'available',
    listedDate: '2024-01-05',
  },
]

export const getPropertyById = (id: string): Property | undefined => {
  // First check static properties
  const staticProperty = properties.find(p => p.id === id)
  if (staticProperty) return staticProperty

  // Then check local storage
  const storedListings = localStorage.getItem('agent_listings')
  if (storedListings) {
    const listings = JSON.parse(storedListings)
    const listing = listings.find((l: any) => l.id === id)
    if (listing) {
      return {
        id: listing.id,
        name: listing.title,
        location: listing.location,
        city: listing.location.split(',')[0] || listing.location,
        state: listing.location.split(',')[1]?.trim() || '',
        country: 'USA',
        price: parseInt(listing.price.replace(/[^0-9]/g, '')),
        beds: listing.beds,
        baths: listing.baths,
        sqft: listing.sqft,
        garage: 2,
        year: new Date().getFullYear(),
        type: 'Villa',
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
      }
    }
  }

  return undefined
}

export const getPropertiesByPersonality = (personality: string): Property[] => {
  return properties.filter(p => p.personality.includes(personality as any))
}

export const searchProperties = (query: string): Property[] => {
  const lowerQuery = query.toLowerCase()
  return properties.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.location.toLowerCase().includes(lowerQuery) ||
    p.city.toLowerCase().includes(lowerQuery) ||
    p.type.toLowerCase().includes(lowerQuery)
  )
}

export const filterProperties = (filters: {
  type?: string
  minPrice?: number
  maxPrice?: number
  minBeds?: number
  minBaths?: number
  location?: string
}): Property[] => {
  return properties.filter(p => {
    if (filters.type && p.type !== filters.type) return false
    if (filters.minPrice && p.price < filters.minPrice) return false
    if (filters.maxPrice && p.price > filters.maxPrice) return false
    if (filters.minBeds && p.beds < filters.minBeds) return false
    if (filters.minBaths && p.baths < filters.minBaths) return false
    if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    return true
  })
}

