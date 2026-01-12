import { Link } from 'react-router-dom'
import logoImage from '../imgs/Celia.png'
import { generateWhatsAppLink, generateContatoMessage, getWhatsAppNumber } from '../utils/whatsappHelper'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Sobre */}
          <div className="space-y-4">
            <div>
              <img 
                src={logoImage} 
                alt="C.Ikai - Logo" 
                className="h-12 object-contain brightness-0 invert mb-4"
              />
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Corretora com mais de 5 anos de experiência. Realizamos uma pesquisa detalhada do empreendimento que atenda às suas necessidades dentro da sua realidade financeira. 
              Transformamos o sonho da casa própria em realidade.
            </p>
            <p className="text-primary-400 text-sm font-semibold">
              CRECI SP 282.069
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm font-medium inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/lancamentos" 
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm font-medium inline-block"
                >
                  Lançamentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Entre em Contato</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Estamos prontos para ajudar você a encontrar o imóvel perfeito.
            </p>
            <p className="text-primary-400 text-lg font-bold mb-6">{getWhatsAppNumber()}</p>
            <a
              href={generateWhatsAppLink(generateContatoMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} C.Ikai - CRECI SP 282.069. Todos os direitos reservados.</p>
            <p className="mt-4 md:mt-0">Desenvolvido para transformar sonhos em realidade</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
