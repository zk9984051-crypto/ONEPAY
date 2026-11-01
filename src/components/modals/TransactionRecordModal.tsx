import React, { useState } from 'react';
import { X, ArrowDownToLine, ArrowUpFromLine, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { WalletTransaction } from '../../types';

interface TransactionRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: WalletTransaction[];
  initialFilter?: 'all' | 'recharge' | 'withdrawal' | 'orders';
}

export const TransactionRecordModal: React.FC<TransactionRecordModalProps> = ({
  isOpen,
  onClose,
  transactions,
  initialFilter = 'all',
}) => {
  const [filter, setFilter] = useState<'all' | 'recharge' | 'withdrawal' | 'orders'>(initialFilter);

  React.useEffect(() => {
    if (isOpen && initialFilter) {
      setFilter(initialFilter);
    }
  }, [isOpen, initialFilter]);

  if (!isOpen) return null;

  const filtered = transactions.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'recharge') return t.type === 'recharge';
    if (filter === 'withdrawal') return t.type === 'withdrawal';
    if (filter === 'orders') return t.type === 'buy_order' || t.type === 'sell_order';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-serif italic text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-5 h-5 text-red-600" />
              <span>Transaction History</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-serif italic">
              USDT TRC-20 Recharge & Withdrawal Records (ریکارڈ)
            </span>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-serif italic">
          {[
            { id: 'all', label: 'All', urdu: 'تمام' },
            { id: 'recharge', label: 'Recharge', urdu: 'ریچارج' },
            { id: 'withdrawal', label: 'Withdraw', urdu: 'ودڈرا' },
            { id: 'orders', label: 'Orders', urdu: 'آرڈرز' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`py-1.5 rounded-lg transition-all text-center flex flex-col items-center cursor-pointer ${
                filter === tab.id
                  ? 'bg-white font-bold text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="text-[11px] leading-tight font-semibold">{tab.label}</span>
              <span className="text-[9px] opacity-75">{tab.urdu}</span>
            </button>
          ))}
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 space-y-2.5 pr-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 font-serif italic">
              No transactions recorded in this category
            </div>
          ) : (
            filtered.map((t) => (
              <div
                key={t.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs flex justify-between items-center"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif italic font-bold text-slate-900 capitalize">
                      {t.type.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-slate-200 px-1.5 py-0.2 rounded text-slate-700">
                      {t.method}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{t.timestamp}</p>
                  <p className="text-[10px] text-slate-400 font-mono">Ref: {t.trxId}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`font-mono font-bold block ${
                      t.type === 'recharge' || t.type === 'commission_reward'
                        ? 'text-emerald-600'
                        : 'text-slate-900'
                    }`}
                  >
                    {t.type === 'recharge' || t.type === 'commission_reward' ? '+' : '-'} PKR{' '}
                    {t.amountPKR.toLocaleString('en-PK')}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">{t.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
