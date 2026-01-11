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
    <div className="min-h-screen bg-luxury-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-800 tracking-tight">
            Nossos Lançamentos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Explore nossa seleção exclusiva de empreendimentos cuidadosamente escolhidos. 
            Cada projeto representa uma oportunidade única de encontrar o lar ideal.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white p-8 rounded-2xl shadow-elegant mb-12 border-elegant">
          <h2 className="text-xl font-bold mb-8 text-primary-800">
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
            <div className="inline-block animate-spin rounded-full h-14 w-14 border-3 border-primary-200 border-t-primary-700"></div>
            <p className="text-gray-600 mt-6 font-medium">Carregando...</p>
          </div>
        ) : empreendimentos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {empreendimentos.map((empreendimento) => (
              <Link
                key={empreendimento._id}
                to={`/lancamentos/${empreendimento._id}`}
                className="group bg-white rounded-2xl shadow-elegant overflow-hidden hover:shadow-elegant-lg transition-all duration-300 border-elegant card-hover"
              >
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
                  <div className="flex flex-wrap gap-2 mb-5">
                    {empreendimento.dormitorios && (
                      <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md font-semibold border border-primary-200">
                        {empreendimento.dormitorios} quartos
                      </span>
                    )}
                    {empreendimento.suites && (
                      <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md font-semibold border border-primary-200">
                        {empreendimento.suites} suítes
                      </span>
                    )}
                    {empreendimento.vagas && (
                      <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md font-semibold border border-primary-200">
                        {empreendimento.vagas} vagas
                      </span>
                    )}
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
            <p className="text-gray-600 text-lg font-medium">Nenhum lançamento encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lancamentos
