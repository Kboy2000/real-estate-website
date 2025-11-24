import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Building2, Key, Mail, ArrowRight, Loader2, User, Phone, FileBadge } from 'lucide-react'

const AgentSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        licenseNumber: ''
    })
    const [error, setError] = useState('')
    const { signupAgent, isLoading } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    const validateForm = () => {
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long')
            return false
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return false
        }
        if (!formData.licenseNumber) {
            setError('Real Estate License Number is required')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!validateForm()) {
            return
        }

        try {
            const success = await signupAgent(
                formData.name,
                formData.email,
                formData.password,
                formData.phone,
                formData.licenseNumber
            )

            if (success) {
                navigate('/agent/dashboard')
            } else {
                setError('An account with this email already exists')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-black/90 to-luxury-black" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md my-12"
            >
                <div className="bg-luxury-black/50 backdrop-blur-xl border border-luxury-gold/20 p-8 rounded-3xl shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex p-4 rounded-full bg-luxury-gold/10 mb-4 border border-luxury-gold/20">
                            <Building2 className="w-8 h-8 text-luxury-gold" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-luxury-white mb-2">
                            Agent <span className="text-luxury-gold">Registration</span>
                        </h1>
                        <p className="text-luxury-white/60">
                            Join our exclusive network of luxury real estate agents
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            {/* Name */}
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold/50 group-focus-within:text-luxury-gold transition-colors" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="w-full bg-luxury-white/5 border border-luxury-white/10 rounded-xl py-3 pl-12 pr-4 text-luxury-white placeholder:text-luxury-white/30 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold/50 group-focus-within:text-luxury-gold transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="w-full bg-luxury-white/5 border border-luxury-white/10 rounded-xl py-3 pl-12 pr-4 text-luxury-white placeholder:text-luxury-white/30 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold/50 group-focus-within:text-luxury-gold transition-colors" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="w-full bg-luxury-white/5 border border-luxury-white/10 rounded-xl py-3 pl-12 pr-4 text-luxury-white placeholder:text-luxury-white/30 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                    required
                                />
                            </div>

                            {/* License Number */}
                            <div className="relative group">
                                <FileBadge className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold/50 group-focus-within:text-luxury-gold transition-colors" />
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                    placeholder="Real Estate License #"
                                    className="w-full bg-luxury-white/5 border border-luxury-white/10 rounded-xl py-3 pl-12 pr-4 text-luxury-white placeholder:text-luxury-white/30 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative group">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold/50 group-focus-within:text-luxury-gold transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full bg-luxury-white/5 border border-luxury-white/10 rounded-xl py-3 pl-12 pr-4 text-luxury-white placeholder:text-luxury-white/30 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                    required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="relative group">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold/50 group-focus-within:text-luxury-gold transition-colors" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    className="w-full bg-luxury-white/5 border border-luxury-white/10 rounded-xl py-3 pl-12 pr-4 text-luxury-white placeholder:text-luxury-white/30 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Register Agent</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-luxury-white/40">
                            Already have an agent account?{' '}
                            <Link to="/agent/login" className="text-luxury-gold hover:text-luxury-gold/80 transition-colors font-semibold">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default AgentSignup
