import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import logoImage from '../imgs/Celia.png'
import { generateWhatsAppLink, generateContatoMessage } from '../utils/whatsappHelper'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/98 backdrop-blur-md shadow-elegant sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logoImage} 
              alt="C.Ikai - Logo" 
              className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 max-w-[200px] sm:max-w-[250px] md:max-w-none"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/')
                  ? 'text-primary-700 bg-primary-50 shadow-sm'
                  : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50/80'
              }`}
            >
              Home
            </Link>
            <Link
              to="/lancamentos"
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/lancamentos')
                  ? 'text-primary-700 bg-primary-50 shadow-sm'
                  : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50/80'
              }`}
            >
              Lançamentos
            </Link>
            <a
              href={generateWhatsAppLink(generateContatoMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 bg-gradient-to-r from-primary-700 to-primary-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:from-primary-800 hover:to-primary-900 transition-all duration-300 shadow-elegant hover:shadow-elegant-lg transform hover:scale-105"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200/50 bg-white/98 backdrop-blur-md">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive('/')
                  ? 'text-primary-700 bg-primary-50 shadow-sm'
                  : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50/80'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/lancamentos"
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                isActive('/lancamentos')
                  ? 'text-primary-700 bg-primary-50 shadow-sm'
                  : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50/80'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Lançamentos
            </Link>
            <a
              href={generateWhatsAppLink(generateContatoMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 rounded-lg text-base font-semibold bg-gradient-to-r from-primary-700 to-primary-800 text-white hover:from-primary-800 hover:to-primary-900 transition-all duration-300 shadow-elegant"
              onClick={() => setIsOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
