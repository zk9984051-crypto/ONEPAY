import React, { useState } from 'react';
import { Power, Clock, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { FinanceIllustration } from './FinanceIllustration';
import { P2POrder, UserProfile } from '../types';

interface SellViewProps {
  user: UserProfile;
  activeSellOrder: P2POrder | null;
  onToggleYield: (type: 'low' | 'medium') => void;
  onConfirmReceipt: (orderId: string) => void;
  onOpenHistory: () => void;
}

export const SellView: React.FC<SellViewProps> = ({
  user,
  activeSellOrder,
  onToggleYield,
  onConfirmReceipt,
  onOpenHistory,
}) => {
  const [lowYieldActive, setLowYieldActive] = useState(false);
  const [mediumYieldActive, setMediumYieldActive] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleLowYieldClick = () => {
    setLowYieldActive((prev) => !prev);
    onToggleYield('low');
  };

  const handleMediumYieldClick = () => {
    setMediumYieldActive((prev) => !prev);
    onToggleYield('medium');
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 animate-in fade-in duration-200">
      {/* Top Bar with History Icon (Exact from Screenshot 3) */}
      <div className="flex justify-end pt-1">
        <button
          onClick={onOpenHistory}
          className="p-1 text-slate-700 hover:text-slate-900 transition-colors"
          title="Order Records"
        >
          <div className="w-6 h-6 border-2 border-slate-800 rounded-md flex flex-col items-center justify-center p-0.5 relative">
            <Clock className="w-3.5 h-3.5 text-slate-800" />
          </div>
        </button>
      </div>

      {/* Top Balance Card (Exact from Screenshot 3: Order available | in transaction) */}
      <div className="bg-gradient-to-r from-[#d9e5ff] to-[#e6eeff] rounded-2xl p-4.5 shadow-xs border border-[#cfdfff]/80">
        <div className="grid grid-cols-2 divide-x divide-slate-300/60">
          {/* Order available */}
          <div className="pr-3 space-y-1">
            <span className="font-serif italic text-sm font-semibold text-slate-800 block">
              Order available
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif italic text-2xl font-bold text-slate-900 tabular-nums">
                {user.orderAvailable.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="font-serif italic text-xs font-bold text-slate-800">
                PKR
              </span>
            </div>
          </div>

          {/* in transaction */}
          <div className="pl-4 space-y-1">
            <span className="font-serif italic text-sm font-semibold text-slate-800 block">
              in transaction
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif italic text-2xl font-bold text-slate-900 tabular-nums">
                {user.inTransaction.toLocaleString('en-PK')}
              </span>
              <span className="font-serif italic text-xs font-bold text-slate-800">
                PKR
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Risk Buttons: Low risk and High risk */}
      <div className="grid grid-cols-2 gap-3">
        {/* Low risk */}
        <button
          onClick={handleLowYieldClick}
          className={`bg-white rounded-xl p-3 shadow-xs border transition-all flex items-center justify-between text-left group ${
            lowYieldActive ? 'border-emerald-500 ring-2 ring-emerald-400' : 'border-slate-100 hover:border-slate-300'
          }`}
        >
          <span className="font-serif italic text-xs sm:text-sm font-bold text-slate-800 block tracking-tight">
            Low risk
          </span>

          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 ml-1 ${
              lowYieldActive ? 'bg-emerald-500 text-white shadow-xs' : 'bg-[#e62020] text-white shadow-xs'
            }`}
          >
            <Power className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>

        {/* High risk */}
        <button
          onClick={handleMediumYieldClick}
          className={`bg-white rounded-xl p-3 shadow-xs border transition-all flex items-center justify-between text-left group ${
            mediumYieldActive ? 'border-emerald-500 ring-2 ring-emerald-400' : 'border-slate-100 hover:border-slate-300'
          }`}
        >
          <span className="font-serif italic text-xs sm:text-sm font-bold text-slate-800 block tracking-tight">
            High risk
          </span>

          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 ml-1 ${
              mediumYieldActive ? 'bg-emerald-500 text-white shadow-xs' : 'bg-[#e62020] text-white shadow-xs'
            }`}
          >
            <Power className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      </div>

      {/* Main Area: Empty State or Active Sell Match */}
      <div className="pt-6 flex flex-col items-center justify-center">
        {!activeSellOrder ? (
          <div className="text-center space-y-4">
            <FinanceIllustration className="w-72 h-60" />
            <p className="font-serif italic text-xs text-slate-400">
              You do not currently have an order in progress
            </p>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              Toggle <strong>Low risk</strong> or <strong>High risk</strong> to start receiving automated customer payments via EasyPaisa & JazzCash!
            </p>
          </div>
        ) : (
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 border border-slate-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="font-serif italic text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Buyer Paid! Confirm Receipt
              </span>
              <span className="text-[10px] font-mono text-slate-500">{activeSellOrder.orderNumber}</span>
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-xl space-y-1 text-center border border-emerald-200">
              <span className="text-[11px] text-emerald-800 font-serif italic">Received in your {activeSellOrder.method === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'}:</span>
              <div className="text-2xl font-mono font-extrabold text-slate-900">
                PKR {activeSellOrder.amountPKR.toLocaleString('en-PK')}
              </div>
              <span className="text-[10px] text-emerald-700 font-bold block">
                + PKR {activeSellOrder.commissionPKR.toFixed(2)} Yield Earned
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Buyer Name:</span>
                <span className="font-semibold">{activeSellOrder.counterpartyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">TRX ID:</span>
                <span className="font-mono font-bold text-slate-900">{activeSellOrder.trxId}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsConfirming(true);
                setTimeout(() => {
                  setIsConfirming(false);
                  onConfirmReceipt(activeSellOrder.id);
                }, 1000);
              }}
              disabled={isConfirming}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isConfirming ? 'Releasing...' : 'Confirm Payment Received & Release'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
