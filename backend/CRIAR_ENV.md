# 📝 Criar Arquivo .env

Como o arquivo `.env` não pode ser commitado no Git (por segurança), você precisa criá-lo manualmente.

## Passos:

1. Crie um arquivo chamado `.env` na pasta `backend/`

2. Cole o seguinte conteúdo:

```env
MONGODB_URI=mongodb+srv://vaznascimento23_db_user:ILIuKOUUVsI5K4Ym@celia1.xsl1hh6.mongodb.net/celia-ikai?retryWrites=true&w=majority
JWT_SECRET=celia-ikai-jwt-secret-2024-mude-em-producao
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
ADMIN_EMAIL=admin@celiaikai.com
ADMIN_PASSWORD=admin123
ADMIN_NOME=Célia Ikai
```

## Comando Rápido (Windows PowerShell):

```powershell
cd backend
@"
MONGODB_URI=mongodb+srv://vaznascimento23_db_user:ILIuKOUUVsI5K4Ym@celia1.xsl1hh6.mongodb.net/celia-ikai?retryWrites=true&w=majority
JWT_SECRET=celia-ikai-jwt-secret-2024-mude-em-producao
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
ADMIN_EMAIL=admin@celiaikai.com
ADMIN_PASSWORD=admin123
ADMIN_NOME=Célia Ikai
"@ | Out-File -FilePath .env -Encoding utf8
```

## Comando Rápido (Linux/Mac):

```bash
cd backend
cat > .env << 'EOF'
MONGODB_URI=mongodb+srv://vaznascimento23_db_user:ILIuKOUUVsI5K4Ym@celia1.xsl1hh6.mongodb.net/celia-ikai?retryWrites=true&w=majority
JWT_SECRET=celia-ikai-jwt-secret-2024-mude-em-producao
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
ADMIN_EMAIL=admin@celiaikai.com
ADMIN_PASSWORD=admin123
ADMIN_NOME=Célia Ikai
EOF
```

## Após criar o arquivo:

1. Configure as credenciais do Cloudinary (se for usar)
2. Execute o script para criar o admin:
   ```bash
   node scripts/createAdmin.js
   ```
   (Ele usará as variáveis ADMIN_EMAIL, ADMIN_PASSWORD e ADMIN_NOME do .env)
