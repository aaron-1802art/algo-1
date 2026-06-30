export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT';
export type OrderStatus = 'PENDING' | 'FILLED' | 'REJECTED' | 'CANCELLED';

export interface TickData {
  symbol: string;
  price: number;
  volume: number;
  timestamp: Date;
}

export interface TradeSignal {
  symbol: string;
  side: OrderSide;
  price: number;
  quantity: number;
}

export interface Order {
  orderId: string;
  symbol: string;
  side: OrderSide;
  type: OrderType;
  price?: number;
  quantity: number;
  status: OrderStatus;
  timestamp: Date;
}

export interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  unrealizedPnl: number;
}
