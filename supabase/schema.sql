-- ============================================
-- REME GLOBAL - Database Schema
-- Supabase PostgreSQL
-- Version: 1.0.0
-- Date: 2025-10-08
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  country_code TEXT,
  phone TEXT,
  language TEXT DEFAULT 'es',
  timezone TEXT DEFAULT 'America/Caracas',

  -- Subscription
  is_premium BOOLEAN DEFAULT false,
  premium_since TIMESTAMP,
  premium_expires TIMESTAMP,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,

  -- Preferences
  preferred_currency TEXT DEFAULT 'USD',
  notification_email BOOLEAN DEFAULT true,
  notification_push BOOLEAN DEFAULT true,
  notification_telegram BOOLEAN DEFAULT false,
  notification_whatsapp BOOLEAN DEFAULT false,
  telegram_chat_id TEXT,
  whatsapp_number TEXT,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  onboarding_completed BOOLEAN DEFAULT false
);

-- RLS Policies for users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- REMITTANCE SERVICES TABLE
-- ============================================
CREATE TABLE public.remittance_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  website TEXT NOT NULL,

  -- Coverage
  country_codes TEXT[] NOT NULL,

  -- Fees
  fee_min DECIMAL(10,2) NOT NULL DEFAULT 0,
  fee_max DECIMAL(10,2) NOT NULL DEFAULT 0,
  fee_type TEXT NOT NULL DEFAULT 'fixed', -- 'fixed', 'percentage', 'mixed'
  fee_currency TEXT DEFAULT 'USD',

  -- Delivery
  delivery_time_min INTEGER NOT NULL, -- in minutes
  delivery_time_max INTEGER NOT NULL,
  delivery_time_unit TEXT NOT NULL DEFAULT 'minutos', -- 'minutos', 'horas', 'días'

  -- Payment methods
  payment_methods TEXT[] DEFAULT '{}',
  delivery_methods TEXT[] DEFAULT '{}',

  -- Ratings
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,

  -- Affiliate
  affiliate_link TEXT,
  affiliate_commission DECIMAL(10,2) DEFAULT 0,

  -- Coverage details
  coverage_points INTEGER DEFAULT 0,
  coverage_cities TEXT[] DEFAULT '{}',

  -- Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,

  -- Metadata
  description TEXT,
  pros TEXT[],
  cons TEXT[],

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_services_country ON public.remittance_services USING GIN(country_codes);
CREATE INDEX idx_services_active ON public.remittance_services(is_active);
CREATE INDEX idx_services_featured ON public.remittance_services(is_featured);

-- RLS Policies for services (public read)
ALTER TABLE public.remittance_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are viewable by everyone"
  ON public.remittance_services FOR SELECT
  USING (true);

-- ============================================
-- RATE ALERTS TABLE
-- ============================================
CREATE TABLE public.rate_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Alert config
  country_code TEXT NOT NULL,
  currency_from TEXT NOT NULL DEFAULT 'USD',
  currency_to TEXT NOT NULL,
  target_rate DECIMAL(10,4) NOT NULL,
  condition TEXT NOT NULL DEFAULT 'below', -- 'below', 'above', 'equals'

  -- Notification preferences
  notification_methods TEXT[] NOT NULL DEFAULT '{email}',

  -- Status
  is_active BOOLEAN DEFAULT true,
  triggered_at TIMESTAMP,
  trigger_count INTEGER DEFAULT 0,
  last_trigger_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  notes TEXT
);

CREATE INDEX idx_alerts_user ON public.rate_alerts(user_id);
CREATE INDEX idx_alerts_active ON public.rate_alerts(is_active) WHERE is_active = true;
CREATE INDEX idx_alerts_country ON public.rate_alerts(country_code);

-- RLS Policies for alerts
ALTER TABLE public.rate_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own alerts"
  ON public.rate_alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own alerts"
  ON public.rate_alerts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts"
  ON public.rate_alerts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own alerts"
  ON public.rate_alerts FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- USER SEARCHES TABLE
-- ============================================
CREATE TABLE public.user_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,

  -- Search details
  country_code TEXT NOT NULL,
  amount_usd DECIMAL(10,2) NOT NULL,
  currency_to TEXT NOT NULL,

  -- Selected service (if any)
  service_id UUID REFERENCES public.remittance_services(id) ON DELETE SET NULL,

  -- Result
  exchange_rate DECIMAL(10,4),
  amount_received DECIMAL(10,2),

  -- Metadata
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_searches_user ON public.user_searches(user_id);
CREATE INDEX idx_searches_country ON public.user_searches(country_code);
CREATE INDEX idx_searches_created ON public.user_searches(created_at DESC);

