"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function AlgoFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="relative bg-neutral-950 text-white overflow-hidden pt-24 pb-12">
      {/* Background Image - Architectural/Glass theme */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1544084944-15269ec7b5a0?q=80&w=3500&auto=format&fit=crop" 
          alt="Modern architecture glass"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="glass-light !bg-white/5 !border-white/10 p-12 rounded-[2.5rem] mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-outfit font-medium text-3xl tracking-tight text-white">AlgoSwift.</span>
              </div>
              <p className="text-white/60 mb-8 max-w-sm">
                Institutional grade algorithmic execution. Transform natural language into quantitative strategies with zero friction.
              </p>
              
              <form onSubmit={handleSubscribe} className="relative max-w-sm">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Request early access" 
                  className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-6 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 hover:bg-emerald-500 rounded-full transition-colors">
                  {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
                </button>
                {subscribed && (
                  <span className="absolute -bottom-6 left-4 text-xs text-emerald-400">Request received! ✅</span>
                )}
              </form>
            </div>

            <div className="md:col-span-3 md:col-start-8">
              <h4 className="font-outfit font-medium text-white mb-6">Platform</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="/workspace" className="hover:text-emerald-400 transition-colors">Terminal Workspace</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features Engine</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-outfit font-medium text-white mb-6">Company</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} AlgoSwift Execution Matrix. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter X</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
