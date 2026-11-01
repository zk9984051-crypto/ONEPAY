import React, { useState } from 'react';
import { X, Plus, CheckCircle2, CreditCard, Trash2, Smartphone, ShieldCheck } from 'lucide-react';
import { CollectionChannel } from '../../types';

interface CollectionChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: CollectionChannel[];
  onAddChannel: (channel: CollectionChannel) => void;
  onToggleChannel: (id: string) => void;
}

export const CollectionChannelModal: React.FC<CollectionChannelModalProps> = ({
  isOpen,
  onClose,
  channels,
  onAddChannel,
  onToggleChannel,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [type, setType] = useState<'easypaisa' | 'jazzcash'>('easypaisa');
  const [accountTitle, setAccountTitle] = useState('Zahid Leghari');
  const [accountNumber, setAccountNumber] = useState('0345-7788990');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountTitle.trim() || !accountNumber.trim()) return;

    const newChannel: CollectionChannel = {
      id: `ch-${Date.now()}`,
      type,
      accountTitle: accountTitle.trim(),
      accountNumber: accountNumber.trim(),
      isActive: true,
      dailyLimit: 250000,
    };

    onAddChannel(newChannel);
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-serif italic text-lg font-bold text-slate-900">
              Collection Channel
            </h3>
            <span className="text-[11px] text-slate-500 font-serif italic">
              Bind EasyPaisa & JazzCash Receiving Accounts
            </span>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channels List */}
        <div className="overflow-y-auto flex-1 space-y-2.5">
          {channels.map((ch) => (
            <div
              key={ch.id}
              className={`p-3.5 rounded-xl border transition-all ${
                ch.type === 'easypaisa'
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-rose-50/50 border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs text-white ${
                      ch.type === 'easypaisa' ? 'bg-emerald-600' : 'bg-rose-700'
                    }`}
                  >
                    {ch.type === 'easypaisa' ? 'EP' : 'JC'}
                  </div>
                  <span className="font-serif italic text-xs font-bold text-slate-900">
                    {ch.type === 'easypaisa' ? 'EasyPaisa Wallet' : 'JazzCash Account'}
                  </span>
                </div>

                <button
                  onClick={() => onToggleChannel(ch.id)}
                  className={`text-[11px] px-2 py-0.5 rounded-full font-semibold transition-colors ${
                    ch.isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {ch.isActive ? 'Active' : 'Disabled'}
                </button>
              </div>

              <div className="text-xs space-y-0.5 text-slate-700">
                <p>
                  <span className="text-slate-500 text-[11px]">Title: </span>
                  <span className="font-semibold">{ch.accountTitle}</span>
                </p>
                <p>
                  <span className="text-slate-500 text-[11px]">Number: </span>
                  <span className="font-mono font-bold text-slate-900">{ch.accountNumber}</span>
                </p>
              </div>
            </div>
          ))}

          {/* Add form toggle */}
          {showAddForm ? (
            <form onSubmit={handleSubmit} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <h4 className="font-serif italic font-bold text-slate-900">Add New Account</h4>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('easypaisa')}
                  className={`py-1.5 rounded-lg font-bold border ${
                    type === 'easypaisa' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  EasyPaisa
                </button>
                <button
                  type="button"
                  onClick={() => setType('jazzcash')}
                  className={`py-1.5 rounded-lg font-bold border ${
                    type === 'jazzcash' ? 'bg-rose-700 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  JazzCash
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Account Title:</label>
                <input
                  type="text"
                  required
                  value={accountTitle}
                  onChange={(e) => setAccountTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Mobile Account Number:</label>
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-slate-900 text-white font-bold rounded-lg"
                >
                  Save Channel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-serif italic text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Bind Another Account</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