-- RLS Policies for searches
ALTER TABLE public.user_searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own searches"
  ON public.user_searches FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert searches"
  ON public.user_searches FOR INSERT
  WITH CHECK (true);

-- ============================================
-- AFFILIATE CLICKS TABLE
-- ============================================
CREATE TABLE public.affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  service_id UUID NOT NULL REFERENCES public.remittance_services(id) ON DELETE CASCADE,

  -- Click details
  country_code TEXT,
  amount_usd DECIMAL(10,2),

  -- Tracking
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,

  -- Conversion
  converted BOOLEAN DEFAULT false,
  converted_at TIMESTAMP,
  commission_amount DECIMAL(10,2),

  -- Metadata
  clicked_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_clicks_user ON public.affiliate_clicks(user_id);
CREATE INDEX idx_clicks_service ON public.affiliate_clicks(service_id);
CREATE INDEX idx_clicks_converted ON public.affiliate_clicks(converted);
CREATE INDEX idx_clicks_date ON public.affiliate_clicks(clicked_at DESC);

-- RLS Policies for clicks
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own clicks"
  ON public.affiliate_clicks FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert clicks"
  ON public.affiliate_clicks FOR INSERT
  WITH CHECK (true);

-- ============================================
-- RATES HISTORY TABLE
-- ============================================
CREATE TABLE public.rates_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Rate details
  country_code TEXT NOT NULL,
  currency_from TEXT NOT NULL DEFAULT 'USD',
  currency_to TEXT NOT NULL,
  rate DECIMAL(10,4) NOT NULL,

  -- Source
  source TEXT NOT NULL,
  rate_type TEXT, -- 'oficial', 'blue', 'paralelo', 'mep', 'ccl', 'crypto'

  -- Metadata
  recorded_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rates_country ON public.rates_history(country_code);
CREATE INDEX idx_rates_date ON public.rates_history(recorded_at DESC);
CREATE INDEX idx_rates_lookup ON public.rates_history(country_code, currency_from, currency_to, recorded_at DESC);

-- RLS Policies for rates history (public read)
ALTER TABLE public.rates_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rates history is viewable by everyone"
  ON public.rates_history FOR SELECT
  USING (true);

-- ============================================
-- FAVORITES TABLE
-- ============================================
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.remittance_services(id) ON DELETE CASCADE,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, service_id)
);

CREATE INDEX idx_favorites_user ON public.user_favorites(user_id);

-- RLS Policies for favorites
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON public.user_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own favorites"
  ON public.user_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON public.user_favorites FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.remittance_services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to check free tier limits
CREATE OR REPLACE FUNCTION check_free_tier_alert_limit()
RETURNS TRIGGER AS $$
DECLARE
  alert_count INTEGER;
  is_premium BOOLEAN;
BEGIN
  SELECT users.is_premium INTO is_premium
  FROM public.users
  WHERE id = NEW.user_id;

  IF is_premium THEN
    RETURN NEW;
  END IF;

  SELECT COUNT(*) INTO alert_count
  FROM public.rate_alerts
  WHERE user_id = NEW.user_id AND is_active = true;

  IF alert_count >= 3 THEN
    RAISE EXCEPTION 'Free tier limited to 3 active alerts. Upgrade to Premium for unlimited alerts.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_free_tier_alert_limit
  BEFORE INSERT ON public.rate_alerts
  FOR EACH ROW EXECUTE FUNCTION check_free_tier_alert_limit();

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_premium ON public.users(is_premium) WHERE is_premium = true;
CREATE INDEX idx_users_created ON public.users(created_at DESC);

-- ============================================
-- INITIAL DATA COMMENTS
-- ============================================
COMMENT ON TABLE public.users IS 'User accounts with authentication and subscription details';
COMMENT ON TABLE public.remittance_services IS 'Remittance service providers across 13 countries';
COMMENT ON TABLE public.rate_alerts IS 'User-configured exchange rate alerts';
COMMENT ON TABLE public.user_searches IS 'Search history for analytics and personalization';
COMMENT ON TABLE public.affiliate_clicks IS 'Affiliate click tracking for commission calculation';
COMMENT ON TABLE public.rates_history IS 'Historical exchange rates for charts and analytics';
COMMENT ON TABLE public.user_favorites IS 'User favorite services for quick access';
