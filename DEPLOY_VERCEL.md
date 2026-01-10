# 🚀 Deploy no Vercel - Guia Completo

Este guia explica como fazer o deploy do frontend e backend no Vercel.

## 📋 Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (já configurado)
3. Conta no [Cloudinary](https://cloudinary.com) (opcional, para uploads)

## 🔧 Passo 1: Deploy do Backend

### 1.1. Preparar o Backend

1. No Vercel, clique em **"Add New Project"**
2. Conecte seu repositório GitHub: `PedroVazN/Cikai`
3. Configure o projeto:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: (deixe vazio ou `npm install`)
   - **Output Directory**: (deixe vazio)
   - **Install Command**: `npm install`

### 1.2. Variáveis de Ambiente do Backend

Adicione estas variáveis de ambiente no Vercel:

```
MONGODB_URI=mongodb+srv://seu_usuario:senha@cluster.mongodb.net/celia-ikai?retryWrites=true&w=majority
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
FRONTEND_URL=https://seu-frontend.vercel.app
PORT=5000
NODE_ENV=production

# Cloudinary (opcional)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret

# Admin
ADMIN_EMAIL=admin@celiaikai.com
ADMIN_PASSWORD=sua_senha_segura
ADMIN_NOME=Célia Ikai
```

### 1.3. Deploy

1. Clique em **"Deploy"**
2. Aguarde o deploy finalizar
3. **Copie a URL do backend** (ex: `https://celia-ikai-backend.vercel.app`)

## 🎨 Passo 2: Deploy do Frontend

### 2.1. Preparar o Frontend

1. No Vercel, crie **outro projeto** (ou use o mesmo repositório)
2. Configure o projeto:
   - **Root Directory**: (raiz do projeto)
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 2.2. Variáveis de Ambiente do Frontend

Adicione esta variável de ambiente no Vercel:

```
VITE_API_URL=https://seu-backend.vercel.app/api
```

**⚠️ IMPORTANTE**: Substitua `seu-backend.vercel.app` pela URL real do seu backend!

### 2.3. Deploy

1. Clique em **"Deploy"**
2. Aguarde o deploy finalizar
3. **Copie a URL do frontend** (ex: `https://celia-ikai.vercel.app`)

## 🔄 Passo 3: Atualizar URLs

### 3.1. Atualizar Backend

Depois que o frontend estiver deployado, volte ao backend no Vercel:

1. Vá em **Settings** → **Environment Variables**
2. Atualize `FRONTEND_URL` com a URL do frontend:
   ```
   FRONTEND_URL=https://seu-frontend.vercel.app
   ```
3. Faça um novo deploy do backend

### 3.2. Atualizar Frontend

1. Vá em **Settings** → **Environment Variables**
2. Certifique-se de que `VITE_API_URL` está correto:
   ```
   VITE_API_URL=https://seu-backend.vercel.app/api
   ```
3. Faça um novo deploy do frontend

## ✅ Passo 4: Verificar

1. Acesse o frontend: `https://seu-frontend.vercel.app`
2. Teste as funcionalidades:
   - Ver lançamentos
   - Acessar admin: `https://seu-frontend.vercel.app/admin/login`
   - Fazer upload de imagens
   - Enviar leads

## 🔐 Passo 5: Criar Admin (se necessário)

Se precisar criar um admin, você pode:

1. Usar o script local (se tiver acesso):
   ```bash
   cd backend
   node scripts/createAdmin.js
   ```

2. Ou criar manualmente via MongoDB Atlas:
   - Acesse seu cluster
   - Vá em Collections → `admins`
   - Crie um documento com email e senha (hash bcrypt)

## 📝 Estrutura de URLs

Após o deploy, você terá:

- **Frontend**: `https://celia-ikai.vercel.app`
- **Backend API**: `https://celia-ikai-backend.vercel.app/api`

## 🐛 Troubleshooting

### Erro de CORS
- Certifique-se de que `FRONTEND_URL` no backend está correto
- Verifique se a URL não tem barra no final

### Erro 404 nas rotas
- Verifique se o `vercel.json` está configurado corretamente
- Para o frontend, certifique-se de que as rotas estão configuradas para SPA

### Upload de imagens não funciona
- Verifique as credenciais do Cloudinary
- Ou configure o upload local (menos recomendado para produção)

### Variáveis de ambiente não funcionam
- No Vercel, variáveis que começam com `VITE_` são expostas no frontend
- Variáveis sem `VITE_` são apenas no backend
- Após adicionar variáveis, faça um novo deploy

## 🔄 Atualizações Futuras

Para atualizar o código:

1. Faça push para o GitHub
2. O Vercel detecta automaticamente e faz deploy
3. Ou faça deploy manual no painel do Vercel

## 📚 Recursos

- [Documentação Vercel](https://vercel.com/docs)
- [Vercel + Node.js](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Vercel + React](https://vercel.com/docs/frameworks/react)
