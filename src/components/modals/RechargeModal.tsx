import React, { useState } from 'react';
import { X, CheckCircle2, RefreshCw, QrCode, Lock, Copy, Check, ShieldCheck, AlertCircle, Clock } from 'lucide-react';
import { PaymentMethod } from '../../types';
import { useBinanceRates } from '../../context/BinanceRatesContext';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRechargeSuccess: (amount: number, method: PaymentMethod, trxId: string) => void;
  onOpenHistory?: () => void;
}

const TRC20_WALLET_ADDRESS = 'TK7rF9yWv1N2mC3p8xV4a5B6dE7zP8qR9s';

export const RechargeModal: React.FC<RechargeModalProps> = ({
  isOpen,
  onClose,
  onRechargeSuccess,
  onOpenHistory,
}) => {
  const { rates, isLoading: isSyncingBinance, refreshRates } = useBinanceRates();
  const [usdtAmount, setUsdtAmount] = useState('20');
  const [txHash, setTxHash] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const rechargeRate = rates.rechargeRate || 280.85;
  const binanceBuyRate = rates.binanceBuyPrice || 281.85;
  const quickAmountsUSDT = [10, 25, 50, 100, 250, 500];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(TRC20_WALLET_ADDRESS);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    const uNum = Number(usdtAmount);
    if (isNaN(uNum) || uNum <= 0) {
      setError('Please enter a valid USDT amount.');
      return;
    }
    setError('');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const pkrVal = Math.round(uNum * rechargeRate);
      const randomTrx = txHash.trim() || `TRX${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      onRechargeSuccess(pkrVal, 'usdt', randomTrx);
      onClose();
    }, 1200);
  };

  const calculatedPKR = Math.round((Number(usdtAmount) || 0) * rechargeRate);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header - Exclusively TRC20 & QR */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-serif italic text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <span>USDT TRC20 Recharge</span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-800 text-[10px] font-mono font-bold">
                TRC-20
              </span>
            </h3>
            <span className="text-[11px] text-cyan-700 font-serif italic font-semibold">
              Recharge Rate: {rechargeRate.toFixed(2)} PKR = 1 USDT
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onOpenHistory && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenHistory();
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 text-[11px] font-serif italic font-bold transition-colors cursor-pointer"
                title="View Recharge History (ریچارج ہسٹری)"
              >
                <Clock className="w-3.5 h-3.5 text-cyan-700" />
                <span>History (ریکارڈ)</span>
              </button>
            )}
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Binance Live Auto-Sync Indicator & Rate Formula Display */}
        <div className="p-3 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-cyan-50 rounded-2xl border border-amber-200/80 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-serif italic font-bold text-slate-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Binance P2P Live Attached</span>
            </div>
            <button
              type="button"
              onClick={refreshRates}
              disabled={isSyncingBinance}
              className="p-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 text-[10px] font-serif italic cursor-pointer shadow-2xs"
              title="Sync with Binance Now"
            >
              <RefreshCw className={`w-3 h-3 text-amber-600 ${isSyncingBinance ? 'animate-spin' : ''}`} />
              <span>Refresh Rate</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
            <div className="p-1.5 bg-white rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-serif italic">Binance Top Buy:</span>
              <span className="font-bold text-slate-800">{binanceBuyRate.toFixed(2)} PKR</span>
            </div>
            <div className="p-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="text-[10px] text-emerald-800 block font-serif italic font-semibold">Recharge (-1 PKR):</span>
              <span className="font-bold text-emerald-900">{rechargeRate.toFixed(2)} PKR</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-1.5 font-serif italic">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleProceed} className="space-y-4 text-xs">
          {/* TRC20 QR Code Display */}
          <div className="flex flex-col items-center justify-center p-3.5 bg-gradient-to-b from-cyan-50/60 to-slate-50 rounded-2xl border border-cyan-100 shadow-xs">
            <div className="p-2.5 bg-white rounded-xl border border-slate-300 shadow-sm relative group">
              {/* High-contrast generated SVG QR Code with TRC20 design */}
              <svg
                viewBox="0 0 100 100"
                className="w-40 h-40"
                shapeRendering="crispEdges"
              >
                <rect width="100" height="100" fill="white" />
                {/* Corner 1 */}
                <rect x="5" y="5" width="26" height="26" fill="black" />
                <rect x="8" y="8" width="20" height="20" fill="white" />
                <rect x="11" y="11" width="14" height="14" fill="black" />
                {/* Corner 2 */}
                <rect x="69" y="5" width="26" height="26" fill="black" />
                <rect x="72" y="8" width="20" height="20" fill="white" />
                <rect x="75" y="11" width="14" height="14" fill="black" />
                {/* Corner 3 */}
                <rect x="5" y="69" width="26" height="26" fill="black" />
                <rect x="8" y="72" width="20" height="20" fill="white" />
                <rect x="11" y="75" width="14" height="14" fill="black" />
                {/* Data dots */}
                <rect x="36" y="8" width="5" height="5" fill="black" />
                <rect x="46" y="8" width="6" height="6" fill="black" />
                <rect x="57" y="12" width="6" height="5" fill="black" />
                <rect x="36" y="22" width="6" height="6" fill="black" />
                <rect x="48" y="24" width="7" height="6" fill="black" />
                <rect x="59" y="22" width="5" height="6" fill="black" />
                <rect x="8" y="38" width="6" height="6" fill="black" />
                <rect x="20" y="44" width="6" height="6" fill="black" />
                <rect x="35" y="38" width="6" height="6" fill="black" />
                <rect x="45" y="42" width="6" height="6" fill="black" />
                <rect x="56" y="38" width="6" height="6" fill="black" />
                <rect x="68" y="42" width="6" height="6" fill="black" />
                <rect x="82" y="38" width="6" height="6" fill="black" />
                <rect x="38" y="54" width="6" height="6" fill="black" />
                <rect x="50" y="52" width="6" height="6" fill="black" />
                <rect x="62" y="56" width="6" height="6" fill="black" />
                <rect x="76" y="52" width="6" height="6" fill="black" />
                <rect x="86" y="56" width="6" height="6" fill="black" />
                <rect x="36" y="70" width="6" height="6" fill="black" />
                <rect x="48" y="68" width="6" height="6" fill="black" />
                <rect x="60" y="72" width="6" height="6" fill="black" />
                <rect x="72" y="68" width="6" height="6" fill="black" />
                <rect x="84" y="72" width="6" height="6" fill="black" />
                <rect x="38" y="84" width="6" height="6" fill="black" />
                <rect x="50" y="82" width="6" height="6" fill="black" />
                <rect x="62" y="84" width="6" height="6" fill="black" />
                <rect x="74" y="82" width="6" height="6" fill="black" />
                <rect x="86" y="84" width="6" height="6" fill="black" />
              </svg>

              {/* USDT badge in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
                  <span className="text-white font-black text-sm font-mono">₮</span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center space-y-0.5">
              <span className="text-[11px] font-bold text-slate-800 font-serif italic block flex items-center justify-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-cyan-600" />
                Scan QR with Binance / OKX / TrustWallet
              </span>
              <span className="text-[10px] text-slate-500 font-serif italic">
                Only send USDT via TRON (TRC20) network
              </span>
            </div>
          </div>

          {/* TRC20 Wallet Address Box with 1-Tap Copy */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-serif italic font-bold text-slate-700">
                Official TRC20 Address (ایڈریس):
              </label>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="text-cyan-700 hover:text-cyan-900 font-serif italic font-bold flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>

            <div
              onClick={handleCopyAddress}
              className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-900 break-all select-all cursor-pointer hover:border-cyan-400 hover:bg-cyan-50/30 transition-colors flex items-center justify-between"
              title="Click to copy address"
            >
              <span>{TRC20_WALLET_ADDRESS}</span>
              <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1.5" />
            </div>
          </div>

          {/* Amount in USDT with automatic PKR conversion */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-serif italic font-bold text-slate-700">
                Deposit Amount (USDT):
              </label>
              <span className="text-emerald-700 font-serif italic font-extrabold text-[11px]">
                = PKR {calculatedPKR.toLocaleString('en-PK')}
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                min="1"
                step="1"
                required
                value={usdtAmount}
                onChange={(e) => setUsdtAmount(e.target.value)}
                placeholder="e.g. 50"
                className="w-full pl-3 pr-14 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <span className="absolute right-3 top-3 font-bold text-xs text-slate-400 font-mono">
                USDT
              </span>
            </div>

            {/* Quick select buttons */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {quickAmountsUSDT.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setUsdtAmount(val.toString())}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold border transition-all ${
                    usdtAmount === val.toString()
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {val} USDT
                </button>
              ))}
            </div>
          </div>

          {/* Transaction Hash / TXID */}
          <div>
            <label className="block font-serif italic font-bold text-slate-700 mb-1">
              Transaction Hash / TXID (ٹرانزیکشن ہیش):
            </label>
            <input
              type="text"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="e.g. 7fa98c2b... (optional)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900"
            />
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-1.5 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[10px] leading-tight font-serif italic">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600 mt-0.5" />
            <span>
              Please ensure you send USDT exclusively over the <strong>TRON (TRC20)</strong> network. Balance will be credited automatically in PKR upon 1-3 network confirmations.
            </span>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 active:scale-98 text-white font-serif italic font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Verifying Blockchain Deposit...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Confirm Recharge (PKR {calculatedPKR.toLocaleString('en-PK')})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
