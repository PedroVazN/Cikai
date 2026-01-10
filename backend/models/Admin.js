import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    senha: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// Hash da senha antes de salvar
adminSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next()
  this.senha = await bcrypt.hash(this.senha, 10)
  next()
})

// Método para comparar senha
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.senha)
}

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
