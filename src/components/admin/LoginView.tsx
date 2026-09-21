import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { BRANCHES } from '../../data/mockData';
import { Button } from '../common/Button';
import { ShieldCheck, Lock, Mail, Building, KeyRound, CheckCircle2 } from 'lucide-react';

export const LoginView: React.FC = () => {
  const {
    setIsAdminLoggedIn,
    setAdminScreen,
    setAdminRole,
    selectedBranch,
    setSelectedBranch
  } = useGym();

  const [email, setEmail] = useState('admin@gymos.internal');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAdminLoggedIn(true);
      setAdminScreen('dashboard');
    }, 400);
  };

  const handleQuickLogin = (role: 'Super Admin' | 'Branch Admin' | 'Receptionist') => {
    setAdminRole(role);
    if (role === 'Super Admin') setEmail('superadmin@gymos.internal');
    if (role === 'Branch Admin') setEmail('branchadmin.chennai@gymos.internal');
    if (role === 'Receptionist') setEmail('reception.desk@gymos.internal');
    setIsAdminLoggedIn(true);
    setAdminScreen('dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-41px)] bg-[#F8FAFC] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-700 text-white font-bold text-lg tracking-tight mb-3 shadow-sm">
            GO
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            GymOS Enterprise
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Intelligent gym operations, attendance, payments & member engagement
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-card">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Branch Location
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                >
                  {BRANCHES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Admin Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gymos.internal"
                  className="w-full pl-10 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset link sent to registered email.');
                  }}
                  className="text-xs text-emerald-700 hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 w-3.5 h-3.5"
                />
                <span>Remember this terminal session</span>
              </label>

              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                256-bit TLS
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Sign In to Terminal
            </Button>
          </form>

          {/* Quick Demo Logins */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              Quick One-Click Role Simulator
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('Super Admin')}
                className="py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[11px] font-medium text-slate-700 text-center transition-colors cursor-pointer"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('Branch Admin')}
                className="py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[11px] font-medium text-slate-700 text-center transition-colors cursor-pointer"
              >
                Branch Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('Receptionist')}
                className="py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[11px] font-medium text-slate-700 text-center transition-colors cursor-pointer"
              >
                Receptionist
              </button>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <p className="text-center text-[11px] text-slate-400 mt-6">
          Authorized personnel only &bull; Protected by GymOS Zero-Trust Protocol
        </p>
      </div>
    </div>
  );
};
