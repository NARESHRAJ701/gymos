import React from 'react';
import { useGym, AdminScreen } from '../../context/GymContext';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CreditCard,
  Layers,
  Dumbbell,
  BarChart3,
  Bell,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  QrCode
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    adminScreen,
    setAdminScreen,
    sidebarCollapsed,
    setSidebarCollapsed,
    notifications
  } = useGym();

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  interface NavItem {
    id: AdminScreen;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeVariant?: 'emerald' | 'amber' | 'neutral';
  }

  interface NavSection {
    title: string;
    items: NavItem[];
  }

  const sections: NavSection[] = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { id: 'members', label: 'Members', icon: Users },
        { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
        { id: 'qr-scanner', label: 'QR Scanner', icon: QrCode },
        { id: 'memberships', label: 'Memberships', icon: Layers },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'trainers', label: 'Trainers', icon: Dumbbell }
      ]
    },
    {
      title: 'ANALYTICS',
      items: [
        { id: 'reports', label: 'Reports', icon: BarChart3 }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        {
          id: 'notifications',
          label: 'Notifications',
          icon: Bell,
          badge: unreadNotifCount > 0 ? unreadNotifCount : undefined,
          badgeVariant: 'emerald'
        },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck }
      ]
    }
  ];

  return (
    <aside
      className={`h-[calc(100vh-41px)] bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between transition-all duration-300 select-none z-30 shrink-0 sticky top-[41px] ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm font-bold text-sm tracking-tighter">
                GO
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base tracking-tight leading-tight">
                  GymOS
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                  Operations Suite
                </span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              GO
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!sidebarCollapsed ? (
                <h4 className="px-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-2">
                  {section.title}
                </h4>
              ) : (
                <div className="w-6 h-px bg-slate-800 mx-auto my-2" />
              )}

              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = adminScreen === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setAdminScreen(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-300 group-hover:text-white'
                      }`}
                    />

                    {!sidebarCollapsed && (
                      <span className="flex-1 text-left truncate">
                        {item.label}
                      </span>
                    )}

                    {!sidebarCollapsed && item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white text-emerald-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Tooltip on collapsed state */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-950 text-white text-xs rounded-md shadow-xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 border border-slate-800">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer / Branch Info */}
      {!sidebarCollapsed ? (
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/50">
          <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                Chennai Central
              </p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Terminal Ready
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 border-t border-slate-800/80 flex justify-center">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </div>
      )}
    </aside>
  );
};
