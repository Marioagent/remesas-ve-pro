#!/bin/bash

echo "🚀 RemesasVE Pro - Deployment Automático"
echo ""
echo "Para deployar necesito que ejecutes:"
echo ""
echo "1️⃣  Abre tu navegador y ve a:"
echo "    https://vercel.com/account/tokens"
echo ""
echo "2️⃣  Crea un nuevo token:"
echo "    Name: RemesasVE Pro Deploy"
echo "    Scope: Full Account"
echo "    Click 'Create'"
echo ""
echo "3️⃣  Copia el token y ejecuta:"
echo "    export VERCEL_TOKEN='tu_token_aqui'"
echo "    ./vercel-deploy.sh deploy"
echo ""

if [ "$1" == "deploy" ]; then
    if [ -z "$VERCEL_TOKEN" ]; then
        echo "❌ Error: VERCEL_TOKEN no está definido"
        echo "   Ejecuta: export VERCEL_TOKEN='tu_token'"
        exit 1
    fi

    echo "🔄 Deploying a Vercel..."
    vercel --token="$VERCEL_TOKEN" --yes --prod

    echo ""
    echo "✅ Deployment completado!"
fi
