import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  Check, 
  Clock, 
  Globe, 
  Share2, 
  Flame, 
  Layers, 
  BadgeCheck,
  ArrowRight
} from 'lucide-react';
import { Product, Denomination } from '../types';
import { CURRENCIES, SAMPLE_SAVED_PLAYER_IDS } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  selectedCurrency: string;
  onClose: () => void;
  onInstantBuy: (product: Product, denomination: Denomination, uid?: string, region?: string) => void;
  onAddToCart: (product: Product, denomination: Denomination, uid?: string, region?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  selectedCurrency,
  onClose,
  onInstantBuy,
  onAddToCart
}) => {
  if (!product) return null;

  const currentCurr = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];

  // Selected Denomination
  const [selectedDenomId, setSelectedDenomId] = useState(
    product.denominations.find(d => d.popular)?.id || product.denominations[0]?.id
  );
  
  // Direct UID state for Free Fire / Direct games
  const [playerUid, setPlayerUid] = useState(
    product.platform === 'Free Fire' ? '8492049182' : ''
  );
  const [serverRegion, setServerRegion] = useState('Global');
  const [activeTab, setActiveTab] = useState<'details' | 'redeem' | 'authenticity' | 'reviews'>('details');
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedDenom = product.denominations.find(d => d.id === selectedDenomId) || product.denominations[0];
  const finalPrice = (selectedDenom.price * currentCurr.rate).toFixed(2);
  const originalPrice = selectedDenom.originalPrice ? (selectedDenom.originalPrice * currentCurr.rate).toFixed(2) : null;
  const isFreeFire = product.platform === 'Free Fire';

  const handleCopyShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      
      {/* Modal Container */}
      <div 
        id="product-detail-modal"
        className="relative w-full max-w-3xl bg-[#111317] border border-[#1e222b] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e222b] bg-[#0c0e14] shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#181b22] text-neutral-300 border border-[#262c38]">
              {product.platform}
            </span>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
              <Globe className="w-3 h-3 text-neutral-500" /> {product.region} Region
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyShare}
              className="p-1.5 rounded bg-[#181b22] hover:bg-[#222632] text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Share Link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
            <button
              id="close-product-detail-btn"
              onClick={onClose}
              className="p-1.5 rounded bg-[#181b22] hover:bg-[#222632] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-5 space-y-5">
          
          {/* Top Banner / Image & Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Left Product Visual */}
            <div className="md:col-span-5 space-y-2">
              <div className="relative rounded-lg overflow-hidden border border-[#1e222b] bg-[#090a0f] aspect-video md:aspect-square flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 flex items-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#111317]/90 text-neutral-200 border border-[#1e222b] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    {product.estimatedDeliveryTime}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0c0e14] border border-[#1e222b] flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Authorized Digital Inventory</span>
              </div>
            </div>

            {/* Right Product Overview */}
            <div className="md:col-span-7 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">({product.reviewCount.toLocaleString()} reviews)</span>
                  {product.tag && (
                    <span className="ml-auto px-1.5 py-0.2 rounded text-[9px] font-mono font-medium bg-[#181b22] text-neutral-300 border border-[#262c38]">
                      {product.tag}
                    </span>
                  )}
                </div>

                <h1 className="text-lg font-bold text-white leading-snug">
                  {product.title}
                </h1>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-1 text-xs text-neutral-300 bg-[#0c0e14] p-3 rounded-lg border border-[#1e222b] font-mono">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Direct UID Input (For Free Fire / Top-Up Products) */}
              {product.deliveryType === 'direct_uid_topup' && (
                <div className="p-3 rounded-lg bg-[#0c0e14] border border-[#1e222b] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-semibold text-neutral-200 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      Player UID
                    </label>
                    <span className="text-[10px] text-neutral-500 font-mono">Direct In-Game Credit</span>
                  </div>
                  <input
                    type="text"
                    value={playerUid}
                    onChange={(e) => setPlayerUid(e.target.value)}
                    placeholder="Enter Player UID..."
                    className="w-full bg-[#111317] border border-[#222632] focus:border-neutral-500 rounded px-2.5 py-1.5 text-xs font-mono text-white placeholder-neutral-600 outline-none"
                  />
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                    <span>Region:</span>
                    {['Global', 'BR', 'SEA', 'IND'].map((r) => (
                      <button
                        key={r}
                        onClick={() => setServerRegion(r)}
                        className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                          serverRegion === r
                            ? 'bg-[#181b22] text-white border border-[#2e3544]'
                            : 'bg-[#111317] text-neutral-500 hover:text-neutral-300'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Denominations Selector Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-neutral-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-neutral-400" />
                Select Denomination
              </span>
              <span className="text-xs font-mono text-neutral-500">
                {product.denominations.length} options
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {product.denominations.map((denom) => {
                const isSelected = denom.id === selectedDenomId;
                const convertedPrice = (denom.price * currentCurr.rate).toFixed(2);

                return (
                  <button
                    key={denom.id}
                    onClick={() => setSelectedDenomId(denom.id)}
                    className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1a1e27] border-[#3b4458]'
                        : 'bg-[#0c0e14] hover:bg-[#14171e] border-[#1e222b]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white truncate mb-1">
                      {denom.name}
                    </div>

                    <div className="flex items-center justify-between font-mono">
                      <span className="text-xs font-bold text-emerald-400">
                        {currentCurr.symbol}{convertedPrice}
                      </span>
                      {denom.bonus && (
                        <span className="text-[9px] text-amber-400">
                          {denom.bonus}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Informational Tabs: Details, How to Redeem, Authenticity, Reviews */}
          <div className="border-t border-[#1e222b] pt-4 space-y-3">
            <div className="flex items-center gap-2 border-b border-[#1e222b] overflow-x-auto pb-1">
              {[
                { id: 'details', label: 'Specification' },
                { id: 'redeem', label: 'Redemption Guide' },
                { id: 'authenticity', label: 'Compliance' },
                { id: 'reviews', label: `Reviews (${product.reviewCount})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-2.5 py-1.5 text-xs font-mono whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-white border-white font-semibold'
                      : 'text-neutral-500 border-transparent hover:text-neutral-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Specifications & Policy */}
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300 font-mono">
                <div className="p-3 rounded bg-[#0c0e14] border border-[#1e222b] space-y-1">
                  <div className="text-neutral-500 uppercase text-[10px]">DELIVERY METHOD</div>
                  <div className="font-semibold text-white">
                    {product.deliveryType === 'direct_uid_topup' ? 'Automated In-Game Mailbox Dispatch' : 'Digital Key / PIN Display'}
                  </div>
                  <p className="text-neutral-400 text-[11px]">
                    Automatic execution upon payment clearance within 60 seconds.
                  </p>
                </div>

                <div className="p-3 rounded bg-[#0c0e14] border border-[#1e222b] space-y-1">
                  <div className="text-neutral-500 uppercase text-[10px]">REFUND POLICY</div>
                  <div className="font-semibold text-white">100% Guaranteed Validity</div>
                  <p className="text-neutral-400 text-[11px]">{product.refundPolicy}</p>
                </div>
              </div>
            )}

            {/* Tab 2: How to Redeem */}
            {activeTab === 'redeem' && (
              <div className="p-3 rounded bg-[#0c0e14] border border-[#1e222b] space-y-2 text-xs text-neutral-300 font-mono">
                <div className="text-neutral-400 font-semibold uppercase text-[11px]">
                  Activation Instructions:
                </div>
                <ol className="space-y-1 list-decimal list-inside text-neutral-400 text-xs">
                  {product.howToRedeem.map((step, idx) => (
                    <li key={idx}>
                      <span className="text-neutral-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Tab 3: Authenticity */}
            {activeTab === 'authenticity' && (
              <div className="p-3 rounded bg-[#0c0e14] border border-[#1e222b] space-y-1.5 text-xs text-neutral-300 font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  AUTHENTIC DISTRIBUTOR INVENTORY
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">{product.authenticityInfo}</p>
              </div>
            )}

            {/* Tab 4: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-2 text-xs font-mono">
                {[
                  { user: 'Siddharth R.', rating: 5, date: 'Yesterday', text: 'Instant topup! Diamonds received in under a minute directly in my inbox.', verified: true },
                  { user: 'Marcus K.', rating: 5, date: '2 days ago', text: 'Clean code generation, redeemed on Steam wallet instantly.', verified: true }
                ].map((rev, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-[#0c0e14] border border-[#1e222b] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{rev.user}</span>
                      <span className="text-[10px] text-neutral-500">{rev.date}</span>
                    </div>
                    <p className="text-neutral-400 text-[11px]">{rev.text}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-5 py-3 border-t border-[#1e222b] bg-[#0c0e14] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <div className="text-[10px] text-neutral-500 font-mono uppercase">Total Due</div>
            <div className="text-base font-bold font-mono text-emerald-400">
              {currentCurr.symbol}{finalPrice} <span className="text-xs text-neutral-500">{currentCurr.code}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onAddToCart(product, selectedDenom, playerUid, serverRegion);
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#181b22] hover:bg-[#222632] text-neutral-200 text-xs font-mono border border-[#262c38] transition-colors cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              id="modal-instant-buy-btn"
              onClick={() => {
                onInstantBuy(product, selectedDenom, playerUid, serverRegion);
                onClose();
              }}
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-neutral-100 hover:bg-white text-neutral-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Instant Buy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

