import React, { useState } from 'react';
import { ChevronLeft, Copy, Check, X, Upload } from 'lucide-react';
import { P2POrder } from '../types';

interface OrderDetailViewProps {
  order?: P2POrder | null;
  onBack: () => void;
}

export const OrderDetailView: React.FC<OrderDetailViewProps> = ({
  order,
  onBack,
}) => {
  // Configured with exact details requested:
  // Name: KHAN TRADER
  // Number: 03228635577
  // Account: EASYPAISA
  // Order number: DF635KW9281742570095
  const orderData = {
    id: order?.id || 'ord-khan-1201',
    orderNumber: order?.orderNumber || 'DF635KW9281742570095',
    type: 'buy' as const,
    amountPKR: order?.amountPKR || 1201,
    commissionPKR: order?.commissionPKR || 15.01,
    method: 'easypaisa' as const,
    counterpartyName: 'KHAN TRADER',
    counterpartyAccount: '03228635577',
    counterpartyTitle: 'EASYPAISA',
    status: 'completed' as const,
    createdAt: '2026/10/28 17:42',
    trxId: '741118742',
  };

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [customVoucherUrl, setCustomVoucherUrl] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUploadVoucher = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomVoucherUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-full bg-[#f8faff] flex flex-col justify-between pb-24 text-slate-800 animate-in fade-in duration-200">
      {/* Top Header with Back Arrow and Title "Completed(PKR)" */}
      <div className="relative px-4 py-3 flex items-center justify-between border-b border-slate-100 bg-white">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-slate-800 hover:text-black transition-colors"
          title="Back to Buy order"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        <h1 className="font-serif italic text-base font-bold text-slate-800 tracking-wide text-center flex-1 pr-5">
          Completed(PKR)
        </h1>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Big Amount: "1201 PKR" (Exact from Screenshot) */}
        <div className="text-center py-2 space-y-0.5">
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-serif italic text-5xl font-extrabold text-slate-900 tracking-tight">
              {orderData.amountPKR.toLocaleString('en-PK')}
            </span>
            <span className="font-serif italic text-xl font-bold text-slate-900">
              PKR
            </span>
          </div>
        </div>

        {/* SECTION 1: Account Information (Exact from Screenshot) */}
        <div className="space-y-1.5">
          {/* Section Header with Blue Bar */}
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-3.5 bg-blue-600 rounded-full inline-block" />
            <h3 className="font-serif italic text-sm font-bold text-slate-900 tracking-wide">
              Account Information
            </h3>
          </div>

          {/* White Card */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5">
            {/* Row 1: Logo + KHAN TRADER + Copy icon */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Circular EasyPaisa badge */}
                <div className="w-9 h-9 rounded-full bg-[#00171f] flex items-center justify-center p-1 border border-slate-800 shadow-xs">
                  <div className="w-full h-full rounded-full border-2 border-emerald-400 bg-slate-900 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <span className="font-serif italic text-base font-bold text-slate-900 tracking-wider uppercase">
                  {orderData.counterpartyName}
                </span>
              </div>

              <button
                onClick={() => copyToClipboard(orderData.counterpartyName, 'name_top')}
                className="p-1 text-slate-600 hover:text-slate-900 transition-colors"
                title="Copy name"
              >
                {copiedField === 'name_top' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 stroke-[1.8]" />
                )}
              </button>
            </div>

            {/* Row 2: Account + 03228635577 + Copy */}
            <div className="flex items-center justify-between pt-1">
              <span className="font-serif italic text-xs text-slate-400">
                Account
              </span>

              <div className="flex items-center gap-2">
                <span className="font-serif italic text-sm font-bold text-slate-900 tracking-wider">
                  {orderData.counterpartyAccount}
                </span>
                <button
                  onClick={() => copyToClipboard(orderData.counterpartyAccount, 'account')}
                  className="p-1 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Copy account number"
                >
                  {copiedField === 'account' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 stroke-[1.8]" />
                  )}
                </button>
              </div>
            </div>

            {/* Row 3: Name + EASYPAISA + Copy */}
            <div className="flex items-center justify-between">
              <span className="font-serif italic text-xs text-slate-400">
                Name
              </span>

              <div className="flex items-center gap-2">
                <span className="font-serif italic text-sm font-bold text-slate-900 tracking-wider uppercase">
                  {orderData.counterpartyTitle}
                </span>
                <button
                  onClick={() => copyToClipboard(orderData.counterpartyTitle, 'title')}
                  className="p-1 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Copy channel title"
                >
                  {copiedField === 'title' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 stroke-[1.8]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Order Information with watermark (Exact from Screenshot) */}
        <div className="space-y-1.5">
          {/* Header Row: Blue Bar + Order Information on left, Order Number on right */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-3.5 bg-blue-600 rounded-full inline-block" />
              <h3 className="font-serif italic text-sm font-bold text-slate-900 tracking-wide">
                Order information
              </h3>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-serif italic text-xs font-bold text-slate-800 tracking-tight">
                {orderData.orderNumber}
              </span>
              <button
                onClick={() => copyToClipboard(orderData.orderNumber, 'order_no')}
                className="p-1 text-slate-600 hover:text-slate-900 transition-colors"
                title="Copy Order Number"
              >
                {copiedField === 'order_no' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 stroke-[1.8]" />
                )}
              </button>
            </div>
          </div>

          {/* White Card with Giant Circular Checkmark Watermark */}
          <div className="relative bg-white rounded-2xl p-4 shadow-xs border border-slate-100 overflow-hidden">
            {/* Circular Green Checkmark Watermark (Exact from Screenshot) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-44 h-44 rounded-full border-[14px] border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center">
                <Check className="w-24 h-24 text-emerald-600 stroke-[4]" />
              </div>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 space-y-3">
              {/* Row 1: commission + 15.01 PKR */}
              <div className="flex items-center justify-between">
                <span className="font-serif italic text-xs text-slate-800 font-medium">
                  commission
                </span>

                <div className="flex items-baseline gap-1">
                  <span className="font-serif italic text-2xl font-extrabold text-slate-900">
                    {orderData.commissionPKR.toFixed(2)}
                  </span>
                  <span className="font-serif italic text-xs font-bold text-slate-900">
                    PKR
                  </span>
                </div>
              </div>

              {/* Dotted / Dashed Separator Line (Exact from Screenshot) */}
              <div className="border-b border-dashed border-slate-200" />

              {/* Row 2: time + 2026/10/28 17:42 */}
              <div className="flex items-center justify-between">
                <span className="font-serif italic text-xs text-slate-800 font-medium">
                  time
                </span>

                <span className="font-serif italic text-xs font-bold text-slate-800">
                  {orderData.createdAt}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Uploaded Payment Voucher (Exact from Screenshot) */}
        <div className="space-y-2 pt-0.5">
          <p className="font-serif italic text-xs text-slate-400">
            You have uploaded the payment voucher
          </p>

          {/* Voucher Thumbnail */}
          <div
            onClick={() => setIsVoucherModalOpen(true)}
            className="w-32 bg-white rounded-xl p-2 shadow-xs border border-slate-200 cursor-pointer hover:shadow-md transition-shadow group"
          >
            {customVoucherUrl ? (
              <img
                src={customVoucherUrl}
                alt="Payment Voucher"
                className="w-full h-24 object-cover rounded"
              />
            ) : (
              /* Simulated authentic EasyPaisa / Raast transfer receipt matching screenshot thumbnail */
              <div className="bg-slate-50 border border-slate-100 rounded p-1.5 text-[8px] space-y-1 font-sans">
                <div className="flex justify-center mb-0.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>
                <div className="text-center font-bold text-[9px] text-slate-900">
                  Rs. 1,201
                </div>
                <div className="text-center text-[7px] text-slate-400">
                  Sent at 5:45 PM on 28 Oct 26
                </div>
                <div className="grid grid-cols-2 gap-1 text-[6.5px] border-t border-slate-200 pt-0.5 text-slate-600">
                  <div>
                    <span className="block text-slate-400">From</span>
                    Muhammad Zahid *2506
                  </div>
                  <div>
                    <span className="block text-slate-400">To</span>
                    KHAN TRADER *5577
                  </div>
                </div>
                <div className="text-[6px] text-slate-400 border-t border-slate-200 pt-0.5 flex justify-between">
                  <span>Trx: 741118742</span>
                  <span className="text-emerald-600 font-bold">Raast EasyPaisa</span>
                </div>
              </div>
            )}
          </div>

          {/* Click to view larger image text (Exact from Screenshot) */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsVoucherModalOpen(true)}
              className="font-serif italic text-xs text-blue-600 hover:text-blue-700 transition-colors hover:underline"
            >
              Click to view larger image
            </button>

            {/* Optional upload new voucher button */}
            <label className="text-[11px] font-serif italic text-slate-500 hover:text-slate-800 cursor-pointer flex items-center gap-1">
              <Upload className="w-3 h-3" />
              <span>Replace voucher</span>
              <input type="file" accept="image/*" onChange={handleUploadVoucher} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* FULL SCREEN MODAL: Large Voucher Viewer */}
      {isVoucherModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-serif italic text-sm font-bold text-slate-900">
                Payment Voucher Receipt
              </h4>
              <button
                onClick={() => setIsVoucherModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Voucher Display */}
            {customVoucherUrl ? (
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <img src={customVoucherUrl} alt="Voucher" className="w-full max-h-96 object-contain" />
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
                <div className="text-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xs">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="font-bold text-2xl text-slate-900 font-mono">
                    Rs. 1,201.00
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sent successfully at 5:45 PM on 28 Oct 2026
                  </p>
                </div>

                <div className="divide-y divide-slate-100 text-xs text-slate-700">
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-400">Sender:</span>
                    <span className="font-semibold">Muhammad Zahid Sattar (*2506)</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-400">Receiver:</span>
                    <span className="font-semibold text-slate-900">KHAN TRADER (*5577)</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-400">Account:</span>
                    <span className="font-mono font-bold text-slate-900">03228635577</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-400">Channel:</span>
                    <span className="font-semibold text-emerald-600">EasyPaisa / Raast Instant</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-400">Transaction ID:</span>
                    <span className="font-mono font-bold text-slate-900">741118742</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-400">Order Reference:</span>
                    <span className="font-mono font-bold text-blue-600">DF635KW9281742570095</span>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50 rounded-lg text-[11px] text-emerald-800 text-center font-medium">
                  ✓ Verified by State Bank of Pakistan Raast Payment Gateway
                </div>
              </div>
            )}

            <button
              onClick={() => setIsVoucherModalOpen(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl font-serif italic text-xs font-bold"
            >
              Close Viewer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
