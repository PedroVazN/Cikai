import axios from 'axios'

// Usar variável de ambiente ou fallback para /api (proxy local)
// No Vercel, VITE_API_URL deve ser configurada nas variáveis de ambiente
const API_URL = import.meta.env.VITE_API_URL || '/api'

// Log para debug (apenas em desenvolvimento)
if (import.meta.env.DEV) {
  console.log('🔧 API URL configurada:', API_URL)
  console.log('🔧 VITE_API_URL:', import.meta.env.VITE_API_URL || 'não definida')
}

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
