import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Lock,
  Gamepad2,
  Play,
  Gamepad,
  Box,
  Square,
  Gem,
  Crosshair
} from 'lucide-react';
import { Platform } from '../types';

interface HeroProps {
  onBrowseCards: () => void;
  onViewDeals: () => void;
  onSelectPlatform: (platform: Platform | 'all') => void;
  onOpenQuickTopup: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBrowseCards,
  onViewDeals,
  onSelectPlatform,
  onOpenQuickTopup
}) => {
  const quickPlatforms: { name: Platform; icon: React.ElementType }[] = [
    { name: 'Free Fire', icon: Flame },
    { name: 'Garena', icon: Zap },
    { name: 'Steam', icon: Gamepad2 },
    { name: 'Google Play', icon: Play },
    { name: 'PlayStation', icon: Gamepad },
    { name: 'Xbox', icon: Box },
    { name: 'Roblox', icon: Square },
    { name: 'Razer Gold', icon: Gem },
    { name: 'Valorant', icon: Crosshair }
  ];

  return (
    <section id="hero-section" className="relative pt-16 sm:pt-24 pb-14 sm:pb-20 border-b border-[#1e222b] minimal-grid-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Minimal Operational Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111317] border border-[#1e222b] text-xs font-mono text-neutral-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Authorized Digital Vouchers & Instant Top-Ups</span>
        </div>

        {/* Big Impactful Centered Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
          Digital Game Vouchers & Direct Top-Ups
        </h1>

        {/* Clean Balanced Subtitle */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Instantly purchase authentic gaming gift cards, digital vouchers, and Free Fire UID diamonds from authorized distribution channels. Fast, verified, and secure.
        </p>

        {/* Centered Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            id="hero-browse-cta"
            onClick={onBrowseCards}
            className="px-6 py-3 rounded-lg bg-neutral-100 hover:bg-white text-neutral-950 font-bold text-xs font-mono transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            id="hero-direct-uid-cta"
            onClick={onOpenQuickTopup}
            className="px-5 py-3 rounded-lg bg-[#14171f] hover:bg-[#1a1e27] border border-[#262c38] hover:border-neutral-500 text-neutral-200 font-medium text-xs font-mono transition-colors cursor-pointer flex items-center gap-2"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Free Fire Direct Top-Up</span>
          </button>

          <button
            id="hero-deals-cta"
            onClick={onViewDeals}
            className="px-4 py-3 rounded-lg text-neutral-400 hover:text-neutral-200 text-xs font-mono transition-colors cursor-pointer"
          >
            View Discounts
          </button>
        </div>

        {/* Minimal Centered Trust Badges with Icons */}
        <div className="mt-12 pt-8 border-t border-[#1e222b] flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Authorized Keys</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>&lt;60s Automated Delivery</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-sky-400 shrink-0" />
            <span>256-Bit SSL Encrypted</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-neutral-300 shrink-0" />
            <span>Zero Account Risk</span>
          </div>
        </div>

        {/* Platform Quick-Filter Pills with Lucide Icons */}
        <div className="mt-8 flex items-center justify-center gap-1.5 flex-wrap">
          <button
            onClick={() => onSelectPlatform('all')}
            className="px-3 py-1.5 rounded-md text-xs font-mono bg-[#14171f] border border-[#222632] hover:border-neutral-500 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            All Catalog
          </button>
          {quickPlatforms.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.name}
                onClick={() => onSelectPlatform(p.name)}
                className="px-3 py-1.5 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5 bg-[#14171f] text-neutral-400 hover:text-neutral-200 border border-[#222632] hover:border-neutral-500 cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-neutral-400" />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
