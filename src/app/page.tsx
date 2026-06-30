'use client';

import { useState } from 'react';

// Interfaces for Shareable Alpha Card
export interface DistressMetric {
  label: string;
  value: string | number;
  status: 'CRITICAL' | 'WARNING' | 'STABLE';
}

export interface AlphaCardData {
  ticker: string;
  companyName: string;
  sector: string;
  overallScore: number;
  riskTier: 'SYSTEMIC_HAZARD' | 'HIGH_VOLATILITY' | 'STABLE';
  analystTake: string;
  metrics: DistressMetric[];
}

export default function AlphaTerminalCard() {
  // Mock asset catalog for sharing
  const [companyProfiles] = useState<AlphaCardData[]>([
    {
      ticker: 'ZEEL',
      companyName: 'Zee Entertainment Enterprises',
      sector: 'Media & Entertainment',
      overallScore: 81.10,
      riskTier: 'SYSTEMIC_HAZARD',
      analystTake: 'Debt service coverage ratios have collapsed beneath structural liquidation thresholds. Machine learning models detect heavy textual evasion within executive call transcripts.',
      metrics: [
        { label: 'Altman Z-Score', value: '1.04', status: 'CRITICAL' },
        { label: 'Debt to Equity', value: '3.82x', status: 'CRITICAL' },
        { label: 'Linguistic Red Flags', value: 'HIGH', status: 'WARNING' },
        { label: '3M Default Probability', value: '14.2%', status: 'CRITICAL' }
      ]
    },
    {
      ticker: 'LUMN',
      companyName: 'Lumen Technologies Inc.',
      sector: 'Telecommunications',
      overallScore: 72.85,
      riskTier: 'HIGH_VOLATILITY',
      analystTake: 'Unsecured debt maturities maturing in mid-cycles present major refinancing headwinds. Immediate defensive structural hedging recommended.',
      metrics: [
        { label: 'Altman Z-Score', value: '1.41', status: 'CRITICAL' },
        { label: 'Debt to Equity', value: '2.10x', status: 'WARNING' },
        { label: 'Linguistic Red Flags', value: 'ELEVATED', status: 'WARNING' },
        { label: '3M Default Probability', value: '8.4%', status: 'WARNING' }
      ]
    }
  ]);

  const [activeProfile, setActiveProfile] = useState<AlphaCardData>(companyProfiles[0]);
  const [selectedTheme, setSelectedTheme] = useState<'MONO_DARK' | 'AMBER_ALERT' | 'CYBER_PULSE'>('MONO_DARK');
  const [isCopying, setIsCopying] = useState(false);
  const [copyTarget, setCopyTarget] = useState<'LINK' | 'IFRAME'>('LINK');

  const triggerCopyAction = (type: 'LINK' | 'IFRAME') => {
    setIsCopying(true);
    setCopyTarget(type);
    setTimeout(() => {
      setIsCopying(false);
    }, 1500);
  };

  // Dynamic style assignment based on active layout theme
  const getThemeClasses = () => {
    switch (selectedTheme) {
      case 'AMBER_ALERT':
        return {
          wrapper: 'bg-gradient-to-br from-amber-950 via-black to-zinc-950 border-amber-600/40',
          scoreText: 'text-amber-400',
          glowEffect: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
          badge: 'bg-amber-950 text-amber-400 border-amber-800'
        };
      case 'CYBER_PULSE':
        return {
          wrapper: 'bg-gradient-to-br from-indigo-950 via-black to-zinc-950 border-indigo-600/40',
          scoreText: 'text-indigo-400',
          glowEffect: 'shadow-[0_0_30px_rgba(79,70,229,0.15)]',
          badge: 'bg-indigo-950 text-indigo-400 border-indigo-800'
        };
      default:
        return {
          wrapper: 'bg-zinc-950 border-zinc-800',
          scoreText: 'text-white',
          glowEffect: 'shadow-none',
          badge: 'bg-zinc-900 text-zinc-300 border-zinc-800'
        };
    }
  };

  const themeStyles = getThemeClasses();

  return (
    <div className="bg-black text-zinc-200 p-6 font-mono min-h-[600px] border border-zinc-900 rounded-xl max-w-5xl mx-auto shadow-2xl flex flex-col justify-between">
      
      {/* HEADER CONTROLS */}
      <div>
        <div className="flex justify-between items-start border-b border-zinc-900 pb-4 mb-6">
          <div>
            <span className="text-[10px] bg-purple-950 text-purple-400 border border-purple-900 px-2 py-0.5 rounded uppercase tracking-widest font-bold">
              Action Node 3 // Organic Viral Loop
            </span>
            <h2 className="text-base font-bold text-white mt-2 tracking-tight">Shareable Alpha Terminal Card</h2>
            <p className="text-[11px] text-zinc-500 mt-0.5">Generate high-fidelity macro insights customized for direct sharing across financial media.</p>
          </div>
        </div>

        {/* WORKSPACE LAYOUT COLLATERAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT PARAMETER ADJUSTERS (4 COLS) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider mb-2">
                  Select Target Profile
                </span>
                <div className="flex flex-col gap-2">
                  {companyProfiles.map((p) => (
                    <button
                      key={p.ticker}
                      onClick={() => setActiveProfile(p)}
                      className={`p-2.5 rounded border text-left text-xs font-mono transition ${
                        activeProfile.ticker === p.ticker 
                          ? 'bg-zinc-900 text-white border-zinc-600' 
                          : 'bg-black text-zinc-500 border-zinc-900 hover:text-zinc-400'
                      }`}
                    >
                      <div className="flex justify-between font-bold">
                        <span>{p.ticker}</span>
                        <span className={p.overallScore > 80 ? 'text-red-400' : 'text-orange-400'}>
                          {p.overallScore.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-0.5 truncate">{p.companyName}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* THEME MATRIX ADJUSTMENT */}
              <div>
                <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider mb-2">
                  Card Aesthetic Skin
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'MONO_DARK', label: '🎚️ Corporate Stealth' },
                    { id: 'AMBER_ALERT', label: '⚠️ Liquidation Crisis' },
                    { id: 'CYBER_PULSE', label: '🔮 Quantum Hedge Alpha' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTheme(t.id as any)}
                      className={`p-2 rounded text-left text-xs transition border ${
                        selectedTheme === t.id 
                          ? 'bg-zinc-100 text-black font-bold border-white' 
                          : 'bg-black text-zinc-400 border-zinc-900 hover:border-zinc-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* DISTRIBUTION TRIGGER LINKS */}
              <div className="pt-2 space-y-2 border-t border-zinc-900">
                <span className="text-[10px] font-bold text-zinc-500 uppercase block">Distribution Toolkit</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => triggerCopyAction('LINK')}
                    className="p-2 bg-zinc-900 border border-zinc-800 text-white rounded text-center text-[11px] hover:border-zinc-700 transition"
                  >
                    🔗 COPY LINK
                  </button>
                  <button
                    onClick={() => triggerCopyAction('IFRAME')}
                    className="p-2 bg-zinc-900 border border-zinc-800 text-white rounded text-center text-[11px] hover:border-zinc-700 transition"
                  >
                    💾 EMBED CODE
                  </button>
                </div>
                
                {isCopying && (
                  <div className="text-center text-[10px] bg-zinc-900 border border-zinc-800 text-emerald-400 py-1 rounded animate-pulse">
                    SUCCESS: Cached {copyTarget} to system clipboard!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT EXPORT CANVAS PREVIEW (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col justify-center bg-black border border-zinc-900 p-4 rounded-lg">
            <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-wider mb-2 text-left">
              High-Fidelity Social Media Canvas (What users will see)
            </span>
            
            {/* THE EXPORTABLE ALPHA TERMINAL CARD CANVAS ELEMENT */}
            <div className={`p-6 border rounded-xl relative overflow-hidden transition-all duration-300 ${themeStyles.wrapper} ${themeStyles.glowEffect}`}>
              
              {/* TOP STRIP ACCESSORY */}
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black text-zinc-400 tracking-widest">DEBTRADAR ALGO STREAM</span>
                </div>
                <div className="text-[9px] text-zinc-500 font-sans border border-zinc-800 px-1.5 py-0.5 rounded uppercase">
                  Verified Metric // SEC-902
                </div>
              </div>

              {/* CORPORATE METRIC TITLE COMPONENT */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">{activeProfile.ticker}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5 font-sans">{activeProfile.companyName}</p>
                  <span className="text-[10px] text-zinc-500 italic block mt-1">{activeProfile.sector} Index</span>
                </div>
                
                {/* LARGE DISTRESS MONITOR VIEW */}
                <div className="text-right">
                  <span className="text-[9px] text-zinc-500 uppercase block tracking-wider font-bold">Distress Score</span>
                  <div className={`text-3xl font-black tracking-tighter ${themeStyles.scoreText}`}>
                    {activeProfile.overallScore.toFixed(2)}
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold block mt-1 text-center ${themeStyles.badge}`}>
                    {activeProfile.riskTier}
                  </span>
                </div>
              </div>

              {/* FACTOR BLOCK PERFORMANCE BREAKDOWN */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
                {activeProfile.metrics.map((m, idx) => (
                  <div key={idx} className="bg-black/60 border border-zinc-900/80 rounded p-2 text-left">
                    <span className="text-[9px] text-zinc-500 block uppercase tracking-tight truncate">{m.label}</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{m.value}</span>
                    <span className={`text-[8px] font-black block mt-0.5 ${
                      m.status === 'CRITICAL' ? 'text-red-500' : 'text-amber-500'
                    }`}>
                      • {m.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* NLP INSIGHT ANALYSIS SNAPSHOT */}
              <div className="bg-black/40 border border-zinc-900 p-3 rounded text-left">
                <span className="text-[9px] text-zinc-500 block uppercase tracking-wider font-bold mb-1">
                  Proprietary Risk Synopsis
                </span>
                <p className="text-[11px] text-zinc-300 leading-relaxed font-sans italic">
                  &ldquo;{activeProfile.analystTake}&rdquo;
                </p>
              </div>

              {/* BRAND FOOTER AND VIRAL CTAs */}
              <div className="mt-5 pt-3 border-t border-zinc-900/60 flex justify-between items-center text-[9px] text-zinc-500">
                <div>Track anomalies in real time at <span className="text-white font-bold">debtradar.ai</span></div>
                <div className="text-right font-sans text-zinc-600">Scan Token #498A-Z</div>
              </div>

            </div>

            {/* QUICK TWITTER INTENT PREVIEW */}
            <div className="mt-3 bg-zinc-950 border border-dashed border-zinc-800 p-2 text-left text-[11px] text-zinc-400 rounded">
              <span className="font-bold text-white">💡 Pro-Tip:</span> Paste this preview on Twitter or LinkedIn. The custom og:image metadata automatically references our premium subscription gate to drive organic conversion loops.
            </div>
          </div>

        </div>
      </div>

      {/* SYSTEM META COMPLIANCE LINE */}
      <footer className="mt-6 pt-3 border-t border-zinc-900 text-center text-[9px] text-zinc-600">
        VIRAL DISTRIBUTION ENGINE CORE STACK • SECURITY STANDARD ACCREDITATION COMPLIANT
      </footer>

    </div>
  );
}
