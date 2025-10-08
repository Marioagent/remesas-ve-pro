-- RemesasVE Pro - Supabase Database Schema
-- Ejecutar este script en Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: users (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    nombre TEXT,
    telefono TEXT,
    telegram_id TEXT,
    premium BOOLEAN DEFAULT FALSE,
    alertas_activas INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: alertas
CREATE TABLE IF NOT EXISTS public.alertas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('tasa', 'servicio')),
    fuente TEXT, -- BCV, Paralelo, Binance, etc.
    condicion TEXT NOT NULL CHECK (condicion IN ('mayor', 'menor', 'igual')),
    valor_objetivo DECIMAL(10, 2) NOT NULL,
    canales TEXT[] DEFAULT '{}', -- ['telegram', 'whatsapp', 'email']
    activa BOOLEAN DEFAULT TRUE,
    ultima_ejecucion TIMESTAMP WITH TIME ZONE,
    veces_disparada INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: clicks_afiliados
CREATE TABLE IF NOT EXISTS public.clicks_afiliados (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    servicio_id TEXT NOT NULL,
    monto DECIMAL(10, 2) DEFAULT 0,
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
    ip TEXT,
    user_agent TEXT,
    convertido BOOLEAN DEFAULT FALSE,
    comision_estimada DECIMAL(10, 2) DEFAULT 0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: remesas (para tracking futuro)
CREATE TABLE IF NOT EXISTS public.remesas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE NOT NULL,
    servicio_id TEXT NOT NULL,
    monto_usd DECIMAL(10, 2) NOT NULL,
    tasa_cambio DECIMAL(10, 2) NOT NULL,
    monto_bs DECIMAL(12, 2) NOT NULL,
    comision DECIMAL(10, 2) DEFAULT 0,
    estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'completado', 'cancelado')),
    click_id UUID REFERENCES public.clicks_afiliados(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Table: beneficiarios
CREATE TABLE IF NOT EXISTS public.beneficiarios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE NOT NULL,
    nombre TEXT NOT NULL,
    cedula TEXT,
    telefono TEXT,
    banco TEXT,
    numero_cuenta TEXT,
    tipo_cuenta TEXT CHECK (tipo_cuenta IN ('corriente', 'ahorro', 'pago movil')),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: notificaciones
CREATE TABLE IF NOT EXISTS public.notificaciones (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('alerta', 'promocion', 'sistema')),
    titulo TEXT NOT NULL,
    mensaje TEXT NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_alertas_usuario_id ON public.alertas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_alertas_activa ON public.alertas(activa) WHERE activa = TRUE;
CREATE INDEX IF NOT EXISTS idx_clicks_afiliados_servicio_id ON public.clicks_afiliados(servicio_id);
CREATE INDEX IF NOT EXISTS idx_clicks_afiliados_timestamp ON public.clicks_afiliados(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_clicks_afiliados_usuario_id ON public.clicks_afiliados(usuario_id);
CREATE INDEX IF NOT EXISTS idx_remesas_usuario_id ON public.remesas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_remesas_estado ON public.remesas(estado);
CREATE INDEX IF NOT EXISTS idx_beneficiarios_usuario_id ON public.beneficiarios(usuario_id);
CREATE INDEX IF NOT EXISTS idx_notificaciones_usuario_id ON public.notificaciones(usuario_id);
CREATE INDEX IF NOT EXISTS idx_notificaciones_leida ON public.notificaciones(leida) WHERE leida = FALSE;

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks_afiliados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.remesas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficiarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notificaciones ENABLE ROW LEVEL SECURITY;

-- RLS Policies: usuarios
CREATE POLICY "Users can view own profile"
    ON public.usuarios FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.usuarios FOR UPDATE
    USING (auth.uid() = id);

-- RLS Policies: alertas
CREATE POLICY "Users can view own alertas"
    ON public.alertas FOR SELECT
    USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert own alertas"
    ON public.alertas FOR INSERT
    WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Users can update own alertas"
    ON public.alertas FOR UPDATE
    USING (auth.uid() = usuario_id);

CREATE POLICY "Users can delete own alertas"
    ON public.alertas FOR DELETE
    USING (auth.uid() = usuario_id);

-- RLS Policies: clicks_afiliados (público para tracking)
CREATE POLICY "Anyone can insert clicks"
    ON public.clicks_afiliados FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can view own clicks"
    ON public.clicks_afiliados FOR SELECT
    USING (auth.uid() = usuario_id OR usuario_id IS NULL);

-- RLS Policies: remesas
CREATE POLICY "Users can view own remesas"
    ON public.remesas FOR SELECT
    USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert own remesas"
    ON public.remesas FOR INSERT
    WITH CHECK (auth.uid() = usuario_id);

-- RLS Policies: beneficiarios
CREATE POLICY "Users can view own beneficiarios"
    ON public.beneficiarios FOR SELECT
    USING (auth.uid() = usuario_id);

CREATE POLICY "Users can manage own beneficiarios"
    ON public.beneficiarios FOR ALL
    USING (auth.uid() = usuario_id);

-- RLS Policies: notificaciones
CREATE POLICY "Users can view own notificaciones"
    ON public.notificaciones FOR SELECT
    USING (auth.uid() = usuario_id);

CREATE POLICY "Users can update own notificaciones"
    ON public.notificaciones FOR UPDATE
    USING (auth.uid() = usuario_id);

-- Functions and Triggers

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON public.usuarios
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alertas_updated_at BEFORE UPDATE ON public.alertas
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function: Create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.usuarios (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Auto-create usuario on auth.users insert
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function: Calculate statistics
CREATE OR REPLACE FUNCTION public.get_user_statistics(user_id UUID)
RETURNS TABLE (
    total_enviado DECIMAL,
    numero_envios INTEGER,
    ahorro_estimado DECIMAL,
    servicio_favorito TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COALESCE(SUM(r.monto_usd), 0) as total_enviado,
        COALESCE(COUNT(r.id)::INTEGER, 0) as numero_envios,
        COALESCE(SUM(r.comision * 0.5), 0) as ahorro_estimado,
        COALESCE(
            (SELECT servicio_id
             FROM public.remesas
             WHERE usuario_id = user_id
             GROUP BY servicio_id
             ORDER BY COUNT(*) DESC
             LIMIT 1),
            'N/A'
        ) as servicio_favorito
    FROM public.remesas r
    WHERE r.usuario_id = user_id AND r.estado = 'completado';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Insert sample data (optional, for testing)
-- Uncomment if needed for development

-- INSERT INTO public.clicks_afiliados (servicio_id, monto, ip, user_agent) VALUES
-- ('zoom', 100, '192.168.1.1', 'Mozilla/5.0'),
-- ('reserve', 250, '192.168.1.2', 'Mozilla/5.0'),
-- ('airtm', 500, '192.168.1.3', 'Mozilla/5.0');

-- Success message
SELECT 'RemesasVE Pro database schema created successfully! 🎉' as message;
