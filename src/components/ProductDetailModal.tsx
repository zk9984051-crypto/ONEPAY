import React from 'react';
import { X, MapPin, ShieldCheck, Phone, MessageSquare, Zap, ShoppingBag, Eye, Calendar, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onBuyNow,
  onAddToCart,
}) => {
  const { language, t } = useLanguage();

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-900 capitalize">{product.category}</span>
            <span>·</span>
            <span>{product.city}</span>
            <span>·</span>
            <span>Ad ID: #{product.id.slice(0, 8)}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Gallery & Verification (md:col-span-6) */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Quick trust strip */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>ZsPay Buyer Protection Guarantee</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Your funds remain secure in escrow until the order is delivered and verified by you. Instant refunds via EasyPaisa or JazzCash if item is not as described.
              </p>
              <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 2-3 Days TCS Delivery
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Genuine
                </span>
              </div>
            </div>

            {/* Seller profile card */}
            <div className="p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{product.seller.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>★ {product.seller.rating} rating</span>
                    <span>·</span>
                    <span>{product.seller.salesCount} items sold</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                  Verified Seller
                </span>
              </div>

              {/* Direct Seller Contact Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`https://wa.me/${product.seller.whatsapp}?text=Assalam%20o%20Alaikum,%20I%20am%20interested%20in%20your%20item%20"${encodeURIComponent(product.title)}"%20on%20ZsPay.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={`tel:${product.seller.phone}`}
                  className="py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Seller</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (md:col-span-6) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Product Title */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {language === 'ur' && product.titleUrdu ? product.titleUrdu : product.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {product.locationArea}, {product.city}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {product.createdAt}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    {product.views} views
                  </span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Market Price</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-sm font-semibold text-slate-600">PKR</span>
                  <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {product.price.toLocaleString('en-PK')}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-emerald-600">Free TCS Shipping</span>
                  <span>·</span>
                  <span>No hidden processing fees</span>
                </div>
              </div>

              {/* Condition & Spec Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                <div className="p-2.5 flex justify-between bg-white">
                  <span className="text-slate-500">Condition:</span>
                  <span className="font-semibold text-slate-900">{product.condition}</span>
                </div>
                <div className="p-2.5 flex justify-between bg-slate-50/50">
                  <span className="text-slate-500">Supported Payments:</span>
                  <span className="font-semibold text-emerald-700">EasyPaisa & JazzCash</span>
                </div>
                <div className="p-2.5 flex justify-between bg-white">
                  <span className="text-slate-500">Dispatched From:</span>
                  <span className="font-semibold text-slate-900">{product.city}, Pakistan</span>
                </div>
                <div className="p-2.5 flex justify-between bg-slate-50/50">
                  <span className="text-slate-500">Seller Mobile / JazzCash:</span>
                  <span className="font-mono text-slate-800">{product.seller.jazzCashNumber || product.seller.phone}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Description & Details
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  onBuyNow(product);
                  onClose();
                }}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{language === 'ur' ? 'ابھی خریدیں (ایزی پیسہ / جاز کیش)' : 'Buy Now with EasyPaisa / JazzCash'}</span>
              </button>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-slate-600" />
                <span>{t('addToCart')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
