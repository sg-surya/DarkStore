import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Flame,
  Lock
} from 'lucide-react';
import { CartItem } from '../types';
import { CURRENCIES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  selectedCurrency: string;
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  selectedCurrency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const currentCurr = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const convertedSubtotal = (subtotal * currentCurr.rate).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 flex justify-end animate-in fade-in duration-150 font-mono">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-[#111317] border-l border-[#1e222b] shadow-2xl flex flex-col justify-between h-full z-10">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#1e222b] bg-[#0c0e14] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-neutral-300" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded bg-[#181b22] hover:bg-[#222632] text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-6">
              <div className="w-10 h-10 rounded-lg bg-[#181b22] flex items-center justify-center text-neutral-500">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-sm font-semibold text-white">Your Cart is Empty</div>
              <p className="text-xs text-neutral-500 max-w-xs">
                Explore our catalog for authorized digital gift cards and Free Fire top-ups.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-[#0c0e14] border border-[#1e222b] rounded-lg p-3 space-y-2"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.image}
                    alt={item.productTitle}
                    className="w-10 h-10 rounded object-cover border border-[#1e222b] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-neutral-400 uppercase">
                        {item.platform}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="text-xs font-semibold text-white truncate">{item.productTitle}</h4>
                    <div className="text-[10px] text-neutral-500">{item.denominationName}</div>
                    
                    {item.directUid && (
                      <div className="text-[10px] text-amber-400 mt-0.5 flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        UID: {item.directUid} ({item.serverRegion || 'Global'})
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity and Price row */}
                <div className="pt-2 border-t border-[#1e222b] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-[#111317] border border-[#222632] rounded p-0.5">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-neutral-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-neutral-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">
                      {currentCurr.symbol}{((item.price * item.quantity) * currentCurr.rate).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#1e222b] bg-[#0c0e14] space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>{currentCurr.symbol}{convertedSubtotal}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Delivery</span>
                <span className="text-emerald-400">Free (Instant)</span>
              </div>
              <div className="flex justify-between font-bold text-white pt-1.5 border-t border-[#1e222b]">
                <span>Total</span>
                <span className="text-emerald-400 text-sm">
                  {currentCurr.symbol}{convertedSubtotal} {currentCurr.code}
                </span>
              </div>
            </div>

            <button
              id="cart-proceed-checkout-btn"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-2.5 rounded bg-neutral-100 hover:bg-white text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-500">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
