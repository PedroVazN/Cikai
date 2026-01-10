/**
 * Gera a URL do Google Maps Embed a partir de um endereço
 * Usa o formato de busca do Google Maps que não requer chave de API
 * @param {string} endereco - Endereço completo
 * @returns {string} URL do Google Maps Embed
 */
export const generateGoogleMapsEmbedUrl = (endereco) => {
  if (!endereco) return null
  
  // Codificar o endereço para URL
  const encodedAddress = encodeURIComponent(endereco)
  
  // Retornar URL do Google Maps usando busca (não requer chave de API)
  return `https://www.google.com/maps?q=${encodedAddress}&output=embed`
}

/**
 * Gera a URL do Google Maps para abrir em nova aba
 * @param {string} endereco - Endereço completo
 * @returns {string} URL do Google Maps
 */
export const generateGoogleMapsUrl = (endereco) => {
  if (!endereco) return null
  
  // Codificar o endereço para URL
  const encodedAddress = encodeURIComponent(endereco)
  
  // Retornar URL do Google Maps
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
}
