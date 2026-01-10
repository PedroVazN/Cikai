# 🔐 Como Acessar o Painel Admin

## 📍 URL de Acesso

**Login do Admin:**
```
http://localhost:3000/admin/login
```

## 🔑 Credenciais Padrão

Após criar o usuário admin, use:

- **Email:** `admin@celiaikai.com`
- **Senha:** `admin123`

## 📝 Passo a Passo Completo

### 1️⃣ Certifique-se de que os servidores estão rodando

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 2️⃣ Acesse a página de login

Abra no navegador:
```
http://localhost:3000/admin/login
```

### 3️⃣ Faça login

- Digite o email: `admin@celiaikai.com`
- Digite a senha: `admin123`
- Clique em "Entrar"

### 4️⃣ Você será redirecionado para o Dashboard

Após o login, você verá:
- Total de lançamentos
- Total de leads
- Links para gerenciar lançamentos e leads

### 5️⃣ Acesse a página de lançamentos

Clique em **"Gerenciar Lançamentos"** ou acesse diretamente:
```
http://localhost:3000/admin/empreendimentos
```

### 6️⃣ Criar um novo lançamento

1. Clique no botão **"Novo Lançamento"**
2. Preencha o formulário:
   - **Campos obrigatórios:**
     - Nome do Empreendimento
     - Bairro
     - Preço Inicial
     - Descrição
   - **Campos opcionais:**
     - Construtora
     - Metragem Min/Max
     - Dormitórios, Suítes, Vagas
     - Endereço
     - Link Google Maps
3. **Faça upload de imagens:**
   - Clique em "Escolher arquivo"
   - Selecione uma ou múltiplas imagens
   - Aguarde o upload
   - Veja o preview das imagens
4. Clique em **"Criar"**

## 🆘 Problemas Comuns

### ❌ "Token inválido" ou redireciona para login

**Solução:**
1. Limpe o cache do navegador (Ctrl+Shift+R)
2. Ou limpe o localStorage:
   - Abra o console (F12)
   - Digite: `localStorage.removeItem('adminToken')`
   - Recarregue a página

### ❌ "Credenciais inválidas"

**Solução:**
1. Certifique-se de que criou o usuário admin:
   ```bash
   cd backend
   node scripts/createAdmin.js
   ```
2. Use as credenciais corretas:
   - Email: `admin@celiaikai.com`
   - Senha: `admin123`

### ❌ Página não carrega / Erro 404

**Solução:**
1. Verifique se o frontend está rodando
2. Acesse: http://localhost:3000
3. Se não carregar, verifique os logs do terminal

## 📋 Rotas do Admin

- `/admin/login` - Página de login
- `/admin` - Dashboard (requer login)
- `/admin/empreendimentos` - Gerenciar lançamentos (requer login)
- `/admin/leads` - Gerenciar leads (requer login)

## 🔒 Segurança

- Todas as rotas admin (exceto `/admin/login`) requerem autenticação
- O token JWT é salvo no `localStorage`
- O token expira em 7 dias
- Se expirar, você será redirecionado para o login

## 💡 Dica

Você pode criar um bookmark no navegador:
- Nome: "Célia Ikai Admin"
- URL: `http://localhost:3000/admin/login`
