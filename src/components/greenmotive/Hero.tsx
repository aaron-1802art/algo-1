"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Plus, Hexagon, X } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const cards = [
    {
      label: "Resources",
      title: "Eco-Urban Development",
      icon: <Plus className="text-black" size={32} strokeWidth={1.5} />,
      delay: 0.1,
      href: "#services",
    },
    {
      label: "Management",
      title: "Conservation Technologies",
      icon: <Hexagon className="text-black" size={32} strokeWidth={1.5} />,
      delay: 0.2,
      href: "#services",
    },
    {
      label: "Development",
      title: "Restore Our Oceans",
      icon: <X className="text-black" size={32} strokeWidth={1.5} />,
      delay: 0.3,
      href: "#services",
    },
  ];

  return (
    <section ref={ref} className="relative h-screen min-h-[800px] w-full overflow-hidden flex flex-col justify-end">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-black/10 z-10" />
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=3506&auto=format&fit=crop"
          alt="Canyon landscape"
          className="w-full h-[120%] object-cover object-center -mt-10"
        />
      </motion.div>

      {/* Hero Headline */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mt-[-10vh]">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-outfit font-medium text-white tracking-tighter text-center leading-[0.9] drop-shadow-2xl"
        >
          Green<br className="md:hidden"/>Motive.
        </motion.h1>
      </div>

      {/* Interactive 3-Card Row */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.a
              href={card.href}
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + card.delay, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="glass-light glass-hover relative p-8 h-64 flex flex-col justify-between overflow-hidden group border-b-0 rounded-b-none md:rounded-b-3xl md:border-b mask-image-bottom md:mask-image-none"
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
              
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110">
                 {card.icon}
              </div>

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-outfit font-medium text-neutral-900 group-hover:text-black transition-colors max-w-[200px]">
                  {card.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
