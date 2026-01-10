# Variáveis de Ambiente

## Frontend (.env na raiz do projeto)

```env
VITE_API_URL=http://localhost:5000/api
```

Para produção no Vercel, use:
```env
VITE_API_URL=https://seu-backend.vercel.app/api
```

## Backend (backend/.env)

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/celia-ikai?retryWrites=true&w=majority
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
FRONTEND_URL=http://localhost:3000
PORT=5000
NODE_ENV=development

# Cloudinary (opcional)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret

# Admin
ADMIN_EMAIL=admin@celiaikai.com
ADMIN_PASSWORD=admin123
ADMIN_NOME=Célia Ikai
```

Para produção no Vercel, atualize:
```env
FRONTEND_URL=https://seu-frontend.vercel.app
NODE_ENV=production
```
