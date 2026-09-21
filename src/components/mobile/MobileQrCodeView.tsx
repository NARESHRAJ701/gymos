import React, { useState, useEffect } from 'react';
import { useGym } from '../../context/GymContext';
import { ArrowLeft, RefreshCw, Sun, ShieldCheck } from 'lucide-react';

export const MobileQrCodeView: React.FC = () => {
  const { setMobileScreen, members } = useGym();
  const arun = members[0];

  const [refreshCountdown, setRefreshCountdown] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => (prev > 1 ? prev - 1 : 45));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 p-6 flex flex-col justify-between bg-white text-slate-900">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          My Gym QR
        </h2>

        <div className="w-8"></div>
      </div>

      {/* Centered QR Pass */}
      <div className="my-auto flex flex-col items-center text-center space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{arun.name}</h3>
          <p className="text-xs font-mono text-slate-500 mt-0.5">
            {arun.memberId}
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span>{arun.membershipTier} Tier</span>
            <span>&bull;</span>
            <span>Active</span>
          </div>
        </div>

        {/* Large High-Quality Crisp Vector QR Code Container */}
        <div className="relative p-6 bg-white rounded-3xl border-2 border-slate-200 shadow-card flex flex-col items-center">
          {/* Subtle Security Scanline Effect */}
          <div className="relative w-56 h-56 flex items-center justify-center bg-white p-2">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full text-slate-900"
              fill="currentColor"
            >
              {/* Corner Position Markers */}
              <rect x="10" y="10" width="45" height="45" rx="4" fill="#0F172A" />
              <rect x="17" y="17" width="31" height="31" rx="2" fill="#FFFFFF" />
              <rect x="23" y="23" width="19" height="19" rx="1" fill="#047857" />

              <rect x="145" y="10" width="45" height="45" rx="4" fill="#0F172A" />
              <rect x="152" y="17" width="31" height="31" rx="2" fill="#FFFFFF" />
              <rect x="158" y="23" width="19" height="19" rx="1" fill="#047857" />

              <rect x="10" y="145" width="45" height="45" rx="4" fill="#0F172A" />
              <rect x="17" y="152" width="31" height="31" rx="2" fill="#FFFFFF" />
              <rect x="23" y="158" width="19" height="19" rx="1" fill="#047857" />

              {/* Data Matrix Dots Pattern */}
              <rect x="65" y="15" width="8" height="8" rx="1" />
              <rect x="80" y="15" width="8" height="8" rx="1" />
              <rect x="105" y="15" width="8" height="8" rx="1" />
              <rect x="125" y="15" width="8" height="8" rx="1" />

              <rect x="65" y="30" width="8" height="8" rx="1" />
              <rect x="95" y="30" width="8" height="8" rx="1" />
              <rect x="115" y="30" width="8" height="8" rx="1" />

              <rect x="15" y="65" width="8" height="8" rx="1" />
              <rect x="35" y="65" width="8" height="8" rx="1" />
              <rect x="65" y="65" width="8" height="8" rx="1" />
              <rect x="80" y="65" width="8" height="8" rx="1" />
              <rect x="95" y="65" width="8" height="8" rx="1" />
              <rect x="125" y="65" width="8" height="8" rx="1" />
              <rect x="145" y="65" width="8" height="8" rx="1" />
              <rect x="175" y="65" width="8" height="8" rx="1" />

              {/* Center Logo Cutout */}
              <circle cx="100" cy="100" r="22" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
              <rect x="91" y="91" width="18" height="18" rx="3" fill="#047857" />
              <text
                x="100"
                y="104"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                GO
              </text>

              {/* Lower matrix points */}
              <rect x="65" y="125" width="8" height="8" rx="1" />
              <rect x="80" y="125" width="8" height="8" rx="1" />
              <rect x="110" y="125" width="8" height="8" rx="1" />
              <rect x="125" y="125" width="8" height="8" rx="1" />

              <rect x="65" y="145" width="8" height="8" rx="1" />
              <rect x="95" y="145" width="8" height="8" rx="1" />
              <rect x="125" y="145" width="8" height="8" rx="1" />
              <rect x="145" y="145" width="8" height="8" rx="1" />
              <rect x="175" y="145" width="8" height="8" rx="1" />

              <rect x="65" y="165" width="8" height="8" rx="1" />
              <rect x="80" y="165" width="8" height="8" rx="1" />
              <rect x="110" y="165" width="8" height="8" rx="1" />
              <rect x="155" y="165" width="8" height="8" rx="1" />
            </svg>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
            <RefreshCw className="w-3 h-3 text-slate-400 animate-spin" />
            <span>Token refreshes in {refreshCountdown}s</span>
          </div>
        </div>

        {/* Clear Instructions */}
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          Show this QR code at the reception or optical turnstile scanner to check in.
        </p>
      </div>

      {/* Screen Brightness / Security Badge */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          Auto-brightness at 100%
        </span>

        <span className="flex items-center gap-1 text-emerald-700 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          Encrypted Token
        </span>
      </div>
    </div>
  );
};
