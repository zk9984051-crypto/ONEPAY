import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface BinanceRatesData {
  binanceBuyPrice: number;
  binanceSellPrice: number;
  rechargeRate: number; // Binance buy - 1 PKR
  withdrawalRate: number; // Binance sell + 2 PKR
  lastUpdated: string;
  source: string;
  merchantBuyTitle?: string;
  merchantSellTitle?: string;
}

interface BinanceRatesContextType {
  rates: BinanceRatesData;
  isLoading: boolean;
  isLive: boolean;
  refreshRates: () => Promise<void>;
}

const defaultRates: BinanceRatesData = {
  binanceBuyPrice: 281.85,
  binanceSellPrice: 281.30,
  rechargeRate: 280.85,
  withdrawalRate: 283.30,
  lastUpdated: new Date().toLocaleTimeString(),
  source: 'binance-p2p',
  merchantBuyTitle: 'Binance Top Merchant',
  merchantSellTitle: 'Binance Top Merchant',
};

const BinanceRatesContext = createContext<BinanceRatesContextType>({
  rates: defaultRates,
  isLoading: false,
  isLive: true,
  refreshRates: async () => {},
});

export const BinanceRatesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rates, setRates] = useState<BinanceRatesData>(() => {
    try {
      const saved = localStorage.getItem('onepay_binance_rates');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultRates;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(true);

  const fetchRates = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/binance-rates');
      if (res.ok) {
        const data = await res.json();
        setRates(data);
        setIsLive(true);
        localStorage.setItem('onepay_binance_rates', JSON.stringify(data));
      } else {
        // Fallback calculation if proxy endpoint not ready
        setRates((prev) => {
          const buy = prev.binanceBuyPrice || 281.85;
          const sell = prev.binanceSellPrice || 281.30;
          return {
            ...prev,
            rechargeRate: Number((buy - 1.00).toFixed(2)),
            withdrawalRate: Number((sell + 2.00).toFixed(2)),
            lastUpdated: new Date().toLocaleTimeString(),
          };
        });
      }
    } catch (err) {
      console.warn('Could not fetch /api/binance-rates, using active rate formula:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    // Automatically poll Binance every 25 seconds
    const interval = setInterval(() => {
      fetchRates();
    }, 25000);

    return () => clearInterval(interval);
  }, [fetchRates]);

  return (
    <BinanceRatesContext.Provider value={{ rates, isLoading, isLive, refreshRates: fetchRates }}>
      {children}
    </BinanceRatesContext.Provider>
  );
};

export const useBinanceRates = () => useContext(BinanceRatesContext);
