import React from 'react';
import { Home, User } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 max-w-md mx-auto shadow-lg">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* 1. HOME */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-[#4364F7]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {/* House icon matching screenshot */}
          <svg
            className={`w-5 h-5 stroke-[2] ${activeTab === 'home' ? 'text-[#4364F7]' : 'text-slate-400'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-5H9v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
          </svg>
          <span className="text-[11px] font-medium tracking-tight mt-1 font-sans">
            home
          </span>
        </button>

        {/* 2. SAVINGS */}
        <button
          onClick={() => setActiveTab('savings')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'savings' ? 'text-[#4364F7]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {/* Diamond / coin in circle icon */}
          <svg
            className={`w-5 h-5 stroke-[2] ${activeTab === 'savings' ? 'text-[#4364F7]' : 'text-slate-400'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <polygon points="12 6 18 12 12 18 6 12 12 6" />
          </svg>
          <span className="text-[11px] font-medium tracking-tight mt-1 font-sans">
            savings
          </span>
        </button>

        {/* 3. BUY */}
        <button
          onClick={() => setActiveTab('buy')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'buy' ? 'text-[#4364F7]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {/* Bracket arrow [↑↓] matching screenshot */}
          <div className="w-5 h-5 flex items-center justify-center relative">
            <svg
              className={`w-5 h-5 stroke-[2.2] ${activeTab === 'buy' ? 'text-[#4364F7]' : 'text-slate-400'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Left & Right brackets */}
              <path d="M5 4h-2v16h2" />
              <path d="M19 4h2v16h-2" />
              {/* Up & down arrows */}
              <path d="M9 14l0 -6l-2 2" />
              <path d="M15 10l0 6l2 -2" />
            </svg>
          </div>
          <span className="text-[11px] font-medium tracking-tight mt-1 font-sans">
            buy
          </span>
        </button>

        {/* 4. SELL */}
        <button
          onClick={() => setActiveTab('sell')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'sell' ? 'text-[#4364F7]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {/* Bracket arrow [↑] matching screenshot */}
          <div className="w-5 h-5 flex items-center justify-center relative">
            <svg
              className={`w-5 h-5 stroke-[2.2] ${activeTab === 'sell' ? 'text-[#4364F7]' : 'text-slate-400'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Left & Right brackets */}
              <path d="M5 4h-2v16h2" />
              <path d="M19 4h2v16h-2" />
              {/* Center Up arrow */}
              <path d="M12 16V8m-3 3l3-3 3 3" />
            </svg>
          </div>
          <span className="text-[11px] font-medium tracking-tight mt-1 font-sans">
            sell
          </span>
        </button>

        {/* 5. MY */}
        <button
          onClick={() => setActiveTab('my')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'my' ? 'text-[#4364F7]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <svg
            className={`w-5 h-5 stroke-[2] ${activeTab === 'my' ? 'text-[#4364F7]' : 'text-slate-400'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
          </svg>
          <span className="text-[11px] font-medium tracking-tight mt-1 font-sans">
            my
          </span>
        </button>
      </div>
    </nav>
  );
};
