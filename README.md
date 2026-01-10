# Célia Ikai - Site + Mini-SaaS para Lançamentos Imobiliários

Sistema moderno e responsivo para divulgação de lançamentos imobiliários e captação de leads.

## 🚀 Tecnologias

### Frontend
- React 18
- Vite
- React Router DOM
- TailwindCSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Autenticação)
- Cloudinary (Upload de imagens)

## 📦 Instalação

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## ⚙️ Configuração

1. Copie o arquivo `.env.example` para `.env` no diretório `backend/`
2. Configure as variáveis de ambiente:
   - `MONGODB_URI`: String de conexão do MongoDB
   - `JWT_SECRET`: Chave secreta para JWT
   - `CLOUDINARY_*`: Credenciais do Cloudinary (para upload de imagens)

## 🗄️ Estrutura do Banco de Dados

### Collection: empreendimentos
- nome, construtora, bairro
- metragemMin, metragemMax
- dormitorios, suites, vagas
- precoInicial, descricao
- endereco, googleMapsUrl
- imagens: [urls]
- ativo, criadoEm

### Collection: leads
- nome, telefone
- empreendimentoId
- origemLead
- mensagem, criadoEm

## 🔐 Painel Administrativo

Acesse `/admin/login` para fazer login no painel administrativo.

**Nota:** É necessário criar um usuário admin manualmente no banco de dados ou criar um script de seed.

## 📝 Rotas

### Públicas
- `/` - Home
- `/lancamentos` - Lista de lançamentos
- `/lancamentos/:id` - Detalhe do empreendimento
- `/contato` - Formulário de contato
- `/agendar-visita/:id` - Agendamento de visita

### Admin
- `/admin/login` - Login
- `/admin` - Dashboard
- `/admin/empreendimentos` - Gerenciar lançamentos
- `/admin/leads` - Gerenciar leads

## 🎨 Identidade Visual

- Cores: Tons de rosa (primary) e branco
- Design: Clean, moderno e minimalista
- Mobile-first

## 📄 Licença

Este projeto é privado e de uso exclusivo da Célia Ikai.
