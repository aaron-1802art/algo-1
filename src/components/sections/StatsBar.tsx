'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

function CountUp({ end, suffix = '', duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const stepTime = Math.abs(Math.floor((duration * 1000) / end));
      const timer = setInterval(() => {
        start += Math.ceil(end / (duration * 60)); // 60fps roughly
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function StatsBar() {
  return (
    <section className="py-12 bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
        <div className="flex flex-col gap-2 py-4 md:py-0">
          <div className="text-4xl font-bold text-[var(--text-primary)]">
            <CountUp end={142} suffix="K+" />
          </div>
          <div className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Backtests Run</div>
        </div>
        <div className="flex flex-col gap-2 py-4 md:py-0">
          <div className="text-4xl font-bold text-[var(--text-primary)]">
            <CountUp end={10} suffix=" Yrs" />
          </div>
          <div className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Market Data</div>
        </div>
        <div className="flex flex-col gap-2 py-4 md:py-0">
          <div className="text-4xl font-bold text-[var(--text-primary)]">
            <CountUp end={99} suffix=".9%" />
          </div>
          <div className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Uptime</div>
        </div>
      </div>
    </section>
  );
}
