import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../services/api'
import { normalizeImageUrl, handleImageError } from '../utils/imageHelper'
import { generateGoogleMapsEmbedUrl, generateGoogleMapsUrl } from '../utils/mapHelper'
import { generateWhatsAppLink, generateEmpreendimentoMessage } from '../utils/whatsappHelper'
import { getYouTubeEmbedUrl } from '../utils/youtubeHelper'
import { extractImovelIdFromParam, getImovelSlugPath, isMongoId, slugify } from '../utils/slugHelper'
import ImageGallery from '../components/ImageGallery'

function ImovelDetalhe() {
  const { id: slugOrId } = useParams()
  const navigate = useNavigate()
  const [imovel, setImovel] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImovel()
  }, [slugOrId])

  const fetchImovel = async () => {
    try {
      if (isMongoId(slugOrId)) {
        const response = await api.get(`/empreendimentos/${slugOrId}`)
        const data = response.data
        setImovel(data)
        navigate(getImovelSlugPath(data), { replace: true })
        return
      }

      const imovelId = extractImovelIdFromParam(slugOrId)
      if (imovelId) {
        const response = await api.get(`/empreendimentos/${imovelId}`)
        const data = response.data
        setImovel(data)
        navigate(getImovelSlugPath(data), { replace: true })
        return
      }

      const response = await api.get('/empreendimentos')
      const imovelEncontrado = response.data.find((item) => slugify(item?.nome) === slugOrId)

      if (!imovelEncontrado) {
        setImovel(null)
        return
      }

      setImovel(imovelEncontrado)

      const canonicalSlug = getImovelSlugPath(imovelEncontrado).replace('/imoveis/', '')
      if (slugOrId !== canonicalSlug) {
        navigate(getImovelSlugPath(imovelEncontrado), { replace: true })
      }
    } catch (error) {
      console.error('Erro ao carregar imóvel:', error)
      setImovel(null)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsApp = () => {
    const message = generateEmpreendimentoMessage(imovel?.nome || '')
    window.open(generateWhatsAppLink(message), '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-primary-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando imóvel...</p>
        </div>
      </div>
    )
  }

  if (!imovel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Imóvel não encontrado.</p>
          <Link to="/" className="btn-primary">
            Voltar para o Início
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Hero Image */}
      {imovel.imagens && imovel.imagens.length > 0 ? (
        <div className="relative h-[550px] md:h-[650px] overflow-hidden">
          <img
            src={normalizeImageUrl(imovel.imagens[0])}
            alt={imovel.nome}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-800/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-3 tracking-wider">
                IMÓVEL PARA REVENDA
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl">{imovel.nome}</h1>
              <div className="flex items-center text-white/95">
                <svg className="w-6 h-6 mr-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xl font-medium">{imovel.bairro}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center pt-24">
          <span className="text-gray-600 text-xl font-medium">Sem imagem disponível</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-10">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-4 font-medium bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm">
              <Link to="/" className="hover:text-primary-700 transition-colors">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <a href="/#imoveis" className="hover:text-primary-700 transition-colors">Imóveis para Revenda</a>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-800 font-semibold">{imovel.nome}</span>
            </nav>

            {/* Informações (Mobile) */}
            <div className="bg-white rounded-2xl shadow-elegant p-6 border-elegant lg:hidden">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Informações</h2>
              <div className="p-5 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100 shadow-sm">
                <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider font-semibold">Preço</p>
                <p className="text-3xl font-bold text-gray-800 mb-1">Sob Consulta</p>
                <p className="text-sm text-primary-700 font-semibold mt-1">Preços negociáveis</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Entre em contato para mais informações</p>
              </div>
            </div>

            {/* Galeria de Imagens */}
            {imovel.imagens && imovel.imagens.length > 0 && (
              <ImageGallery
                images={imovel.imagens}
                title="Galeria de Fotos"
              />
            )}

            {/* Vídeos Uploadados */}
            {imovel.videos && imovel.videos.length > 0 && (
              <div className="bg-white rounded-2xl shadow-elegant p-10 border-elegant">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
                  {imovel.videos.length === 1 ? 'Vídeo do Imóvel' : 'Vídeos do Imóvel'}
                </h2>
                <div className="space-y-6">
                  {imovel.videos.map((videoUrl, index) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow-md bg-black">
                      <video
                        src={videoUrl}
                        controls
                        preload="metadata"
                        className="w-full max-h-[480px]"
                        style={{ display: 'block' }}
                      >
                        Seu navegador não suporta reprodução de vídeo.
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vídeo do YouTube */}
            {imovel.videoYoutube && getYouTubeEmbedUrl(imovel.videoYoutube) && (
              <div className="bg-white rounded-2xl shadow-elegant p-10 border-elegant">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
                  Vídeo do Imóvel
                </h2>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    src={getYouTubeEmbedUrl(imovel.videoYoutube)}
                    title="Vídeo do Imóvel"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Descrição */}
            <div className="bg-white rounded-2xl shadow-elegant p-10 border-elegant lg:hidden">
              <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
                Sobre o Imóvel
              </h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">{imovel.descricao}</p>
            </div>

            {/* Características */}
            <div className="bg-white rounded-2xl shadow-elegant p-10 border-elegant">
              <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
                Características
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {imovel.metragens && imovel.metragens.length > 0 && (
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 shadow-sm md:col-span-2">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Metragens Disponíveis</p>
                    <div className="flex flex-wrap gap-2">
                      {imovel.metragens.map((metragem, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white text-gray-800 rounded-lg font-bold text-lg border border-gray-300 shadow-sm">
                          {metragem}m²
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {imovel.metragemMin && (!imovel.metragens || imovel.metragens.length === 0) && (
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Área Mínima</p>
                    <p className="text-3xl font-bold text-gray-800">{imovel.metragemMin}m²</p>
                  </div>
                )}
                {imovel.metragemMax && (!imovel.metragens || imovel.metragens.length === 0) && (
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Área Máxima</p>
                    <p className="text-3xl font-bold text-gray-800">{imovel.metragemMax}m²</p>
                  </div>
                )}
                {imovel.dormitorios && (
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Dormitórios</p>
                    <p className="text-3xl font-bold text-gray-800">{imovel.dormitorios}</p>
                  </div>
                )}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm">
                  <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Suítes</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {imovel.suites && imovel.suites > 0
                      ? imovel.suites
                      : 'Não possui'}
                  </p>
                </div>
                {imovel.vagasCarro && (
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Vagas de Carro</p>
                    <p className="text-3xl font-bold text-gray-800">{imovel.vagasCarro}</p>
                  </div>
                )}
                {imovel.vagasMoto && (
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Vagas de Moto</p>
                    <p className="text-3xl font-bold text-gray-800">{imovel.vagasMoto}</p>
                  </div>
                )}
                {imovel.vagas && !imovel.vagasCarro && (
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Vagas</p>
                    <p className="text-3xl font-bold text-gray-800">{imovel.vagas}</p>
                  </div>
                )}
                {imovel.construtora && (
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm">
                    <p className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-semibold">Construtora</p>
                    <p className="text-xl font-bold text-gray-800">{imovel.construtora}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Áreas de Lazer */}
            {imovel.areasLazer && imovel.areasLazer.length > 0 && (
              <div className="bg-white rounded-2xl shadow-elegant p-10 border-elegant lg:hidden">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
                  Áreas de Lazer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {imovel.areasLazer.map((area, index) => (
                    <div key={index} className="flex items-center p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm">
                      <svg className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Google Maps */}
            {(imovel.endereco || imovel.googleMapsUrl) && (
              <div className="bg-white rounded-2xl shadow-elegant p-10 border-elegant">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
                  Localização
                </h2>
                {imovel.endereco && (
                  <div className="flex items-start mb-6 p-5 bg-gray-50/50 rounded-xl border border-gray-200/50">
                    <svg className="w-6 h-6 text-primary-600 mr-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-700 font-medium text-base">{imovel.endereco}</p>
                  </div>
                )}

                {imovel.endereco && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                    <iframe
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={generateGoogleMapsEmbedUrl(imovel.endereco)}
                      title={`Localização - ${imovel.nome}`}
                    />
                  </div>
                )}

                <a
                  href={imovel.googleMapsUrl || generateGoogleMapsUrl(imovel.endereco)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-700 hover:text-primary-900 font-semibold group transition-colors"
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
            <div className="bg-white rounded-2xl shadow-elegant-lg p-8 sticky top-28 border-elegant">
              <h2 className="hidden lg:block text-2xl font-bold mb-6 text-gray-800">Informações</h2>
              <div className="hidden lg:block mb-8 p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100 shadow-sm">
                <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider font-semibold">Preço</p>
                <p className="text-3xl font-bold text-gray-800 mb-1">
                  Sob Consulta
                </p>
                <p className="text-sm text-primary-700 font-semibold mt-1">Preços negociáveis</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Entre em contato para mais informações</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-500/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Tenho Interesse
                </button>
                <Link
                  to={`/agendar-visita/${imovel._id}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-primary-200 text-primary-700 rounded-xl font-bold hover:border-primary-400 hover:bg-primary-50 transition-all duration-300"
                >
                  Agendar Visita
                </Link>
                <Link
                  to="/como-comprar"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Como Comprar
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200/60">
                <p className="text-xs text-gray-600 text-center uppercase tracking-wider">
                  <span className="font-bold text-gray-800">C.Ikai Corretora</span>
                  <br />
                  <span className="font-medium">Especialista em Revenda de Imóveis</span>
                  <br />
                  <span className="text-xs text-primary-600 font-semibold">CRECI SP 282.069</span>
                </p>
              </div>

              {/* Resumo do imóvel - Desktop */}
              <div className="hidden lg:block mt-8 pt-6 border-t border-gray-200/60">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Características do Imóvel</h3>
                <div className="grid grid-cols-2 gap-3">
                  {imovel.metragens && imovel.metragens.length > 0 ? (
                    <div className="col-span-2 p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Metragens</p>
                      <div className="flex flex-wrap gap-2">
                        {imovel.metragens.map((metragem, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-sm font-semibold text-gray-800">
                            {metragem}m²
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {imovel.metragemMin && (
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                          <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Área Mín.</p>
                          <p className="text-xl font-bold text-gray-800">{imovel.metragemMin}m²</p>
                        </div>
                      )}
                      {imovel.metragemMax && (
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                          <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Área Máx.</p>
                          <p className="text-xl font-bold text-gray-800">{imovel.metragemMax}m²</p>
                        </div>
                      )}
                    </>
                  )}

                  {imovel.dormitorios && (
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Dormitórios</p>
                      <p className="text-xl font-bold text-gray-800">{imovel.dormitorios}</p>
                    </div>
                  )}
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Suítes</p>
                    <p className="text-xl font-bold text-gray-800">{imovel.suites && imovel.suites > 0 ? imovel.suites : '0'}</p>
                  </div>
                  {imovel.vagasCarro && (
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Vagas Carro</p>
                      <p className="text-xl font-bold text-gray-800">{imovel.vagasCarro}</p>
                    </div>
                  )}
                  {imovel.vagasMoto && (
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Vagas Moto</p>
                      <p className="text-xl font-bold text-gray-800">{imovel.vagasMoto}</p>
                    </div>
                  )}
                  {imovel.vagas && !imovel.vagasCarro && (
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Vagas</p>
                      <p className="text-xl font-bold text-gray-800">{imovel.vagas}</p>
                    </div>
                  )}
                </div>
              </div>

              {imovel.areasLazer && imovel.areasLazer.length > 0 && (
                <div className="hidden lg:block mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Áreas de Lazer</h3>
                  <div className="space-y-2.5">
                    {imovel.areasLazer.map((area, index) => (
                      <div key={index} className="flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <svg className="w-4 h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700 font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImovelDetalhe
