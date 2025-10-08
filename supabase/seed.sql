-- ============================================
-- REME LAT-USA - Database Seed Data
-- Complete services for ALL 13 countries
-- Version: 2.0.0
-- Date: 2025-10-08
-- ============================================

-- ============================================
-- REMITTANCE SERVICES - VENEZUELA
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, affiliate_link, coverage_points, coverage_cities, is_active, is_featured, description) VALUES
('Zoom', 'zoom-ve', '/logos/zoom.svg', 'https://zoom.us', ARRAY['VE'], 0, 0, 'fixed', 15, 30, 'minutos', ARRAY['tarjeta_debito', 'tarjeta_credito', 'cuenta_bancaria'], ARRAY['cuenta_bancaria', 'efectivo'], 4.7, 15234, 'https://zoom.us?ref=remelatusa', 500, ARRAY['Caracas', 'Valencia', 'Maracaibo', 'Barquisimeto'], true, true, 'Servicio líder en Venezuela con 0% de comisión'),

('Reserve', 'reserve-ve', '/logos/reserve.svg', 'https://reserve.com', ARRAY['VE'], 1.5, 1.5, 'percentage', 5, 15, 'minutos', ARRAY['tarjeta_debito', 'crypto', 'cuenta_bancaria'], ARRAY['cuenta_bancaria', 'wallet_digital'], 4.6, 12890, 'https://reserve.com?ref=remelatusa', 450, ARRAY['Caracas', 'Valencia', 'Maracaibo'], true, true, 'Plataforma con mejor tasa en Venezuela'),

('AirTM', 'airtm-ve', '/logos/airtm.svg', 'https://airtm.com', ARRAY['VE'], 2.99, 2.99, 'percentage', 30, 60, 'minutos', ARRAY['tarjeta_credito', 'crypto', 'wallet_digital'], ARRAY['cuenta_bancaria', 'wallet_digital'], 4.3, 8950, 'https://airtm.com?ref=remelatusa', 400, ARRAY['Caracas', 'Maracaibo'], true, false, 'Marketplace P2P con múltiples opciones'),

('Binance P2P', 'binance-p2p-ve', '/logos/binance.svg', 'https://binance.com/es-LA/p2p', ARRAY['VE', 'AR', 'BR', 'CO'], 0, 0.5, 'percentage', 15, 45, 'minutos', ARRAY['crypto', 'cuenta_bancaria'], ARRAY['cuenta_bancaria', 'wallet_digital'], 4.8, 25600, 'https://binance.com/es-LA/p2p?ref=remelatusa', 0, ARRAY['Nacional'], true, true, 'Exchange crypto P2P sin comisiones'),

('Western Union', 'western-union-ve', '/logos/westernunion.svg', 'https://westernunion.com', ARRAY['VE', 'CO', 'CL', 'AR', 'UY', 'BO', 'PA', 'BR', 'EC', 'PE', 'PY', 'GY', 'SR'], 3.5, 8, 'fixed', 10, 30, 'minutos', ARRAY['tarjeta_debito', 'tarjeta_credito', 'efectivo'], ARRAY['efectivo', 'cuenta_bancaria'], 4.4, 45200, 'https://westernunion.com?ref=remelatusa', 1200, ARRAY['Todas las principales'], true, true, 'Red global con mayor cobertura'),

('MoneyGram', 'moneygram-ve', '/logos/moneygram.svg', 'https://moneygram.com', ARRAY['VE', 'CO', 'CL', 'AR', 'UY', 'BO', 'PA', 'BR', 'EC', 'PE', 'PY', 'GY', 'SR'], 3, 7.5, 'fixed', 10, 30, 'minutos', ARRAY['tarjeta_debito', 'tarjeta_credito', 'efectivo'], ARRAY['efectivo', 'cuenta_bancaria'], 4.3, 38900, 'https://moneygram.com?ref=remelatusa', 1000, ARRAY['Todas las principales'], true, true, 'Competidor directo de Western Union');

-- ============================================
-- REMITTANCE SERVICES - COLOMBIA
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('Efecty', 'efecty-co', '/logos/efecty.svg', 'https://efecty.com.co', ARRAY['CO'], 3, 5, 'fixed', 10, 30, 'minutos', ARRAY['tarjeta_debito', 'tarjeta_credito', 'cuenta_bancaria'], ARRAY['efectivo', 'cuenta_bancaria'], 4.5, 12500, 4000, ARRAY['Bogotá', 'Medellín', 'Cali', 'Barranquilla'], true, true),

