import express from 'express'
import mongoose from 'mongoose'
import Empreendimento from '../models/Empreendimento.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Helper para garantir conexão
const ensureConnection = async () => {
  if (mongoose.connection.readyState !== 1) {
    const { connectDB } = await import('../server.js')
    await connectDB()
  }
}

// GET /api/empreendimentos - Listar todos (público)
router.get('/', async (req, res) => {
  try {
    await ensureConnection()
    const { bairro, dormitorios, precoMax, destaque, limit } = req.query
    const query = { ativo: true }

    if (bairro) {
      query.bairro = { $regex: bairro, $options: 'i' }
    }

    if (dormitorios) {
      query.dormitorios = dormitorios === '4+' ? { $gte: 4 } : parseInt(dormitorios)
    }

    if (precoMax) {
      query.precoInicial = { $lte: parseFloat(precoMax) }
    }

    // Query simples
    let empreendimentos = await Empreendimento.find(query).sort({ criadoEm: -1 })

    if (destaque === 'true') {
      empreendimentos = empreendimentos.slice(0, parseInt(limit) || 3)
    }

    res.json(empreendimentos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/empreendimentos/:id - Buscar por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const empreendimento = await Empreendimento.findById(req.params.id)
      .maxTimeMS(5000)
      .lean()
    if (!empreendimento) {
      return res.status(404).json({ message: 'Empreendimento não encontrado' })
    }
    res.json(empreendimento)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /api/empreendimentos - Criar novo (admin)
router.post('/', authenticateToken, async (req, res) => {
  try {
    await ensureConnection()
    // Validação básica
    const { nome, bairro, precoInicial, descricao } = req.body
    
    if (!nome || !bairro || !precoInicial || !descricao) {
      return res.status(400).json({ 
        message: 'Campos obrigatórios: nome, bairro, precoInicial e descricao' 
      })
    }

    // Validar preço
    if (precoInicial <= 0) {
      return res.status(400).json({ 
        message: 'O preço inicial deve ser maior que zero' 
      })
    }

    // Validar imagens (se houver)
    if (req.body.imagens && !Array.isArray(req.body.imagens)) {
      return res.status(400).json({ 
        message: 'O campo imagens deve ser um array' 
      })
    }

    const empreendimento = new Empreendimento(req.body)
    await empreendimento.save()
    
    res.status(201).json(empreendimento)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({ 
        message: 'Erro de validação',
        errors: messages 
      })
    }
    res.status(500).json({ message: error.message })
  }
})

// PUT /api/empreendimentos/:id - Atualizar (admin)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    await ensureConnection()
    // Validar preço se fornecido
    if (req.body.precoInicial !== undefined && req.body.precoInicial <= 0) {
      return res.status(400).json({ 
        message: 'O preço inicial deve ser maior que zero' 
      })
    }

    // Validar imagens (se houver)
    if (req.body.imagens && !Array.isArray(req.body.imagens)) {
      return res.status(400).json({ 
        message: 'O campo imagens deve ser um array' 
      })
    }

    const empreendimento = await Empreendimento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, maxTimeMS: 5000 }
    )
    
    if (!empreendimento) {
      return res.status(404).json({ message: 'Empreendimento não encontrado' })
    }
    
    res.json(empreendimento)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({ 
        message: 'Erro de validação',
        errors: messages 
      })
    }
    res.status(500).json({ message: error.message })
  }
})

// DELETE /api/empreendimentos/:id - Deletar (admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await ensureConnection()
    const empreendimento = await Empreendimento.findByIdAndDelete(req.params.id)
    if (!empreendimento) {
      return res.status(404).json({ message: 'Empreendimento não encontrado' })
    }
    res.json({ message: 'Empreendimento deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
