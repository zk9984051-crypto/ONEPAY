import React, { useState } from 'react';
import { X, Download, Copy, Check, Smartphone, Share2, Globe, Sparkles } from 'lucide-react';
import { ZsLogo } from '../ZsLogo';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const appUrl = 'https://ais-pre-eqs7mizduj45jehpogks4j-776956028625.asia-northeast1.run.app';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeInstall = async () => {
    if (isInstallable) {
      await install();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-red-600" />
            <h3 className="font-serif italic text-base font-bold text-slate-900">
              Install ONEPAY App (ایپ انسٹال کریں)
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Showcase */}
        <div className="text-center flex flex-col items-center py-1">
          <ZsLogo size={64} showText={false} />
          <h4 className="font-serif italic font-black text-lg text-red-600 uppercase mt-1">
            ONEPAY PAKISTAN
          </h4>
          <p className="font-serif italic text-xs text-slate-500">
            EasyPaisa & JazzCash Fast Order Matching App
          </p>
        </div>

        {/* Live Install Button if supported by browser */}
        {isInstallable && !isInstalled && (
          <button
            onClick={handleNativeInstall}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-serif italic font-bold rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>1-Tap Direct Install (براہ راست انسٹال کریں)</span>
          </button>
        )}

        {isInstalled && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-serif italic flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>ONEPAY app is already installed on this device!</span>
          </div>
        )}

        {/* Official Application Link Box */}
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2">
          <label className="font-serif italic font-bold text-[11px] text-slate-700 block flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Official Application Link (انسٹالیشن لنک):</span>
          </label>

          <div className="p-2 bg-white rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 break-all select-all">
            {appUrl}
          </div>

          <button
            onClick={handleCopyLink}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-serif italic font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Link Copied! (لنک کاپی ہو گیا)</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Install Link (لنک کاپی کریں)</span>
              </>
            )}
          </button>
        </div>

        {/* Step-by-Step Installation Guides */}
        <div className="space-y-2.5 text-xs">
          {/* Android Chrome Guide */}
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 font-serif italic font-bold text-slate-900">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Android (Chrome Browser):</span>
            </div>
            <ol className="list-decimal list-inside text-slate-600 space-y-0.5 text-[11px] leading-relaxed font-serif italic">
              <li>Open link in Google Chrome.</li>
              <li>Tap top right 3 dots (<strong>⋮</strong>).</li>
              <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong> (ہوم اسکرین پر شامل کریں).</li>
              <li>App icon will appear on your phone screen!</li>
            </ol>
          </div>

          {/* iPhone Safari Guide */}
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 font-serif italic font-bold text-slate-900">
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>iPhone / iOS (Safari Browser):</span>
            </div>
            <ol className="list-decimal list-inside text-slate-600 space-y-0.5 text-[11px] leading-relaxed font-serif italic">
              <li>Open link in Apple Safari.</li>
              <li>Tap <strong>Share icon</strong> (نیچے شیئر کا بٹن).</li>
              <li>Scroll down and select <strong>"Add to Home Screen"</strong>.</li>
              <li>Tap <strong>"Add"</strong> at top right.</li>
            </ol>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-serif italic font-bold text-xs transition-colors"
        >
          Close (بند کریں)
        </button>
      </div>
    </div>
  );
};
