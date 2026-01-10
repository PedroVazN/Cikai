import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../services/api'

function AgendarVisita() {
  const { id } = useParams()
  const [empreendimento, setEmpreendimento] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    mensagem: '',
  })
  const [loading, setLoading] = useState(false)
  const [loadingEmpreendimento, setLoadingEmpreendimento] = useState(true)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchEmpreendimento()
  }, [id])

  const fetchEmpreendimento = async () => {
    try {
      const response = await api.get(`/empreendimentos/${id}`)
      setEmpreendimento(response.data)
    } catch (error) {
      console.error('Erro ao carregar empreendimento:', error)
    } finally {
      setLoadingEmpreendimento(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/leads', {
        ...formData,
        empreendimentoId: id,
        origemLead: 'agendamento',
      })
      setSuccess(true)
    } catch (error) {
      console.error('Erro ao enviar interesse:', error)
      alert('Erro ao enviar interesse. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (loadingEmpreendimento) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando informações...</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="bg-white p-12 rounded-2xl shadow-2xl text-center max-w-md border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Interesse Registrado!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Recebemos seu interesse. Entraremos em contato em breve com mais informações.
          </p>
          <Link 
            to="/lancamentos" 
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Ver Outros Lançamentos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-4 text-gray-900 tracking-tight">
            Tenho Interesse
          </h1>
          {empreendimento && (
            <div className="mt-6 mb-4">
              <p className="text-gray-700 text-xl font-medium">
                {empreendimento.nome}
              </p>
              {empreendimento.bairro && (
                <p className="text-gray-500 text-sm mt-1">{empreendimento.bairro}</p>
              )}
            </div>
          )}
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
            Preencha seus dados e manifeste seu interesse no empreendimento. 
            Entraremos em contato em breve com mais informações.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-2">
                Nome Completo *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="nome"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-semibold text-gray-700 mb-2">
                Telefone/WhatsApp *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  id="telefone"
                  required
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="(11) 99109-5184"
                />
              </div>
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-semibold text-gray-700 mb-2">
                Mensagem (Opcional)
              </label>
              <textarea
                id="mensagem"
                rows="5"
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                placeholder="Conte-nos mais sobre seu interesse ou deixe suas dúvidas..."
              />
              <p className="text-xs text-gray-500 mt-2">Ex: "Gostaria de saber mais sobre financiamento"</p>
            </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white px-6 py-3.5 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Enviar Interesse'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AgendarVisita
