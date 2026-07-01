'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useAppState } from '@/context/AppStateContext';

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const { setActiveModal } = useAppState();

  const plans = [
    {
      name: "Starter",
      price: isYearly ? 0 : 0,
      description: "For algorithmic enthusiasts.",
      features: [
        "1 Live Strategy",
        "100 Backtests / mo",
        "Community Support",
        "Paper Trading Only"
      ],
      buttonText: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: isYearly ? 79 : 99,
      description: "For serious quantitative traders.",
      features: [
        "10 Live Strategies",
        "Unlimited Backtests",
        "AI Coach Explanation",
        "Live Broker Integration",
        "Priority Support"
      ],
      buttonText: "Get Started",
      popular: true
    },
    {
      name: "Institutional",
      price: isYearly ? 399 : 499,
      description: "For funds and prop desks.",
      features: [
        "Unlimited Strategies",
        "Custom Data Feeds",
        "API Access",
        "Sub-second Execution",
        "Dedicated Account Manager"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Simple, transparent pricing.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Start for free, upgrade when you need live execution and advanced AI analysis.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm ${!isYearly ? 'text-zinc-900 dark:text-white font-medium' : 'text-zinc-500 dark:text-zinc-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-8 rounded-full bg-white/10 border border-white/20 transition-colors focus:outline-none"
            >
              <motion.div 
                animate={{ x: isYearly ? 24 : 4 }} 
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 bottom-1 w-6 h-6 rounded-full bg-blue-500"
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-zinc-900 dark:text-white font-medium' : 'text-zinc-500 dark:text-zinc-400'}`}>
              Yearly <span className="text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass flex flex-col p-8 relative ${
                plan.popular 
                  ? 'ring-1 ring-blue-500 bg-white/10 dark:bg-white/[0.05] shadow-[0_0_40px_rgba(59,130,246,0.15)] scale-105 z-10' 
                  : 'hover:-translate-y-1 transition-transform'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{plan.description}</p>
              
              <div className="mb-8 flex items-end gap-1">
                <span className="text-4xl font-bold text-zinc-900 dark:text-white">${plan.price}</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">/mo</span>
              </div>

              <div className="flex-grow space-y-4 mb-8">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <Check size={16} className="text-blue-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveModal('signup')}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'bg-white/5 border border-white/10 text-zinc-900 dark:text-white hover:bg-white/10'
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
