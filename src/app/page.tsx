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
  nlpScore: number;
  ratioScore: number;
  newsScore: number;
  goingConcern: boolean;
  phrases: string[];
}

const REGISTRY_MOCK_DATABASE: CorporateDebtProfile[] = [
  {
    ticker: 'ZEEL',
    companyName: 'Zee Entertainment Enterprises',
    marketRegion: 'IN_SEBI',
    debtRadarScore: 81.10,
    classification: 'CRITICAL',
    altmanZScore: 1.15,
    debtEbitda: 8.4,
    interestCoverage: 0.45,
    nlpScore: 88.0,
    ratioScore: 85.2,
    newsScore: 68.5,
    goingConcern: true,
    phrases: ['default risk', 'debt restructuring', 'repayment constraints']
  },
  {
    ticker: 'LUMN',
    companyName: 'Lumen Technologies, Inc.',
    marketRegion: 'US_SEC',
    debtRadarScore: 72.85,
    classification: 'CRITICAL',
    altmanZScore: 1.00,
    debtEbitda: 38.4,
    interestCoverage: 0.71,
    nlpScore: 100.0,
    ratioScore: 86.7,
    newsScore: 25.0,
    goingConcern: true,
    phrases: ['significant debt', 'substantial leverage', 'financial distress']
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
    nlpScore: 15.0,
    ratioScore: 22.0,
    newsScore: 40.0,
    goingConcern: false,
    phrases: ['capital expenditures', 'liquidity management']
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
    nlpScore: 5.0,
    ratioScore: 8.5,
    newsScore: 12.0,
    goingConcern: false,
    phrases: ['strategic liquidity', 'robust reserves']
  }
];

