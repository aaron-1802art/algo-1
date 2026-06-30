'use client';

import { useState, useEffect } from 'react';

// Interfaces for Broker Gateway
export interface BrokerConfig {
  id: string;
  name: string;
  region: 'US' | 'IN';
  logoText: string;
  connected: boolean;
}

export interface OrderTicket {
  ticker: string;
  actionType: 'SHORT_EQUITY' | 'BUY_PROTECTIVE_PUT';
  quantity: number;
  orderType: 'MARKET' | 'LIMIT';
  limitPrice?: number;
  strikePrice?: string;
  estimatedMargin: number;
}

export default function BrokerIntegrationHub() {
  // Target company mock context pulled from DebtRadar core scoring engine
  const [targetCompany, setTargetCompany] = useState({
    ticker: 'ZEEL',
    name: 'Zee Entertainment Enterprises',
    score: 81.10,
    classification: 'CRITICAL',
    marketPrice: 142.50, // INR
    currency: 'INR'
  });

  // Available broker configurations
  const [brokers, setBrokers] = useState<BrokerConfig[]>([
    { id: 'kite', name: 'Zerodha Kite', region: 'IN', logoText: '☤ KITE', connected: true },
    { id: 'angel', name: 'Angel One', region: 'IN', logoText: '▲ ANGEL', connected: false },
    { id: 'ibkr', name: 'Interactive Brokers', region: 'US', logoText: '⇄ IBKR', connected: false },
  ]);

  const [selectedBroker, setSelectedBroker] = useState<BrokerConfig>(brokers[0]);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Order ticket state
  const [ticket, setTicket] = useState<OrderTicket>({
    ticker: targetCompany.ticker,
    actionType: 'SHORT_EQUITY',
    quantity: 100,
    orderType: 'MARKET',
    limitPrice: targetCompany.marketPrice,
    strikePrice: '140 CE',
    estimatedMargin: 2850 // (142.50 * 100) * 20% typical intraday margin
  });

  const [executionState, setExecutionState] = useState<'IDLE' | 'TRANSMITTING' | 'FILLED' | 'FAILED'>('IDLE');
  const [transactionLog, setTransactionLog] = useState<string[]>([]);

  // Recalculate margin whenever ticket options update
  useEffect(() => {
    const baseValue = targetCompany.marketPrice * ticket.quantity;
    const marginMultiplier = ticket.actionType === 'SHORT_EQUITY' ? 0.20 : 1.00; // 20% margin for shorting equity vs 100% premium for option buying
    setTicket(prev => ({
      ...prev,
      estimatedMargin: Math.round(baseValue * marginMultiplier)
    }));
  }, [ticket.quantity, ticket.actionType, targetCompany.marketPrice]);

  const handleBrokerAuth = (brokerId: string) => {
    setIsConnecting(true);
    setTransactionLog(prev => [...prev, `[SYSTEM] Initiating secure OAuth2 handshake with ${brokerId.toUpperCase()} gateway...`]);
    
    setTimeout(() => {
      setBrokers(prev => prev.map(b => b.id === brokerId ? { ...b, connected: true } : b));
      setSelectedBroker(prev => prev.id === brokerId ? { ...prev, connected: true } : prev);
      setIsConnecting(false);
      setTransactionLog(prev => [...prev, `[SUCCESS] Secure API tunnel established with ${brokerId.toUpperCase()}. Access token cached.`]);
    }, 1200);
  };

  const handleOrderExecution = () => {
    if (!selectedBroker.connected) {
      alert('Error: Selected broker gateway is offline. Authenticate session first.');
      return;
    }

    setExecutionState('TRANSMITTING');
    setTransactionLog(prev => [
      ...prev, 
      `[ORDER] Transmitting payload: ${ticket.actionType} ${ticket.quantity} shares of ${ticket.ticker} via ${selectedBroker.name}`
    ]);

    setTimeout(() => {
      setExecutionState('FILLED');
      const orderId = `omstx_${Math.random().toString(36).substring(2, 10)}`;
      setTransactionLog(prev => [
        ...prev,
        `[BROKER RESPONSE] Order Executed Successfully.`,
        `[RECEIPT] ID: ${orderId.toUpperCase()} // Avg Price: ${targetCompany.marketPrice.toFixed(2)} // Margin Utilized: ${ticket.estimatedMargin} ${targetCompany.currency}`
      ]);
    }, 1500);
  };

  return (
    <div className="bg-black text-zinc-200 p-6 font-mono min-h-[600px] flex flex-col justify-between border border-zinc-900 rounded-xl max-w-4xl mx-auto shadow-2xl">
      
      {/* HUB COMPONENT HEADER */}
      <div>
        <div className="flex justify-between items-start border-b border-zinc-900 pb-4 mb-6">
          <div>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded uppercase tracking-widest font-bold">
              Action Node 1 // Active Execution
            </span>
            <h2 className="text-base font-bold text-white mt-2 tracking-tight">1-Click Broker Integration Hub</h2>
            <p className="text-[11px] text-zinc-500 mt-0.5">Bridge the gap between credit distress insights and market protection instruments.</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-zinc-500 block uppercase">Current Focus Target</span>
            <span className="text-sm font-bold text-white">{targetCompany.ticker}: {targetCompany.name}</span>
            <span className="text-xs block text-red-400 font-bold">Distress Score: {targetCompany.score.toFixed(2)}</span>
          </div>
        </div>

        {/* TWO COLUMN INTERACTION ENGINE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* LEFT INTERACTION LAYOUT: GATEWAY PROVISIONING (5 COLS) */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider mb-3">
                1. Authenticate Execution Route
              </span>
              
              <div className="space-y-2">
                {brokers.map((broker) => (
                  <div 
                    key={broker.id}
                    onClick={() => setSelectedBroker(broker)}
                    className={`p-3 border rounded-md flex items-center justify-between cursor-pointer transition ${
                      selectedBroker.id === broker.id 
                        ? 'bg-zinc-900/50 border-zinc-600 text-white' 
                        : 'bg-black border-zinc-900 text-zinc-400 hover:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold font-sans">{broker.logoText}</span>
                      <span className="text-xs">{broker.name}</span>
                    </div>
                    
                    <div>
                      {broker.connected ? (
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-1.5 py-0.5 rounded">
                          CONNECTED
                        </span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBrokerAuth(broker.id);
                          }}
                          disabled={isConnecting}
                          className="text-[9px] font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-1.5 py-0.5 rounded transition"
                        >
                          {isConnecting && selectedBroker.id === broker.id ? 'CONNECTING...' : 'CONNECT'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LIVE PRICE TRACKING METRIC CONTAINER */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 text-xs space-y-2">
              <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-wider">Underlying Stream Metrics</span>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-400">Spot Value ({targetCompany.currency}):</span>
                <span className="text-white font-bold">{targetCompany.marketPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-400">Risk Metric Correlation:</span>
                <span className="text-red-400 font-bold">Inverse Multiplier</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Route Status:</span>
                <span className={selectedBroker.connected ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {selectedBroker.connected ? "Tunnel Open" : "Awaiting Tunnel"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT INTERACTION LAYOUT: ORDER CONFIGURATOR (7 COLS) */}
          <div className="md:col-span-7 bg-zinc-950 border border-zinc-900 rounded-lg p-4 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-wider">
                2. Configure Defensive Order Ticket
              </span>

              {/* ACTION SELECTION SWITCH */}
              <div className="flex gap-2 p-1 bg-black rounded border border-zinc-900">
                <button
                  type="button"
                  onClick={() => setTicket(prev => ({ ...prev, actionType: 'SHORT_EQUITY' }))}
                  className={`flex-1 py-1.5 text-xs rounded transition font-bold ${
                    ticket.actionType === 'SHORT_EQUITY' 
                      ? 'bg-red-950 text-red-400 border border-red-900' 
                      : 'text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  📉 SHORT EQUITY SHARE
                </button>
                <button
                  type="button"
                  onClick={() => setTicket(prev => ({ ...prev, actionType: 'BUY_PROTECTIVE_PUT' }))}
                  className={`flex-1 py-1.5 text-xs rounded transition font-bold ${
                    ticket.actionType === 'BUY_PROTECTIVE_PUT' 
                      ? 'bg-blue-950 text-blue-400 border border-blue-900' 
                      : 'text-zinc-500 hover:text-zinc-400'
                  }`}
                >
                  🛡️ BUY PROTECTIVE PUT
                </button>
              </div>

              {/* QUANTITY AND LIMIT CONFIGURATIONS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase block">Position Capital Size</label>
                  <input 
                    type="number"
                    value={ticket.quantity}
                    onChange={(e) => setTicket(prev => ({ ...prev, quantity: Math.max(1, parseInt(e.target.value) || 0) }))}
                    className="w-full bg-black border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-zinc-700 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase block">Execution Pricing Route</label>
                  <select 
                    value={ticket.orderType}
                    onChange={(e) => setTicket(prev => ({ ...prev, orderType: e.target.value as any }))}
                    className="w-full bg-black border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-zinc-700 font-mono"
                  >
                    <option value="MARKET">MARKET EXEC</option>
                    <option value="LIMIT">LIMIT ORDER</option>
                  </select>
                </div>
              </div>

              {ticket.actionType === 'BUY_PROTECTIVE_PUT' && (
                <div className="space-y-1 border border-zinc-900 bg-zinc-900/10 p-2 rounded animate-fadeIn">
                  <label className="text-[10px] font-bold text-blue-400 uppercase block">Derivative Options Contract Target</label>
                  <select
                    value={ticket.strikePrice}
                    onChange={(e) => setTicket(prev => ({ ...prev, strikePrice: e.target.value }))}
                    className="w-full bg-black border border-zinc-800 rounded p-1.5 text-xs text-white focus:outline-none font-mono"
                  >
                    <option value="140 PE">ZEEL 140 PUT (At-The-Money)</option>
                    <option value="135 PE">ZEEL 135 PUT (Out-Of-The-Money)</option>
                    <option value="130 PE">ZEEL 130 PUT (Deep Out-Of-The-Money)</option>
                  </select>
                </div>
              )}

              {/* CALCULATED MARGIN SUMMARY CARD */}
              <div className="bg-black border border-zinc-900 p-3 rounded flex justify-between items-center text-xs">
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Required Account Allocation</span>
                  <span className="text-white font-bold text-sm">
                    {ticket.estimatedMargin.toLocaleString()} {targetCompany.currency}
                  </span>
                </div>
                <div className="text-right text-[10px] text-zinc-400">
                  {ticket.actionType === 'SHORT_EQUITY' ? 'Includes 5x Leverage Cushion' : 'Premium Paid Upfront (100%)'}
                </div>
              </div>
            </div>

            {/* DIRECT ORDER EXECUTION BUTTON TRIGGER */}
            <button
              onClick={handleOrderExecution}
              disabled={executionState === 'TRANSMITTING'}
              className={`w-full mt-4 text-xs font-bold py-3 rounded transition flex items-center justify-center gap-2 tracking-wider ${
                executionState === 'TRANSMITTING' 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : ticket.actionType === 'SHORT_EQUITY'
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_12px_rgba(220,38,38,0.2)]'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_12px_rgba(37,99,235,0.2)]'
              }`}
            >
              {executionState === 'TRANSMITTING' ? (
                <>⏳ DISPATCHING SECURED FIREWALL PACKETS...</>
              ) : (
                <>🚀 TRANSMIT INSTANT ORDER VIA {selectedBroker.name.toUpperCase()}</>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* FOOTER AUDIT CONSOLE STREAMS LOG */}
      <div className="mt-6 pt-4 border-t border-zinc-900">
        <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-widest mb-2">
          Gateway Secure Event Audit Stream
        </span>
        <div className="bg-black border border-zinc-900 rounded p-3 h-24 overflow-y-auto text-left space-y-1 select-all">
          {transactionLog.length === 0 ? (
            <span className="text-[10px] text-zinc-600 italic">No system payloads dispatched yet. Secure channel standing by...</span>
          ) : (
            transactionLog.map((log, index) => (
              <div key={index} className="text-[10px] text-zinc-400 whitespace-pre-wrap leading-tight">
                {log}
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
