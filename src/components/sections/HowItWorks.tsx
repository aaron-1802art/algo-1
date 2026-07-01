'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAlgo } from '@/context/AlgoContext';
import { Button } from '@/components/ui/button';
import { MessageSquare, Code2, BarChart3, Sparkles, Link2, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const MOCK_DATA = [
  { name: '2020', value: 10000 },
  { name: '2021', value: 12500 },
  { name: '2022', value: 11000 },
  { name: '2023', value: 16000 },
  { name: '2024', value: 24500 },
];

export function HowItWorks() {
  const { demoStrategy, setDemoStrategy, isBrokerConnected, setIsBrokerConnected, activeDemoStep, setActiveDemoStep } = useAlgo();
  
  const [codeTypewriter, setCodeTypewriter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBacktesting, setIsBacktesting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const handleStepClick = (stepIndex: number) => {
    setActiveDemoStep(stepIndex);
  };

  useEffect(() => {
    if (activeDemoStep === 1) {
      setCodeTypewriter('');
      setIsGenerating(true);
      const codeStr = `def initialize(context):\n    context.asset = symbol('AAPL')\n\ndef handle_data(context, data):\n    # Generated from: ${demoStrategy || 'Default logic'}\n    rsi = compute_rsi(context.asset, 14)\n    if rsi < 30:\n        order_target_percent(context.asset, 1.0)\n`;
      let i = 0;
      const interval = setInterval(() => {
        setCodeTypewriter(codeStr.substring(0, i));
        i++;
        if (i > codeStr.length) {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [activeDemoStep, demoStrategy]);

  useEffect(() => {
    if (activeDemoStep === 2) {
      setShowResults(false);
      setIsBacktesting(true);
      const timer = setTimeout(() => {
        setIsBacktesting(false);
        setShowResults(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [activeDemoStep]);

  const smoothTransition: any = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

  return (
    <section className="py-32 bg-[var(--bg)] px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--accent-soft-bg)] text-[var(--accent)] text-[11px] font-bold mb-6 border border-[rgba(76,127,255,0.15)] uppercase tracking-[0.15em]">
            Interactive Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--text-primary)] mb-6 tracking-tight">How it works</h2>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl font-light">Click any card to try the live strategy builder.</p>
        </div>

        {/* Progress Indicator (1 of 6 -> 6 of 6) */}
        <div className="flex items-center justify-center mb-12">
          <div className="text-[var(--text-tertiary)] text-[11px] uppercase tracking-[0.2em] font-bold">
            Step <span className="text-[var(--text-primary)]">{activeDemoStep + 1}</span> of 6
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* STEP 1 */}
          <motion.div 
            layout 
            transition={smoothTransition}
            onClick={() => handleStepClick(0)}
            className={`card cursor-pointer flex flex-col p-8 md:p-10 ${activeDemoStep === 0 ? 'border-[var(--accent)] ring-1 ring-[var(--accent-glow)]' : ''}`}
          >
            <div className="flex flex-col gap-5 mb-6">
              <div className="icon-chip">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.2em] mb-2">Step 1</div>
                <h3 className="text-xl font-heading font-bold text-[var(--text-primary)]">Type strategy in plain English</h3>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {activeDemoStep === 0 ? (
                <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} transition={smoothTransition} className="flex-1 flex flex-col gap-4 mt-2">
                  <textarea 
                    value={demoStrategy}
                    onChange={(e) => setDemoStrategy(e.target.value)}
                    placeholder="e.g. Buy AAPL when RSI < 30 and MACD crosses above signal line"
                    className="w-full h-32 bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg p-4 text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-hover)] transition-colors resize-none placeholder:text-[var(--text-tertiary)]"
                    autoFocus
                  />
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); setActiveDemoStep(1); }} className="w-full h-11 text-[13px]">
                    Generate Code <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              ) : (
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed flex-1">Describe entries, exits, and indicators naturally — no coding required.</p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* STEP 2 */}
          <motion.div 
            layout 
            transition={smoothTransition}
            onClick={() => handleStepClick(1)}
            className={`card cursor-pointer flex flex-col p-8 md:p-10 ${activeDemoStep === 1 ? 'border-[var(--accent)] ring-1 ring-[var(--accent-glow)] md:col-span-2 lg:col-span-1' : ''}`}
          >
            <div className="flex flex-col gap-5 mb-6">
              <div className="icon-chip">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.2em] mb-2">Step 2</div>
                <h3 className="text-xl font-heading font-bold text-[var(--text-primary)]">AI converts it to code</h3>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {activeDemoStep === 1 ? (
                <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} transition={smoothTransition} className="flex-1 bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg p-5 overflow-hidden relative mt-2 shadow-inner">
                  <pre className="text-[11px] font-mono text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">
                    {codeTypewriter}
                  </pre>
                  {isGenerating && <span className="absolute bottom-5 right-5 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span></span>}
                  
                  {!isGenerating && codeTypewriter && (
                    <div className="mt-5 flex justify-end">
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); setActiveDemoStep(2); }} className="h-10 text-[13px]">
                        Run Backtest <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed flex-1">Our AI generates production-ready Python backtest logic instantly.</p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* STEP 3 */}
          <motion.div 
            layout 
            transition={smoothTransition}
            onClick={() => handleStepClick(2)}
            className={`card cursor-pointer flex flex-col p-8 md:p-10 ${activeDemoStep === 2 ? 'border-[var(--accent)] ring-1 ring-[var(--accent-glow)] md:col-span-2 lg:col-span-1' : ''}`}
          >
            <div className="flex flex-col gap-5 mb-6">
              <div className="icon-chip">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.2em] mb-2">Step 3</div>
                <h3 className="text-xl font-heading font-bold text-[var(--text-primary)]">Backtest on historical data</h3>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {activeDemoStep === 2 ? (
                <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} transition={smoothTransition} className="flex-1 flex flex-col mt-2">
                  {isBacktesting ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-10 gap-5 text-[var(--text-secondary)] bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg shadow-inner">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--accent)]"></div>
                      <span className="text-[11px] font-mono tracking-wider">Running backtest 2020–2024...</span>
                    </div>
                  ) : showResults ? (
                    <div className="flex-1 flex flex-col gap-5">
                      <div className="h-32 w-full bg-[var(--surface-raised)] rounded-lg p-2 border border-[var(--border)] shadow-inner">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={MOCK_DATA}>
                            <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                            <Tooltip contentStyle={{ backgroundColor: 'var(--surface-raised)', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }} />
                            <Area type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-between text-[11px] font-mono text-[var(--text-primary)] bg-[var(--surface-raised)] p-3 rounded-lg border border-[var(--border)]">
                        <div className="flex flex-col gap-1"><span className="text-[var(--text-tertiary)] uppercase text-[9px] tracking-widest">Win Rate</span><span className="text-emerald-400">68%</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[var(--text-tertiary)] uppercase text-[9px] tracking-widest">Sharpe</span><span className="text-emerald-400">1.8</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[var(--text-tertiary)] uppercase text-[9px] tracking-widest">Max DD</span><span className="text-rose-400">-12%</span></div>
                      </div>
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); setActiveDemoStep(3); }} className="w-full h-11 text-[13px]">
                        Analyze <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ) : null}
                </motion.div>
              ) : (
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed flex-1">Run against up to 10 years of Polygon market data in seconds.</p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* STEP 4 */}
          <motion.div 
            layout 
            transition={smoothTransition}
            onClick={() => handleStepClick(3)}
            className={`card cursor-pointer flex flex-col p-8 md:p-10 ${activeDemoStep === 3 ? 'border-[var(--accent)] ring-1 ring-[var(--accent-glow)]' : ''}`}
          >
            <div className="flex flex-col gap-5 mb-6">
              <div className="icon-chip">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.2em] mb-2">Step 4</div>
                <h3 className="text-xl font-heading font-bold text-[var(--text-primary)]">See results + AI explanation</h3>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {activeDemoStep === 3 ? (
                <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} transition={smoothTransition} className="flex-1 bg-[var(--surface-raised)] border border-[var(--border)] shadow-inner p-5 rounded-lg flex flex-col gap-4 mt-2">
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    <span className="text-[var(--text-primary)] font-medium">Performance summary:</span> Your strategy captured 85% of upside moves during the 2021 bull run. However, the max drawdown of -12% occurred during the 2022 tech pullback. Consider adding a stop-loss condition to improve risk-adjusted returns.
                  </p>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); setActiveDemoStep(4); }} className="w-full mt-2 h-11 text-[13px]">
                    Deploy Strategy <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              ) : (
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed flex-1">Review equity curves, stats, and a coach-style breakdown of what worked.</p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* STEP 5 */}
          <motion.div 
            layout 
            transition={smoothTransition}
            onClick={() => handleStepClick(4)}
            className={`card cursor-pointer flex flex-col p-8 md:p-10 ${activeDemoStep === 4 ? 'border-[var(--accent)] ring-1 ring-[var(--accent-glow)]' : ''}`}
          >
            <div className="flex flex-col gap-5 mb-6">
              <div className="icon-chip">
                <Link2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.2em] mb-2">Step 5</div>
                <h3 className="text-xl font-heading font-bold text-[var(--text-primary)]">Connect your broker</h3>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {activeDemoStep === 4 ? (
                <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} transition={smoothTransition} className="flex-1 flex flex-col items-center justify-center py-6 gap-6 mt-2">
                  {isBrokerConnected ? (
                    <div className="flex flex-col items-center gap-4 text-emerald-400 w-full bg-[var(--surface-raised)] border border-[rgba(16,185,129,0.2)] rounded-lg p-6">
                      <CheckCircle2 className="w-10 h-10" />
                      <span className="font-semibold text-[13px] tracking-wide">Alpaca Connected</span>
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); setActiveDemoStep(5); }} className="w-full mt-2 h-11 text-[13px]">
                        Go Live <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={(e) => { 
                        e.stopPropagation();
                        const btn = e.currentTarget;
                        btn.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--text-primary)]"></div>';
                        setTimeout(() => setIsBrokerConnected(true), 1500);
                      }}
                      className="w-full h-14 bg-[var(--surface-raised)] border-[var(--border)] gap-3 font-medium text-[13px]"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Connect Alpaca
                    </Button>
                  )}
                </motion.div>
              ) : (
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed flex-1">Link Alpaca paper trading with one click — real markets, zero risk.</p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* STEP 6 */}
          <motion.div 
            layout 
            transition={smoothTransition}
            onClick={() => handleStepClick(5)}
            className={`card cursor-pointer flex flex-col p-8 md:p-10 ${activeDemoStep === 5 ? 'border-[var(--accent)] ring-1 ring-[var(--accent-glow)]' : ''}`}
          >
            <div className="flex flex-col gap-5 mb-6">
              <div className="icon-chip">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.2em] mb-2">Step 6</div>
                <h3 className="text-xl font-heading font-bold text-[var(--text-primary)]">Strategy runs live 24/7</h3>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {activeDemoStep === 5 ? (
                <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} transition={smoothTransition} className="flex-1 flex flex-col gap-4 mt-2">
                  <div className="flex items-center justify-between p-4 bg-[var(--surface-raised)] border border-[var(--border)] shadow-inner rounded-lg">
                    <span className="text-[12px] font-medium text-[var(--text-secondary)]">Status</span>
                    <span className="flex items-center gap-2 text-[var(--accent)] text-[10px] font-bold bg-[var(--accent-soft-bg)] px-3 py-1.5 rounded-full border border-[rgba(76,127,255,0.15)] tracking-widest">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                      </span>
                      LIVE
                    </span>
                  </div>
                  <div className="bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg p-4 text-[10px] font-mono text-[var(--text-tertiary)] h-28 overflow-hidden relative shadow-inner">
                    <motion.div
                      animate={{ y: [0, -28] }}
                      transition={{ ease: "linear", duration: 3, repeat: Infinity }}
                      className="flex flex-col gap-3 leading-relaxed"
                    >
                      <div>[14:02:01] Evaluating RSI conditions...</div>
                      <div>[14:02:03] RSI at 28.5 (Oversold)</div>
                      <div className="text-[var(--accent)] font-bold bg-[var(--accent-soft-bg)] p-1 rounded -mx-1 px-2">[14:02:05] EXECUTE: BUY 10 AAPL @ MKT</div>
                      <div>[14:02:06] Order filled at $173.50</div>
                      <div>[14:02:10] Monitoring trailing stop...</div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed flex-1">Your algorithm monitors markets and executes while you sleep.</p>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
