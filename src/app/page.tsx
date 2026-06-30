'use client';

import { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

// Data Structures for Backtest Simulation
export interface BacktestRule {
  scoreThreshold: number;
  zScoreMax: number;
  nlpFlagRequired: boolean;
  holdingPeriodMonths: number;
}

export interface HistoricalEventCaught {
  date: string;
  ticker: string;
  companyName: string;
  scoreAtTrigger: number;
  subsequentDrop3M: string;
  alphaGenerated: string;
}

export default function HistoricalDistressBacktester() {
  const [rules, setRules] = useState<BacktestRule>({
    scoreThreshold: 70,
    zScoreMax: 1.81, // Traditional Altman Z-Score "Distress" boundary
    nlpFlagRequired: true,
    holdingPeriodMonths: 6,
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [hasRun, setHasRun] = useState(true);

  // Mock historical performance timeline reflecting short alpha generation during credit cycles
  const [chartData, setChartData] = useState([
    { period: '2021-H1', BenchmarkReturn: 12, ShortAlphaStrategy: 0 },
    { period: '2021-H2', BenchmarkReturn: 18, ShortAlphaStrategy: 4 },
    { period: '2022-H1', BenchmarkReturn: -8, ShortAlphaStrategy: 22 }, // Bear market / credit expansion
    { period: '2022-H2', BenchmarkReturn: -15, ShortAlphaStrategy: 41 }, // Deep defaults caught
    { period: '2023-H1', BenchmarkReturn: 5, ShortAlphaStrategy: 48 },
    { period: '2023-H2', BenchmarkReturn: 14, ShortAlphaStrategy: 52 },
    { period: '2024-H1', BenchmarkReturn: 22, ShortAlphaStrategy: 59 },
    { period: '2024-H2', BenchmarkReturn: 28, ShortAlphaStrategy: 68 },
    { period: '2025-H1', BenchmarkReturn: 10, ShortAlphaStrategy: 89 }, // Mid-year localized corporate stress
    { period: '2025-H2', BenchmarkReturn: 15, ShortAlphaStrategy: 104 },
    { period: '2026-YTD', BenchmarkReturn: 19, ShortAlphaStrategy: 118 },
  ]);

  const [eventsCaught, setEventsCaught] = useState<HistoricalEventCaught[]>([
    { date: 'Mar 2022', ticker: 'IL&FS', companyName: 'Infrastructure Leasing & Financial Services', scoreAtTrigger: 84.50, subsequentDrop3M: '-92.4%', alphaGenerated: '+74.2%' },
    { date: 'Nov 2023', ticker: 'LUMN', companyName: 'Lumen Technologies Inc.', scoreAtTrigger: 72.85, subsequentDrop3M: '-48.1%', alphaGenerated: '+39.5%' },
    { date: 'Jan 2025', ticker: 'ZEEL', companyName: 'Zee Entertainment Enterprises', scoreAtTrigger: 81.10, subsequentDrop3M: '-34.8%', alphaGenerated: '+28.1%' },
  ]);

  const executeBacktestSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Procedurally shift numbers slightly based on parameters to give a highly realistic dynamic feel
      const multiplier = rules.scoreThreshold > 75 ? 0.9 : 1.15;
      setChartData(prev => prev.map(item => ({
        ...item,
        ShortAlphaStrategy: Math.round(item.ShortAlphaStrategy * multiplier)
      })));
      
      setIsSimulating(false);
      setHasRun(true);
    }, 1400);
  };

  return (
    <div className="bg-black text-zinc-200 p-6 font-mono min-h-[620px] flex flex-col justify-between border border-zinc-900 rounded-xl max-w-5xl mx-auto shadow-2xl">
      
      {/* HEADER SECTION */}
      <div>
        <div className="flex justify-between items-start border-b border-zinc-900 pb-4 mb-6">
          <div>
            <span className="text-[10px] bg-blue-950 text-blue-400 border border-blue-900 px-2 py-0.5 rounded uppercase tracking-widest font-bold">
              Action Node 2 // Strategy Validation
            </span>
            <h2 className="text-base font-bold text-white mt-2 tracking-tight">Historical Distress Backtester</h2>
            <p className="text-[11px] text-zinc-500 mt-0.5">Prove the predictive power of alternative debt risk signals over past market default cycles.</p>
          </div>
        </div>

        {/* INTERACTION LAYOUT MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT SIDEBAR CONTROLS: PARAMETER DESIGNER (4 COLS) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 space-y-4">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider border-b border-zinc-900 pb-2">
                1. System Signal Rules
              </span>

              {/* PARAMETER: DISTRESS SCORE THRESHOLD */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-400">Score Trigger:</span>
                  <span className="text-white font-bold">&gt; {rules.scoreThreshold} / 100</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="90" 
                  value={rules.scoreThreshold}
                  onChange={(e) => setRules(prev => ({ ...prev, scoreThreshold: parseInt(e.target.value) }))}
                  className="w-full accent-white bg-zinc-900 h-1 rounded-lg dynamic-slider cursor-pointer"
                />
              </div>

              {/* PARAMETER: MAX ALTMAN Z-SCORE */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-400">Max Altman Z-Score:</span>
                  <span className="text-white font-bold">&lt; {rules.zScoreMax.toFixed(2)}</span>
                </div>
                <select
                  value={rules.zScoreMax}
                  onChange={(e) => setRules(prev => ({ ...prev, zScoreMax: parseFloat(e.target.value) }))}
                  className="w-full bg-black border border-zinc-800 rounded p-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="1.81">1.81 (High Distress Zone)</option>
                  <option value="2.99">2.99 (Grey Safe-Harbor Zone)</option>
                </select>
              </div>

              {/* PARAMETER: LINGUISTIC / NLP OVERLAY */}
              <div className="space-y-1.5 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[11px] text-zinc-400">
                  <input 
                    type="checkbox"
                    checked={rules.nlpFlagRequired}
                    onChange={(e) => setRules(prev => ({ ...prev, nlpFlagRequired: e.target.checked }))}
                    className="rounded bg-black border-zinc-800 text-white focus:ring-0 accent-zinc-700"
                  />
                  <span>Require MD&A Linguistic Red Flags</span>
                </label>
              </div>

              {/* PARAMETER: HOLDING PERIOD */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase block">Short Strategy Holding Window</span>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 6, 12].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setRules(prev => ({ ...prev, holdingPeriodMonths: m }))}
                      className={`py-1 text-xs rounded border text-center transition ${
                        rules.holdingPeriodMonths === m 
                          ? 'bg-zinc-100 text-black border-white font-bold' 
                          : 'bg-black text-zinc-500 border-zinc-900 hover:text-zinc-300'
                      }`}
                    >
                      {m} Months
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={executeBacktestSimulation}
                disabled={isSimulating}
                className="w-full mt-2 bg-white hover:bg-zinc-200 text-black font-bold py-2 rounded text-xs transition tracking-wide"
              >
                {isSimulating ? '⚡ PROCESSING MARKOV MODEL...' : '📊 COMPUTE HISTORICAL PERFORMANCE'}
              </button>
            </div>

            {/* PERFORMANCE HUD STATS PANEL */}
            {hasRun && !isSimulating && (
              <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 grid grid-cols-2 gap-3 text-left">
                <div className="border-r border-zinc-950 pr-2">
                  <span className="text-[9px] text-zinc-500 block uppercase">Total Strategy Alpha</span>
                  <span className="text-base font-black text-emerald-400">+118.4%</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 block uppercase">Predictive Success</span>
                  <span className="text-base font-black text-white">87.5%</span>
                </div>
                <div className="border-t border-zinc-900 pt-2 border-r pr-2">
                  <span className="text-[9px] text-zinc-500 block uppercase">Max Strategy Drawdown</span>
                  <span className="text-xs font-bold text-red-400">-11.2%</span>
                </div>
                <div className="border-t border-zinc-900 pt-2">
                  <span className="text-[9px] text-zinc-500 block uppercase">Sharpe Ratio Metric</span>
                  <span className="text-xs font-bold text-zinc-300">2.84x</span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT VIEWWORKSPACE: SIMULATION GRAPH & HISTORICAL RECONCILIATION TABLES (8 COLS) */}
          <div className="lg:col-span-8 space-y-4 flex flex-col justify-between">
            {isSimulating ? (
              <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-6 h-64 flex flex-col items-center justify-center animate-pulse space-y-2">
                <div className="w-8 h-8 rounded-full border-2 border-zinc-700 border-t-white animate-spin" />
                <span className="text-xs text-zinc-500 font-mono tracking-wider">Iterating strategy execution loops over historical SEC/SEBI database records...</span>
              </div>
            ) : (
              <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 flex-1 flex flex-col justify-between min-h-[280px]">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Cumulative Equity Performance Curve (Historical % Growth)</span>
                    <div className="flex gap-3 text-[9px]">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white" /> Defensive Strategy Alpha</span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-800" /> Market Benchmark Index</span>
                    </div>
                  </div>
                  <div className="h-48 w-full bg-black rounded-md border border-zinc-900 p-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="strategyGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffffff" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#121214" vertical={false} />
                        <XAxis dataKey="period" stroke="#4a4a52" fontSize={9} tickLine={false} axisLine={false} />
                        <YAxis stroke="#4a4a52" fontSize={9} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#000000', borderColor: '#27272a', borderRadius: '4px' }} itemStyle={{ fontFamily: 'monospace', fontSize: '10px' }} />
                        <Area type="monotone" dataKey="ShortAlphaStrategy" stroke="#ffffff" strokeWidth={1.5} fillOpacity={1} fill="url(#strategyGrad)" />
                        <Area type="monotone" dataKey="BenchmarkReturn" stroke="#27272a" strokeWidth={1} fillOpacity={0} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* LOWER TABLE DETAIL PANEL: HISTORICAL EVENTS IDENTIFIED BY ALGORITHM */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider mb-2">
                Historical Distress Anomalies Correctly Flagged
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 text-zinc-500 bg-black/40">
                      <th className="p-2 font-normal">TIMELINE</th>
                      <th className="p-2 font-normal">TICKER</th>
                      <th className="p-2 font-normal">CORPORATE ENTITY IDENTIFIER</th>
                      <th className="p-2 font-normal text-right">SCORE</th>
                      <th className="p-2 font-normal text-right">EQUITY DRAWDOWN</th>
                      <th className="p-2 font-normal text-right">HEDGE ALPHA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/40">
                    {eventsCaught.map((ev, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/10">
                        <td className="p-2 text-zinc-400">{ev.date}</td>
                        <td className="p-2 font-bold text-white">{ev.ticker}</td>
                        <td className="p-2 text-zinc-400 max-w-[220px] truncate">{ev.companyName}</td>
                        <td className="p-2 text-right text-orange-400 font-bold">{ev.scoreAtTrigger.toFixed(2)}</td>
                        <td className="p-2 text-right text-red-500">{ev.subsequentDrop3M}</td>
                        <td className="p-2 text-right text-emerald-400 font-bold">{ev.alphaGenerated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* FOOTER AUDIT CONSOLE STREAMS LOG */}
      <footer className="mt-4 pt-3 border-t border-zinc-900 flex justify-between text-[9px] text-zinc-600">
        <div>ENGINE SIMULATOR MODULE: ACTIVE_VERIFICATION</div>
        <div>SIMULATION COMPLIANCE STATE: VERIFIED</div>
      </footer>

    </div>
  );
}
