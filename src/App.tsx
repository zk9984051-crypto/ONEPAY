/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { BinanceRatesProvider } from './context/BinanceRatesContext';
import { NavTab, UserProfile, P2POrder, WalletTransaction, CollectionChannel, TeamMember, DailyTask } from './types';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { SavingsView } from './components/SavingsView';
import { BuyView } from './components/BuyView';
import { SellView } from './components/SellView';
import { MyProfileView } from './components/MyProfileView';
import { RechargeModal } from './components/modals/RechargeModal';
import { WithdrawalModal } from './components/modals/WithdrawalModal';
import { CollectionChannelModal } from './components/modals/CollectionChannelModal';
import { TransactionRecordModal } from './components/modals/TransactionRecordModal';
import { TeamModal } from './components/modals/TeamModal';
import { PackageModal } from './components/modals/PackageModal';
import { RankingModal } from './components/modals/RankingModal';
import { SettingsModal, AppTheme } from './components/modals/SettingsModal';
import { InstallAppModal } from './components/modals/InstallAppModal';
import { LoginPage } from './components/LoginPage';
import { CheckCircle2, Palette, Download, LogOut, Smartphone, Sparkles, Coins } from 'lucide-react';

const initialUserProfile: UserProfile = {
  name: 'ZAHID LEGHARI 🖤👑',
  uid: '20558',
  balance: 45929.25,
  commission: 855600,
  orderAvailable: 35929.25,
  inTransaction: 0,
  invitationCode: '1R227',
  vipLevel: 'VIP 1',
};

const initialChannels: CollectionChannel[] = [
  {
    id: 'ch-1',
    type: 'easypaisa',
    accountTitle: 'Khan trader',
    accountNumber: '03228635577',
    isActive: true,
    dailyLimit: 250000,
  },
  {
    id: 'ch-2',
    type: 'jazzcash',
    accountTitle: 'Khan trader',
    accountNumber: '0300-4567891',
    isActive: true,
    dailyLimit: 250000,
  },
];

const initialTransactions: WalletTransaction[] = [
  {
    id: 't-1',
    type: 'recharge',
    amountPKR: 28085,
    method: 'usdt',
    accountTitle: 'USDT TRC20 Deposit',
    accountNumber: 'TRC20: TK7rF9yWv1N2mC3p8xV4a5B6dE7zP8qR9s',
    trxId: 'TRX-982184910',
    status: 'Completed',
    timestamp: 'Today, 10:45 AM',
    note: 'Binance P2P Rate: 280.85 PKR',
  },
  {
    id: 't-2',
    type: 'commission_reward',
    amountPKR: 8556,
    method: 'usdt',
    accountTitle: 'Trade Yield Commission',
    accountNumber: 'ONEPAY Reward System',
    trxId: 'YLD-771928',
    status: 'Completed',
    timestamp: 'Today, 09:12 AM',
  },
  {
    id: 't-3',
    type: 'withdrawal',
    amountPKR: 14165,
    method: 'usdt',
    accountTitle: 'USDT TRC20 Payout',
    accountNumber: 'TRC20: TYx90K2mB7pQ1a4zV8cE3dF6s8L1m',
    trxId: 'WD-882194012',
    status: 'Completed',
    timestamp: 'Yesterday, 04:30 PM',
    note: 'Payout: 50.00 USDT @ 283.30 PKR',
  },
  {
    id: 't-4',
    type: 'sell_order',
    amountPKR: 8500,
    method: 'usdt',
    accountTitle: 'P2P Buyer Match',
    accountNumber: 'TRC20: TN7pB8mC2qW3v9x',
    trxId: 'ORD-549102831',
    status: 'Completed',
    timestamp: 'Yesterday, 02:15 PM',
  },
];

