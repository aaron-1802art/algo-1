"use client";

import { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export interface EquityPoint {
  timestamp: string;
  equity: number;
}

interface EquityChartProps {
  data: EquityPoint[];
  initialBalance?: number;
}

export function EquityChart({ data, initialBalance = 100000 }: EquityChartProps) {
  // If we have no data, show a flat line
  const chartData = data && data.length > 0 ? data : [{ timestamp: '00:00:00', equity: initialBalance }];

  const { min, max } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    chartData.forEach((d) => {
      if (d.equity < min) min = d.equity;
      if (d.equity > max) max = d.equity;
    });

    // Add some padding to the domain
    const padding = (max - min) * 0.1 || initialBalance * 0.05;
    return {
      min: Math.floor(min - padding),
      max: Math.ceil(max + padding)
    };
  }, [chartData, initialBalance]);

  const endEquity = chartData[chartData.length - 1].equity;
  const isProfitable = endEquity >= initialBalance;
  
  // Use vibrant green or red depending on profitability
  const gradientColor = isProfitable ? "#10b981" : "#f43f5e"; 

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
          <XAxis 
            dataKey="timestamp" 
            tick={{ fill: '#64748b', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            minTickGap={50}
          />
          <YAxis 
            domain={[min, max]} 
            tick={{ fill: '#64748b', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
            itemStyle={{ color: gradientColor, fontWeight: 'bold' }}
            formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Equity']}
            labelStyle={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}
          />
          <Area 
            type="monotone" 
            dataKey="equity" 
            stroke={gradientColor} 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorEquity)" 
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