('Giro Directo', 'giro-directo-co', '/logos/girodirecto.svg', 'https://girodirecto.com', ARRAY['CO'], 2, 4, 'fixed', 15, 45, 'minutos', ARRAY['cuenta_bancaria', 'tarjeta_debito'], ARRAY['efectivo', 'cuenta_bancaria'], 4.3, 8900, 2500, ARRAY['Bogotá', 'Medellín', 'Cali'], true, false),

('SuperGiros', 'supergiros-co', '/logos/supergiros.svg', 'https://supergiros.com.co', ARRAY['CO'], 3, 6, 'fixed', 10, 20, 'minutos', ARRAY['cuenta_bancaria', 'efectivo'], ARRAY['efectivo', 'cuenta_bancaria'], 4.6, 15000, 5000, ARRAY['Todas las principales'], true, true),

('Nequi', 'nequi-co', '/logos/nequi.svg', 'https://nequi.com.co', ARRAY['CO'], 0, 0, 'fixed', 5, 10, 'minutos', ARRAY['wallet_digital', 'cuenta_bancaria'], ARRAY['wallet_digital'], 4.7, 35000, 0, ARRAY['Nacional - Digital'], true, true);

-- ============================================
-- REMITTANCE SERVICES - BRASIL
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('Wise', 'wise-br', '/logos/wise.svg', 'https://wise.com', ARRAY['BR', 'AR', 'CL', 'UY', 'US'], 3, 15, 'mixed', 1, 3, 'días', ARRAY['cuenta_bancaria', 'tarjeta_debito'], ARRAY['cuenta_bancaria'], 4.8, 125000, 0, ARRAY['Nacional - Digital'], true, true),

('Remitly', 'remitly-br', '/logos/remitly.svg', 'https://remitly.com', ARRAY['BR', 'CO', 'EC', 'PE', 'US'], 0, 5, 'fixed', 1, 2, 'días', ARRAY['tarjeta_debito', 'cuenta_bancaria'], ARRAY['cuenta_bancaria'], 4.6, 89000, 0, ARRAY['Nacional - Digital'], true, true),

('Xoom', 'xoom-br', '/logos/xoom.svg', 'https://xoom.com', ARRAY['BR', 'AR', 'CL', 'CO', 'US'], 0, 5, 'fixed', 1, 24, 'horas', ARRAY['paypal', 'cuenta_bancaria'], ARRAY['cuenta_bancaria'], 4.5, 67000, 0, ARRAY['Nacional - Digital'], true, false);

-- ============================================
-- REMITTANCE SERVICES - ARGENTINA
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('Ripio', 'ripio-ar', '/logos/ripio.svg', 'https://ripio.com', ARRAY['AR'], 1, 2, 'percentage', 15, 30, 'minutos', ARRAY['crypto', 'cuenta_bancaria'], ARRAY['crypto', 'cuenta_bancaria'], 4.4, 15600, 0, ARRAY['Nacional - Digital'], true, true),

('Lemon Cash', 'lemoncash-ar', '/logos/lemoncash.svg', 'https://lemon.me', ARRAY['AR'], 1.5, 2.5, 'percentage', 10, 20, 'minutos', ARRAY['crypto', 'cuenta_bancaria'], ARRAY['crypto', 'wallet_digital'], 4.5, 18900, 0, ARRAY['Nacional - Digital'], true, true),

('Buenbit', 'buenbit-ar', '/logos/buenbit.svg', 'https://buenbit.com', ARRAY['AR'], 1, 2, 'percentage', 15, 30, 'minutos', ARRAY['crypto', 'cuenta_bancaria'], ARRAY['crypto', 'cuenta_bancaria'], 4.3, 9800, 0, ARRAY['Nacional - Digital'], true, false);

-- ============================================
-- REMITTANCE SERVICES - CHILE
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('Sigue', 'sigue-cl', '/logos/sigue.svg', 'https://sigue.cl', ARRAY['CL'], 5, 10, 'fixed', 10, 30, 'minutos', ARRAY['tarjeta_debito', 'cuenta_bancaria'], ARRAY['efectivo', 'cuenta_bancaria'], 4.4, 5600, 500, ARRAY['Santiago', 'Valparaíso', 'Concepción'], true, true),

