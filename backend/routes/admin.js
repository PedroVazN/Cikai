import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const router = express.Router()

// POST /api/admin/login - Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' })
    }

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ message: 'Credenciais inválidas' })
    }

    const isPasswordValid = await admin.comparePassword(senha)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' })
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'seu-secret-super-seguro',
      { expiresIn: '7d' }
    )

    res.json({ token, admin: { id: admin._id, email: admin.email, nome: admin.nome } })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
