import React, { useState } from 'react';
import {
  Copy,
  Settings,
  ArrowDownToLine,
  CreditCard,
  ArrowLeftRight,
  ArrowUpCircle,
  Users,
  Compass,
  Trophy,
  Check,
  Edit2,
  Download,
  LogOut
} from 'lucide-react';
import { ZsLogo } from './ZsLogo';
import { UserProfile } from '../types';

interface MyProfileViewProps {
  user: UserProfile;
  onUpdateName: (newName: string) => void;
  onOpenRecharge: () => void;
  onOpenWithdrawal: () => void;
  onOpenCollectionChannel: () => void;
  onOpenTransactionRecord: () => void;
  onOpenTeam: () => void;
  onOpenCommissionRecord: () => void;
  onOpenRanking: () => void;
  onOpenPackageService: () => void;
  onOpenSettings: () => void;
  onOpenInstallModal: () => void;
  onLogout: () => void;
  isBalanceCelebrating?: boolean;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  user,
  onUpdateName,
  onOpenRecharge,
  onOpenWithdrawal,
  onOpenCollectionChannel,
  onOpenTransactionRecord,
  onOpenTeam,
  onOpenCommissionRecord,
  onOpenRanking,
  onOpenPackageService,
  onOpenSettings,
  onOpenInstallModal,
  onLogout,
  isBalanceCelebrating,
}) => {
  const [copiedUid, setCopiedUid] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);

  const copyUid = () => {
    navigator.clipboard.writeText(user.uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  const copyInvite = () => {
    navigator.clipboard.writeText(user.invitationCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div className="space-y-4 pb-28 pt-2 animate-in fade-in duration-200">
      {/* Top Header Section with Soft Gradient (Exact from Screenshot 4) */}
      <div className="bg-gradient-to-b from-[#e3ecff] to-transparent px-4 pt-3 pb-6 rounded-b-3xl space-y-4">
        {/* User name & UID row */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="font-serif italic text-base font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300"
                />
                <button
                  onClick={handleSaveName}
                  className="text-xs bg-slate-900 text-white px-2 py-1 rounded font-serif italic"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 group cursor-pointer" onClick={() => setIsEditingName(true)}>
                <h1 className="font-serif italic text-xl font-bold tracking-tight text-slate-900">
                  {user.name}
                </h1>
                <Edit2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition-colors" />
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs text-slate-700 font-serif italic">
              <span>UID:{user.uid}</span>
              <button onClick={copyUid} className="text-slate-600 hover:text-slate-900" title="Copy UID">
                {copiedUid ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Settings icon */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 text-slate-800 hover:text-slate-950 transition-colors"
          >
            <Settings className="w-6 h-6 stroke-[1.8]" />
          </button>
        </div>

        {/* Balance & Recharge Row (Exact from Screenshot 4) */}
        <div className="flex items-end justify-between pt-2">
          <div className="space-y-2">
            <div className={`transition-all duration-300 p-1 rounded-xl ${isBalanceCelebrating ? 'animate-bounce bg-amber-100/80 ring-2 ring-amber-400' : ''}`}>
              <span className="font-serif italic text-xs text-slate-600 block">
                balance (PKR)
              </span>
              <div className={`font-serif italic text-3xl font-extrabold tabular-nums transition-colors duration-500 ${isBalanceCelebrating ? 'text-amber-700' : 'text-slate-900'}`}>
                {user.balance.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div>
              <span className="font-serif italic text-xs text-slate-600 block">
                commission
              </span>
              <div className="font-serif italic text-xl font-bold text-slate-800 tabular-nums">
                {user.commission.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Recharge Icon Button (Exact from Screenshot 4) */}
          <button
            onClick={onOpenRecharge}
            className="flex flex-col items-center justify-center p-2 text-slate-900 hover:scale-105 transition-transform"
          >
            <ArrowDownToLine className="w-7 h-7 text-blue-600 stroke-[2.2] mb-1" />
            <span className="font-serif italic text-xs font-bold text-slate-800">
              Recharge
            </span>
          </button>
        </div>
      </div>

      <div className="px-4 space-y-3.5">
        {/* Package Service Card (Exact from Screenshot 4) */}
        <div
          onClick={onOpenPackageService}
          className="bg-gradient-to-r from-white via-white to-slate-50 rounded-xl p-4 shadow-xs border border-slate-100 cursor-pointer hover:shadow-md transition-shadow"
        >
          <h3 className="font-serif italic text-base font-bold text-slate-800">
            Package service
          </h3>
          <p className="font-serif italic text-xs text-slate-500 mt-1">
            Purchase a package to enjoy more benefits.
          </p>
        </div>

        {/* Invite Friends Card (Exact from Screenshot 4 with Invitation Code) */}
        <div className="bg-gradient-to-r from-white via-white to-slate-50 rounded-xl p-4 shadow-xs border border-slate-100 flex items-center justify-between">
          <div className="space-y-1.5 flex-1 pr-3">
            <h3 className="font-serif italic text-base font-bold text-slate-800">
              Invite friends
            </h3>
            <p className="font-serif italic text-xs text-slate-500 leading-snug">
              Get generous rewards and permanent commissions
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-serif italic text-slate-700">
              <span>Invitation Code</span>
              <span className="font-mono font-bold text-slate-900">{user.invitationCode}</span>
              <button onClick={copyInvite} className="text-slate-600 hover:text-slate-900">
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="shrink-0">
            <ZsLogo size={62} />
          </div>
        </div>

        {/* 6 Grid Action Items (Exact from Screenshot 4) */}
        <div className="grid grid-cols-3 gap-y-7 gap-x-2 pt-4">
          {/* 1. Collection channel */}
          <button
            onClick={onOpenCollectionChannel}
            className="flex flex-col items-center justify-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform mb-1.5">
              <CreditCard className="w-7 h-7 stroke-[1.8] text-slate-800" />
            </div>
            <span className="font-serif italic text-xs text-slate-800 font-medium leading-tight">
              Collection channel
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">
              EasyPaisa/JazzCash
            </span>
          </button>

          {/* 2. Transaction record */}
          <button
            onClick={onOpenTransactionRecord}
            className="flex flex-col items-center justify-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform mb-1.5">
              <ArrowLeftRight className="w-7 h-7 stroke-[1.8] text-slate-800" />
            </div>
            <span className="font-serif italic text-xs text-slate-800 font-medium leading-tight">
              Transaction record
            </span>
          </button>

          {/* 3. Withdrawal */}
          <button
            onClick={onOpenWithdrawal}
            className="flex flex-col items-center justify-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform mb-1.5">
              <ArrowUpCircle className="w-7 h-7 stroke-[1.8] text-slate-800" />
            </div>
            <span className="font-serif italic text-xs text-slate-800 font-medium leading-tight">
              Withdrawal
            </span>
          </button>

          {/* 4. My team */}
          <button
            onClick={onOpenTeam}
            className="flex flex-col items-center justify-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform mb-1.5">
              <Users className="w-7 h-7 stroke-[1.8] text-slate-800" />
            </div>
            <span className="font-serif italic text-xs text-slate-800 font-medium leading-tight">
              My team
            </span>
          </button>

          {/* 5. Commission record */}
          <button
            onClick={onOpenCommissionRecord}
            className="flex flex-col items-center justify-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform mb-1.5">
              <Compass className="w-7 h-7 stroke-[1.8] text-slate-800" />
            </div>
            <span className="font-serif italic text-xs text-slate-800 font-medium leading-tight">
              Commission record
            </span>
          </button>

          {/* 6. Commission ranking */}
          <button
            onClick={onOpenRanking}
            className="flex flex-col items-center justify-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform mb-1.5">
              <Trophy className="w-7 h-7 stroke-[1.8] text-slate-800" />
            </div>
            <span className="font-serif italic text-xs text-slate-800 font-medium leading-tight">
              Commission ranking
            </span>
          </button>
        </div>

        {/* Install Application Promotion Card */}
        <div
          onClick={onOpenInstallModal}
          className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-4 shadow-md text-white flex items-center justify-between cursor-pointer hover:shadow-lg transition-all"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-serif italic font-black text-sm">
              <Download className="w-4 h-4 text-white" />
              <span>Install ONEPAY App (ایپ انسٹال کریں)</span>
            </div>
            <p className="font-serif italic text-xs text-red-100">
              Download app on Android or iPhone home screen
            </p>
          </div>
          <span className="px-3 py-1 bg-white text-red-600 font-serif italic font-bold rounded-xl text-xs shadow-xs">
            Get Link
          </span>
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <button
            onClick={onLogout}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-serif italic font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-200"
          >
            <LogOut className="w-4 h-4 text-slate-500" />
            <span>Log Out (لاگ آؤٹ کریں)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
