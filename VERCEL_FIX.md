# 🔧 Correção do Erro 500 no Vercel

## Problema
O backend está retornando erro 500 no Vercel.

## Soluções Aplicadas

### 1. Handler Serverless Criado
- Criado `backend/api/index.js` como handler para Vercel
- O Vercel precisa de um arquivo na pasta `api/` para funcionar como serverless function

### 2. Ajustes no server.js
- Conexão MongoDB melhorada com retry
- Middleware para garantir conexão antes de processar requisições
- Tratamento de erros melhorado para produção

### 3. Verificações Necessárias

#### ✅ Variáveis de Ambiente no Vercel
Certifique-se de que TODAS estas variáveis estão configuradas no Vercel:

```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/celia-ikai?retryWrites=true&w=majority
JWT_SECRET=seu-jwt-secret-aqui
FRONTEND_URL=https://seu-frontend.vercel.app
NODE_ENV=production
```

**⚠️ IMPORTANTE**: A variável `MONGODB_URI` é OBRIGATÓRIA!

#### ✅ Configuração do Projeto no Vercel
1. Vá em **Settings** → **General**
2. Verifique:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: (deixe vazio)
   - **Output Directory**: (deixe vazio)

#### ✅ Verificar Logs
1. No Vercel, vá em **Deployments**
2. Clique no deployment mais recente
3. Vá em **Functions** → veja os logs de erro
4. Procure por:
   - Erros de conexão MongoDB
   - Variáveis de ambiente faltando
   - Erros de importação

## Teste Rápido

Após fazer o deploy, teste estas URLs:

1. **Health Check**: `https://seu-backend.vercel.app/`
   - Deve retornar: `{ message: 'Backend C.Ikai API', status: 'online' }`

2. **API Test**: `https://seu-backend.vercel.app/api`
   - Deve retornar: `{ message: 'API C.Ikai está funcionando!' }`

3. **Empreendimentos**: `https://seu-backend.vercel.app/api/empreendimentos`
   - Deve retornar lista de empreendimentos (pode estar vazia)

## Se Ainda Estiver com Erro 500

### Verificar MongoDB Atlas
1. Acesse [MongoDB Atlas](https://cloud.mongodb.com)
2. Vá em **Network Access**
3. Certifique-se de que `0.0.0.0/0` está na lista (permite acesso de qualquer IP)
   - Ou adicione os IPs do Vercel

### Verificar String de Conexão
A `MONGODB_URI` deve estar no formato:
```
mongodb+srv://usuario:senha@cluster.mongodb.net/celia-ikai?retryWrites=true&w=majority
```

**⚠️ CUIDADO**: A senha não pode ter caracteres especiais sem encoding!
- Se a senha tiver `@`, `#`, `$`, etc., use URL encoding:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`

### Re-deploy
Após adicionar/corrigir variáveis de ambiente:
1. Vá em **Deployments**
2. Clique nos 3 pontos do deployment mais recente
3. Selecione **Redeploy**

## Estrutura de Arquivos

```
backend/
├── api/
│   └── index.js          ← Handler para Vercel
├── routes/
├── models/
├── middleware/
├── server.js             ← App Express
└── vercel.json          ← Configuração Vercel
```

## Próximos Passos

1. ✅ Fazer commit e push das alterações
2. ✅ Verificar variáveis de ambiente no Vercel
3. ✅ Fazer novo deploy
4. ✅ Testar as URLs acima
5. ✅ Verificar logs se ainda houver erro
