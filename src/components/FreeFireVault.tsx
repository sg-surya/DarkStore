import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Crown, 
  Gem,
  Flame
} from 'lucide-react';
import { Product, Denomination } from '../types';
import { CURRENCIES, SAMPLE_SAVED_PLAYER_IDS } from '../data/products';

interface FreeFireVaultProps {
  freeFireProducts: Product[];
  selectedCurrency: string;
  onInstantBuy: (product: Product, denomination: Denomination, uid?: string, region?: string) => void;
  onAddToCart: (product: Product, denomination: Denomination, uid?: string, region?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const FreeFireVault: React.FC<FreeFireVaultProps> = ({
  freeFireProducts,
  selectedCurrency,
  onInstantBuy,
  onAddToCart,
  onSelectProduct
}) => {
  const currentCurr = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];

  // Direct Top-up state
  const [playerUid, setPlayerUid] = useState('8492049182');
  const [serverRegion, setServerRegion] = useState('Global');
  const [isValidatingUid, setIsValidatingUid] = useState(false);
  const [validatedIgn, setValidatedIgn] = useState<string | null>('SHADOW_FIRE (Lvl 68 • Heroic)');
  
  // Selected Denomination for the primary direct topup product
  const directProduct = freeFireProducts.find(p => p.id === 'ff-diamonds-topup') || freeFireProducts[0];
  const [selectedDenomId, setSelectedDenomId] = useState(directProduct?.denominations[2]?.id || 'ff-520');

  const selectedDenom = directProduct?.denominations.find(d => d.id === selectedDenomId) || directProduct?.denominations[0];

  const handleValidateUid = () => {
    if (!playerUid.trim() || playerUid.length < 6) {
      alert('Please enter a valid numeric Free Fire Player ID (UID, 6-12 digits).');
      return;
    }

    setIsValidatingUid(true);
    setValidatedIgn(null);

    setTimeout(() => {
      setIsValidatingUid(false);
      const found = SAMPLE_SAVED_PLAYER_IDS.find(p => p.uid === playerUid);
      if (found) {
        setValidatedIgn(`${found.ign} (${found.region} Server)`);
      } else {
        setValidatedIgn(`Garena_Player_${playerUid.slice(-4)} (Active • Lvl 54)`);
      }
    }, 400);
  };

  return (
    <section id="freefire-vault-section" className="py-8 sm:py-12 border-b border-[#1e222b] minimal-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#1e222b]">
          <div>
            <div className="text-xs font-mono text-amber-400 mb-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              DIRECT GAME TOP-UP
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Free Fire Diamond Top-Up Terminal
            </h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-xl font-mono">
              Direct player recharge with automated in-game mailbox dispatch. No account password required.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-300 bg-[#111317] border border-[#222632] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Official Direct Link
            </span>
          </div>
        </div>

        {/* Top-Up Terminal Workspace */}
        <div className="bg-[#111317] border border-[#1e222b] rounded-xl p-5 sm:p-6 mb-8 font-mono">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Step 1 & 2: UID Input & Region Selection */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Step 1: UID Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded bg-neutral-800 text-white flex items-center justify-center text-[10px]">1</span>
                    Player UID
                  </label>
                  <span className="text-[10px] text-neutral-500">Public ID only</span>
                </div>

                <div className="flex gap-2">
                  <input
                    id="ff-uid-input"
                    type="text"
                    value={playerUid}
                    onChange={(e) => setPlayerUid(e.target.value)}
                    placeholder="Enter Player UID..."
                    className="w-full bg-[#0c0e14] border border-[#222632] focus:border-neutral-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 outline-none"
                  />
                  <button
                    onClick={handleValidateUid}
                    disabled={isValidatingUid}
                    className="px-3 py-2 rounded-lg bg-[#181b22] hover:bg-[#222632] border border-[#262c38] text-neutral-200 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {isValidatingUid ? 'Checking...' : 'Verify'}
                  </button>
                </div>

                {/* Validation Status Box */}
                {validatedIgn && (
                  <div className="mt-2 p-2 rounded-md bg-[#0c0e14] border border-[#1e222b] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                      <span className="text-neutral-400 text-[11px]">IGN:</span>
                      <span className="text-neutral-200 truncate">{validatedIgn}</span>
                    </div>
                    <Check className="w-3 h-3 text-emerald-400 shrink-0 ml-2" />
                  </div>
                )}

                {/* Preset Chips */}
                <div className="mt-2 flex items-center gap-1 overflow-x-auto text-[10px] text-neutral-500">
                  <span>Presets:</span>
                  {SAMPLE_SAVED_PLAYER_IDS.filter(s => s.game === 'Free Fire').map((s) => (
                    <button
                      key={s.uid}
                      onClick={() => {
                        setPlayerUid(s.uid);
                        setValidatedIgn(`${s.ign} (${s.region})`);
                        setServerRegion(s.region);
                      }}
                      className="px-1.5 py-0.5 rounded bg-[#0c0e14] hover:bg-[#181b22] text-neutral-400 border border-[#1e222b] transition-colors"
                    >
                      {s.ign}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Server Region Selection */}
              <div>
                <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5 mb-1.5">
                  <span className="w-4 h-4 rounded bg-neutral-800 text-white flex items-center justify-center text-[10px]">2</span>
                  Server Region
                </label>

                <div className="grid grid-cols-3 gap-1.5">
                  {['Global', 'BR', 'SEA', 'IND', 'MENA', 'LATAM'].map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setServerRegion(reg)}
                      className={`p-1.5 rounded-md text-xs text-center border transition-colors ${
                        serverRegion === reg
                          ? 'bg-[#1a1e27] text-white font-semibold border-[#2e3544]'
                          : 'bg-[#0c0e14] text-neutral-400 border-[#1e222b] hover:border-neutral-700'
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notice */}
              <div className="bg-[#0c0e14] rounded-lg p-3 border border-[#1e222b] space-y-1 text-xs text-neutral-400">
                <div className="flex items-center gap-1 text-neutral-300 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Instant Account Credit
                </div>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  Items are deposited straight to the specified UID via automated clearing within 30-60 seconds.
                </p>
              </div>

            </div>

            {/* Step 3: Denomination Selector & Checkout Summary */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-neutral-800 text-white flex items-center justify-center text-[10px]">3</span>
                  Select Package
                </label>
                <span className="text-[11px] text-emerald-400">
                  +10% Bonus Included
                </span>
              </div>

              {/* Denominations Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {directProduct?.denominations.map((denom) => {
                  const isSelected = denom.id === selectedDenomId;
                  const convertedPrice = (denom.price * currentCurr.rate).toFixed(2);

                  return (
                    <div
                      key={denom.id}
                      onClick={() => setSelectedDenomId(denom.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#181b22] border-sky-500'
                          : 'bg-[#0c0e14] hover:bg-[#14171e] border-[#1e222b]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-white flex items-center gap-1">
                          <Gem className="w-3 h-3 text-sky-400" />
                          {denom.value}
                        </span>
                        {denom.bonus && (
                          <span className="text-[9px] text-amber-400">
                            {denom.bonus}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-neutral-400 truncate">
                        {denom.name.split('Diamonds')[0]}
                      </div>

                      <div className="mt-2 pt-2 border-t border-[#1e222b] flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400">
                          {currentCurr.symbol}{convertedPrice}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Checkout Bar */}
              {selectedDenom && (
                <div className="mt-4 p-3.5 rounded-lg bg-[#0c0e14] border border-[#1e222b] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-neutral-500">SELECTED PACKAGE</div>
                    <div className="text-xs font-semibold text-white flex items-center gap-2">
                      <span>{selectedDenom.name}</span>
                      <span className="text-neutral-400">UID: {playerUid || 'Not set'}</span>
                    </div>
                    <div className="text-xs text-emerald-400 font-bold mt-0.5">
                      Total: {currentCurr.symbol}{(selectedDenom.price * currentCurr.rate).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => onAddToCart(directProduct, selectedDenom, playerUid, serverRegion)}
                      className="flex-1 sm:flex-none px-3 py-2 rounded-lg bg-[#181b22] hover:bg-[#222632] text-neutral-300 text-xs border border-[#262c38] transition-colors"
                    >
                      Add Cart
                    </button>
                    <button
                      id="ff-instant-buy-btn"
                      onClick={() => onInstantBuy(directProduct, selectedDenom, playerUid, serverRegion)}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-neutral-100 hover:bg-white text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Recharge Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Free Fire Bundles */}
        <div className="space-y-3 font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-[#1e222b]">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              Special Memberships & Passes
            </h3>
            <span className="text-xs text-neutral-500">Instant Activation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {freeFireProducts.filter(p => p.id !== 'ff-diamonds-topup').map((bundle) => (
              <div
                key={bundle.id}
                className="bg-[#111317] border border-[#1e222b] rounded-lg p-4 transition-colors flex flex-col justify-between space-y-3"
              >
                <div className="flex gap-3">
                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="w-16 h-16 rounded-md object-cover border border-[#1e222b] shrink-0"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-[#181b22] text-neutral-300 border border-[#262c38]">
                        {bundle.tag || 'VIP'}
                      </span>
                      <span className="text-[10px] text-neutral-500">UID Deposit</span>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{bundle.title}</h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-2">{bundle.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1e222b]">
                  {bundle.denominations.slice(0, 2).map((d) => (
                    <button
                      key={d.id}
                      onClick={() => onInstantBuy(bundle, d, playerUid, serverRegion)}
                      className="p-2 rounded bg-[#0c0e14] hover:bg-[#181b22] border border-[#1e222b] hover:border-neutral-700 text-left transition-colors"
                    >
                      <div className="text-[10px] font-semibold text-neutral-300 truncate">
                        {d.name}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-bold text-emerald-400">
                          {currentCurr.symbol}{(d.price * currentCurr.rate).toFixed(2)}
                        </span>
                        {d.bonus && (
                          <span className="text-[9px] text-amber-400">{d.bonus}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => onSelectProduct(bundle)}
                    className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
                  >
                    View Details <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] text-neutral-500">{(bundle.reviewCount).toLocaleString()} verified ratings</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
