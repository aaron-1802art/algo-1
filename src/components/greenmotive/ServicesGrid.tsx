"use client";

import { motion } from "motion/react";
import { ArrowRight, Leaf, Wind, Waves, Trees, Building2, Globe2 } from "lucide-react";
import { useState } from "react";

export function ServicesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    { icon: <Wind size={24} />, title: "Renewable Energy", desc: "Wind & solar infrastructural planning for urban grids." },
    { icon: <Building2 size={24} />, title: "Green Building", desc: "LEED-certified architectural design and materials sourcing." },
    { icon: <Waves size={24} />, title: "Ocean Restoration", desc: "Coastal defense and marine biodiversity rejuvenation." },
    { icon: <Globe2 size={24} />, title: "Conservation Tech", desc: "AI-driven monitoring of delicate ecosystems." },
    { icon: <Trees size={24} />, title: "Eco-Urban Planning", desc: "Integrating forests and natural waterways into cityscapes." },
    { icon: <Leaf size={24} />, title: "Carbon Offset", desc: "Verified corporate offset programs with transparent tracking." },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-neutral-900">
      {/* Background Image - Muted for contrast */}
      <div className="absolute inset-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=3500&auto=format&fit=crop" 
          alt="Dark landscape"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-end gap-8">
          <div>
            <div className="glass-pill inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-white/90 border-white/20 bg-white/10">
              Our Pillars
            </div>
            <h2 className="text-4xl md:text-6xl font-outfit font-medium text-white tracking-tight">
              Comprehensive<br />Sustainability.
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-lg">
            We provide end-to-end environmental integration across six core domains, ensuring a holistic approach to every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="glass-light !bg-white/10 !border-white/20 glass-hover p-8 rounded-3xl h-[280px] flex flex-col justify-between group cursor-pointer"
            >
              <div className="text-emerald-400 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                {svc.icon}
              </div>
              
              <div>
                <h3 className="text-2xl font-outfit font-medium text-white mb-3">
                  {svc.title}
                </h3>
                
                <div className="overflow-hidden h-12 relative">
                  <motion.p 
                    animate={{ y: hoveredIndex === i ? -40 : 0, opacity: hoveredIndex === i ? 0 : 1 }}
                    className="text-white/70 text-sm absolute inset-0"
                  >
                    {svc.desc}
                  </motion.p>
                  
                  <motion.div 
                    animate={{ y: hoveredIndex === i ? 0 : 40, opacity: hoveredIndex === i ? 1 : 0 }}
                    className="absolute inset-0 flex items-center text-emerald-400 font-medium text-sm"
                  >
                    View case studies <ArrowRight size={16} className="ml-2" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
