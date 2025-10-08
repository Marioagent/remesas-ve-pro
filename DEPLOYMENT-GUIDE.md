# 🚀 Reme Global - Guía de Deployment

## Paso a Paso para Lanzar a Producción

### 📋 Pre-requisitos

Antes de comenzar, necesitas crear cuentas en:
- ✅ [Vercel](https://vercel.com) - Hosting gratuito
- ✅ [Supabase](https://supabase.com) - Database gratuito
- ✅ [Google Analytics](https://analytics.google.com) - Analytics gratuito
- 🔧 [Anthropic](https://console.anthropic.com) - Chatbot IA ($5 crédito)
- 🔧 [Twilio](https://twilio.com) - WhatsApp (opcional)
- 🔧 [Telegram Bot](https://t.me/botfather) - Telegram (gratuito)

---

## 1️⃣ Configurar Supabase

### Crear Proyecto
1. Ir a https://supabase.com
2. Crear nuevo proyecto
3. Guardar la URL y las API keys

### Ejecutar Script SQL
1. En Supabase Dashboard → SQL Editor
2. Copiar y pegar el contenido de `SUPABASE-SETUP.sql`
3. Ejecutar (Run)
4. Verificar que las tablas se crearon correctamente

### Obtener Credenciales
```
Project URL: https://xxxxx.supabase.co
anon/public key: eyJhbGc...
```

---

## 2️⃣ Configurar Google Analytics

### Crear Propiedad GA4
1. Ir a https://analytics.google.com
2. Admin → Crear Propiedad
3. Nombre: "Reme Global"
4. Configurar Data Stream (Web)
5. Copiar Measurement ID (G-XXXXXXXXXX)

### Eventos Personalizados
Los eventos ya están configurados en el código. Solo necesitas:
- Verificar que el tracking code funciona
- Configurar conversiones importantes
- Crear dashboards personalizados

---

## 3️⃣ Configurar APIs Opcionales

### Anthropic Claude (Chatbot)
1. Ir a https://console.anthropic.com
2. Crear API Key
3. Copiar: `sk-ant-api03-xxxxx`
4. Costo: ~$0.003 por mensaje

### Telegram Bot (Alertas)
1. Hablar con [@BotFather](https://t.me/botfather)
2. `/newbot` → Seguir instrucciones
3. Copiar token: `123456:ABC-DEF...`
4. ¡Gratuito!

### Twilio (WhatsApp)
1. Ir a https://twilio.com
2. Crear cuenta (incluye $15 gratis)
3. Configurar WhatsApp Sandbox
4. Copiar: Account SID y Auth Token
5. Costo: ~$0.005 por mensaje

---

## 4️⃣ Deploy en Vercel

### Opción A: Con Git (Recomendado)

1. **Push a GitHub:**
```bash
cd remesas-ve-pro
git add .
git commit -m "feat: Complete implementation with all 7 features"
git push origin main
```

2. **Conectar con Vercel:**
- Ir a https://vercel.com/new
- Import Git Repository
- Seleccionar tu repositorio
- Click "Import"

3. **Configurar Variables de Entorno:**
En Vercel Dashboard → Settings → Environment Variables:

```env
# Esenciales (REQUERIDAS)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# APIs Tasas (públicas)
NEXT_PUBLIC_BCV_API_URL=https://pydolarve.org/api/v1/dollar
NEXT_PUBLIC_DOLARTODAY_API=https://s3.amazonaws.com/dolartoday/data.json

# Chatbot IA (opcional)
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Telegram (opcional)
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...

# Twilio WhatsApp (opcional)
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

4. **Deploy:**
- Click "Deploy"
- Esperar 2-3 minutos
- ¡Listo! Tu app está en línea

### Opción B: CLI de Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

---

## 5️⃣ Configurar Dominio Personalizado

### En Vercel
1. Ir a tu proyecto → Settings → Domains
2. Agregar dominio: `remesasve.pro`
3. Configurar DNS según instrucciones
4. Esperar propagación (5-30 min)

### Configuración DNS
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

---

## 6️⃣ Post-Deployment

### Verificar Funcionalidad
- [ ] Landing page carga correctamente
- [ ] Tasas de cambio se actualizan
- [ ] Calculadora funciona
- [ ] Dashboard accesible (requiere login)
- [ ] Chatbot responde
- [ ] PWA instalable
- [ ] Google Analytics registra eventos

### Testing de Alertas
```bash
# Test Telegram
curl -X POST https://api.telegram.org/bot<TOKEN>/sendMessage \
  -d chat_id=<CHAT_ID> \
  -d text="Test de Reme Global"

# Test API
curl https://tu-dominio.com/api/tasas
```

### Optimización
1. **Lighthouse Test:**
   - Chrome DevTools → Lighthouse
   - Objetivo: 90+ en todas las métricas

2. **Vercel Analytics:**
   - Activar en Settings → Analytics
   - Monitorear Web Vitals

3. **Error Monitoring:**
   - Configurar Sentry (opcional)
   - Monitorear logs en Vercel

---

## 7️⃣ Marketing y SEO

### Google Search Console
1. Agregar propiedad: `https://remesasve.pro`
2. Verificar ownership
3. Enviar sitemap: `https://remesasve.pro/sitemap.xml`

### Meta Tags (Ya configurados)
- Open Graph para Facebook
- Twitter Cards
- Schema.org markup

### Contenido
- [ ] Crear blog posts sobre remesas
- [ ] Guías de uso
- [ ] Comparativas de servicios
- [ ] FAQs

---

## 8️⃣ Monitoreo y Mantenimiento

### Métricas Clave
- **Tráfico:** Google Analytics
- **Performance:** Vercel Analytics
- **Errores:** Vercel Logs
- **Conversiones:** GA4 Events
- **Ingresos:** Dashboard de Afiliados

### Actualizaciones
```bash
# Pull latest changes
git pull origin main

# Vercel auto-deploys on push
git push origin main
```

### Backup
- Supabase hace backups automáticos
- Exportar configuración regularmente
- Git es tu backup de código

---

## 💰 Costos Mensuales Estimados

### Gratis hasta ~10,000 usuarios/mes:
- ✅ Vercel: Gratis (Hobby plan)
- ✅ Supabase: Gratis (hasta 500MB DB)
- ✅ Google Analytics: Gratis
- ✅ Telegram: Gratis

### Costos Variables:
- 🔧 Anthropic Claude: ~$10-50/mes (según uso)
- 🔧 Twilio WhatsApp: ~$20-100/mes (según mensajes)
- 💎 Dominio: ~$12/año

### Escalamiento:
- **Vercel Pro** ($20/mes): Para >100k requests
- **Supabase Pro** ($25/mes): Para >500MB DB
- **Cloudflare** (gratis): CDN y DDoS protection

---

## 🎯 Checklist Final

Antes de lanzar públicamente:

- [ ] Todas las variables de entorno configuradas
- [ ] Supabase database creada y poblada
- [ ] Google Analytics funcionando
- [ ] Dominio personalizado configurado
- [ ] SSL certificate activo (auto con Vercel)
- [ ] PWA instalable en móvil
- [ ] Chatbot responde correctamente
- [ ] Alertas funcionan (test)
- [ ] Lighthouse score 90+
- [ ] SEO optimizado
- [ ] Política de privacidad agregada
- [ ] Términos y condiciones agregados
- [ ] Social media configurado
- [ ] Email de contacto funcional

---

## 🆘 Troubleshooting

### Error: "Failed to load resource"
**Solución:** Verificar variables de entorno en Vercel

### Error: "Supabase connection failed"
**Solución:** Revisar URL y keys, verificar RLS policies

### PWA no se instala
**Solución:** Verificar manifest.json y HTTPS activo

### Chatbot no responde
**Solución:** Verificar ANTHROPIC_API_KEY y créditos

### Build fails
**Solución:**
```bash
# Limpiar caché
rm -rf .next node_modules
npm install
npm run build
```

---

## 📞 Soporte

- **Documentación:** Ver archivos `FUNCIONALIDADES-IMPLEMENTADAS.md`
- **Issues:** GitHub Issues
- **Email:** tu-email@remesasve.pro
- **Discord:** Crear comunidad de usuarios

---

## 🎉 ¡Listo para Lanzar!

Tu plataforma Reme Global está 100% lista para producción.

**Próximos pasos:**
1. Configurar cuentas (30 min)
2. Deploy en Vercel (10 min)
3. Testing completo (30 min)
4. ¡Lanzamiento! 🚀

**Recuerda:**
- Empezar con configuración mínima (Supabase + GA)
- Agregar APIs opcionales según necesidad
- Monitorear métricas diariamente
- Iterar basado en feedback de usuarios

**¡Mucho éxito con Reme Global!** 💪🇻🇪
