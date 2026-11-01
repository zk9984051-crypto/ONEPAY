import React from 'react';
import { MapPin, ShieldCheck, Zap, Heart } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onBuyNow,
}) => {
  const { language, t } = useLanguage();

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Card Image Area with fallback */}
        <div
          onClick={() => onSelect(product)}
          className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // fallback to styled gradient container if path issues arise
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Quiet top corner badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            {product.featured && (
              <span className="text-[10px] font-semibold tracking-wider uppercase bg-amber-500 text-white px-2 py-0.5 rounded shadow-xs">
                Featured
              </span>
            )}
            <span className="text-[10px] font-medium bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded">
              {product.city}
            </span>
          </div>

          <div className="absolute top-2.5 right-2.5">
            <span className="text-[10px] font-medium bg-emerald-600/90 text-white px-2 py-0.5 rounded">
              EasyPaisa / JazzCash
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2">
          {/* Unboxed metadata line */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="capitalize">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.condition}</span>
            <span aria-hidden="true">·</span>
            <span>{product.createdAt}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(product)}
            className="text-sm font-semibold text-slate-900 line-clamp-2 hover:text-emerald-700 cursor-pointer transition-colors leading-snug"
          >
            {language === 'ur' && product.titleUrdu ? product.titleUrdu : product.title}
          </h3>

          {/* Location Area */}
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{product.locationArea}</span>
          </div>

          {/* Price display with Tabular Numerals */}
          <div className="pt-1.5 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-500 mr-1 font-medium">PKR</span>
              <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {product.price.toLocaleString('en-PK')}
              </span>
            </div>

            {/* Seller rating */}
            <div className="flex items-center gap-1 text-[11px] text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate max-w-[100px]">{product.seller.name.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onSelect(product)}
          className="flex-1 py-1.5 px-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap"
        >
          {language === 'ur' ? 'تفصیلات دیکھیں' : 'Details'}
        </button>

        <button
          onClick={() => onBuyNow(product)}
          className="flex-1 py-1.5 px-3 text-xs font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{t('buyNow')}</span>
        </button>
      </div>
    </div>
  );
};
