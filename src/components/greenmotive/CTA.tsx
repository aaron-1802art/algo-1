"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, X } from "lucide-react";

export function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="relative py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=3500&auto=format&fit=crop" 
          alt="Rolling green hills"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-light p-12 md:p-20 rounded-[3rem] border-white/40"
        >
          <h2 className="text-5xl md:text-7xl font-outfit font-medium text-neutral-900 mb-6 tracking-tight">
            Ready to build <br/> the future?
          </h2>
          <p className="text-xl text-neutral-700 mb-10 max-w-xl mx-auto">
            Partner with GreenMotive to integrate cutting-edge sustainability into your next major development.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-emerald-800 transition-colors duration-300 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Book a Consultation
          </button>
        </motion.div>
      </div>

      {/* Consultation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
            >
              <button 
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-outfit font-medium mb-2">Request Received</h3>
                  <p className="text-neutral-500">We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-outfit font-medium mb-6">Start a Project</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="jane@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Project Type</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white">
                        <option>Eco-Urban Development</option>
                        <option>Renewable Energy Integration</option>
                        <option>Conservation Tech</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <button 
                      disabled={isSubmitting}
                      type="submit" 
                      className="w-full py-4 mt-2 bg-neutral-900 text-white rounded-xl font-medium hover:bg-emerald-800 transition-colors disabled:opacity-70 flex justify-center"
                    >
                      {isSubmitting ? "Sending..." : "Submit Request"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
