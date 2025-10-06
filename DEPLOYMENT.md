# 🚀 Guía de Deployment - RemesasVE Pro

## Paso 1: Crear Repositorio en GitHub ✅

### Opción A: Desde GitHub.com (Recomendado)

1. **Ir a GitHub:**
   - Abre https://github.com/new

2. **Configurar el repositorio:**
   ```
   Repository name: remesas-ve-pro
   Description: 🇻🇪 Comparador de remesas a Venezuela - Ahorra hasta 8% en cada envío
   Visibility: Public (o Private si prefieres)
   ⚠️ NO inicialices con README (ya lo tenemos)
   ```

3. **Click "Create repository"**

4. **Copiar el comando que GitHub te muestra** (algo como):
   ```bash
   git remote add origin https://github.com/TU-USUARIO/remesas-ve-pro.git
   ```

### Opción B: Desde la terminal con GitHub CLI

```bash
# Si tienes gh CLI instalado
gh repo create remesas-ve-pro --public --source=. --remote=origin --push
```

---

## Paso 2: Conectar y Subir el Código

**Después de crear el repo en GitHub, ejecuta:**

```bash
# 1. Agregar remote (usa TU usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/remesas-ve-pro.git

# 2. Verificar que esté conectado
git remote -v

# 3. Push a GitHub
git push -u origin main
```

**Si pide autenticación:**
- Usuario: tu usuario de GitHub
- Password: usa un Personal Access Token (no la contraseña)
  - Crear token en: https://github.com/settings/tokens
  - Permisos necesarios: `repo`

---

## Paso 3: Deploy en Vercel 🚀

### A. Ir a Vercel

1. Abre https://vercel.com
2. Click **"Sign Up"** o **"Log In"**
3. **Login con GitHub** (conecta tu cuenta)

### B. Importar el Proyecto

1. Click **"Add New Project"**
2. Click **"Import Git Repository"**
3. Busca y selecciona **"remesas-ve-pro"**
4. Click **"Import"**

### C. Configurar el Deploy

```
Framework Preset: Next.js (detectado automáticamente)
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### D. Variables de Entorno (Opcional por ahora)

**Puedes agregarlas después**. Las APIs de tasas son públicas y no requieren keys.

Si quieres configurar Supabase ahora:
```
NEXT_PUBLIC_SUPABASE_URL = tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY = tu_key_de_supabase
```

### E. Deploy!

1. Click **"Deploy"**
2. Espera 2-3 minutos ⏱️
3. ¡Recibirás tu URL! 🎉

---

## Paso 4: Verificar el Deployment

Una vez desplegado, Vercel te dará URLs como:

- **Producción:** `https://remesas-ve-pro.vercel.app`
- **Custom domain (opcional):** `https://remesasve.pro`

### Verificar que funciona:

1. ✅ Landing page carga
2. ✅ Tasas en vivo se actualizan
3. ✅ Animaciones funcionan
4. ✅ Responsive en móvil

---

## 🎯 Próximos Pasos (Después del Deploy)

### 1. Custom Domain (Opcional)
```
1. Compra dominio: remesasve.pro (Namecheap, GoDaddy)
2. En Vercel > Settings > Domains
3. Agregar dominio y seguir instrucciones DNS
```

### 2. Analytics
```
Vercel > Analytics > Enable
o
Google Analytics en layout.tsx
```

### 3. Continuous Deployment
```
Cada vez que hagas:
git push origin main

Vercel automáticamente:
- Build el proyecto
- Deploy nueva versión
- Te da preview URL
```

---

## 📝 Comandos Útiles

```bash
# Ver status de git
git status

# Crear nueva feature
git checkout -b feature/calculadora
git add .
git commit -m "feat: agregar página de calculadora"
git push origin feature/calculadora

# Merge a main (después de verificar)
git checkout main
git merge feature/calculadora
git push origin main  # Auto-deploy en Vercel!
```

---

## 🐛 Troubleshooting

### Error: "Build failed"
- Verifica que `npm run build` funcione localmente
- Revisa los logs en Vercel

### Error: "Module not found"
- Asegúrate que todas las dependencias estén en package.json
- Verifica imports de archivos

### APIs no funcionan
- Verifica que las URLs de APIs sean accesibles
- Revisa CORS si hay errores

---

## ✅ Checklist Final

- [ ] Repo creado en GitHub
- [ ] Código subido a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Build exitoso
- [ ] Sitio accesible en URL de Vercel
- [ ] Tasas en vivo funcionando
- [ ] Responsive en móvil verificado

---

## 🎉 ¡Listo para Promocionar!

Una vez deployed:
1. Comparte URL en grupos de venezolanos
2. Publica en redes sociales
3. Pide feedback
4. Itera según comentarios

**URL de ejemplo:** https://remesas-ve-pro.vercel.app

---

**¿Dudas?** Revisa la documentación:
- Vercel: https://vercel.com/docs
- GitHub: https://docs.github.com
- Next.js: https://nextjs.org/docs
