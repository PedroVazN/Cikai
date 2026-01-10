/**
 * Helper para tratamento de URLs de imagens
 */

/**
 * Normaliza a URL da imagem
 * Se for uma URL local relativa, adiciona o baseURL do backend
 */
export const normalizeImageUrl = (url) => {
  if (!url) return null
  
  // Se já for uma URL completa (http/https), retorna como está
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  
  // Se for uma URL do Cloudinary, retorna como está
  if (url.includes('cloudinary.com')) {
    return url
  }
  
  // Se for uma URL local relativa (/uploads/...), adiciona o baseURL do backend
  if (url.startsWith('/uploads/')) {
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    return `${backendUrl}${url}`
  }
  
  return url
}

/**
 * Retorna uma imagem placeholder se a URL for inválida
 */
export const getImagePlaceholder = () => {
  return 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Sem+Imagem'
}

/**
 * Handler para erro de carregamento de imagem
 */
export const handleImageError = (e) => {
  e.target.src = getImagePlaceholder()
  e.target.onerror = null // Prevenir loop infinito
}
