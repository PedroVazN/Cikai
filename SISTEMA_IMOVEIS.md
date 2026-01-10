# 🏠 Sistema de Gerenciamento de Imóveis

## 📋 Funcionalidades Implementadas

### ✅ Backend (API MongoDB)

#### 1. **API de Empreendimentos** (`/api/empreendimentos`)
- **GET /** - Listar todos os empreendimentos (público)
  - Filtros: `bairro`, `dormitorios`, `precoMax`, `destaque`, `limit`
  - Retorna apenas empreendimentos ativos
  
- **GET /:id** - Buscar empreendimento por ID (público)
  
- **POST /** - Criar novo empreendimento (admin)
  - Requer autenticação JWT
  - Validações:
    - Campos obrigatórios: `nome`, `bairro`, `precoInicial`, `descricao`
    - Preço deve ser maior que zero
    - Imagens devem ser um array
  
- **PUT /:id** - Atualizar empreendimento (admin)
  - Requer autenticação JWT
  - Mesmas validações do POST
  
- **DELETE /:id** - Deletar empreendimento (admin)
  - Requer autenticação JWT

#### 2. **API de Upload de Imagens** (`/api/upload`)
- **POST /** - Upload de imagem única (admin)
  - Suporta Cloudinary ou armazenamento local
  - Limite: 5MB por arquivo
  - Formatos: jpeg, jpg, png, webp, gif
  
- **POST /multiple** - Upload de múltiplas imagens (admin)
  - Até 10 imagens por vez
  - Retorna array de URLs

### ✅ Frontend

#### 1. **Painel Admin** (`/admin/empreendimentos`)
- ✅ Formulário completo para criar/editar empreendimentos
- ✅ Upload de múltiplas imagens
- ✅ Preview de imagens antes de salvar
- ✅ Remoção de imagens do preview
- ✅ Validação de campos obrigatórios
- ✅ Listagem de todos os empreendimentos
- ✅ Edição e exclusão

#### 2. **Páginas Públicas**
- ✅ Home - Exibe destaques
- ✅ Lista de Lançamentos - Com filtros
- ✅ Detalhe do Empreendimento - Com galeria de imagens

#### 3. **Helper de Imagens** (`src/utils/imageHelper.js`)
- ✅ Normalização de URLs (local e Cloudinary)
- ✅ Tratamento de erros de carregamento
- ✅ Placeholder para imagens inválidas

## 🔧 Como Usar

### 1. Criar um Novo Empreendimento

1. Acesse `/admin/empreendimentos`
2. Clique em "Novo Lançamento"
3. Preencha os campos:
   - **Obrigatórios:** Nome, Bairro, Preço Inicial, Descrição
   - **Opcionais:** Construtora, Metragem, Dormitórios, Suítes, Vagas, Endereço, Google Maps
4. Faça upload de imagens:
   - Selecione uma ou múltiplas imagens
   - As imagens serão enviadas automaticamente
   - Você verá o preview antes de salvar
5. Clique em "Criar"

### 2. Editar um Empreendimento

1. Na lista de empreendimentos, clique em "Editar"
2. Modifique os campos desejados
3. Adicione ou remova imagens
4. Clique em "Atualizar"

### 3. Upload de Imagens

#### Opção 1: Cloudinary (Recomendado)
1. Configure as variáveis no `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=seu_cloud_name
   CLOUDINARY_API_KEY=sua_api_key
   CLOUDINARY_API_SECRET=seu_api_secret
   ```
2. As imagens serão armazenadas na nuvem
3. URLs serão do tipo: `https://res.cloudinary.com/...`

#### Opção 2: Armazenamento Local
1. Deixe as variáveis do Cloudinary vazias
2. As imagens serão salvas em `backend/uploads/`
3. URLs serão do tipo: `http://localhost:5000/uploads/image-xxx.jpg`
4. Certifique-se de que o servidor está servindo arquivos estáticos

## 📊 Estrutura de Dados

### Empreendimento (MongoDB)
```javascript
{
  nome: String (obrigatório),
  construtora: String,
  bairro: String (obrigatório),
  metragemMin: Number,
  metragemMax: Number,
  dormitorios: Number,
  suites: Number,
  vagas: Number,
  precoInicial: Number (obrigatório, > 0),
  descricao: String (obrigatório),
  endereco: String,
  googleMapsUrl: String,
  imagens: [String], // Array de URLs
  ativo: Boolean (default: true),
  criadoEm: Date,
  atualizadoEm: Date
}
```

## 🔒 Segurança

- ✅ Autenticação JWT obrigatória para criar/editar/deletar
- ✅ Validação de tipos de arquivo no upload
- ✅ Limite de tamanho de arquivo (5MB)
- ✅ Sanitização de dados de entrada

## 🐛 Tratamento de Erros

- ✅ Validação de campos obrigatórios
- ✅ Mensagens de erro claras
- ✅ Fallback para imagens que não carregam
- ✅ Tratamento de erros de upload

## 📝 Próximas Melhorias Sugeridas

- [ ] Compressão automática de imagens
- [ ] Redimensionamento automático
- [ ] Galeria com lightbox
- [ ] Ordenação de imagens (drag and drop)
- [ ] Upload progress indicator
- [ ] Validação de dimensões de imagem
- [ ] Suporte a vídeos
- [ ] Integração com Google Maps embed
