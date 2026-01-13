import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function AdminEmpreendimentos() {
  const [empreendimentos, setEmpreendimentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    construtora: '',
    bairro: '',
    metragemMin: '',
    metragemMax: '',
    metragens: [],
    dormitorios: '',
    suites: '',
    vagas: '',
    vagasCarro: '',
    vagasMoto: '',
    precoInicial: '',
    descricao: '',
    endereco: '',
    googleMapsUrl: '',
    videoYoutube: '',
    imagens: [],
    areasLazer: [],
    ativo: true,
  })
  const [novaMetragem, setNovaMetragem] = useState('')
  const [showMoreAreas, setShowMoreAreas] = useState(false)
  const [customArea, setCustomArea] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchEmpreendimentos()
  }, [])

  const fetchEmpreendimentos = async () => {
    try {
      const response = await api.get('/empreendimentos')
      setEmpreendimentos(response.data)
    } catch (error) {
      console.error('Erro ao carregar empreendimentos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // Garantir que imagens seja sempre um array
    const currentImagens = Array.isArray(formData.imagens) ? formData.imagens : []

    setUploading(true)

    try {
      // Se for apenas uma imagem, usar rota simples
      if (files.length === 1) {
        const uploadFormData = new FormData()
        uploadFormData.append('image', files[0])
        const response = await api.post('/upload', uploadFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        
        if (response.data.success && response.data.url) {
          setFormData({
            ...formData,
            imagens: [...currentImagens, response.data.url],
          })
        } else {
          throw new Error(response.data.message || 'Erro ao fazer upload')
        }
      } else {
        // Múltiplas imagens - usar rota /upload/multiple
        const uploadFormData = new FormData()
        files.forEach(file => {
          uploadFormData.append('images', file)
        })
        
        const response = await api.post('/upload/multiple', uploadFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        
        if (response.data.success) {
          const urls = response.data.urls || []
          if (Array.isArray(urls) && urls.length > 0) {
            setFormData({
              ...formData,
              imagens: [...currentImagens, ...urls],
            })
          } else {
            throw new Error('Nenhuma imagem foi enviada com sucesso')
          }
        } else {
          throw new Error(response.data.message || 'Erro ao fazer upload')
        }
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Erro ao fazer upload das imagens'
      alert(errorMessage)
      
      // Se houver erros específicos de arquivos, mostrar detalhes
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        console.error('Erros detalhados:', error.response.data.errors)
      }
    } finally {
      setUploading(false)
      // Limpar input
      e.target.value = ''
    }
  }

  const handleRemoveImage = (index) => {
    const currentImagens = Array.isArray(formData.imagens) ? formData.imagens : []
    setFormData({
      ...formData,
      imagens: currentImagens.filter((_, i) => i !== index),
    })
  }

  const handleMoveImage = (fromIndex, toIndex) => {
    const currentImagens = Array.isArray(formData.imagens) ? formData.imagens : []
    const newImagens = [...currentImagens]
    const [removed] = newImagens.splice(fromIndex, 1)
    newImagens.splice(toIndex, 0, removed)
    setFormData({
      ...formData,
      imagens: newImagens,
    })
  }

  const handleToggleAreaLazer = (area) => {
    const currentAreas = Array.isArray(formData.areasLazer) ? formData.areasLazer : []
    if (currentAreas.includes(area)) {
      setFormData({
        ...formData,
        areasLazer: currentAreas.filter(a => a !== area),
      })
    } else {
      setFormData({
        ...formData,
        areasLazer: [...currentAreas, area],
      })
    }
  }

  const areasLazerPadrao = [
    // Áreas originais
    'Sala para delivery',
    'Pet care',
    'Acesso às unidades para serviços de moradia',
    'Minimarket',
    'Lavanderia e home office',
    'Brinquedoteca',
    'Acesso às unidades residenciais',
    'Salão de jogos',
    'Salão de festas',
    'Academia',
    'Lobby com pé-direito duplo',
    'Coworking',
    // Novas áreas
    'Acesso Pedestres',
    'Acesso Veículos',
    'Portaria',
    'Lobby',
    'Delivery',
    'Coliving',
    'Praça Coliving',
    'Pool Bar',
    'Solarium',
    'Piscina Adulto 25 m',
    'Deck Molhado',
    'Piscina Infantil',
    'Quadra de Esportes',
    'Praça Apoio Quadra/Churrasqueira',
    'Churrasqueira',
    'Fitness',
    'Playground',
    'Espaço Gourmet Garden',
    'Praça Gourmet Garden',
    'Praça Central',
    'Praça Festas',
    'Salão de Festas 1',
    'Salão de Festas 2',
    'Espaço Gourmet',
  ]

  const handleAddCustomArea = () => {
    if (customArea.trim() && !formData.areasLazer.includes(customArea.trim())) {
      setFormData({
        ...formData,
        areasLazer: [...formData.areasLazer, customArea.trim()],
      })
      setCustomArea('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validação básica no frontend
    if (!formData.nome || !formData.bairro || !formData.descricao) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    try {
      const data = {
        ...formData,
        metragemMin: formData.metragemMin ? Number(formData.metragemMin) : undefined,
        metragemMax: formData.metragemMax ? Number(formData.metragemMax) : undefined,
        metragens: Array.isArray(formData.metragens) ? formData.metragens.map(m => Number(m)) : [],
        dormitorios: formData.dormitorios ? Number(formData.dormitorios) : undefined,
        suites: formData.suites ? Number(formData.suites) : undefined,
        vagas: formData.vagas ? Number(formData.vagas) : undefined,
        vagasCarro: formData.vagasCarro ? Number(formData.vagasCarro) : undefined,
        vagasMoto: formData.vagasMoto ? Number(formData.vagasMoto) : undefined,
        ...(formData.precoInicial && { precoInicial: Number(formData.precoInicial) }),
      }

      if (editingId) {
        await api.put(`/empreendimentos/${editingId}`, data)
        alert('Empreendimento atualizado com sucesso!')
      } else {
        await api.post('/empreendimentos', data)
        alert('Empreendimento criado com sucesso!')
      }

      resetForm()
      fetchEmpreendimentos()
    } catch (error) {
      console.error('Erro ao salvar empreendimento:', error)
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.join(', ') || 
                          'Erro ao salvar empreendimento'
      alert(errorMessage)
    }
  }

  const handleEdit = (empreendimento) => {
    setFormData({
      nome: empreendimento.nome || '',
      construtora: empreendimento.construtora || '',
      bairro: empreendimento.bairro || '',
      metragemMin: empreendimento.metragemMin || '',
      metragemMax: empreendimento.metragemMax || '',
      metragens: empreendimento.metragens || [],
      dormitorios: empreendimento.dormitorios || '',
      suites: empreendimento.suites || '',
      vagas: empreendimento.vagas || '',
      vagasCarro: empreendimento.vagasCarro || '',
      vagasMoto: empreendimento.vagasMoto || '',
      precoInicial: empreendimento.precoInicial || '',
      descricao: empreendimento.descricao || '',
      endereco: empreendimento.endereco || '',
      googleMapsUrl: empreendimento.googleMapsUrl || '',
      videoYoutube: empreendimento.videoYoutube || '',
      imagens: empreendimento.imagens || [],
      areasLazer: empreendimento.areasLazer || [],
      ativo: empreendimento.ativo !== undefined ? empreendimento.ativo : true,
    })
    setEditingId(empreendimento._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este empreendimento?')) return

    try {
      await api.delete(`/empreendimentos/${id}`)
      fetchEmpreendimentos()
    } catch (error) {
      console.error('Erro ao excluir empreendimento:', error)
      alert('Erro ao excluir empreendimento')
    }
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      construtora: '',
      bairro: '',
      metragemMin: '',
      metragemMax: '',
      metragens: [],
      dormitorios: '',
      suites: '',
      vagas: '',
      vagasCarro: '',
      vagasMoto: '',
      precoInicial: '',
      descricao: '',
      endereco: '',
      googleMapsUrl: '',
      videoYoutube: '',
      imagens: [],
      areasLazer: [],
      ativo: true,
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/admin" className="text-primary-600 hover:text-primary-700">
              ← Voltar ao Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Gerenciar Lançamentos</h1>
            <button onClick={() => setShowForm(!showForm)} className="btn-primary">
              {showForm ? 'Cancelar' : 'Novo Lançamento'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showForm && (
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Editar Lançamento' : 'Novo Lançamento'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome do Empreendimento *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Construtora
                  </label>
                  <input
                    type="text"
                    name="construtora"
                    value={formData.construtora}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    name="bairro"
                    required
                    value={formData.bairro}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Metragem Mínima (m²)
                  </label>
                  <input
                    type="number"
                    name="metragemMin"
                    value={formData.metragemMin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Metragem Máxima (m²)
                  </label>
                  <input
                    type="number"
                    name="metragemMax"
                    value={formData.metragemMax}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dormitórios
                  </label>
                  <input
                    type="number"
                    name="dormitorios"
                    value={formData.dormitorios}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Suítes
                  </label>
                  <input
                    type="number"
                    name="suites"
                    value={formData.suites}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vagas
                  </label>
                  <input
                    type="number"
                    name="vagas"
                    value={formData.vagas}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vagas de Carro
                  </label>
                  <input
                    type="number"
                    name="vagasCarro"
                    value={formData.vagasCarro}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vagas de Moto
                  </label>
                  <input
                    type="number"
                    name="vagasMoto"
                    value={formData.vagasMoto}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Metragens Disponíveis (m²)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="number"
                      value={novaMetragem}
                      onChange={(e) => setNovaMetragem(e.target.value)}
                      placeholder="Ex: 31, 32, 33..."
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (novaMetragem && !formData.metragens.includes(Number(novaMetragem))) {
                          setFormData({
                            ...formData,
                            metragens: [...formData.metragens, Number(novaMetragem)].sort((a, b) => a - b)
                          })
                          setNovaMetragem('')
                        }
                      }}
                      className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                    >
                      Adicionar
                    </button>
                  </div>
                  {formData.metragens.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.metragens.map((metragem, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-semibold border border-primary-200"
                        >
                          {metragem}m²
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                metragens: formData.metragens.filter((_, i) => i !== index)
                              })
                            }}
                            className="text-primary-600 hover:text-primary-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  name="descricao"
                  required
                  rows="5"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço Completo *
                </label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  placeholder="Ex: Rua das Flores, 123 - Bairro, São Paulo - SP"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  O mapa será gerado automaticamente a partir deste endereço
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Google Maps (Opcional)
                </label>
                <input
                  type="url"
                  name="googleMapsUrl"
                  value={formData.googleMapsUrl}
                  onChange={handleInputChange}
                  placeholder="https://maps.google.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Link direto para o Google Maps (opcional, se quiser um link específico)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Vídeo YouTube (Opcional)
                </label>
                <input
                  type="url"
                  name="videoYoutube"
                  value={formData.videoYoutube}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/watch?v=... ou https://youtu.be/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Cole o link completo do YouTube ou apenas o ID do vídeo
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagens (Arraste para reorganizar)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                {uploading && <p className="text-sm text-gray-600 mt-2">Fazendo upload...</p>}
                {Array.isArray(formData.imagens) && formData.imagens.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {formData.imagens.length} imagem(ns) adicionada(s)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.imagens.map((img, index) => (
                        <div 
                          key={index} 
                          className="relative group cursor-move"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', index.toString())
                          }}
                          onDragOver={(e) => {
                            e.preventDefault()
                          }}
                          onDrop={(e) => {
                            e.preventDefault()
                            const fromIndex = parseInt(e.dataTransfer.getData('text/plain'))
                            const toIndex = index
                            if (fromIndex !== toIndex) {
                              handleMoveImage(fromIndex, toIndex)
                            }
                          }}
                        >
                          <img 
                            src={img} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-32 object-cover rounded border border-gray-200"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x200?text=Imagem+inválida'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold transition-colors"
                            title="Remover imagem"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center rounded-b">
                            {index + 1}
                          </div>
                          <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                            Arraste
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Áreas de Lazer
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {areasLazerPadrao.slice(0, showMoreAreas ? areasLazerPadrao.length : 6).map((area) => {
                    const isSelected = Array.isArray(formData.areasLazer) && formData.areasLazer.includes(area)
                    return (
                      <div
                        key={area}
                        onClick={() => handleToggleAreaLazer(area)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-primary-50 border-primary-600 text-primary-900'
                            : 'bg-white border-gray-300 hover:border-primary-400'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                            isSelected ? 'bg-primary-600 border-primary-600' : 'border-gray-400'
                          }`}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-medium">{area}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {!showMoreAreas && (
                  <button
                    type="button"
                    onClick={() => setShowMoreAreas(true)}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    + Ver mais áreas
                  </button>
                )}
                {showMoreAreas && (
                  <button
                    type="button"
                    onClick={() => setShowMoreAreas(false)}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    - Ver menos
                  </button>
                )}
                
                {/* Campo para adicionar área customizada */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Adicionar Área de Lazer Personalizada
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customArea}
                      onChange={(e) => setCustomArea(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddCustomArea()
                        }
                      }}
                      placeholder="Digite o nome da área de lazer"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomArea}
                      disabled={!customArea.trim()}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      + Adicionar
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Digite o nome da área e clique em "Adicionar" ou pressione Enter
                  </p>
                </div>
                
                {/* Mostrar áreas customizadas adicionadas */}
                {formData.areasLazer && formData.areasLazer.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Áreas Selecionadas ({formData.areasLazer.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.areasLazer.map((area, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-primary-50 border border-primary-200 rounded-lg px-3 py-2"
                        >
                          <span className="text-sm text-primary-900 mr-2">{area}</span>
                          <button
                            type="button"
                            onClick={() => handleToggleAreaLazer(area)}
                            className="text-primary-600 hover:text-primary-800 font-bold"
                            title="Remover"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="ativo"
                  checked={formData.ativo}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Ativo</label>
              </div>
                        <div className="flex gap-4 pt-6 border-t border-gray-200">
                          <button 
                            type="submit" 
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            {editingId ? (
                              <>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Atualizar
                              </>
                            ) : (
                              <>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Criar Lançamento
                              </>
                            )}
                          </button>
                          <button 
                            type="button" 
                            onClick={resetForm} 
                            className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancelar
                          </button>
                        </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="ml-4 text-gray-600">Carregando lançamentos...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Bairro</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {empreendimentos.map((emp) => (
                  <tr key={emp._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{emp.nome}</div>
                      {emp.construtora && (
                        <div className="text-xs text-gray-500 mt-1">{emp.construtora}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {emp.bairro}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        R$ {emp.precoInicial?.toLocaleString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        emp.ativo 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        {emp.ativo ? (
                          <>
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Ativo
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                            Inativo
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium"
                          title="Editar"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(emp._id)}
                          className="flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium"
                          title="Excluir"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminEmpreendimentos
