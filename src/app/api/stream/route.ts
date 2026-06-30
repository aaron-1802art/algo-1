import { NextRequest } from 'next/server';
import { TradingEngine } from '@/lib/algo/engine';
import { RiskManager } from '@/lib/algo/risk';
import { MovingAverageCrossover } from '@/lib/algo/strategy';
import { TickData } from '@/types/trading';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  // 1. Initialize our trading runtime environment
  const risk = new RiskManager(50, 5.0);
  const engine = new TradingEngine(risk);
  const strategy = new MovingAverageCrossover('BTCUSD', 2, 5);
  engine.registerStrategy(strategy);

  // Send execution context events instantly back down to the pipeline channel
  engine.registerOnOrderUpdate((order) => {
    const data = JSON.stringify({ type: 'ORDER_UPDATE', data: order });
    writer.write(encoder.encode(`data: ${data}\n\n`));
  });

  // Mock Streaming tick data generator to feed the loop
  const mockPrices = [100, 102, 101, 99, 97, 103, 106, 109, 108];
  let currentIdx = 0;

  const intervalId = setInterval(() => {
    if (currentIdx >= mockPrices.length) {
      clearInterval(intervalId);
      writer.close();
      return;
    }

    const tick: TickData = {
      symbol: 'BTCUSD',
      price: mockPrices[currentIdx],
      volume: 2.4,
      timestamp: new Date(),
    };

    // Forward the stream updates directly through engine handlers
    const tickPayload = JSON.stringify({ type: 'TICK', data: tick });
    writer.write(encoder.encode(`data: ${tickPayload}\n\n`));

    engine.handleTick(tick);
    currentIdx++;
  }, 1000);

  // Clean runtime setup if user terminates browser windows
  req.signal.addEventListener('abort', () => {
    clearInterval(intervalId);
    writer.close();
  });

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
