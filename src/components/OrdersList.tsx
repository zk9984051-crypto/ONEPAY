import React from 'react';
import { Package, Truck, CheckCircle2, Clock, ExternalLink, Printer, ShieldCheck } from 'lucide-react';
import { Order } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface OrdersListProps {
  orders: Order[];
  onViewReceipt: (order: Order) => void;
  onBrowseMarketplace: () => void;
}

export const OrdersList: React.FC<OrdersListProps> = ({
  orders,
  onViewReceipt,
  onBrowseMarketplace,
}) => {
  const { language } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <Package className="w-7 h-7 text-emerald-600" />
            <span>{language === 'ur' ? 'میرے آرڈرز اور ٹریکنگ' : 'My Orders & Deliveries'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your purchases paid with EasyPaisa, JazzCash, or Cash on Delivery
          </p>
        </div>

        <button
          onClick={onBrowseMarketplace}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors self-start sm:self-auto"
        >
          {language === 'ur' ? 'مزید اشیاء خریدیں' : 'Continue Shopping'}
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Orders Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't placed any orders yet. Choose any product and pay securely via EasyPaisa or JazzCash.
          </p>
          <button
            onClick={onBrowseMarketplace}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors inline-block"
          >
            Explore Marketplace
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isEasyPaisa = order.paymentMethod === 'easypaisa';
            const isJazzCash = order.paymentMethod === 'jazzcash';

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Order Top Bar */}
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Order Placed:</span>
                      <span className="font-semibold text-slate-900">{order.orderDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Order Number:</span>
                      <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Total Paid:</span>
                      <span className="font-mono font-bold text-emerald-700">
                        PKR {order.total.toLocaleString('en-PK')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                        isEasyPaisa
                          ? 'bg-emerald-100 text-emerald-800'
                          : isJazzCash
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-200 text-slate-800'
                      }`}
                    >
                      {isEasyPaisa ? 'Paid via EasyPaisa' : isJazzCash ? 'Paid via JazzCash' : 'Cash on Delivery'}
                    </span>

                    <button
                      onClick={() => onViewReceipt(order)}
                      className="px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1 font-medium"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>
                  </div>
                </div>

                {/* Items & Status */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Items column */}
                  <div className="md:col-span-7 space-y-3">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.product.title}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Qty: {item.quantity} · Seller: {item.product.seller.name} ({item.product.city})
                          </p>
                          <p className="text-xs font-mono font-semibold text-slate-800 mt-0.5">
                            PKR {(item.product.price * item.quantity).toLocaleString('en-PK')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking status column */}
                  <div className="md:col-span-5 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        <span>TCS Courier Express</span>
                      </span>
                      <span className="text-[11px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {order.trackingNumber}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{order.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Destination: {order.shippingAddress.address}, {order.shippingAddress.city}
                      </p>
                    </div>

                    {order.paymentDetail.method !== 'cod' && (
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                        TRX Reference:{' '}
                        <span className="font-mono font-medium text-slate-800">
                          {order.paymentDetail.transactionId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
