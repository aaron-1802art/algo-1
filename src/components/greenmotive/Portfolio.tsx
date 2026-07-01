"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const projects = [
  { id: 1, title: "Oasis Tower", category: "Urban", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "Coral Revival", category: "Ocean", img: "https://images.unsplash.com/photo-1582967635956-2dbab17173e4?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "Verdant Campus", category: "Urban", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, title: "Canopy Sensor Net", category: "Conservation", img: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=1000&auto=format&fit=crop" },
];

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);
  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section id="portfolio" className="py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-4xl md:text-5xl font-outfit font-medium text-neutral-900">Featured Work</h2>
          
          <div className="flex gap-2 glass-pill p-1">
            {["All", "Urban", "Ocean", "Conservation"].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === cat ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filtered.map(project => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                className="relative h-[400px] rounded-3xl overflow-hidden cursor-pointer group"
              >
                <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-6 left-6 glass-light px-6 py-3 border-none bg-white/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">{project.category}</span>
                  <h3 className="text-2xl font-outfit font-medium text-white">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              layoutId={`project-${selectedId}`}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row relative"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="md:w-1/2 h-64 md:h-auto">
                <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <div className="text-emerald-700 text-sm font-bold uppercase tracking-wider mb-2">{selectedProject.category}</div>
                <h3 className="text-3xl font-outfit font-medium text-neutral-900 mb-6">{selectedProject.title}</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t">
                  <div>
                    <div className="text-3xl font-outfit font-medium text-neutral-900">12k</div>
                    <div className="text-sm text-neutral-500 uppercase">Tons CO2 saved</div>
                  </div>
                  <div>
                    <div className="text-3xl font-outfit font-medium text-neutral-900">2023</div>
                    <div className="text-sm text-neutral-500 uppercase">Year Completed</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
