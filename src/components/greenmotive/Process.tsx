"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Search, PenTool, Sprout, ShieldCheck } from "lucide-react";

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    { icon: <Search />, title: "Discovery", desc: "Environmental impact assessment and site analysis." },
    { icon: <PenTool />, title: "Design", desc: "Iterative architectural and ecological drafting." },
    { icon: <Sprout />, title: "Implementation", desc: "Sustainable construction and habitat restoration." },
    { icon: <ShieldCheck />, title: "Monitoring", desc: "Long-term health tracking of integrated ecosystems." }
  ];

  return (
    <section className="py-32 bg-[#FAFAF8] overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="text-center mb-20">
          <div className="glass-pill inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-emerald-800 border-emerald-200">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-outfit font-medium text-neutral-900">
            Our Process.
          </h2>
        </div>

        <div className="relative">
          {/* Progress Line Background */}
          <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-neutral-200 hidden md:block" />
          
          {/* Active Progress Line */}
          <motion.div 
            style={{ scaleX, transformOrigin: "left" }}
            className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-emerald-600 hidden md:block z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-3xl glass-light flex items-center justify-center bg-white shadow-lg text-emerald-700 mb-6 relative">
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-bold font-outfit">
                    {i + 1}
                  </div>
                  {step.icon}
                </div>
                <h3 className="text-xl font-outfit font-medium text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-neutral-500 text-sm max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
