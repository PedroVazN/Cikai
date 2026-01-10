# 🛠️ Comandos Úteis

## Instalação Inicial

```bash
# Instalar dependências do frontend
npm install

# Instalar dependências do backend
cd backend
npm install
```

## Desenvolvimento

```bash
# Iniciar frontend (porta 3000)
npm run dev

# Iniciar backend (porta 5000)
cd backend
npm run dev
# ou
npm start
```

## Build para Produção

```bash
# Build do frontend
npm run build

# Preview do build
npm run preview
```

## Criar Usuário Admin

```bash
cd backend
node scripts/createAdmin.js email@exemplo.com senha123 "Nome do Admin"
```

## Estrutura de Pastas

```
Celia/
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/             # Páginas públicas
│   ├── admin/             # Páginas do painel admin
│   ├── services/          # Serviços (API)
│   └── utils/             # Utilitários
├── backend/               # Backend Node.js
│   ├── models/            # Models MongoDB
│   ├── routes/            # Rotas da API
│   ├── middleware/        # Middlewares
│   ├── scripts/           # Scripts utilitários
│   └── uploads/           # Uploads locais (se não usar Cloudinary)
├── package.json           # Dependências frontend
└── README.md              # Documentação principal
```

## Variáveis de Ambiente Necessárias

```env
MONGODB_URI=              # String de conexão MongoDB
JWT_SECRET=               # Chave secreta JWT
PORT=5000                 # Porta do backend
CLOUDINARY_CLOUD_NAME=    # (Opcional) Cloudinary
CLOUDINARY_API_KEY=       # (Opcional) Cloudinary
CLOUDINARY_API_SECRET=    # (Opcional) Cloudinary
```
