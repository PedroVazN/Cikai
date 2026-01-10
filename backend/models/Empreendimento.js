import mongoose from 'mongoose'

const empreendimentoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    construtora: {
      type: String,
      trim: true,
    },
    bairro: {
      type: String,
      required: true,
      trim: true,
    },
    metragemMin: {
      type: Number,
    },
    metragemMax: {
      type: Number,
    },
    dormitorios: {
      type: Number,
    },
    suites: {
      type: Number,
    },
    vagas: {
      type: Number,
    },
    precoInicial: {
      type: Number,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    endereco: {
      type: String,
      trim: true,
    },
    googleMapsUrl: {
      type: String,
      trim: true,
    },
    imagens: {
      type: [String],
      default: [],
    },
    areasLazer: {
      type: [String],
      default: [],
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// Índices para busca
empreendimentoSchema.index({ bairro: 1 })
empreendimentoSchema.index({ ativo: 1 })
empreendimentoSchema.index({ precoInicial: 1 })

const Empreendimento = mongoose.model('Empreendimento', empreendimentoSchema)

export default Empreendimento
