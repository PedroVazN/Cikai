# 🔗 Links para Testar a API

## Backend (API)

### Links Diretos para Testar no Navegador:

#### 1. Health Check
```
https://cikai-sppe.vercel.app/
```
**Esperado**: `{"message":"Backend C.Ikai API","status":"online","timestamp":"..."}`

#### 2. Teste da API
```
https://cikai-sppe.vercel.app/api
```
**Esperado**: `{"message":"API C.Ikai está funcionando!","timestamp":"..."}`

#### 3. Listar TODOS os Empreendimentos
```
https://cikai-sppe.vercel.app/api/empreendimentos
```
**Esperado**: Array de empreendimentos (pode estar vazio `[]` se não houver cadastrados)

#### 4. Listar Empreendimentos em Destaque
```
https://cikai-sppe.vercel.app/api/empreendimentos?destaque=true&limit=3
```
**Esperado**: Array com até 3 empreendimentos

#### 5. Listar Empreendimentos com Filtros
```
https://cikai-sppe.vercel.app/api/empreendimentos?bairro=São Paulo
https://cikai-sppe.vercel.app/api/empreendimentos?dormitorios=2
https://cikai-sppe.vercel.app/api/empreendimentos?precoMax=500000
```

#### 6. Buscar Empreendimento por ID
```
https://cikai-sppe.vercel.app/api/empreendimentos/[ID_DO_EMPREENDIMENTO]
```
**Substitua** `[ID_DO_EMPREENDIMENTO]` pelo ID real de um empreendimento

## Frontend

### Links do Site:

#### 1. Home
```
https://cikai-front.vercel.app/
```

#### 2. Lista de Lançamentos
```
https://cikai-front.vercel.app/lancamentos
```

#### 3. Detalhe de Lançamento
```
https://cikai-front.vercel.app/lancamentos/[ID]
```

#### 4. Admin Login
```
https://cikai-front.vercel.app/admin/login
```

## 🔍 Como Verificar se Está Funcionando

### 1. Teste o Backend Diretamente

Abra no navegador:
```
https://cikai-sppe.vercel.app/api/empreendimentos
```

**Se funcionar:**
- ✅ Você verá um JSON (pode ser `[]` se não houver empreendimentos)
- ✅ O backend está funcionando

**Se não funcionar:**
- ❌ Erro 404 → Verifique se o backend está deployado
- ❌ Erro 500 → Verifique logs no Vercel
- ❌ CORS → Verifique `FRONTEND_URL` no backend

### 2. Verifique o Console do Frontend

1. Acesse `https://cikai-front.vercel.app`
2. Abra o Console (F12)
3. Procure pelos logs:
   ```
   🔧 API URL configurada: https://cikai-sppe.vercel.app/api
   ```
4. Se aparecer `/api` ou URL errada → Problema na configuração

### 3. Verifique as Requisições

1. Abra DevTools (F12) → Network
2. Recarregue a página
3. Procure por requisições para `/api/empreendimentos`
4. Clique na requisição e veja:
   - **Status**: Deve ser `200` (não `404`)
   - **Request URL**: Deve ser `https://cikai-sppe.vercel.app/api/empreendimentos`
   - **Response**: Deve mostrar o JSON dos empreendimentos

## 🐛 Troubleshooting

### Problema: Backend retorna `[]` (array vazio)

**Causa**: Não há empreendimentos cadastrados
**Solução**: 
1. Acesse `https://cikai-front.vercel.app/admin/login`
2. Faça login
3. Cadastre um empreendimento

### Problema: Erro 404 no backend

**Causa**: Rota não encontrada
**Solução**: 
1. Verifique se o backend está deployado
2. Teste `https://cikai-sppe.vercel.app/api` primeiro
3. Verifique os logs no Vercel

### Problema: Erro CORS

**Causa**: Backend não permite requisições do frontend
**Solução**: 
1. No backend, verifique `FRONTEND_URL`
2. Deve ser: `https://cikai-front.vercel.app`
3. Faça redeploy do backend

### Problema: Frontend faz requisição para URL errada

**Causa**: `VITE_API_URL` não configurada ou build antigo
**Solução**: 
1. Verifique variável no Vercel
2. Faça novo deploy (não apenas redeploy)
3. Verifique logs no console do navegador

## 📝 Checklist de Verificação

- [ ] Backend responde em `https://cikai-sppe.vercel.app/api`
- [ ] Backend retorna empreendimentos em `https://cikai-sppe.vercel.app/api/empreendimentos`
- [ ] Frontend mostra logs corretos no console
- [ ] Requisições do frontend vão para `cikai-sppe.vercel.app`
- [ ] Não há erros 404 ou CORS
- [ ] Há empreendimentos cadastrados (se não, cadastre pelo admin)

## 🔗 URLs Resumidas

- **Backend**: `https://cikai-sppe.vercel.app`
- **Frontend**: `https://cikai-front.vercel.app`
- **API Base**: `https://cikai-sppe.vercel.app/api`
- **Empreendimentos**: `https://cikai-sppe.vercel.app/api/empreendimentos`
