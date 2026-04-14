import { Link } from 'react-router-dom'
import { generateWhatsAppLink, generateContatoMessage } from '../utils/whatsappHelper'

const CheckIcon = () => (
  <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

function ComoComprar() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-28 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Guia Completo 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Como Comprar um Imóvel Usado
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tudo o que você precisa saber para comprar seu apartamento de revenda com segurança e as melhores condições
          </p>
        </div>

        {/* Passo a Passo */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Passo a Passo da Compra</h2>
            <p className="text-gray-600 text-lg">Do interesse à chave na mão</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Escolha o Imóvel',
                desc: 'Encontre o apartamento ideal na nossa plataforma. Verifique localização, metragem, dormitórios e valor.',
                color: 'bg-primary-600',
              },
              {
                num: '02',
                title: 'Análise de Crédito',
                desc: 'Leve seus documentos ao banco ou utilize a simulação online. A aprovação pode sair em até 72h.',
                color: 'bg-primary-600',
              },
              {
                num: '03',
                title: 'Avaliação e Vistoria',
                desc: 'O banco avalia o imóvel e um laudo técnico é emitido. Você pode fazer uma vistoria presencial.',
                color: 'bg-primary-600',
              },
              {
                num: '04',
                title: 'Assinatura e Registro',
                desc: 'Assine o contrato, efetue o registro em cartório e receba as chaves do seu novo lar.',
                color: 'bg-primary-600',
              },
            ].map((step) => (
              <div key={step.num} className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className={`${step.color} text-white text-2xl font-black w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formas de Compra */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Formas de Compra</h2>
            <p className="text-gray-600 text-lg">Escolha a opção que melhor se encaixa no seu perfil</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">

            {/* À Vista */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compra à Vista</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Pagamento integral do valor do imóvel. Oferece maior poder de negociação com o vendedor.
              </p>
              <div className="space-y-2">
                {[
                  'Desconto de até 10–15% no valor',
                  'Processo mais ágil e simples',
                  'Sem juros ou encargos bancários',
                  'Transferência mais rápida',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financiamento */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-200 hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">MAIS USADO</div>
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Financiamento Bancário</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Crédito imobiliário pelo Sistema Financeiro de Habitação (SFH) ou SFI. Disponível em todos os grandes bancos.
              </p>
              <div className="space-y-2">
                {[
                  'Entrada mínima de 10 a 20% do valor',
                  'Prazo de até 35 anos para pagar',
                  'Financia até 90% (Caixa) ou 80% (demais bancos)',
                  'Use FGTS para compor a entrada',
                  'Imóvel já disponível para morar',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FGTS + MCMV */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">FGTS + Minha Casa Minha Vida</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Combine o benefício do MCMV com o uso do seu FGTS para reduzir ao máximo o valor a pagar.
              </p>
              <div className="space-y-2">
                {[
                  'Juros a partir de 4% a.a. (Faixa 1)',
                  'Subsídio de até R$ 55.000',
                  'FGTS na entrada ou abatimento',
                  'Parcelas que cabem no bolso',
                  'Para imóveis usados: Faixas 2 e 3',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Minha Casa Minha Vida */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Minha Casa Minha Vida — Revenda 2026</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Imóveis usados podem ser financiados pelo MCMV nas Faixas 2 e 3 em São Paulo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Faixa 1 */}
            <div className="bg-white rounded-2xl p-7 shadow-lg border-2 border-primary-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-600 rounded-t-2xl"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-black text-sm">F1</div>
                <h3 className="text-lg font-bold text-gray-900">Faixa 1</h3>
              </div>
              <div className="space-y-3 mb-5">
                <div className="p-3 bg-primary-50 rounded-xl">
                  <p className="text-xs font-semibold text-primary-700 mb-1">Renda Familiar Bruta</p>
                  <p className="text-xl font-extrabold text-primary-800">Até R$ 2.850/mês</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Juros</p>
                  <p className="text-lg font-bold text-gray-800">4% a 4,75% a.a.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <p className="text-xs font-semibold text-green-700 mb-1">Subsídio</p>
                  <p className="text-lg font-bold text-green-800">Até R$ 55.000</p>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-xs text-yellow-800 font-semibold">⚠️ Atenção</p>
                <p className="text-xs text-yellow-700 mt-1">Faixa 1 é destinada apenas a imóveis novos. Para revenda, verificar enquadramento.</p>
              </div>
            </div>

            {/* Faixa 2 */}
            <div className="bg-white rounded-2xl p-7 shadow-lg border-2 border-primary-400 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-500 rounded-t-2xl"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-black text-sm">F2</div>
                <h3 className="text-lg font-bold text-gray-900">Faixa 2</h3>
              </div>
              <div className="space-y-3 mb-5">
                <div className="p-3 bg-primary-50 rounded-xl">
                  <p className="text-xs font-semibold text-primary-700 mb-1">Renda Familiar Bruta</p>
                  <p className="text-xl font-extrabold text-primary-800">R$ 2.851 a R$ 4.700/mês</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Juros</p>
                  <p className="text-lg font-bold text-gray-800">4,75% a 7% a.a.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <p className="text-xs font-semibold text-green-700 mb-1">Subsídio</p>
                  <p className="text-lg font-bold text-green-800">Até R$ 29.000</p>
                </div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-xs text-green-800 font-semibold">✅ Válido para Revenda</p>
                <p className="text-xs text-green-700 mt-1">Imóveis usados financiados pelo MCMV Faixa 2 em SP e região.</p>
              </div>
            </div>

            {/* Faixa 3 */}
            <div className="bg-white rounded-2xl p-7 shadow-lg border-2 border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-500 rounded-t-2xl"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center text-white font-black text-sm">F3</div>
                <h3 className="text-lg font-bold text-gray-900">Faixa 3</h3>
              </div>
              <div className="space-y-3 mb-5">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Renda Familiar Bruta</p>
                  <p className="text-xl font-extrabold text-gray-800">R$ 4.701 a R$ 8.600/mês</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Juros</p>
                  <p className="text-lg font-bold text-gray-800">7,66% a 8,16% a.a.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Subsídio</p>
                  <p className="text-lg font-bold text-gray-800">Sem subsídio</p>
                </div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-xs text-green-800 font-semibold">✅ Válido para Revenda</p>
                <p className="text-xs text-green-700 mt-1">Juros abaixo do mercado convencional (SBPE). Ideal para quem ganha acima de R$ 4.700.</p>
              </div>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-bold text-blue-900 mb-1">Regras gerais do MCMV para imóveis usados (revenda) 2026</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• O imóvel deve ser residencial urbano, em bom estado de conservação</li>
                  <li>• Valor máximo do imóvel: R$ 350.000 em SP (sujeito a atualização)</li>
                  <li>• Comprador não pode ter outro imóvel financiado pelo SFH</li>
                  <li>• Pode usar FGTS na entrada (mínimo 3 anos de carteira assinada)</li>
                  <li>• Prazo máximo: 420 meses (35 anos) — taxa referente à data da contratação</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Uso do FGTS */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 md:p-12 shadow-lg border border-primary-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Como usar o FGTS</h2>
                <p className="text-gray-600 mt-1">Seu FGTS pode ser um grande aliado na compra do imóvel</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Como Entrada',
                  desc: 'Use o saldo do FGTS para pagar parte ou toda a entrada do imóvel, reduzindo o valor financiado e as parcelas mensais.',
                  icon: '💰',
                },
                {
                  title: 'Amortização de Parcelas',
                  desc: 'A cada 2 anos você pode usar o FGTS para amortizar o saldo devedor ou abater até 80% de 12 parcelas seguidas.',
                  icon: '📉',
                },
                {
                  title: 'Quitação Total',
                  desc: 'Se tiver saldo suficiente, é possível quitar totalmente o financiamento com o FGTS a qualquer momento.',
                  icon: '🏠',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-primary-100">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 bg-white rounded-xl border border-primary-100 shadow-sm">
              <p className="text-sm font-bold text-gray-900 mb-2">Requisitos para usar o FGTS:</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  'Mínimo de 3 anos de trabalho com carteira assinada (pode ser em empregos diferentes)',
                  'Não possuir outro imóvel financiado pelo SFH',
                  'Não ter utilizado o FGTS nos últimos 3 anos (para amortização)',
                  'Imóvel deve ser para residência própria do trabalhador',
                  'Imóvel localizado no município de trabalho ou residência',
                ].map((req) => (
                  <div key={req} className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="text-sm text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documentos Necessários */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Documentos Necessários</h2>
            <p className="text-gray-600 text-lg">Separe com antecedência para agilizar o processo</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Do Comprador */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Do Comprador</h3>
              </div>
              <div className="space-y-3">
                {[
                  { doc: 'RG e CPF', obs: 'Documentos de todos os compradores' },
                  { doc: 'Comprovante de Estado Civil', obs: 'Certidão de nascimento ou casamento' },
                  { doc: 'Comprovante de Residência', obs: 'Conta de luz, água ou telefone (últimos 3 meses)' },
                  { doc: 'Comprovante de Renda', obs: 'Holerites dos últimos 3 meses ou IR para autônomos' },
                  { doc: 'Extrato do FGTS', obs: 'Se for utilizar o FGTS' },
                  { doc: 'Declaração de IR', obs: 'Última declaração entregue à Receita Federal' },
                  { doc: 'Carteira de Trabalho', obs: 'Para comprovar vínculo empregatício' },
                ].map((item) => (
                  <div key={item.doc} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <CheckIcon />
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{item.doc}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{item.obs}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Do Imóvel */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Do Imóvel</h3>
              </div>
              <div className="space-y-3">
                {[
                  { doc: 'Matrícula Atualizada', obs: 'Emitida pelo Cartório de Registro de Imóveis (máx. 30 dias)' },
                  { doc: 'Certidão de Ônus Reais', obs: 'Confirma que o imóvel está livre de dívidas e hipotecas' },
                  { doc: 'IPTU Quitado', obs: 'Carnê do IPTU com pagamentos em dia' },
                  { doc: 'Certidão de Quitação Condominial', obs: 'Emitida pelo síndico ou administradora do condomínio' },
                  { doc: 'Certidões Negativas do Vendedor', obs: 'Negativas de débitos estaduais, federais e trabalhistas' },
                  { doc: 'Planta do Imóvel', obs: 'Planta baixa aprovada pela Prefeitura (quando exigida)' },
                ].map((item) => (
                  <div key={item.doc} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <CheckIcon />
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{item.doc}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{item.obs}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Custos da Compra */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Custos da Compra</h2>
            <p className="text-gray-600 text-lg">Além do valor do imóvel, planeje estes custos adicionais</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[580px]">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                    <th className="px-6 py-4 text-left text-sm font-bold">Custo</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Valor Aproximado</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Observação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      custo: 'ITBI (Imposto de Transmissão)',
                      valor: '3% em SP',
                      obs: 'Calculado sobre o valor venal ou de venda (o maior). Pago à Prefeitura antes do registro.',
                      highlight: true,
                    },
                    {
                      custo: 'Escritura Pública',
                      valor: '~0,4% a 0,5%',
                      obs: 'Lavrada em cartório. Isenta para MCMV Faixa 1 e 2. Valor varia conforme tabela estadual.',
                      highlight: false,
                    },
                    {
                      custo: 'Registro de Imóveis',
                      valor: '~0,8% a 1%',
                      obs: 'Obrigatório para transferir a propriedade. Isento para MCMV Faixa 1.',
                      highlight: true,
                    },
                    {
                      custo: 'Avaliação do Imóvel',
                      valor: 'R$ 500 a R$ 1.500',
                      obs: 'Feita pelo banco para aprovar o financiamento. Custo do comprador.',
                      highlight: false,
                    },
                    {
                      custo: 'Seguro Habitacional (MIP + DFI)',
                      valor: 'Incluso na parcela',
                      obs: 'Obrigatório no financiamento. Protege contra morte, invalidez e danos ao imóvel.',
                      highlight: true,
                    },
                    {
                      custo: 'IOF e TAC',
                      valor: 'Variável por banco',
                      obs: 'Imposto sobre Operações Financeiras e Tarifa de Abertura de Crédito. Verifique com o banco.',
                      highlight: false,
                    },
                  ].map((row) => (
                    <tr key={row.custo} className={row.highlight ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.custo}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary-700">{row.valor}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.obs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-200">
              <p className="text-sm text-yellow-800 font-medium">
                💡 <strong>Dica:</strong> Reserve entre <strong>4% e 6% do valor do imóvel</strong> para cobrir ITBI + escritura + registro. Ex: imóvel de R$ 300.000 → reserve ~R$ 15.000 a R$ 18.000 além da entrada.
              </p>
            </div>
          </div>
        </section>

        {/* Bancos e Taxas */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Principais Bancos — Taxas 2026</h2>
            <p className="text-gray-600 text-lg">Compare as condições e escolha a melhor opção</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { banco: 'Caixa Econômica Federal', taxa: 'A partir de 10,99% a.a. + TR', financiamento: 'Até 90% do valor', prazo: 'Até 35 anos', destaque: 'Maior financia (90%) e atua MCMV', cor: 'border-blue-300 bg-blue-50' },
              { banco: 'Banco do Brasil', taxa: 'A partir de 10,49% a.a. + TR', financiamento: 'Até 80% do valor', prazo: 'Até 35 anos', destaque: 'Taxas competitivas para correntistas', cor: 'border-yellow-300 bg-yellow-50' },
              { banco: 'Bradesco', taxa: 'A partir de 11,5% a.a. + TR', financiamento: 'Até 80% do valor', prazo: 'Até 30 anos', destaque: 'Aprovação digital rápida', cor: 'border-red-200 bg-red-50' },
              { banco: 'Itaú', taxa: 'A partir de 11,49% a.a. + TR', financiamento: 'Até 82% do valor', prazo: 'Até 30 anos', destaque: 'Simulador online avançado', cor: 'border-orange-300 bg-orange-50' },
              { banco: 'Santander', taxa: 'A partir de 11,99% a.a. + TR', financiamento: 'Até 80% do valor', prazo: 'Até 35 anos', destaque: 'Facilidade para autônomos', cor: 'border-red-300 bg-red-50' },
              { banco: 'Inter / Nubank', taxa: 'Taxas variáveis (consulte)', financiamento: 'Até 80% do valor', prazo: 'Até 30 anos', destaque: '100% digital, sem burocracia', cor: 'border-purple-300 bg-purple-50' },
            ].map((bank) => (
              <div key={bank.banco} className={`rounded-2xl p-6 border-2 ${bank.cor} hover:shadow-lg transition-all duration-300`}>
                <h3 className="font-bold text-gray-900 text-base mb-3">{bank.banco}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Taxa</p>
                    <p className="text-sm font-bold text-gray-800">{bank.taxa}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Financiamento</p>
                    <p className="text-sm font-semibold text-gray-800">{bank.financiamento}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Prazo Máx.</p>
                    <p className="text-sm font-semibold text-gray-800">{bank.prazo}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 italic">{bank.destaque}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">* Taxas indicativas. Podem variar conforme perfil de crédito e relacionamento com o banco. Consulte-nos para simulação personalizada.</p>
        </section>

        {/* Dicas da Corretora */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Dicas da Célia Ikai</h2>
                <p className="text-white/70 mt-1">5+ anos de experiência para você não errar</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { tip: 'Faça a simulação em pelo menos 3 bancos antes de decidir. A diferença de 0,5% na taxa pode representar R$ 20.000 a mais no total pago.', icon: '🏦' },
                { tip: 'Vistorie o imóvel pessoalmente antes de assinar qualquer documento. Leve um profissional para avaliar condições hidráulicas, elétricas e estruturais.', icon: '🔍' },
                { tip: 'Verifique a matrícula do imóvel ANTES de fazer proposta. Confirme que está livre de hipotecas, penhoras ou pendências judiciais.', icon: '📋' },
                { tip: 'Negocie com o vendedor incluindo os custos de ITBI e cartório. Em muitas vendas, esses custos são divididos ou absorvidos pelo vendedor.', icon: '🤝' },
                { tip: 'Se o condomínio tiver dívidas, o novo proprietário responde por elas. Exija certidão de quitação condominial atualizada.', icon: '⚠️' },
                { tip: 'Guarde todos os comprovantes de pagamento, contratos e documentos. Eles são essenciais para eventual revenda futura ou financiamento complementar.', icon: '📁' },
              ].map((item) => (
                <div key={item.tip} className="flex items-start gap-3 p-4 bg-white/10 rounded-xl border border-white/20">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <p className="text-sm text-white/90 leading-relaxed">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ainda tem dúvidas? Fale com a Célia!
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Mais de 5 anos ajudando famílias a encontrar e comprar o imóvel ideal. Atendimento personalizado e sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={generateWhatsAppLink(generateContatoMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Falar no WhatsApp
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-md text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300"
              >
                Ver Imóveis Disponíveis
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default ComoComprar
