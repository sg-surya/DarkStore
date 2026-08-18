import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Globe
} from 'lucide-react';
import { Product, Denomination } from '../types';
import { CURRENCIES } from '../data/products';

interface ProductCardProps {
  product: Product;
  selectedCurrency: string;
  onSelectProduct: (product: Product) => void;
  onInstantBuy: (product: Product, denomination: Denomination) => void;
  onAddToCart: (product: Product, denomination: Denomination) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedCurrency,
  onSelectProduct,
  onInstantBuy,
  onAddToCart
}) => {
  const currentCurr = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];
  const lowestPriceDenom = product.denominations[0];
  const lowestPrice = (lowestPriceDenom.price * currentCurr.rate).toFixed(2);
  const isFreeFire = product.platform === 'Free Fire';

  return (
    <div
      id={`product-card-${product.id}`}
      className="store-card rounded-xl flex flex-col justify-between overflow-hidden cursor-pointer group"
      onClick={() => onSelectProduct(product)}
    >
      {/* Top Image Container */}
      <div className="relative h-40 overflow-hidden bg-[#0c0e14]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
          {product.tag && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#090a0f]/90 text-neutral-200 border border-[#262c38]">
              {product.tag}
            </span>
          )}

          <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-mono text-neutral-300 bg-[#090a0f]/90 border border-[#262c38] flex items-center gap-1">
            <Globe className="w-2.5 h-2.5 text-neutral-400" />
            {product.region}
          </span>
        </div>

        {/* Bottom Delivery Badge */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-neutral-300 bg-[#090a0f]/90 border border-[#262c38] flex items-center gap-1">
            {product.deliveryType === 'direct_uid_topup' ? (
              <>
                <Zap className="w-3 h-3 text-amber-400" /> Direct Top-Up
              </>
            ) : (
              <>
                <ShieldCheck className="w-3 h-3 text-neutral-400" /> Instant Code
              </>
            )}
          </span>

          <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-[#090a0f]/90 px-1.5 py-0.5 rounded border border-[#262c38]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1 font-mono">
            <span className="text-neutral-400 font-semibold">{product.platform}</span>
            <span className="text-[10px]">{(product.reviewCount).toLocaleString()} reviews</span>
          </div>

          <h3 className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors line-clamp-1">
            {product.title}
          </h3>

          {/* Denominations Pill Preview */}
          <div className="mt-2.5 flex items-center gap-1 flex-wrap">
            {product.denominations.slice(0, 3).map((d) => (
              <span
                key={d.id}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#0c0e14] border border-[#1e222b] text-neutral-400"
              >
                {d.name.split(' ')[0]}
              </span>
            ))}
            {product.denominations.length > 3 && (
              <span className="text-[10px] font-mono text-neutral-500">
                +{product.denominations.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-[#1e222b] space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-mono block">From</span>
              <span className="text-base font-bold font-mono text-emerald-400">
                {currentCurr.symbol}{lowestPrice}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 bg-[#0c0e14] px-2 py-0.5 rounded border border-[#1e222b]">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>Official</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onSelectProduct(product)}
              className="w-full py-1.5 rounded-lg bg-[#181b22] hover:bg-[#20242e] text-neutral-300 font-medium text-xs font-mono transition-colors cursor-pointer text-center border border-[#262c38]"
            >
              Details
            </button>
            <button
              id={`buy-now-${product.id}`}
              onClick={() => onInstantBuy(product, lowestPriceDenom)}
              className="w-full py-1.5 rounded-lg font-semibold text-xs font-mono transition-colors cursor-pointer flex items-center justify-center gap-1 bg-neutral-100 hover:bg-white text-neutral-950"
            >
              <span>Buy</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

