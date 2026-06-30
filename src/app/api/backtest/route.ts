import { NextRequest, NextResponse } from 'next/server';
import { RiskManager } from '@/lib/algo/risk';
import { TradingEngine } from '@/lib/algo/engine';
import { MovingAverageCrossover } from '@/lib/algo/strategy';
import { PortfolioManager } from '@/lib/algo/portfolio';
import { Backtester } from '@/lib/algo/backtester';
import { TickData } from '@/types/trading';

export async function POST(req: NextRequest) {
  try {
    // Parse dynamic inputs from the UI configuration triggers
    const body = await req.json().catch(() => ({}));
    
    const shortWindow = Number(body.shortWindow ?? 5);
    const longWindow = Number(body.longWindow ?? 20);
    const initialBalance = Number(body.initialBalance ?? 50000);
    const maxOrderSize = Number(body.maxOrderSize ?? 100);

    // 1. Initialize our modular execution blocks with runtime configs
    const risk = new RiskManager(maxOrderSize, 15.0);
    const engine = new TradingEngine(risk);
    const portfolio = new PortfolioManager(initialBalance); 
    const backtester = new Backtester(engine, portfolio);

    // Instantiate strategy dynamically matching UI parameters
    engine.registerStrategy(new MovingAverageCrossover('BTCUSD', shortWindow, longWindow));

    // 2. Generate Simulated Historical Data (500 bars)
    const historicalTicks: TickData[] = [];
    let currentPrice = 65000;
    let baseTime = Date.now() - (500 * 1000);

    for (let i = 0; i < 500; i++) {
      const trendFactor = i > 150 && i < 350 ? -0.0006 : 0.0007; 
      const changePct = (Math.random() - 0.5) * 0.004 + trendFactor;
      currentPrice = currentPrice * (1 + changePct);
      
      historicalTicks.push({
        symbol: 'BTCUSD',
        price: Number(currentPrice.toFixed(2)),
        volume: Number((Math.random() * 5).toFixed(4)),
        timestamp: new Date(baseTime + (i * 1000))
      });
    }

    // 3. Process execution synchronously
    const summary = backtester.run(historicalTicks);

    return NextResponse.json({
      initialBalance: summary.initialBalance,
      finalBalance: summary.finalBalance,
      totalPnL: summary.totalPnL,
      totalTrades: summary.totalTrades,
      winRate: summary.winRate,
      orders: summary.orders.reverse(),
      analytics: summary.metrics
    });

  } catch (error: any) {
    console.error("[BACKTEST_ROUTE_ERROR]", error);
    return NextResponse.json({ error: "Failed to compile backtest execution matrix" }, { status: 500 });
  }
}
