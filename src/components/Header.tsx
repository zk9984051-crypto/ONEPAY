import React from 'react';
import { ShoppingBag, PlusCircle, ShieldCheck, Wallet, PackageCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  activeTab: 'buy' | 'sell' | 'orders' | 'wallet';
  setActiveTab: (tab: 'buy' | 'sell' | 'orders' | 'wallet') => void;
  cartCount: number;
  openCart: () => void;
  openSellModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openSellModal,
}) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('buy')}
            className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm font-black tracking-tight text-lg">
              ZS
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors whitespace-nowrap">
                ZsPay
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold text-emerald-700 ml-1.5 uppercase tracking-wider">
                PK
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (4-5 single line text links) */}
        <nav className="flex items-center gap-4 sm:gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('buy')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
              activeTab === 'buy'
                ? 'border-emerald-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t('buy')}
          </button>

          <button
            onClick={() => {
              setActiveTab('sell');
              openSellModal();
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm flex items-center gap-1.5 ${
              activeTab === 'sell'
                ? 'border-emerald-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>{t('sell')}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-emerald-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <PackageCheck className="w-4 h-4 text-slate-500" />
            <span>{t('orders')}</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm flex items-center gap-1.5 ${
              activeTab === 'wallet'
                ? 'border-emerald-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Wallet className="w-4 h-4 text-slate-500" />
            <span>{t('wallet')}</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap"
            title="Switch Language / زبان تبدیل کریں"
          >
            {language === 'en' ? 'اردو' : 'English'}
          </button>

          {/* Cart Action */}
          <button
            onClick={openCart}
            aria-label="Open Shopping Cart"
            className="relative px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t('cart')}</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-mono text-[11px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
