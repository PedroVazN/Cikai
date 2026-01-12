import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import { normalizeImageUrl, handleImageError } from '../utils/imageHelper'
import { generateWhatsAppLink, generateContatoMessage } from '../utils/whatsappHelper'
import bannerImage from '../imgs/banner2.jpg'
import ImageCarousel from '../components/ImageCarousel'
import cliente1 from '../imgs/1.png'
import cliente2 from '../imgs/2.png'
import cliente3 from '../imgs/3.png'

function Home() {
  const [destaques, setDestaques] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDestaques = async () => {
      try {
        const response = await api.get('/empreendimentos?destaque=true&limit=3')
        setDestaques(response.data)
      } catch (error) {
        console.error('Erro ao carregar destaques:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDestaques()
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero Section Moderno */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Conteúdo */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                CRECI SP 282.069
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                <span className="block text-gray-900">Parcelas Menores</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 mt-2">
                  que o Seu Aluguel
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                No apartamento dos seus sonhos, nas melhores regiões de <span className="font-bold text-primary-700">São Paulo e ABC</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/lancamentos" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Ver Lançamentos
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <a
                  href={generateWhatsAppLink(generateContatoMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-primary-700 border-2 border-primary-200 rounded-xl font-semibold text-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
                >
                  Falar no WhatsApp
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-1">500+</div>
                  <div className="text-sm text-gray-600 font-medium">Clientes</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-1">50+</div>
                  <div className="text-sm text-gray-600 font-medium">Famílias</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-1">5+</div>
                  <div className="text-sm text-gray-600 font-medium">Anos</div>
                </div>
              </div>
            </div>

            {/* Imagem Hero */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={bannerImage} 
                  alt="Banner C.Ikai" 
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-400 rounded-2xl opacity-20 blur-2xl"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre - Design Moderno */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-4 md:p-8 overflow-hidden">
                <div className="h-[400px] md:h-[500px]">
                  <ImageCarousel 
                    images={[cliente1, cliente2, cliente3]} 
                    autoPlay={true}
                    interval={4000}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                Sobre Nós
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                C.Ikai
                <span className="block text-primary-600 mt-2">Corretora Especializada</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Com mais de <strong className="text-primary-700">5 anos de experiência</strong> no mercado imobiliário, 
                especializada em lançamentos de alto padrão em <strong className="text-primary-700">São Paulo e ABC</strong>.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Já atendemos <strong className="text-primary-700">mais de 500 clientes</strong> e ajudamos 
                <strong className="text-primary-700"> 50+ famílias</strong> a encontrar o imóvel dos sonhos. 
                Atendimento personalizado, transparente e comprometido com a excelência.
              </p>

              <div className="flex items-center gap-3 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-lg">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-primary-700">São Paulo e ABC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques - Cards Modernos */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Lançamentos
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Empreendimentos em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra os melhores lançamentos selecionados especialmente para você
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-primary-200 border-t-primary-600"></div>
              <p className="text-gray-600 mt-6 font-medium">Carregando lançamentos...</p>
            </div>
          ) : destaques.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destaques.map((empreendimento) => (
                <Link
                  key={empreendimento._id}
                  to={`/lancamentos/${empreendimento._id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    {empreendimento.imagens && empreendimento.imagens.length > 0 ? (
                      <img
                        src={normalizeImageUrl(empreendimento.imagens[0])}
                        alt={empreendimento.nome}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <span className="text-primary-400 text-lg font-medium">Sem imagem</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <span className="text-xs font-bold text-primary-700">Destaque</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                        {empreendimento.nome}
                      </h3>
                      <div className="flex items-center text-primary-600 text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {empreendimento.bairro}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">A partir de</p>
                      <p className="text-2xl font-bold text-primary-700">
                        R$ {empreendimento.precoInicial?.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-600 text-lg font-medium">Nenhum lançamento disponível no momento.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/lancamentos" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-primary-200 text-primary-700 rounded-xl font-semibold text-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
            >
              Ver Todos os Lançamentos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Diferenciais - Grid Moderno */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Por Que Escolher
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
                description: 'Empreendimentos selecionados com rigor. Todas as informações de forma clara e objetiva.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Atendimento Personalizado',
                description: 'Acompanhamento dedicado em cada etapa. Mais de 500 clientes satisfeitos.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Melhores Localizações',
                description: 'São Paulo e ABC. Lançamentos nos bairros mais valorizados da região.'
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
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
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
            Entre em contato e agende uma visita. Mais de 500 clientes atendidos e 50+ famílias ajudadas.
          </p>
          <a
            href={generateWhatsAppLink(generateContatoMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
