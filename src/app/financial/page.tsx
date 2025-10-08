'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  TrendingUp,
  MapPin,
  Phone,
  Globe,
  ChevronRight,
  Search,
  Filter,
  ArrowUpRight,
  Star
} from 'lucide-react'

// Importar todos los datos globales
import { BRAZIL_BANKS, BRAZIL_EXCHANGE_HOUSES, BRAZIL_FINANCIAL_DISTRICTS } from '@/data/financial-institutions'
import { NORTH_AMERICA_BANKS, NORTH_AMERICA_EXCHANGE_HOUSES, NORTH_AMERICA_FINANCIAL_DISTRICTS } from '@/data/north-america-institutions'
import { EUROPE_BANKS, EUROPE_EXCHANGE_HOUSES, EUROPE_FINANCIAL_DISTRICTS } from '@/data/europe-institutions'
import { ASIA_BANKS, ASIA_EXCHANGE_HOUSES, ASIA_FINANCIAL_DISTRICTS } from '@/data/asia-institutions'
import {
  MIDDLE_EAST_BANKS, MIDDLE_EAST_EXCHANGE_HOUSES, MIDDLE_EAST_FINANCIAL_DISTRICTS,
  OCEANIA_BANKS, OCEANIA_EXCHANGE_HOUSES, OCEANIA_FINANCIAL_DISTRICTS,
  AFRICA_BANKS, AFRICA_EXCHANGE_HOUSES, AFRICA_FINANCIAL_DISTRICTS
} from '@/data/middle-east-oceania-africa-institutions'

// Paleta corporativa profesional
const colors = {
  primary: '#1a365d',
  secondary: '#2c5282',
  accent: '#805ad5',
  success: '#38a169',
  text: '#2d3748',
  textLight: '#718096',
  bg: '#f7fafc',
  bgCard: '#ffffff',
  border: '#e2e8f0'
}

type ContinentCode = 'ALL' | 'SA' | 'NA' | 'EU' | 'AS' | 'ME' | 'OC' | 'AF'

const CONTINENTS = [
  { code: 'ALL', name: 'Todo el Mundo', emoji: '🌍', countries: 195 },
  { code: 'SA', name: 'América del Sur', emoji: '🌎', countries: 13 },
  { code: 'NA', name: 'América del Norte', emoji: '🌎', countries: 3 },
  { code: 'EU', name: 'Europa', emoji: '🇪🇺', countries: 44 },
  { code: 'AS', name: 'Asia', emoji: '🌏', countries: 48 },
  { code: 'ME', name: 'Medio Oriente', emoji: '🕌', countries: 14 },
  { code: 'OC', name: 'Oceanía', emoji: '🏝️', countries: 2 },
  { code: 'AF', name: 'África', emoji: '🦁', countries: 54 }
] as const

