"use client";

import { useState, useEffect } from 'react';
import { PredictionMarket, type PredictionMarketOrderValue } from '@/components/ui/be-ui-prediction-market';

export interface OrderLog {
  orderId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  status: string;
  timestamp: string;
}

export function LiveTerminal() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [liveTick, setLiveTick] = useState<any>(null);
  const [liveOrders, setLiveOrders] = useState<OrderLog[]>([]);

  // Local discretionary trading state
  const [manualOrder, setManualOrder] = useState<PredictionMarketOrderValue>({
    mode: "buy",
    outcomeId: "up",
    amount: "100",
  });

  const [balance, setBalance] = useState(50000);
  const [positions, setPositions] = useState({ up: 0, down: 0 });

  useEffect(() => {
    if (!isStreaming) return;

    const eventSource = new EventSource('/api/stream');

    eventSource.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      
      if (payload.type === 'TICK') {
        setLiveTick(payload.data);
      } else if (payload.type === 'ORDER_UPDATE') {
        setLiveOrders((prev) => [payload.data, ...prev].slice(0, 10));
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIsStreaming(false);
    };

    return () => eventSource.close();
  }, [isStreaming]);

  // Handle manual trade execution via the prediction market UI
  const handleManualTrade = (order: PredictionMarketOrderValue, quote: any) => {
    const amount = Number(order.amount);
    
    // Simulate updating balances
    if (order.mode === "buy") {
      setBalance((prev) => prev - amount);
      setPositions((prev) => ({
        ...prev,
        [order.outcomeId]: prev[order.outcomeId as keyof typeof prev] + quote.shares
      }));
    } else {
      setBalance((prev) => prev + quote.payout);
      setPositions((prev) => ({
        ...prev,
        [order.outcomeId]: prev[order.outcomeId as keyof typeof prev] - amount
      }));
    }

    // Add it to our live executions feed
    const newOrder: OrderLog = {
      orderId: `MANUAL-${Date.now().toString().slice(-6)}`,
      symbol: `BTCUSD-${order.outcomeId.toUpperCase()}`,
      side: order.mode === "buy" ? "BUY" : "SELL",
      price: quote.price,
      quantity: quote.shares,
      status: "FILLED",
      timestamp: new Date().toISOString()
    };
    
    setLiveOrders((prev) => [newOrder, ...prev].slice(0, 10));
  };

  // Convert live tick price to probability scale for the prediction market (mock logic)
  // If price goes up, UP becomes more expensive. If down, DOWN becomes more expensive.
  const tickPrice = liveTick?.price || 65000;
  const upProbability = Math.min(0.99, Math.max(0.01, (tickPrice - 64000) / 2000));
  
  const outcomes = [
    { id: "up", label: "BTC Up", price: upProbability },
    { id: "down", label: "BTC Down", price: 1 - upProbability },
  ];

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col h-full shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <div className="w-64 h-64 bg-emerald-500 rounded-full blur-3xl mix-blend-screen"></div>
      </div>

      <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2 relative z-10">
        <h2 className="text-lg font-bold text-slate-300">Live Trade Terminal</h2>
        <button 
          onClick={() => setIsStreaming(!isStreaming)}
          className={`px-3 py-1 font-medium rounded-full text-xs transition ${isStreaming ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'}`}
        >
          {isStreaming ? '● DISCONNECT' : '○ CONNECT FEED'}
        </button>
      </div>
      
      <div className="mb-6 relative z-10">
        {liveTick ? (
          <div className="bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-slate-800 flex justify-between items-center font-mono">
            <div>
              <span className="text-emerald-400 text-lg font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {liveTick.symbol}
              </span>
              <span className="text-slate-500 text-xs mt-1 block">Vol: {liveTick.volume}</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white tracking-tight">${liveTick.price}</span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950 p-4 text-center rounded-xl border border-dashed border-slate-800 text-slate-600 text-sm italic">
            Engine disconnected. Awaiting datastream initialization.
          </div>
        )}
      </div>

      {/* Manual Trading Widget */}
      <div className="mb-6 flex justify-center relative z-10">
        <PredictionMarket
          outcomes={outcomes}
          value={manualOrder}
          onValueChange={setManualOrder}
          onTrade={handleManualTrade}
          balance={balance}
          positions={positions}
          orderTypeLabel="BTC Market"
          quickAmounts={[100, 500, 1000, 5000]}
          classNames={{
            root: "border-slate-800 bg-slate-950/80 backdrop-blur-md w-full",
            amount: "bg-slate-900",
            tabs: "opacity-90",
            action: "bg-indigo-600 hover:bg-indigo-500 text-white"
          }}
        />
      </div>

      <div className="flex-1 min-h-0 flex flex-col relative z-10">
        <h3 className="text-sm font-semibold mb-2 text-slate-400">Signal Execution Feed</h3>
        <div className="bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-800 flex-1 overflow-y-auto p-3 font-mono text-xs space-y-2">
          {liveOrders.length > 0 ? (
            liveOrders.map((ord, idx) => (
              <div key={idx} className="p-3 bg-slate-900/50 hover:bg-slate-800/50 transition-colors border border-slate-800/50 rounded-lg flex justify-between items-center group">
                <div>
                  <span className={`font-bold mr-2 ${ord.side === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>{ord.side}</span>
                  <span className="text-slate-300 font-medium">{ord.symbol}</span>
                </div>
                <div className="text-right">
                  <div className="text-slate-200">${ord.price} x {ord.quantity.toFixed(2)}</div>
                  <div className="text-[10px] text-emerald-500 font-bold uppercase mt-1 opacity-70 group-hover:opacity-100">{ord.status}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-slate-600 italic h-full flex items-center justify-center pt-8">No live engine triggers captured yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}
