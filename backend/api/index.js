// Handler para Vercel Serverless Functions
import app from '../server.js'

// Handler para Vercel
export default async (req, res) => {
  try {
    console.log('Request:', req.method, req.url)
    return app(req, res)
  } catch (error) {
    console.error('Handler error:', error)
    if (!res.headersSent) {
      res.status(500).json({ error: error.message })
    }
  }
}
