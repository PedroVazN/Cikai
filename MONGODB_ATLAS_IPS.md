# 🔓 Como Liberar IPs no MongoDB Atlas

Este guia explica como configurar o Network Access no MongoDB Atlas para permitir que o Vercel acesse seu banco de dados.

## 📋 Passo a Passo

### 1. Acessar o MongoDB Atlas

1. Acesse [MongoDB Atlas](https://cloud.mongodb.com)
2. Faça login na sua conta
3. Selecione seu projeto/cluster

### 2. Ir para Network Access

1. No menu lateral esquerdo, clique em **"Security"** → **"Network Access"**
   - Ou acesse diretamente: https://cloud.mongodb.com/v2#/security/network/whitelist

### 3. Adicionar IP

Você tem 2 opções:

#### Opção 1: Permitir TODOS os IPs (Mais Fácil - Recomendado para desenvolvimento)

1. Clique no botão **"Add IP Address"** (ou **"ADD IP ADDRESS"**)
2. Clique em **"Allow Access from Anywhere"**
   - Isso adiciona automaticamente: `0.0.0.0/0`
3. Clique em **"Confirm"**

⚠️ **Atenção**: Isso permite acesso de qualquer IP. Para produção, considere a Opção 2.

#### Opção 2: Adicionar IPs Específicos do Vercel

1. Clique no botão **"Add IP Address"** (ou **"ADD IP ADDRESS"**)
2. Selecione **"Add Current IP Address"** (se estiver acessando de casa)
3. Para adicionar IPs do Vercel, você pode:
   - Adicionar manualmente: `0.0.0.0/0` (permite todos)
   - Ou usar a lista de IPs do Vercel (mais seguro, mas mais trabalhoso)

### 4. Confirmar

1. Após adicionar, você verá o IP na lista
2. O status será **"Active"** (pode levar alguns segundos)
3. Pronto! O Vercel já pode acessar seu MongoDB

## 🔍 Verificar Status

- **Status "Active"** = Funcionando ✅
- **Status "Pending"** = Aguardando ativação (normal, leva alguns segundos)

## ⚠️ Importante

### Para Desenvolvimento/Testes
- Use `0.0.0.0/0` - Permite acesso de qualquer lugar
- Mais fácil de configurar
- Menos seguro

### Para Produção
- Considere usar IPs específicos
- Ou mantenha `0.0.0.0/0` mas garanta:
  - Senha forte no MongoDB
  - String de conexão segura
  - Não compartilhar credenciais

## 🐛 Problemas Comuns

### "MongoServerError: IP not whitelisted"
- **Solução**: Adicione `0.0.0.0/0` na lista de IPs permitidos

### "Connection timeout"
- **Solução**: Verifique se o IP está com status "Active"
- Aguarde alguns minutos após adicionar

### "Authentication failed"
- **Solução**: Verifique usuário e senha na string de conexão
- Certifique-se de que o usuário tem permissões no banco

## 📝 Exemplo Visual

```
Network Access
├── IP Access List
│   ├── 0.0.0.0/0          [Active] ✅
│   └── (seu IP atual)     [Active] ✅
└── [Add IP Address] botão
```

## 🔗 Links Úteis

- [MongoDB Atlas Network Access](https://cloud.mongodb.com/v2#/security/network/whitelist)
- [Documentação MongoDB Atlas](https://docs.atlas.mongodb.com/security/ip-access-list/)

## ✅ Checklist

- [ ] Acessou MongoDB Atlas
- [ ] Foi em Security → Network Access
- [ ] Adicionou `0.0.0.0/0` ou IPs específicos
- [ ] Status está "Active"
- [ ] Testou a conexão do Vercel

Após configurar, aguarde 1-2 minutos e teste novamente no Vercel!
