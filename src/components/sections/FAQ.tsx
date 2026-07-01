'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Do I need to know how to code?",
    answer: "Not at all. You can write your entire strategy in plain English. Algo1's AI interprets your rules, handles the data science, and generates production-ready Python that executes automatically."
  },
  {
    question: "What markets and brokers are supported?",
    answer: "Currently, we support US Equities (Stocks and ETFs) through Alpaca. We handle the data ingestion from Polygon.io automatically. Crypto and additional brokers are coming in Q3."
  },
  {
    question: "Who owns the intellectual property of my strategies?",
    answer: "You do. 100%. We do not claim ownership over any algorithms generated on our platform, nor do we run a proprietary desk that trades against our users."
  },
  {
    question: "How accurate is the backtesting engine?",
    answer: "We use institutional-grade tick data, factoring in realistic slippage, commission structures, and bid/ask spreads. While historical performance doesn't guarantee future results, our engine is designed to minimize 'false positives'."
  }
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-32 bg-[var(--surface)] border-y border-[var(--border)] px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--text-primary)] mb-16 text-center tracking-tight">Frequently asked questions</h2>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${openIdx === idx ? 'bg-[var(--surface-raised)] shadow-[0_10px_30px_rgba(0,0,0,0.2)]' : 'bg-[var(--bg)] hover:border-[var(--border-hover)]'}`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-lg text-[var(--text-primary)]">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${openIdx === idx ? 'rotate-180 text-[var(--accent)]' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-8 pb-8 text-[var(--text-secondary)] leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
