import express from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { authenticateToken } from '../middleware/auth.js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configurar Cloudinary (se as variáveis estiverem definidas)
const useCloudinary = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET

if (useCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

// Configurar storage do Multer (local)
const uploadsDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, 'image-' + uniqueSuffix + ext)
  },
})

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Apenas imagens são permitidas (jpeg, jpg, png, webp, gif)'))
    }
  },
})

// Configurar upload múltiplo
const uploadMultiple = multer({ 
  storage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB por arquivo
    // Sem limite de quantidade de arquivos
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Apenas imagens são permitidas (jpeg, jpg, png, webp, gif)'))
    }
  },
})

// POST /api/upload - Upload de imagem única (admin)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'Nenhuma imagem enviada' 
      })
    }

    let imageUrl

    if (useCloudinary) {
      // Upload para Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'celia-ikai',
        resource_type: 'image',
      })
      imageUrl = result.secure_url
      
      // Deletar arquivo local após upload
      fs.unlinkSync(req.file.path)
    } else {
      // Usar URL local (precisa ser acessível via HTTP)
      const baseUrl = process.env.BASE_URL || 'http://localhost:5000'
      imageUrl = `${baseUrl}/uploads/${req.file.filename}`
    }

    res.json({ 
      success: true,
      url: imageUrl,
      message: 'Imagem enviada com sucesso'
    })
  } catch (error) {
    // Deletar arquivo em caso de erro
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }
    res.status(500).json({ 
      success: false,
      message: error.message 
    })
  }
})

// Middleware para tratar erros do Multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Arquivo muito grande. Tamanho máximo: 5MB por arquivo'
      })
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Muitos arquivos enviados de uma vez. Tente enviar em lotes menores.'
      })
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Campo de arquivo inesperado'
      })
    }
    return res.status(400).json({
      success: false,
      message: `Erro no upload: ${err.message}`
    })
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Erro ao processar arquivo'
    })
  }
  next()
}

// POST /api/upload/multiple - Upload de múltiplas imagens (admin)
router.post('/multiple', authenticateToken, uploadMultiple.array('images'), handleMulterError, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Nenhuma imagem enviada' 
      })
    }

    console.log(`Processando ${req.files.length} arquivo(s)...`)

    const uploadPromises = req.files.map(async (file) => {
      try {
        if (!file || !file.path) {
          throw new Error('Arquivo inválido')
        }

        if (useCloudinary) {
          // Upload para Cloudinary
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'celia-ikai',
            resource_type: 'image',
          })
          
          // Deletar arquivo local após upload
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path)
          }
          
          return {
            success: true,
            url: result.secure_url,
            originalName: file.originalname
          }
        } else {
          // Usar URL local
          const baseUrl = process.env.BASE_URL || 'http://localhost:5000'
          return {
            success: true,
            url: `${baseUrl}/uploads/${file.filename}`,
            originalName: file.originalname
          }
        }
      } catch (error) {
        console.error(`Erro ao processar arquivo ${file?.originalname}:`, error.message)
        // Deletar arquivo em caso de erro
        if (file?.path && fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (unlinkError) {
            console.error('Erro ao deletar arquivo:', unlinkError.message)
          }
        }
        return {
          success: false,
          error: error.message,
          originalName: file?.originalname || 'desconhecido'
        }
      }
    })

    const results = await Promise.all(uploadPromises)
    const successful = results.filter(r => r.success)
    const failed = results.filter(r => !r.success)

    if (successful.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhuma imagem foi enviada com sucesso',
        errors: failed.map(f => f.error)
      })
    }

    res.json({
      success: true,
      message: `${successful.length} imagem(ns) enviada(s) com sucesso${failed.length > 0 ? `, ${failed.length} falharam` : ''}`,
      images: results,
      urls: successful.map(r => r.url)
    })
  } catch (error) {
    console.error('Erro no upload múltiplo:', error)
    // Limpar arquivos em caso de erro geral
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach(file => {
        if (file?.path && fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path)
          } catch (unlinkError) {
            console.error('Erro ao deletar arquivo:', unlinkError.message)
          }
        }
      })
    }
    res.status(500).json({ 
      success: false,
      message: error.message || 'Erro ao processar upload de imagens',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
})

export default router
