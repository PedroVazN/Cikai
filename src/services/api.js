import axios from 'axios'

// Usar variável de ambiente ou fallback para /api (proxy local)
// No Vercel, VITE_API_URL deve ser configurada nas variáveis de ambiente
let API_URL = import.meta.env.VITE_API_URL

// Se não tiver VITE_API_URL e estiver em produção, usar URL do backend
if (!API_URL) {
  if (import.meta.env.PROD) {
    // Em produção, tentar detectar automaticamente ou usar fallback
    // Se estiver no Vercel, a variável DEVE estar configurada
    console.error('❌ VITE_API_URL não está definida em produção!')
    console.error('⚠️ Configure VITE_API_URL no Vercel antes do deploy')
    // Fallback: tentar usar o backend conhecido
    API_URL = 'https://cikai-sppe.vercel.app/api'
  } else {
    // Em desenvolvimento, usar proxy local
    API_URL = '/api'
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
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default api
