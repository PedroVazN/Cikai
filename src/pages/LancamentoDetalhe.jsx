import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../services/api'
import { normalizeImageUrl, handleImageError } from '../utils/imageHelper'
import { generateGoogleMapsEmbedUrl, generateGoogleMapsUrl } from '../utils/mapHelper'
import { generateWhatsAppLink, generateEmpreendimentoMessage } from '../utils/whatsappHelper'
import ImageGallery from '../components/ImageGallery'

function LancamentoDetalhe() {
  const { id } = useParams()
  const [empreendimento, setEmpreendimento] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmpreendimento()
  }, [id])

  const fetchEmpreendimento = async () => {
    try {
      const response = await api.get(`/empreendimentos/${id}`)
      setEmpreendimento(response.data)
    } catch (error) {
      console.error('Erro ao carregar empreendimento:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsApp = () => {
    const message = generateEmpreendimentoMessage(empreendimento?.nome || '')
    window.open(generateWhatsAppLink(message), '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    )
  }

  if (!empreendimento) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Empreendimento não encontrado.</p>
          <Link to="/lancamentos" className="btn-primary">
            Voltar para Lançamentos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      {empreendimento.imagens && empreendimento.imagens.length > 0 ? (
        <div className="relative h-[500px] md:h-[600px] overflow-hidden">
          <img
            src={normalizeImageUrl(empreendimento.imagens[0])}
            alt={empreendimento.nome}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{empreendimento.nome}</h1>
            <div className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xl">{empreendimento.bairro}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-gray-400 text-xl">Sem imagem</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:text-gray-700">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/lancamentos" className="hover:text-gray-700">Lançamentos</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{empreendimento.nome}</span>
            </nav>

            {/* Galeria de Imagens */}
            {empreendimento.imagens && empreendimento.imagens.length > 0 && (
              <ImageGallery 
                images={empreendimento.imagens} 
                title="Galeria de Fotos"
              />
            )}

            {/* Descrição */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <h2 className="text-2xl font-light mb-6 text-gray-900 tracking-tight">
                Sobre o Empreendimento
              </h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{empreendimento.descricao}</p>
            </div>

            {/* Características */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <h2 className="text-2xl font-light mb-6 text-gray-900 tracking-tight">
                Características
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {empreendimento.metragemMin && (
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Área Mínima</p>
                    <p className="text-2xl font-light text-gray-900">{empreendimento.metragemMin}m²</p>
                  </div>
                )}
                {empreendimento.metragemMax && (
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Área Máxima</p>
                    <p className="text-2xl font-light text-gray-900">{empreendimento.metragemMax}m²</p>
                  </div>
                )}
                {empreendimento.dormitorios && (
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Dormitórios</p>
                    <p className="text-2xl font-light text-gray-900">{empreendimento.dormitorios}</p>
                  </div>
                )}
                <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Suítes</p>
                  <p className="text-2xl font-light text-gray-900">
                    {empreendimento.suites && empreendimento.suites > 0 
                      ? empreendimento.suites 
                      : 'Não possui'}
                  </p>
                </div>
                {empreendimento.vagas && (
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Vagas</p>
                    <p className="text-2xl font-light text-gray-900">{empreendimento.vagas}</p>
                  </div>
                )}
                {empreendimento.construtora && (
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Construtora</p>
                    <p className="text-lg font-medium text-gray-900">{empreendimento.construtora}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Áreas de Lazer */}
            {empreendimento.areasLazer && empreendimento.areasLazer.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                <h2 className="text-2xl font-light mb-6 text-gray-900 tracking-tight">
                  Áreas de Lazer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {empreendimento.areasLazer.map((area, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <svg className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Google Maps */}
            {(empreendimento.endereco || empreendimento.googleMapsUrl) && (
              <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                <h2 className="text-2xl font-light mb-6 text-gray-900 tracking-tight">
                  Localização
                </h2>
                {empreendimento.endereco && (
                  <div className="flex items-start mb-4">
                    <svg className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-700">{empreendimento.endereco}</p>
                  </div>
                )}
                
                {/* Mapa do Google Maps */}
                {empreendimento.endereco && (
                  <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={generateGoogleMapsEmbedUrl(empreendimento.endereco)}
                      title={`Localização - ${empreendimento.nome}`}
                    />
                  </div>
                )}
                
                {/* Link para abrir no Google Maps */}
                <a
                  href={empreendimento.googleMapsUrl || generateGoogleMapsUrl(empreendimento.endereco)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Abrir no Google Maps
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Informações</h2>
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Preço Inicial</p>
                <p className="text-3xl font-light text-gray-900 mb-1">
                  R$ {empreendimento.precoInicial?.toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-gray-500">Consulte condições especiais</p>
              </div>

              <div className="space-y-3">
                <Link
                  to={`/agendar-visita/${empreendimento._id}`}
                  className="w-full bg-primary-600 text-white px-6 py-3.5 rounded-lg font-medium text-center block hover:bg-primary-700 transition-colors duration-200 shadow-md"
                >
                  Tenho Interesse
                </Link>
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-md"
                >
                  Falar no WhatsApp
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center uppercase tracking-wide">
                  <span className="font-medium">C.Ikai</span>
                  <br />
                  Corretora especializada em lançamentos
                  <br />
                  <span className="text-xs">CRECI SP 282.069</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LancamentoDetalhe
