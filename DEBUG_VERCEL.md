# 🐛 Debug do Erro 500 no Vercel

## Como Verificar os Logs no Vercel

### 1. Acessar os Logs

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Vá no seu projeto do backend
3. Clique em **"Deployments"**
4. Clique no deployment mais recente
5. Vá na aba **"Functions"** ou **"Logs"**
6. Procure por erros em vermelho

### 2. O Que Procurar nos Logs

#### Erro: "MONGODB_URI não está definida"
**Solução**: Adicione a variável `MONGODB_URI` no Vercel

#### Erro: "MongoServerError: IP not whitelisted"
**Solução**: 
- Verifique se liberou os IPs no MongoDB Atlas
- Aguarde 2-3 minutos após liberar
- Adicione `0.0.0.0/0` se ainda não adicionou

#### Erro: "Cannot find module" ou "Import error"
**Solução**: 
- Verifique se o Root Directory está como `backend`
- Faça um novo deploy

#### Erro: "Connection timeout"
**Solução**:
- Verifique a string de conexão MongoDB
- Certifique-se de que o usuário e senha estão corretos
- Verifique Network Access no MongoDB Atlas

### 3. Testar Endpoints Individualmente

Teste estas URLs no navegador ou Postman:

1. **Health Check**: `https://cikai-sppe.vercel.app/`
   - Deve retornar JSON com status

2. **API Test**: `https://cikai-sppe.vercel.app/api`
   - Deve retornar mensagem de sucesso

3. **Empreendimentos**: `https://cikai-sppe.vercel.app/api/empreendimentos`
   - Deve retornar array (pode estar vazio)

### 4. Verificar Variáveis de Ambiente

No Vercel:
1. Vá em **Settings** → **Environment Variables**
2. Verifique se TODAS estas estão configuradas:
   - ✅ `MONGODB_URI`
   - ✅ `JWT_SECRET`
   - ✅ `FRONTEND_URL`
   - ✅ `NODE_ENV=production`

### 5. Redeploy Após Mudanças

Após adicionar/corrigir variáveis:
1. Vá em **Deployments**
2. Clique nos 3 pontos do deployment
3. Selecione **"Redeploy"**
4. Aguarde o deploy finalizar
5. Teste novamente

## ⏱️ Tempo de Propagação

- **MongoDB IPs**: 1-3 minutos
- **Variáveis de Ambiente**: Imediato (mas precisa redeploy)
- **Deploy**: 1-2 minutos

## 🔍 Checklist de Debug

- [ ] Verificou os logs no Vercel
- [ ] `MONGODB_URI` está configurada
- [ ] IPs liberados no MongoDB Atlas (aguardou 2-3 min)
- [ ] Fez redeploy após mudanças
- [ ] Testou endpoint `/` (health check)
- [ ] Testou endpoint `/api`
- [ ] Verificou Root Directory = `backend`

## 📞 Se Ainda Não Funcionar

Compartilhe:
1. Os logs de erro do Vercel (aba Functions/Logs)
2. A mensagem de erro exata
3. Qual endpoint está testando

Isso ajudará a identificar o problema específico.
