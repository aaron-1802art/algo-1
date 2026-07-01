"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

function CountUp({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // Easing function: easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  const stats = [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 500, suffix: "+", label: "Global Projects" },
    { value: 2, suffix: "M+", label: "Tons CO₂ Offset" },
    { value: 40, suffix: "", label: "Countries Active" },
  ];

  return (
    <section className="relative py-24 -mt-24 z-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-light p-8 md:p-12 rounded-[2rem] flex flex-wrap justify-between items-center gap-8 shadow-xl bg-white/60"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex-1 min-w-[150px] text-center md:text-left">
              <div className="text-4xl md:text-5xl lg:text-6xl font-outfit font-medium tracking-tighter text-emerald-900">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-neutral-600 mt-2 font-medium tracking-wide text-sm uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
