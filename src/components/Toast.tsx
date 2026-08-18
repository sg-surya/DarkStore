import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl flex items-start gap-3 transition-all animate-in slide-in-from-bottom-5 duration-300 ${
            toast.type === 'success'
              ? 'bg-slate-900 border-emerald-500/40 text-white'
              : toast.type === 'error'
              ? 'bg-slate-900 border-red-500/40 text-white'
              : 'bg-slate-900 border-cyan-500/40 text-white'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold font-mono">{toast.title}</div>
            {toast.message && (
              <div className="text-[11px] text-slate-400 mt-0.5 leading-normal">{toast.message}</div>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-500 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
