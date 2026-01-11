import express from 'express'
import Lead from '../models/Lead.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// POST /api/leads - Criar novo lead (público)
router.post('/', async (req, res) => {
  try {
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
    const { empreendimentoId } = req.query
    const query = {}

    if (empreendimentoId) {
      query.empreendimentoId = empreendimentoId
    }

    const leads = await Lead.find(query)
      .populate('empreendimentoId', 'nome')
      .sort({ criadoEm: -1 })
      .maxTimeMS(5000)
      .lean()

    res.json(leads)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/leads/:id - Buscar por ID (admin)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('empreendimentoId', 'nome')
      .maxTimeMS(5000)
      .lean()
    if (!lead) {
      return res.status(404).json({ message: 'Lead não encontrado' })
    }
    res.json(lead)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
