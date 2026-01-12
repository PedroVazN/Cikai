/**
 * Helper para trabalhar com URLs do YouTube
 */

/**
 * Extrai o ID do vídeo do YouTube a partir de diferentes formatos de URL
 * @param {string} url - URL do YouTube (qualquer formato)
 * @returns {string|null} ID do vídeo ou null se não encontrar
 */
export const extractYouTubeId = (url) => {
  if (!url) return null

  // Remove espaços e trim
  url = url.trim()

  // Padrões de URL do YouTube:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  // https://youtube.com/watch?v=VIDEO_ID
  // VIDEO_ID (se já for só o ID)

  // Se já for só o ID (sem caracteres especiais de URL)
  if (!url.includes('http') && !url.includes('/') && !url.includes('?')) {
    return url
  }

  // Padrão: youtube.com/watch?v=VIDEO_ID ou youtu.be/VIDEO_ID
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Gera a URL de embed do YouTube
 * @param {string} url - URL do YouTube ou ID do vídeo
 * @returns {string|null} URL de embed ou null se inválido
 */
export const getYouTubeEmbedUrl = (url) => {
  const videoId = extractYouTubeId(url)
  if (!videoId) return null
  return `https://www.youtube.com/embed/${videoId}`
}

/**
 * Gera a URL de thumbnail do YouTube
 * @param {string} url - URL do YouTube ou ID do vídeo
 * @returns {string|null} URL da thumbnail ou null se inválido
 */
export const getYouTubeThumbnail = (url) => {
  const videoId = extractYouTubeId(url)
  if (!videoId) return null
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}
