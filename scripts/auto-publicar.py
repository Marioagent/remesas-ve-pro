#!/usr/bin/env python3
"""
Script de Automatización de Publicaciones - RemesasVE Pro
Publica automáticamente en Reddit, Twitter, Facebook
"""

import os
import requests
import json
from datetime import datetime

# =============================================================================
# CONFIGURACIÓN - COMPLETA ESTOS DATOS
# =============================================================================

# Reddit API
REDDIT_CLIENT_ID = "TU_CLIENT_ID_AQUI"
REDDIT_CLIENT_SECRET = "TU_CLIENT_SECRET_AQUI"
REDDIT_USERNAME = "TU_USERNAME_AQUI"
REDDIT_PASSWORD = "TU_PASSWORD_AQUI"
REDDIT_USER_AGENT = "RemesasVE:v1.0 (by /u/TU_USERNAME)"

# Twitter API (opcional - requiere API v2)
TWITTER_API_KEY = "TU_API_KEY_AQUI"
TWITTER_API_SECRET = "TU_API_SECRET_AQUI"
TWITTER_ACCESS_TOKEN = "TU_ACCESS_TOKEN_AQUI"
TWITTER_ACCESS_SECRET = "TU_ACCESS_SECRET_AQUI"

# =============================================================================
# CONTENIDO DE LOS POSTS
# =============================================================================

REDDIT_TITLE = "[Herramienta] Comparador de tasas de remesas a Venezuela en tiempo real"

REDDIT_CONTENT = """Hola compatriotas 🇻🇪

Acabo de lanzar RemesasVE Pro, una herramienta gratuita para comparar las tasas de TODOS los servicios de remesas a Venezuela en tiempo real.

🎯 ¿Qué hace?
• Compara 8 servicios: Zoom, Reserve, AirTM, Binance P2P, Western Union, MoneyGram, Remesa Feliz y Valiu
• Te muestra exactamente cuántos bolívares vas a recibir con cada uno
• Calcula cuánto ahorras o pierdes entre servicios
• 100% gratis y sin registro

💡 ¿Por qué la hice?
Porque la diferencia entre usar un servicio u otro puede ser hasta 8% del monto. En un envío de $100, son $8 que te ahorras simplemente comparando.

🔗 Link: https://remesas-ve-pro.vercel.app

La calculadora te da el ranking en vivo según el monto que quieras enviar, porque dependiendo de la cantidad, unos servicios son mejores que otros.

¿Qué les parece? Acepto todo el feedback para mejorarla. Si les es útil, compartan con familia que envía dinero a Venezuela.

Saludos 🚀"""

TWITTER_CONTENT = """🚀 Lancé RemesasVE Pro

Comparador de remesas a Venezuela en tiempo real

✅ 8 servicios (Zoom, Reserve, AirTM, Binance, WU, MG, RF, Valiu)
✅ Gratis
✅ Sin registro
✅ Ahorra hasta 8% por envío

🔗 https://remesas-ve-pro.vercel.app

RT si envías dinero a Venezuela 🇻🇪

#Venezuela #Remesas #FinTech"""

# =============================================================================
# FUNCIONES DE PUBLICACIÓN
# =============================================================================

def publicar_reddit():
    """Publica en Reddit r/vzla"""
    print("\n📝 Publicando en Reddit...")

    try:
        # Obtener token de acceso
        auth = requests.auth.HTTPBasicAuth(REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET)
        data = {
            'grant_type': 'password',
            'username': REDDIT_USERNAME,
            'password': REDDIT_PASSWORD
        }
        headers = {'User-Agent': REDDIT_USER_AGENT}

        response = requests.post(
            'https://www.reddit.com/api/v1/access_token',
            auth=auth,
            data=data,
            headers=headers
        )

        if response.status_code != 200:
            print(f"❌ Error obteniendo token: {response.text}")
            return False

        token = response.json()['access_token']

        # Publicar en r/vzla
        headers = {
            'Authorization': f'bearer {token}',
            'User-Agent': REDDIT_USER_AGENT
        }

        post_data = {
            'sr': 'vzla',
            'kind': 'self',
            'title': REDDIT_TITLE,
            'text': REDDIT_CONTENT
        }

        response = requests.post(
            'https://oauth.reddit.com/api/submit',
            headers=headers,
            data=post_data
        )

        if response.status_code == 200:
            result = response.json()
            if 'json' in result and 'data' in result['json']:
                url = result['json']['data']['url']
                print(f"✅ ¡Publicado en Reddit!")
                print(f"   URL: {url}")
                return url
            else:
                print(f"❌ Error en respuesta: {result}")
                return False
        else:
            print(f"❌ Error publicando: {response.text}")
            return False

    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def publicar_twitter():
    """Publica en Twitter/X"""
    print("\n🐦 Publicando en Twitter...")

    # Twitter API v2 requiere OAuth 2.0
    # Por simplicidad, usamos método básico

    try:
        # Nota: Esto requiere tweepy instalado
        import tweepy

        auth = tweepy.OAuthHandler(TWITTER_API_KEY, TWITTER_API_SECRET)
        auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET)
        api = tweepy.API(auth)

        tweet = api.update_status(TWITTER_CONTENT)

        print(f"✅ ¡Publicado en Twitter!")
        print(f"   URL: https://twitter.com/{REDDIT_USERNAME}/status/{tweet.id}")
        return True

    except ImportError:
        print("⚠️  Tweepy no instalado. Instala con: pip install tweepy")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def generar_reporte(resultados):
    """Genera reporte de publicaciones"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    reporte = f"""
