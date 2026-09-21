import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface AndroidDeviceShellProps {
  children: React.ReactNode;
}

export const AndroidDeviceShell: React.FC<AndroidDeviceShellProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center py-6 px-4 select-none">
      {/* Device Frame */}
      <div className="relative w-[390px] h-[820px] bg-slate-950 rounded-[48px] p-3 shadow-phone border-[4px] border-slate-700/80 ring-1 ring-slate-900 overflow-hidden flex flex-col">
        {/* Android Camera Punch Hole */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-40 ring-1 ring-slate-800/80 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
        </div>

        {/* Screen Bezel / Container */}
        <div className="relative flex-1 bg-[#F8FAFC] rounded-[38px] overflow-hidden flex flex-col">
          {/* Android Status Bar */}
          <div className="h-10 px-6 pt-2 pb-1 flex items-center justify-between text-slate-900 text-xs font-semibold shrink-0 z-30 bg-transparent">
            <span className="font-mono text-[11px] tracking-tight">09:41</span>
            <div className="flex items-center gap-2">
              <Signal className="w-3 h-3 text-slate-800 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 text-slate-800 stroke-[2.5]" />
              <BatteryMedium className="w-4 h-4 text-slate-800 stroke-[2.5]" />
            </div>
          </div>

          {/* Mobile Screen Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            {children}
          </div>

          {/* Android Gesture Pill / Navigation Bar */}
          <div className="h-4 bg-[#F8FAFC] flex justify-center items-center shrink-0 z-30">
            <div className="w-32 h-1 bg-slate-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
