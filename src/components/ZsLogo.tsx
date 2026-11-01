import React from 'react';

interface ZsLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const ZsLogo: React.FC<ZsLogoProps> = ({
  className = '',
  size = 110,
  showText = true,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Circular Red 1P App Icon (From uploaded image filtered to vibrant red) */}
      <div
        style={{ width: size, height: size }}
        className="relative rounded-full overflow-hidden shadow-lg border-2 border-red-500/20 bg-red-600 flex items-center justify-center group transition-transform"
      >
        <img
          src="/public/assets/aistudio/IMG_20261101_005636_465_72772fab.jpg"
          alt="ONEPAY Logo"
          className="w-full h-full object-cover rounded-full"
          style={{
            // Turns the green/teal background into vibrant crimson red while keeping the white '1P' crisp
            filter: 'hue-rotate(200deg) saturate(260%) contrast(1.05)',
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Text Below Logo if enabled */}
      {showText && size >= 80 && (
        <span className="font-serif italic font-extrabold text-sm tracking-widest text-red-600 uppercase mt-1.5 drop-shadow-xs">
          ONEPAY
        </span>
      )}
    </div>
  );
};
