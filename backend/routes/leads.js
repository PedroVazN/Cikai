import express from 'express'
import mongoose from 'mongoose'
import Lead from '../models/Lead.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Helper para garantir conexão
const ensureConnection = async () => {
  if (mongoose.connection.readyState !== 1) {
    const { connectDB } = await import('../server.js')
    await connectDB()
  }
}

// POST /api/leads - Criar novo lead (público)
router.post('/', async (req, res) => {
  try {
    await ensureConnection()
    const lead = new Lead(req.body)
    await lead.save()
    res.status(201).json(lead)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// GET /api/leads - Listar todos (admin)
router.get('/', authenticateToken, async (req, res) => {
  try {
    await ensureConnection()
    const { empreendimentoId } = req.query
    const query = {}

    if (empreendimentoId) {
      query.empreendimentoId = empreendimentoId
    }

    const leads = await Lead.find(query)
      .populate('empreendimentoId', 'nome')
      .sort({ criadoEm: -1 })

    res.json(leads)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/leads/:id - Buscar por ID (admin)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    await ensureConnection()
    const lead = await Lead.findById(req.params.id)
      .populate('empreendimentoId', 'nome')
    if (!lead) {
      return res.status(404).json({ message: 'Lead não encontrado' })
    }
    res.json(lead)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
