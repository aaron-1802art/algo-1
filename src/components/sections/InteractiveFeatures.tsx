'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquareText, Code2, BarChart3, Sparkles, Link2, Zap, Loader2, Play, CheckCircle2 } from 'lucide-react';
import { useAppState } from '@/context/AppStateContext';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const mockData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 110 },
  { name: 'Mar', value: 105 },
  { name: 'Apr', value: 125 },
  { name: 'May', value: 140 },
  { name: 'Jun', value: 130 },
  { name: 'Jul', value: 160 },
  { name: 'Aug', value: 185 },
];

export function InteractiveFeatures() {
  const { activeDemoStep, setActiveDemoStep, setActiveModal, isBrokerConnected } = useAppState();

  const handleCardClick = (step: number) => {
    if (activeDemoStep === step) {
      setActiveDemoStep(0); // Close if clicked again
    } else {
      setActiveDemoStep(step);
      if (step === 5) {
        setActiveModal('connectBroker');
      }
    }
  };

  return (
    <section id="features" className="relative py-24 min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-3 py-1 rounded-full glass text-xs font-medium text-zinc-600 dark:text-zinc-300"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
            Interactive Demo
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white"
          >
            How it works
          </motion.h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Click any card below to experience the live strategy builder flow in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* STEP 1 */}
          <FeatureCard 
            step={1} 
            title="Type strategy in plain English" 
            desc="Describe entries, exits, and indicators naturally — no coding required."
            icon={<MessageSquareText size={20} />}
            isActive={activeDemoStep === 1}
            onClick={() => handleCardClick(1)}
          >
            <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/5">
              <textarea 
                className="w-full bg-transparent text-sm text-zinc-300 resize-none outline-none font-mono"
                rows={3}
                placeholder="Type a strategy..."
                defaultValue={"Buy AAPL when RSI < 30 and MACD crosses above signal line. Exit position when RSI > 70 or stop loss hits 5%."}
              />
              <div className="flex justify-end mt-2">
                <button className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full hover:bg-blue-500/30">Process</button>
              </div>
            </div>
          </FeatureCard>

          {/* STEP 2 */}
          <FeatureCard 
            step={2} 
            title="AI converts it to code" 
            desc="Groq-powered AI generates production-ready Python backtest logic."
            icon={<Code2 size={20} />}
            isActive={activeDemoStep === 2}
            onClick={() => handleCardClick(2)}
          >
            <div className="mt-4 p-4 rounded-xl bg-[#0d1117] border border-white/5 overflow-hidden relative">
              <div className="flex gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 2, ease: "linear" }}
                className="text-xs font-mono text-green-400 overflow-hidden whitespace-pre-wrap leading-relaxed"
              >
                {`def initialize(context):
    context.asset = symbol('AAPL')
    schedule_function(check_rsi, date_rules.every_day())

def check_rsi(context, data):
    hist = data.history(context.asset, 'price', 14, '1d')
    rsi = talib.RSI(hist, timeperiod=14)[-1]
    
    if rsi < 30:
        order_target_percent(context.asset, 1.0)
    elif rsi > 70:
        order_target_percent(context.asset, 0)`}
              </motion.div>
            </div>
          </FeatureCard>

          {/* STEP 3 */}
          <FeatureCard 
            step={3} 
            title="Backtest on historical data" 
            desc="Run against up to 10 years of Polygon market data in seconds."
            icon={<BarChart3 size={20} />}
            isActive={activeDemoStep === 3}
            onClick={() => handleCardClick(3)}
          >
            <Step3Demo />
          </FeatureCard>

          {/* STEP 4 */}
          <FeatureCard 
            step={4} 
            title="See results + AI explanation" 
            desc="Review equity curves, stats, and a coach-style breakdown."
            icon={<Sparkles size={20} />}
            isActive={activeDemoStep === 4}
            onClick={() => handleCardClick(4)}
          >
            <div className="mt-4 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-sm">
              <div className="flex items-center gap-2 mb-2 text-violet-400 font-medium">
                <Sparkles size={16} /> AI Coach Analysis
              </div>
              <p className="text-zinc-400 leading-relaxed text-xs">
                Your RSI divergence strategy generated an 85% return over 2 years with a max drawdown of 12%. 
                <br/><br/>
                <strong className="text-zinc-200">Tip:</strong> The win rate could improve by adding a volume filter to validate the RSI oversold signals during earnings weeks.
              </p>
            </div>
          </FeatureCard>

          {/* STEP 5 */}
          <FeatureCard 
            step={5} 
            title="Connect your broker" 
            desc="Link Alpaca paper trading with one click — real markets, zero risk."
            icon={<Link2 size={20} />}
            isActive={activeDemoStep === 5}
            onClick={() => handleCardClick(5)}
          >
            <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/5 flex flex-col items-center justify-center gap-3">
              {isBrokerConnected ? (
                <div className="flex flex-col items-center text-green-400">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-sm font-medium">Alpaca Connected</span>
                </div>
              ) : (
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveModal('connectBroker'); }}
                  className="w-full py-2 bg-yellow-500/10 text-yellow-500 text-sm rounded-lg hover:bg-yellow-500/20 transition-colors"
                >
                  Connect Alpaca Paper
                </button>
              )}
            </div>
          </FeatureCard>

          {/* STEP 6 */}
          <FeatureCard 
            step={6} 
            title="Strategy runs live 24/7" 
            desc="Your algorithm monitors markets and executes while you sleep."
            icon={<Zap size={20} />}
            isActive={activeDemoStep === 6}
            onClick={() => handleCardClick(6)}
          >
            <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-green-400">STATUS: LIVE</span>
                </div>
                <span className="text-xs font-mono text-zinc-500">UPTIME: 99.9%</span>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-zinc-400 flex justify-between">
                  <span>[10:45:02] AAPL SIGNAL</span>
                  <span className="text-blue-400">RSI 28.5</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 flex justify-between">
                  <span>[10:45:03] EXECUTING BUY</span>
                  <span className="text-zinc-200">100 SHARES</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 flex justify-between">
                  <span>[10:45:05] ORDER FILLED</span>
                  <span className="text-green-400">@ $175.20</span>
                </div>
              </div>
            </div>
          </FeatureCard>

        </div>
      </div>
    </section>
  );
}

// Subcomponent for Card framing
function FeatureCard({ step, title, desc, icon, isActive, onClick, children }: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`glass glass-hover cursor-pointer p-6 flex flex-col gap-4 overflow-hidden ${
        isActive ? 'ring-1 ring-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-white/10 dark:bg-white/[0.05]' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 dark:bg-white/5 border border-white/10 shadow-inner">
          <span className="text-zinc-600 dark:text-zinc-300">{icon}</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-blue-500 dark:text-blue-400">
          Step {step}
        </span>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">{title}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light mt-1">{desc}</p>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Subcomponent for Step 3 Chart Mock
function Step3Demo() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/5 h-48 flex flex-col relative">
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-400">
          <Loader2 className="animate-spin mb-2" size={24} />
          <span className="text-xs font-mono">Running backtest (2020-2024)...</span>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
          <div className="flex justify-between items-center mb-2 px-2">
            <span className="text-xs font-mono text-zinc-400">Cum. Return</span>
            <span className="text-xs font-mono text-green-400">+85.0%</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  );
}