('Ria Chile', 'ria-cl', '/logos/ria.svg', 'https://ria.com/cl', ARRAY['CL', 'PE', 'UY', 'PY'], 3, 8, 'fixed', 15, 60, 'minutos', ARRAY['tarjeta_debito', 'cuenta_bancaria'], ARRAY['efectivo', 'cuenta_bancaria'], 4.2, 4200, 300, ARRAY['Santiago', 'Valparaíso'], true, false),

('Melt', 'melt-cl', '/logos/melt.svg', 'https://melt.cl', ARRAY['CL'], 5, 15, 'mixed', 1, 3, 'días', ARRAY['cuenta_bancaria'], ARRAY['cuenta_bancaria'], 4.8, 12300, 0, ARRAY['Nacional - Digital'], true, true);

-- ============================================
-- REMITTANCE SERVICES - PERÚ
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('Remesur', 'remesur-pe', '/logos/remesur.svg', 'https://remesur.com', ARRAY['PE'], 5, 12, 'fixed', 30, 120, 'minutos', ARRAY['cuenta_bancaria', 'tarjeta_debito'], ARRAY['efectivo', 'cuenta_bancaria'], 4.3, 7800, 800, ARRAY['Lima', 'Arequipa', 'Trujillo'], true, true),

('IME', 'ime-pe', '/logos/ime.svg', 'https://ime.com.pe', ARRAY['PE'], 8, 15, 'fixed', 1, 3, 'días', ARRAY['cuenta_bancaria'], ARRAY['cuenta_bancaria', 'efectivo'], 4.1, 5400, 200, ARRAY['Lima', 'Cusco'], true, false);

-- ============================================
-- REMITTANCE SERVICES - ECUADOR
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('Vigo', 'vigo-ec', '/logos/vigo.svg', 'https://vigo.com', ARRAY['EC', 'BO'], 5, 15, 'fixed', 10, 30, 'minutos', ARRAY['cuenta_bancaria', 'tarjeta_debito'], ARRAY['efectivo', 'cuenta_bancaria'], 4.2, 6700, 600, ARRAY['Quito', 'Guayaquil', 'Cuenca'], true, true),

('Delgado Travel', 'delgado-travel-ec', '/logos/delgado.svg', 'https://delgadotravel.com', ARRAY['EC'], 10, 20, 'fixed', 1, 2, 'horas', ARRAY['efectivo', 'tarjeta_debito'], ARRAY['efectivo'], 4.0, 3200, 400, ARRAY['Quito', 'Guayaquil'], true, false);

-- ============================================
-- REMITTANCE SERVICES - URUGUAY
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('Prex', 'prex-uy', '/logos/prex.svg', 'https://prex.com.uy', ARRAY['UY'], 2, 3, 'percentage', 10, 30, 'minutos', ARRAY['wallet_digital', 'cuenta_bancaria'], ARRAY['wallet_digital', 'cuenta_bancaria'], 4.6, 8900, 0, ARRAY['Nacional - Digital'], true, true),

('Abitab', 'abitab-uy', '/logos/abitab.svg', 'https://abitab.com.uy', ARRAY['UY'], 5, 10, 'fixed', 15, 30, 'minutos', ARRAY['efectivo', 'tarjeta_debito'], ARRAY['efectivo'], 4.3, 5600, 800, ARRAY['Montevideo', 'Punta del Este'], true, true),

('RedPagos', 'redpagos-uy', '/logos/redpagos.svg', 'https://redpagos.com.uy', ARRAY['UY'], 5, 10, 'fixed', 15, 30, 'minutos', ARRAY['efectivo', 'tarjeta_debito'], ARRAY['efectivo'], 4.2, 4800, 700, ARRAY['Montevideo', 'Canelones'], true, false);

-- ============================================
-- REMITTANCE SERVICES - BOLIVIA
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('BCP Remesas', 'bcp-remesas-bo', '/logos/bcp.svg', 'https://bcp.com.bo', ARRAY['BO'], 10, 20, 'fixed', 1, 2, 'días', ARRAY['cuenta_bancaria'], ARRAY['cuenta_bancaria', 'efectivo'], 4.0, 1800, 150, ARRAY['La Paz', 'Santa Cruz', 'Cochabamba'], true, true),

