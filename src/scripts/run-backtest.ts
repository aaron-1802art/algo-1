import { RiskManager } from '@/lib/algo/risk';
import { TradingEngine } from '@/lib/algo/engine';
import { MovingAverageCrossover } from '@/lib/algo/strategy';
import { PortfolioManager } from '@/lib/algo/portfolio';
import { Backtester } from '@/lib/algo/backtester';
import { TickData } from '@/types/trading';

// 1. Setup Sandbox Environment
const risk = new RiskManager(100, 10.0);
const engine = new TradingEngine(risk);
const portfolio = new PortfolioManager(10000); // Start with $10,000 cash
const backtester = new Backtester(engine, portfolio);

// Register Strategy
engine.registerStrategy(new MovingAverageCrossover('AAPL', 2, 4));

// 2. Generate Dummy Historical Bars
const historicalTicks: TickData[] = [
  { symbol: 'AAPL', price: 150, volume: 100, timestamp: new Date() },
  { symbol: 'AAPL', price: 152, volume: 120, timestamp: new Date() },
  { symbol: 'AAPL', price: 151, volume: 90,  timestamp: new Date() },
  { symbol: 'AAPL', price: 148, volume: 200, timestamp: new Date() }, // Dropping down
  { symbol: 'AAPL', price: 153, volume: 150, timestamp: new Date() }, // Crossover Buy Trigger
  { symbol: 'AAPL', price: 155, volume: 110, timestamp: new Date() },
];

// 3. Compute Engine Evaluation Metrics
const summary = backtester.run(historicalTicks);
console.log("--- Backtest Output ---", summary);
