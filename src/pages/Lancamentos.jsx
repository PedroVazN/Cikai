import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { normalizeImageUrl, handleImageError } from '../utils/imageHelper'

function Lancamentos() {
  const [empreendimentos, setEmpreendimentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    bairro: '',
    dormitorios: '',
    precoMax: '',
  })

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-gray-900 tracking-tight">
            Nossos Lançamentos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Explore nossa seleção exclusiva de empreendimentos cuidadosamente escolhidos. 
            Cada projeto representa uma oportunidade única de encontrar o lar ideal.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
          <h2 className="text-lg font-medium mb-6 text-gray-900">
            Filtros de Busca
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bairro
              </label>
              <input
                type="text"
                value={filtros.bairro}
                onChange={(e) => setFiltros({ ...filtros, bairro: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Digite o bairro"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dormitórios
              </label>
              <select
                value={filtros.dormitorios}
                onChange={(e) => setFiltros({ ...filtros, dormitorios: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todos</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço Máximo
              </label>
              <input
                type="number"
                value={filtros.precoMax}
                onChange={(e) => setFiltros({ ...filtros, precoMax: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="R$ 0,00"
              />
            </div>
          </div>
        </div>

        {/* Lista de Empreendimentos */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Carregando...</p>
          </div>
        ) : empreendimentos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {empreendimentos.map((empreendimento) => (
              <Link
                key={empreendimento._id}
                to={`/lancamentos/${empreendimento._id}`}
                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-200"
              >
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
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2 text-gray-900">
                    {empreendimento.nome}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{empreendimento.bairro}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {empreendimento.dormitorios && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md font-medium">
                        {empreendimento.dormitorios} quartos
                      </span>
                    )}
                    {empreendimento.suites && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md font-medium">
                        {empreendimento.suites} suítes
                      </span>
                    )}
                    {empreendimento.vagas && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md font-medium">
                        {empreendimento.vagas} vagas
                      </span>
                    )}
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
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">Nenhum lançamento encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lancamentos