('Prodem', 'prodem-bo', '/logos/prodem.svg', 'https://prodem.com.bo', ARRAY['BO'], 8, 15, 'fixed', 1, 3, 'días', ARRAY['cuenta_bancaria'], ARRAY['cuenta_bancaria'], 3.9, 1200, 100, ARRAY['La Paz', 'Santa Cruz'], true, false);

-- ============================================
-- REMITTANCE SERVICES - PANAMÁ
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('Yappy', 'yappy-pa', '/logos/yappy.svg', 'https://yappy.com.pa', ARRAY['PA'], 0, 0, 'fixed', 1, 5, 'minutos', ARRAY['wallet_digital', 'cuenta_bancaria'], ARRAY['wallet_digital'], 4.8, 45000, 0, ARRAY['Nacional - Digital'], true, true),

('Nequi Panamá', 'nequi-pa', '/logos/nequi.svg', 'https://nequi.com.pa', ARRAY['PA'], 0, 1, 'percentage', 5, 10, 'minutos', ARRAY['wallet_digital', 'cuenta_bancaria'], ARRAY['wallet_digital'], 4.6, 12000, 0, ARRAY['Nacional - Digital'], true, true),

('Nación Servicios', 'nacion-servicios-pa', '/logos/nacion.svg', 'https://nacionservicios.com', ARRAY['PA'], 3, 8, 'fixed', 10, 30, 'minutos', ARRAY['cuenta_bancaria', 'efectivo'], ARRAY['efectivo', 'cuenta_bancaria'], 4.5, 6700, 250, ARRAY['Ciudad de Panamá', 'Colón', 'David'], true, true);

-- ============================================
-- REMITTANCE SERVICES - PARAGUAY
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('Giros Tigo', 'giros-tigo-py', '/logos/giros-tigo.svg', 'https://tigo.com.py/giros', ARRAY['PY'], 5, 12, 'fixed', 30, 60, 'minutos', ARRAY['wallet_digital', 'efectivo'], ARRAY['efectivo', 'wallet_digital'], 4.1, 3400, 400, ARRAY['Asunción', 'Ciudad del Este'], true, true);

-- ============================================
-- REMITTANCE SERVICES - GUYANA
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('Guyana Bank', 'guyana-bank-gy', '/logos/guyana-bank.svg', 'https://guyanabank.com', ARRAY['GY'], 8, 15, 'fixed', 1, 2, 'días', ARRAY['cuenta_bancaria'], ARRAY['cuenta_bancaria'], 3.8, 890, 50, ARRAY['Georgetown'], true, false);

-- ============================================
-- REMITTANCE SERVICES - SURINAM
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, coverage_points, coverage_cities, is_active, is_featured) VALUES
('Suriname Post', 'suriname-post-sr', '/logos/suriname-post.svg', 'https://post.sr', ARRAY['SR'], 10, 18, 'fixed', 2, 4, 'días', ARRAY['efectivo', 'cuenta_bancaria'], ARRAY['efectivo'], 3.7, 560, 30, ARRAY['Paramaribo'], true, false);

-- ============================================
-- REMITTANCE SERVICES - USA (SENDERS)
-- ============================================
INSERT INTO public.remittance_services (name, slug, logo_url, website, country_codes, fee_min, fee_max, fee_type, delivery_time_min, delivery_time_max, delivery_time_unit, payment_methods, delivery_methods, rating, reviews_count, is_active, is_featured, description) VALUES
('Remitly USA', 'remitly-us', '/logos/remitly.svg', 'https://remitly.com', ARRAY['US'], 0, 5, 'mixed', 1, 3, 'días', ARRAY['tarjeta_debito', 'cuenta_bancaria'], ARRAY['cuenta_bancaria'], 4.7, 234000, true, true, 'Líder en remesas desde USA a LATAM'),

('Wise USA', 'wise-us', '/logos/wise.svg', 'https://wise.com', ARRAY['US'], 3, 20, 'mixed', 1, 2, 'días', ARRAY['cuenta_bancaria', 'tarjeta_debito'], ARRAY['cuenta_bancaria'], 4.8, 456000, true, true, 'Mejor tasa real mid-market'),

('Xoom USA', 'xoom-us', '/logos/xoom.svg', 'https://xoom.com', ARRAY['US'], 0, 5, 'fixed', 1, 24, 'horas', ARRAY['paypal', 'cuenta_bancaria', 'tarjeta_debito'], ARRAY['cuenta_bancaria', 'efectivo'], 4.6, 189000, true, true, 'PayPal service - rápido y seguro');
