import React from 'react';
import { Search, MapPin, Plus, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PAKISTANI_CITIES } from '../data/initialProducts';

interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onPostAdClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  onPostAdClick,
}) => {
  const { language, t } = useLanguage();

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      {/* Background with measured contrast scrim over the generated hero image */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
        <img
          src="/src/assets/images/hero_marketplace_pakistan_1793473938173.jpg"
          alt="Pakistan Marketplace"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>EasyPaisa & JazzCash Integrated Escrow</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'ur'
                ? 'پورے پاکستان میں خریدیں اور بیچیں — براہ راست ایزی پیسہ اور جاز کیش'
                : 'Buy & Sell Across Pakistan with Instant EasyPaisa & JazzCash'}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              {language === 'ur'
                ? 'سیلر بنیں اور رقم فوراً اپنے والٹ میں وصول کریں، یا تصدیق شدہ اشیاء گھر بیٹھے ون ٹیپ موبائل اکاؤنٹ کے ذریعے خریدیں۔'
                : 'Verified local sellers, instant mobile payment verification, and door-to-door courier delivery anywhere in Pakistan.'}
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onPostAdClick}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'ur' ? 'اشتہار لگائیں (چیز بیچیں)' : 'Post an Ad (Sell Item)'}</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
                <span className="text-slate-400">Supported:</span>
                <span className="font-bold text-emerald-400">EasyPaisa</span>
                <span className="text-slate-500">·</span>
                <span className="font-bold text-amber-400">JazzCash</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300">Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Search & Location Box */}
          <div className="lg:col-span-5 bg-white rounded-xl p-5 shadow-xl text-slate-900 border border-slate-200">
            <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>{language === 'ur' ? 'مارکیٹ میں تلاش کریں' : 'Find What You Need'}</span>
              <span className="text-xs font-normal text-slate-500">100% Verified</span>
            </h2>

            <div className="space-y-3">
              {/* Search query */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 transition-colors"
                />
              </div>

              {/* City selector */}
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 transition-colors cursor-pointer appearance-none"
                >
                  {PAKISTANI_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Instant benefits bullet points */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant OTP / USSD</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero Gateway Surcharge</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verified Listings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
