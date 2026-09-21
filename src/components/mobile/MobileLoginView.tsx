import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Shield, Phone, Fingerprint, Lock, ArrowRight } from 'lucide-react';

export const MobileLoginView: React.FC = () => {
  const { setIsMobileLoggedIn, setMobileScreen } = useGym();
  const [phone, setPhone] = useState('+91 98401 23456');
  const [otp, setOtp] = useState('4829');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMobileLoggedIn(true);
    setMobileScreen('home');
  };

  const handleBiometric = () => {
    setIsMobileLoggedIn(true);
    setMobileScreen('home');
  };

  return (
    <div className="flex-1 p-6 flex flex-col justify-between bg-white">
      {/* Top Branding */}
      <div className="pt-8">
        <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white font-bold flex items-center justify-center text-lg shadow-md mb-4">
          GO
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Welcome to GymOS
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Your personal membership portal, turnstile pass & workout companion
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4 my-auto">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Registered Mobile Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold text-slate-700">
              One-Time Passcode (OTP)
            </label>
            <span className="text-[11px] text-emerald-700 font-medium">Resend in 24s</span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs font-mono tracking-widest border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full rounded-xl mt-2"
        >
          Sign In as Arun Kumar
        </Button>

        {/* Biometric quick action */}
        <div className="text-center pt-3">
          <button
            type="button"
            onClick={handleBiometric}
            className="inline-flex flex-col items-center gap-1.5 text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-200">
              <Fingerprint className="w-6 h-6 text-emerald-700" />
            </div>
            <span className="text-[11px] font-semibold">Touch ID / Biometric Login</span>
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="text-center text-[10px] text-slate-400 pb-4">
        GymOS Secure Member Protocol v2.4 &bull; Chennai Central Branch
      </div>
    </div>
  );
};
