"use client";

import { motion } from "motion/react";

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-24 md:py-32 overflow-hidden bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Editorial Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="glass-pill inline-block px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase text-emerald-800 border-emerald-200">
              Who We Are
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-medium tracking-tight text-neutral-900 mb-8 leading-tight">
              Designing the future of <span className="text-emerald-700 italic">natural harmony</span>.
            </h2>
            <div className="space-y-6 text-lg text-neutral-600 font-inter leading-relaxed">
              <p>
                At GreenMotive, we believe that human development and environmental conservation are not mutually exclusive. We exist at the intersection of high-end architectural design and sustainable ecological practice.
              </p>
              <p>
                Our global team of architects, environmental scientists, and urban planners work together to create spaces that don't just minimize harm—they actively restore and revitalize the natural world around them.
              </p>
            </div>
            <button className="mt-10 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-emerald-800 transition-colors duration-300">
              Read our manifesto
            </button>
          </motion.div>

          {/* Image Collage */}
          <div className="relative h-[600px] w-full hidden md:block">
            <motion.div 
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-0 right-10 w-2/3 h-2/3 rounded-3xl overflow-hidden glass-light p-2 z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1800&auto=format&fit=crop" 
                alt="Minimalist architecture in nature"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 100, rotate: 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 4 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute bottom-10 left-10 w-2/3 h-2/3 rounded-3xl overflow-hidden glass-light p-2 z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1800&auto=format&fit=crop" 
                alt="Forest canopy"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
          </div>
          
          {/* Mobile Image */}
          <div className="md:hidden rounded-3xl overflow-hidden h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000&auto=format&fit=crop" 
              alt="Minimalist architecture in nature"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
