import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { normalizeImageUrl, handleImageError } from '../utils/imageHelper'

function Lancamentos() {
  const [empreendimentos, setEmpreendimentos] = useState([])
  const [bairrosDisponiveis, setBairrosDisponiveis] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    bairro: '',
    dormitorios: '',
    precoMax: '',
  })

  // Buscar bairros disponíveis ao carregar
  useEffect(() => {
    const fetchBairros = async () => {
      try {
        const response = await api.get('/empreendimentos')
        const todosEmpreendimentos = response.data
        
        // Extrair bairros únicos e ordenar
        const bairrosUnicos = [...new Set(
          todosEmpreendimentos
            .map(emp => emp.bairro)
            .filter(bairro => bairro && bairro.trim() !== '')
        )].sort()
        
        setBairrosDisponiveis(bairrosUnicos)
      } catch (error) {
        console.error('Erro ao carregar bairros:', error)
      }
    }
    
    fetchBairros()
  }, [])

  useEffect(() => {
    fetchEmpreendimentos()
  }, [filtros])

  const fetchEmpreendimentos = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filtros.bairro) params.append('bairro', filtros.bairro)
      if (filtros.dormitorios) params.append('dormitorios', filtros.dormitorios)
      if (filtros.precoMax) params.append('precoMax', filtros.precoMax)

      const response = await api.get(`/empreendimentos?${params.toString()}`)
      setEmpreendimentos(response.data)
    } catch (error) {
      console.error('Erro ao carregar empreendimentos:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50/30 pt-28 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Lançamentos
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Nossos Lançamentos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore nossa seleção exclusiva de empreendimentos cuidadosamente escolhidos
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12 border border-gray-100">
          <h2 className="text-xl font-bold mb-8 text-gray-900">
            Filtros de Busca
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Bairro
              </label>
              <select
                value={filtros.bairro}
                onChange={(e) => setFiltros({ ...filtros, bairro: e.target.value })}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300 bg-white"
              >
                <option value="">Todos os Bairros</option>
                {bairrosDisponiveis.map((bairro) => (
                  <option key={bairro} value={bairro}>
                    {bairro}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Dormitórios
              </label>
              <select
                value={filtros.dormitorios}
                onChange={(e) => setFiltros({ ...filtros, dormitorios: e.target.value })}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300"
              >
                <option value="">Todos</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Preço Máximo
              </label>
              <input
                type="number"
                value={filtros.precoMax}
                onChange={(e) => setFiltros({ ...filtros, precoMax: e.target.value })}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300"
                placeholder="R$ 0,00"
              />
            </div>
          </div>
        </div>

        {/* Lista de Empreendimentos */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-primary-200 border-t-primary-600"></div>
            <p className="text-gray-600 mt-6 font-medium">Carregando...</p>
          </div>
        ) : empreendimentos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {empreendimentos.map((empreendimento) => (
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
                  <div className="space-y-3 mb-5">
                    {/* Metragens */}
                    {empreendimento.metragens && empreendimento.metragens.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1.5 font-semibold uppercase tracking-wide">Metragens</p>
                        <div className="flex flex-wrap gap-2">
                          {empreendimento.metragens.map((metragem, idx) => (
                            <span key={idx} className="text-xs bg-gradient-to-br from-accent-50 to-accent-100 text-accent-800 px-3 py-1.5 rounded-md font-bold border border-accent-300">
                              {metragem}m²
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Características */}
                    <div className="flex flex-wrap gap-2">
                      {empreendimento.dormitorios && (
                        <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md font-semibold border border-primary-200">
                          <svg className="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {empreendimento.dormitorios} quartos
                        </span>
                      )}
                      {empreendimento.suites && empreendimento.suites > 0 && (
                        <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md font-semibold border border-primary-200">
                          <svg className="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {empreendimento.suites} suítes
                        </span>
                      )}
                      {empreendimento.vagasCarro && (
                        <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md font-semibold border border-primary-200">
                          <svg className="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {empreendimento.vagasCarro} carros
                        </span>
                      )}
                      {empreendimento.vagasMoto && (
                        <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md font-semibold border border-primary-200">
                          <svg className="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          {empreendimento.vagasMoto} motos
                        </span>
                      )}
                      {empreendimento.vagas && !empreendimento.vagasCarro && (
                        <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md font-semibold border border-primary-200">
                          {empreendimento.vagas} vagas
                        </span>
                      )}
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
            <p className="text-gray-600 text-lg font-medium">Nenhum lançamento encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lancamentos
