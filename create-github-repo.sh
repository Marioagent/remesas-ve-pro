#!/bin/bash

# Script para crear repositorio en GitHub usando la API
# Requiere: GITHUB_TOKEN en el entorno

REPO_NAME="remesas-ve-pro"
REPO_DESCRIPTION="🇻🇪 Comparador de remesas a Venezuela - Ahorra hasta 8% en cada envío"
GITHUB_USER="MarioAgent"

echo "🚀 Creando repositorio $REPO_NAME en GitHub..."

# Crear el repositorio usando GitHub API
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"${REPO_NAME}\",\"description\":\"${REPO_DESCRIPTION}\",\"private\":false,\"auto_init\":false}"

echo ""
echo "✅ Repositorio creado (o ya existe)"
echo "📦 URL: https://github.com/${GITHUB_USER}/${REPO_NAME}"
