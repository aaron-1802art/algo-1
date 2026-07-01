"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Code2, LineChart } from "lucide-react";

export function AlgoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const cards = [
    {
      label: "Build",
      title: "Deploy Strategies",
      icon: <Code2 className="text-black" size={32} strokeWidth={1.5} />,
      delay: 0.1,
    },
    {
      label: "Optimize",
      title: "Scale Infrastructure",
      icon: <LineChart className="text-black" size={32} strokeWidth={1.5} />,
      delay: 0.2,
    }
  ];

  return (
    <section id="home" ref={ref} className="relative h-screen min-h-[800px] w-full overflow-hidden flex flex-col justify-end">
      {/* Background Image with Parallax - Architecture/Clean Aesthetic */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-white/10 z-10" />
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3500&auto=format&fit=crop"
          alt="Modern architecture abstract"
          className="w-full h-[120%] object-cover object-center -mt-10"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none mt-[-5vh] px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xl md:text-2xl font-inter font-light text-neutral-800 tracking-widest uppercase mb-4"
        >
          AlgoSwift
        </motion.h2>
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-outfit font-medium text-neutral-900 tracking-tighter text-center leading-[0.9] drop-shadow-sm"
        >
          platform.
        </motion.h1>
        
        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.6 }}
           className="mt-8 text-lg md:text-xl text-neutral-700 max-w-lg text-center font-inter drop-shadow-sm"
        >
          Automated strategy execution in plain English. Fully integrated deployment matrix.
        </motion.p>
      </div>

      {/* Interactive Cards Row */}
      <div className="relative z-30 w-full max-w-5xl mx-auto px-4 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + card.delay, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="glass-light glass-hover relative p-8 h-48 md:h-64 flex flex-col justify-between overflow-hidden group border-b-0 rounded-b-none md:rounded-b-3xl md:border-b mask-image-bottom md:mask-image-none"
              style={{
                 maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                 WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
              }}
            >
              <div className="flex justify-between items-start">
                <div className="glass-pill px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-neutral-800 shadow-sm">
                  {card.label}
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-110">
                 {card.icon}
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <h3 className="text-xl md:text-2xl font-outfit font-medium text-neutral-900 group-hover:text-black transition-colors max-w-[200px]">
                  {card.title}
                </h3>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2 duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
