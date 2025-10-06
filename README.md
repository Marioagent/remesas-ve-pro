# 🇻🇪 RemesasVE Pro

**La mejor forma de enviar remesas a Venezuela**

Plataforma web/PWA que compara en tiempo real las tasas de cambio de todos los servicios de remesas a Venezuela. Ayuda a los usuarios a ahorrar hasta 8% en cada envío.

## 🎯 Características

- ✅ **Calculadora Multi-Tasa** - Compara tasas en tiempo real (BCV, Paralelo, Binance)
- ✅ **Comparador de Servicios** - 8+ servicios de remesas (Zoom, Reserve, AirTM, etc.)
- ✅ **100% Legal** - No procesamos transacciones, solo comparamos y redirigimos
- ✅ **Landing Page Optimizada** - Diseño mobile-first con Framer Motion
- ⏳ **Alertas de Tasa** - Notificaciones WhatsApp/Telegram (próximamente)
- ⏳ **PWA Instalable** - Funciona offline (próximamente)
- ⏳ **Chatbot IA** - Respuestas inteligentes con RAGMac1 (próximamente)

## 🚀 Stack Tecnológico

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Animaciones:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **APIs:** BCV, DolarToday, PyDolarVE
- **Deploy:** Vercel

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/remesas-ve-pro.git
cd remesas-ve-pro

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus keys

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
npm run start
```

## 🔑 Variables de Entorno

Crear archivo `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_key

# APIs de Tasas (públicas, no requieren key)
NEXT_PUBLIC_BCV_API_URL=https://pydolarve.org/api/v1/dollar
NEXT_PUBLIC_DOLARTODAY_API=https://s3.amazonaws.com/dolartoday/data.json

# Anthropic (para chatbot RAGMac1)
ANTHROPIC_API_KEY=tu_anthropic_key

# Pinecone (para RAGMac1)
PINECONE_API_KEY=tu_pinecone_key
PINECONE_ENVIRONMENT=tu_environment
PINECONE_INDEX_NAME=remesas-ve-docs
```

## 🎨 Estructura del Proyecto

```
remesas-ve-pro/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page principal
│   │   ├── calculadora/          # Página de calculadora
│   │   ├── comparador/           # Comparador de servicios
│   │   └── api/                  # API routes
│   ├── components/
│   │   └── ui/                   # Componentes reutilizables
│   ├── lib/
│   │   ├── supabase.ts           # Cliente Supabase
│   │   ├── utils.ts              # Utilidades
│   │   └── api-clients/
│   │       ├── tasas-api.ts      # API de tasas
│   │       └── servicios-remesas.ts  # Servicios
│   └── types/
│       └── index.ts              # TypeScript types
├── public/                        # Assets estáticos
├── .env.local                     # Variables de entorno
└── README.md
```

## 🌐 Servicios Integrados

1. **Zoom** - 0% comisión, 15-30 min
2. **Reserve** - 1.5% comisión, 5-15 min
3. **AirTM** - 2.99% comisión, 30-60 min
4. **Binance P2P** - 0% comisión, 15-45 min
5. **Western Union** - 3.5% + $8, 1-3 días
6. **MoneyGram** - 3% + $7.5, 1-3 días
7. **Remesa Feliz** - 1% + $2, 1-2 horas
8. **Valiu** - 0.5% comisión, 10-20 min

## 💰 Modelo de Negocio

- **Comisiones por referencia:** $0.50-$2 por transacción referida
- **Plan Premium:** $2-5/mes (alertas avanzadas, múltiples beneficiarios)
- **Afiliación con servicios:** 0.5%-2% de cada transacción
- **Publicidad:** Casas de cambio y servicios de remesas

## 📊 Roadmap

### MVP (Semana 1) ✅
- [x] Landing page con tasas en vivo
- [x] Calculadora básica
- [x] Comparador de servicios
- [x] Diseño responsive

### Fase 2 (Semana 2-3)
- [ ] Sistema de alertas WhatsApp/Telegram
- [ ] Dashboard de usuario
- [ ] Seguimiento de envíos
- [ ] PWA con modo offline

### Fase 3 (Semana 4+)
- [ ] Chatbot IA con RAGMac1
- [ ] Analytics avanzado
- [ ] Sistema de afiliados
- [ ] App móvil nativa

## ⚖️ Legal

**Importante:** RemesasVE Pro NO procesa transacciones financieras. Somos un comparador de información que redirige a servicios legales establecidos. Similar a:
- TripAdvisor (compara hoteles)
- Google Flights (compara vuelos)
- MercadoLibre (compara productos)

Monetizamos a través de comisiones de afiliación, publicidad y suscripciones premium.

## 🚀 Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

O conecta tu repositorio en [vercel.com](https://vercel.com) para deployment automático.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'feat: Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**MarioAgent Team**
- Email: info@remesasve.pro
- Twitter: @RemesasVEPro

## 🙏 Agradecimientos

- PyDolarVE por sus APIs públicas de tasas
- Comunidad venezolana por el feedback
- Next.js y Vercel por las herramientas increíbles

---

**¿Preguntas?** Abre un issue o contáctanos en info@remesasve.pro

**⭐ Si te gusta el proyecto, danos una estrella en GitHub!**
