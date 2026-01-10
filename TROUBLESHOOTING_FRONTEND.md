# 🔧 Troubleshooting - Frontend não conecta ao Backend

## Problema: Requisições vão para o próprio domínio em vez do backend

### Sintomas:
- Erro 404: `GET https://cikai-front.vercel.app/api/empreendimentos 404`
- Requisições não vão para `https://cikai-sppe.vercel.app/api`

## ✅ Solução Passo a Passo

### 1. Verificar Variável de Ambiente no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Vá no projeto do **FRONTEND** (não o backend)
3. Clique em **Settings** → **Environment Variables**
4. Procure por `VITE_API_URL`

**Deve estar configurada assim:**
- **Nome**: `VITE_API_URL`
- **Valor**: `https://cikai-sppe.vercel.app/api`
- **Ambientes**: ✅ Production, ✅ Preview, ✅ Development

### 2. Se NÃO estiver configurada:

1. Clique em **"Add New"**
2. **Key**: `VITE_API_URL`
3. **Value**: `https://cikai-sppe.vercel.app/api`
4. Marque **Production**, **Preview** e **Development**
5. Clique em **Save**

### 3. Limpar Cache e Fazer Novo Deploy

**⚠️ IMPORTANTE**: Variáveis do Vite são incluídas no BUILD. Se você adicionar depois, precisa fazer um NOVO deploy (não apenas redeploy).

#### Opção A: Deletar e Recriar Deployment (Recomendado)

1. Vá em **Deployments**
2. Clique nos **3 pontos** do deployment mais recente
3. Selecione **"Delete"**
4. Vá em **Deployments** → **"Redeploy"** (ou faça push de uma mudança)
5. Isso forçará um novo build com as variáveis

#### Opção B: Forçar Novo Build

1. Faça uma pequena mudança no código (ex: adicione um espaço)
2. Faça commit e push
3. Isso forçará um novo build

### 4. Verificar se Funcionou

Após o novo deploy:

1. Acesse `https://cikai-front.vercel.app`
2. Abra o **Console do navegador** (F12)
3. Procure pelos logs:
   ```
   🔧 API URL configurada: https://cikai-sppe.vercel.app/api
   🔧 VITE_API_URL (env): https://cikai-sppe.vercel.app/api
   ```

**Se aparecer:**
- ✅ `https://cikai-sppe.vercel.app/api` → **Funcionando!**
- ❌ `/api` ou `não definida` → Variável não está sendo lida

### 5. Verificar Requisições

1. Abra **DevTools** (F12)
2. Vá na aba **Network**
3. Recarregue a página
4. Procure por requisições para `/api/empreendimentos`
5. Verifique se a URL completa é `https://cikai-sppe.vercel.app/api/empreendimentos`

## 🔍 Verificações Adicionais

### Verificar no Código Fonte

1. Acesse `https://cikai-front.vercel.app`
2. Abra **DevTools** (F12)
3. Vá na aba **Sources** ou **Network**
4. Procure pelo arquivo JavaScript principal
5. Procure por `VITE_API_URL` ou `baseURL`
6. Verifique qual valor está sendo usado

### Verificar Build Logs

1. No Vercel, vá em **Deployments**
2. Clique no deployment mais recente
3. Vá em **Build Logs**
4. Procure por erros ou avisos sobre variáveis de ambiente

## ⚠️ Problemas Comuns

### Problema: Variável configurada mas não funciona

**Causa**: Variável adicionada após o build
**Solução**: 
1. Delete o deployment atual
2. Faça um novo deploy
3. Ou faça uma mudança no código e push

### Problema: Variável aparece como `undefined`

**Causa**: Nome da variável incorreto ou não marcada para o ambiente correto
**Solução**:
1. Verifique se o nome é exatamente `VITE_API_URL` (com `VITE_` no início)
2. Verifique se está marcada para **Production**
3. Faça novo deploy

### Problema: Ainda vai para `/api` relativo

**Causa**: Cache do navegador ou build antigo
**Solução**:
1. Limpe o cache do navegador (Ctrl+Shift+Delete)
2. Faça hard refresh (Ctrl+Shift+R)
3. Verifique se o deployment mais recente tem a variável configurada

## 📝 Checklist Final

- [ ] Variável `VITE_API_URL` configurada no Vercel (frontend)
- [ ] Valor correto: `https://cikai-sppe.vercel.app/api`
- [ ] Marcada para Production, Preview e Development
- [ ] Feito NOVO deploy (não apenas redeploy)
- [ ] Verificado no console do navegador - mostra URL correta
- [ ] Verificado no Network - requisições vão para backend correto
- [ ] Cache do navegador limpo

## 🆘 Se Ainda Não Funcionar

1. **Verifique os logs do console** do navegador
2. **Compartilhe**:
   - O que aparece no console (logs de `🔧 API URL configurada`)
   - Screenshot das variáveis de ambiente no Vercel
   - URL das requisições que estão falhando

## 🔗 Links Úteis

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
