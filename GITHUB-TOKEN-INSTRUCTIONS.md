# 🔑 Cómo Obtener tu GitHub Personal Access Token

## Método Rápido (5 minutos)

### Paso 1: Ir a GitHub Tokens
Abre este link en tu navegador:
```
https://github.com/settings/tokens/new
```

### Paso 2: Configurar el Token

**Note (Nombre):** `RemesasVE Pro Deployment`

**Expiration:** Selecciona `90 days` (o el que prefieres)

**Select scopes (Permisos):** Marca SOLO estos:

```
✅ repo
   ✅ repo:status
   ✅ repo_deployment
   ✅ public_repo
   ✅ repo:invite
   ✅ security_events
```

### Paso 3: Generate Token

1. Click el botón verde **"Generate token"**
2. **COPIA EL TOKEN** (se ve así: `ghp_xxxxxxxxxxxxxxxxxxxx`)
   ⚠️ Solo se muestra UNA VEZ, guárdalo en un lugar seguro

### Paso 4: Usar el Token

Una vez tengas el token, ejecuta en la terminal:

```bash
cd /home/usermario/remesas-ve-pro

# Reemplaza TU_TOKEN_AQUI con el token que copiaste
export GITHUB_TOKEN="ghp_TU_TOKEN_AQUI"

# Crear repo
./create-github-repo.sh

# Push código
git push -u origin main
```

---

## Alternativa: Crear Repo Manualmente (MÁS RÁPIDO)

Si prefieres no usar token:

### 1. Crear repositorio en GitHub:
```
https://github.com/new
```

Configuración:
```
Repository name: remesas-ve-pro
Description: 🇻🇪 Comparador de remesas a Venezuela - Ahorra hasta 8% en cada envío
Visibility: ● Public  ○ Private
⚠️ NO marcar "Add a README file"
```

Click **"Create repository"**

### 2. Push el código:
```bash
cd /home/usermario/remesas-ve-pro
git push -u origin main
```

Cuando pida credenciales:
- Username: `MarioAgent`
- Password: Usar un Personal Access Token (NO tu contraseña de GitHub)

---

## ¿Cuál método prefieres?

**Opción A:** Obtener token y hacerlo automático ⚡
**Opción B:** Crear repo manual en GitHub (más rápido) 🚀

Avísame cuál prefieres o si ya tienes el token listo.
