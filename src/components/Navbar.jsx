import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logoImage from '../imgs/logo.png'
import { generateWhatsAppLink, generateContatoMessage } from '../utils/whatsappHelper'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
        : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logoImage} 
              alt="C.Ikai - Logo" 
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isActive('/')
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/lancamentos"
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isActive('/lancamentos')
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
              }`}
            >
              Lançamentos
            </Link>
            <Link
              to="/como-comprar"
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isActive('/como-comprar')
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
              }`}
            >
              Como Comprar
            </Link>
            <a
              href={generateWhatsAppLink(generateContatoMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transform hover:scale-105"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
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
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pb-4 space-y-2 bg-white border-t border-gray-100">
          <Link
            to="/"
            className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
              isActive('/')
                ? 'text-gray-800 bg-gray-100'
                : 'text-gray-700 hover:text-gray-800 hover:bg-gray-50'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/lancamentos"
            className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
              isActive('/lancamentos')
                ? 'text-primary-700 bg-primary-50'
                : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Lançamentos
          </Link>
          <Link
            to="/como-comprar"
            className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
              isActive('/como-comprar')
                ? 'text-primary-700 bg-primary-50'
                : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Como Comprar
          </Link>
          <a
            href={generateWhatsAppLink(generateContatoMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 rounded-lg text-base font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-all duration-300 shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
