import React from 'react';
import { CheckCircle, Printer, Download, ArrowRight, Share2, MessageCircle, X } from 'lucide-react';
import { Order } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
  onViewOrders: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  order,
  onClose,
  onViewOrders,
}) => {
  const { language } = useLanguage();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const isEasyPaisa = order.paymentMethod === 'easypaisa';
  const isJazzCash = order.paymentMethod === 'jazzcash';

  const trxId =
    order.paymentDetail.method === 'easypaisa'
      ? order.paymentDetail.transactionId
      : order.paymentDetail.method === 'jazzcash'
      ? order.paymentDetail.transactionId
      : 'COD-PENDING';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tax Invoice & Payment Receipt
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Success Banner */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {language === 'ur' ? 'ادائیگی کامیابی سے مکمل ہو گئی!' : 'Payment Completed Successfully!'}
            </h3>
            <p className="text-xs text-slate-500">
              Your order is confirmed and scheduled for dispatch via TCS Courier.
            </p>
          </div>

          {/* Payment Gateway Confirmation Box */}
          <div
            className={`p-4 rounded-xl border ${
              isEasyPaisa
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : isJazzCash
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex justify-between items-center text-xs pb-2 border-b border-black/10">
              <span className="font-semibold uppercase tracking-wider">
                {isEasyPaisa ? 'EasyPaisa Instant Pay' : isJazzCash ? 'JazzCash Direct Pay' : 'Cash on Delivery'}
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                PAID & VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2.5 text-xs">
              <div>
                <span className="text-slate-500 text-[11px] block">Transaction Reference (TRX ID):</span>
                <span className="font-mono font-bold text-slate-900">{trxId}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Order Number:</span>
                <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Paid Amount:</span>
                <span className="font-mono font-bold text-slate-900">
                  PKR {order.total.toLocaleString('en-PK')}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Date & Time:</span>
                <span className="text-slate-900">{order.orderDate}</span>
              </div>
            </div>
          </div>

          {/* Simulated SMS Alert from 3737 / 8558 */}
          <div className="p-3 bg-slate-900 text-white rounded-xl text-xs space-y-1 font-mono">
            <div className="flex justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1">
              <span>{isEasyPaisa ? 'SMS from 3737 (EasyPaisa)' : isJazzCash ? 'SMS from 8558 (JazzCash)' : 'SMS from TCS'}</span>
              <span>Just now</span>
            </div>
            <p className="text-[11px] text-slate-200 leading-relaxed pt-1">
              {isEasyPaisa && (
                <>EasyPaisa: Rs. {order.total.toLocaleString('en-PK')} successfully transferred to ZsPay for Order {order.orderNumber}. TRX ID: {trxId}. Support: 3737.</>
              )}
              {isJazzCash && (
                <>JazzCash: Rs. {order.total.toLocaleString('en-PK')} paid from account to ZsPay PK. Trx ID: {trxId}. Fee: Rs 0. Call 4444 for details.</>
              )}
              {order.paymentMethod === 'cod' && (
                <>ZsPay: Your COD Order {order.orderNumber} is confirmed! Pay Rs. {order.total.toLocaleString('en-PK')} to TCS Rider upon arrival.</>
              )}
            </p>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-2 border-t border-slate-200 pt-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Purchased Items
            </h4>
            <div className="divide-y divide-slate-100 text-xs">
              {order.items.map((item) => (
                <div key={item.product.id} className="py-2 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-slate-900">{item.product.title}</span>
                    <span className="text-slate-500 text-[11px] block">
                      Qty: {item.quantity} · Seller: {item.product.seller.name} ({item.product.city})
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    PKR {(item.product.price * item.quantity).toLocaleString('en-PK')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Delivery Details (TCS Express)
            </span>
            <p className="text-slate-800 font-medium">
              {order.shippingAddress.fullName} · {order.shippingAddress.phone}
            </p>
            <p className="text-slate-600">
              {order.shippingAddress.address}, {order.shippingAddress.city}
              {order.shippingAddress.nearLandmark && ` (Near: ${order.shippingAddress.nearLandmark})`}
            </p>
            <p className="text-[11px] font-mono text-emerald-700 pt-1">
              Tracking No: {order.trackingNumber}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onViewOrders();
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>View in My Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
