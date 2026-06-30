import { TickData, TradeSignal } from '@/types/trading';

export interface Strategy {
  symbol: string;
  onTick(tick: TickData): TradeSignal | null;
}

export class MovingAverageCrossover implements Strategy {
  public symbol: string;
  private shortWindow: number;
  private longWindow: number;
  private prices: number[] = [];

  constructor(symbol: string, shortWindow = 5, longWindow = 20) {
    this.symbol = symbol;
    this.shortWindow = shortWindow;
    this.longWindow = longWindow;
  }

  public onTick(tick: TickData): TradeSignal | null {
    if (tick.symbol !== this.symbol) return null;

    this.prices.push(tick.price);

    // Keep an optimization memory boundary
    if (this.prices.length > this.longWindow + 1) {
      this.prices.shift();
    }

    if (this.prices.length < this.longWindow) return null;

    // Fast inline moving average calculations
    const shortSMA = this.getSMA(this.shortWindow);
    const longSMA = this.getSMA(this.longWindow);

    const prevShortSMA = this.getSMA(this.shortWindow, 1);
    const prevLongSMA = this.getSMA(this.longWindow, 1);

    // Bullish Crossover (BUY)
    if (prevShortSMA <= prevLongSMA && shortSMA > longSMA) {
      return { symbol: this.symbol, side: 'BUY', price: tick.price, quantity: 10 };
    }
    // Bearish Crossunder (SELL)
    if (prevShortSMA >= prevLongSMA && shortSMA < longSMA) {
      return { symbol: this.symbol, side: 'SELL', price: tick.price, quantity: 10 };
    }

    return null;
  }

  private getSMA(window: number, offset = 0): number {
    const end = this.prices.length - offset;
    const start = end - window;
    const slice = this.prices.slice(start, end);
    return slice.reduce((sum, val) => sum + val, 0) / window;
  }
}
