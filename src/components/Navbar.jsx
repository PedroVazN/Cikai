import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import logoImage from '../imgs/Celia.png'
import { generateWhatsAppLink, generateContatoMessage } from '../utils/whatsappHelper'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logoImage} 
              alt="C.Ikai - Logo" 
              className="h-16 md:h-20 object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/lancamentos"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/lancamentos')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Lançamentos
            </Link>
            <a
              href={generateWhatsAppLink(generateContatoMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/lancamentos"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/lancamentos')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Lançamentos
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
