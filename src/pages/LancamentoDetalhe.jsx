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
    <div className="min-h-screen bg-luxury-cream">
      {/* Hero Image */}
      {empreendimento.imagens && empreendimento.imagens.length > 0 ? (
        <div className="relative h-[550px] md:h-[650px] overflow-hidden">
          <img
            src={normalizeImageUrl(empreendimento.imagens[0])}
            alt={empreendimento.nome}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/80 via-primary-800/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl">{empreendimento.nome}</h1>
            <div className="flex items-center text-white/95">
              <svg className="w-6 h-6 mr-3 text-accent-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-2xl font-medium">{empreendimento.bairro}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[550px] bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
          <span className="text-primary-600 text-xl font-medium">Sem imagem</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-10">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-4 font-medium">
              <Link to="/" className="hover:text-primary-700 transition-colors">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link to="/lancamentos" className="hover:text-primary-700 transition-colors">Lançamentos</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-primary-800 font-semibold">{empreendimento.nome}</span>
            </nav>

            {/* Galeria de Imagens */}
            {empreendimento.imagens && empreendimento.imagens.length > 0 && (
              <ImageGallery 
                images={empreendimento.imagens} 
                title="Galeria de Fotos"
              />
            )}

            {/* Descrição */}
            <div className="bg-white rounded-2xl shadow-elegant p-10 border-elegant">
              <h2 className="text-3xl font-bold mb-8 text-primary-800 tracking-tight">
                Sobre o Empreendimento
              </h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">{empreendimento.descricao}</p>
            </div>

            {/* Características */}
            <div className="bg-white rounded-2xl shadow-elegant p-10 border-elegant">
              <h2 className="text-3xl font-bold mb-8 text-primary-800 tracking-tight">
                Características
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* Metragens Disponíveis */}
                {empreendimento.metragens && empreendimento.metragens.length > 0 && (
                  <div className="p-6 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl border border-accent-200/50 shadow-sm md:col-span-2">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Metragens Disponíveis</p>
                    <div className="flex flex-wrap gap-2">
                      {empreendimento.metragens.map((metragem, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white text-accent-800 rounded-lg font-bold text-lg border border-accent-300 shadow-sm">
                          {metragem}m²
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {empreendimento.metragemMin && (!empreendimento.metragens || empreendimento.metragens.length === 0) && (
                  <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Área Mínima</p>
                    <p className="text-3xl font-bold text-primary-800">{empreendimento.metragemMin}m²</p>
                  </div>
                )}
                {empreendimento.metragemMax && (!empreendimento.metragens || empreendimento.metragens.length === 0) && (
                  <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Área Máxima</p>
                    <p className="text-3xl font-bold text-primary-800">{empreendimento.metragemMax}m²</p>
                  </div>
                )}
                {empreendimento.dormitorios && (
                  <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Dormitórios</p>
                    <p className="text-3xl font-bold text-primary-800">{empreendimento.dormitorios}</p>
                  </div>
                )}
                <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-200/50 shadow-sm">
                  <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Suítes</p>
                  <p className="text-3xl font-bold text-primary-800">
                    {empreendimento.suites && empreendimento.suites > 0 
                      ? empreendimento.suites 
                      : 'Não possui'}
                  </p>
                </div>
                {empreendimento.vagasCarro && (
                  <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Vagas de Carro</p>
                    <p className="text-3xl font-bold text-primary-800">{empreendimento.vagasCarro}</p>
                  </div>
                )}
                {empreendimento.vagasMoto && (
                  <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Vagas de Moto</p>
                    <p className="text-3xl font-bold text-primary-800">{empreendimento.vagasMoto}</p>
                  </div>
                )}
                {empreendimento.vagas && !empreendimento.vagasCarro && (
                  <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Vagas</p>
                    <p className="text-3xl font-bold text-primary-800">{empreendimento.vagas}</p>
                  </div>
                )}
                {empreendimento.construtora && (
                  <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Construtora</p>
                    <p className="text-xl font-bold text-primary-800">{empreendimento.construtora}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Áreas de Lazer */}
            {empreendimento.areasLazer && empreendimento.areasLazer.length > 0 && (
              <div className="bg-white rounded-2xl shadow-elegant p-10 border-elegant">
                <h2 className="text-3xl font-bold mb-8 text-primary-800 tracking-tight">
                  Áreas de Lazer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {empreendimento.areasLazer.map((area, index) => (
                    <div key={index} className="flex items-center p-5 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-200/50 shadow-sm">
                      <svg className="w-5 h-5 text-accent-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Google Maps */}
            {(empreendimento.endereco || empreendimento.googleMapsUrl) && (
              <div className="bg-white rounded-2xl shadow-elegant p-10 border-elegant">
                <h2 className="text-3xl font-bold mb-8 text-primary-800 tracking-tight">
                  Localização
                </h2>
                {empreendimento.endereco && (
                  <div className="flex items-start mb-6 p-5 bg-primary-50/50 rounded-xl border border-primary-200/50">
                    <svg className="w-6 h-6 text-accent-500 mr-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-700 font-medium text-base">{empreendimento.endereco}</p>
                  </div>
                )}
                
                {/* Mapa do Google Maps */}
                {empreendimento.endereco && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
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
                  className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold group transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Abrir no Google Maps
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-elegant-lg p-10 sticky top-28 border-elegant">
              <h2 className="text-3xl font-bold mb-8 text-primary-800">Informações</h2>
              <div className="mb-10 p-8 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-200/50 shadow-sm">
                <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Preço Inicial</p>
                <p className="text-4xl font-bold text-primary-800 mb-2">
                  R$ {empreendimento.precoInicial?.toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-gray-600 font-medium">Consulte condições especiais</p>
              </div>

              <div className="space-y-4">
                <Link
                  to={`/agendar-visita/${empreendimento._id}`}
                  className="w-full btn-primary text-center block"
                >
                  Tenho Interesse
                </Link>
                <button
                  onClick={handleWhatsApp}
                  className="w-full btn-luxury"
                >
                  Falar no WhatsApp
                </button>
              </div>
              
              <div className="mt-10 pt-8 border-t border-gray-200/60">
                <p className="text-xs text-gray-600 text-center uppercase tracking-wider">
                  <span className="font-bold text-primary-800">C.Ikai</span>
                  <br />
                  <span className="font-medium">Corretora especializada em lançamentos</span>
                  <br />
                  <span className="text-xs text-accent-500 font-semibold">CRECI SP 282.069</span>
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
