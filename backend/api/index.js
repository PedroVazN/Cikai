// Handler para Vercel Serverless Functions
// Importação lazy para evitar crash na inicialização

let app = null
let appPromise = null

// Função para carregar o app de forma assíncrona
async function loadApp() {
  if (app) {
    return app
  }

  if (appPromise) {
    return appPromise
  }

  appPromise = (async () => {
    try {
      console.log('Carregando server.js...')
      const serverModule = await import('../server.js')
      app = serverModule.default
      console.log('✅ App carregado com sucesso')
      return app
    } catch (error) {
      console.error('❌ Erro ao carregar server.js:', error)
      console.error('Stack:', error.stack)
      
      // Criar app de fallback
      const express = (await import('express')).default
      const fallbackApp = express()
      fallbackApp.use(express.json())
      
      fallbackApp.use((req, res) => {
        res.status(500).json({
          error: 'Erro ao inicializar servidor',
          message: error.message,
          type: error.name
        })
      })
      
      app = fallbackApp
      return app
    }
  })()

  return appPromise
}

// Handler para Vercel
export default async (req, res) => {
  try {
    // Carregar app se necessário
    const expressApp = await loadApp()
    
    // Processar requisição diretamente
    expressApp(req, res)
  } catch (error) {
    console.error('=== Erro no handler ===')
    console.error('Error:', error.message)
    console.error('Type:', error.name)
    console.error('Stack:', error.stack)
    
    if (!res.headersSent) {
      return res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message,
        type: error.name
      })
    }
  }
}
