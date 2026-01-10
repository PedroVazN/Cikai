# ⚡ Solução Rápida - Erro ECONNREFUSED

## 🚨 Problema
O frontend não consegue conectar ao backend porque ele não está rodando.

## ✅ Solução em 3 Passos

### 1️⃣ Abra um Terminal e inicie o BACKEND primeiro:

```bash
cd backend
npm run dev
```

**Você DEVE ver:**
```
✅ Conectado ao MongoDB
🚀 Servidor rodando na porta 5000
```

**Se não aparecer, verifique:**
- O arquivo `.env` existe em `backend/`?
- As dependências foram instaladas? (`npm install`)

### 2️⃣ Abra OUTRO Terminal e inicie o FRONTEND:

```bash
npm run dev
```

**Você DEVE ver:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

### 3️⃣ Teste se está funcionando:

1. Abra: http://localhost:5000/api
   - Deve retornar: `{"message":"API Célia Ikai está funcionando!"}`

2. Abra: http://localhost:3000
   - Deve carregar a página inicial

## ⚠️ IMPORTANTE

**SEMPRE inicie o BACKEND antes do FRONTEND!**

A ordem correta é:
1. ✅ Backend primeiro (porta 5000)
2. ✅ Frontend depois (porta 3000)

## 🔍 Se ainda não funcionar:

1. **Verifique se a porta 5000 está livre:**
   ```bash
   # Windows PowerShell
   netstat -ano | findstr :5000
   
   # Se houver algo, mate o processo ou use outra porta
   ```

2. **Verifique o arquivo `.env` em `backend/`:**
   ```env
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=celia-ikai-jwt-secret-2024-mude-em-producao
   PORT=5000
   ```

3. **Reinstale as dependências se necessário:**
   ```bash
   cd backend
   npm install
   ```

## 📞 Comandos Úteis

```bash
# Verificar se o backend está rodando
curl http://localhost:5000/api

# Ou abra no navegador:
# http://localhost:5000/api
```
