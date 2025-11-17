import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Lightbulb, 
  Thermometer, 
  Shield, 
  Droplet, 
  Wind, 
  Tv, 
  Zap,
  Activity
} from 'lucide-react'

interface Device {
  id: string
  name: string
  icon: any
  value: number | string
  unit: string
  status: 'on' | 'off' | 'auto'
  color: string
}

const SmartHomeDashboard = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'Living Room Lights', icon: Lightbulb, value: 75, unit: '%', status: 'on', color: '#D4AF37' },
    { id: '2', name: 'Temperature', icon: Thermometer, value: 22, unit: '°C', status: 'auto', color: '#4A90E2' },
    { id: '3', name: 'Security System', icon: Shield, value: 'Armed', unit: '', status: 'on', color: '#2ECC71' },
    { id: '4', name: 'Pool Temperature', icon: Droplet, value: 28, unit: '°C', status: 'on', color: '#3498DB' },
    { id: '5', name: 'Air Quality', icon: Wind, value: 95, unit: '%', status: 'auto', color: '#9B59B6' },
    { id: '6', name: 'Entertainment', icon: Tv, value: 'Off', unit: '', status: 'off', color: '#E74C3C' },
  ])

  const [energyData, setEnergyData] = useState<number[]>([])
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)

  useEffect(() => {
    // Simulate energy consumption data
    const generateData = () => {
      return Array.from({ length: 24 }, () => Math.random() * 100)
    }
    setEnergyData(generateData())
    const interval = setInterval(() => {
      setEnergyData(generateData())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const updateDeviceValue = (id: string, newValue: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, value: newValue } : device
    ))
  }

  return (
    <section id="smart-living" className="relative py-24 lg:py-32 bg-luxury-black overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-4">
            Smart Home <span className="text-gold-emboss">Automation</span>
          </h2>
          <p className="text-xl text-luxury-champagne max-w-2xl mx-auto">
            Control every aspect of your luxury home with AI-powered automation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Device Controls */}
          <div className="lg:col-span-2 space-y-4">
            {devices.map((device, index) => {
              const Icon = device.icon
              const isNumeric = typeof device.value === 'number'
              
              return (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedDevice(device.id)}
                  className={`p-6 rounded-2xl cursor-pointer premium-ease ${
                    selectedDevice === device.id
                      ? 'bg-luxury-gold/20 border-2 border-luxury-gold'
                      : 'bg-luxury-black-matte/50 backdrop-blur-md border border-luxury-gold/10 hover:border-luxury-gold/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${device.color}20` }}
                      >
                        <Icon 
                          className="w-6 h-6"
                          style={{ color: device.color }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {device.name}
                        </h3>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl font-bold text-luxury-gold">
                            {device.value}{device.unit}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            device.status === 'on'
                              ? 'bg-green-500/20 text-green-400'
                              : device.status === 'auto'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {device.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {isNumeric && (
                      <div className="flex-1 max-w-[200px] ml-6">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={device.value as number}
                          onChange={(e) => updateDeviceValue(device.id, parseInt(e.target.value))}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full h-2 bg-luxury-black-matte rounded-lg appearance-none cursor-pointer accent-luxury-gold"
                          style={{
                            background: `linear-gradient(to right, ${device.color} 0%, ${device.color} ${device.value}%, #2C2C2C ${device.value}%, #2C2C2C 100%)`
                          }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Energy Consumption Graph */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 rounded-2xl bg-luxury-black-matte/50 backdrop-blur-md border border-luxury-gold/10"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="w-5 h-5 text-luxury-gold" />
                <h3 className="text-xl font-semibold text-white">Energy Consumption</h3>
              </div>
            
            <div className="h-48 flex items-end justify-between space-x-1">
              {energyData.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ duration: 0.5, delay: index * 0.01 }}
                  className="flex-1 bg-gradient-to-t from-luxury-gold to-luxury-gold-light rounded-t"
                  style={{ minHeight: '4px' }}
                />
              ))}
            </div>
            
              <div className="mt-4 pt-4 border-t border-luxury-gold/20">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-luxury-champagne">Today</span>
                  <span className="text-2xl font-bold text-luxury-gold">2.4 kW</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-luxury-champagne">This Month</span>
                  <span className="text-lg text-white">72 kW</span>
                </div>
              </div>
          </motion.div>
        </div>

        {/* Floor Plan Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 p-8 rounded-3xl bg-luxury-black-matte/50 backdrop-blur-md border border-luxury-gold/10"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Activity className="w-5 h-5 text-luxury-gold" />
                <h3 className="text-2xl font-serif font-bold text-white">Active Devices Map</h3>
              </div>
          
          <div className="grid grid-cols-4 gap-4">
            {['Living Room', 'Kitchen', 'Master Bedroom', 'Pool Area'].map((room, index) => (
              <motion.div
                key={room}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-gradient-to-br from-luxury-gold/10 to-luxury-gold/5 border border-luxury-gold/20 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-luxury-gold animate-pulse" />
                </div>
                <h4 className="text-white font-semibold mb-2">{room}</h4>
                <p className="text-sm text-luxury-champagne">
                  {Math.floor(Math.random() * 5) + 2} devices active
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { label: 'Pool Temperature', value: '28°C', icon: Droplet },
            { label: 'Security Status', value: 'Armed', icon: Shield },
            { label: 'System Health', value: 'Optimal', icon: Activity },
          ].map((status, index) => {
            const Icon = status.icon
            return (
              <motion.div
                key={status.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-luxury-black-matte/50 backdrop-blur-md border border-luxury-gold/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-luxury-champagne mb-1">{status.label}</p>
                    <p className="text-2xl font-bold text-luxury-gold">{status.value}</p>
                  </div>
                  <Icon className="w-8 h-8 text-luxury-gold/50" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SmartHomeDashboard

