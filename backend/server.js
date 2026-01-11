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

// Conexão MongoDB - Otimizada para Vercel
let isConnected = false
let connectionPromise = null

const connectDB = async () => {
  // Se já está conectado, retornar imediatamente
  if (mongoose.connection.readyState === 1) {
    isConnected = true
    return
  }

  // Se já está tentando conectar, aguardar a mesma promise
  if (connectionPromise) {
    return connectionPromise
  }

  // Criar nova promise de conexão
  connectionPromise = (async () => {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI não está definida nas variáveis de ambiente')
      }

      // Configurações otimizadas para Vercel/serverless
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout de 5s para seleção de servidor
        socketTimeoutMS: 45000, // Timeout de 45s para operações
        connectTimeoutMS: 10000, // Timeout de 10s para conexão inicial
        maxPoolSize: 10, // Pool de conexões
        minPoolSize: 1,
        bufferMaxEntries: 0, // Desabilitar buffering (importante para serverless)
        bufferCommands: false, // Não bufferizar comandos
      })
      
      isConnected = true
      console.log('✅ Conectado ao MongoDB')
      
      // Event listeners para manter conexão
      mongoose.connection.on('error', (err) => {
        console.error('❌ Erro na conexão MongoDB:', err.message)
        isConnected = false
        connectionPromise = null
      })
      
      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB desconectado')
        isConnected = false
        connectionPromise = null
      })
      
      mongoose.connection.on('reconnected', () => {
        console.log('✅ MongoDB reconectado')
        isConnected = true
      })
      
      return true
    } catch (error) {
      console.error('❌ Erro ao conectar ao MongoDB:', error.message)
      isConnected = false
      connectionPromise = null
      
      // No Vercel, não fazer exit, apenas logar o erro
      if (process.env.VERCEL) {
        console.error('Erro de conexão MongoDB no Vercel - Verifique MONGODB_URI')
        throw error // Re-throw para o middleware tratar
      } else {
        process.exit(1)
      }
    }
  })()

  return connectionPromise
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
    // Verificar estado da conexão
    let connectionState = mongoose.connection.readyState
    
    // 0 = desconectado, 1 = conectado, 2 = conectando, 3 = desconectando
    if (connectionState !== 1) {
      // Se não está conectado, tentar conectar e AGUARDAR
      if (connectionState === 0 || connectionState === 3) {
        console.log('Tentando conectar ao MongoDB...')
        try {
          await connectDB() // AGUARDAR conexão completar
          connectionState = mongoose.connection.readyState
        } catch (connectError) {
          console.error('Erro ao conectar:', connectError.message)
          return res.status(500).json({ 
            error: 'Erro de conexão com o banco de dados',
            message: 'Não foi possível conectar ao MongoDB. Verifique MONGODB_URI e Network Access.',
            connectionState: mongoose.connection.readyState,
            hasMongoUri: !!process.env.MONGODB_URI
          })
        }
      }
      
      // Se ainda está conectando, aguardar até completar
      if (connectionState === 2) {
        console.log('Aguardando conexão MongoDB completar...')
        // Aguardar até 10 segundos para conexão completar
        let waited = 0
        while (mongoose.connection.readyState !== 1 && waited < 10000) {
          await new Promise(resolve => setTimeout(resolve, 200))
          waited += 200
          connectionState = mongoose.connection.readyState
          
          // Se mudou para desconectado, tentar conectar novamente
          if (connectionState === 0) {
            try {
              await connectDB()
            } catch (e) {
              // Ignorar erro, continuar aguardando
            }
          }
        }
      }
      
      // Verificar novamente após todas as tentativas
      connectionState = mongoose.connection.readyState
      if (connectionState !== 1) {
        console.error('MongoDB não conectado após tentativas. Estado:', connectionState)
        return res.status(500).json({ 
          error: 'Erro de conexão com o banco de dados',
          message: 'MongoDB não está conectado. Tente novamente em alguns instantes.',
          connectionState: connectionState,
          hasMongoUri: !!process.env.MONGODB_URI
        })
      }
    }
    
    // Garantir que está realmente conectado antes de prosseguir
    if (mongoose.connection.readyState === 1) {
      next()
    } else {
      return res.status(500).json({ 
        error: 'Erro de conexão com o banco de dados',
        message: 'Conexão MongoDB não está pronta.',
        connectionState: mongoose.connection.readyState
      })
    }
  } catch (error) {
    console.error('Erro no middleware de conexão:', error)
    
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
