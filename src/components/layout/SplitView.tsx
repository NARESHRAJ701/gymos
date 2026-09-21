import React from 'react';
import { useGym } from '../../context/GymContext';
import { AdminLayout } from './AdminLayout';
import { MobileLayout } from '../mobile/MobileLayout';
import { Zap, ArrowLeftRight, CheckCircle2, Smartphone, Monitor } from 'lucide-react';

export const SplitView: React.FC = () => {
  const { setAdminScreen, setMobileScreen } = useGym();

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-41px)] overflow-hidden bg-slate-950">
      {/* Live Sync Banner */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-2 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-white">
            Dual-Platform Real-time Synchronization Active
          </span>
          <span className="text-slate-500 hidden sm:inline">&bull;</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Admin check-in scanner and Member QR pass synchronize instantaneously
          </span>
        </div>

        {/* Quick Demo Scenarios */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setAdminScreen('qr-scanner');
              setMobileScreen('qr-code');
            }}
            className="px-2.5 py-1 rounded bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Zap className="w-3 h-3 text-emerald-300" />
            <span>Test QR Check-in Flow</span>
          </button>

          <button
            onClick={() => {
              setAdminScreen('dashboard');
              setMobileScreen('home');
            }}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[11px] transition-colors cursor-pointer"
          >
            Reset Views
          </button>
        </div>
      </div>

      {/* Split Columns */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Web Admin Dashboard */}
        <div className="flex-1 border-r border-slate-800 overflow-y-auto bg-[#F8FAFC]">
          <AdminLayout />
        </div>

        {/* Right Column: Android Member App */}
        <div className="w-full lg:w-[460px] bg-slate-900 overflow-y-auto flex flex-col items-center justify-center p-4 border-t lg:border-t-0 border-slate-800">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800/80">
              Android Native Client (Expo Shell)
            </span>
          </div>
          <MobileLayout />
        </div>
      </div>
    </div>
  );
};
