import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token de acesso não fornecido' })
  }

  jwt.verify(token, process.env.JWT_SECRET || 'seu-secret-super-seguro', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado' })
    }
    req.user = user
    next()
  })
}
