import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { BRANCHES } from '../../data/mockData';
import {
  Search,
  MapPin,
  Calendar,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    selectedBranch,
    setSelectedBranch,
    adminRole,
    setAdminRole,
    notifications,
    setAdminScreen,
    setIsAdminLoggedIn
  } = useGym();

  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifs = notifications.filter((n) => !n.read);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-[41px] z-20">
      {/* Global Search Bar */}
      <div className="flex-1 max-w-md relative">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by member name, phone, member ID (e.g. MEM-002481)..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
        </div>
      </div>

      {/* Controls & User Profile */}
      <div className="flex items-center gap-3 ml-4">
        {/* Branch Selector */}
        <div className="relative">
          <button
            onClick={() => setShowBranchMenu(!showBranchMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span className="max-w-[140px] truncate">{selectedBranch}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showBranchMenu && (
            <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-lg border border-slate-200 shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Branch Location
              </div>
              {BRANCHES.map((branch) => (
                <button
                  key={branch}
                  onClick={() => {
                    setSelectedBranch(branch);
                    setShowBranchMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>{branch}</span>
                  {selectedBranch === branch && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Selector Display */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>21 Sep 2026</span>
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white"></span>
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">
                  Notifications ({unreadNotifs.length})
                </span>
                <button
                  onClick={() => {
                    setAdminScreen('notifications');
                    setShowNotifMenu(false);
                  }}
                  className="text-[11px] text-emerald-600 hover:underline font-medium"
                >
                  View all
                </button>
              </div>
              <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                {notifications.slice(0, 3).map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 text-xs">
                    <p className="font-semibold text-slate-800">{n.title}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {n.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help Icon */}
        <button
          onClick={() => {
            alert('GymOS Enterprise Operations Manual v2.4.\nFor 24/7 Priority Support call: 1800-GYM-OS');
          }}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          title="GymOS Documentation & Help"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-0.5" />

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-medium flex items-center justify-center">
              AU
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-semibold text-slate-900 leading-tight">
                Admin User
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {adminRole}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900">Admin User</p>
                <p className="text-[11px] text-slate-500">admin@gymos.internal</p>
                <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  {adminRole}
                </div>
              </div>

              <div className="py-1 border-b border-slate-100">
                <button
                  onClick={() => {
                    setAdminScreen('roles');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Switch Role Simulation</span>
                </button>
                <button
                  onClick={() => {
                    setAdminScreen('settings');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Organization Profile</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsAdminLoggedIn(false);
                  setAdminScreen('login');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
