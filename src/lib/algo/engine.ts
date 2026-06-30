import crypto from 'crypto';
import { TickData, Order, TradeSignal } from '@/types/trading';
import { Strategy } from './strategy';
import { RiskManager } from './risk';

export class TradingEngine {
  private strategies: Map<string, Strategy[]> = new Map();
  private riskManager: RiskManager;
  public orders: Map<string, Order> = new Map();
  
  // Callback listener to notify UI stream setups instantly
  private onOrderUpdateCallback?: (order: Order) => void;

  constructor(riskManager: RiskManager) {
    this.riskManager = riskManager;
  }

  public registerStrategy(strategy: Strategy): void {
    if (!this.strategies.has(strategy.symbol)) {
      this.strategies.set(strategy.symbol, []);
    }
    this.strategies.get(strategy.symbol)!.push(strategy);
    console.log(`[ENGINE] Strategy registered for asset: ${strategy.symbol}`);
  }

  public registerOnOrderUpdate(callback: (order: Order) => void) {
    this.onOrderUpdateCallback = callback;
  }

  public handleTick(tick: TickData): void {
    const activeStrategies = this.strategies.get(tick.symbol);
    if (!activeStrategies) return;

    for (const strategy of activeStrategies) {
      const signal = strategy.onTick(tick);
      if (signal) {
        this.processSignal(signal);
      }
    }
  }

  private processSignal(signal: TradeSignal): void {
    console.log(`[SIGNAL GENERATED] ${signal.side} ${signal.symbol} @ ${signal.price}`);

    const order: Order = {
      orderId: crypto.randomUUID(),
      symbol: signal.symbol,
      side: signal.side,
      type: 'MARKET',
      price: signal.price,
      quantity: signal.quantity,
      status: 'PENDING',
      timestamp: new Date(),
    };

    if (this.riskManager.validateOrder(order)) {
      this.executeOrder(order);
    } else {
      order.status = 'REJECTED';
      this.orders.set(order.orderId, order);
      this.onOrderUpdateCallback?.(order);
    }
  }

  private executeOrder(order: Order): void {
    // Mock Broker Execution Matcher
    order.status = 'FILLED';
    this.orders.set(order.orderId, order);
    console.log(`[EXECUTION SUCCESS] Order ${order.orderId} filled.`);
    this.onOrderUpdateCallback?.(order);
  }
}
