import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEmpreendimentos: 0,
    totalLeads: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [empreendimentosRes, leadsRes] = await Promise.all([
        api.get('/empreendimentos'),
        api.get('/leads'),
      ])
      setStats({
        totalEmpreendimentos: empreendimentosRes.data.length,
        totalLeads: leadsRes.data.length,
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <button onClick={handleLogout} className="btn-secondary">
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h2>

        {loading ? (
          <p className="text-gray-600">Carregando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total de Lançamentos</h3>
              <p className="text-4xl font-bold text-primary-600">{stats.totalEmpreendimentos}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total de Leads</h3>
              <p className="text-4xl font-bold text-primary-600">{stats.totalLeads}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/empreendimentos"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2 text-gray-900">Gerenciar Lançamentos</h3>
            <p className="text-gray-600">Criar, editar e gerenciar empreendimentos</p>
          </Link>
          <Link
            to="/admin/leads"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2 text-gray-900">Gerenciar Leads</h3>
            <p className="text-gray-600">Visualizar e gerenciar leads captados</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
