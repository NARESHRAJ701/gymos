import React from 'react';
import { GymProvider, useGym } from './context/GymContext';
import { DeviceSwitcher } from './components/layout/DeviceSwitcher';
import { AdminLayout } from './components/layout/AdminLayout';
import { MobileLayout } from './components/mobile/MobileLayout';
import { SplitView } from './components/layout/SplitView';
import { ToastContainer } from './components/common/ToastContainer';

const AppContent: React.FC = () => {
  const { viewMode } = useGym();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Global Device Switcher Top Bar */}
      <DeviceSwitcher />

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col">
        {viewMode === 'web' && <AdminLayout />}

        {viewMode === 'mobile' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900 min-h-[calc(100vh-41px)]">
            <div className="text-center mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                Pixel 8 &bull; Android 15 &bull; GymOS Native Member Client
              </span>
            </div>
            <MobileLayout />
          </div>
        )}

        {viewMode === 'split' && <SplitView />}
      </div>

      {/* Action Toast Feedback Container */}
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GymProvider>
      <AppContent />
    </GymProvider>
  );
};

export default App;
