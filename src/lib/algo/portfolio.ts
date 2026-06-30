import { Order, OrderSide } from '@/types/trading';

export interface Position {
  symbol: string;
  quantity: number;
  averageEntryPrice: number;
}

export class PortfolioManager {
  public cash: number;
  public positions: Map<string, Position> = new Map();
  public realizedPnL: number = 0;

  constructor(initialCash: number) {
    this.cash = initialCash;
  }

  /**
   * Updates account state whenever an order is successfully FILLED.
   */
  public processExecution(order: Order): void {
    if (order.status !== 'FILLED') return;
    
    const orderPrice = order.price ?? 0;
    const currentPosition = this.positions.get(order.symbol);

    if (order.side === 'BUY') {
      const totalCost = order.quantity * orderPrice;
      this.cash -= totalCost;

      if (currentPosition) {
        // Calculate new weighted average entry price
        const newQty = currentPosition.quantity + order.quantity;
        const newAvgPrice = ((currentPosition.averageEntryPrice * currentPosition.quantity) + totalCost) / newQty;
        
        currentPosition.quantity = newQty;
        currentPosition.averageEntryPrice = newAvgPrice;
      } else {
        this.positions.set(order.symbol, {
          symbol: order.symbol,
          quantity: order.quantity,
          averageEntryPrice: orderPrice
        });
      }
    } 
    else if (order.side === 'SELL') {
      if (!currentPosition || currentPosition.quantity < order.quantity) {
        console.error(`[PORTFOLIO ERROR] Insufficient position to SELL ${order.symbol}`);
        return;
      }

      const totalRevenue = order.quantity * orderPrice;
      this.cash += totalRevenue;

      // Calculate realized profit/loss against entry cost
      const costBasis = order.quantity * currentPosition.averageEntryPrice;
      this.realizedPnL += (totalRevenue - costBasis);

      currentPosition.quantity -= order.quantity;
      if (currentPosition.quantity === 0) {
        this.positions.delete(order.symbol);
      }
    }

    console.log(`[PORTFOLIO UPDATE] Cash: $${this.cash.toFixed(2)} | Realized P&L: $${this.realizedPnL.toFixed(2)}`);
  }

  /**
   * Calculates current portfolio valuation based on current market prices.
   */
  public getTotalEquity(currentPrices: Map<string, number>): number {
    let positionValue = 0;
    this.positions.forEach((pos, symbol) => {
      const livePrice = currentPrices.get(symbol) ?? pos.averageEntryPrice;
      positionValue += pos.quantity * livePrice;
    });
    return this.cash + positionValue;
  }
}
