import React from 'react';
import { X, Palette, User, Globe, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type AppTheme = 'sky' | 'emerald' | 'jazz' | 'sapphire' | 'midnight';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  userName: string;
  onUpdateUserName: (name: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  userName,
  onUpdateUserName,
}) => {
  const { language, toggleLanguage } = useLanguage();

  if (!isOpen) return null;

  const themes: { id: AppTheme; name: string; urduName: string; bgClass: string; accentColor: string }[] = [
    {
      id: 'sky',
      name: 'Sky & Lavender (Original App)',
      urduName: 'آسمانی اور نیلا (اصل ایپ کا رنگ)',
      bgClass: 'bg-[#dce6ff]',
      accentColor: '#2563eb',
    },
    {
      id: 'emerald',
      name: 'Pakistani Emerald (EasyPaisa Green)',
      urduName: 'پاکستانی سبز (ایزی پیسہ)',
      bgClass: 'bg-emerald-100',
      accentColor: '#059669',
    },
    {
      id: 'jazz',
      name: 'JazzCash Flame (Red & Gold)',
      urduName: 'جاز کیش سرخ و نارنجی',
      bgClass: 'bg-rose-100',
      accentColor: '#dc2626',
    },
    {
      id: 'sapphire',
      name: 'Royal Sapphire (Blue Premium)',
      urduName: 'شاہی گہرا نیلا',
      bgClass: 'bg-blue-100',
      accentColor: '#1d4ed8',
    },
    {
      id: 'midnight',
      name: 'Midnight Dark Pro',
      urduName: 'ڈارک نائٹ موڈ',
      bgClass: 'bg-slate-800 text-white',
      accentColor: '#38bdf8',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-600" />
            <h3 className="font-serif italic text-lg font-bold text-slate-900">
              App Settings & Theme
            </h3>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto space-y-4 flex-1 text-xs">
          {/* COLOR THEME SELECTOR (DIRECTLY ADDRESSING USER PROMPT: "Colour change hona chay") */}
          <div className="space-y-2">
            <label className="font-serif italic font-bold text-slate-800 block text-sm">
              🎨 Choose App Color Theme (رنگ تبدیل کریں):
            </label>
            <div className="space-y-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    currentTheme === theme.id
                      ? 'border-blue-600 ring-2 ring-blue-500 bg-blue-50/50 font-bold'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full border border-black/10 shrink-0 shadow-xs"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                    <div>
                      <span className="font-serif italic text-slate-900 block font-semibold">
                        {theme.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-urdu block">
                        {theme.urduName}
                      </span>
                    </div>
                  </div>

                  {currentTheme === theme.id && (
                    <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* User Name */}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            <label className="font-serif italic font-semibold text-slate-700 block">
              Profile Display Name:
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => onUpdateUserName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-serif italic text-sm text-slate-900"
            />
          </div>

          {/* Language Toggle */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-600" />
              <span className="font-serif italic text-slate-700">Language (زبان)</span>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold font-serif italic text-xs"
            >
              {language === 'en' ? 'اردو زبان' : 'English'}
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-900 text-white rounded-xl font-bold font-serif italic text-xs"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
