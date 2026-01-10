import mongoose from 'mongoose'
import Admin from '../models/Admin.js'
import dotenv from 'dotenv'

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/celia-ikai')
    
    const email = process.argv[2] || process.env.ADMIN_EMAIL || 'admin@celiaikai.com'
    const senha = process.argv[3] || process.env.ADMIN_PASSWORD || 'admin123'
    const nome = process.argv[4] || process.env.ADMIN_NOME || 'Administrador'

    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      console.log('❌ Admin já existe com este email')
      process.exit(1)
    }

    const admin = new Admin({ email, senha, nome })
    await admin.save()
    
    console.log('✅ Admin criado com sucesso!')
    console.log(`Email: ${email}`)
    console.log(`Senha: ${senha}`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error)
    process.exit(1)
  }
}

createAdmin()
