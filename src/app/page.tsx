'use client';

import React from 'react';
import { AlgoProvider, useAlgo } from '@/context/AlgoContext';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { StatsBar } from '@/components/sections/StatsBar';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';

function GlobalModals() {
  const { activeModal, setActiveModal } = useAlgo();

  return (
    <>
      <Modal 
        isOpen={activeModal === 'signup'} 
        onClose={() => setActiveModal(null)}
        title="Get Started with Algo1"
      >
        <div className="flex flex-col gap-4 py-2">
          <p>Create an account to start building and backtesting your strategies for free.</p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg py-2.5 px-4 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
            <Button className="w-full" onClick={() => setActiveModal(null)}>Continue with Email</Button>
          </div>
          <div className="text-center text-xs mt-2">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'demo'} 
        onClose={() => setActiveModal(null)}
        title="Algo1 Platform Demo"
        maxWidth="max-w-2xl"
      >
        <div className="aspect-video bg-black/10 rounded-lg flex items-center justify-center border border-[var(--border)]">
          {/* Simulated Video Player */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <span className="text-xs font-medium">Watch Full Overview</span>
          </div>
        </div>
      </Modal>
    </>
  );
}

function AlgoApp() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <HowItWorks />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <GlobalModals />
    </div>
  );
}

export default function Page() {
  return (
    <AlgoProvider>
      <AlgoApp />
    </AlgoProvider>
  );
}
