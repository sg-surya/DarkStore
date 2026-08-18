import React from 'react';
import { 
  X, 
  Printer, 
  ShieldCheck
} from 'lucide-react';
import { Order } from '../types';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150 font-mono">
      <div className="relative w-full max-w-xl bg-[#111317] border border-[#1e222b] rounded-xl shadow-2xl overflow-hidden my-auto">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e222b] bg-[#0c0e14] print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase">INVOICE & DISPATCH RECORD</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrint}
              className="px-2.5 py-1 rounded bg-[#181b22] hover:bg-[#222632] text-neutral-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded bg-[#181b22] text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-5 space-y-4 text-neutral-300">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-[#1e222b] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#181b22] border border-[#222632] flex items-center justify-center text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-bold text-white tracking-wider">
                  DARK<span className="text-neutral-500">STORE</span>
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">
                Direct Gaming Voucher & Top-Up Service
              </p>
            </div>

            <div className="text-right text-xs">
              <div className="font-bold text-white">{order.orderNumber}</div>
              <div className="text-neutral-500 text-[10px]">{order.createdAt}</div>
              <div className="text-emerald-400 font-bold text-[10px] mt-0.5">✓ {order.status.toUpperCase()}</div>
            </div>
          </div>

          {/* Customer & Payment Breakdown */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-[#0c0e14] p-3 rounded border border-[#1e222b]">
            <div>
              <div className="text-[9px] text-neutral-500 uppercase">ISSUED TO</div>
              <div className="font-semibold text-white mt-0.5 truncate">{order.customerEmail}</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-neutral-500 uppercase">PAYMENT CHANNEL</div>
              <div className="font-semibold text-white mt-0.5 uppercase">{order.paymentMethod}</div>
            </div>
          </div>

          {/* Purchased Line Items */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase text-neutral-500">Purchased Items</div>
            <div className="divide-y divide-[#1e222b] text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between">
                  <div>
                    <div className="text-white">{item.productTitle}</div>
                    <div className="text-[10px] text-neutral-500">
                      {item.denominationName} × {item.quantity}
                      {item.directUid && <span className="text-amber-400 ml-2">UID: {item.directUid}</span>}
                    </div>
                  </div>
                  <div className="font-bold text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispatched Vouchers list */}
          <div className="space-y-1.5 pt-2 border-t border-[#1e222b]">
            <div className="text-[10px] uppercase text-neutral-500">
              Activation Keys / Records
            </div>
            <div className="space-y-1 text-xs">
              {order.voucherCodes.map((v, i) => (
                <div key={i} className="p-2 rounded bg-[#0c0e14] border border-[#1e222b] flex justify-between items-center">
                  <span className="text-neutral-400 truncate max-w-[200px] text-[11px]">{v.productTitle}</span>
                  <span className="text-white font-bold text-xs">{v.code}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="pt-3 border-t border-[#1e222b] space-y-1 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount:</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-white pt-1 border-t border-[#1e222b]">
              <span>Total Paid:</span>
              <span className="text-emerald-400">${order.total.toFixed(2)} {order.currency}</span>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-2 border-t border-[#1e222b] text-[9px] text-neutral-600 text-center">
            Digital settlement completed. Support: support@darkstore.io
          </div>

        </div>

      </div>
    </div>
  );
};

