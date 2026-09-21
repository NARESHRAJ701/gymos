import React from 'react';
import { useGym, MobileScreen } from '../../context/GymContext';
import {
  Home,
  CalendarCheck,
  Shield,
  CreditCard,
  User
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { mobileScreen, setMobileScreen } = useGym();

  const navItems: { id: MobileScreen; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'membership', label: 'Membership', icon: Shield },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="h-16 bg-white border-t border-slate-200 px-3 flex items-center justify-around shrink-0 z-20 select-none shadow-sm">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = mobileScreen === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setMobileScreen(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${
              isActive
                ? 'text-emerald-700 font-semibold'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <div
              className={`p-1 rounded-full transition-colors ${
                isActive ? 'bg-emerald-50 text-emerald-700' : ''
              }`}
            >
              <Icon className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
