import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import { normalizeImageUrl, handleImageError } from '../utils/imageHelper'
import { generateWhatsAppLink, generateContatoMessage, generateEmpreendimentoMessage } from '../utils/whatsappHelper'
import bannerImage from '../imgs/banner2.jpg'
import celiaPhoto from '../imgs/celia.png'

function Home() {
  const [imoveis, setImoveis] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await api.get('/empreendimentos')
        setImoveis(response.data)
      } catch (error) {
        console.error('Erro ao carregar imóveis:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchImoveis()
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[65vh] md:min-h-[70vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0">
          <img
            src={bannerImage}
            alt="Banner C.Ikai"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-5 md:space-y-7">
            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-xs md:text-sm font-semibold border border-white/30">
              CRECI SP 282.069
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
              <span className="block">Encontre o Imóvel</span>
              <span className="block mt-1 md:mt-2 bg-gradient-to-r from-primary-300 to-primary-200 bg-clip-text text-transparent">
                Perfeito para Você
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto px-2">
              Especialistas em <span className="font-bold text-primary-300">revenda de apartamentos</span> nas melhores regiões de{' '}
              <span className="font-bold text-primary-300">São Paulo e ABC</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href="#imoveis"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 text-white rounded-xl font-bold text-base shadow-2xl hover:bg-primary-700 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Ver Imóveis Disponíveis
              </a>
              <a
                href={generateWhatsAppLink(generateContatoMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold text-base border border-white/40 hover:bg-white/30 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Falar no WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6 md:pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5">500+</div>
                <div className="text-xs md:text-sm text-white/80 font-medium">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5">50+</div>
                <div className="text-xs md:text-sm text-white/80 font-medium">Famílias Atendidas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5">5+</div>
                <div className="text-xs md:text-sm text-white/80 font-medium">Anos de Experiência</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={celiaPhoto}
                  alt="Célia Ikai - Corretora de Imóveis"
                  className="w-full h-[420px] md:h-[520px] object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white font-bold text-lg">Célia Ikai</p>
                  <p className="text-white/80 text-sm">Corretora de Imóveis · CRECI SP 282.069</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-600 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <p className="text-2xl font-extrabold leading-none">5+</p>
                  <p className="text-xs font-semibold leading-tight">anos de<br/>experiência</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                Sobre Nós
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                C.Ikai
                <span className="block text-primary-600 mt-2">Corretora de Imóveis</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Com mais de <strong className="text-primary-700">5 anos de experiência</strong> no mercado imobiliário,
                a C.Ikai construiu sua trajetória atuando com lançamentos imobiliários em{' '}
                <strong className="text-primary-700">São Paulo e ABC</strong> e, ampliando sua expertise,
                hoje é especialista em <strong className="text-primary-700">revenda de apartamentos</strong>.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Realizamos uma pesquisa detalhada do imóvel que atenda às suas necessidades dentro da sua realidade financeira.
                Já ajudamos <strong className="text-primary-700">mais de 100 clientes</strong> e{' '}
                <strong className="text-primary-700">30+ famílias</strong> a conquistar o imóvel dos sonhos.
                Atendimento personalizado, transparente e comprometido com a excelência.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-lg">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-primary-700">São Paulo e ABC</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-lg">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm font-semibold text-primary-700">CRECI SP 282.069</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Imóveis Disponíveis */}
      <section id="imoveis" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-100 text-primary-700 rounded-full text-sm font-bold mb-5 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Imóveis Disponíveis
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Apartamentos para Revenda
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Confira todos os imóveis disponíveis e entre em contato para agendar sua visita
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-primary-600"></div>
              <p className="text-gray-600 mt-6 font-medium">Carregando imóveis...</p>
            </div>
          ) : imoveis.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {imoveis.map((imovel) => (
                <div
                  key={imovel._id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
                >
                  <Link to={`/imoveis/${imovel._id}`}>
                    <div className="relative h-64 overflow-hidden">
                      {imovel.imagens && imovel.imagens.length > 0 ? (
                        <>
                          <img
                            src={normalizeImageUrl(imovel.imagens[0])}
                            alt={imovel.nome}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-lg font-medium">Sem imagem</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <div className="bg-primary-600 text-white px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                          <span className="text-xs font-bold tracking-wide">REVENDA</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg group-hover:text-gray-200 transition-colors line-clamp-1">
                          {imovel.nome}
                        </h3>
                        <div className="flex items-center text-white/90 text-sm font-medium">
                          <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {imovel.bairro}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="p-5">
                    {/* Características */}
                    {(imovel.dormitorios || imovel.metragens?.length > 0 || imovel.metragemMin) && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {imovel.dormitorios && (
                          <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md font-semibold border border-primary-200">
                            {imovel.dormitorios} {imovel.dormitorios === 1 ? 'quarto' : 'quartos'}
                          </span>
                        )}
                        {imovel.suites > 0 && (
                          <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md font-semibold border border-primary-200">
                            {imovel.suites} {imovel.suites === 1 ? 'suíte' : 'suítes'}
                          </span>
                        )}
                        {imovel.metragens && imovel.metragens.length > 0 && (
                          imovel.metragens.map((m, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md font-semibold border border-gray-200">
                              {m}m²
                            </span>
                          ))
                        )}
                        {imovel.vagasCarro > 0 && (
                          <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md font-semibold border border-primary-200">
                            {imovel.vagasCarro} {imovel.vagasCarro === 1 ? 'vaga' : 'vagas'}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-0.5">Preço</p>
                        <p className="text-xl font-extrabold text-primary-700">Sob Consulta</p>
                        <p className="text-xs text-primary-600 font-medium">Preços negociáveis</p>
                      </div>
                      <Link
                        to={`/imoveis/${imovel._id}`}
                        className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-xl hover:bg-primary-200 transition-colors group-hover:scale-110 duration-300"
                      >
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>

                    <div className="space-y-2.5">
                      <a
                        href={generateWhatsAppLink(generateEmpreendimentoMessage(imovel.nome))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-500/20"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Tenho Interesse
                      </a>
                      <Link
                        to={`/imoveis/${imovel._id}`}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-primary-200 text-primary-700 rounded-xl font-semibold text-sm hover:border-primary-400 hover:bg-primary-50 transition-all duration-300"
                      >
                        Ver Detalhes do Imóvel
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p className="text-gray-600 text-lg font-medium">Nenhum imóvel disponível no momento.</p>
              <p className="text-gray-500 text-sm mt-2">Entre em contato pelo WhatsApp para mais informações.</p>
            </div>
          )}
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Por Que Escolher a C.Ikai
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nossos Diferenciais
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Transparência Total',
                description: 'Imóveis selecionados com rigor. Todas as informações apresentadas de forma clara e objetiva, sem surpresas.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Atendimento Personalizado',
                description: 'Acompanhamento dedicado em cada etapa do processo. Mais de 500 clientes satisfeitos com nosso atendimento.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Melhores Localizações',
                description: 'Imóveis de revenda nas regiões mais valorizadas de São Paulo e ABC. Excelente custo-benefício para sua família.'
              }
            ].map((item, index) => (
              <div key={index} className="group p-8 bg-gradient-to-br from-white to-primary-50/50 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-500/30">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para encontrar seu novo lar?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Entre em contato agora mesmo. Atendimento especializado em revenda de apartamentos em São Paulo e ABC.
          </p>
          <a
            href={generateWhatsAppLink(generateContatoMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
