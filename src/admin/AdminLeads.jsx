import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [empreendimentos, setEmpreendimentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroEmpreendimento, setFiltroEmpreendimento] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [filtroEmpreendimento])

  const fetchData = async () => {
    try {
      const [leadsRes, empreendimentosRes] = await Promise.all([
        api.get('/leads'),
        api.get('/empreendimentos'),
      ])
      setLeads(leadsRes.data)
      setEmpreendimentos(empreendimentosRes.data)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchLeads = async () => {
    try {
      const params = filtroEmpreendimento ? `?empreendimentoId=${filtroEmpreendimento}` : ''
      const response = await api.get(`/leads${params}`)
      setLeads(response.data)
    } catch (error) {
      console.error('Erro ao carregar leads:', error)
    }
  }

  const getEmpreendimentoNome = (id) => {
    const emp = empreendimentos.find((e) => e._id === id)
    return emp ? emp.nome : 'N/A'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/admin" className="text-primary-600 hover:text-primary-700">
              ← Voltar ao Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Gerenciar Leads</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtro */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por Empreendimento
          </label>
          <select
            value={filtroEmpreendimento}
            onChange={(e) => setFiltroEmpreendimento(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Todos os empreendimentos</option>
            {empreendimentos.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.nome}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-gray-600">Carregando...</p>
        ) : leads.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empreendimento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Origem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mensagem</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lead.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a
                        href={`https://wa.me/${lead.telefone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-900"
                      >
                        {lead.telefone}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.empreendimentoId
                        ? getEmpreendimentoNome(lead.empreendimentoId)
                        : 'Geral'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                        {lead.origemLead}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(lead.criadoEm)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {lead.mensagem || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg">Nenhum lead encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminLeads
