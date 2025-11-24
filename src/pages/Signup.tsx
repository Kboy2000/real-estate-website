import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, Eye, EyeOff, User, Phone, Home, Check } from 'lucide-react'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const { signup } = useAuth()
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
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions')
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

    setIsLoading(true)

    const success = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.phone || undefined
    )

    if (success) {
      navigate('/dashboard')
    } else {
      setError('An account with this email already exists')
    }

    setIsLoading(false)
  }

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /[0-9]/.test(formData.password) },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-white via-luxury-champagne/20 to-luxury-white flex items-center justify-center p-6 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-champagne/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center luxury-shadow"
          >
            <Home className="w-7 h-7 text-luxury-white" />
          </motion.div>
          <span className="text-3xl font-serif font-bold text-luxury-black group-hover:text-luxury-gold premium-ease">
            LUXE
          </span>
        </Link>

        {/* Signup Card */}
        <div className="glassmorphism rounded-3xl p-8 lg:p-10 luxury-shadow-lg backdrop-blur-2xl border border-luxury-gold/20 bg-white/90">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-serif font-bold text-luxury-black mb-2">
              Create Account
            </h1>
            <p className="text-luxury-black/70 mb-8">
              Join LUXE to access exclusive properties and smart home features
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Phone Field (Optional) */}
              <div>
                <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                  Phone Number <span className="text-luxury-black/40">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-gold hover:text-luxury-gold-dark premium-ease"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-3 space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-luxury-gold' : 'bg-luxury-champagne'
                          }`}>
                          {req.met && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={req.met ? 'text-luxury-gold' : 'text-luxury-black/50'}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-luxury-black/70 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-luxury-white border-2 border-luxury-champagne rounded-xl focus:border-luxury-gold focus:outline-none premium-ease text-luxury-black"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-gold hover:text-luxury-gold-dark premium-ease"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-2 text-xs text-red-600">Passwords do not match</p>
                )}
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-luxury-gold border-luxury-champagne rounded focus:ring-luxury-gold"
                  />
                  <span className="text-sm text-luxury-black/70">
                    I agree to the{' '}
                    <Link to="/terms" className="text-luxury-gold hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-luxury-gold hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full py-4 bg-luxury-gold text-luxury-white rounded-xl font-semibold hover:bg-luxury-gold-dark premium-ease luxury-shadow disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-luxury-black/70">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-luxury-gold font-semibold hover:text-luxury-gold-dark premium-ease"
                >
                  Sign In
                </Link>
              </p>
            </div>

            {/* Agent Login Link */}
            <div className="mt-6 text-center border-t border-luxury-champagne/30 pt-6">
              <Link
                to="/agent/login"
                className="text-sm text-luxury-black/60 hover:text-luxury-gold premium-ease"
              >
                Are you an agent? <span className="font-semibold">Log in here</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup

