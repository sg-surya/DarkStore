import React from 'react';
import { 
  ShieldCheck, 
  Flame, 
  Gamepad2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onFilterPlatform: (platform: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onFilterPlatform }) => {
  return (
    <footer id="main-footer" className="bg-[#07080c] border-t border-[#1e222b] text-neutral-400 text-xs font-mono">
      
      {/* Top Banner */}
      <div className="border-b border-[#1e222b] py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#111317] border border-[#222632] flex items-center justify-center text-neutral-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white text-xs">AUTHORIZED DIGITAL GAMING INVENTORY</div>
              <div className="text-[10px] text-neutral-500">
                Official top-ups & prepaid codes • 100% replacement warranty
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
            <span className="px-2 py-0.5 rounded bg-[#111317] border border-[#1e222b]">SSL 256-BIT</span>
            <span className="px-2 py-0.5 rounded bg-[#111317] border border-[#1e222b]">3D SECURE</span>
            <span className="px-2 py-0.5 rounded bg-[#111317] border border-[#1e222b]">PCI-DSS</span>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-neutral-100 flex items-center justify-center text-neutral-950 font-bold text-xs">
                DS
              </div>
              <span className="text-sm font-bold text-white tracking-wider">DARK STORE</span>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Minimalist digital gift card and direct gaming top-up depot. Instant automated voucher fulfillment.
            </p>
            <div className="text-[10px] text-emerald-400">
              ● Fulfillment Engine: Operational
            </div>
          </div>

          {/* Col 2: Popular Game Cards */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">Catalog</h4>
            <ul className="space-y-1 text-[11px]">
              <li>
                <button onClick={() => { onFilterPlatform('Free Fire'); onNavigate('freefire'); }} className="hover:text-white flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" /> Free Fire Diamonds
                </button>
              </li>
              <li>
                <button onClick={() => { onFilterPlatform('Garena'); onNavigate('marketplace'); }} className="hover:text-white">
                  Garena Shells
                </button>
              </li>
              <li>
                <button onClick={() => { onFilterPlatform('Steam'); onNavigate('marketplace'); }} className="hover:text-white">
                  Steam Wallet
                </button>
              </li>
              <li>
                <button onClick={() => { onFilterPlatform('Google Play'); onNavigate('marketplace'); }} className="hover:text-white">
                  Google Play
                </button>
              </li>
              <li>
                <button onClick={() => { onFilterPlatform('PlayStation'); onNavigate('marketplace'); }} className="hover:text-white">
                  PlayStation Network
                </button>
              </li>
              <li>
                <button onClick={() => { onFilterPlatform('Roblox'); onNavigate('marketplace'); }} className="hover:text-white">
                  Roblox Robux
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Trust & Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">Navigation</h4>
            <ul className="space-y-1 text-[11px]">
              <li>
                <button onClick={() => onNavigate('user-dashboard')} className="hover:text-white">
                  My Orders & Digital Keys
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trust')} className="hover:text-white">
                  Security & Compliance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-dashboard')} className="hover:text-white">
                  Admin & Operations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Anti-Fraud Legal Notice */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">Compliance</h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Dark Store operates with verified distributor feeds. All voucher PINs and top-up transfers are securely processed.
            </p>
            <div className="text-[10px] text-neutral-600">
              © {new Date().getFullYear()} Dark Store Digital Systems.
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#14171e] py-3 px-4 text-center text-[10px] text-neutral-600">
        Dark Store — Minimal Digital Game Voucher & Top-Up Depot
      </div>
    </footer>
  );
};

