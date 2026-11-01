import React, { useState, useRef } from 'react';
import { X, CheckCircle2, RefreshCw, ArrowUpCircle, AlertCircle, Upload, QrCode, Trash2, ShieldCheck, Zap, Clock } from 'lucide-react';
import { PaymentMethod, UserProfile } from '../../types';
import { useBinanceRates } from '../../context/BinanceRatesContext';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onWithdrawSuccess: (amount: number, method: PaymentMethod, accountNo: string, trxId: string) => void;
  onOpenHistory?: () => void;
}

export const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
  user,
  onWithdrawSuccess,
  onOpenHistory,
}) => {
  const { rates, isLoading: isSyncingBinance, refreshRates } = useBinanceRates();
  const [amount, setAmount] = useState('10000');
  const [trc20Address, setTrc20Address] = useState('');
  const [userQrImage, setUserQrImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const withdrawalRate = rates.withdrawalRate || 283.30;
  const binanceSellRate = rates.binanceSellPrice || 281.30;

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG/JPG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUserQrImage(reader.result as string);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveQr = () => {
    setUserQrImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (num > user.balance) {
      setError(`Insufficient balance. Available: PKR ${user.balance.toLocaleString('en-PK')}`);
      return;
    }

    if (!trc20Address.trim()) {
      setError('Please enter your TRC-20 wallet address (TRC20 ایڈریس درج کریں).');
      return;
    }

    if (!trc20Address.trim().startsWith('T') && trc20Address.trim().length < 20) {
      setError('Valid TRC-20 addresses must start with "T" (e.g. TX... or TY...).');
      return;
    }

    setError('');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomTrx = `WD-${Math.floor(100000000 + Math.random() * 900000000)}`;
      onWithdrawSuccess(num, 'usdt', trc20Address.trim(), randomTrx);
      onClose();
    }, 1500);
  };

  const calculatedUsdtPayout = (Number(amount || 0) / withdrawalRate).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header - Exclusively TRC-20 */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-serif italic text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <span>USDT TRC20 Withdrawal</span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-800 text-[10px] font-mono font-bold">
                TRC-20
              </span>
            </h3>
            <span className="text-[11px] text-cyan-700 font-serif italic font-semibold">
              Withdrawal Rate: {withdrawalRate.toFixed(2)} PKR = 1 USDT
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
                title="View Withdrawal History (ودڈرا ہسٹری)"
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
              <span className="text-[10px] text-slate-500 block font-serif italic">Binance Top Sell:</span>
              <span className="font-bold text-slate-800">{binanceSellRate.toFixed(2)} PKR</span>
            </div>
            <div className="p-1.5 bg-cyan-50 rounded-lg border border-cyan-200">
              <span className="text-[10px] text-cyan-800 block font-serif italic font-semibold">Withdrawal (+2 PKR):</span>
              <span className="font-bold text-cyan-900">{withdrawalRate.toFixed(2)} PKR</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-1.5 font-serif italic">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleWithdraw} className="space-y-3.5 text-xs">
          {/* Customer TRC20 Wallet Address */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1 font-serif italic">
              Your TRC20 Wallet Address (اپنا TRC20 ایڈریس درج کریں):
            </label>
            <input
              type="text"
              required
              value={trc20Address}
              onChange={(e) => setTrc20Address(e.target.value.trim())}
              placeholder="e.g. TXyZ12345... (Starts with T)"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-bold"
            />
          </div>

          {/* Customer QR Code Upload Section */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1.5 font-serif italic flex items-center justify-between">
              <span>Your TRC20 QR Code (اپنا QR کوڈ اپلوڈ کریں):</span>
              <span className="text-[10px] text-slate-500 font-normal">Optional / اختیاری</span>
            </label>

            {userQrImage ? (
              /* Display Uploaded QR Code Preview */
              <div className="flex items-center justify-between p-2.5 bg-cyan-50/50 rounded-xl border border-cyan-300 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={userQrImage}
                    alt="Customer QR Code"
                    className="w-14 h-14 object-cover rounded-lg border border-slate-200 shadow-xs"
                  />
                  <div>
                    <span className="font-serif italic font-bold text-slate-800 block text-xs">
                      QR Code Attached ✓
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold font-serif italic">
                      Ready for USDT dispatch
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveQr}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove QR Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Upload Prompt Box */
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-cyan-300 hover:border-cyan-500 bg-slate-50/80 hover:bg-cyan-50/40 rounded-xl p-3.5 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 group"
              >
                <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 group-hover:scale-110 transition-transform">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="font-serif italic font-bold text-xs text-cyan-800">
                  Tap to Upload Your TRC20 QR Code
                </span>
                <span className="text-[10px] text-slate-400 font-serif italic">
                  Upload Binance, TrustWallet or OKX QR Screenshot
                </span>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleQrUpload}
              className="hidden"
            />
          </div>

          {/* Amount to Withdraw in PKR with live USDT calculated conversion */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-slate-700 font-serif italic">
                Amount to Withdraw (PKR):
              </label>
              <button
                type="button"
                onClick={() => setAmount(Math.floor(user.balance).toString())}
                className="text-[11px] font-semibold text-blue-600 hover:underline font-serif italic cursor-pointer"
              >
                All: PKR {user.balance.toLocaleString('en-PK')}
              </button>
            </div>

            <input
              type="number"
              min="500"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <div className="mt-2 p-2.5 bg-cyan-50 rounded-xl border border-cyan-100 flex items-center justify-between text-xs font-serif italic">
              <span className="text-slate-600">Expected USDT Payout:</span>
              <span className="font-mono font-bold text-cyan-900 text-sm">
                ≈ {calculatedUsdtPayout} USDT
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 active:scale-98 text-white font-serif italic font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing TRC20 Blockchain Transfer...</span>
              </>
            ) : (
              <>
                <ArrowUpCircle className="w-4 h-4" />
                <span>
                  Withdraw PKR {Number(amount || 0).toLocaleString('en-PK')} (≈ {calculatedUsdtPayout} USDT)
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
