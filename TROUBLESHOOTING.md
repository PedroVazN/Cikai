# 🔧 Troubleshooting - Resolução de Problemas

## ❌ Erro: ECONNREFUSED - Backend não conecta

### Sintoma
```
http proxy error: /api/empreendimentos
AggregateError [ECONNREFUSED]
```

### Causa
O backend não está rodando na porta 5000.

### Solução

1. **Verifique se o backend está rodando:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Você deve ver estas mensagens:**
   ```
   ✅ Conectado ao MongoDB
   🚀 Servidor rodando na porta 5000
   ```

3. **Se não aparecer, verifique:**
   - O arquivo `.env` existe em `backend/`?
   - As variáveis `MONGODB_URI` estão corretas?
   - A porta 5000 está livre? (não há outro processo usando)

4. **Teste o backend diretamente:**
   Abra no navegador: http://localhost:5000/api
   Deve retornar: `{"message":"API Célia Ikai está funcionando!"}`

5. **Ordem correta para iniciar:**
   - **PRIMEIRO:** Inicie o backend (`cd backend && npm run dev`)
   - **DEPOIS:** Inicie o frontend (`npm run dev`)

## ❌ Erro: MongoDB não conecta

### Sintoma
```
❌ Erro ao conectar ao MongoDB
```

### Solução

1. **Verifique a string de conexão no `.env`:**
   ```env
   MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/celia-ikai?retryWrites=true&w=majority
   ```

2. **Para MongoDB Atlas:**
   - Verifique se o IP está na whitelist
   - Verifique se o usuário e senha estão corretos
   - Teste a conexão no MongoDB Compass

3. **Para MongoDB local:**
   - Certifique-se de que o MongoDB está rodando
   - Use: `mongodb://localhost:27017/celia-ikai`

## ❌ Erro: Porta já em uso

### Sintoma
```
Error: listen EADDRINUSE: address already in use :::5000
```

### Solução

1. **Encontre o processo usando a porta:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Linux/Mac
   lsof -i :5000
   ```

2. **Mate o processo ou use outra porta:**
   - Altere `PORT=5001` no `.env`
   - Atualize o `vite.config.js` para usar porta 5001

## ❌ Erro: Módulos não encontrados

### Sintoma
```
Cannot find module 'express'
Error: Cannot find module './routes/empreendimentos'
```

### Solução

1. **Instale as dependências:**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend (na raiz)
   npm install
   ```

2. **Se persistir, limpe e reinstale:**
   ```bash
   # Backend
   cd backend
   rm -rf node_modules package-lock.json
   npm install
   
   # Frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

## ❌ Erro: Token inválido / Não autorizado

### Sintoma
```
401 Unauthorized
Token inválido ou expirado
```

### Solução

1. **Faça login novamente:**
   - Acesse `/admin/login`
   - Entre com suas credenciais

2. **Limpe o localStorage:**
   ```javascript
   // No console do navegador
   localStorage.removeItem('adminToken')
   ```

3. **Crie um novo admin se necessário:**
   ```bash
   cd backend
   node scripts/createAdmin.js
   ```

## ❌ Erro: Upload de imagens falha

### Sintoma
```
Erro ao fazer upload das imagens
```

### Solução

1. **Se usar Cloudinary:**
   - Verifique as credenciais no `.env`
   - Teste no site do Cloudinary

2. **Se usar upload local:**
   - Certifique-se de que a pasta `backend/uploads/` existe
   - Verifique permissões de escrita
   - O servidor deve estar servindo arquivos estáticos

## ✅ Checklist de Verificação

Antes de reportar um problema, verifique:

- [ ] Backend está rodando na porta 5000?
- [ ] Frontend está rodando na porta 3000?
- [ ] Arquivo `.env` existe em `backend/`?
- [ ] MongoDB está conectado?
- [ ] Dependências instaladas (`npm install` em ambos)?
- [ ] Usuário admin foi criado?
- [ ] Navegador não tem cache antigo? (Ctrl+Shift+R)

## 🆘 Ainda com problemas?

1. Verifique os logs do backend no terminal
2. Verifique o console do navegador (F12)
3. Teste as rotas da API diretamente:
   - http://localhost:5000/api
   - http://localhost:5000/api/empreendimentos
