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
    <div>
      {/* Hero Section com Banner */}
      <section className="relative h-[650px] md:h-[750px] lg:h-[850px] overflow-hidden">
        {/* Imagem de Fundo */}
        <div className="absolute inset-0">
          <img 
            src={bannerImage} 
            alt="Banner C.Ikai" 
            className="w-full h-full object-cover scale-105 transition-transform duration-[20s] ease-out"
          />
          {/* Overlay elegante para melhorar legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/90 via-primary-900/85 to-primary-800/80"></div>
          {/* Overlay adicional para profundidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          {/* Overlay sutil com cor primária */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-transparent"></div>
        </div>
        
        {/* Conteúdo */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-white drop-shadow-2xl">
                Parcelas Menores que o
                <span className="block mt-3 text-accent-400">Seu Aluguel</span>
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl mb-5 text-white font-medium leading-tight drop-shadow-lg">
                No apartamento dos seus sonhos
              </p>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/95 leading-relaxed font-medium">
                Nas melhores regiões de <span className="text-accent-400 font-bold">São Paulo e ABC</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link 
                  to="/lancamentos" 
                  className="btn-luxury text-lg px-12 py-5 inline-block text-center"
                >
                  Ver Lançamentos Agora →
                </Link>
              </div>
              <p className="mt-8 text-white/90 text-base md:text-lg flex flex-wrap gap-4 items-center">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Mais de 500 clientes atendidos
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  50+ famílias ajudadas
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  5+ anos de experiência
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre C.Ikai */}
      <section className="section-padding bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary-800 tracking-tight">
                C.Ikai
              </h2>
              <p className="text-xl text-primary-700 mb-3 font-medium">Corretora Especializada em Lançamentos</p>
              <p className="text-sm text-accent-600 mb-8 font-semibold tracking-wide uppercase">CRECI SP 282.069</p>
              <div className="space-y-5 text-gray-700 leading-relaxed mb-10 text-base">
                <p>
                  Com mais de <strong className="text-primary-800">5 anos de experiência</strong> no mercado imobiliário, especializada em lançamentos de alto padrão em <strong className="text-primary-800">São Paulo e ABC</strong>, nos melhores bairros.
                </p>
                <p>
                  Já atendemos <strong className="text-primary-800">mais de 500 clientes</strong> e ajudamos <strong className="text-primary-800">50+ famílias</strong> a encontrar o imóvel dos sonhos. 
                  Atendimento personalizado, transparente e comprometido com a excelência.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-300/60">
                <div>
                  <div className="text-4xl font-bold text-primary-800 mb-2">5+</div>
                  <div className="text-sm text-gray-600 font-medium">Anos de Experiência</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary-800 mb-2">500+</div>
                  <div className="text-sm text-gray-600 font-medium">Clientes Atendidos</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary-800 mb-2">50+</div>
                  <div className="text-sm text-gray-600 font-medium">Famílias Ajudadas</div>
                </div>
              </div>
              <div className="mt-10">
                <div className="flex items-center text-primary-700 bg-primary-50/50 px-5 py-3 rounded-lg border border-primary-200/50 w-fit">
                  <svg className="w-5 h-5 mr-3 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-semibold">São Paulo e ABC - Melhores Bairros</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl overflow-hidden border-elegant shadow-elegant-lg">
                <div className="h-[550px]">
                  <ImageCarousel 
                    images={[cliente1, cliente2, cliente3]} 
                    autoPlay={true}
                    interval={4000}
                  />
                </div>
                <div className="p-6 bg-gradient-to-r from-primary-50 to-white border-t border-gray-200/60">
                  <p className="text-center text-sm text-primary-700 font-semibold">
                    Alguns dos nossos clientes atendidos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary-800 tracking-tight">
              Lançamentos em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Descubra os melhores empreendimentos selecionados especialmente para você
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-14 w-14 border-3 border-primary-200 border-t-primary-700"></div>
              <p className="text-gray-600 mt-6 font-medium">Carregando lançamentos...</p>
            </div>
          ) : destaques.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {destaques.map((empreendimento) => (
                <Link
                  key={empreendimento._id}
                  to={`/lancamentos/${empreendimento._id}`}
                  className="group bg-white rounded-2xl shadow-elegant overflow-hidden hover:shadow-elegant-lg transition-all duration-300 border-elegant card-hover"
                >
                  <div className="relative overflow-hidden">
                    {empreendimento.imagens && empreendimento.imagens.length > 0 ? (
                      <img
                        src={normalizeImageUrl(empreendimento.imagens[0])}
                        alt={empreendimento.nome}
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-full h-72 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <span className="text-primary-400 text-lg font-medium">Sem imagem</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-elegant">
                      <span className="text-xs font-semibold text-primary-700">Destaque</span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold mb-3 text-primary-800 group-hover:text-primary-700 transition-colors">
                      {empreendimento.nome}
                    </h3>
                    <div className="flex items-center text-primary-600 mb-5 text-sm font-medium">
                      <svg className="w-4 h-4 mr-2 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{empreendimento.bairro}</span>
                    </div>
                    <div className="pt-5 border-t border-gray-200/60">
                      <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">A partir de</p>
                      <p className="text-3xl font-bold text-primary-800">
                        R$ {empreendimento.precoInicial?.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-elegant border-elegant">
              <p className="text-gray-600 text-lg font-medium">Nenhum lançamento disponível no momento.</p>
            </div>
          )}

          <div className="text-center">
            <Link 
              to="/lancamentos" 
              className="btn-primary inline-block"
            >
              Ver Todos os Lançamentos
            </Link>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="section-padding bg-gradient-to-br from-luxury-dark via-primary-900 to-luxury-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold mb-4 tracking-tight text-accent-400">5+</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider font-semibold">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold mb-4 tracking-tight text-accent-400">500+</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider font-semibold">Clientes Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold mb-4 tracking-tight text-accent-400">50+</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider font-semibold">Famílias Ajudadas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="section-padding bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary-800 tracking-tight">
              Por Que Escolher a C.Ikai?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-10 bg-white border-elegant rounded-2xl hover:shadow-elegant-lg transition-all duration-300 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
                <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-800">Transparência Total</h3>
              <p className="text-gray-600 leading-relaxed">Empreendimentos selecionados com rigor. Todas as informações de forma clara e objetiva.</p>
            </div>
            <div className="text-center p-10 bg-white border-elegant rounded-2xl hover:shadow-elegant-lg transition-all duration-300 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
                <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-800">Atendimento Personalizado</h3>
              <p className="text-gray-600 leading-relaxed">Acompanhamento dedicado em cada etapa. Mais de 500 clientes satisfeitos.</p>
            </div>
            <div className="text-center p-10 bg-white border-elegant rounded-2xl hover:shadow-elegant-lg transition-all duration-300 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
                <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-800">Melhores Localizações</h3>
              <p className="text-gray-600 leading-relaxed">São Paulo e ABC. Lançamentos nos bairros mais valorizados da região.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary-800 tracking-tight">
              Como Funciona
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-700 to-primary-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-luxury group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-800">Explore</h3>
              <p className="text-gray-600 leading-relaxed">
                Navegue pelos lançamentos e encontre opções que se encaixam no seu perfil
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-700 to-primary-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-luxury group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-800">Agende</h3>
              <p className="text-gray-600 leading-relaxed">
                Entre em contato e agende uma visita para conhecer o empreendimento
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-700 to-primary-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-luxury group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-800">Analise</h3>
              <p className="text-gray-600 leading-relaxed">
                Receba todas as informações e tire todas as suas dúvidas
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-700 to-primary-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-luxury group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-800">Realize</h3>
              <p className="text-gray-600 leading-relaxed">
                Feche o negócio com segurança e comece a planejar sua mudança
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-luxury-dark via-primary-900 to-luxury-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            Pronto para encontrar seu novo lar?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Entre em contato e agende uma visita. Mais de 500 clientes atendidos e 50+ famílias ajudadas em São Paulo e ABC.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a 
              href={generateWhatsAppLink(generateContatoMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury text-lg px-12 py-5 inline-block text-center"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
