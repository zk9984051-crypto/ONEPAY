import React, { useState } from 'react';
import {
  Volume2,
  TrendingUp,
  Heart,
  Crown,
  CreditCard,
  Trophy,
  ArrowDownToLine,
  ArrowUpFromLine,
  Coins,
  PlusCircle,
  ArrowRightCircle,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  HelpCircle,
  X,
  ExternalLink,
  ShieldCheck,
  Gift,
  Clock
} from 'lucide-react';
import { UserProfile, DailyTask, NavTab } from '../types';
import { useBinanceRates } from '../context/BinanceRatesContext';

interface HomeViewProps {
  user: UserProfile;
  dailyTasks: DailyTask[];
  onClaimDailyTask: (taskId: string) => void;
  isBalanceCelebrating?: boolean;
  onOpenRecharge: () => void;
  onOpenWithdrawal: () => void;
  onOpenInvite: () => void;
  onNavigateTab: (tab: NavTab) => void;
  onOpenInstallModal?: () => void;
  onOpenHistory?: (tab?: 'all' | 'recharge' | 'withdrawal' | 'orders') => void;
  onOpenRanking?: () => void;
  onOpenCollection?: () => void;
  onOpenPackages?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  dailyTasks,
  onClaimDailyTask,
  isBalanceCelebrating,
  onOpenRecharge,
  onOpenWithdrawal,
  onOpenInvite,
  onNavigateTab,
  onOpenInstallModal,
  onOpenHistory,
  onOpenRanking,
  onOpenCollection,
  onOpenPackages,
}) => {
  const { rates } = useBinanceRates();
  const [showWhatIsModal, setShowWhatIsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSymbolModal, setShowSymbolModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState<{
    title: string;
    rate: number;
    duration: string;
  } | null>(null);
  const [subscribeAmount, setSubscribeAmount] = useState('1000');
  const [subscribeSuccess, setSubscribeSuccess] = useState<string | null>(null);

  const activeDailyTask = dailyTasks.find((t) => !t.isClaimed) || dailyTasks[0];

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showSubscribeModal) return;
    const amount = Number(subscribeAmount);
    if (isNaN(amount) || amount <= 0) return;

    if (user.orderAvailable < amount) {
      alert(`Insufficient available balance (PKR ${user.orderAvailable.toLocaleString()}). Please recharge first.`);
      return;
    }

    setSubscribeSuccess(
      `✓ Successfully subscribed ${amount.toLocaleString()} PKR at ${showSubscribeModal.rate}% / Year! Daily yield will be automatically credited.`
    );
    setShowSubscribeModal(null);
  };

  return (
    <div className="min-h-full bg-white text-slate-800 pb-24 select-none relative animate-in fade-in duration-200">
      
      {/* 1. HERO BANNER: ONEPAY with 3D Card Illustration matching screenshot */}
      <div className="bg-gradient-to-b from-[#e3f0ff] via-[#d6e9fe] to-[#f3f7fd] px-5 pt-6 pb-5 rounded-b-[28px] relative overflow-hidden shadow-2xs">
        {/* Soft background glow circles */}
        <div className="absolute top-0 right-0 w-52 h-52 bg-blue-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          {/* Left Text */}
          <div className="space-y-1 max-w-[210px]">
            <h1 className="text-[28px] leading-tight font-black text-[#f78b1f] tracking-wide font-sans uppercase">
              ONEPAY
            </h1>
            <p className="text-[15px] font-bold text-[#1e50bb] leading-tight">
              Don't just HODL.
            </p>
            <p className="text-[17px] font-extrabold text-[#f78b1f] leading-tight">
              Earn.
            </p>
          </div>

          {/* Right 3D Credit Card & Golden Ribbon Illustration from screenshot */}
          <div className="relative w-36 h-28 flex items-center justify-center shrink-0">
            {/* 3D Blue Card */}
            <div className="w-32 h-20 bg-gradient-to-tr from-[#0b63e5] via-[#2079ff] to-[#5ba2ff] rounded-xl shadow-xl shadow-blue-500/30 p-2.5 text-white flex flex-col justify-between transform rotate-[-8deg] hover:rotate-0 transition-transform duration-300 border border-white/40">
              <div className="flex justify-between items-center">
                {/* Chip */}
                <div className="w-4 h-3 rounded bg-amber-300 border border-amber-400" />
                <span className="text-[8px] font-mono tracking-widest text-white/80">8888 8888 8888 888</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-bold tracking-wider">ONEPAY</span>
                <span className="text-[8px] bg-white/20 px-1 py-0.5 rounded font-bold uppercase">UnionPay</span>
              </div>
            </div>

            {/* Golden Flowing Receipt Ribbon */}
            <div className="absolute bottom-[-6px] left-[-4px] w-28 h-7 bg-gradient-to-r from-[#ffe494] via-[#ffd066] to-[#ffb833] rounded-sm transform rotate-[14deg] shadow-md border-t border-white/60 opacity-95 flex items-center justify-around px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700/40" />
            </div>
          </div>
        </div>

        {/* 3 Dots carousel indicator from screenshot */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f78b1f]" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
        </div>
      </div>

      <div className="px-4 pt-3.5 space-y-4">
        
        {/* 2. MARQUEE / ANNOUNCEMENT PILL: "What is ONEPAY?" */}
        <button
          onClick={() => setShowWhatIsModal(true)}
          className="w-full bg-white rounded-full py-2.5 px-4 border border-blue-100 shadow-2xs flex items-center gap-2.5 text-left hover:border-blue-300 transition-colors cursor-pointer group"
        >
          <Volume2 className="w-4 h-4 text-[#4364F7] group-hover:scale-110 transition-transform shrink-0" />
          <span className="text-xs text-slate-600 font-medium tracking-tight">
            What is ONEPAY?
          </span>
          <span className="ml-auto text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
            Guide
          </span>
        </button>

        {/* DAILY TASK BONUS CARD (Interactive Daily Bonus with celebratory balance feedback) */}
        {activeDailyTask && (
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-3.5 text-white shadow-md relative overflow-hidden flex items-center justify-between">
            <div className="space-y-0.5 z-10">
              <div className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-200 animate-bounce" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-100">
                  Daily Task Bonus (روزانہ انعام)
                </span>
              </div>
              <h3 className="text-sm font-bold leading-tight">
                {activeDailyTask.title}
              </h3>
              <p className="text-[11px] text-amber-100 font-medium">
                Reward: <span className="font-extrabold text-white">+{activeDailyTask.rewardPKR} PKR</span> / 0.18 USDT
              </p>
            </div>

            <button
              onClick={() => onClaimDailyTask(activeDailyTask.id)}
              disabled={activeDailyTask.isClaimed}
              className={`z-10 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1 ${
                activeDailyTask.isClaimed
                  ? 'bg-white/30 text-white cursor-not-allowed'
                  : 'bg-white text-orange-600 hover:bg-amber-50 active:scale-95'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeDailyTask.isClaimed ? 'Claimed ✓' : 'Claim Bonus'}</span>
            </button>

            {/* Background sparkle icon */}
            <Sparkles className="absolute -right-3 -bottom-3 w-20 h-20 text-white/10 pointer-events-none" />
          </div>
        )}

        {/* 3. 10 ACTION ICON TILES GRID (2 Rows of 5, matching screenshot exactly) */}
        <div className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-2xs">
          {/* Row 1: Savings, Buy, Sell, symbol, Invite friends */}
          <div className="grid grid-cols-5 gap-2 text-center pb-3 border-b border-slate-100/80">
            {/* 1. Savings */}
            <button
              onClick={() => onNavigateTab('savings')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl border border-blue-200 bg-white flex items-center justify-center text-[#4364F7] shadow-2xs group-hover:scale-105 group-hover:border-blue-400 transition-all">
                {/* Circle with diamond */}
                <svg className="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <polygon points="12 7 17 12 12 17 7 12 12 7" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-700 font-medium mt-1 tracking-tight">
                Savings
              </span>
            </button>

            {/* 2. Buy */}
            <button
              onClick={() => onNavigateTab('buy')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl border border-blue-200 bg-white flex items-center justify-center text-[#4364F7] shadow-2xs group-hover:scale-105 group-hover:border-blue-400 transition-all">
                {/* Currency circle with plus */}
                <svg className="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v8m-4-4h8" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-700 font-medium mt-1 tracking-tight">
                Buy
              </span>
            </button>

            {/* 3. Sell */}
            <button
              onClick={() => onNavigateTab('sell')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl border border-blue-200 bg-white flex items-center justify-center text-[#4364F7] shadow-2xs group-hover:scale-105 group-hover:border-blue-400 transition-all">
                {/* Currency circle with outgoing arrow */}
                <svg className="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12h6m-3-3l3 3-3 3" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-700 font-medium mt-1 tracking-tight">
                Sell
              </span>
            </button>

            {/* 4. symbol */}
            <button
              onClick={() => setShowSymbolModal(true)}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl border border-blue-200 bg-white flex items-center justify-center text-[#4364F7] shadow-2xs group-hover:scale-105 group-hover:border-blue-400 transition-all">
                {/* Upward trending line chart in circle */}
                <svg className="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M7 14l3-3 2.5 2.5L16 9" />
                  <path d="M13 9h3v3" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-700 font-medium mt-1 tracking-tight">
                symbol
              </span>
            </button>

            {/* 5. Invite friends */}
            <button
              onClick={onOpenInvite}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl border border-blue-200 bg-white flex items-center justify-center text-[#4364F7] shadow-2xs group-hover:scale-105 group-hover:border-blue-400 transition-all">
                {/* User with heart */}
                <svg className="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M19 11l1.5 1.5 3-3" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-700 font-medium mt-1 tracking-tight truncate max-w-[54px]">
                Invite friends
              </span>
            </button>
          </div>

          {/* Row 2: Top up, Withdrawal, member, Collection, Leaderboard */}
          <div className="grid grid-cols-5 gap-2 text-center pt-3">
            {/* 6. Top up */}
            <button
              onClick={onOpenRecharge}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl border border-blue-200 bg-white flex items-center justify-center text-[#4364F7] shadow-2xs group-hover:scale-105 group-hover:border-blue-400 transition-all">
                {/* Currency circle with down arrow */}
                <svg className="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10m-3-3l3 3 3-3" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-700 font-medium mt-1 tracking-tight">
                Top up
              </span>
            </button>

            {/* 7. Withdrawal */}
            <button
              onClick={onOpenWithdrawal}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl border border-blue-200 bg-white flex items-center justify-center text-[#4364F7] shadow-2xs group-hover:scale-105 group-hover:border-blue-400 transition-all">
                {/* ATM card slot / money receipt */}
                <svg className="w-5 h-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <path d="M12 9v6" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-700 font-medium mt-1 tracking-tight">
                Withdrawal
              </span>
            </button>

            {/* 8. member */}
            <button
              onClick={onOpenPackages}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl border border-blue-200 bg-white flex items-center justify-center text-[#4364F7] shadow-2xs group-hover:scale-105 group-hover:border-blue-400 transition-all">
                <Crown className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[11px] text-slate-700 font-medium mt-1 tracking-tight">
                member
              </span>
            </button>

            {/* 9. Collection */}
            <button
              onClick={onOpenCollection}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl border border-blue-200 bg-white flex items-center justify-center text-[#4364F7] shadow-2xs group-hover:scale-105 group-hover:border-blue-400 transition-all">
                <CreditCard className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[11px] text-slate-700 font-medium mt-1 tracking-tight">
                Collection
              </span>
            </button>

            {/* 10. Leaderboard */}
            <button
              onClick={onOpenRanking}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl border border-blue-200 bg-white flex items-center justify-center text-[#4364F7] shadow-2xs group-hover:scale-105 group-hover:border-blue-400 transition-all">
                <Trophy className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[11px] text-slate-700 font-medium mt-1 tracking-tight">
                Leaderboard
              </span>
            </button>
          </div>
        </div>

        {/* 4. SECTION "| Popular" matching screenshot */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-4 bg-[#4364F7] rounded-full inline-block" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Popular
            </h2>
          </div>

          {/* Popular Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-red-600">
                    25%
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ Year</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  1000 minimum purchase
                </div>
              </div>

              {/* Tether USDT logo & Flexible badge */}
              <div className="flex flex-col items-end">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                  ₮
                </div>
                <span className="text-xs font-bold text-slate-800 mt-1">
                  Flexible
                </span>
                <span className="text-[10px] text-slate-400">
                  Sold: 350103500 | 35.01%
                </span>
              </div>
            </div>

            {/* Orange Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full"
                style={{ width: '35.01%' }}
              />
            </div>

            {/* Subscribe Button */}
            <button
              onClick={() =>
                setShowSubscribeModal({
                  title: 'Flexible USDT Vault',
                  rate: 25,
                  duration: 'Flexible',
                })
              }
              className="w-full py-2.5 bg-gradient-to-r from-[#5a7ef8] to-[#4364F7] hover:from-[#4b70ed] hover:to-[#3859ed] text-white text-xs font-bold rounded-xl shadow-xs active:scale-98 transition-all cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* 5. SECTION "| recommended" matching screenshot */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-4 bg-[#4364F7] rounded-full inline-block" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              recommended
            </h2>
          </div>

          {/* Recommended Card 1 */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                  ₮
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">USDT</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                    1 Days
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xl font-extrabold text-red-600">
                  25%
                </span>
                <span className="text-xs text-slate-400 font-medium"> / Year</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-50">
              <span>minimum purchase: 1000</span>
              <span>Sold: 350103500 | 35.01%</span>
            </div>

            <button
              onClick={() =>
                setShowSubscribeModal({
                  title: '1-Day USDT Staking',
                  rate: 25,
                  duration: '1 Days',
                })
              }
              className="w-full py-2 bg-gradient-to-r from-[#5a7ef8] to-[#4364F7] hover:from-[#4b70ed] hover:to-[#3859ed] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* 6. FLOATING "Contact us" WIDGET ON RIGHT EDGE matching screenshot */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => setShowSupportModal(true)}
          className="bg-[#4364F7] text-white py-3 px-2 rounded-l-2xl shadow-xl hover:bg-[#3455e8] flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-all border-y border-l border-white/30"
          title="Customer Service"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[10px] font-bold [writing-mode:vertical-lr] tracking-wider uppercase">
            Contact us
          </span>
        </button>
      </div>

      {/* Interactive Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Subscribe to {showSubscribeModal.title}
              </h3>
              <button
                onClick={() => setShowSubscribeModal(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3.5 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Annual Return:</span>
                <span className="font-extrabold text-red-600 text-sm">{showSubscribeModal.rate}% / Year</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-bold text-slate-900">{showSubscribeModal.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Available Balance:</span>
                <span className="font-mono font-bold text-emerald-600">
                  PKR {user.orderAvailable.toLocaleString()}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubscribeSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amount in PKR:
                </label>
                <input
                  type="number"
                  min="1000"
                  max={user.orderAvailable}
                  value={subscribeAmount}
                  onChange={(e) => setSubscribeAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4364F7] outline-none"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubscribeModal(null)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-2 py-2 text-xs font-bold text-white bg-[#4364F7] hover:bg-[#3455e8] rounded-xl shadow-md"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* "What is ONEPAY?" Info Modal */}
      {showWhatIsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-3.5 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#4364F7]" />
                <span>What is ONEPAY?</span>
              </h3>
              <button
                onClick={() => setShowWhatIsModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                <strong>ONEPAY</strong> is Pakistan's leading peer-to-peer crypto and fiat liquidity platform allowing users to:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>Earn up to <strong>25%~45% / Year</strong> through automated flexible USDT staking.</li>
                <li>Match Buy & Sell orders with verified traders via EasyPaisa, JazzCash, IME Pay, and USDT TRC-20.</li>
                <li>Earn guaranteed commission on every transaction matched.</li>
                <li>Complete daily tasks to unlock instant cash vouchers.</li>
              </ul>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-emerald-800 text-[11px] font-semibold">
                ✓ 100% Reserve Audited · 24/7 Fast Withdrawals · Zero Fees
              </div>
            </div>

            <button
              onClick={() => setShowWhatIsModal(false)}
              className="w-full py-2 bg-[#4364F7] text-white text-xs font-bold rounded-xl shadow-sm"
            >
              Understood (سمجھ گیا)
            </button>
          </div>
        </div>
      )}

      {/* "symbol" Market Rates Modal */}
      {showSymbolModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-3 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#4364F7]" />
                <span>Binance P2P Symbol Rates</span>
              </h3>
              <button
                onClick={() => setShowSymbolModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-800 block">USDT / PKR (Recharge)</span>
                  <span className="text-[10px] text-slate-400">Live P2P Buy Price</span>
                </div>
                <span className="font-mono font-bold text-emerald-600 text-sm">
                  {(rates.rechargeRate || 280.85).toFixed(2)} PKR
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-800 block">USDT / PKR (Withdrawal)</span>
                  <span className="text-[10px] text-slate-400">Live P2P Sell Price</span>
                </div>
                <span className="font-mono font-bold text-blue-600 text-sm">
                  {(rates.withdrawalRate || 283.30).toFixed(2)} PKR
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-800 block">USDT / PKR (ONE PAY)</span>
                  <span className="text-[10px] text-slate-400">ONE PAY Official Match Rate</span>
                </div>
                <span className="font-mono font-bold text-purple-600 text-sm">
                  {(rates.withdrawalRate || 283.30).toFixed(2)} PKR
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowSymbolModal(false)}
              className="w-full py-2 bg-[#4364F7] text-white text-xs font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Support / Contact Us Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-[#4364F7]" />
                <span>24/7 Official Support</span>
              </h3>
              <button
                onClick={() => setShowSupportModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <a
                href="https://wa.me/923228635577"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-900 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                    WA
                  </span>
                  <div>
                    <span className="font-bold block">WhatsApp Help Desk</span>
                    <span className="text-[10px] text-emerald-700">+92 322 8635577 (Khan trader)</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-600" />
              </a>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-blue-900">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#4364F7] text-white flex items-center justify-center font-bold">
                    TG
                  </span>
                  <div>
                    <span className="font-bold block">Telegram Online Agent</span>
                    <span className="text-[10px] text-blue-700">@ONEPAY_Support</span>
                  </div>
                </div>
                <span className="text-[10px] bg-blue-200/80 px-2 py-0.5 rounded-full font-bold">Online</span>
              </div>
            </div>

            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
