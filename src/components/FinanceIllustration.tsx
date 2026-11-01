import React from 'react';

export const FinanceIllustration: React.FC<{ className?: string }> = ({ className = 'w-64 h-52' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 300 240" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="100%" stopColor="#dbeafe" />
          </linearGradient>
          <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#bfdbfe" />
          </linearGradient>
          <linearGradient id="barGrad3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
        </defs>

        {/* Big Dollar Symbol watermark in back */}
        <text
          x="40"
          y="120"
          fontSize="90"
          fontWeight="bold"
          fill="#e0e7ff"
          opacity="0.6"
          fontFamily="system-ui, sans-serif"
        >
          $
        </text>

        {/* Ascending Chart Bars */}
        <rect x="75" y="140" width="28" height="75" rx="3" fill="url(#barGrad1)" />
        <rect x="109" y="115" width="28" height="100" rx="3" fill="url(#barGrad2)" />
        <rect x="143" y="95" width="28" height="120" rx="3" fill="url(#barGrad1)" />
        <rect x="177" y="75" width="28" height="140" rx="3" fill="url(#barGrad2)" />
        <rect x="211" y="55" width="28" height="160" rx="3" fill="url(#barGrad3)" />

        {/* Floor Line */}
        <line x1="50" y1="215" x2="250" y2="215" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

        {/* Rising Trend Arrow */}
        <path
          d="M 80 145 L 115 110 L 155 130 L 225 60"
          stroke="#0f172a"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Arrow Tip */}
        <polygon points="225,48 238,62 218,66" fill="#0f172a" />

        {/* Pie Chart floating in background */}
        <g transform="translate(195, 30)">
          <circle cx="20" cy="20" r="18" fill="#fdba74" />
          <path d="M 20 20 L 20 2 A 18 18 0 0 1 38 20 Z" fill="#f87171" />
          <path d="M 20 20 L 38 20 A 18 18 0 0 1 20 38 Z" fill="#67e8f9" />
        </g>

        {/* Character sitting on top */}
        {/* Pants / Legs */}
        <path d="M 125 105 L 170 105 L 165 140 L 145 140 L 140 120 Z" fill="#3b82f6" />
        <path d="M 155 105 L 175 125 L 195 125 L 180 145 L 158 135 Z" fill="#2563eb" />

        {/* Shoes */}
        <ellipse cx="140" cy="142" rx="10" ry="5" fill="#f97316" />
        <ellipse cx="185" cy="142" rx="10" ry="5" fill="#f97316" />

        {/* Character Body / Shirt */}
        <path d="M 135 75 L 165 75 L 160 105 L 132 105 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

        {/* Laptop */}
        <rect x="150" y="88" width="22" height="15" rx="1.5" fill="#1e293b" />
        <line x1="148" y1="103" x2="174" y2="103" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

        {/* Character Head & Hair */}
        <circle cx="150" cy="62" r="8" fill="#fed7aa" />
        <path d="M 144 56 C 145 52 156 52 157 56 C 158 60 155 64 153 66 C 145 66 142 60 144 56 Z" fill="#0f172a" />
        {/* Hair bun */}
        <circle cx="143" cy="54" r="3.5" fill="#0f172a" />
      </svg>
    </div>
  );
};