const initialTeam: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Muhammad Asif',
    uid: '24891',
    level: 1,
    totalVolume: 85000,
    commissionEarned: 255.00,
    joinedDate: '26 Oct 2026',
    status: 'Active',
  },
  {
    id: 'tm-2',
    name: 'Tariq Mehmood',
    uid: '31042',
    level: 1,
    totalVolume: 120000,
    commissionEarned: 360.00,
    joinedDate: '28 Oct 2026',
    status: 'Active',
  },
  {
    id: 'tm-3',
    name: 'Hamza Malik',
    uid: '42189',
    level: 2,
    totalVolume: 45000,
    commissionEarned: 90.00,
    joinedDate: '29 Oct 2026',
    status: 'Active',
  },
];

const initialDailyTasks: DailyTask[] = [
  {
    id: 'dt-1',
    title: 'Daily Check-in & Sign-in Bonus',
    titleUrdu: 'روزانہ حاضری اور چیک ان انعام',
    rewardPKR: 50,
    description: 'Log in daily to claim your 50 PKR activity bonus voucher',
    isCompleted: true,
    isClaimed: false,
    type: 'checkin',
  },
  {
    id: 'dt-2',
    title: 'Check Live Binance P2P Rate',
    titleUrdu: 'بائننس کی لائیو قیمت چیک کریں',
    rewardPKR: 30,
    description: 'View real-time USD/PKR market rates',
    isCompleted: false,
    isClaimed: false,
    type: 'rate_check',
  },
  {
    id: 'dt-3',
    title: 'Simulate Buy or Sell Match',
    titleUrdu: 'ایک میچ آرڈر مکمل کریں',
    rewardPKR: 100,
    description: 'Complete or match an order in Buy or Sell vault',
    isCompleted: false,
    isClaimed: false,
    type: 'simulate_order',
  },
];

