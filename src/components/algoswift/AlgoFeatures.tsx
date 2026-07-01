"use client";

import { motion } from "motion/react";
import { MessageSquare, Code, BarChart, Sparkles, Link as LinkIcon, Zap } from "lucide-react";

export function AlgoFeatures() {
  const steps = [
    {
      icon: <MessageSquare size={24} />,
      title: "Type strategy in plain English",
      desc: "Describe entries, exits, and indicators naturally — no coding required."
    },
    {
      icon: <Code size={24} />,
      title: "AI converts it to code",
      desc: "Groq-powered AI generates production-ready Python backtest logic."
    },
    {
      icon: <BarChart size={24} />,
      title: "Backtest on historical data",
      desc: "Run against up to 10 years of Polygon market data in seconds."
    },
    {
      icon: <Sparkles size={24} />,
      title: "See results + AI explanation",
      desc: "Review equity curves, stats, and a coach-style breakdown of what worked."
    },
    {
      icon: <LinkIcon size={24} />,
      title: "Connect your broker",
      desc: "Link Alpaca paper trading with one click — real markets, zero risk."
    },
    {
      icon: <Zap size={24} />,
      title: "Strategy runs live 24/7",
      desc: "Your algorithm monitors markets and executes while you sleep."
    }
  ];

  return (
    <section id="features" className="py-32 relative bg-[#FAFAF8] overflow-hidden">
      {/* Background imagery - subtle architecture/light */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=3500&auto=format&fit=crop" 
          alt="Abstract lighting"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="glass-pill inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-emerald-800 border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            AlgoSwift Workflow
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-medium text-neutral-900 tracking-tight leading-tight">
            From idea to <br/><span className="text-emerald-700 italic">execution.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-light p-8 rounded-3xl h-[280px] flex flex-col justify-between group glass-hover bg-white/40"
            >
              <div className="flex justify-between items-start">
                 <div className="text-emerald-600 p-4 bg-white/60 rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform duration-500">
                   {step.icon}
                 </div>
                 <span className="text-neutral-400 font-mono text-sm">Step {i + 1}</span>
              </div>
              
              <div>
                <h3 className="text-xl md:text-2xl font-outfit font-medium text-neutral-900 mb-3 group-hover:text-emerald-800 transition-colors">
                  {step.title}
                </h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
