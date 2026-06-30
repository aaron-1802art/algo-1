import { Order } from '@/types/trading';

export class RiskManager {
  private maxOrderSize: number;
  private maxDrawdownPct: number;
  private currentDrawdownPct: number = 0.0;

  constructor(maxOrderSize: number, maxDrawdownPct: number) {
    this.maxOrderSize = maxOrderSize;
    this.maxDrawdownPct = maxDrawdownPct;
  }

  /**
   * Validates safety bounds before routing an order.
   */
  public validateOrder(order: Order): boolean {
    // Check 1: Maximum Single Order Size Check
    if (order.quantity > this.maxOrderSize) {
      console.warn(`[RISK REJECT] Order Qty ${order.quantity} exceeds max limit of ${this.maxOrderSize}`);
      return false;
    }

    // Check 2: Drawdown Hard Stop
    if (this.currentDrawdownPct >= this.maxDrawdownPct) {
      console.error(`[RISK REJECT] Max Drawdown reached (${this.currentDrawdownPct}%). Risk engine halted.`);
      return false;
    }

    return true;
  }

  public updateDrawdown(drawdown: number): void {
    this.currentDrawdownPct = drawdown;
  }
}