╔══════════════════════════════════════════════════════════════╗
║           REPORTE DE PUBLICACIONES AUTOMÁTICAS               ║
╚══════════════════════════════════════════════════════════════╝

Fecha: {timestamp}

RESULTADOS:
{'-' * 60}
"""

    for plataforma, resultado in resultados.items():
        icono = "✅" if resultado['exito'] else "❌"
        reporte += f"\n{icono} {plataforma}:"
        if resultado['exito']:
            reporte += f"\n   URL: {resultado['url']}"
        else:
            reporte += f"\n   Error: {resultado['error']}"
        reporte += "\n"

    reporte += f"""
{'-' * 60}

📊 PRÓXIMOS PASOS:

1. Responde comentarios en las plataformas donde se publicó
2. Monitorea analytics en Vercel: https://vercel.com/dashboard
3. Comparte los links en WhatsApp con familia/amigos

🎯 EXPECTATIVAS PRIMERAS 24H:
- Reddit: 50-100 visitantes
- Twitter: 10-30 visitantes
- Total esperado: 100-200 visitantes

¡Éxito con el lanzamiento! 🚀
"""

    return reporte


# =============================================================================
# MAIN - EJECUTAR PUBLICACIONES
# =============================================================================

def main():
    print("""
╔══════════════════════════════════════════════════════════════╗
║        AUTOMATIZACIÓN DE PUBLICACIONES - RemesasVE Pro       ║
╚══════════════════════════════════════════════════════════════╝
""")

    # Verificar configuración
    if REDDIT_CLIENT_ID == "TU_CLIENT_ID_AQUI":
        print("""
❌ ERROR: Configuración incompleta

Antes de ejecutar este script, debes:

1. Crear app de Reddit:
   - Ve a: https://www.reddit.com/prefs/apps
   - Click "create another app"
   - Type: "script"
   - Name: RemesasVE Bot
   - Redirect URI: http://localhost:8080

2. Edita este archivo y completa:
   - REDDIT_CLIENT_ID
   - REDDIT_CLIENT_SECRET
   - REDDIT_USERNAME
   - REDDIT_PASSWORD

3. (Opcional) Para Twitter, completa:
   - TWITTER_API_KEY
   - TWITTER_API_SECRET
   - TWITTER_ACCESS_TOKEN
   - TWITTER_ACCESS_SECRET

Luego ejecuta de nuevo: python3 auto-publicar.py
""")
        return

    print("Iniciando publicaciones...\n")

    resultados = {}

    # Reddit
    reddit_url = publicar_reddit()
    resultados['Reddit'] = {
        'exito': bool(reddit_url),
        'url': reddit_url if reddit_url else None,
        'error': None if reddit_url else 'Ver logs arriba'
    }

    # Twitter (opcional)
    if TWITTER_API_KEY != "TU_API_KEY_AQUI":
        twitter_ok = publicar_twitter()
        resultados['Twitter'] = {
            'exito': twitter_ok,
            'url': 'Ver arriba' if twitter_ok else None,
            'error': None if twitter_ok else 'Ver logs arriba'
        }
    else:
        print("\n⚠️  Twitter no configurado (opcional)")

    # Generar y mostrar reporte
    reporte = generar_reporte(resultados)
    print(reporte)

    # Guardar reporte
    with open('reporte-publicaciones.txt', 'w', encoding='utf-8') as f:
        f.write(reporte)

    print("\n💾 Reporte guardado en: reporte-publicaciones.txt\n")


if __name__ == "__main__":
    main()
