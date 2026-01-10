# 📋 Instruções de Instalação e Configuração

## 🚀 Passo a Passo

### 1. Instalar Dependências

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/` com o seguinte conteúdo:

```env
# MongoDB
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/celia-ikai

# JWT
JWT_SECRET=seu-secret-super-seguro-aqui

# Porta do servidor
PORT=5000

# Cloudinary (opcional - para upload de imagens)
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
```

**Nota:** Se não configurar o Cloudinary, o sistema usará upload local na pasta `backend/uploads/`.

### 3. Criar Usuário Admin

Execute o script para criar o primeiro usuário admin:

```bash
cd backend
node scripts/createAdmin.js email@exemplo.com senha123 Nome do Admin
```

Ou use os valores padrão:
```bash
node scripts/createAdmin.js
```
(Email: admin@celiaikai.com, Senha: admin123)

### 4. Iniciar o Servidor

#### Backend (Terminal 1)
```bash
cd backend
npm run dev
```

#### Frontend (Terminal 2)
```bash
npm run dev
```

### 5. Acessar o Sistema

- **Site Público:** http://localhost:3000
- **Painel Admin:** http://localhost:3000/admin/login

## 📝 Próximos Passos

1. Configure o MongoDB Atlas ou use MongoDB local
2. Configure o Cloudinary (recomendado) ou use upload local
3. Crie o primeiro usuário admin
4. Acesse o painel admin e comece a cadastrar lançamentos!

## 🔧 Troubleshooting

### Erro de conexão MongoDB
- Verifique se a string de conexão está correta no `.env`
- Certifique-se de que o MongoDB está acessível

### Erro de upload de imagens
- Se usar Cloudinary: verifique as credenciais no `.env`
- Se usar upload local: certifique-se de que a pasta `backend/uploads/` existe e tem permissões de escrita

### Erro de autenticação
- Verifique se o JWT_SECRET está configurado
- Certifique-se de que criou um usuário admin

## 📱 WhatsApp

Lembre-se de atualizar o número do WhatsApp nos arquivos:
- `src/components/Footer.jsx`
- `src/pages/LancamentoDetalhe.jsx`

Substitua `5511999999999` pelo número real.
