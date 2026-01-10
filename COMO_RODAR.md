# 🚀 Como Rodar o Projeto Célia Ikai

## 📋 Pré-requisitos

- Node.js instalado (versão 16 ou superior)
- NPM ou Yarn
- MongoDB Atlas configurado (ou MongoDB local)

## 🔧 Passo 1: Instalar Dependências

### Frontend
```bash
npm install
```

### Backend
```bash
cd backend
npm install
```

## ⚙️ Passo 2: Configurar Variáveis de Ambiente

Crie o arquivo `.env` na pasta `backend/` com o conteúdo:

```env
MONGODB_URI=mongodb+srv://vaznascimento23_db_user:ILIuKOUUVsI5K4Ym@celia1.xsl1hh6.mongodb.net/celia-ikai?retryWrites=true&w=majority
JWT_SECRET=celia-ikai-jwt-secret-2024-mude-em-producao
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
ADMIN_EMAIL=admin@celiaikai.com
ADMIN_PASSWORD=admin123
ADMIN_NOME=Célia Ikai
```

**Windows PowerShell:**
```powershell
cd backend
@"
MONGODB_URI=mongodb+srv://vaznascimento23_db_user:ILIuKOUUVsI5K4Ym@celia1.xsl1hh6.mongodb.net/celia-ikai?retryWrites=true&w=majority
JWT_SECRET=celia-ikai-jwt-secret-2024-mude-em-producao
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
ADMIN_EMAIL=admin@celiaikai.com
ADMIN_PASSWORD=admin123
ADMIN_NOME=Célia Ikai
"@ | Out-File -FilePath .env -Encoding utf8
```

## 👤 Passo 3: Criar Usuário Admin

```bash
cd backend
node scripts/createAdmin.js
```

Isso criará o usuário admin com:
- **Email:** admin@celiaikai.com
- **Senha:** admin123

## 🚀 Passo 4: Iniciar os Servidores

### Terminal 1 - Backend (porta 5000)
```bash
cd backend
npm run dev
```

Você deve ver:
```
✅ Conectado ao MongoDB
🚀 Servidor rodando na porta 5000
```

### Terminal 2 - Frontend (porta 3000)
```bash
npm run dev
```

Você deve ver algo como:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

## 🌐 Passo 5: Acessar o Sistema

### Site Público
Abra no navegador: **http://localhost:3000**

### Painel Administrativo
Abra no navegador: **http://localhost:3000/admin/login**

**Credenciais:**
- Email: `admin@celiaikai.com`
- Senha: `admin123`

## ✅ Verificar se Está Funcionando

1. **Backend:** Acesse http://localhost:5000/api
   - Deve retornar: `{"message":"API Célia Ikai está funcionando!"}`

2. **Frontend:** Acesse http://localhost:3000
   - Deve carregar a página inicial

3. **Login Admin:** Acesse http://localhost:3000/admin/login
   - Faça login com as credenciais acima

## 🐛 Problemas Comuns

### Erro de conexão MongoDB
- Verifique se a string `MONGODB_URI` está correta no `.env`
- Certifique-se de que o MongoDB Atlas permite conexões do seu IP

### Porta já em uso
- Backend: Altere `PORT=5000` no `.env` para outra porta (ex: 5001)
- Frontend: O Vite perguntará se quer usar outra porta

### Erro ao criar admin
- Certifique-se de que o MongoDB está conectado
- Verifique se o arquivo `.env` existe e está correto

### Módulos não encontrados
- Execute `npm install` novamente
- Delete `node_modules` e `package-lock.json` e reinstale

## 📝 Próximos Passos Após Rodar

1. ✅ Fazer login no painel admin
2. ✅ Cadastrar seu primeiro lançamento
3. ✅ Testar o formulário de contato
4. ✅ Configurar Cloudinary (se quiser usar upload de imagens na nuvem)

## 🛑 Parar os Servidores

Pressione `Ctrl + C` em cada terminal para parar os servidores.
