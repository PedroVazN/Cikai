import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Carregar variáveis de ambiente primeiro
dotenv.config()

// Verificar variáveis críticas (apenas log, não crashar)
if (!process.env.MONGODB_URI && process.env.VERCEL) {
  console.warn('⚠️ MONGODB_URI não está definida! A conexão falhará.')
}

import empreendimentosRoutes from './routes/empreendimentos.js'
import leadsRoutes from './routes/leads.js'
import adminRoutes from './routes/admin.js'
import uploadRoutes from './routes/upload.js'

const app = express()
const PORT = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requisições sem origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true)
    
    // Lista de origens permitidas
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://cikai-front.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
    ].filter(Boolean) // Remove valores undefined/null
    
    // Se não tiver FRONTEND_URL configurado, permitir todas (desenvolvimento)
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.log('CORS bloqueado para origin:', origin)
      callback(null, true) // Permitir todas por enquanto para debug
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir arquivos estáticos de uploads (se usar upload local)
// No Vercel, uploads devem ser feitos via Cloudinary
if (!process.env.VERCEL) {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
}

// Rotas
app.use('/api/empreendimentos', empreendimentosRoutes)
app.use('/api/leads', leadsRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/upload', uploadRoutes)

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ message: 'API C.Ikai está funcionando!', timestamp: new Date().toISOString() })
})

// Health check para Vercel
app.get('/', (req, res) => {
  res.json({ message: 'Backend C.Ikai API', status: 'online', timestamp: new Date().toISOString() })
})

// Conexão MongoDB
let isConnected = false

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI não está definida nas variáveis de ambiente')
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true
    console.log('✅ Conectado ao MongoDB')
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message)
    // No Vercel, não fazer exit, apenas logar o erro
    if (process.env.VERCEL) {
      console.error('Erro de conexão MongoDB no Vercel - Verifique MONGODB_URI')
    } else {
      process.exit(1)
    }
  }
}

// Conectar ao MongoDB (não bloquear inicialização)
// No Vercel, a conexão será feita na primeira requisição
// NÃO conectar durante a importação para evitar crash
if (!process.env.VERCEL) {
  // Em desenvolvimento, conectar normalmente
  connectDB()
}
// No Vercel, não conectar aqui - será conectado no middleware

// Middleware para garantir conexão antes de processar requisições
// Apenas para rotas que precisam do banco (não para health check)
app.use(async (req, res, next) => {
  // Permitir health checks sem conexão
  if (req.path === '/' || req.path === '/api') {
    return next()
  }
  
  try {
    // Se não estiver conectado, tentar conectar
    if (!isConnected && mongoose.connection.readyState !== 1) {
      console.log('Tentando conectar ao MongoDB...')
      await connectDB()
    }
    
    // Verificar se está conectado (apenas para rotas que precisam)
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB não está conectado. Estado:', mongoose.connection.readyState)
      console.error('MONGODB_URI definida:', !!process.env.MONGODB_URI)
      
      // Tentar conectar mais uma vez
      try {
        await connectDB()
      } catch (connectError) {
        console.error('Erro ao tentar reconectar:', connectError.message)
        return res.status(500).json({ 
          error: 'Erro de conexão com o banco de dados',
          message: 'MongoDB não está conectado. Verifique MONGODB_URI e Network Access.',
          connectionState: mongoose.connection.readyState,
          hasMongoUri: !!process.env.MONGODB_URI
        })
      }
    }
    
    next()
  } catch (error) {
    console.error('Erro no middleware de conexão:', error)
    console.error('Stack:', error.stack)
    
    return res.status(500).json({ 
      error: 'Erro de conexão com o banco de dados',
      message: error.message,
      mongoUri: process.env.MONGODB_URI ? 'Definida' : 'NÃO DEFINIDA',
      errorType: error.name
    })
  }
})

// Middleware de tratamento de erros global (deve ser o último)
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error)
  if (!res.headersSent) {
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    })
  }
})

// Handler de erro para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path
  })
})

// Apenas iniciar servidor se não estiver no Vercel
if (!process.env.VERCEL) {
  mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    })
  })
}

export default app