function ZsPayApp() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [theme, setTheme] = useState<AppTheme>(() => {
    return (localStorage.getItem('zspay_theme') as AppTheme) || 'sky';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('zspay_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...parsed, commission: 855600 };
      }
    } catch (e) {
      console.error(e);
    }
    return initialUserProfile;
  });

  const [channels, setChannels] = useState<CollectionChannel[]>(() => {
    try {
      const saved = localStorage.getItem('zspay_channels');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialChannels;
  });

  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('zspay_transactions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialTransactions;
  });

  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(() => {
    try {
      const saved = localStorage.getItem('zspay_daily_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialDailyTasks;
  });

  const [isBalanceCelebrating, setIsBalanceCelebrating] = useState(false);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeam);
  const [activeBuyOrder, setActiveBuyOrder] = useState<P2POrder | null>(null);
  const [activeSellOrder, setActiveSellOrder] = useState<P2POrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [recordFilter, setRecordFilter] = useState<'all' | 'recharge' | 'withdrawal' | 'orders'>('all');
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);

  const handleOpenRecord = (filter: 'all' | 'recharge' | 'withdrawal' | 'orders' = 'all') => {
    setRecordFilter(filter);
    setIsRecordOpen(true);
  };

  // Authentication State (supports Login Page test & persistence)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('onepay_logged_in') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('zspay_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('zspay_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('zspay_channels', JSON.stringify(channels));
  }, [channels]);

  useEffect(() => {
    localStorage.setItem('zspay_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('zspay_daily_tasks', JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('onepay_logged_in');
    showToast('✓ Logged out successfully (لاگ آؤٹ ہو گیا)');
  };

  // Recharge Handler (Supports EasyPaisa, JazzCash, and USDT TRC-20)
  const handleRechargeSuccess = (amount: number, method: any, trxId: string) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
      orderAvailable: prev.orderAvailable + amount,
    }));

    const isUsdt = method === 'usdt';
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'recharge',
      amountPKR: amount,
      method,
      accountTitle: isUsdt ? 'USDT TRC20 Wallet' : user.name,
      accountNumber: isUsdt ? 'TRC20: TK7rF9y...s' : (method === 'easypaisa' ? '0345-4567891' : '0300-4567891'),
      trxId,
      status: 'Completed',
      timestamp: 'Just now',
      note: isUsdt ? 'Deposited via USDT TRC20' : undefined,
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast(`✓ Recharge of PKR ${amount.toLocaleString('en-PK')} successful via ${method.toUpperCase()}!`);
  };

  // Withdrawal Handler
  const handleWithdrawSuccess = (amount: number, method: any, accountNo: string, trxId: string) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance - amount,
      orderAvailable: Math.max(0, prev.orderAvailable - amount),
    }));

    const isUsdt = method === 'usdt';
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'withdrawal',
      amountPKR: amount,
      method,
      accountTitle: isUsdt ? 'USDT TRC20 Wallet' : user.name,
      accountNumber: isUsdt ? `TRC20: ${accountNo.slice(0, 8)}...${accountNo.slice(-6)}` : accountNo,
      trxId,
      status: 'Completed',
      timestamp: 'Just now',
      note: isUsdt ? 'Withdrawn to customer TRC20 address' : undefined,
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast(
      isUsdt
        ? `✓ Withdrawal of PKR ${amount.toLocaleString('en-PK')} dispatched to TRC20 address!`
        : `✓ Withdrawal of PKR ${amount.toLocaleString('en-PK')} sent to ${accountNo}!`
    );
  };

  // Start Buy Order
  const handleStartBuyOrder = (amount: number, method: 'easypaisa' | 'jazzcash') => {
    const commission = (amount * 0.3) / 100;
    const order: P2POrder = {
      id: `buy-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'buy',
      amountPKR: amount,
      commissionPKR: commission,
      method,
      counterpartyName: 'Malik Enterprises (Verified)',
      counterpartyAccount: method === 'easypaisa' ? '0345-8899112' : '0300-8899112',
      counterpartyTitle: 'Malik Tahir Tech',
      status: 'in_progress',
      createdAt: 'Just now',
    };
    setActiveBuyOrder(order);
    showToast(`Order matched! Please transfer PKR ${amount.toLocaleString('en-PK')} to seller's ${method.toUpperCase()}.`);
  };

  // Confirm Buy Payment
  const handleConfirmBuyPayment = (orderId: string, trxId: string) => {
    if (!activeBuyOrder) return;
    const earnedCommission = activeBuyOrder.commissionPKR;
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + activeBuyOrder.amountPKR + earnedCommission,
      commission: prev.commission + earnedCommission,
      orderAvailable: prev.orderAvailable + activeBuyOrder.amountPKR,
    }));

    const tx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'buy_order',
      amountPKR: activeBuyOrder.amountPKR,
      method: activeBuyOrder.method,
      accountTitle: activeBuyOrder.counterpartyTitle,
      accountNumber: activeBuyOrder.counterpartyAccount,
      trxId,
      status: 'Completed',
      timestamp: 'Just now',
    };

    setTransactions((prev) => [tx, ...prev]);
    setActiveBuyOrder(null);
    showToast(`✓ Payment verified! Balance credited + PKR ${earnedCommission.toFixed(2)} commission earned!`);
  };

  // Toggle Yield on Sell Tab
  const handleToggleYield = (yieldType: 'low' | 'medium') => {
    if (activeSellOrder) return;

    // Simulate instant match with incoming buyer!
    const sellAmount = Math.min(12500, Math.floor(user.orderAvailable * 0.4) || 5000);
    const rate = yieldType === 'low' ? 0.003 : 0.006;
    const yieldCommission = sellAmount * rate;

    setUser((prev) => ({
      ...prev,
      inTransaction: sellAmount,
      orderAvailable: Math.max(0, prev.orderAvailable - sellAmount),
    }));

    setTimeout(() => {
      const activeChannel = channels.find((c) => c.isActive) || channels[0];
      const sellOrder: P2POrder = {
        id: `sell-${Date.now()}`,
        orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        type: 'sell',
        amountPKR: sellAmount,
        commissionPKR: yieldCommission,
        method: activeChannel.type,
        counterpartyName: 'Buyer Kamran Khan',
        counterpartyAccount: activeChannel.accountNumber,
        counterpartyTitle: activeChannel.accountTitle,
        status: 'in_progress',
        createdAt: 'Just now',
        trxId: `${activeChannel.type === 'easypaisa' ? 'EP' : 'JC'}${Math.floor(100000000 + Math.random() * 900000000)}`,
        yieldType,
      };
      setActiveSellOrder(sellOrder);
      showToast(`⚡ Buyer matched! Rs. ${sellAmount.toLocaleString('en-PK')} received in your ${activeChannel.type.toUpperCase()}!`);
    }, 1500);
  };

  // Confirm Sell Order Release
  const handleConfirmSellReceipt = (orderId: string) => {
    if (!activeSellOrder) return;
    const earned = activeSellOrder.commissionPKR;

    setUser((prev) => ({
      ...prev,
      inTransaction: 0,
      balance: prev.balance + earned,
      commission: prev.commission + earned,
    }));

    const tx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'sell_order',
      amountPKR: activeSellOrder.amountPKR,
      method: activeSellOrder.method,
      accountTitle: activeSellOrder.counterpartyName,
      accountNumber: activeSellOrder.counterpartyAccount,
      trxId: activeSellOrder.trxId || `TX-${Date.now()}`,
      status: 'Completed',
      timestamp: 'Just now',
    };

    setTransactions((prev) => [tx, ...prev]);
    setActiveSellOrder(null);
    showToast(`✓ Order released! PKR ${earned.toFixed(2)} yield added to your balance.`);
  };

  // Collection Channel handlers
  const handleAddChannel = (ch: CollectionChannel) => {
    setChannels((prev) => [ch, ...prev]);
    showToast(`✓ Added ${ch.type.toUpperCase()} account (${ch.accountNumber})`);
  };

  const handleToggleChannel = (id: string) => {
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Package upgrade
  const handleUpgradePackage = (level: string, cost: number) => {
    if (user.balance < cost) {
      showToast(`Insufficient balance for ${level}. Please recharge first.`);
      return;
    }
    setUser((prev) => ({
      ...prev,
      balance: prev.balance - cost,
      vipLevel: level,
    }));
    showToast(`✓ Successfully upgraded to ${level}!`);
  };

  // Claim Daily Task Handler (with celebratory animation trigger)
  const handleClaimDailyTask = (taskId: string) => {
    const task = dailyTasks.find((t) => t.id === taskId);
    if (!task || task.isClaimed) return;

    const reward = task.rewardPKR;
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + reward,
      orderAvailable: prev.orderAvailable + reward,
    }));

    setDailyTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, isCompleted: true, isClaimed: true } : t))
    );

    const tx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'commission_reward',
      amountPKR: reward,
      method: 'usdt',
      accountTitle: 'Daily Task Bonus',
      accountNumber: 'ONEPAY Reward System',
      trxId: `TSK-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Completed',
      timestamp: 'Just now',
      note: `${task.title} bonus reward claimed!`,
    };

    setTransactions((prev) => [tx, ...prev]);

    // Trigger celebratory bounce & golden color fade on balance
    setIsBalanceCelebrating(true);
    setTimeout(() => setIsBalanceCelebrating(false), 3000);

    showToast(`🎉 Daily Bonus Claimed! +PKR ${reward.toFixed(2)} added to your balance!`);
  };

  // Subscribe to Savings Vault
  const handleSubscribeSavings = (planTitle: string, amount: number, returnRate: number) => {
    setUser((prev) => ({
      ...prev,
      orderAvailable: Math.max(0, prev.orderAvailable - amount),
    }));

    const tx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'sell_order',
      amountPKR: amount,
      method: 'usdt',
      accountTitle: planTitle,
      accountNumber: 'Tether USDT Vault',
      trxId: `SAV-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Completed',
      timestamp: 'Just now',
      note: `Subscribed ${amount} PKR @ ${returnRate}% APY`,
    };

    setTransactions((prev) => [tx, ...prev]);
    showToast(`✓ Subscribed PKR ${amount.toLocaleString('en-PK')} to ${planTitle}!`);
  };

  // Compute theme background style
  const getThemeWrapperClass = () => {
    switch (theme) {
      case 'emerald':
        return 'bg-gradient-to-b from-[#e6f7ef] via-[#f4fbf7] to-white';
      case 'jazz':
        return 'bg-gradient-to-b from-[#fff1f1] via-[#fff7f5] to-white';
      case 'sapphire':
        return 'bg-gradient-to-b from-[#e8f1ff] via-[#f3f7ff] to-white';
      case 'midnight':
        return 'bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white';
      case 'sky':
      default:
        // Exact soft periwinkle / lavender pastel from Screenshot 1, 3, 4
        return 'bg-gradient-to-b from-[#e8efff] via-[#f5f8ff] to-[#ffffff]';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 sm:p-4 select-none">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Floating Install App button */}
        <button
          onClick={() => setIsInstallOpen(true)}
          className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-md text-slate-800 p-2.5 rounded-full shadow-lg border border-slate-200 hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer"
          title="Install ONEPAY App"
        >
          <Download className="w-4 h-4 text-red-600" />
          <span className="hidden sm:inline text-xs font-serif italic font-bold">Install App</span>
        </button>

        <div className="w-full max-w-md min-h-screen sm:min-h-[850px] sm:max-h-[920px] sm:rounded-[36px] shadow-2xl overflow-hidden flex flex-col justify-between relative border border-slate-200/50 bg-white">
          <LoginPage
            onLoginSuccess={(prof) => {
              if (prof.name) {
                setUser((prev) => ({
                  ...prev,
                  name: prof.name || prev.name,
                  uid: prof.uid || prev.uid,
                }));
              }
              setIsLoggedIn(true);
              localStorage.setItem('onepay_logged_in', 'true');
              showToast('✓ Welcome to ONEPAY!');
            }}
          />
        </div>

        <InstallAppModal
          isOpen={isInstallOpen}
          onClose={() => setIsInstallOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 sm:p-4 select-none">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Celebratory Animation for Balance Reward */}
      {isBalanceCelebrating && (
        <div className="fixed top-16 z-50 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-amber-950 px-5 py-3 rounded-2xl shadow-2xl border-2 border-white flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-900 animate-spin" />
          <div>
            <span className="text-xs font-black uppercase tracking-wider block">Bonus Rewarded! 🎉</span>
            <span className="text-sm font-extrabold font-mono text-amber-950">
              Balance: PKR {user.balance.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      )}

      {/* Floating Header Actions (Install App, Change Color, Logout) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsInstallOpen(true)}
          className="bg-white/95 backdrop-blur-md text-slate-800 p-2 rounded-full shadow-lg border border-slate-200 hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer"
          title="Install App / لنک حاصل کریں"
        >
          <Download className="w-4 h-4 text-red-600" />
          <span className="hidden sm:inline text-xs font-serif italic font-bold">Install</span>
        </button>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="bg-white/95 backdrop-blur-md text-slate-800 p-2 rounded-full shadow-lg border border-slate-200 hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer"
          title="Change App Color / رنگ تبدیل کریں"
        >
          <Palette className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline text-xs font-serif italic font-bold">Color</span>
        </button>

        <button
          onClick={handleLogout}
          className="bg-white/95 backdrop-blur-md text-slate-700 hover:text-red-600 p-2 rounded-full shadow-lg border border-slate-200 hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer"
          title="Logout to Login Page (لاگ آؤٹ)"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-serif italic font-bold">Logout</span>
        </button>
      </div>

      {/* Mobile Application Canvas Container (matches exact 1440px / mobile device frame ratio) */}
      <div
        className={`w-full max-w-md min-h-screen sm:min-h-[850px] sm:max-h-[920px] sm:rounded-[36px] shadow-2xl overflow-hidden flex flex-col justify-between relative border border-slate-200/50 ${getThemeWrapperClass()}`}
      >
        {/* Dynamic Views based on activeTab */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          {activeTab === 'home' && (
            <HomeView
              user={user}
              dailyTasks={dailyTasks}
              onClaimDailyTask={handleClaimDailyTask}
              isBalanceCelebrating={isBalanceCelebrating}
              onOpenRecharge={() => setIsRechargeOpen(true)}
              onOpenWithdrawal={() => setIsWithdrawalOpen(true)}
              onOpenInvite={() => setIsTeamOpen(true)}
              onNavigateTab={(t) => setActiveTab(t)}
              onOpenInstallModal={() => setIsInstallOpen(true)}
              onOpenHistory={(filter) => handleOpenRecord(filter || 'all')}
              onOpenRanking={() => setIsRankingOpen(true)}
              onOpenCollection={() => setIsCollectionOpen(true)}
              onOpenPackages={() => setIsPackageOpen(true)}
            />
          )}

          {activeTab === 'savings' && (
            <SavingsView
              user={user}
              onSubscribe={handleSubscribeSavings}
              onOpenRecharge={() => setIsRechargeOpen(true)}
            />
          )}

          {activeTab === 'buy' && (
            <BuyView
              user={user}
              activeOrder={activeBuyOrder}
              onStartBuyOrder={handleStartBuyOrder}
              onConfirmPayment={handleConfirmBuyPayment}
              onCancelOrder={() => setActiveBuyOrder(null)}
              onOpenHistory={() => handleOpenRecord('orders')}
            />
          )}

          {activeTab === 'sell' && (
            <SellView
              user={user}
              activeSellOrder={activeSellOrder}
              onToggleYield={handleToggleYield}
              onConfirmReceipt={handleConfirmSellReceipt}
              onOpenHistory={() => handleOpenRecord('orders')}
            />
          )}

          {activeTab === 'my' && (
            <MyProfileView
              user={user}
              onUpdateName={(name) => setUser((prev) => ({ ...prev, name }))}
              onOpenRecharge={() => setIsRechargeOpen(true)}
              onOpenWithdrawal={() => setIsWithdrawalOpen(true)}
              onOpenCollectionChannel={() => setIsCollectionOpen(true)}
              onOpenTransactionRecord={() => handleOpenRecord('all')}
              onOpenTeam={() => setIsTeamOpen(true)}
              onOpenCommissionRecord={() => setIsTeamOpen(true)}
              onOpenRanking={() => setIsRankingOpen(true)}
              onOpenPackageService={() => setIsPackageOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenInstallModal={() => setIsInstallOpen(true)}
              onLogout={handleLogout}
              isBalanceCelebrating={isBalanceCelebrating}
            />
          )}
        </div>

        {/* Exact Bottom Navigation Bar with 4 tabs: home, buy, sell, my */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Interactive Modals */}
        <RechargeModal
          isOpen={isRechargeOpen}
          onClose={() => setIsRechargeOpen(false)}
          onRechargeSuccess={handleRechargeSuccess}
          onOpenHistory={() => handleOpenRecord('recharge')}
        />

        <WithdrawalModal
          isOpen={isWithdrawalOpen}
          onClose={() => setIsWithdrawalOpen(false)}
          user={user}
          onWithdrawSuccess={handleWithdrawSuccess}
          onOpenHistory={() => handleOpenRecord('withdrawal')}
        />

        <CollectionChannelModal
          isOpen={isCollectionOpen}
          onClose={() => setIsCollectionOpen(false)}
          channels={channels}
          onAddChannel={handleAddChannel}
          onToggleChannel={handleToggleChannel}
        />

        <TransactionRecordModal
          isOpen={isRecordOpen}
          onClose={() => setIsRecordOpen(false)}
          transactions={transactions}
          initialFilter={recordFilter}
        />

        <TeamModal
          isOpen={isTeamOpen}
          onClose={() => setIsTeamOpen(false)}
          user={user}
          teamMembers={teamMembers}
        />

        <PackageModal
          isOpen={isPackageOpen}
          onClose={() => setIsPackageOpen(false)}
          user={user}
          onUpgradePackage={handleUpgradePackage}
        />

        <RankingModal
          isOpen={isRankingOpen}
          onClose={() => setIsRankingOpen(false)}
          userCommission={user.commission}
          user={user}
        />

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          currentTheme={theme}
          onSelectTheme={(t) => setTheme(t)}
          userName={user.name}
          onUpdateUserName={(n) => setUser((prev) => ({ ...prev, name: n }))}
        />

        <InstallAppModal
          isOpen={isInstallOpen}
          onClose={() => setIsInstallOpen(false)}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BinanceRatesProvider>
        <ZsPayApp />
      </BinanceRatesProvider>
    </LanguageProvider>
  );
}
