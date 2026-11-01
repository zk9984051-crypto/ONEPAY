import React, { useState } from 'react';
import { FileText, CheckCircle2, ChevronRight, X, Copy, Check, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { UserProfile, P2POrder } from '../types';

interface BuyTicketOrder {
  orderNumber: string;
  amount: number;
  commissionMin: number;
  commissionMax: number;
  channel: string;
  channelColor: string;
  sellerName: string;
  sellerAccount: string;
}

const initialTicketOrders: BuyTicketOrder[] = [
  {
    orderNumber: 'B2023012014334001278',
    amount: 1093.88,
    commissionMin: 31.87,
    commissionMax: 48.28,
    channel: 'ONE PAY',
    channelColor: '#d9222a',
    sellerName: 'Khan trader',
    sellerAccount: '03228635577',
  },
  {
    orderNumber: 'B2023012014342501257',
    amount: 1357,
    commissionMin: 37.14,
    commissionMax: 57.49,
    channel: 'ONE PAY',
    channelColor: '#d9222a',
    sellerName: 'Balkrishna P2P',
    sellerAccount: '03004567891',
  },
  {
    orderNumber: 'B2023012014343101285',
    amount: 1337.68,
    commissionMin: 36.75,
    commissionMax: 56.81,
    channel: 'ONE PAY',
    channelColor: '#d9222a',
    sellerName: 'Shrestha Global',
    sellerAccount: '03458899112',
  },
  {
    orderNumber: 'B2023012014343401157',
    amount: 1840,
    commissionMin: 46.8,
    commissionMax: 74.4,
    channel: 'ONE PAY',
    channelColor: '#d9222a',
    sellerName: 'Royal Trade Hub',
    sellerAccount: '03129876543',
  },
  {
    orderNumber: 'B2023012014344501142',
    amount: 1104,
    commissionMin: 32.08,
    commissionMax: 48.64,
    channel: 'ONE PAY',
    channelColor: '#d9222a',
    sellerName: 'Everest Exchanger',
    sellerAccount: '03337654321',
  },
  {
    orderNumber: 'B2023012014344701716',
    amount: 2250,
    commissionMin: 58.5,
    commissionMax: 89.2,
    channel: 'ONE PAY',
    channelColor: '#d9222a',
    sellerName: 'Zahid Traders',
    sellerAccount: '03228635577',
  },
  {
    orderNumber: 'B2023012014351201882',
    amount: 3400,
    commissionMin: 92.4,
    commissionMax: 138.6,
    channel: 'ONE PAY',
    channelColor: '#d9222a',
    sellerName: 'Himalayan Pay',
    sellerAccount: '03019876543',
  },
  {
    orderNumber: 'B2023012014353001904',
    amount: 5120,
    commissionMin: 145.2,
    commissionMax: 210.8,
    channel: 'ONE PAY',
    channelColor: '#d9222a',
    sellerName: 'Asia Trade Express',
    sellerAccount: '03401928410',
  },
];

interface BuyViewProps {
  user: UserProfile;
  activeOrder: P2POrder | null;
  onStartBuyOrder: (amount: number, method: 'easypaisa' | 'jazzcash') => void;
  onConfirmPayment: (orderId: string, trxId: string) => void;
  onCancelOrder: (orderId: string) => void;
  onOpenHistory: () => void;
}

export const BuyView: React.FC<BuyViewProps> = ({
  user,
  activeOrder,
  onStartBuyOrder,
  onConfirmPayment,
  onCancelOrder,
  onOpenHistory,
}) => {
  const currency = 'PKR';
  const [selectedTicket, setSelectedTicket] = useState<BuyTicketOrder | null>(null);
  const [trxIdInput, setTrxIdInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [successOrder, setSuccessOrder] = useState<{
    orderNumber: string;
    amount: number;
    commission: number;
  } | null>(null);

  const handleOpenBuyModal = (ticket: BuyTicketOrder) => {
    setSelectedTicket(ticket);
    setTrxIdInput(`TRX-${Math.floor(100000000 + Math.random() * 900000000)}`);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const earnedCommission = Number(
        (selectedTicket.commissionMin + (selectedTicket.commissionMax - selectedTicket.commissionMin) * 0.7).toFixed(2)
      );

      // Trigger system confirm
      onStartBuyOrder(selectedTicket.amount, 'easypaisa');
      setTimeout(() => {
        onConfirmPayment(
          selectedTicket.orderNumber,
          trxIdInput || `TRX-${Date.now()}`
        );
      }, 500);

      setSuccessOrder({
        orderNumber: selectedTicket.orderNumber,
        amount: selectedTicket.amount,
        commission: earnedCommission,
      });

      setSelectedTicket(null);
    }, 1000);
  };

  const handleCopyAccount = (acc: string) => {
    navigator.clipboard?.writeText(acc);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div className="min-h-full flex flex-col bg-[#f0f4fa] text-slate-800 pb-20 select-none">
      {/* Top Header: Vibrant Solid Royal Blue exactly from screenshot */}
      <div className="bg-[#4364F7] text-white px-4 pt-3.5 pb-3 shadow-md sticky top-0 z-30 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-normal font-sans">
          Buy order
        </h1>

        <div className="flex items-center gap-3">
          {/* Exact "Order record" with document icon from screenshot */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 text-xs text-white/95 hover:text-white font-medium cursor-pointer transition-opacity active:opacity-80"
          >
            <span>Order record</span>
            {/* Outline Document Icon matching screenshot */}
            <svg
              className="w-4 h-4 text-white stroke-[2.2]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="13" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Ticket Vouchers List */}
      <div className="p-3.5 space-y-3.5 flex-1 overflow-y-auto">
        {initialTicketOrders.map((order) => {
          return (
            <div
              key={order.orderNumber}
              className="bg-white rounded-2xl relative shadow-xs border border-slate-100 overflow-hidden transition-transform duration-150 hover:shadow-md"
            >
              {/* Semi-circular coupon cutout notch on left */}
              <div className="absolute -left-2.5 top-[31px] w-5 h-5 rounded-full bg-[#f0f4fa] z-10 pointer-events-none" />

              {/* Semi-circular coupon cutout notch on right */}
              <div className="absolute -right-2.5 top-[31px] w-5 h-5 rounded-full bg-[#f0f4fa] z-10 pointer-events-none" />

              {/* Upper Section: Order number */}
              <div className="px-4.5 pt-3 pb-2 text-[12px] text-slate-500 font-sans tracking-tight">
                Order number: {order.orderNumber}
              </div>

              {/* Dashed divider line spanning between the two cutouts */}
              <div className="border-b border-dashed border-slate-200/90 mx-3" />

              {/* Lower Section: Amount, Commission, IME Pay logo, and Buy Button */}
              <div className="px-4.5 py-3.5 flex items-center justify-between">
                {/* Left Side: Bold Amount & Commission Range */}
                <div className="space-y-1">
                  <div className="text-[25px] leading-tight font-bold text-slate-900 tracking-tight flex items-baseline gap-1">
                    <span>
                      {order.amount % 1 === 0
                        ? order.amount
                        : order.amount.toFixed(2)}
                    </span>
                    <span className="text-base font-bold text-slate-800">
                      {currency}
                    </span>
                  </div>

                  <div className="text-[12.5px] text-slate-800 font-normal">
                    commission {order.commissionMin} ~ {order.commissionMax} {currency}
                  </div>
                </div>

                {/* Right Side: Red Payment Badge & Blue Buy Button */}
                <div className="flex flex-col items-end gap-2.5">
                  {/* ONE PAY Red Badge */}
                  <div className="flex items-center justify-center bg-[#d9222a] text-white px-2.5 py-0.5 rounded-sm shadow-2xs">
                    <div className="flex flex-col items-center leading-none">
                      <span className="text-[9px] font-black tracking-wider uppercase flex items-center gap-0.5">
                        <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        ONE
                      </span>
                      <span className="text-[7.5px] font-bold tracking-tight uppercase">
                        PAY
                      </span>
                    </div>
                  </div>

                  {/* Royal Blue Buy Button */}
                  <button
                    onClick={() => handleOpenBuyModal(order)}
                    className="bg-gradient-to-r from-[#6084f7] to-[#4870f7] hover:from-[#5277f5] hover:to-[#3a64f5] text-white font-medium text-sm px-6 py-1.5 rounded-lg shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Modal to Confirm & Execute Buy Order */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-[#4364F7] text-white px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Confirm Buy Order</h3>
                <span className="text-xs text-white/80 font-mono">
                  {selectedTicket.orderNumber}
                </span>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Order Amount & Commission Banner */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center space-y-1">
                <span className="text-xs text-slate-500 font-medium">
                  Total Order Amount
                </span>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {selectedTicket.amount} {currency}
                </div>
                <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 py-1 px-3 rounded-full inline-block mt-1">
                  Expected Commission: +{selectedTicket.commissionMin} ~ {selectedTicket.commissionMax} {currency}
                </div>
              </div>

              {/* Seller details */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Seller Name:</span>
                  <span className="font-bold text-slate-900">
                    {selectedTicket.sellerName}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Payment Channel:</span>
                  <span className="font-bold text-[#d9222a] bg-red-50 px-2 py-0.5 rounded">
                    ONE PAY / EasyPaisa
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Account / Mobile:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900">
                      {selectedTicket.sellerAccount}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount(selectedTicket.sellerAccount)}
                      className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
                      title="Copy"
                    >
                      {copiedAccount ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* TRX Form */}
              <form onSubmit={handleConfirmOrder} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Transaction ID / Reference:
                  </label>
                  <input
                    type="text"
                    required
                    value={trxIdInput}
                    onChange={(e) => setTrxIdInput(e.target.value)}
                    placeholder="e.g. TRX-982140281"
                    className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4364F7]"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTicket(null)}
                    className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-2 py-2.5 px-4 text-xs font-bold text-white bg-[#4364F7] hover:bg-[#3455e8] rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm & Receive Yield</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900">
                Order Completed!
              </h4>
              <p className="text-xs text-slate-500">
                Order #{successOrder.orderNumber} successfully processed.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-emerald-800 text-xs font-medium">
              You earned <span className="font-bold">+{successOrder.commission} {currency}</span> commission reward credited to your wallet balance!
            </div>

            <button
              onClick={() => setSuccessOrder(null)}
              className="w-full py-2.5 bg-[#4364F7] hover:bg-[#3455e8] text-white text-xs font-bold rounded-xl transition-colors"
            >
              Done (مکمل)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
