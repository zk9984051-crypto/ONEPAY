import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { UserProfile } from '../../types';

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userCommission?: number;
  user?: UserProfile;
}

type RankingTab = 'daily' | 'weekly' | 'monthly';

interface RankedUser {
  rank: number;
  name: string;
  amount: number;
  vipLevel: string;
  isCurrentUser?: boolean;
}

// Silver V0 VIP badge pill from screenshot
const VipBadge: React.FC = () => (
  <div className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 border border-slate-300 shadow-2xs">
    <span className="text-[10px] font-black italic tracking-tighter text-slate-400 select-none">
      ~<span className="text-slate-500 font-extrabold">V</span><span className="text-slate-400">0</span>
    </span>
  </div>
);

export const RankingModal: React.FC<RankingModalProps> = ({
  isOpen,
  onClose,
  userCommission = 855600,
  user,
}) => {
  const [activeTab, setActiveTab] = useState<RankingTab>('daily');

  if (!isOpen) return null;

  const userUid = user?.uid || '20558';
  const liveCommission = user?.commission ?? userCommission ?? 855600;
  const commissionDelta = Math.max(0, liveCommission - 855600);

  // Exact datasets matching screenshot extended to 15 members with LIVE UID Commission sync
  const dailyRankings: RankedUser[] = [
    { rank: 1, name: 'AwàRà HèRò 👌', amount: 33928.20, vipLevel: 'V0' },
    { rank: 2, name: 'GHAZI 🏴【米安·阿米爾】', amount: 31938.68, vipLevel: 'V0' },
    { rank: 3, name: '🔥', amount: 29678.82, vipLevel: 'V0' },
    { rank: 4, name: 'AwàRà HèRò 👌', amount: 28745.65, vipLevel: 'V0' },
    { rank: 5, name: 'DIL e BeZAAR🖤', amount: 21273.39, vipLevel: 'V0' },
    { rank: 6, name: '🖤 OWNER ✦ HMFU TRADER', amount: 18870.05, vipLevel: 'V0' },
    {
      rank: 7,
      name: `Zahid Traders (UID:${userUid})`,
      amount: 18632.56 + commissionDelta,
      vipLevel: 'V0',
      isCurrentUser: true,
    },
    { rank: 8, name: 'GHAZI 😎', amount: 17710.60, vipLevel: 'V0' },
    { rank: 9, name: 'AwàRà HèRò 👌', amount: 17011.49, vipLevel: 'V0' },
    { rank: 10, name: 'Ręcklęss×Ghazi', amount: 16583.67, vipLevel: 'V0' },
    { rank: 11, name: 'Malik Makki', amount: 16322.22, vipLevel: 'V0' },
    { rank: 12, name: 'AwàRà HèRò 👌', amount: 16290.11, vipLevel: 'V0' },
    { rank: 13, name: 'Bilal King 👑', amount: 15840.40, vipLevel: 'V0' },
    { rank: 14, name: 'Sheraz Trader 🚀', amount: 15410.00, vipLevel: 'V0' },
    { rank: 15, name: 'Usman Rajput 💎', amount: 14925.75, vipLevel: 'V0' },
  ];

  const weeklyRankings: RankedUser[] = [
    {
      rank: 1,
      name: `Zahid Traders (UID:${userUid})`,
      amount: 148920.50 + commissionDelta,
      vipLevel: 'V0',
      isCurrentUser: true,
    },
    { rank: 2, name: 'AwàRà HèRò 👌', amount: 135890.00, vipLevel: 'V0' },
    { rank: 3, name: '🖤 OWNER ✦ HMFU TRADER', amount: 112450.30, vipLevel: 'V0' },
    { rank: 4, name: 'GHAZI 🏴【米安·阿米爾】', amount: 98450.20, vipLevel: 'V0' },
    { rank: 5, name: 'DIL e BeZAAR🖤', amount: 89320.00, vipLevel: 'V0' },
    { rank: 6, name: 'Ręcklęss×Ghazi', amount: 78900.50, vipLevel: 'V0' },
    { rank: 7, name: 'Malik Makki', amount: 72100.00, vipLevel: 'V0' },
    { rank: 8, name: '🔥', amount: 69400.00, vipLevel: 'V0' },
    { rank: 9, name: 'GHAZI 😎', amount: 64850.00, vipLevel: 'V0' },
    { rank: 10, name: 'Bilal King 👑', amount: 59200.00, vipLevel: 'V0' },
    { rank: 11, name: 'Khan Trader Official', amount: 54600.00, vipLevel: 'V0' },
    { rank: 12, name: 'Sheraz Trader 🚀', amount: 49800.00, vipLevel: 'V0' },
    { rank: 13, name: 'Usman Rajput 💎', amount: 45200.00, vipLevel: 'V0' },
    { rank: 14, name: 'Tiger Exchange 🐅', amount: 41500.00, vipLevel: 'V0' },
    { rank: 15, name: 'Chaudhary Sahab 🌟', amount: 38900.00, vipLevel: 'V0' },
  ];

  const monthlyRankings: RankedUser[] = [
    {
      rank: 1,
      name: `Zahid Traders (UID:${userUid})`,
      amount: liveCommission,
      vipLevel: 'V0',
      isCurrentUser: true,
    },
    { rank: 2, name: 'AwàRà HèRò 👌', amount: 489200.00, vipLevel: 'V0' },
    { rank: 3, name: 'GHAZI 🏴【米安·阿米爾】', amount: 412500.00, vipLevel: 'V0' },
    { rank: 4, name: '🖤 OWNER ✦ HMFU TRADER', amount: 389100.00, vipLevel: 'V0' },
    { rank: 5, name: 'DIL e BeZAAR🖤', amount: 320400.00, vipLevel: 'V0' },
    { rank: 6, name: 'Malik Makki', amount: 289000.00, vipLevel: 'V0' },
    { rank: 7, name: 'Ręcklęss×Ghazi', amount: 265000.00, vipLevel: 'V0' },
    { rank: 8, name: 'GHAZI 😎', amount: 245800.00, vipLevel: 'V0' },
    { rank: 9, name: '🔥', amount: 228400.00, vipLevel: 'V0' },
    { rank: 10, name: 'Bilal King 👑', amount: 210000.00, vipLevel: 'V0' },
    { rank: 11, name: 'Khan Trader Official', amount: 195500.00, vipLevel: 'V0' },
    { rank: 12, name: 'Sheraz Trader 🚀', amount: 182300.00, vipLevel: 'V0' },
    { rank: 13, name: 'Usman Rajput 💎', amount: 171900.00, vipLevel: 'V0' },
    { rank: 14, name: 'Tiger Exchange 🐅', amount: 159400.00, vipLevel: 'V0' },
    { rank: 15, name: 'Chaudhary Sahab 🌟', amount: 148700.00, vipLevel: 'V0' },
  ];

  const currentList =
    activeTab === 'daily'
      ? dailyRankings
      : activeTab === 'weekly'
      ? weeklyRankings
      : monthlyRankings;

  const rank1 = currentList[0];
  const rank2 = currentList[1];
  const rank3 = currentList[2];
  const restList = currentList.slice(3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      {/* Mobile-sized canvas matching ONEPAY screenshot */}
      <div className="w-full max-w-md h-full sm:h-[860px] sm:max-h-[92vh] sm:rounded-[36px] overflow-hidden flex flex-col bg-white relative shadow-2xl">
        
        {/* Top Header: Pure white with back arrow and centered Commission ranking title */}
        <div className="bg-white h-13 px-4 flex items-center justify-between border-b border-slate-100 z-20 shrink-0">
          <button
            onClick={onClose}
            className="p-1 -ml-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          <h2 className="text-base font-bold text-slate-900 tracking-tight font-sans">
            Commission ranking
          </h2>

          <div className="w-6" />
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col">
          
          {/* Vibrant Purple Header Section */}
          <div className="bg-[#7048f8] pt-3 pb-0 px-3 relative shrink-0">
            
            {/* 3 Tabs: Daily list | Weekly list | Monthly list */}
            <div className="flex items-center justify-around pb-5 pt-1 text-white">
              <button
                onClick={() => setActiveTab('daily')}
                className={`font-sans tracking-tight transition-all cursor-pointer ${
                  activeTab === 'daily'
                    ? 'text-lg font-bold text-white'
                    : 'text-sm font-normal text-white/70 hover:text-white'
                }`}
              >
                Daily list
              </button>

              <button
                onClick={() => setActiveTab('weekly')}
                className={`font-sans tracking-tight transition-all cursor-pointer ${
                  activeTab === 'weekly'
                    ? 'text-lg font-bold text-white'
                    : 'text-sm font-normal text-white/70 hover:text-white'
                }`}
              >
                Weekly list
              </button>

              <button
                onClick={() => setActiveTab('monthly')}
                className={`font-sans tracking-tight transition-all cursor-pointer ${
                  activeTab === 'monthly'
                    ? 'text-lg font-bold text-white'
                    : 'text-sm font-normal text-white/70 hover:text-white'
                }`}
              >
                Monthly list
              </button>
            </div>

            {/* Top 3 Podium Cards (No.2 on Left, No.1 in Center, No.3 on Right) */}
            <div className="grid grid-cols-3 gap-2 items-end pt-1">
              
              {/* PODIUM 2 (Left) */}
              <div className="bg-white rounded-t-2xl pt-2 pb-3 px-1 text-center shadow-lg relative min-h-[148px] flex flex-col justify-between">
                {/* Light blue ribbon */}
                <div className="mx-auto -mt-4 bg-[#a6c7fe] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs">
                  No.2
                </div>

                <div className="space-y-0.5 mt-2">
                  <div className="text-[17px] font-extrabold text-[#2a45b8] font-sans tracking-tight leading-tight">
                    {rank2.amount.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    PKR
                  </span>
                </div>

                <div className="space-y-1 mt-1">
                  <div className="text-[11px] font-bold text-slate-800 truncate px-1" title={rank2.name}>
                    {rank2.name}
                  </div>
                  <VipBadge />
                </div>
              </div>

              {/* PODIUM 1 (Center - Taller, Golden Ribbon) */}
              <div className="bg-white rounded-t-2xl pt-2 pb-4 px-1.5 text-center shadow-xl relative min-h-[168px] flex flex-col justify-between z-10">
                {/* Golden yellow ribbon */}
                <div className="mx-auto -mt-4 bg-gradient-to-r from-[#ffd447] to-[#ffba24] text-white text-[12px] font-bold px-4 py-0.5 rounded-full shadow-sm">
                  No.1
                </div>

                <div className="space-y-0.5 mt-2">
                  <div className="text-[19px] font-black text-[#2a45b8] font-sans tracking-tight leading-tight">
                    {rank1.amount.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    PKR
                  </span>
                </div>

                <div className="space-y-1 mt-1">
                  <div className="text-xs font-bold text-slate-900 truncate px-1" title={rank1.name}>
                    {rank1.name}
                  </div>
                  <VipBadge />
                </div>
              </div>

              {/* PODIUM 3 (Right) */}
              <div className="bg-white rounded-t-2xl pt-2 pb-3 px-1 text-center shadow-lg relative min-h-[142px] flex flex-col justify-between">
                {/* Light blue ribbon */}
                <div className="mx-auto -mt-4 bg-[#a6c7fe] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs">
                  No.3
                </div>

                <div className="space-y-0.5 mt-2">
                  <div className="text-[17px] font-extrabold text-[#2a45b8] font-sans tracking-tight leading-tight">
                    {rank3.amount.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    PKR
                  </span>
                </div>

                <div className="space-y-1 mt-1">
                  <div className="text-[11px] font-bold text-slate-800 truncate px-1" title={rank3.name}>
                    {rank3.name}
                  </div>
                  <VipBadge />
                </div>
              </div>

            </div>

          </div>

          {/* White Ranked List Section (Ranks 4 to 15) */}
          <div className="bg-white flex-1 px-4 pt-4 pb-20 space-y-0">
            {restList.map((item) => {
              const isUser = item.isCurrentUser;
              return (
                <div
                  key={`${item.rank}-${item.name}`}
                  className={`py-3.5 border-b border-dashed border-slate-200/90 flex items-center justify-between ${
                    isUser ? 'bg-blue-50/70 -mx-4 px-4 rounded-xl' : ''
                  }`}
                >
                  {/* Left: Rank number & User info */}
                  <div className="flex items-center gap-3">
                    {/* Rank number */}
                    <span className={`w-6 text-center text-base font-bold font-sans ${isUser ? 'text-[#4364F7]' : 'text-slate-900'}`}>
                      {item.rank}
                    </span>

                    {/* Name and VIP badge underneath */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-bold block tracking-tight font-sans ${isUser ? 'text-[#4364F7]' : 'text-slate-900'}`}>
                          {item.name}
                        </span>
                        {isUser && (
                          <span className="text-[9px] bg-[#4364F7] text-white font-bold px-1.5 py-0.2 rounded-full">
                            YOU
                          </span>
                        )}
                      </div>
                      <VipBadge />
                    </div>
                  </div>

                  {/* Right: Commission Amount and PKR */}
                  <div className="text-right">
                    <span className={`text-sm font-extrabold font-sans block ${isUser ? 'text-[#4364F7]' : 'text-slate-900'}`}>
                      {item.amount.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 uppercase">
                      PKR
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Pinned Sticky Bar: Live User UID & Live Commission Sync */}
        <div className="bg-slate-900 text-white px-4 py-3 border-t border-slate-800 flex items-center justify-between z-30 shrink-0 shadow-2xl">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-wide">
                  Zahid Traders
                </span>
                <span className="text-[10px] bg-blue-500/30 text-blue-300 font-mono font-bold px-1.5 py-0.2 rounded border border-blue-400/40">
                  UID: {userUid}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                ● Live UID Commission Active
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-sm font-black text-amber-300 font-mono block">
              PKR {liveCommission.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-slate-400">
              Rank #1 (Monthly Top 👑)
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
