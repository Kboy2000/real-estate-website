import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  const footerLinks = {
    properties: ['Browse Properties', 'Luxury Estates', 'Smart Homes', 'Virtual Tours'],
    services: ['Property Management', 'Investment Advisory', 'Concierge Services', 'Smart Home Setup'],
    company: ['About Us', 'Our Team', 'Careers', 'Press', 'Agent Portal'],
    legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
  }

  return (
    <footer id="contact" className="relative py-16 lg:py-24 marble-bg border-t border-luxury-gold/20 overflow-hidden">
      {/* Decorative gold veins */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-luxury-gold" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-luxury-gold" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center luxury-shadow">
                  <span className="text-2xl font-serif font-bold text-luxury-white">L</span>
                </div>
                <span className="text-3xl font-serif font-bold text-luxury-black">LUXE</span>
              </div>
              <p className="text-luxury-black/70 leading-relaxed max-w-md">
                Redefining luxury real estate with cutting-edge smart home technology.
                Where architectural excellence meets intelligent living.
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 text-luxury-black/70">
                <Phone className="w-5 h-5 text-luxury-gold" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-luxury-black/70">
                <Mail className="w-5 h-5 text-luxury-gold" />
                <span>info@luxeestates.com</span>
              </div>
              <div className="flex items-center space-x-3 text-luxury-black/70">
                <MapPin className="w-5 h-5 text-luxury-gold" />
                <span>123 Beverly Hills, CA 90210</span>
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 + 0.2 }}
            >
              <h3 className="text-lg font-serif font-bold text-luxury-black mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    {link === 'Agent Portal' ? (
                      <Link to="/agent/login" className="text-luxury-black/70 hover:text-luxury-gold premium-ease inline-block">
                        {link}
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="text-luxury-black/70 hover:text-luxury-gold premium-ease inline-block"
                      >
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-luxury-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full border-2 border-luxury-gold/30 flex items-center justify-center text-luxury-black hover:bg-luxury-gold hover:border-luxury-gold premium-ease"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>

            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-luxury-black/60 text-sm"
            >
              © {new Date().getFullYear()} LUXE Estates. All rights reserved.
            </motion.p>
          </div>
        </div>

        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-luxury-gold/10 text-center"
        >
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">
            Certified Luxury Real Estate Brokerage • Member of International Luxury Real Estate Federation
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

