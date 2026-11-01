import React, { useState } from 'react';
import { ZsLogo } from './ZsLogo';
import { Eye, EyeOff, Lock, Smartphone, User, KeyRound, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginPageProps {
  onLoginSuccess: (userProfile: Partial<UserProfile>) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('03228635577');
  const [password, setPassword] = useState('123456');
  const [fullName, setFullName] = useState('ZAHID LEGHARI 🖤👑');
  const [inviteCode, setInviteCode] = useState('1R227');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim() || !password.trim()) {
      setError('Please enter mobile number and password.');
      return;
    }
    if (isRegisterMode && !fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        name: isRegisterMode ? fullName.trim() : (mobileNumber === '03228635577' ? 'ZAHID LEGHARI 🖤👑' : 'ZAHID LEGHARI 🖤👑'),
        uid: isRegisterMode ? `${Math.floor(10000 + Math.random() * 90000)}` : '20558',
      });
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        name: 'ZAHID LEGHARI 🖤👑',
        uid: '20558',
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8efff] via-[#f5f8ff] to-white flex flex-col justify-between p-4 sm:p-6 text-slate-800 animate-in fade-in duration-200">
      {/* Top Brand Area */}
      <div className="pt-6 pb-2 flex flex-col items-center justify-center space-y-2">
        <ZsLogo size={105} showText={false} />
        <span className="font-serif italic font-black text-xl tracking-widest text-red-600 uppercase">
          ONEPAY
        </span>
        <p className="font-serif italic text-xs text-slate-500">
          Pakistan's Fast P2P EasyPaisa & JazzCash Gateway
        </p>
      </div>

      {/* Main Login / Register Card */}
      <div className="w-full max-w-sm mx-auto bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-5">
        {/* Toggle between Login and Register */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-serif italic">
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(false);
              setError('');
            }}
            className={`py-2 rounded-lg font-bold transition-all text-center ${
              !isRegisterMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Login (لاگ ان)
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(true);
              setError('');
            }}
            className={`py-2 rounded-lg font-bold transition-all text-center ${
              isRegisterMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register (نیا اکاؤنٹ)
          </button>
        </div>

        {error && (
          <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200 font-serif italic">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Full Name if Registering */}
          {isRegisterMode && (
            <div>
              <label className="block font-serif italic font-semibold text-slate-700 mb-1">
                Full Name (پورا نام):
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Zahid Leghari"
                  className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 font-serif italic"
                />
              </div>
            </div>
          )}

          {/* Mobile Number */}
          <div>
            <label className="block font-serif italic font-semibold text-slate-700 mb-1">
              Mobile Number (EasyPaisa / JazzCash):
            </label>
            <div className="relative">
              <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="03XXXXXXXXX"
                className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-serif italic font-semibold text-slate-700 mb-1">
              Password (پاس ورڈ):
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Invitation Code if Registering */}
          {isRegisterMode && (
            <div>
              <label className="block font-serif italic font-semibold text-slate-700 mb-1">
                Invitation Code (دعوت نامہ کوڈ):
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="1R227"
                  className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 font-mono uppercase"
                />
              </div>
            </div>
          )}

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => alert('Please contact ONEPAY customer support on WhatsApp for PIN reset.')}
              className="text-red-600 hover:underline font-serif italic"
            >
              Forgot Password?
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-serif italic font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{isSubmitting ? 'Verifying...' : (isRegisterMode ? 'Create Account' : 'Login to ONEPAY')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Tap Fast Demo Login Button */}
        <div className="pt-2 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-serif italic text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Fast 1-Tap Login as Zahid Leghari (Demo)</span>
          </button>
        </div>
      </div>

      {/* Footer Trust Indicator */}
      <div className="py-4 text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Secured by State Bank 1Link & Raast</span>
        </div>
        <p className="text-[10px] text-slate-400 font-serif italic">
          © {new Date().getFullYear()} ONEPAY Pakistan. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};
