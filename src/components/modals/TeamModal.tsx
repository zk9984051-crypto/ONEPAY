import React, { useState } from 'react';
import { ChevronLeft, Copy, Check, Users, ArrowUpRight } from 'lucide-react';
import { TeamMember, UserProfile } from '../../types';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  teamMembers: TeamMember[];
}

export const TeamModal: React.FC<TeamModalProps> = ({
  isOpen,
  onClose,
  user,
  teamMembers,
}) => {
  const [copied, setCopied] = useState(false);
  const [levelTab, setLevelTab] = useState<1 | 2 | 3>(1);

  if (!isOpen) return null;

  const copyInvite = () => {
    navigator.clipboard?.writeText(user.invitationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const levelMembers = teamMembers.filter((m) => m.level === levelTab);
  const totalTeamSize = teamMembers.length;
  const directPushNumber = teamMembers.filter((m) => m.level === 1).length;
  const teamBuyVolume = teamMembers.reduce((acc, m) => acc + m.totalVolume, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 select-none animate-in fade-in duration-200">
      {/* Full mobile-height canvas matching screenshot layout */}
      <div className="w-full max-w-md h-full sm:h-[860px] sm:max-h-[92vh] sm:rounded-[36px] bg-white overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Top Header: Exact from Screenshot (white bar, back arrow on left, centered 'my team') */}
        <div className="bg-white h-14 px-4 flex items-center justify-between border-b border-slate-100 shrink-0 z-20">
          <button
            onClick={onClose}
            className="p-1 -ml-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          <h2 className="text-base font-semibold text-slate-800 tracking-tight font-sans">
            my team
          </h2>

          {/* Spacer to keep title centered */}
          <div className="w-6" />
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col bg-white">
          
          {/* Blue Dashboard Grid: Exact 3x3 layout from Screenshot_20261101-124439.jpg */}
          <div className="bg-[#4870f7] text-white px-4.5 pt-5 pb-6 shadow-xs shrink-0">
            <div className="space-y-5">
              
              {/* Row 1: I bought the performance | I sold my performance | Registration time */}
              <div className="grid grid-cols-3 gap-2">
                {/* Col 1 */}
                <div className="space-y-1">
                  <span className="text-[11.5px] leading-tight text-white/80 block font-normal">
                    I bought the performance
                  </span>
                  <span className="text-base font-semibold text-white block">
                    {user.inTransaction || 0}
                  </span>
                </div>

                {/* Col 2 */}
                <div className="space-y-1">
                  <span className="text-[11.5px] leading-tight text-white/80 block font-normal">
                    I sold my performance
                  </span>
                  <span className="text-base font-semibold text-white block">
                    0
                  </span>
                </div>

                {/* Col 3 */}
                <div className="space-y-1">
                  <span className="text-[11.5px] leading-tight text-white/80 block font-normal">
                    Registration time
                  </span>
                  <span className="text-[12.5px] font-semibold text-white block leading-tight pt-0.5">
                    2025/07/02 22:04
                  </span>
                </div>
              </div>

              {/* Row 2: Direct buy performance | Direct push sell performance | Direct push number */}
              <div className="grid grid-cols-3 gap-2">
                {/* Col 1 */}
                <div className="space-y-1">
                  <span className="text-[11.5px] leading-tight text-white/80 block font-normal">
                    Direct buy performance
                  </span>
                  <span className="text-base font-semibold text-white block">
                    0
                  </span>
                </div>

                {/* Col 2 */}
                <div className="space-y-1">
                  <span className="text-[11.5px] leading-tight text-white/80 block font-normal">
                    Direct push sell performance
                  </span>
                  <span className="text-base font-semibold text-white block">
                    0
                  </span>
                </div>

                {/* Col 3 */}
                <div className="space-y-1">
                  <span className="text-[11.5px] leading-tight text-white/80 block font-normal">
                    Direct push number
                  </span>
                  <span className="text-base font-semibold text-white block">
                    {directPushNumber || 0}
                  </span>
                </div>
              </div>

              {/* Row 3: Team buy performance | Team sell performance | team size */}
              <div className="grid grid-cols-3 gap-2">
                {/* Col 1 */}
                <div className="space-y-1">
                  <span className="text-[11.5px] leading-tight text-white/80 block font-normal">
                    Team buy performance
                  </span>
                  <span className="text-base font-semibold text-white block">
                    {teamBuyVolume ? teamBuyVolume.toLocaleString() : 0}
                  </span>
                </div>

                {/* Col 2 */}
                <div className="space-y-1">
                  <span className="text-[11.5px] leading-tight text-white/80 block font-normal">
                    Team sell performance
                  </span>
                  <span className="text-base font-semibold text-white block">
                    0
                  </span>
                </div>

                {/* Col 3 */}
                <div className="space-y-1">
                  <span className="text-[11.5px] leading-tight text-white/80 block font-normal">
                    team size
                  </span>
                  <span className="text-base font-semibold text-white block">
                    {totalTeamSize || 0}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Area: Invite details & Team Breakdown */}
          <div className="p-4 space-y-4 flex-1">
            
            {/* Quick Invite Code Banner */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[11px] text-slate-500 font-medium block">
                  My Invitation Code
                </span>
                <span className="font-mono font-extrabold text-base text-slate-900">
                  {user.invitationCode}
                </span>
              </div>

              <button
                onClick={copyInvite}
                className="px-3.5 py-1.5 bg-[#4870f7] hover:bg-[#3860e6] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Level Tabs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Team Members List
                </span>
                <span className="text-[11px] text-slate-400">
                  Total: {teamMembers.length}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 bg-slate-100/80 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setLevelTab(1)}
                  className={`py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                    levelTab === 1
                      ? 'bg-white font-bold text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Level 1 (0.3%)
                </button>
                <button
                  onClick={() => setLevelTab(2)}
                  className={`py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                    levelTab === 2
                      ? 'bg-white font-bold text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Level 2 (0.2%)
                </button>
                <button
                  onClick={() => setLevelTab(3)}
                  className={`py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                    levelTab === 3
                      ? 'bg-white font-bold text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Level 3 (0.1%)
                </button>
              </div>
            </div>

            {/* Members List */}
            <div className="space-y-2 pb-4">
              {levelMembers.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 space-y-1">
                  <p>No members in Level {levelTab} yet.</p>
                  <p className="text-[11px] text-slate-400">Share your invitation code to grow your team!</p>
                </div>
              ) : (
                levelMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs text-xs flex justify-between items-center"
                  >
                    <div>
                      <h5 className="font-bold text-slate-900">{member.name}</h5>
                      <p className="text-[11px] text-slate-500 font-mono">UID: {member.uid}</p>
                      <p className="text-[10px] text-slate-400">Joined {member.joinedDate}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-emerald-600 block">
                        +PKR {member.commissionEarned.toLocaleString('en-PK')}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Vol: PKR {member.totalVolume.toLocaleString('en-PK')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
