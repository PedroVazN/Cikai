// Handler para Vercel Serverless Functions
import app from '../server.js'

// Handler para Vercel - formato correto para serverless functions
export default async (req, res) => {
  try {
    // Log para debug
    console.log('Request recebido:', req.method, req.url)
    
    // Processar requisição através do app Express
    return app(req, res)
  } catch (error) {
    console.error('Erro no handler:', error)
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    }
  }
}
