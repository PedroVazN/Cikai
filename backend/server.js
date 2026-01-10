import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import empreendimentosRoutes from './routes/empreendimentos.js'
import leadsRoutes from './routes/leads.js'
import adminRoutes from './routes/admin.js'
import uploadRoutes from './routes/upload.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir arquivos estáticos de uploads (se usar upload local)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Rotas
app.use('/api/empreendimentos', empreendimentosRoutes)
app.use('/api/leads', leadsRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/upload', uploadRoutes)

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ message: 'API Célia Ikai está funcionando!' })
})

// Conexão MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/celia-ikai', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Conectado ao MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar ao MongoDB:', error)
    process.exit(1)
  })

export default app
