import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const [time, setTime] = useState('12:25');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-sans text-slate-800 tracking-tight select-none">
      <span className="font-semibold text-xs">{time}</span>

      <div className="flex items-center gap-2 text-[10px] text-slate-700">
        <span className="text-[9px] font-mono">0.00 KB/S</span>
        <Wifi className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold">4G</span>
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-mono font-bold">57</span>
          <Battery className="w-4 h-4 fill-slate-700 text-slate-700" />
        </div>
      </div>
    </div>
  );
};
