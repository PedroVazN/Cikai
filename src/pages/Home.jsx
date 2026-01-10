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
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        {/* Imagem de Fundo */}
        <div className="absolute inset-0">
          <img 
            src={bannerImage} 
            alt="Banner C.Ikai" 
            className="w-full h-full object-cover"
          />
          {/* Overlay elegante para melhorar legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/50"></div>
          {/* Overlay adicional para profundidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
        
        {/* Conteúdo */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="mb-6">
                <span className="inline-block bg-primary-600/90 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold mb-4 shadow-lg">
                  ✨ Oportunidade Única
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
                Parcelas Menores que o
                <span className="block mt-2 text-primary-300">Seu Aluguel</span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-white font-semibold leading-relaxed">
                No apartamento dos seus sonhos
              </p>
              <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed font-medium">
                Nas melhores regiões de <span className="text-primary-300 font-bold">São Paulo e ABC</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/lancamentos" 
                  className="bg-primary-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition-all duration-200 inline-block text-center shadow-2xl transform hover:scale-105"
                >
                  Ver Lançamentos Agora →
                </Link>
              </div>
              <p className="mt-6 text-white/80 text-sm md:text-base">
                ✓ Mais de 500 clientes atendidos ✓ 50+ famílias ajudadas ✓ 5+ anos de experiência
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre C.Ikai */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900 tracking-tight">
                C.Ikai
              </h2>
              <p className="text-lg text-gray-600 mb-2">Corretora Especializada em Lançamentos</p>
              <p className="text-sm text-gray-500 mb-4">CRECI SP 282.069</p>
              <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>
                  Com mais de <strong>5 anos de experiência</strong> no mercado imobiliário, especializada em lançamentos de alto padrão em <strong>São Paulo e ABC</strong>, nos melhores bairros.
                </p>
                <p>
                  Já atendemos <strong>mais de 500 clientes</strong> e ajudamos <strong>50+ famílias</strong> a encontrar o imóvel dos sonhos. 
                  Atendimento personalizado, transparente e comprometido com a excelência.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-light text-gray-900 mb-1">5+</div>
                  <div className="text-sm text-gray-600">Anos de Experiência</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-gray-900 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Clientes Atendidos</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-gray-900 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Famílias Ajudadas</div>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">São Paulo e ABC - Melhores Bairros</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                <div className="h-[500px]">
                  <ImageCarousel 
                    images={[cliente1, cliente2, cliente3]} 
                    autoPlay={true}
                    interval={4000}
                  />
                </div>
                <div className="p-4 bg-white border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600 font-medium">
                    Alguns dos nossos clientes atendidos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900 tracking-tight">
              Lançamentos em Destaque
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Descubra os melhores empreendimentos selecionados especialmente para você
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="text-gray-600 mt-4">Carregando lançamentos...</p>
            </div>
          ) : destaques.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {destaques.map((empreendimento) => (
                <Link
                  key={empreendimento._id}
                  to={`/lancamentos/${empreendimento._id}`}
                  className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-200"
                >
                  <div className="relative overflow-hidden">
                    {empreendimento.imagens && empreendimento.imagens.length > 0 ? (
                      <img
                        src={normalizeImageUrl(empreendimento.imagens[0])}
                        alt={empreendimento.nome}
                        className="w-full h-64 object-cover"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">Sem imagem</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2 text-gray-900">
                      {empreendimento.nome}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{empreendimento.bairro}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">A partir de</p>
                      <p className="text-2xl font-light text-gray-900">
                        R$ {empreendimento.precoInicial?.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-600 text-lg">Nenhum lançamento disponível no momento.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/lancamentos" 
              className="inline-block bg-primary-600 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              Ver Todos os Lançamentos
            </Link>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-light mb-3 tracking-tight">5+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-light mb-3 tracking-tight">500+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Clientes Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-light mb-3 tracking-tight">50+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Famílias Ajudadas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900 tracking-tight">
              Por Que Escolher a C.Ikai?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Transparência Total</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Empreendimentos selecionados com rigor. Todas as informações de forma clara e objetiva.</p>
            </div>
            <div className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Atendimento Personalizado</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Acompanhamento dedicado em cada etapa. Mais de 500 clientes satisfeitos.</p>
            </div>
            <div className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Melhores Localizações</h3>
              <p className="text-gray-600 text-sm leading-relaxed">São Paulo e ABC. Lançamentos nos bairros mais valorizados da região.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900 tracking-tight">
              Como Funciona
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                1
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Explore</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Navegue pelos lançamentos e encontre opções que se encaixam no seu perfil
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                2
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Agende</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Entre em contato e agende uma visita para conhecer o empreendimento
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                3
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Analise</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Receba todas as informações e tire todas as suas dúvidas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-light">
                4
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Realize</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Feche o negócio com segurança e comece a planejar sua mudança
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Pronto para encontrar seu novo lar?
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Entre em contato e agende uma visita. Mais de 500 clientes atendidos e 50+ famílias ajudadas em São Paulo e ABC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={generateWhatsAppLink(generateContatoMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-8 py-3.5 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 inline-block text-center"
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
