import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Zap, 
  CreditCard, 
  Headphones, 
  FileCheck2, 
  CheckCircle2
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: 'Authorized Distribution',
      description: 'Digital keys sourced directly from official platform distribution networks (Garena, Steam, Google, PlayStation, Xbox, Razer). 100% genuine inventory.'
    },
    {
      icon: Lock,
      title: 'Encrypted Checkout',
      description: 'End-to-end 256-bit SSL encrypted transactions. No sensitive payment details or card credentials are ever stored on servers.'
    },
    {
      icon: Zap,
      title: 'Automated Dispatch',
      description: 'Instant automated delivery infrastructure. Direct Free Fire UID recharges and digital codes are generated and dispatched within 60 seconds.'
    },
    {
      icon: CreditCard,
      title: 'Transparent Pricing',
      description: 'No hidden gateway markups, currency processing fees, or surprise surcharges. The price displayed is the exact amount charged.'
    },
    {
      icon: Headphones,
      title: '24/7 Order Support',
      description: 'Live order tracking and responsive customer support assistance ready to verify fulfillment status or resolve code queries anytime.'
    },
    {
      icon: FileCheck2,
      title: 'Purchase Guarantee',
      description: 'All vouchers and top-up transactions carry a full validity guarantee and anti-revocation warranty.'
    }
  ];

  return (
    <section id="trust-section" className="py-12 sm:py-16 border-b border-[#1e222b] bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-mono text-neutral-400 mb-1">
            STANDARDS & SECURITY
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Security & Fulfillment Architecture
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Direct publisher integration ensures fast, verified, and safe digital gaming transactions.
          </p>
        </div>

        {/* 6 Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#111317] border border-[#1e222b] rounded-xl p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-md bg-[#181b22] border border-[#222632] flex items-center justify-center text-neutral-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{pillar.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1e222b] flex items-center gap-1.5 text-[10px] font-mono text-neutral-500">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Dark Store Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Metric Bar */}
        <div className="bg-[#111317] border border-[#1e222b] rounded-xl p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-[#1e222b]">
            <div className="pt-2 md:pt-0">
              <div className="text-xl font-bold font-mono text-white">256-BIT</div>
              <div className="text-[10px] text-neutral-500 uppercase font-mono">SSL Encryption</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-xl font-bold font-mono text-white">99.98%</div>
              <div className="text-[10px] text-neutral-500 uppercase font-mono">Success Rate</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-xl font-bold font-mono text-white">&lt;60s</div>
              <div className="text-[10px] text-neutral-500 uppercase font-mono">Avg Dispatch Time</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-xl font-bold font-mono text-white">0%</div>
              <div className="text-[10px] text-neutral-500 uppercase font-mono">Account Risk</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

