import React, { useState } from 'react';
import { Wallet, ArrowDownLeft, ArrowUpRight, CheckCircle2, ShieldAlert, Smartphone, RefreshCw, Send, Plus } from 'lucide-react';
import { SellerWallet as SellerWalletType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SellerWalletProps {
  wallet: SellerWalletType;
  onWithdraw: (amount: number, method: 'easypaisa' | 'jazzcash', accountNo: string) => void;
  onPostAdClick: () => void;
}

export const SellerWallet: React.FC<SellerWalletProps> = ({
  wallet,
  onWithdraw,
  onPostAdClick,
}) => {
  const { language } = useLanguage();

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState<'easypaisa' | 'jazzcash'>('easypaisa');
  const [accountNumber, setAccountNumber] = useState('0345-1234567');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount to withdraw.');
      return;
    }
    if (amount > wallet.balance) {
      setError(`Withdrawal amount exceeds your available balance of PKR ${wallet.balance.toLocaleString('en-PK')}.`);
      return;
    }
    if (!accountNumber.trim()) {
      setError('Please provide your mobile account number.');
      return;
    }

    setError('');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onWithdraw(amount, withdrawMethod, accountNumber);
      setSuccessMessage(
        `PKR ${amount.toLocaleString('en-PK')} successfully transferred to your ${
          withdrawMethod === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'
        } account (${accountNumber}).`
      );
      setWithdrawAmount('');
      setTimeout(() => setSuccessMessage(''), 6000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <Wallet className="w-7 h-7 text-emerald-600" />
            <span>{language === 'ur' ? 'سیلر والٹ اور ادائیگی اکاؤنٹ' : 'Seller Wallet & Payouts'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ur'
              ? 'کسٹمرز کی خریدی گئی اشیاء کی رقم براہ راست اپنے ایزی پیسہ یا جاز کیش میں نکالیں'
              : 'Direct sales revenue received via EasyPaisa and JazzCash checkout'}
          </p>
        </div>

        <button
          onClick={onPostAdClick}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'ur' ? 'نیا اشتہار لگائیں' : 'List New Item for Sale'}</span>
        </button>
      </div>

      {/* Balance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Available Balance Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Available Balance (نکالنے کے لیے رقم)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-mono">PKR</span>
            <div className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
              {wallet.balance.toLocaleString('en-PK')}
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Linked: EasyPaisa & JazzCash</span>
            <span className="text-emerald-400">Instant Transfer</span>
          </div>
        </div>

        {/* Total Earned Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Sales Revenue</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-mono">PKR</span>
            <div className="text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
              {wallet.totalEarned.toLocaleString('en-PK')}
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            From verified customer purchases on ZsPay
          </div>
        </div>

        {/* Pending Clearance Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>In Escrow Delivery</span>
            <span className="text-amber-500 font-bold text-xs">Safe Escrow</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-mono">PKR</span>
            <div className="text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
              {wallet.pendingClearance.toLocaleString('en-PK')}
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            Releases automatically upon TCS delivery confirmation
          </div>
        </div>
      </div>

      {/* Instant Payout Form & Linked Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Withdrawal Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ur' ? 'رقم اپنے اکاؤنٹ میں منتقل کریں' : 'Instant Payout Withdrawal'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Transfer funds instantly from ZsPay wallet to your personal mobile account
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleWithdrawSubmit} className="space-y-4">
            {/* Destination Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Destination Account (EasyPaisa or JazzCash)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setWithdrawMethod('easypaisa');
                    setAccountNumber('0345-1234567');
                  }}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2.5 transition-colors ${
                    withdrawMethod === 'easypaisa'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    EP
                  </div>
                  <span>EasyPaisa Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setWithdrawMethod('jazzcash');
                    setAccountNumber('0300-1234567');
                  }}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2.5 transition-colors ${
                    withdrawMethod === 'jazzcash'
                      ? 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-500'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-rose-700 text-white flex items-center justify-center font-bold text-xs">
                    JC
                  </div>
                  <span>JazzCash Account</span>
                </button>
              </div>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {withdrawMethod === 'easypaisa' ? 'EasyPaisa Number' : 'JazzCash Number'}
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="03XX-XXXXXXX"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-900"
              />
            </div>

            {/* Amount */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Withdrawal Amount (PKR)
                </label>
                <button
                  type="button"
                  onClick={() => setWithdrawAmount(wallet.balance.toString())}
                  className="text-[11px] font-semibold text-emerald-600 hover:underline"
                >
                  Max: PKR {wallet.balance.toLocaleString('en-PK')}
                </button>
              </div>
              <input
                type="number"
                required
                min="100"
                max={wallet.balance}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="e.g. 25000"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing || wallet.balance === 0}
              className={`w-full py-3 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 ${
                withdrawMethod === 'easypaisa'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-rose-700 hover:bg-rose-800'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Transmitting to 1Link Switch...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>
                    Withdraw PKR {withdrawAmount ? Number(withdrawAmount).toLocaleString('en-PK') : '0'} to{' '}
                    {withdrawMethod === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">
              Recent Transactions & Payouts
            </h3>
            <span className="text-xs text-slate-500 font-mono">1Link Raast</span>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto">
            {wallet.transactions.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                No transactions yet. Post an ad to start earning!
              </p>
            ) : (
              wallet.transactions.map((trx) => (
                <div
                  key={trx.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        trx.type === 'sale_credit'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {trx.type === 'sale_credit' ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{trx.description}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {trx.timestamp} · Ref: <span className="font-mono">{trx.referenceId}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-mono font-bold block tabular-nums ${
                        trx.type === 'sale_credit' ? 'text-emerald-700' : 'text-slate-800'
                      }`}
                    >
                      {trx.type === 'sale_credit' ? '+' : '-'} PKR {trx.amount.toLocaleString('en-PK')}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium">{trx.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