export default function GlobalFinancialSystemPage() {
  const [selectedContinent, setSelectedContinent] = useState<ContinentCode>('ALL')
  const [selectedView, setSelectedView] = useState<'banks' | 'exchange' | 'districts'>('banks')
  const [searchQuery, setSearchQuery] = useState('')

  // Consolidar todos los datos
  const allBanks = useMemo(() => [
    ...BRAZIL_BANKS,
    ...NORTH_AMERICA_BANKS,
    ...EUROPE_BANKS,
    ...ASIA_BANKS,
    ...MIDDLE_EAST_BANKS,
    ...OCEANIA_BANKS,
    ...AFRICA_BANKS
  ], [])

  const allExchangeHouses = useMemo(() => [
    ...BRAZIL_EXCHANGE_HOUSES,
    ...NORTH_AMERICA_EXCHANGE_HOUSES,
    ...EUROPE_EXCHANGE_HOUSES,
    ...ASIA_EXCHANGE_HOUSES,
    ...MIDDLE_EAST_EXCHANGE_HOUSES,
    ...OCEANIA_EXCHANGE_HOUSES,
    ...AFRICA_EXCHANGE_HOUSES
  ], [])

  const allFinancialDistricts = useMemo(() => [
    ...BRAZIL_FINANCIAL_DISTRICTS,
    ...NORTH_AMERICA_FINANCIAL_DISTRICTS,
    ...EUROPE_FINANCIAL_DISTRICTS,
    ...ASIA_FINANCIAL_DISTRICTS,
    ...MIDDLE_EAST_FINANCIAL_DISTRICTS,
    ...OCEANIA_FINANCIAL_DISTRICTS,
    ...AFRICA_FINANCIAL_DISTRICTS
  ], [])

  // Filtrar por continente
  const filteredBanks = useMemo(() => {
    let banks = allBanks

    // Filtrar por continente
    if (selectedContinent !== 'ALL') {
      const continentCountries: Record<ContinentCode, string[]> = {
        ALL: [],
        SA: ['BR', 'AR', 'CL', 'CO', 'VE', 'UY', 'BO', 'PE', 'EC', 'PY'],
        NA: ['US', 'CA', 'MX'],
        EU: ['GB', 'DE', 'FR', 'IT', 'ES', 'CH'],
        AS: ['CN', 'JP', 'IN', 'SG', 'KR'],
        ME: ['AE', 'SA', 'QA', 'IL'],
        OC: ['AU', 'NZ'],
        AF: ['ZA']
      }
      banks = banks.filter(bank => continentCountries[selectedContinent]?.includes(bank.country))
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      banks = banks.filter(bank =>
        bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bank.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return banks
  }, [allBanks, selectedContinent, searchQuery])

  const filteredExchangeHouses = useMemo(() => {
    let houses = allExchangeHouses

    if (selectedContinent !== 'ALL') {
      const continentCountries: Record<ContinentCode, string[]> = {
        ALL: [],
        SA: ['BR', 'AR', 'CL', 'CO', 'VE', 'UY', 'BO', 'PE', 'EC', 'PY'],
        NA: ['US', 'CA', 'MX'],
        EU: ['GB', 'DE', 'FR', 'IT', 'ES', 'CH'],
        AS: ['CN', 'JP', 'IN', 'SG', 'KR'],
        ME: ['AE', 'SA', 'QA', 'IL'],
        OC: ['AU', 'NZ'],
        AF: ['ZA']
      }
      houses = houses.filter(house => continentCountries[selectedContinent]?.includes(house.country))
    }

    if (searchQuery) {
      houses = houses.filter(house =>
        house.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return houses
  }, [allExchangeHouses, selectedContinent, searchQuery])

  const filteredDistricts = useMemo(() => {
    let districts = allFinancialDistricts

    if (selectedContinent !== 'ALL') {
      const continentCountries: Record<ContinentCode, string[]> = {
        ALL: [],
        SA: ['BR', 'AR', 'CL', 'CO', 'VE', 'UY', 'BO', 'PE', 'EC', 'PY'],
        NA: ['US', 'CA', 'MX'],
        EU: ['GB', 'DE', 'FR', 'IT', 'ES', 'CH'],
        AS: ['CN', 'JP', 'IN', 'SG', 'KR'],
        ME: ['AE', 'SA', 'QA', 'IL'],
        OC: ['AU', 'NZ'],
        AF: ['ZA']
      }
      districts = districts.filter(district => continentCountries[selectedContinent]?.includes(district.country))
    }

    if (searchQuery) {
      districts = districts.filter(district =>
        district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        district.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return districts
  }, [allFinancialDistricts, selectedContinent, searchQuery])

  const stats = useMemo(() => ({
    totalBanks: filteredBanks.length,
    totalExchanges: filteredExchangeHouses.length,
    totalDistricts: filteredDistricts.length,
    tier1Banks: filteredBanks.filter(b => b.tier === 'tier1').length,
    countries: new Set(filteredBanks.map(b => b.country)).size
  }), [filteredBanks, filteredExchangeHouses, filteredDistricts])

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'tier1': return colors.accent
      case 'tier2': return colors.primary
      case 'tier3': return colors.secondary
      default: return colors.textLight
    }
  }

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'tier1': return 'Tier 1 - Global'
      case 'tier2': return 'Tier 2 - Regional'
      case 'tier3': return 'Tier 3 - Nacional'
      case 'tier4': return 'Tier 4 - Local'
      case 'tier5': return 'Tier 5 - Digital'
      default: return tier
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.bg }}>
      {/* Header */}
      <header style={{
        backgroundColor: colors.bgCard,
        borderBottom: `1px solid ${colors.border}`,
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Globe size={28} style={{ color: colors.primary }} />
              <div>
                <h1 style={{
                  margin: 0,
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: colors.primary,
                  letterSpacing: '-0.02em'
                }}>
                  Sistema Financiero Global
                </h1>
                <p style={{
                  margin: 0,
                  fontSize: '0.8rem',
                  color: colors.textLight,
                  marginTop: '0.25rem'
                }}>
                  {stats.totalBanks} bancos • {stats.totalExchanges} casas de cambio • {stats.countries} países
                </p>
              </div>
            </div>

            <nav style={{ display: 'flex', gap: '2rem' }}>
              <a href="/" style={{ color: colors.textLight, fontSize: '0.9rem', textDecoration: 'none' }}>
                Inicio
              </a>
              <a href="/dashboard" style={{ color: colors.textLight, fontSize: '0.9rem', textDecoration: 'none' }}>
                Dashboard
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            { label: 'Bancos Totales', value: stats.totalBanks, icon: Building2, color: colors.primary },
            { label: 'Tier 1 Global', value: stats.tier1Banks, icon: Star, color: colors.accent },
            { label: 'Casas de Cambio', value: stats.totalExchanges, icon: TrendingUp, color: colors.success },
            { label: 'Distritos Financieros', value: stats.totalDistricts, icon: MapPin, color: colors.secondary },
            { label: 'Países', value: stats.countries, icon: Globe, color: colors.text }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              style={{
                backgroundColor: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <stat.icon size={20} style={{ color: stat.color }} />
                <span style={{ fontSize: '0.75rem', color: colors.textLight, textTransform: 'uppercase', fontWeight: 600 }}>
                  {stat.label}
                </span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color }}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filtros de Continente */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: colors.text, marginBottom: '1rem' }}>
            Filtrar por Continente
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0.75rem'
          }}>
            {CONTINENTS.map(continent => (
              <button
                key={continent.code}
                onClick={() => setSelectedContinent(continent.code)}
                style={{
                  backgroundColor: selectedContinent === continent.code ? colors.primary : colors.bgCard,
                  color: selectedContinent === continent.code ? 'white' : colors.text,
                  border: `1px solid ${selectedContinent === continent.code ? colors.primary : colors.border}`,
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  justifyContent: 'center'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{continent.emoji}</span>
                <div style={{ textAlign: 'left' }}>
                  <div>{continent.name}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                    {continent.countries} países
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div style={{
          backgroundColor: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Search size={20} style={{ color: colors.textLight }} />
          <input
            type="text"
            placeholder="Buscar bancos, casas de cambio, distritos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '0.9rem',
              color: colors.text,
              backgroundColor: 'transparent'
            }}
          />
        </div>

        {/* Selector de vista */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          borderBottom: `1px solid ${colors.border}`,
          paddingBottom: '0.5rem'
        }}>
          {[
            { value: 'banks', label: 'Bancos', icon: Building2 },
            { value: 'exchange', label: 'Casas de Cambio', icon: TrendingUp },
            { value: 'districts', label: 'Distritos Financieros', icon: MapPin }
          ].map(view => (
            <button
              key={view.value}
              onClick={() => setSelectedView(view.value as any)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${selectedView === view.value ? colors.primary : 'transparent'}`,
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                color: selectedView === view.value ? colors.primary : colors.textLight,
                fontWeight: selectedView === view.value ? 600 : 400,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <view.icon size={16} />
              {view.label} ({selectedView === 'banks' ? filteredBanks.length : selectedView === 'exchange' ? filteredExchangeHouses.length : filteredDistricts.length})
            </button>
          ))}
        </div>

        {/* Vista de Bancos */}
        {selectedView === 'banks' && (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {filteredBanks.map((bank, idx) => (
              <motion.div
                key={bank.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                style={{
                  backgroundColor: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                whileHover={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  borderColor: colors.primary
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: colors.text }}>
                        {bank.name}
                      </h4>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.6rem',
                        backgroundColor: getTierBadgeColor(bank.tier),
                        color: 'white',
                        borderRadius: '12px',
                        fontWeight: 600
                      }}>
                        {getTierLabel(bank.tier)}
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.6rem',
                        backgroundColor: colors.bg,
                        color: colors.textLight,
                        borderRadius: '12px',
                        fontWeight: 500
                      }}>
                        {bank.country}
                      </span>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem',
                      marginTop: '0.75rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: colors.textLight, marginBottom: '0.25rem' }}>
                          Sucursales
                        </div>
                        <div style={{ fontSize: '0.9rem', color: colors.text, fontWeight: 600 }}>
                          {bank.branches.toLocaleString()}+
                        </div>
                      </div>
                      {bank.locations[0] && (
                        <div>
                          <div style={{ fontSize: '0.7rem', color: colors.textLight, marginBottom: '0.25rem' }}>
                            Sede Principal
                          </div>
                          <div style={{ fontSize: '0.85rem', color: colors.text, fontWeight: 500 }}>
                            {bank.locations[0].city}, {bank.locations[0].district}
                          </div>
                        </div>
                      )}
                      <div>
                        <div style={{ fontSize: '0.7rem', color: colors.textLight, marginBottom: '0.25rem' }}>
                          Comisión Cambio
                        </div>
                        <div style={{ fontSize: '0.85rem', color: colors.success, fontWeight: 600 }}>
                          {bank.fees.exchangeCommission.min}-{bank.fees.exchangeCommission.max}%
                        </div>
                      </div>
                      {bank.swift && (
                        <div>
                          <div style={{ fontSize: '0.7rem', color: colors.textLight, marginBottom: '0.25rem' }}>
                            SWIFT
                          </div>
                          <div style={{ fontSize: '0.85rem', color: colors.text, fontWeight: 500, fontFamily: 'monospace' }}>
                            {bank.swift}
                          </div>
                        </div>
                      )}
                    </div>

                    {bank.phone && (
                      <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: colors.textLight }}>
                        <Phone size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {bank.phone}
                      </div>
                    )}
                  </div>

                  <ArrowUpRight size={20} style={{ color: colors.textLight }} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Vista de Casas de Cambio */}
        {selectedView === 'exchange' && (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {filteredExchangeHouses.map((house, idx) => (
              <motion.div
                key={house.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                style={{
                  backgroundColor: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: colors.text }}>
                        {house.name}
                      </h4>
                      {house.rating && (
                        <span style={{ fontSize: '0.8rem', color: colors.textLight }}>
                          ⭐ {house.rating}
                        </span>
                      )}
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.6rem',
                        backgroundColor: colors.bg,
                        color: colors.textLight,
                        borderRadius: '12px',
                        fontWeight: 500
                      }}>
                        {house.country}
                      </span>
                    </div>

                    {house.locations[0] && (
                      <div style={{ fontSize: '0.85rem', color: colors.textLight, marginBottom: '0.75rem' }}>
                        <MapPin size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {house.locations[0].city} - {house.locations[0].address}
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: colors.textLight, marginBottom: '0.25rem' }}>
                          Monedas Disponibles
                        </div>
                        <div style={{ fontSize: '0.85rem', color: colors.text, fontWeight: 500 }}>
                          {house.currencies.slice(0, 5).join(', ')}
                          {house.currencies.length > 5 && ` +${house.currencies.length - 5}`}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: colors.textLight, marginBottom: '0.25rem' }}>
                          Comisión
                        </div>
                        <div style={{ fontSize: '0.85rem', color: colors.success, fontWeight: 600 }}>
                          {house.commission.min}-{house.commission.max}%
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: colors.textLight, marginBottom: '0.25rem' }}>
                          Horario
                        </div>
                        <div style={{ fontSize: '0.85rem', color: colors.text, fontWeight: 500 }}>
                          {house.hours}
                        </div>
                      </div>
                    </div>

                    {house.phone && (
                      <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: colors.textLight }}>
                        <Phone size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {house.phone}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Vista de Distritos */}
        {selectedView === 'districts' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {filteredDistricts.map((district, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02 }}
                style={{
                  backgroundColor: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}
              >
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 600, color: colors.text }}>
                      {district.name}
                    </h4>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.6rem',
                      backgroundColor: district.tier === 1 ? colors.accent : colors.secondary,
                      color: 'white',
                      borderRadius: '12px',
                      fontWeight: 600
                    }}>
                      Tier {district.tier}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: colors.textLight }}>
                    {district.city}, {district.country}
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: colors.textLight, marginBottom: '1rem', lineHeight: 1.5 }}>
                  {district.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: colors.textLight }}>Bancos</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: colors.primary }}>{district.banks}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: colors.textLight }}>Cambios</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: colors.accent }}>{district.exchangeHouses}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: colors.textLight }}>Oficinas</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: colors.success }}>{district.corporateOffices}</div>
                  </div>
                </div>

                <div style={{
                  fontSize: '0.75rem',
                  color: colors.text,
                  padding: '0.75rem',
                  backgroundColor: colors.bg,
                  borderRadius: '6px',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>🚇 Acceso</div>
                  {district.accessibility}
                </div>

                {district.majorInstitutions && (
                  <div style={{
                    fontSize: '0.75rem',
                    color: colors.text,
                    padding: '0.75rem',
                    backgroundColor: colors.bg,
                    borderRadius: '6px'
                  }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>🏢 Instituciones Principales</div>
                    {district.majorInstitutions.join(' • ')}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {((selectedView === 'banks' && filteredBanks.length === 0) ||
          (selectedView === 'exchange' && filteredExchangeHouses.length === 0) ||
          (selectedView === 'districts' && filteredDistricts.length === 0)) && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: colors.bgCard,
            borderRadius: '8px',
            border: `1px solid ${colors.border}`
          }}>
            <Search size={48} style={{ color: colors.textLight, marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.text, marginBottom: '0.5rem' }}>
              No se encontraron resultados
            </h3>
            <p style={{ fontSize: '0.9rem', color: colors.textLight }}>
              Intenta con otro continente o búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
