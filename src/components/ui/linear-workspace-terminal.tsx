'use html';
'use client';

import { useState, useEffect } from 'react';

// Interfaces for Linear/Apple Style Workspace
interface DeploymentNode {
  id: string;
  name: string;
  identifier: string;
  category: string;
  status: 'active' | 'paused' | 'queued';
  efficiency: number;
  latency: string;
  allocation: string;
}

export default function LinearWorkspaceTerminal() {
  // 1. Core State Management
  const [nodes, setNodes] = useState<DeploymentNode[]>([
    { id: 'node-1', name: 'Alpha Core Momentum', identifier: 'ACM-01', category: 'Quantitative', status: 'active', efficiency: 98.4, latency: '1.2ms', allocation: '40%' },
    { id: 'node-2', name: 'Beta Volatility Mean Reversion', identifier: 'BVM-02', category: 'Derivatives', status: 'active', efficiency: 94.1, latency: '0.8ms', allocation: '25%' },
    { id: 'node-3', name: 'Gamma Systemic Macro Overlay', identifier: 'GSM-03', category: 'Hedging', status: 'paused', efficiency: 89.7, latency: '4.5ms', allocation: '15%' },
    { id: 'node-4', name: 'Delta Cross-Asset Liquidity Bot', identifier: 'DCL-04', category: 'Arbitrage', status: 'queued', efficiency: 0.0, latency: '--', allocation: '20%' },
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'paused'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);

  // 2. Simulated Live Performance Fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev =>
        prev.map(node => {
          if (node.status !== 'active') return node;
          const variance = (Math.random() * 0.6 - 0.3);
          return {
            ...node,
            efficiency: parseFloat(Math.min(100, Math.max(90, node.efficiency + variance)).toFixed(1))
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerStatusToggle = (id: string) => {
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        const targetStatus = n.status === 'active' ? 'paused' : 'active';
        showToastNotification(`Node ${n.identifier} shifted to ${targetStatus}`);
        return { 
          ...n, 
          status: targetStatus,
          efficiency: targetStatus === 'active' ? 92.4 : 0.0,
          latency: targetStatus === 'active' ? '1.4ms' : '--'
        };
      }
      return n;
    }));
  };

  const showToastNotification = (msg: string) => {
    setSystemMessage(msg);
    setTimeout(() => setSystemMessage(null), 3500);
  };

  // Filtering Logic
  const filteredNodes = nodes.filter(n => {
    if (activeTab === 'active' && n.status !== 'active') return false;
    if (activeTab === 'paused' && n.status !== 'paused') return false;
    return n.name.toLowerCase().includes(searchQuery.toLowerCase()) || n.identifier.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-[#08080a] text-zinc-200 p-8 min-h-[780px] font-sans flex flex-col justify-between selection:bg-zinc-800 selection:text-white antialiased">
      
      {/* GLOBAL TOAST BANNER */}
      {systemMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#121214] border border-zinc-800 text-zinc-300 text-xs py-2 px-3 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          <span>{systemMessage}</span>
        </div>
      )}

      {/* TERMINAL TOP DECK: NAVIGATION & BREADCRUMBS */}
      <div>
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-900/80 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 flex items-center justify-center border border-zinc-600/30 shadow-sm">
              <svg className="w-3.5 h-3.5 text-zinc-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-tight">
              <span className="text-zinc-500 hover:text-zinc-400 cursor-pointer transition">Workspace</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-200 font-semibold">Execution Engines</span>
            </div>
          </div>

          {/* QUICK COMMAND TRIGGER BAR */}
          <div className="relative">
            <div 
              onClick={() => setCommandMenuOpen(!commandMenuOpen)}
              className="flex items-center gap-4 bg-[#121214]/60 border border-zinc-850 hover:border-zinc-800 px-3 py-1.5 rounded-lg text-xs text-zinc-500 cursor-pointer transition w-full sm:w-56 justify-between select-none"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search or trigger...</span>
              </div>
              <div className="flex items-center gap-0.5 text-[10px] bg-zinc-900 px-1.5 py-0.5 border border-zinc-800 rounded text-zinc-500 font-mono">
                <span>⌘</span><span>K</span>
              </div>
            </div>

            {/* EXPANDED SIMULATED COMMAND MATRIX OVERLAY */}
            {commandMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0c0c0e] border border-zinc-850 rounded-xl p-2 shadow-[0_12px_40px_rgba(0,0,0,0.7)] z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-[10px] font-semibold tracking-wider uppercase text-zinc-600 px-2.5 py-1.5">Quick Actions</div>
                <div className="space-y-0.5 text-xs text-zinc-400">
                  <button onClick={() => { showToastNotification('Initiated Master Synchronization'); setCommandMenuOpen(false); }} className="w-full text-left p-2 hover:bg-zinc-900 rounded-md flex justify-between items-center transition">
                    <span>🔄 Sync System States</span>
                    <span className="text-[9px] text-zinc-600 font-mono">⌥S</span>
                  </button>
                  <button onClick={() => { showToastNotification('Generated System Audit Log'); setCommandMenuOpen(false); }} className="w-full text-left p-2 hover:bg-zinc-900 rounded-md flex justify-between items-center transition">
                    <span>📋 Export Metric Logs</span>
                    <span className="text-[9px] text-zinc-600 font-mono">⌥E</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* METRICS PERFORMANCE SUMMARY MATRIX STRIP */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          {[
            { label: 'Operational Efficiency', val: '96.2%', desc: 'Composite system stability index', color: 'text-zinc-200' },
            { label: 'Aggregated Throughput', val: '2.4ms', desc: 'Average hardware pipeline execution delay', color: 'text-zinc-400' },
            { label: 'Dynamic Memory Load', val: '80%', desc: 'Current allocated capacity weight', color: 'text-zinc-400' },
          ].map((m, idx) => (
            <div key={idx} className="bg-[#0c0c0e]/80 border border-zinc-900/60 p-4 rounded-xl relative overflow-hidden group hover:border-zinc-850 transition-colors duration-300">
              <span className="text-[11px] font-medium text-zinc-500 block tracking-tight">{m.label}</span>
              <span className={`text-xl font-semibold tracking-tight block mt-1 ${m.color}`}>{m.val}</span>
              <span className="text-[10px] text-zinc-600 block mt-0.5 font-sans">{m.desc}</span>
              {/* Subtle Linear-style edge ambient reflect gradient accent */}
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent transform translate-y-[1px] group-hover:translate-y-0 transition-transform duration-500" />
            </div>
          ))}
        </section>

        {/* CONTROLS BAR: SYSTEM WORKSPACE FILTERS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          {/* TAB ARCHITECTURES */}
          <div className="flex p-0.5 bg-[#121214]/60 border border-zinc-900 rounded-lg max-w-xs">
            {(['all', 'active', 'paused'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-zinc-900 text-zinc-100 border border-zinc-800/80 shadow-sm font-semibold' 
                    : 'text-zinc-500 hover:text-zinc-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* LIVE LOCALIZED NODE SEARCH */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Filter specific nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border border-zinc-900 rounded-lg px-3 py-1 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-800 w-full sm:w-48 font-sans transition-all"
            />
          </div>
        </div>

        {/* HIGH-FIDELITY AUTOMATION CORE LIST LAYOUT */}
        <div className="bg-[#0c0c0e]/40 border border-zinc-900 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-900/80 text-zinc-500 font-medium bg-[#0c0c0e]/80 select-none">
                  <th className="p-3 font-medium tracking-tight">System Node Workspace</th>
                  <th className="p-3 font-medium tracking-tight">Category</th>
                  <th className="p-3 font-medium tracking-tight">Status</th>
                  <th className="p-3 font-medium tracking-tight text-right">Efficiency Tracking</th>
                  <th className="p-3 font-medium tracking-tight text-right">Latency Weight</th>
                  <th className="p-3 font-medium tracking-tight text-right">Allocation</th>
                  <th className="p-3 font-medium tracking-tight text-right">Action Loop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/40">
                {filteredNodes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-zinc-600 font-sans italic">
                      No computational nodes correspond with your active parameter filters.
                    </td>
                  </tr>
                ) : (
                  filteredNodes.map((n) => (
                    <tr key={n.id} className="hover:bg-[#121214]/30 group transition-colors duration-150">
                      
                      {/* Name and Identifier */}
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-semibold text-zinc-200 tracking-tight">{n.name}</span>
                          <span className="text-[10px] bg-zinc-900/80 text-zinc-500 border border-zinc-850 px-1.5 py-0.5 rounded font-mono font-medium">
                            {n.identifier}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-3 text-zinc-500 font-medium font-sans">{n.category}</td>

                      {/* Pure Status Icon and Text */}
                      <td className="p-3">
                        <div className="flex items-center gap-2 select-none">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            n.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' :
                            n.status === 'paused' ? 'bg-zinc-600' : 'bg-amber-500'
                          }`} />
                          <span className={`capitalize font-medium text-[11px] ${
                            n.status === 'active' ? 'text-zinc-300' : 'text-zinc-500'
                          }`}>{n.status}</span>
                        </div>
                      </td>

                      {/* Dynamic Efficiency Tracker */}
                      <td className="p-3 text-right font-mono font-medium text-zinc-300">
                        {n.status === 'active' ? `${n.efficiency}%` : '--'}
                      </td>

                      {/* Latency */}
                      <td className="p-3 text-right font-mono text-zinc-400">{n.latency}</td>

                      {/* Allocation */}
                      <td className="p-3 text-right font-mono text-zinc-500">{n.allocation}</td>

                      {/* Interactive Workspace Toggle Tapes */}
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => triggerStatusToggle(n.id)}
                          disabled={n.status === 'queued'}
                          className={`text-[11px] font-medium px-2 py-1 rounded border opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-150 ${
                            n.status === 'queued' 
                              ? 'text-zinc-700 border-zinc-900/60 cursor-not-allowed'
                              : n.status === 'active'
                                ? 'text-zinc-400 border-zinc-850 bg-zinc-900/40 hover:bg-zinc-900 hover:text-white'
                                : 'text-zinc-200 border-zinc-700 bg-zinc-800 hover:bg-zinc-700'
                          }`}
                        >
                          {n.status === 'active' ? 'Pause Stream' : n.status === 'queued' ? 'In Queue' : 'Resume execution'}
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER MATRIX META DATA STRIP */}
      <footer className="mt-12 pt-4 border-t border-zinc-900/80 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-zinc-600 font-sans">
        <div className="flex items-center gap-3">
          <span>Operational Architecture Engine v2.4</span>
          <span className="text-zinc-800">•</span>
          <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-500" /> Platform Operational</span>
        </div>
        <div className="flex items-center gap-1 text-zinc-500 select-none">
          <span>Press</span>
          <kbd className="bg-zinc-900 border border-zinc-850 px-1 py-0.5 rounded text-[9px] font-mono mx-0.5 text-zinc-400">⌘</kbd>
          <kbd className="bg-zinc-900 border border-zinc-850 px-1 py-0.5 rounded text-[9px] font-mono mx-0.5 text-zinc-400">K</kbd>
          <span>to toggle operational overlay command deck.</span>
        </div>
      </footer>

    </div>
  );
}
