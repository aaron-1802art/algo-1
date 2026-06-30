'use client';

import { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

// Global Data Contracts
export interface CorporateDebtProfile {
  ticker: string;
  companyName: string;
  marketRegion: 'US_SEC' | 'IN_SEBI';
  debtRadarScore: number;
  classification: 'HEALTHY' | 'ELEVATED RISK' | 'CRITICAL' | 'IMMINENT DISTRESS';
  altmanZScore: number;
  debtEbitda: number;
  interestCoverage: number;
  phrases: string[];
}

const REGISTRY_MOCK_DATABASE: CorporateDebtProfile[] = [
  {
    ticker: 'LUMN',
    companyName: 'Lumen Technologies, Inc.',
    marketRegion: 'US_SEC',
    debtRadarScore: 72.85,
    classification: 'CRITICAL',
    altmanZScore: 1.00,
    debtEbitda: 38.4,
    interestCoverage: 0.71,
    phrases: ['significant debt', 'substantial leverage', 'financial distress']
  },
  {
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    marketRegion: 'US_SEC',
    debtRadarScore: 8.20,
    classification: 'HEALTHY',
    altmanZScore: 4.85,
    debtEbitda: 1.2,
    interestCoverage: 18.4,
    phrases: ['strategic liquidity', 'robust reserves']
  },
  {
    ticker: 'RELIANCE',
    companyName: 'Reliance Industries Ltd.',
    marketRegion: 'IN_SEBI',
    debtRadarScore: 24.50,
    classification: 'HEALTHY',
    altmanZScore: 3.10,
    debtEbitda: 2.1,
    interestCoverage: 6.4,
    phrases: ['capital expenditures', 'liquidity management']
  },
  {
    ticker: 'ZEEL',
    companyName: 'Zee Entertainment Enterprises',
    marketRegion: 'IN_SEBI',
    debtRadarScore: 81.10,
    classification: 'IMMINENT DISTRESS',
    altmanZScore: 1.15,
    debtEbitda: 8.4,
    interestCoverage: 0.45,
    phrases: ['default risk', 'debt restructuring', 'repayment constraints']
  }
];

export default function DebtRadarEnterpriseTerminal() {
  const [selectedRegion, setSelectedRegion] = useState<'ALL' | 'US_SEC' | 'IN_SEBI'>('ALL');
  const [activeProfile, setActiveProfile] = useState<CorporateDebtProfile>(REGISTRY_MOCK_DATABASE[3]); // Defaulting to ZEEL to match your layout
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [criticalAlertTrigger, setCriticalAlertTrigger] = useState<string | null>(
    'CRITICAL TRIGGER: ZEEL scored 81.10/100 (Breached Threshold > 70.00)'
  );

  const filteredRegistry = REGISTRY_MOCK_DATABASE.filter((item) => {
    const matchesRegion = selectedRegion === 'ALL' || item.marketRegion === selectedRegion;
    const matchesSearch = item.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Simulated Async Database Fetch Lifecycle
  const selectCompanyNode = (profile: CorporateDebtProfile) => {
    if (profile.ticker === activeProfile.ticker && !isProcessing) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setActiveProfile(profile);
      if (profile.debtRadarScore >= 70) {
        setCriticalAlertTrigger(`CRITICAL TRIGGER: ${profile.ticker} scored ${profile.debtRadarScore.toFixed(2)}/100 (Breached Threshold > 70.00)`);
      } else {
        setCriticalAlertTrigger(null);
      }
      setIsProcessing(false);
    }, 750); // Intentionally prolonged delay to display the beautiful skeleton state
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-red-500';
    if (score >= 70) return 'text-orange-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-emerald-400';
  };

  const sentimentChartPayload = [
    { name: 'Altman Z', Metric: activeProfile.altmanZScore * 15 }, 
    { name: 'Debt/EBITDA', Metric: activeProfile.debtEbitda * 2 },
    { name: 'Interest Cover', Metric: activeProfile.interestCoverage * 4 }
  ];

  return (
    <div 
      className="min-h-screen w-full bg-black text-zinc-200 p-4 md:p-6 font-mono selection:bg-zinc-800 flex flex-col justify-between"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* GLOBAL SYSTEM ALERTS DISPATCH BANNER */}
      {criticalAlertTrigger && (
        <div className="w-full bg-red-950/30 border border-red-900/60 rounded-lg p-3 mb-4 flex items-center justify-between text-xs animate-pulse">
          <div className="flex items-center gap-3 text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            <span>{criticalAlertTrigger}</span>
          </div>
          <button onClick={() => setCriticalAlertTrigger(null)} className="text-zinc-600 hover:text-zinc-400">✕</button>
        </div>
      )}

      <div className="max-w-7xl w-full mx-auto space-y-6 flex-1 flex flex-col justify-start">
        
        {/* INTERFACE STRUCTURAL CONTROL HEADER */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-zinc-900">
          <div>
            <div className="text-white font-bold tracking-tight text-sm">DEBTRADAR // MULTI-SOURCE CREDIT RISK ENGINE</div>
            <p className="text-[10px] text-zinc-500 mt-0.5">Continuous corporate file analysis matrix layer.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['ALL', 'US_SEC', 'IN_SEBI'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region as any)}
                className={`px-3 py-1 text-[10px] rounded border transition ${
                  selectedRegion === region 
                    ? 'bg-zinc-100 text-black border-white font-bold' 
                    : 'bg-zinc-950 text-zinc-500 border-zinc-900 hover:text-zinc-300'
                }`}
              >
                {region === 'ALL' ? 'GLOBAL CATALOG' : region}
              </button>
            ))}
          </div>
        </header>

        {/* TWO PANEL INTEGRATED DASHBOARD TERMINAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
          
          {/* PANEL LEFT SIDEBAR: WATCHLIST MONITORING INDEX (4 COLS) */}
          <section className="lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden flex flex-col max-h-[600px]">
            <div className="p-4 border-b border-zinc-900 bg-zinc-900/20">
              <input 
                type="text"
                placeholder="Filter index by ticker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-700"
              />
            </div>

            <div className="overflow-y-auto divide-y divide-zinc-900/60 flex-1">
              {filteredRegistry.length > 0 ? (
                filteredRegistry.map((company) => (
                  <div
                    key={company.ticker}
                    onClick={() => selectCompanyNode(company)}
                    className={`p-3.5 flex items-center justify-between cursor-pointer transition ${
                      activeProfile.ticker === company.ticker 
                        ? 'bg-zinc-900/50 border-l-2 border-white' 
                        : 'hover:bg-zinc-900/20'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        {company.ticker}
                        <span className="text-[8px] bg-zinc-900 text-zinc-500 px-1 rounded uppercase tracking-wide">{company.marketRegion}</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 max-w-[180px] truncate">{company.companyName}</div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-black ${getScoreColor(company.debtRadarScore)}`}>
                        {company.debtRadarScore.toFixed(2)}
                      </span>
                      <div className="text-[8px] text-zinc-600 uppercase tracking-wider">{company.classification}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-zinc-600 italic">No assets match criteria filter.</div>
              )}
            </div>
          </section>

          {/* PANEL RIGHT CORE GRAPHICS CONSOLE WORKSPACE (8 COLS) */}
          <section className="lg:col-span-8 min-h-[530px]">
            {isProcessing ? (
              
              /* HIGH-TECH TERMINAL SKELETON LAYOUT STATE */
              <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 space-y-6 animate-pulse min-h-[530px] flex flex-col justify-between">
                
                {/* Header Skeleton */}
                <div className="flex justify-between items-start border-b border-zinc-900 pb-5">
                  <div className="space-y-2">
                    <div className="h-5 bg-zinc-900 rounded w-48" />
                    <div className="h-3 bg-zinc-900/60 rounded w-32" />
                  </div>
                  <div className="space-y-2 flex flex-col items-end">
                    <div className="h-2 bg-zinc-900/60 rounded w-24" />
                    <div className="h-8 bg-zinc-900 rounded w-16" />
                  </div>
                </div>

                {/* Grid Metric Cards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-zinc-900/60 bg-zinc-900/5 p-3 rounded-lg space-y-3">
                      <div className="h-2 bg-zinc-900/60 rounded w-20" />
                      <div className="h-4 bg-zinc-900 rounded w-12" />
                      <div className="h-1 bg-zinc-900 rounded w-full" />
                    </div>
                  ))}
                </div>

                {/* Chart Frame Skeleton */}
                <div className="space-y-3 pt-4 border-t border-zinc-900">
                  <div className="h-3 bg-zinc-900 rounded w-64" />
                  <div className="h-40 w-full bg-zinc-900/20 rounded-lg border border-zinc-900/40 flex items-end justify-around p-4">
                    <div className="h-32 bg-zinc-900/40 w-8 rounded-t" />
                    <div className="h-24 bg-zinc-900/40 w-8 rounded-t" />
                    <div className="h-12 bg-zinc-900/40 w-8 rounded-t" />
                  </div>
                </div>

                {/* Flags Skeleton */}
                <div className="pt-4 border-t border-zinc-900 space-y-2">
                  <div className="h-2 bg-zinc-900/40 rounded w-36" />
                  <div className="flex gap-2">
                    <div className="h-5 bg-zinc-900/60 rounded w-20" />
                    <div className="h-5 bg-zinc-900/60 rounded w-28" />
                  </div>
                </div>

              </div>
            ) : (
              
              /* PRIMARY ACTIVE PROFILE ENVIRONMENT LAYOUT */
              <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 min-h-[530px] flex flex-col justify-between shadow-2xl transition-all duration-200">
                
                <div>
                  {/* DOSSIER SUMMARY INFOLAYER */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-900 pb-5">
                    <div>
                      <h2 className="text-base font-bold text-white tracking-tight">{activeProfile.companyName}</h2>
                      <p className="text-[10px] text-zinc-500 mt-0.5">REGISTRY MASTER ID KEY: <span className="text-zinc-300">{activeProfile.ticker}</span></p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Computed Debt Distress Rating</span>
                      <span className={`text-3xl font-black block tracking-tight ${getScoreColor(activeProfile.debtRadarScore)}`}>
                        {activeProfile.debtRadarScore.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* CORE METRIC AUDIT GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                    <div className="border border-zinc-900 bg-zinc-900/10 p-3 rounded-lg">
                      <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Altman Z-Score</span>
                      <span className="text-xs font-bold text-zinc-200">{activeProfile.altmanZScore.toFixed(2)}</span>
                      <div className="w-full bg-zinc-900 h-1 mt-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${activeProfile.altmanZScore < 1.81 ? 'bg-orange-500' : 'bg-zinc-700'}`}
                          style={{ width: `${Math.min((activeProfile.altmanZScore / 5) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="border border-zinc-900 bg-zinc-900/10 p-3 rounded-lg">
                      <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Debt / EBITDA</span>
                      <span className="text-xs font-bold text-zinc-200">{activeProfile.debtEbitda}x</span>
                      <div className="w-full bg-zinc-900 h-1 mt-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${activeProfile.debtEbitda > 6.0 ? 'bg-orange-500' : 'bg-zinc-700'}`}
                          style={{ width: `${Math.min((activeProfile.debtEbitda / 40) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="border border-zinc-900 bg-zinc-900/10 p-3 rounded-lg">
                      <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Interest Coverage</span>
                      <span className="text-xs font-bold text-zinc-200">{activeProfile.interestCoverage}x</span>
                      <div className="w-full bg-zinc-900 h-1 mt-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${activeProfile.interestCoverage < 1.5 ? 'bg-orange-500' : 'bg-zinc-700'}`}
                          style={{ width: `${Math.min((activeProfile.interestCoverage / 20) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* INTEGRATED HISTOGRAM ENGINE FRAMEWORK */}
                  <div className="mt-6 pt-5 border-t border-zinc-900 space-y-3">
                    <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-widest">Normalized Component Stress Distribution</span>
                    <div className="h-44 w-full bg-black rounded-lg border border-zinc-900 p-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sentimentChartPayload} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#141416" vertical={false} />
                          <XAxis dataKey="name" stroke="#4a4a52" fontSize={9} tickLine={false} axisLine={false} />
                          <YAxis stroke="#4a4a52" fontSize={9} tickLine={false} axisLine={false} width={25} />
                          <Tooltip
                            cursor={{ fill: '#141416', opacity: 0.3 }}
                            contentStyle={{ backgroundColor: '#000000', borderColor: '#27272a', borderRadius: '4px' }}
                            itemStyle={{ color: '#ffffff', fontFamily: 'monospace', fontSize: '10px' }}
                          />
                          <Bar dataKey="Metric" fill="#ffffff" radius={[2, 2, 0, 0]} maxBarSize={24} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* HIGH RISK NLP PHRASE DETECTION FEED */}
                <div className="mt-4 pt-4 border-t border-zinc-900 space-y-2">
                  <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-wider">Filing Linguistic Red Flags</span>
                  <div className="flex flex-wrap gap-2">
                    {activeProfile.phrases.map((phrase, idx) => (
                      <span key={idx} className="bg-zinc-900/60 border border-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded">
                        "{phrase}"
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </section>

        </div>
      </div>

      {/* FOOTER CORE TELEMETRY RECONCILIATION LAYER */}
      <footer className="max-w-7xl w-full mx-auto mt-6 pt-4 border-t border-zinc-900 flex justify-between text-[9px] text-zinc-600">
        <div>PRODUCTION FRONTEND CORE ENVIRONMENT</div>
        <div>STATE STATUS: AWAITING_SERVER_ROUTING_HOOKS</div>
      </footer>
    </div>
  );
}
