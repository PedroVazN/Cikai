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
    metragens: {
      type: [Number],
      default: [],
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
    vagasCarro: {
      type: Number,
    },
    vagasMoto: {
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
    videoYoutube: {
      type: String,
      trim: true,
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

// Índices para busca otimizada
empreendimentoSchema.index({ ativo: 1, criadoEm: -1 }) // Índice composto para listagem
empreendimentoSchema.index({ bairro: 1, ativo: 1 }) // Índice composto para busca por bairro
empreendimentoSchema.index({ precoInicial: 1, ativo: 1 }) // Índice composto para filtro de preço

const Empreendimento = mongoose.model('Empreendimento', empreendimentoSchema)

export default Empreendimento