export default function DebtRadarEnterpriseTerminal() {
  const [selectedRegion, setSelectedRegion] = useState<'ALL' | 'US_SEC' | 'IN_SEBI'>('ALL');
  const [activeProfile, setActiveProfile] = useState<CorporateDebtProfile>(REGISTRY_MOCK_DATABASE[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'ANALYTICS' | 'CREDIT_MEMO' | 'WEBHOOKS' | 'DEVELOPER'>('ANALYTICS');
  
  // App settings state
  const [webhookUrl, setWebhookUrl] = useState('https://api.institutional-fund.com/v1/alerts');
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [apiKey, setApiKey] = useState('dr_live_4f8c92a10e83b8c4d2931a7f');
  const [criticalAlertTrigger, setCriticalAlertTrigger] = useState<string | null>(
    'CRITICAL TRIGGER: ZEEL scored 81.10/100 (Breached Threshold > 70.00)'
  );

  const filteredRegistry = REGISTRY_MOCK_DATABASE.filter((item) => {
    const matchesRegion = selectedRegion === 'ALL' || item.marketRegion === selectedRegion;
    const matchesSearch = item.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

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
    }, 600);
  };

  const generateNewKey = () => {
    const hex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKey(`dr_live_${hex}`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-red-500';
    if (score >= 70) return 'text-orange-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-emerald-400';
  };

  const sentimentChartPayload = [
    { name: 'Filing NLP', WeightScore: activeProfile.nlpScore }, 
    { name: 'Financial Ratios', WeightScore: activeProfile.ratioScore },
    { name: 'News Sentiment', WeightScore: activeProfile.newsScore }
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
        <div className="w-full bg-red-950/20 border border-red-900/50 rounded-lg p-3 mb-4 flex items-center justify-between text-xs animate-pulse">
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
            <div className="text-white font-bold tracking-tight text-sm">DEBTRADAR // SYSTEM TERMINAL Matrix v1.0</div>
            <p className="text-[10px] text-zinc-500 mt-0.5">Automated Distress Scoring & Alternative Data Routing Layer.</p>
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
          <section className="lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden flex flex-col max-h-[620px]">
            <div className="p-4 border-b border-zinc-900 bg-zinc-900/20">
              <input 
                type="text"
                placeholder="Filter catalog indices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-700"
              />
            </div>

            <div className="overflow-y-auto divide-y divide-zinc-900/60 flex-1">
              {filteredRegistry.map((company) => (
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
              ))}
            </div>
          </section>

          {/* PANEL RIGHT CORE CONSOLE WORKSPACE (8 COLS WITH TABS) */}
          <section className="lg:col-span-8 flex flex-col space-y-4 min-h-[565px]">
            
            {/* WORKSPACE NAVIGATION INTERFACES LAYER */}
            <div className="flex border-b border-zinc-900 bg-zinc-950 p-1 rounded-lg gap-1 border">
              {(['ANALYTICS', 'CREDIT_MEMO', 'WEBHOOKS', 'DEVELOPER'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-[10px] rounded tracking-wider uppercase transition ${
                    activeTab === tab 
                      ? 'bg-zinc-900 text-white font-bold border border-zinc-800' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* CORE CONTENT SWITCH CONTAINER */}
            <div className="flex-1">
              {isProcessing ? (
                /* INTERACTION TRANSITION NETWORK SKELETON LAYER */
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 space-y-6 animate-pulse min-h-[500px]">
                  <div className="flex justify-between items-start border-b border-zinc-900 pb-5">
                    <div className="space-y-2"><div className="h-5 bg-zinc-900 rounded w-48" /><div className="h-3 bg-zinc-900/60 rounded w-32" /></div>
                    <div className="h-9 bg-zinc-900 rounded w-16" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border border-zinc-900 bg-zinc-900/5 p-3 rounded-lg space-y-2">
                        <div className="h-2 bg-zinc-900/60 rounded w-16" /><div className="h-4 bg-zinc-900 rounded w-12" />
                      </div>
                    ))}
                  </div>
                  <div className="h-40 bg-zinc-900/20 rounded-lg border border-zinc-900" />
                </div>
              ) : (
                <>
                  {/* TAB 1: CORE ENGINE ANALYTICS VIEW */}
                  {activeTab === 'ANALYTICS' && (
                    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 min-h-[500px] flex flex-col justify-between shadow-2xl">
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-900 pb-5">
                          <div>
                            <h2 className="text-base font-bold text-white tracking-tight">{activeProfile.companyName}</h2>
                            <p className="text-[10px] text-zinc-500 mt-0.5">REGISTRY ID MASTER: <span className="text-zinc-300">{activeProfile.ticker}</span></p>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Distress Rating Engine</span>
                            <span className={`text-3xl font-black block tracking-tight ${getScoreColor(activeProfile.debtRadarScore)}`}>
                              {activeProfile.debtRadarScore.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                          <div className="border border-zinc-900 bg-zinc-900/10 p-3 rounded-lg">
                            <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Altman Z-Score</span>
                            <span className="text-xs font-bold text-zinc-200">{activeProfile.altmanZScore.toFixed(2)}</span>
                            <div className="w-full bg-zinc-900 h-1 mt-2 rounded-full overflow-hidden">
                              <div className={`h-full ${activeProfile.altmanZScore < 1.81 ? 'bg-orange-500' : 'bg-zinc-700'}`} style={{ width: `${Math.min((activeProfile.altmanZScore / 5) * 100, 100)}%` }} />
                            </div>
                          </div>
                          <div className="border border-zinc-900 bg-zinc-900/10 p-3 rounded-lg">
                            <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Debt / EBITDA</span>
                            <span className="text-xs font-bold text-zinc-200">{activeProfile.debtEbitda}x</span>
                            <div className="w-full bg-zinc-900 h-1 mt-2 rounded-full overflow-hidden">
                              <div className={`h-full ${activeProfile.debtEbitda > 6.0 ? 'bg-orange-500' : 'bg-zinc-700'}`} style={{ width: `${Math.min((activeProfile.debtEbitda / 40) * 100, 100)}%` }} />
                            </div>
                          </div>
                          <div className="border border-zinc-900 bg-zinc-900/10 p-3 rounded-lg">
                            <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Interest Coverage</span>
                            <span className="text-xs font-bold text-zinc-200">{activeProfile.interestCoverage}x</span>
                            <div className="w-full bg-zinc-900 h-1 mt-2 rounded-full overflow-hidden">
                              <div className={`h-full ${activeProfile.interestCoverage < 1.5 ? 'bg-orange-500' : 'bg-zinc-700'}`} style={{ width: `${Math.min((activeProfile.interestCoverage / 20) * 100, 100)}%` }} />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-5 border-t border-zinc-900 space-y-3">
                          <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-widest">Weighted Engine Stress Components</span>
                          <div className="h-44 w-full bg-black rounded-lg border border-zinc-900 p-2">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={sentimentChartPayload} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#141416" vertical={false} />
                                <XAxis dataKey="name" stroke="#4a4a52" fontSize={9} tickLine={false} axisLine={false} />
                                <YAxis stroke="#4a4a52" fontSize={9} tickLine={false} axisLine={false} width={25} />
                                <Tooltip cursor={{ fill: '#141416', opacity: 0.3 }} contentStyle={{ backgroundColor: '#000000', borderColor: '#27272a', borderRadius: '4px' }} itemStyle={{ color: '#ffffff', fontFamily: 'monospace', fontSize: '10px' }} />
                                <Bar dataKey="WeightScore" fill="#ffffff" radius={[2, 2, 0, 0]} maxBarSize={24} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-zinc-900 space-y-2">
                        <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-wider">Linguistic Filing Indicators</span>
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

                  {/* TAB 2: PRO PROFESSIONAL CREDIT REPORT PREVIEW MEMO */}
                  {activeTab === 'CREDIT_MEMO' && (
                    <div className="bg-white text-black rounded-xl p-6 min-h-[500px] flex flex-col justify-between shadow-2xl font-sans border border-zinc-300">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start border-b-2 border-black pb-4">
                          <div>
                            <h1 className="text-xl font-black uppercase tracking-tight">DEBTRADAR CREDIT ANALYTICS REGISTER</h1>
                            <p className="text-xs text-zinc-600 font-mono">COMPILED VIA AUTOMATED ALT-DATA HARVESTER</p>
                          </div>
                          <div className="bg-black text-white px-3 py-1 font-mono text-[10px] rounded uppercase font-bold tracking-wider">
                            PRO SYSTEM MEMO
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-zinc-50 p-3 rounded border border-zinc-200">
                          <div><strong>TARGET ENTITY:</strong> {activeProfile.companyName} ({activeProfile.ticker})</div>
                          <div><strong>COMPLIANCE FRAMEWORK:</strong> {activeProfile.marketRegion === 'US_SEC' ? 'US SEC EDGAR DATA STREAM' : 'INDIA SEBI REGULATORY DISCLOSURE'}</div>
                          <div><strong>RISK COMPILATION INDEX:</strong> {activeProfile.debtRadarScore.toFixed(2)} / 100</div>
                          <div><strong>GOING CONCERN RED FLAG:</strong> {activeProfile.goingConcern ? 'TRUE (DISTRESS TRIGGERED)' : 'FALSE (MONITOR OPTIONAL)'}</div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-800">Automated Pipeline Executive Summary</h3>
                          <p className="text-xs leading-relaxed text-zinc-700">
                            The alternative analytical scoring layer executed calculations across public financial statements, 
                            disclosures, and cross-source news feeds. Linguistic structural parsing identified high levels of 
                            risk within management discussion metadata. Financial leverage models reflect a normalized profile matrix 
                            flagged under the <span className="font-bold underline">{activeProfile.classification}</span> category parameters.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xs font-bold uppercase text-zinc-500 font-mono tracking-wider">Component Weight Matrix Reconciliations</h3>
                          <table className="w-full text-left text-xs font-mono border-collapse">
                            <thead>
                              <tr className="border-b border-zinc-300 text-zinc-500">
                                <th className="pb-1 font-normal">DATA METRIC PIPELINE</th>
                                <th className="pb-1 font-normal text-right">METRIC WEIGHT</th>
                                <th className="pb-1 font-normal text-right">CALCULATED SCORE</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              <tr><td className="py-1.5">Filing Natural Language NLP Core</td><td className="text-right">35%</td><td className="text-right font-bold">{activeProfile.nlpScore.toFixed(1)}/100</td></tr>
                              <tr><td className="py-1.5">Automated Structural Ratio Matrices</td><td className="text-right">35%</td><td className="text-right font-bold">{activeProfile.ratioScore.toFixed(1)}/100</td></tr>
                              <tr><td className="py-1.5">GDELT Global News Sentiment Index</td><td className="text-right">30%</td><td className="text-right font-bold">{activeProfile.newsScore.toFixed(1)}/100</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <button 
                        onClick={() => alert('PDF Core Export Protocol Initiated.')}
                        className="w-full mt-4 bg-black hover:bg-zinc-800 text-white font-mono text-xs font-bold py-2.5 rounded transition flex items-center justify-center gap-2"
                      >
                        📥 EXPORT CERTIFIED COMPLIANCE PDF DOSSIER
                      </button>
                    </div>
                  )}

                  {/* TAB 3: ENTERPRISE NOTIFICATION & WEBHOOK LAYOUT CONFIGURATION */}
                  {activeTab === 'WEBHOOKS' && (
                    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 min-h-[500px] flex flex-col justify-between shadow-2xl">
                      <div className="space-y-5">
                        <div className="border-b border-zinc-900 pb-4">
                          <h2 className="text-sm font-bold text-white tracking-wider">INSTITUTIONAL EVENT STREAMS & WEBHOOKS</h2>
                          <p className="text-[10px] text-zinc-500 mt-0.5">Route real-time credit score alerts to external engineering servers.</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider">Alert Routing Endpoint (HTTP POST URL)</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={webhookUrl}
                              onChange={(e) => { setWebhookUrl(e.target.value); setWebhookSaved(false); }}
                              className="flex-1 bg-black border border-zinc-800 rounded px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-zinc-700"
                            />
                            <button 
                              onClick={() => setWebhookSaved(true)}
                              className="bg-zinc-100 hover:bg-white text-black px-4 py-2 rounded text-xs font-bold transition"
                            >
                              {webhookSaved ? 'SAVED' : 'SAVE'}
                            </button>
                          </div>
                          {webhookSaved && (
                            <p className="text-[9px] text-emerald-500 font-bold">✓ Gateway handshake successful. Endpoint configured to catch payload models.</p>
                          )}
                        </div>

                        <div className="p-4 bg-black border border-zinc-900 rounded-lg space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-300 font-bold">Simulated Enterprise JSON Payload Stream</span>
                            <span className="text-[8px] bg-red-950 border border-red-900 text-red-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">EVENT TRIGGERED</span>
                          </div>
                          
                          <pre className="text-[10px] text-zinc-400 bg-zinc-950 border border-zinc-900/60 p-3 rounded overflow-x-auto text-left font-mono leading-relaxed">
{`{
  "event": "score.threshold.breached",
  "timestamp": "${new Date().toISOString()}",
  "data": {
    "ticker": "${activeProfile.ticker}",
    "company": "${activeProfile.companyName}",
    "score": ${activeProfile.debtRadarScore.toFixed(2)},
    "classification": "${activeProfile.classification}",
    "goingConcern": ${activeProfile.goingConcern}
  }
}`}
                          </pre>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-4 flex justify-between items-center text-[10px]">
                        <span className="text-zinc-500">SYSTEM LISTENER RETRIES: <span className="text-white">3x BACKOFF</span></span>
                        <span className="text-zinc-500">CURRENT REGION SCOPE: <span className="text-white">GLOBAL PIPELINE</span></span>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: DEVELOPER API KEY PLAYGROUND CONSOLE */}
                  {activeTab === 'DEVELOPER' && (
                    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 min-h-[500px] flex flex-col justify-between shadow-2xl">
                      <div className="space-y-5">
                        <div className="border-b border-zinc-900 pb-4">
                          <h2 className="text-sm font-bold text-white tracking-wider">QUANT ALGORITHMIC ACCESS INTERFACE</h2>
                          <p className="text-[10px] text-zinc-500 mt-0.5">Integrate automated corporate score indexing directly into proprietary models.</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider">Active Secure Bearer Token</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              readOnly 
                              value={apiKey} 
                              className="flex-1 bg-black border border-zinc-800 rounded px-3 py-2 text-xs font-mono text-zinc-300 select-all"
                            />
                            <button 
                              onClick={generateNewKey}
                              className="border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-zinc-300 px-3 py-2 rounded text-xs transition font-bold"
                            >
                              ROTATE
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider">Query Terminal Route Endpoint Execution (cURL)</span>
                          <div className="bg-black border border-zinc-900 rounded-lg p-3 overflow-x-auto text-left">
                            <code className="text-[10px] text-zinc-300 block whitespace-pre leading-relaxed">
{`curl -X GET "https://api.debtradar.io/v1/score?ticker=${activeProfile.ticker}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Accept: application/json"`}
                            </code>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider">Asynchronous Data Ingestion (JavaScript Fetch Framework)</span>
                          <div className="bg-black border border-zinc-900 rounded-lg p-3 overflow-x-auto text-left">
                            <code className="text-[10px] text-zinc-400 block whitespace-pre leading-relaxed">
{`const response = await fetch('https://api.debtradar.io/v1/score?ticker=${activeProfile.ticker}', {
  headers: {
    'Authorization': 'Bearer ${apiKey}'
  }
});
const data = await response.json();
console.log(\`Score for \${data.ticker}: \${data.score}\`);`}
                            </code>
                          </div>
                        </div>
                      </div>

                      <div className="text-[9px] text-zinc-600 border-t border-zinc-900 pt-3">
                        REST GATEWAY CLUSTER CODES: STATUS_200_OK // INFRASTRUCTURE SECURED
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

          </section>

        </div>
      </div>

      {/* FOOTER CORE TELEMETRY RECONCILIATION LAYER */}
      <footer className="max-w-7xl w-full mx-auto mt-6 pt-4 border-t border-zinc-900 flex justify-between text-[9px] text-zinc-600">
        <div>PRODUCTION FRONTEND TERMINAL ENGINES</div>
        <div>STATE STATUS: COMPLIANT_AWAITING_SERVER_ROUTING_HOOKS</div>
      </footer>
    </div>
  );
}
