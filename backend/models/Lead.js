import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    telefone: {
      type: String,
      required: true,
      trim: true,
    },
    empreendimentoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Empreendimento',
    },
    origemLead: {
      type: String,
      enum: ['contato', 'agendamento', 'whatsapp', 'outro'],
      default: 'outro',
    },
    mensagem: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// Índices otimizados
leadSchema.index({ empreendimentoId: 1, criadoEm: -1 }) // Índice composto para busca por empreendimento
leadSchema.index({ criadoEm: -1 }) // Índice para ordenação

const Lead = mongoose.model('Lead', leadSchema)

export default Lead
