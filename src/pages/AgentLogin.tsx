import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Building2, Key, Mail, ArrowRight, Loader2 } from 'lucide-react'

const AgentLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { loginAgent, isLoading } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const success = await loginAgent(email, password)
            if (success) {
                navigate('/agent/dashboard')
            } else {
                setError('Invalid agent credentials')
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
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-luxury-black/50 backdrop-blur-xl border border-luxury-gold/20 p-8 rounded-3xl shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex p-4 rounded-full bg-luxury-gold/10 mb-4 border border-luxury-gold/20">
                            <Building2 className="w-8 h-8 text-luxury-gold" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-luxury-white mb-2">
                            Agent <span className="text-luxury-gold">Portal</span>
                        </h1>
                        <p className="text-luxury-white/60">
                            Access your property portfolio and inspection schedule
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold/50 group-focus-within:text-luxury-gold transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Agent Email"
                                    className="w-full bg-luxury-white/5 border border-luxury-white/10 rounded-xl py-3 pl-12 pr-4 text-luxury-white placeholder:text-luxury-white/30 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold/50 group-focus-within:text-luxury-gold transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full bg-luxury-white/5 border border-luxury-white/10 rounded-xl py-3 pl-12 pr-4 text-luxury-white placeholder:text-luxury-white/30 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Access Dashboard</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-luxury-white/40">
                            Restricted access for authorized agents only.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default AgentLogin
