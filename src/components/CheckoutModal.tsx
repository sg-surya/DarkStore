import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Zap, 
  Check, 
  Copy, 
  ArrowRight, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order, VoucherCodeItem } from '../types';
import { CURRENCIES, INITIAL_COUPONS } from '../data/products';

interface CheckoutModalProps {
  items: CartItem[];
  selectedCurrency: string;
  onClose: () => void;
  onOrderCompleted: (order: Order) => void;
  onViewReceipt: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  items,
  selectedCurrency,
  onClose,
  onOrderCompleted,
  onViewReceipt
}) => {
  const currentCurr = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];

  // Checkout Form State
  const [customerEmail, setCustomerEmail] = useState('gamer@darkstore.io');
  const [customerName, setCustomerName] = useState('Alex Mercer');
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'paypal' | 'apple_pay' | 'crypto' | 'upi'>('card');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [revealedVouchers, setRevealedVouchers] = useState<Record<number, boolean>>({});
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? (subtotal * (appliedCoupon.percent / 100)) : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount);

  const convertedSubtotal = (subtotal * currentCurr.rate).toFixed(2);
  const convertedDiscount = (discountAmount * currentCurr.rate).toFixed(2);
  const convertedTotal = (totalAmount * currentCurr.rate).toFixed(2);

  // Handle Coupon Application
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const found = INITIAL_COUPONS.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.active);
    if (found) {
      if (found.minSpend && subtotal < found.minSpend) {
        setCouponError(`Min order: $${found.minSpend}.00`);
        return;
      }
      setAppliedCoupon({ code: found.code, percent: found.discountPercent });
      setCouponCode('');
    } else {
      setCouponError('Invalid code. Try "BOOYAH10".');
    }
  };

  // Trigger Checkout Execution
  const handleCompletePayment = () => {
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!agreeTerms) {
      alert('Please accept terms of digital delivery.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      const voucherCodes: VoucherCodeItem[] = items.flatMap((item) => {
        const codes: VoucherCodeItem[] = [];
        for (let i = 0; i < item.quantity; i++) {
          if (item.deliveryType === 'direct_uid_topup') {
            codes.push({
              productTitle: `${item.productTitle} (${item.denominationName})`,
              denominationName: item.denominationName,
              code: `UID: ${item.directUid || '8492049182'} • DISPATCHED`,
              pin: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
              directUid: item.directUid || '8492049182',
              redeemed: true,
              platform: item.platform,
              deliveryType: 'direct_uid_topup'
            });
          } else {
            const randomCode = `${item.platform.slice(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
            const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
            codes.push({
              productTitle: `${item.productTitle} (${item.denominationName})`,
              denominationName: item.denominationName,
              code: randomCode,
              pin: randomPin,
              redeemed: false,
              platform: item.platform,
              deliveryType: 'instant_code',
              expiresAt: '2028-12-31'
            });
          }
        }
        return codes;
      });

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `DS-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Completed',
        customerEmail,
        customerName,
        paymentMethod: selectedPayment,
        items,
        subtotal,
        discount: discountAmount,
        total: totalAmount,
        currency: currentCurr.code,
        voucherCodes,
        directUid: items.find(i => i.directUid)?.directUid,
        serverRegion: items.find(i => i.serverRegion)?.serverRegion
      };

      setCompletedOrder(newOrder);
      onOrderCompleted(newOrder);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleCopyVoucher = (code: string, index: number) => {
    navigator.clipboard?.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const toggleRevealVoucher = (index: number) => {
    setRevealedVouchers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      
      <div 
        id="checkout-modal"
        className="relative w-full max-w-2xl bg-[#111317] border border-[#1e222b] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col font-mono"
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e222b] bg-[#0c0e14] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#181b22] border border-[#222632] flex items-center justify-center text-neutral-300">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide">
                {completedOrder ? 'TRANSACTION DISPATCHED' : 'CHECKOUT'}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded bg-[#181b22] hover:bg-[#222632] text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 space-y-4">

          {/* SUCCESS SCREEN */}
          {completedOrder ? (
            <div className="space-y-4">
              
              {/* Success Banner */}
              <div className="p-4 rounded-lg bg-[#0c0e14] border border-[#1e222b] text-center space-y-1.5">
                <div className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Payment Verified & Keys Dispatched
                </h3>
                <p className="text-xs text-neutral-400">
                  Order <span className="font-bold text-white">{completedOrder.orderNumber}</span> fulfilled. Receipt sent to <span className="text-neutral-300">{completedOrder.customerEmail}</span>.
                </p>
              </div>

              {/* Digital Vouchers */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Digital Key(s):</span>
                  <span>{completedOrder.voucherCodes.length} Item(s)</span>
                </div>

                <div className="space-y-2">
                  {completedOrder.voucherCodes.map((voucher, idx) => {
                    const isRevealed = revealedVouchers[idx];
                    const isDirect = voucher.deliveryType === 'direct_uid_topup';

                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[#0c0e14] border border-[#1e222b] space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-xs text-neutral-300 truncate">
                            {voucher.productTitle}
                          </div>
                          <span className="text-[10px] text-neutral-500 uppercase">
                            {voucher.platform}
                          </span>
                        </div>

                        {isDirect ? (
                          <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>{voucher.code}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2 pt-1">
                            <div className="text-xs font-bold text-white bg-[#181b22] px-2.5 py-1 rounded border border-[#262c38]">
                              {isRevealed ? voucher.code : '••••-••••-••••-••••'}
                              {voucher.pin && isRevealed && ` (PIN: ${voucher.pin})`}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => toggleRevealVoucher(idx)}
                                className="px-2 py-1 rounded bg-[#181b22] hover:bg-[#222632] text-neutral-300 text-[10px] transition-colors"
                              >
                                {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              </button>

                              <button
                                onClick={() => handleCopyVoucher(voucher.code, idx)}
                                className="px-2 py-1 rounded bg-neutral-200 hover:bg-white text-neutral-950 font-bold text-[10px] transition-colors"
                              >
                                {copiedCodeIndex === idx ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions on Success */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#1e222b]">
                <button
                  onClick={() => onViewReceipt(completedOrder)}
                  className="px-3.5 py-1.5 rounded bg-[#181b22] hover:bg-[#222632] text-neutral-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Receipt className="w-3.5 h-3.5" />
                  View Invoice
                </button>

                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded bg-neutral-100 hover:bg-white text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Return to Store
                </button>
              </div>

            </div>
          ) : (
            /* ACTIVE CHECKOUT FORM */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Left Form */}
              <div className="md:col-span-7 space-y-3">
                
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Email Address
                  </label>
                  <input
                    id="checkout-email-input"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-[#0c0e14] border border-[#222632] focus:border-neutral-500 rounded px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Payment Method
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPayment('card')}
                      className={`p-2 rounded border text-left transition-colors ${
                        selectedPayment === 'card'
                          ? 'bg-[#181b22] border-[#3b4458] text-white'
                          : 'bg-[#0c0e14] border-[#1e222b] text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="text-xs font-semibold">Credit Card</div>
                      <div className="text-[10px] text-neutral-500">Instant Tokenized</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment('paypal')}
                      className={`p-2 rounded border text-left transition-colors ${
                        selectedPayment === 'paypal'
                          ? 'bg-[#181b22] border-[#3b4458] text-white'
                          : 'bg-[#0c0e14] border-[#1e222b] text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="text-xs font-semibold">PayPal</div>
                      <div className="text-[10px] text-neutral-500">Express Checkout</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment('apple_pay')}
                      className={`p-2 rounded border text-left transition-colors ${
                        selectedPayment === 'apple_pay'
                          ? 'bg-[#181b22] border-[#3b4458] text-white'
                          : 'bg-[#0c0e14] border-[#1e222b] text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="text-xs font-semibold">Apple / Google Pay</div>
                      <div className="text-[10px] text-neutral-500">Biometric</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPayment('crypto')}
                      className={`p-2 rounded border text-left transition-colors ${
                        selectedPayment === 'crypto'
                          ? 'bg-[#181b22] border-[#3b4458] text-white'
                          : 'bg-[#0c0e14] border-[#1e222b] text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="text-xs font-semibold">USDT / Web3</div>
                      <div className="text-[10px] text-neutral-500">Polygon / BSC</div>
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#0c0e14] border border-[#1e222b] flex items-center gap-2 text-xs text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
                  <span>256-bit encrypted checkout. Zero raw card storage.</span>
                </div>

                <label className="flex items-start gap-1.5 text-xs text-neutral-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-3.5 h-3.5 mt-0.5"
                  />
                  <span className="text-[10px]">
                    I agree to terms of digital voucher delivery and accuracy of UID.
                  </span>
                </label>

              </div>

              {/* Right Summary */}
              <div className="md:col-span-5 bg-[#0c0e14] border border-[#1e222b] rounded-lg p-3 space-y-3 flex flex-col justify-between">
                
                <div className="space-y-2">
                  <span className="text-[10px] uppercase text-neutral-500 block border-b border-[#1e222b] pb-1">
                    Summary ({items.reduce((s, i) => s + i.quantity, 0)} Items)
                  </span>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs py-0.5">
                        <div className="truncate max-w-[130px]">
                          <div className="text-neutral-200 truncate">{item.productTitle}</div>
                          <div className="text-[10px] text-neutral-500">{item.denominationName} × {item.quantity}</div>
                        </div>
                        <span className="font-bold text-white">
                          {currentCurr.symbol}{((item.price * item.quantity) * currentCurr.rate).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleApplyCoupon} className="pt-1">
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        className="flex-1 bg-[#111317] border border-[#222632] rounded px-2 py-1 text-xs text-white placeholder-neutral-600 outline-none uppercase"
                      />
                      <button
                        type="submit"
                        className="px-2.5 py-1 rounded bg-[#181b22] hover:bg-[#222632] text-neutral-200 text-xs border border-[#262c38]"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[9px] text-red-400 mt-0.5">{couponError}</p>}
                    {appliedCoupon && (
                      <p className="text-[9px] text-emerald-400 mt-0.5 flex items-center justify-between">
                        <span>Code applied: {appliedCoupon.code} (-{appliedCoupon.percent}%)</span>
                        <button type="button" onClick={() => setAppliedCoupon(null)} className="text-neutral-500 hover:text-white">✕</button>
                      </p>
                    )}
                  </form>

                  <div className="pt-2 border-t border-[#1e222b] space-y-1 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Subtotal</span>
                      <span>{currentCurr.symbol}{convertedSubtotal}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount</span>
                        <span>-{currentCurr.symbol}{convertedDiscount}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-bold text-white pt-1 border-t border-[#1e222b]">
                      <span>Total Due</span>
                      <span className="text-emerald-400">
                        {currentCurr.symbol}{convertedTotal}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="submit-payment-btn"
                    onClick={handleCompletePayment}
                    disabled={isProcessing}
                    className="w-full py-2.5 rounded bg-neutral-100 hover:bg-white text-neutral-950 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {isProcessing ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Pay {currentCurr.symbol}{convertedTotal}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

