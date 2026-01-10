import axios from 'axios'

// Usar variável de ambiente ou fallback para /api (proxy local)
// No Vercel, VITE_API_URL deve ser configurada nas variáveis de ambiente
let API_URL = import.meta.env.VITE_API_URL

// Se não tiver VITE_API_URL, usar fallback baseado no ambiente
if (!API_URL) {
  if (import.meta.env.PROD) {
    // Em produção no Vercel, SEMPRE usar URL absoluta do backend
    // Não usar /api relativo pois não funcionará
    API_URL = 'https://cikai-sppe.vercel.app/api'
    console.warn('⚠️ VITE_API_URL não definida, usando fallback:', API_URL)
    console.warn('💡 Configure VITE_API_URL no Vercel para melhor performance')
  } else {
    // Em desenvolvimento, usar proxy local
    API_URL = '/api'
  }
} else {
  // Se tiver VITE_API_URL, garantir que seja URL absoluta em produção
  if (import.meta.env.PROD && !API_URL.startsWith('http')) {
    console.warn('⚠️ VITE_API_URL não é uma URL absoluta, usando fallback')
    API_URL = 'https://cikai-sppe.vercel.app/api'
  }
}

// Log para debug (sempre, para verificar em produção)
console.log('🔧 API URL configurada:', API_URL)
console.log('🔧 VITE_API_URL (env):', import.meta.env.VITE_API_URL || 'não definida')
console.log('🔧 Modo:', import.meta.env.MODE)
console.log('🔧 Production:', import.meta.env.PROD)

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token JWT nas requisições autenticadas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Para uploads, não definir Content-Type (deixar o browser definir com boundary)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }
    
    // Log da requisição para debug
    console.log('📤 Requisição:', config.method?.toUpperCase(), config.baseURL + config.url)
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', response.config.method?.toUpperCase(), response.config.url, response.status)
    return response
  },
  (error) => {
    console.error('❌ Erro na requisição:', {
      url: error.config?.baseURL + error.config?.url,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data
    })
    
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default api
