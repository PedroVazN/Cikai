import { Link } from 'react-router-dom'
import { generateWhatsAppLink, generateContatoMessage } from '../utils/whatsappHelper'

function ComoComprar() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-28 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Financiamento
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Como Comprar Seu Imóvel
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Entrada facilitada e condições especiais para realizar o sonho da casa própria
          </p>
        </div>

        {/* Entrada Facilitada */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 md:p-12 shadow-elegant border border-primary-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Entrada Facilitada</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Entrada a partir de 5%</h3>
                    <p className="text-gray-600 text-sm">Condições especiais com entrada reduzida</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Parcelamento da Entrada</h3>
                    <p className="text-gray-600 text-sm">Possibilidade de parcelar a entrada em até 12x</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">FGTS na Entrada</h3>
                    <p className="text-gray-600 text-sm">Use seu FGTS para compor a entrada</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Subsídio do Governo</h3>
                    <p className="text-gray-600 text-sm">Acesso a programas habitacionais com subsídio</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Taxas Reduzidas</h3>
                    <p className="text-gray-600 text-sm">Juros reduzidos em programas habitacionais</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Aprovação Rápida</h3>
                    <p className="text-gray-600 text-sm">Processo simplificado e ágil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Programas Habitacionais */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Programas Habitacionais 2026
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conheça os programas disponíveis e seus benefícios exclusivos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* HIS1 - Habitação de Interesse Social Faixa 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-elegant border border-gray-100 hover:shadow-elegant-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  HIS1
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Habitação de Interesse Social - Faixa 1</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm font-semibold text-primary-700 mb-1">Teto de Renda Familiar (2026)</p>
                  <p className="text-2xl font-bold text-primary-800">Até R$ 2.400,00</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm"><strong>Subsídio de até 90%</strong> do valor do imóvel</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Taxa de juros <strong>reduzida</strong></p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Prazo de <strong>até 30 anos</strong> para pagamento</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Uso do <strong>FGTS</strong> na entrada e nas parcelas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HIS2 - Habitação de Interesse Social Faixa 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-elegant border border-gray-100 hover:shadow-elegant-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  HIS2
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Habitação de Interesse Social - Faixa 2</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm font-semibold text-primary-700 mb-1">Teto de Renda Familiar (2026)</p>
                  <p className="text-2xl font-bold text-primary-800">R$ 2.400,01 a R$ 4.000,00</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm"><strong>Subsídio de até 75%</strong> do valor do imóvel</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Taxa de juros <strong>preferencial</strong></p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Prazo de <strong>até 30 anos</strong> para pagamento</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Uso do <strong>FGTS</strong> facilitado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HMP - Habitação de Mercado Popular */}
            <div className="bg-white rounded-2xl p-8 shadow-elegant border border-gray-100 hover:shadow-elegant-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  HMP
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Habitação de Mercado Popular</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm font-semibold text-primary-700 mb-1">Teto de Renda Familiar (2026)</p>
                  <p className="text-2xl font-bold text-primary-800">R$ 4.000,01 a R$ 7.000,00</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm"><strong>Subsídio de até 50%</strong> do valor do imóvel</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Taxa de juros <strong>competitiva</strong></p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Prazo de <strong>até 30 anos</strong> para pagamento</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Financiamento <strong>SBPE</strong> disponível</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RV2 - Residencial Verde Faixa 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-elegant border border-gray-100 hover:shadow-elegant-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  RV2
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Residencial Verde - Faixa 2</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm font-semibold text-primary-700 mb-1">Teto de Renda Familiar (2026)</p>
                  <p className="text-2xl font-bold text-primary-800">R$ 4.000,01 a R$ 7.000,00</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm"><strong>Subsídio de até 50%</strong> do valor do imóvel</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Foco em <strong>sustentabilidade</strong> e eficiência energética</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Prazo de <strong>até 30 anos</strong> para pagamento</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 text-sm">Benefícios <strong>ambientais</strong> e redução de custos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Entrada Facilitada */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 md:p-12 shadow-elegant border border-primary-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Entrada Facilitada</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Entrada a partir de 5%</h3>
                    <p className="text-gray-600 text-sm">Condições especiais com entrada reduzida para facilitar a compra</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Parcelamento da Entrada</h3>
                    <p className="text-gray-600 text-sm">Possibilidade de parcelar a entrada em até 12x sem juros</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">FGTS na Entrada</h3>
                    <p className="text-gray-600 text-sm">Use seu FGTS para compor a entrada ou abater parcelas</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Subsídio do Governo</h3>
                    <p className="text-gray-600 text-sm">Acesso a programas habitacionais com subsídio federal</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Taxas Reduzidas</h3>
                    <p className="text-gray-600 text-sm">Juros reduzidos em programas habitacionais oficiais</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Aprovação Rápida</h3>
                    <p className="text-gray-600 text-sm">Processo simplificado e ágil de análise de crédito</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para realizar seu sonho?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Entre em contato e descubra as melhores condições para você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={generateWhatsAppLink(generateContatoMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                Falar no WhatsApp
              </a>
              <Link
                to="/lancamentos"
                className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300"
              >
                Ver Lançamentos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ComoComprar
