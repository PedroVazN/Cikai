/**
 * Helper para geração de links e mensagens do WhatsApp
 */

const WHATSAPP_NUMBER = '5511913667831' // +55 11 91366-7831 (sem espaços e caracteres especiais)

/**
 * Gera um link do WhatsApp com mensagem personalizada
 * @param {string} message - Mensagem a ser enviada
 * @returns {string} URL do WhatsApp
 */
export const generateWhatsAppLink = (message) => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

/**
 * Gera mensagem personalizada para um empreendimento
 * @param {string} nomeEmpreendimento - Nome do empreendimento
 * @returns {string} Mensagem formatada
 */
export const generateEmpreendimentoMessage = (nomeEmpreendimento) => {
  return `Olá! Tenho interesse em mais informações sobre o empreendimento ${nomeEmpreendimento}. Gostaria de saber mais detalhes.`
}

/**
 * Gera mensagem para agendamento de visita
 * @param {string} nomeEmpreendimento - Nome do empreendimento
 * @returns {string} Mensagem formatada
 */
export const generateAgendamentoMessage = (nomeEmpreendimento) => {
  return `Olá! Gostaria de agendar uma visita ao empreendimento ${nomeEmpreendimento}. Qual o melhor horário para você?`
}

/**
 * Gera mensagem genérica de contato
 * @returns {string} Mensagem formatada
 */
export const generateContatoMessage = () => {
  return `Olá! Gostaria de mais informações sobre os lançamentos disponíveis.`
}

/**
 * Retorna o número do WhatsApp formatado
 * @returns {string} Número formatado
 */
export const getWhatsAppNumber = () => {
  return '+55 11 91366-7831'
}

/**
 * Retorna o número do WhatsApp apenas com dígitos (para links)
 * @returns {string} Número apenas com dígitos
 */
export const getWhatsAppNumberDigits = () => {
  return WHATSAPP_NUMBER
}
