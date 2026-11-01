import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ShieldCheck, TrendingUp, CheckCircle2, ChevronRight, X, Clock, HelpCircle, AlertCircle } from 'lucide-react';

interface SavingsViewProps {
  user: UserProfile;
  onSubscribe: (planTitle: string, amount: number, returnRate: number) => void;
  onOpenRecharge: () => void;
}

export const SavingsView: React.FC<SavingsViewProps> = ({
  user,
  onSubscribe,
  onOpenRecharge,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<{
    title: string;
    rate: number;
    duration: string;
    minPurchase: number;
  } | null>(null);

  const [investAmount, setInvestAmount] = useState('1000');
  const [subscribedMessage, setSubscribedMessage] = useState<string | null>(null);

  const savingsPlans = [
    {
      id: 'plan-1',
      title: 'USDT Flexible Earn',
      rate: 25,
      duration: 'Flexible',
      minPurchase: 1000,
      soldRatio: '35.01%',
      soldAmount: '350,103,500',
      badge: 'Popular',
      isHot: true,
    },
    {
      id: 'plan-2',
      title: 'USDT 1-Day Flash Staking',
      rate: 25,
      duration: '1 Days',
      minPurchase: 1000,
      soldRatio: '42.80%',
      soldAmount: '120,400,000',
      badge: 'Recommended',
      isHot: false,
    },
    {
      id: 'plan-3',
      title: 'USDT 30-Day Growth Vault',
      rate: 32,
      duration: '30 Days',
      minPurchase: 3000,
      soldRatio: '68.50%',
      soldAmount: '450,890,000',
      badge: 'High Yield',
      isHot: false,
    },
    {
      id: 'plan-4',
      title: 'USDT 90-Day VIP Staking',
      rate: 45,
      duration: '90 Days',
      minPurchase: 10000,
      soldRatio: '89.12%',
      soldAmount: '890,200,000',
      badge: 'VIP Only',
      isHot: false,
    },
  ];

  const handleConfirmSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    const amount = Number(investAmount);
    if (isNaN(amount) || amount <= 0) return;

    if (user.orderAvailable < amount) {
      alert(`Insufficient available balance (PKR ${user.orderAvailable.toLocaleString()}). Please recharge first.`);
      return;
    }

    onSubscribe(selectedPlan.title, amount, selectedPlan.rate);
    const estProfit = ((amount * (selectedPlan.rate / 100)) / 365).toFixed(2);
    setSubscribedMessage(
      `✓ Successfully subscribed ${amount.toLocaleString()} PKR to ${selectedPlan.title} at ${selectedPlan.rate}% APY! Daily estimated reward: +${estProfit} PKR`
    );
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-full bg-[#f8faff] text-slate-800 pb-24 select-none animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-[#4364F7] text-white px-5 py-4 shadow-md sticky top-0 z-30 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-sans">Savings Vault</h1>
          <p className="text-xs text-white/80">
            Compound your idle balance with automated daily yields
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-white/70 block">Available Balance</span>
          <span className="text-sm font-bold font-mono">
            PKR {user.orderAvailable.toLocaleString('en-PK')}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {subscribedMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-2xl text-xs font-medium flex items-center justify-between animate-in slide-in-from-top-2">
            <span>{subscribedMessage}</span>
            <button
              onClick={() => setSubscribedMessage(null)}
              className="text-emerald-700 font-bold ml-2"
            >
              ×
            </button>
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-blue-100 font-semibold uppercase tracking-wider">
              Zero Risk Guarantee
            </span>
            <h3 className="text-lg font-extrabold leading-tight">
              Tether USDT Yield Pools
            </h3>
            <p className="text-xs text-white/80">
              Interest settled every 24 hours directly into your wallet.
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Plans List */}
        <div className="space-y-3">
          {savingsPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* USDT Icon */}
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                    ₮
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{plan.title}</h4>
                    <span className="text-[11px] text-slate-500">{plan.duration}</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {plan.badge}
                </span>
              </div>

              {/* Rate & Purchase Specs */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-red-600">
                      {plan.rate}%
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ Year</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Min purchase: {plan.minPurchase} PKR
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">
                    Sold: {plan.soldAmount}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {plan.soldRatio} filled
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-1.5 rounded-full"
                  style={{ width: plan.soldRatio }}
                />
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedPlan(plan)}
                className="w-full py-2 bg-gradient-to-r from-[#5376f7] to-[#4364F7] hover:from-[#4466e6] hover:to-[#3453e6] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Subscribe to {selectedPlan.title}
              </h3>
              <button
                onClick={() => setSelectedPlan(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Annual Percentage Yield:</span>
                <span className="font-bold text-red-600 text-sm">{selectedPlan.rate}% APY</span>
              </div>
              <div className="flex justify-between">
                <span>Lockup Period:</span>
                <span className="font-bold text-slate-900">{selectedPlan.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Available Balance:</span>
                <span className="font-mono font-bold text-emerald-600">
                  PKR {user.orderAvailable.toLocaleString()}
                </span>
              </div>
            </div>

            <form onSubmit={handleConfirmSubscribe} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subscription Amount (PKR):
                </label>
                <input
                  type="number"
                  min={selectedPlan.minPurchase}
                  max={user.orderAvailable}
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4364F7] outline-none"
                  required
                />
              </div>

              <div className="flex justify-between gap-1.5 pt-1">
                {[1000, 2000, 5000, 10000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setInvestAmount(val.toString())}
                    className="flex-1 py-1 bg-slate-100 text-slate-700 text-[11px] font-mono rounded-lg hover:bg-slate-200"
                  >
                    {val}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-2 py-2 text-xs font-bold text-white bg-[#4364F7] hover:bg-[#3455e8] rounded-xl shadow-md"
                >
                  Confirm Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
