import React from 'react';
import { useGym, ViewMode } from '../../context/GymContext';
import { Monitor, Smartphone, Columns, ShieldCheck, Zap } from 'lucide-react';

export const DeviceSwitcher: React.FC = () => {
  const { viewMode, setViewMode, adminScreen, setAdminScreen, mobileScreen, setMobileScreen } = useGym();

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2.5 flex items-center justify-between text-xs sticky top-0 z-50 select-none shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white font-bold text-xs tracking-tighter">
            GO
          </div>
          <span className="font-semibold text-white tracking-tight text-sm">
            GymOS
          </span>
          <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded text-[10px] font-mono font-medium">
            ENTERPRISE v2.4
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-slate-400 pl-2 border-l border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Chennai Central Node Online</span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center bg-slate-800/90 p-0.5 rounded-lg border border-slate-700/60">
        <button
          onClick={() => setViewMode('web')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
            viewMode === 'web'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Web Admin Dashboard</span>
        </button>

        <button
          onClick={() => setViewMode('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
            viewMode === 'mobile'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android Member App</span>
        </button>

        <button
          onClick={() => setViewMode('split')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
            viewMode === 'split'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Columns className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Split / Live Interactive Demo</span>
          <span className="sm:hidden">Split</span>
        </button>
      </div>

      {/* Interactive Quick Links */}
      <div className="hidden lg:flex items-center gap-2">
        <button
          onClick={() => {
            setViewMode('split');
            setAdminScreen('qr-scanner');
            setMobileScreen('qr-code');
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-700 transition-colors text-[11px] font-medium cursor-pointer"
          title="Opens Admin QR Scanner alongside Member QR Code"
        >
          <Zap className="w-3 h-3 text-emerald-400" />
          <span>Simulate QR Check-in</span>
        </button>
      </div>
    </header>
  );
};
