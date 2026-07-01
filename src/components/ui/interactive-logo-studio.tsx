'use html';
'use client';

import { useState } from 'react';

type LogoPreset = 'QUANTUM_NODE' | 'VELOCITY_ARROW' | 'TACTICAL_DELTA';
type AccentTheme = 'EMERALD_PROFIT' | 'CYAN_TERMINAL' | 'PULSE_NEON';
type LayoutOrientation = 'SIDE_BY_SIDE' | 'STACKED' | 'ICON_ONLY';

export default function InteractiveLogoStudio() {
  // State for customizing the logo vector
  const [activePreset, setActivePreset] = useState<LogoPreset>('QUANTUM_NODE');
  const [activeTheme, setActiveTheme] = useState<AccentTheme>('EMERALD_PROFIT');
  const [layout, setLayout] = useState<LayoutOrientation>('SIDE_BY_SIDE');
  const [brandText, setBrandText] = useState('ATS');
  const [subText, setSubText] = useState('ALGO SOLUTIONS');
  const [enableGlow, setEnableGlow] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  // Theme color mapping configurations
  const getThemeColors = () => {
    switch (activeTheme) {
      case 'CYAN_TERMINAL':
        return { primary: '#06b6d4', darkBg: 'from-cyan-950/40', glow: 'rgba(6,182,212,0.25)', text: 'text-cyan-400' };
      case 'PULSE_NEON':
        return { primary: '#a855f7', darkBg: 'from-purple-950/40', glow: 'rgba(168,85,247,0.25)', text: 'text-purple-400' };
      default: // EMERALD_PROFIT
        return { primary: '#10b981', darkBg: 'from-emerald-950/40', glow: 'rgba(16,185,129,0.25)', text: 'text-emerald-400' };
    }
  };

  const colors = getThemeColors();

  // Render the selected abstract geometric mathematical logomark
  const renderLogoMark = () => {
    const strokeWidth = 2;
    const color = colors.primary;

    switch (activePreset) {
      case 'VELOCITY_ARROW':
        return (
          <svg className="w-12 h-12 transition-all duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 36L24 20L40 36" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 22L24 6L40 22" stroke={color} strokeWidth={strokeWidth} strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="20" r="3" fill="#ffffff" />
          </svg>
        );
      case 'TACTICAL_DELTA':
        return (
          <svg className="w-12 h-12 transition-all duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 6L42 38H6L24 6Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round"/>
            <path d="M24 16L34 34H14L24 16Z" stroke="#ffffff" strokeWidth={1.5} strokeOpacity="0.7"/>
            <line x1="24" y1="34" x2="24" y2="38" stroke={color} strokeWidth={strokeWidth}/>
          </svg>
        );
      default: // QUANTUM_NODE
        return (
          <svg className="w-12 h-12 transition-all duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="12" height="12" rx="2" stroke={color} strokeWidth={strokeWidth} />
            <rect x="30" y="6" width="12" height="12" rx="2" stroke="#ffffff" strokeWidth={strokeWidth} strokeOpacity="0.6" />
            <rect x="30" y="30" width="12" height="12" rx="2" stroke={color} strokeWidth={strokeWidth} />
            <rect x="6" y="30" width="12" height="12" rx="2" stroke="#ffffff" strokeWidth={strokeWidth} strokeOpacity="0.3" />
            <path d="M18 12H30M12 18V30M36 18V30M18 36H30" stroke={color} strokeWidth={1} strokeDasharray="3 3"/>
          </svg>
        );
    }
  };

  const handleCopySvgMock = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-black text-zinc-200 p-6 font-mono min-h-[650px] border border-zinc-900 rounded-xl max-w-5xl mx-auto shadow-2xl flex flex-col justify-between">
      
      {/* HEADER BLOCK */}
      <div>
        <div className="flex justify-between items-start border-b border-zinc-900 pb-4 mb-6">
          <div>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded uppercase tracking-widest font-bold">
              Identity Matrix Engine // Action 4
            </span>
            <h2 className="text-base font-bold text-white mt-2 tracking-tight">ATS Vector Logo Creator</h2>
            <p className="text-[11px] text-zinc-500 mt-0.5">Design a sharp, data-driven identity matching the latency and precision of a quantitative terminal.</p>
          </div>
        </div>

        {/* WORK PANEL INTERACTION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* CONTROL RACK PANEL (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 space-y-4">
              
              {/* BRAND TEXT TEXTFIELDS */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider">1. Brand Variable Configuration</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-zinc-500 uppercase block mb-1">Primary Header</label>
                    <input 
                      type="text" 
                      value={brandText} 
                      onChange={(e) => setBrandText(e.target.value.toUpperCase())}
                      maxLength={8}
                      className="w-full bg-black border border-zinc-850 rounded p-1.5 text-xs text-white focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-zinc-500 uppercase block mb-1">Sub-Context</label>
                    <input 
                      type="text" 
                      value={subText} 
                      onChange={(e) => setSubText(e.target.value.toUpperCase())}
                      maxLength={18}
                      className="w-full bg-black border border-zinc-850 rounded p-1.5 text-xs text-white focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                </div>
              </div>

              {/* LOGOMARK PRESENTS */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider">2. Core Geometric Icon Blueprint</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['QUANTUM_NODE', 'VELOCITY_ARROW', 'TACTICAL_DELTA'] as LogoPreset[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setActivePreset(p)}
                      className={`p-2 text-[10px] rounded border text-center transition tracking-tighter ${
                        activePreset === p 
                          ? 'bg-zinc-100 text-black border-white font-bold' 
                          : 'bg-black text-zinc-500 border-zinc-900 hover:text-zinc-300'
                      }`}
                    >
                      {p.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLOR CHANNELS */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider">3. Execution Spectrum Accent</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['EMERALD_PROFIT', 'CYAN_TERMINAL', 'PULSE_NEON'] as AccentTheme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTheme(t)}
                      className={`p-2 text-[10px] rounded border text-center transition tracking-tighter ${
                        activeTheme === t 
                          ? 'bg-zinc-900 text-white border-zinc-700 font-bold' 
                          : 'bg-black text-zinc-500 border-zinc-900 hover:text-zinc-300'
                      }`}
                    >
                      {t.split('_')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* LAYOUT ALIGNMENTS */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider">4. Matrix Orientation Grid</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['SIDE_BY_SIDE', 'STACKED', 'ICON_ONLY'] as LayoutOrientation[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLayout(l)}
                      className={`p-2 text-[10px] rounded border text-center transition tracking-tighter ${
                        layout === l 
                          ? 'bg-zinc-900 text-white border-zinc-700 font-bold' 
                          : 'bg-black text-zinc-500 border-zinc-900 hover:text-zinc-300'
                      }`}
                    >
                      {l.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* EXTRA GLOW TOGGLE */}
              <div className="pt-1 flex items-center justify-between border-t border-zinc-900">
                <span className="text-[10px] text-zinc-500 uppercase">Apply High-Frequency Radiancy</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={enableGlow} 
                    onChange={(e) => setEnableGlow(e.target.checked)} 
                    className="sr-only peer"
                  />
                  <div className="w-7 h-4 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-zinc-200 peer-checked:after:bg-black" />
                </label>
              </div>

            </div>
          </div>

          {/* CANVAS PREVIEW AND SYSTEM EXPORT FIELD (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* CANVAS INTERIOR AREA */}
            <div className={`bg-gradient-to-br ${colors.darkBg} via-black to-zinc-950 border border-zinc-900 rounded-lg p-12 h-64 flex items-center justify-center relative transition-all duration-300`}>
              
              <div 
                style={{ boxShadow: enableGlow ? \`0 0 45px \${colors.glow}\` : 'none' }}
                className={`p-6 rounded-xl border border-zinc-900/60 bg-black/70 flex transition-all duration-300 ${
                  layout === 'STACKED' ? 'flex-col text-center items-center gap-3' : 
                  layout === 'ICON_ONLY' ? 'items-center justify-center' : 
                  'flex-row items-center gap-4 text-left'
                }`}
              >
                {/* Render Selected Dynamic SVG Icon */}
                <div className="transform hover:scale-105 transition-transform duration-200">
                  {renderLogoMark()}
                </div>

                {/* Typography Block */}
                {layout !== 'ICON_ONLY' && (
                  <div className="flex flex-col justify-center">
                    <span className="text-2xl font-black text-white tracking-widest leading-none">
                      {brandText || 'ATS'}
                    </span>
                    {subText && (
                      <span className={`text-[9px] tracking-[0.25em] font-bold mt-1 block uppercase ${colors.text}`}>
                        {subText}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* WATERMARK LABELS */}
              <div className="absolute top-2 right-3 text-[8px] text-zinc-600 tracking-wider">PREVIEW CANVAS</div>
              <div className="absolute bottom-2 left-3 text-[8px] text-zinc-700">GRID ALIGNED MATRIX: 48x48px SCALABLE VECTOR</div>
            </div>

            {/* RAW CODE OUTPUT DISPATCH PANEL */}
            <div className="bg-[#12141c] border border-zinc-850 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider">
                  Production Vector Export String
                </span>
                <button
                  onClick={handleCopySvgMock}
                  className="text-[10px] text-white bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded hover:border-zinc-700 transition"
                >
                  {isCopied ? '✓ COPIED TO SYSTEM' : '📋 COPY EXPORT MARKUP'}
                </button>
              </div>

              {/* CONSOLE CODE BLOB DISPLAY */}
              <div className="bg-black border border-zinc-900 p-2.5 rounded text-[10px] text-zinc-500 font-mono select-all overflow-x-auto whitespace-nowrap">
                {\`<!-- High-Velocity Scalable Vector Mark for Asset Terminal Frameworks -->\`}
                <br />
                {\`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="\${colors.primary}">...\`}{layout !== 'ICON_ONLY' ? \`<text font-family="monospace" fill="#FFFFFF">\${brandText}</text>\` : ''}{\`</svg>\`}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* FOOTER METRICS SYSTEM LINE */}
      <footer className="mt-4 pt-3 border-t border-zinc-900 flex justify-between text-[9px] text-zinc-600">
        <div>BRAND BLUEPRINT STACK MODULE v4.2</div>
        <div>VECTOR EXPORT SCHEMATICS COMPLIANT</div>
      </footer>

    </div>
  );
}
