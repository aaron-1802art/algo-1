"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "GreenMotive completely reimagined our corporate headquarters. The integration of living walls and natural light improved employee wellbeing and cut our energy costs by 40%.",
    name: "Sarah Jenkins",
    role: "CEO, EcoTech Solutions",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Their ocean restoration project in our coastal city was a masterclass in combining aesthetic beauty with functional ecological defense. Truly visionary work.",
    name: "Marcus Thorne",
    role: "Director of Urban Planning",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "We partnered with GreenMotive for our carbon offset program. Their transparency and the tangible results we've seen in forest canopy growth are unmatched.",
    name: "Elena Rodriguez",
    role: "Head of Sustainability, GlobalCorp",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-neutral-100">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
         <img 
          src="https://images.unsplash.com/photo-1555502570-3d758f8e02d6?q=80&w=3500&auto=format&fit=crop" 
          alt="Texture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl font-outfit font-medium text-neutral-900 mb-16">
          Voices of Impact
        </h2>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-light p-10 md:p-16 rounded-[3rem] bg-white/50"
            >
              <p className="text-xl md:text-3xl font-inter text-neutral-800 leading-relaxed italic mb-10">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white"
                />
                <div className="text-left">
                  <div className="font-outfit font-medium text-neutral-900">{testimonials[currentIndex].name}</div>
                  <div className="text-sm text-neutral-500">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="p-3 rounded-full bg-white shadow-md hover:bg-neutral-50 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="p-3 rounded-full bg-white shadow-md hover:bg-neutral-50 transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
