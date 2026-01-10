# 🔧 Configurar Frontend no Vercel

## Problema: Erro 404 nas Requisições da API

O frontend está tentando fazer requisições para o próprio domínio (`https://cikai-front.vercel.app/api`) em vez do backend (`https://cikai-sppe.vercel.app/api`).

## ✅ Solução: Configurar Variável de Ambiente

### 1. Acessar Configurações do Projeto Frontend no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Vá no projeto do **frontend** (não o backend)
3. Clique em **Settings** → **Environment Variables**

### 2. Adicionar Variável de Ambiente

Clique em **"Add New"** e adicione:

**Nome da Variável:**
```
VITE_API_URL
```

**Valor:**
```
https://cikai-sppe.vercel.app/api
```

**⚠️ IMPORTANTE:**
- ✅ Marque **"Production"**, **"Preview"** e **"Development"**
- ✅ Clique em **"Save"**

### 3. Fazer Redeploy

Após adicionar a variável:

1. Vá em **Deployments**
2. Clique nos **3 pontos** do deployment mais recente
3. Selecione **"Redeploy"**
4. Aguarde o deploy finalizar (1-2 minutos)

**⚠️ IMPORTANTE**: Variáveis de ambiente do Vite precisam ser adicionadas ANTES do build. Se você adicionar depois, precisa fazer um novo deploy!

### 4. Verificar se Funcionou

Após o redeploy, teste:

1. Acesse `https://cikai-front.vercel.app`
2. Abra o Console do navegador (F12)
3. Procure por erros de requisição
4. As requisições devem ir para `https://cikai-sppe.vercel.app/api`

## 🔍 Verificar Configuração

### No Console do Navegador

Abra o console (F12) e digite:
```javascript
console.log(import.meta.env.VITE_API_URL)
```

Deve mostrar: `https://cikai-sppe.vercel.app/api`

### Verificar Requisições

1. Abra o DevTools (F12)
2. Vá na aba **Network**
3. Faça uma requisição (ex: carregar a página)
4. Verifique se as requisições vão para `cikai-sppe.vercel.app` e não para `cikai-front.vercel.app`

## 📝 Variáveis de Ambiente do Frontend

### Obrigatórias:
```
VITE_API_URL=https://cikai-sppe.vercel.app/api
```

### Opcionais (se necessário):
```
VITE_APP_NAME=C.Ikai
VITE_APP_VERSION=1.0.0
```

## ⚠️ Problemas Comuns

### Erro: "Request failed with status code 404"
**Causa**: `VITE_API_URL` não está configurada ou está incorreta
**Solução**: 
1. Verifique se a variável está configurada no Vercel
2. Verifique se o valor está correto (com `/api` no final)
3. Faça um novo deploy

### Erro: "CORS policy"
**Causa**: Backend não está permitindo requisições do frontend
**Solução**: 
1. No backend, verifique a variável `FRONTEND_URL`
2. Deve ser: `https://cikai-front.vercel.app`
3. Faça redeploy do backend

### Variável não está sendo lida
**Causa**: Variável adicionada após o build
**Solução**: 
1. Variáveis do Vite são incluídas no build
2. Se adicionar depois, precisa fazer novo deploy
3. Sempre adicione variáveis ANTES do primeiro deploy

## ✅ Checklist

- [ ] Variável `VITE_API_URL` configurada no Vercel (frontend)
- [ ] Valor correto: `https://cikai-sppe.vercel.app/api`
- [ ] Marcada para Production, Preview e Development
- [ ] Feito redeploy após adicionar variável
- [ ] Testado no navegador - requisições vão para o backend correto
- [ ] Variável `FRONTEND_URL` configurada no backend
- [ ] Backend fazendo redeploy também

## 🔗 URLs

- **Frontend**: `https://cikai-front.vercel.app`
- **Backend**: `https://cikai-sppe.vercel.app`
- **API Base URL**: `https://cikai-sppe.vercel.app/api`
