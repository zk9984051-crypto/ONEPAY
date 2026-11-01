import React from 'react';
import { X, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../../types';

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpgradePackage: (level: string, cost: number) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpgradePackage,
}) => {
  if (!isOpen) return null;

  const packages = [
    {
      level: 'VIP 1 Starter Package',
      yieldRate: '0.45%',
      dailyOrders: 15,
      cost: 10000,
      perks: ['Priority EasyPaisa Instant Matching', '0.45% Yield per Order', 'Direct Support'],
    },
    {
      level: 'VIP 2 Pro Package (Recommended)',
      yieldRate: '0.75%',
      dailyOrders: 35,
      cost: 30000,
      perks: ['Instant JazzCash & EasyPaisa Escrow', '0.75% High Yield', 'VIP Manager'],
    },
    {
      level: 'VIP 3 Elite Master',
      yieldRate: '1.20%',
      dailyOrders: 80,
      cost: 75000,
      perks: ['Unlimited Daily P2P Matching', '1.20% Maximum Yield', 'Exclusive Team Rebates'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-serif italic text-lg font-bold text-slate-900">
              Package Service
            </h3>
            <span className="text-[11px] text-slate-500 font-serif italic">
              Purchase package to unlock higher order commissions
            </span>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto space-y-3 flex-1 text-xs">
          {packages.map((pkg) => (
            <div
              key={pkg.level}
              className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 hover:border-blue-400 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif italic font-bold text-slate-900">{pkg.level}</h4>
                  <span className="text-emerald-600 font-bold font-mono">Yield: {pkg.yieldRate}</span>
                </div>
                <span className="font-mono font-extrabold text-sm text-slate-900">
                  PKR {pkg.cost.toLocaleString('en-PK')}
                </span>
              </div>

              <div className="space-y-1 text-slate-600 text-[11px]">
                {pkg.perks.map((p, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  onUpgradePackage(pkg.level, pkg.cost);
                  onClose();
                }}
                className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold font-serif italic text-xs mt-1 transition-colors"
              >
                Upgrade Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
